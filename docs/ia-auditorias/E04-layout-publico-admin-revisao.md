# E04 — Layout público e admin — Revisão

Revisor: Claude Code (command `review-code`, metodologia `senior-code-review`).
Branch: `dev`. Base de comparação: working tree vs. `HEAD` (nenhum commit criado; diff não commitado, incluindo este próprio relatório).

Esta revisão foi conduzida de forma independente (leitura direta de todos os arquivos do diff e reexecução de todas as validações nesta sessão). Um rascunho anterior deste mesmo relatório já existia, não commitado, no working tree — os achados abaixo convergem com aquele rascunho na maior parte dos pontos; divergências pontuais estão sinalizadas.

## Veredito

**Aprovado com observações.** A implementação cumpre os seis critérios de aceite da etapa E04, não toca nenhum arquivo proibido/sensível e não há feature creep. Nenhum achado é bloqueador, alto ou médio; todos são baixo/observação.

## Achados por severidade

### Baixo

**1. Ano de copyright calculado em runtime, mas a rota é prerenderizada estaticamente no build**
- Arquivo: `src/components/public/footer.tsx:2` — `const year = new Date().getFullYear();`
- Impacto: `npm run build` confirma `/` como `○ (Static)`. O valor é calculado uma única vez no momento do build e fica congelado até o próximo deploy — a partir da virada do ano civil o rodapé mostrará o ano errado sem exigir novo build.
- Evidência: saída de `npm run build` nesta sessão (`Route (app) ┌ ○ /`).
- Correção mínima (não obrigatória): aceitar como limitação conhecida de rodapé estático, ou adicionar `export const revalidate = <segundos>` em `app/(public)/layout.tsx`/`page.tsx` se recálculo automático for desejado.

### Observação

**2. `Header` tem dois links apontando para a mesma rota (`/`)**
- Arquivo: `src/components/public/header.tsx:7-17` — logo "Burger Shop" e item de nav "Início" levam ambos a `/`.
- Redundante hoje porque não existe outra rota pública ainda (catálogo é etapa futura, E06+). Não bloqueia a etapa; deixa de fazer sentido apenas quando a navegação ganhar itens reais.

**3. Nenhum teste automatizado dedicado aos novos componentes/layout**
- `Header`, `Footer`, `Button`, `Card`, `ErrorState`, `app/(public)/layout.tsx`, `error.tsx`, `loading.tsx` não têm teste próprio. `npm test` permanece em 25 testes (mesma contagem de antes da etapa, apenas o import de `tests/sanity.test.tsx` foi ajustado).
- A etapa E04 não exige testes novos como critério de aceite (só lint/typecheck/build); build e typecheck cobrem a integridade estrutural. Fica como lacuna de cobertura recomendável quando esses componentes ganharem mais consumidores (E05+).

**4. Mudança de glob no `tailwind.config.ts` tem escopo mais amplo que os arquivos novos desta etapa**
- Arquivo: `tailwind.config.ts:6` — `./components/**/*.{...}` → `./src/components/**/*.{...}`.
- O caminho antigo (`./components/**`) não existe na raiz do repositório (confirmado: não há diretório `components/` fora de `src/`); o código sempre viveu em `src/components/`, então essa era uma correção necessária, não uma regra de negócio. Mas o glob novo passa a cobrir toda a árvore `src/components`, incluindo `src/components/admin/login-form.tsx` (pré-existente da E03).
- Evidência de que nada quebrou: `npm run build` gerou `/admin` e `/admin/login` sem erro; não há regressão visual detectável por build/typecheck (checagem visual em navegador real não foi executada nesta revisão — ver "Riscos remanescentes").

## Evidências dos critérios de aceite

| Critério | Evidência |
|---|---|
| Área pública tem layout base responsivo | `app/(public)/layout.tsx` (header/main/footer + skip-link `sr-only focus:not-sr-only`) + `src/components/public/{header,footer}.tsx`, classes mobile-first (`flex-col sm:flex-row`). Lido linha a linha nesta revisão. |
| Área admin tem shell protegido e navegação básica | **Não alterado por esta etapa** — `app/admin/(protected)/layout.tsx` já continha header/nav/logout desde a E03 (fora do diff atual). |
| Componentes base não acoplam regras futuras | `src/components/ui/{button,card,error-state}.tsx` lidos integralmente: sem Prisma, sem fetch, sem tipo de domínio (produto/pedido/categoria). `Header`/`Footer` só têm link estático e cálculo de ano. Nenhum import cruzado entre `src/components/admin/**` e os novos `public/`/`ui/` (confirmado via grep). |
| Nenhum CRUD ou fluxo de negócio foi implementado | Confirmado por leitura de todos os 9 arquivos do diff — nenhum acesso a banco, nenhum formulário de negócio, nenhum mock de catálogo. |
| Não houve regressão na proteção `/admin/*` | `proxy.ts` e `auth.ts` lidos diretamente nesta revisão: `proxy.ts` reexporta `auth` com `matcher: ["/admin/:path*"]`; `auth.ts` mantém `callbacks.authorized` delegando a `isAdminRequestAuthorized`. Nenhum dos dois aparece no `git status`. `npm run build` confirma `ƒ /admin`, `ƒ /admin/login` e `ƒ Proxy (Middleware)` ativos. |
| Lint, typecheck e build passam | Reexecutados nesta sessão (ver abaixo) — todos limpos. |

**Desvio documentado, não é defeito:** o documento da etapa lista `app/(public)/layout.tsx`/`page.tsx`/`components/layout/**` como "arquivos prováveis"; a implementação usa `src/components/public/` em vez de `components/layout/` na raiz. Isso segue a convenção real já estabelecida na E03 (`src/components/admin/login-form.tsx`, alias `@/*`), consistente com `AGENTS.md §8` ("a estrutura real prevalece" sobre o template genérico do prompt da etapa).

## Validações reexecutadas (nesta sessão)

```
npm run lint       → limpo (eslint . --max-warnings=0)
npm run typecheck  → limpo (tsc --noEmit)
npm test           → 6 suítes, 25 testes, todos passando
npm run build      → sucesso; rotas: / (estática), /_not-found, /admin (dinâmica),
                     /admin/login (dinâmica), /api/auth/[...nextauth] (dinâmica);
                     Proxy (Middleware) ativo
git diff --check (arquivos rastreados)                          → limpo (exit 0)
git add -A (temporário) + git diff --cached --check (12 arquivos,
  incluindo os 6 untracked + este relatório) + git restore --staged .
                                                                  → limpo (exit 0);
  stage desfeito, git status idêntico ao inicial após o teste
git status --short → só os arquivos esperados do escopo desta etapa
grep por "components/layout" (path antigo) em app/ e src/          → nenhuma ocorrência
grep por import cruzado admin → public/ui                          → nenhuma ocorrência
```

## Evidências históricas não reexecutadas

- Verificação funcional via `next dev` + requisição HTTP local (`/` renderiza header/footer/skip-link; `/admin` redireciona para `/admin/login`) — registrada em relatório de execução anterior do Codex, não repetida nesta revisão por ser redundante com as rotas já confirmadas via `npm run build`.
- Inspeção visual em navegador real (incluindo navegação por teclado revelando o skip-link) — não executada nesta revisão nem na anterior (sem ferramenta de browser disponível neste ambiente).

## Riscos remanescentes

- Ano de copyright estático congela no build (achado 1) — impacto muito baixo, cosmético, não bloqueante.
- Ausência de verificação visual real (screenshot/navegador) do impacto do glob do Tailwind sobre `src/components/admin/**` — mitigado por build sem erros, mas não é confirmação visual definitiva.
- Ausência de teste automatizado dedicado aos novos componentes de layout/UI — risco residual não bloqueante, mitigado por lint + typecheck + build.
- Proteção de `/admin/*` depende de cobertura de teste unitário pré-existente da E03 (`tests/auth/*`) mais verificação de rotas via build; não há teste de integração HTTP fim a fim automatizado — risco pré-existente, não introduzido por esta etapa.

## Correções obrigatórias

Nenhuma.

## Correções recomendadas

- Considerar `export const revalidate` no layout/página pública, ou documentar explicitamente a limitação do ano estático no rodapé como decisão aceita.
- Ao introduzir a primeira rota pública real (catálogo, E06+), reavaliar se o link duplicado "Início"/logo no `Header` ainda faz sentido.
- Quando `Button`/`Card`/`ErrorState`/`Header`/`Footer` ganharem mais consumidores (E05+), considerar testes unitários dedicados.
- Fazer uma verificação visual manual (navegador) do shell admin após a mudança de glob do Tailwind, para confirmar que nenhuma classe usada em `src/components/admin/login-form.tsx` foi afetada — o build não detecta regressão puramente visual/de purge incorreto de classe.

## Verificações adicionais solicitadas no prompt da etapa

- **Arquivos alterados vs. prováveis:** os arquivos alterados (`app/(public)/**`, `src/components/public/**`, `src/components/ui/**`, `tailwind.config.ts`, `tests/sanity.test.tsx`, remoção de `app/page.tsx`) cobrem a intenção dos "arquivos prováveis" do documento da etapa, com a diferença de nomenclatura de pasta já explicada acima (desvio documentado, não defeito).
- **Ausência de alterações em arquivos proibidos:** confirmado por `git status --short` — nenhum de `prisma/**`, `lib/db.ts`, `auth.ts`, `middleware.ts`/`proxy.ts`, `app/api/**`, `domain/**`, `services/**`, `components/cart/**`, `app/checkout/**`, `app/carrinho/**`, `public/uploads/**`, `.env*` aparece no diff.
- **Riscos de autenticação/autorização/dados/pedido/checkout/upload/deploy:** nenhum encontrado — nenhum arquivo do diff toca esses domínios; proteção `/admin/*` intacta (ver evidências acima).
- **Ausência de feature creep:** confirmada — nenhum CRUD, catálogo real, carrinho, checkout ou dashboard funcional foi introduzido.
- **Qualidade de tipagem, validação server-side e separação de responsabilidades:** componentes tipados com `ButtonHTMLAttributes`/`HTMLAttributes` do React (sem `any`), props com `readonly` explícito nos tipos de layout; não há validação server-side nesta etapa porque não há entrada de dados externa a validar (consistente com o escopo — apenas layout); Server Components por padrão (`layout.tsx`, `header.tsx`, `footer.tsx`, `page.tsx`, `loading.tsx` sem `"use client"`) e Client Component só onde há interatividade real (`error.tsx`, por exigência do contrato `reset` do Next.js para error boundaries).

## Confirmação de ausência de automação

Nenhum commit, merge, push ou deploy foi executado automaticamente nesta revisão. O único arquivo criado/atualizado por esta revisão é este próprio relatório (`docs/ia-auditorias/E04-layout-publico-admin-revisao.md`).

Status final: Aprovado com observações
