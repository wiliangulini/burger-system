# Roadmap de Execução com IA — Sistema de Hamburgueria

**Arquivo:** `roadmap-execucao-ia.md`

**Origem:** derivado de `roadmap-tecnico.md` e do `Plano-Técnico-Operacional-Sistema-Hamburgueria-v2.md`.

**Função deste documento:** servir como ponte entre o roadmap técnico e a execução prática com IA no VS Code, definindo ordem, escopo, agente executor, agente revisor, validações, critérios de bloqueio e relatório esperado por etapa.

**Importante:** este documento não contém prompts completos de execução e não contém código de implementação.

---

## 1. Restrições globais de execução

- A primeira etapa de execução é **IA-00.01 — Consolidar premissas do MVP**.
- O projeto deve permanecer dentro do MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos, status, configurações, dashboard, testes e deploy.
- Itens pós-MVP ficam proibidos durante todo o roadmap: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, impressora térmica, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.
- Cada etapa deve ser executada em branch própria e revisada antes de avançar.
- Nenhuma etapa pode remover validação, autenticação, autorização, testes ou logging sensível já aceito em etapa anterior.
- Toda alteração em autenticação, autorização, pedido, cálculo financeiro, snapshot, idempotência, upload ou deploy exige revisão reforçada.
- O relatório final da etapa é obrigatório antes de abrir ou concluir o PR.

---

## 2. Matriz de agentes recomendados

| Tipo de etapa | Execução recomendada | Revisão recomendada | Observação |
|---|---|---|---|
| Documentação, escopo, arquitetura e auditoria | Claude Code | Codex + revisão humana | Priorizar análise crítica e controle de escopo. |
| Bootstrap, UI, CRUD simples e testes mecânicos | Codex | Claude Code | Priorizar execução granular e revisão arquitetural. |
| Autenticação, autorização, pedidos, cálculo, status, upload e segurança | Claude Code | Codex + revisão humana | Áreas críticas exigem raciocínio e checagem de bypass. |
| Deploy e release | Codex ou Claude Code, conforme tarefa | Claude Code + revisão humana | Conferir envs, CI, migrations, smoke test e rollback. |

---

## 3. Gates globais de bloqueio

| Gate | Momento | Bloqueia avanço se... |
|---|---|---|
| Gate 0 — Escopo e arquitetura | Antes de codar domínio | MVP não está fechado, stack foi alterada ou há pós-MVP como obrigatório. |
| Gate 1 — Base técnica | Após bootstrap | `lint`, `typecheck`, testes ou build falham. |
| Gate 2 — Banco e domínio | Após models Prisma | Migrations, constraints, Decimal, seed ou secrets estão incorretos. |
| Gate 3 — Segurança admin | Após Auth.js | `/admin/*` ou mutações admin são acessíveis sem sessão/role. |
| Gate 4 — Admin operacional | Após CRUDs | Admin não gerencia categorias/produtos/configurações com validação server-side. |
| Gate 5 — Fluxo público | Após catálogo/carrinho | Cliente não navega/adiciona itens ou produto inativo aparece. |
| Gate 6 — Pedido consistente | Após checkout | Pedido não usa recálculo server-side, snapshot, transação ou idempotência. |
| Gate 7 — Operação de pedidos | Após status/dashboard | Status inválido é aceito ou histórico/auditoria não registra mudanças. |
| Gate 8 — Release candidate | Antes do deploy final | Testes, acessibilidade, segurança, build ou documentação falham. |
| Gate 9 — Produção | Após deploy | App inacessível, env incorreta, migrations pendentes ou smoke test falha. |

---

## 4. Modelo obrigatório de relatório por etapa

Cada etapa deve terminar com um relatório curto contendo:

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

## 5. Roadmap operacional de execução com IA

### Fase 0 — Preparação e congelamento de escopo

#### IA-00.01 — Consolidar premissas do MVP

**ID da etapa:** `IA-00.01`

**Objetivo:** Congelar o escopo obrigatório da primeira versão e separar tudo que for pós-MVP.

**Agente recomendado para execução:** Claude Code no VS Code, em modo planejamento/documentação.

**Agente recomendado para revisão:** Codex no VS Code + revisão humana.

**Pré-requisitos:**

- Plano técnico-operacional V2 disponível.
- Roadmap técnico disponível.
- Nenhuma implementação iniciada.

**Escopo permitido:**

- Criar documento de decisões do MVP.
- Registrar premissas: loja única, PT-BR, moeda R$, sem login de cliente, pagamento manual/offline.
- Separar backlog pós-MVP.

**Escopo proibido:**

- Código de implementação.
- Novas features fora do MVP.
- Gateway de pagamento, login social, multiloja, iFood, filas, app mobile.

**Arquivos prováveis:**

- `docs/adr/0001-escopo-mvp.md`
- `docs/decisoes-arquitetura.md`
- `docs/backlog-pos-mvp.md`
- `README.md`

**Critérios de aceite:**

- Escopo MVP está explícito e fechado.
- Backlog pós-MVP está separado.
- Ambiguidades viraram premissas, não tarefas obrigatórias.

**Comandos obrigatórios de validação:**

```bash
git diff --check
git status --short
```

**Riscos:**

- Feature creep antes do primeiro commit funcional.
- Premissas ambíguas virarem requisitos obrigatórios.

**Rollback:**

- Reverter alterações documentais com `git restore <arquivos>`.
- Remover documentos criados se estiverem incorretos.

**Critérios que bloqueiam avanço:**

- Escopo inclui item pós-MVP como obrigatório.
- Documento não diferencia MVP e backlog.
- Stack obrigatória foi alterada.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-00.02 — Definir convenções de trabalho

**ID da etapa:** `IA-00.02`

**Objetivo:** Padronizar branch, commits, PRs, revisão e formato de relatório antes de executar código.

**Agente recomendado para execução:** Claude Code no VS Code, em modo planejamento/documentação.

**Agente recomendado para revisão:** Codex no VS Code + revisão humana.

**Pré-requisitos:**

- IA-00.01 concluída.
- Escopo MVP congelado.

**Escopo permitido:**

- Definir branch principal.
- Definir branches por tarefa.
- Criar checklist de PR.
- Criar roteiro de desenvolvimento.
- Definir relatório obrigatório por etapa.

**Escopo proibido:**

- Automatizar merge sem revisão.
- Criar workflow complexo de release fora do MVP.
- Alterar escopo funcional.

**Arquivos prováveis:**

- `docs/roteiro-desenvolvimento.md`
- `docs/checklists/pr-checklist.md`
- `README.md`
- `.github/pull_request_template.md`

**Critérios de aceite:**

- Checklist de PR versionado.
- Fluxo de branches documentado.
- Relatório final por etapa padronizado.
- Fica proibido commit direto em `main` após configuração.

**Comandos obrigatórios de validação:**

```bash
git diff --check
git status --short
```

**Riscos:**

- Processo frouxo permitir alterações grandes demais.
- Agentes trabalharem sem critério de aceite.

**Rollback:**

- Reverter documentos de processo.
- Restaurar README anterior se necessário.

**Critérios que bloqueiam avanço:**

- Não existe checklist de PR.
- Não existe padrão de relatório.
- Fluxo permite merge/commit sem revisão.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 1 — Bootstrap técnico e qualidade de base

#### IA-01.01 — Inicializar projeto Next.js

**ID da etapa:** `IA-01.01`

**Objetivo:** Criar a base do projeto com Next.js App Router, TypeScript e Tailwind CSS.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-00.01 e IA-00.02 concluídas.
- Branch da etapa criada.

**Escopo permitido:**

- Inicializar Next.js com App Router.
- Configurar TypeScript, Tailwind e aliases.
- Criar layout público e página inicial de sanity.

**Escopo proibido:**

- Pages Router.
- Lógica de domínio.
- Banco, Auth.js, CRUD, carrinho ou checkout.
- Microfrontend/microserviços.

**Arquivos prováveis:**

- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `next.config.*`

**Critérios de aceite:**

- `npm run dev` inicia sem erro.
- `npm run build` passa.
- Estrutura `/app` existe.
- Home renderiza sem lógica de negócio.

**Comandos obrigatórios de validação:**

```bash
npm run dev
npm run build
git diff --check
```

**Riscos:**

- Gerar estrutura errada com Pages Router.
- Adicionar bibliotecas ou features prematuras.

**Rollback:**

- Remover projeto gerado ou restaurar baseline da branch.
- Recriar bootstrap com flags corretas.

**Critérios que bloqueiam avanço:**

- Build falha.
- Projeto usa Pages Router.
- Arquivos de domínio foram criados sem autorização.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-01.02 — Configurar qualidade mínima

**ID da etapa:** `IA-01.02`

**Objetivo:** Configurar lint, Prettier, typecheck e scripts padronizados.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-01.01 concluída.
- Projeto Next.js buildando.

**Escopo permitido:**

- Configurar ESLint/Prettier.
- Adicionar scripts `lint`, `typecheck`, `build`, `test`.
- Criar arquivos de ignore/configuração.

**Escopo proibido:**

- Ignorar erros de TypeScript.
- Permitir `any` sem justificativa.
- Alterar funcionalidade pública.

**Arquivos prováveis:**

- `package.json`
- `eslint.config.*`
- `.eslintrc.*`
- `.prettierrc`
- `.prettierignore`
- `.editorconfig`
- `tsconfig.json`

**Critérios de aceite:**

- `npm run lint` passa.
- `npm run typecheck` passa.
- `npm run build` passa.
- Scripts estão documentados.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm run build
git diff --check
```

**Riscos:**

- Configuração permissiva demais mascarar erros.
- Conflito entre ESLint/Prettier.

**Rollback:**

- Restaurar configs anteriores.
- Remover regra problemática e reaplicar configuração mínima.

**Critérios que bloqueiam avanço:**

- Lint/typecheck/build falham.
- Script obrigatório ausente.
- Configuração desabilita validações críticas.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-01.03 — Configurar testes base

**ID da etapa:** `IA-01.03`

**Objetivo:** Preparar infraestrutura de testes antes da lógica de negócio.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-01.02 concluída.
- Scripts de qualidade funcionando.

**Escopo permitido:**

- Escolher Jest ou Vitest.
- Configurar Testing Library.
- Criar teste de sanity.
- Preparar pasta de testes de domínio.

**Escopo proibido:**

- Criar testes frágeis acoplados a UI futura.
- Implementar regra de negócio nesta etapa.

**Arquivos prováveis:**

- `package.json`
- `vitest.config.*`
- `jest.config.*`
- `tests/sanity.test.ts`
- `tests/setup.ts`
- `tsconfig.json`

**Critérios de aceite:**

- `npm test` executa.
- Teste de sanity passa.
- Estrutura suporta testes de domínio puro.

**Comandos obrigatórios de validação:**

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

**Riscos:**

- Ferramenta de teste incompatível com Next.js.
- Configuração quebrar build.

**Rollback:**

- Remover setup de testes e voltar ao commit anterior.
- Reconfigurar com alternativa mais simples.

**Critérios que bloqueiam avanço:**

- Testes não executam.
- Build quebra.
- Teste depende de feature ainda inexistente.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-01.04 — Configurar CI inicial

**ID da etapa:** `IA-01.04`

**Objetivo:** Automatizar install, lint, typecheck, test e build em push/PR.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-01.03 concluída.
- Scripts locais passam.

**Escopo permitido:**

- Criar workflow GitHub Actions.
- Configurar cache.
- Documentar comandos locais equivalentes.

**Escopo proibido:**

- Deploy automático complexo.
- Migrations de produção antes do banco.
- Secrets reais no YAML.

**Arquivos prováveis:**

- `.github/workflows/ci.yml`
- `README.md`
- `package.json`

**Critérios de aceite:**

- Workflow aparece no GitHub Actions.
- CI passa no primeiro PR.
- README lista comandos equivalentes.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

**Riscos:**

- CI divergente do ambiente local.
- Cache quebrado ou secrets expostos.

**Rollback:**

- Remover workflow ou restaurar versão anterior.
- Desabilitar etapa problemática apenas com justificativa documentada.

**Critérios que bloqueiam avanço:**

- CI falha.
- Workflow não roda em PR.
- Pipeline ignora lint/typecheck/test/build.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 2 — Banco de dados, Prisma e modelos de domínio

#### IA-02.01 — Configurar Prisma e PostgreSQL

**ID da etapa:** `IA-02.01`

**Objetivo:** Estabelecer a camada de persistência com Prisma e PostgreSQL.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 1 aprovado.
- PostgreSQL local/dev disponível.
- Variáveis locais definidas fora do repositório.

**Escopo permitido:**

- Instalar Prisma.
- Criar schema inicial.
- Configurar `DATABASE_URL`.
- Criar PrismaClient singleton.
- Criar `.env.example` sem segredos.

**Escopo proibido:**

- SQLite como banco principal.
- Instanciar PrismaClient em múltiplos pontos.
- Versionar `.env.local`.

**Arquivos prováveis:**

- `prisma/schema.prisma`
- `lib/db.ts`
- `.env.example`
- `.gitignore`
- `package.json`

**Critérios de aceite:**

- `npx prisma validate` passa.
- Conexão com PostgreSQL validada.
- `.env.local` não versionado.
- `.env.example` sem segredo real.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npm run typecheck
npm test
npm run build
git status --short
```

**Riscos:**

- Vazar string de conexão.
- Configuração prender o projeto a ambiente local específico.

**Rollback:**

- Remover arquivos Prisma/configs criados.
- Restaurar `.gitignore` e `.env.example`.

**Critérios que bloqueiam avanço:**

- Prisma não valida.
- Segredo versionado.
- Banco principal não é PostgreSQL.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-02.02 — Modelar Categoria e Produto

**ID da etapa:** `IA-02.02`

**Objetivo:** Criar os modelos centrais do cardápio no Prisma, sem UI administrativa ainda.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-02.01 concluída.
- Prisma conectado ao PostgreSQL.

**Escopo permitido:**

- Modelar Categoria.
- Modelar Produto.
- Relacionar categoria-produto.
- Usar Decimal para preço.
- Criar migration e seed mínimo.

**Escopo proibido:**

- CRUD admin.
- Páginas públicas.
- Upload real de imagens.
- Float para preço.

**Arquivos prováveis:**

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `package.json`

**Critérios de aceite:**

- Migration aplicada.
- Seed cria categorias/produtos mínimos.
- Slug de categoria é único.
- Preço usa Decimal.
- Relacionamento aparece no Prisma Studio.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npx prisma migrate dev
npm run typecheck
npm test
```

**Riscos:**

- Modelagem financeira incorreta.
- Slug duplicado permitido.
- Relação frágil para pedidos futuros.

**Rollback:**

- Reverter migration em ambiente local.
- Ajustar schema e gerar nova migration antes de avançar.

**Critérios que bloqueiam avanço:**

- Preço usa Float.
- Migration falha.
- Seed não funciona.
- Constraints únicas ausentes.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-02.03 — Modelar Usuário Admin e roles

**ID da etapa:** `IA-02.03`

**Objetivo:** Preparar autenticação e autorização com usuário administrativo e RBAC básico.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-02.02 concluída.
- Migrations anteriores aplicadas.

**Escopo permitido:**

- Criar model de usuário admin.
- Criar enum de role.
- Campo `senhaHash`.
- Seed local de admin via env.

**Escopo proibido:**

- Senha em texto puro.
- Login funcional nesta etapa.
- Login social.
- Roles complexas fora do MVP.

**Arquivos prováveis:**

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `.env.example`

**Critérios de aceite:**

- Usuário admin existe com hash.
- Email único.
- Role obrigatória.
- Seed não expõe senha real no repositório.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npx prisma migrate dev
npm run typecheck
npm test
git diff --check
```

**Riscos:**

- Seed sobrescrever senha forte.
- Vazar senha padrão em produção.
- Model sem base para RBAC.

**Rollback:**

- Reverter migration local.
- Remover seed inseguro.
- Rotacionar segredo se acidentalmente exposto.

**Critérios que bloqueiam avanço:**

- Senha real ou hash sensível versionado.
- Email não é único.
- Role não é obrigatória.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-02.04 — Modelar Pedido, ItemPedido e snapshot

**ID da etapa:** `IA-02.04`

**Objetivo:** Criar a estrutura central de pedidos com snapshot financeiro e idempotência.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-02.03 concluída.
- Models Categoria/Produto/Usuario estáveis.

**Escopo permitido:**

- Criar Pedido.
- Criar ItemPedido.
- Criar HistoricoStatus.
- Criar enum StatusPedido.
- Adicionar `codigoPublico` e `idempotencyKey` únicos.
- Adicionar campos de snapshot.

**Escopo proibido:**

- Checkout UI.
- Serviço de cálculo.
- Atualização de status funcional.
- Pagamento online.

**Arquivos prováveis:**

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `tests/domain/**`

**Critérios de aceite:**

- Migration aplicada.
- Pedido comporta itens em transação.
- Dados de item/preço/cliente são snapshot.
- Status inicial definido.
- Chaves únicas aplicadas.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npx prisma migrate dev
npm run typecheck
npm test
```

**Riscos:**

- Pedido depender do preço atual do produto.
- Duplicidade de pedidos por ausência de idempotência.
- Histórico impossível de auditar.

**Rollback:**

- Reverter migration local.
- Corrigir schema antes de implementar checkout.

**Critérios que bloqueiam avanço:**

- Sem `idempotencyKey` único.
- Sem `codigoPublico` único.
- Snapshot incompleto.
- Status inicial indefinido.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-02.05 — Modelar ConfigLoja e Auditoria

**ID da etapa:** `IA-02.05`

**Objetivo:** Preparar configurações operacionais da loja e trilha mínima de auditoria.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-02.04 concluída.
- Migrations de domínio estáveis.

**Escopo permitido:**

- Criar ConfigLoja.
- Criar AuditLog.
- Seedar configuração inicial.
- Definir eventos mínimos sensíveis.

**Escopo proibido:**

- Tela admin de configuração.
- Logs com senha ou PII desnecessária.
- Observabilidade avançada.

**Arquivos prováveis:**

- `prisma/schema.prisma`
- `prisma/migrations/**`
- `prisma/seed.*`
- `lib/audit/**`
- `types/**`

**Critérios de aceite:**

- Configuração seedada.
- Taxa de entrega existe no banco.
- AuditLog preparado.
- Logs não armazenam dados sensíveis.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npx prisma migrate dev
npm run typecheck
npm test
```

**Riscos:**

- Taxa hardcoded se perpetuar.
- Auditoria inútil ou sensível demais.

**Rollback:**

- Reverter migration local.
- Remover campos de log inadequados.

**Critérios que bloqueiam avanço:**

- Taxa de entrega não vem de ConfigLoja.
- AuditLog registra senha/dado sensível.
- Migration falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 3 — Autenticação, sessão e proteção administrativa

#### IA-03.01 — Configurar Auth.js/NextAuth

**ID da etapa:** `IA-03.01`

**Objetivo:** Implementar login administrativo seguro com Credentials Provider.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- Gate 2 aprovado.
- Usuario admin com `senhaHash` disponível.
- AUTH_SECRET definido localmente.

**Escopo permitido:**

- Instalar/configurar Auth.js.
- Criar `lib/auth.ts`.
- Criar route handler Auth.js.
- Validar email/senha no servidor.
- Incluir role mínima na sessão.

**Escopo proibido:**

- Autenticação manual paralela.
- Login de cliente.
- Motivo específico de falha.
- Expor `senhaHash`.

**Arquivos prováveis:**

- `lib/auth.ts`
- `app/api/auth/[...nextauth]/route.ts`
- `types/next-auth.d.ts`
- `.env.example`
- `package.json`

**Critérios de aceite:**

- Login válido funciona.
- Login inválido retorna erro genérico.
- Sessão contém dados mínimos.
- Senha nunca aparece em log/response/client.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Vazamento de hash.
- Sessão com dados demais.
- Configuração de cookies insegura.

**Rollback:**

- Remover config Auth.js criada.
- Restaurar tipo de sessão anterior.
- Rotacionar segredo se exposto.

**Critérios que bloqueiam avanço:**

- Login válido não funciona.
- Erro revela se email existe.
- `senhaHash` aparece em sessão/API.
- Segredo versionado.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-03.02 — Proteger rotas `/admin/*`

**ID da etapa:** `IA-03.02`

**Objetivo:** Bloquear acesso administrativo sem sessão e sem role ADMIN.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-03.01 concluída.
- Auth.js funcional.

**Escopo permitido:**

- Criar middleware/helper server-side.
- Redirecionar não autenticados.
- Bloquear usuários sem ADMIN.
- Proteger Server Actions/Route Handlers admin.
- Criar tela de login se ainda ausente.

**Escopo proibido:**

- Proteção apenas por UI.
- Rotas admin públicas.
- Permitir qualquer usuário autenticado.
- Implementar cliente login.

**Arquivos prováveis:**

- `middleware.ts`
- `lib/authz.ts`
- `app/admin/login/page.tsx`
- `app/admin/**`
- `app/api/admin/**`

**Critérios de aceite:**

- `/admin/dashboard` sem login redireciona.
- Usuário sem ADMIN é bloqueado.
- Mutação direta sem sessão falha.
- Logout encerra sessão.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Bypass via API/Server Action.
- Loop de redirect.
- Bloquear também `/admin/login` por engano.

**Rollback:**

- Reverter middleware/helper.
- Restaurar roteamento admin anterior.

**Critérios que bloqueiam avanço:**

- Qualquer rota admin acessível sem sessão.
- Mutação admin aceita request sem sessão.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-03.03 — Criar layout administrativo

**ID da etapa:** `IA-03.03`

**Objetivo:** Estabelecer shell visual e navegação mínima do backoffice protegido.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-03.02 concluída.
- Rotas admin protegidas.

**Escopo permitido:**

- Criar layout admin.
- Criar menu admin.
- Exibir usuário logado.
- Criar dashboard provisório.
- Adicionar loading/error mínimos.

**Escopo proibido:**

- CRUD real.
- Métricas reais.
- Rotas futuras como funcionais.
- Expor dados sensíveis da sessão.

**Arquivos prováveis:**

- `app/admin/layout.tsx`
- `app/admin/dashboard/page.tsx`
- `app/admin/loading.tsx`
- `app/admin/error.tsx`
- `components/admin/**`

**Critérios de aceite:**

- Admin logado acessa layout.
- Menu básico funciona.
- Logout funciona.
- Layout responsivo mínimo.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Menu criar expectativa de tela inexistente.
- Duplicar layout público/admin.

**Rollback:**

- Reverter layout/components admin.
- Restaurar dashboard provisório anterior.

**Critérios que bloqueiam avanço:**

- Admin autenticado não acessa dashboard.
- Logout não funciona.
- Layout admin usa dados client-side indevidos.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 4 — Administração de categorias

#### IA-04.01 — Criar camada de validação de categoria

**ID da etapa:** `IA-04.01`

**Objetivo:** Centralizar regras de categoria antes da UI.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 3 aprovado.
- Models Categoria e AuditLog disponíveis.

**Escopo permitido:**

- Criar schema Zod.
- Criar serviço/repositório de categoria.
- Normalizar slug.
- Tratar slug único.

**Escopo proibido:**

- Páginas CRUD.
- Validação apenas no cliente.
- Mudança no modelo Prisma sem justificativa.

**Arquivos prováveis:**

- `lib/validations/categoria.ts`
- `services/categorias/**`
- `repositories/categorias/**`
- `tests/domain/categorias/**`

**Critérios de aceite:**

- Inputs inválidos rejeitados.
- Erro de slug duplicado tratado.
- Regras centralizadas.
- Mutação exige admin quando aplicável.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Duplicar regra em actions futuras.
- Aceitar slug inválido.
- Bypass de validação server-side.

**Rollback:**

- Remover serviço/schema.
- Restaurar implementação anterior sem afetar banco.

**Critérios que bloqueiam avanço:**

- Teste de validação falha.
- Slug inválido aceito.
- Serviço acessa DB sem checar admin quando mutação.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-04.02 — Implementar CRUD de categorias no admin

**ID da etapa:** `IA-04.02`

**Objetivo:** Permitir gestão completa de categorias no backoffice.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-04.01 concluída.
- Layout admin pronto.
- Proteção admin ativa.

**Escopo permitido:**

- Listar, criar, editar, ativar/inativar categoria.
- Excluir apenas se seguro.
- Registrar audit log.
- Invalidar cache público relacionado.

**Escopo proibido:**

- CRUD de produtos.
- Catálogo público completo.
- Exclusão destrutiva de categoria com produtos.
- Mutação sem sessão.

**Arquivos prováveis:**

- `app/admin/categorias/page.tsx`
- `app/admin/categorias/nova/page.tsx`
- `app/admin/categorias/[id]/page.tsx`
- `app/admin/categorias/actions.ts`
- `components/admin/categorias/**`
- `services/categorias/**`

**Critérios de aceite:**

- Admin lista/cria/edita/inativa categoria.
- Categoria inativa não aparece em consultas públicas preparadas.
- Slug duplicado tratado.
- AuditLog registrado.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Deletar categoria usada por produtos.
- UI permitir mutação sem tratamento de erro.

**Rollback:**

- Reverter páginas/actions.
- Restaurar categorias via seed ou backup local se necessário.

**Critérios que bloqueiam avanço:**

- Mutação sem admin funciona.
- Slug duplicado quebra app.
- Categoria com produtos é excluída de forma insegura.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 5 — Administração de produtos

#### IA-05.01 — Criar validação e serviço de produtos

**ID da etapa:** `IA-05.01`

**Objetivo:** Preparar regras de produto fora da UI.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-04.02 concluída.
- Categoria estável e funcional.

**Escopo permitido:**

- Criar schema Zod de produto.
- Validar preço Decimal positivo.
- Validar categoria existente.
- Criar serviço de produto.
- Padronizar BRL/Decimal.

**Escopo proibido:**

- UI CRUD.
- Upload de imagem.
- Preço Float.
- Produto sem categoria válida.

**Arquivos prováveis:**

- `lib/validations/produto.ts`
- `services/produtos/**`
- `repositories/produtos/**`
- `lib/money.ts`
- `tests/domain/produtos/**`

**Critérios de aceite:**

- Produto inválido rejeitado.
- Categoria inexistente rejeitada.
- Preço negativo/zero tratado conforme regra.
- Conversão monetária padronizada.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Erro monetário por conversão incorreta.
- Duplicar regras nas páginas.

**Rollback:**

- Remover serviço/schema de produto.
- Restaurar util monetário anterior.

**Critérios que bloqueiam avanço:**

- Produto sem categoria é aceito.
- Preço inválido é aceito.
- Testes de domínio falham.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-05.02 — Implementar CRUD de produtos sem upload

**ID da etapa:** `IA-05.02`

**Objetivo:** Entregar gestão de cardápio textual antes de imagens.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-05.01 concluída.
- CRUD de categorias funcional.

**Escopo permitido:**

- Listar, criar, editar, ativar/inativar produto.
- Associar categoria.
- Exibir preço em BRL.
- Invalidar cache público.

**Escopo proibido:**

- Upload de imagem.
- Adicionais complexos.
- Promoções/cupons.
- Alterar pedidos antigos ao mudar preço.

**Arquivos prováveis:**

- `app/admin/produtos/page.tsx`
- `app/admin/produtos/novo/page.tsx`
- `app/admin/produtos/[id]/page.tsx`
- `app/admin/produtos/actions.ts`
- `components/admin/produtos/**`
- `services/produtos/**`

**Critérios de aceite:**

- Admin cria/edita produto.
- Produto aparece na listagem admin.
- Produto inativo fica oculto nas consultas públicas.
- Build e testes passam.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Produto sem categoria.
- Preço salvo incorreto.
- Produto inativo ainda aparecer no público.

**Rollback:**

- Reverter páginas/actions de produto.
- Restaurar dados via seed/backup local.

**Critérios que bloqueiam avanço:**

- Mutação sem admin funciona.
- Preço perde precisão.
- Produto inativo é listado publicamente.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-05.03 — Implementar upload seguro de imagens

**ID da etapa:** `IA-05.03`

**Objetivo:** Permitir imagem de produto com validação de segurança mínima.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-05.02 concluída.
- CRUD de produtos funcional.
- Decisão de storage local/produtivo documentada.

**Escopo permitido:**

- Upload PNG/JPEG.
- Limite de tamanho.
- Validação server-side de MIME/extensão/tamanho.
- Renomear com UUID/hash.
- Salvar path seguro.
- Exibir com `next/image`.

**Escopo proibido:**

- SVG.
- Executar/processar conteúdo inseguro.
- Preservar nome original como path público.
- Storage externo complexo sem decisão.

**Arquivos prováveis:**

- `app/admin/produtos/**`
- `components/admin/upload/**`
- `lib/upload/**`
- `public/uploads/**`
- `next.config.*`
- `tests/security/upload.test.ts`

**Critérios de aceite:**

- PNG/JPEG válido aceito.
- Arquivo acima do limite rejeitado.
- Extensão/MIME inválidos rejeitados.
- Nome salvo é seguro.
- Imagem aparece no admin e público.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Upload inseguro.
- Path traversal.
- Runtime da Vercel não persistir uploads locais.

**Rollback:**

- Remover suporte de upload.
- Restaurar imagemPath anterior.
- Excluir arquivos de teste criados em `/public/uploads`.

**Critérios que bloqueiam avanço:**

- SVG aceito.
- Servidor confia só no browser.
- Nome original vira path público.
- Upload quebra build/deploy.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 6 — Catálogo público

#### IA-06.01 — Criar layout público

**ID da etapa:** `IA-06.01`

**Objetivo:** Criar estrutura visual pública responsiva e separada do admin.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 4 parcial aprovado.
- Produtos/categorias disponíveis no banco.

**Escopo permitido:**

- Header, footer, navegação básica.
- Mobile-first.
- Uso de dados da ConfigLoja quando disponível.

**Escopo proibido:**

- Carrinho funcional.
- Checkout.
- Login de cliente.
- Páginas institucionais extras fora do MVP.

**Arquivos prováveis:**

- `app/layout.tsx`
- `components/public/Header.tsx`
- `components/public/Footer.tsx`
- `components/public/Nav.tsx`
- `app/globals.css`

**Critérios de aceite:**

- Layout público renderiza.
- Admin permanece separado.
- Navegação básica funciona.
- Responsividade mínima validada.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Misturar layout admin e público.
- Adicionar páginas fora do MVP.

**Rollback:**

- Reverter componentes/layout público.
- Restaurar CSS anterior.

**Critérios que bloqueiam avanço:**

- Admin herda layout público indevidamente.
- Build falha.
- Links apontam para rotas inexistentes como se fossem funcionais.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-06.02 — Implementar home com categorias

**ID da etapa:** `IA-06.02`

**Objetivo:** Exibir categorias ativas na home pública.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-06.01 concluída.
- Categorias seedadas/administráveis.

**Escopo permitido:**

- Buscar categorias ativas server-side.
- Renderizar cards/links.
- Estado vazio simples.
- SEO básico da home.

**Escopo proibido:**

- Listagem de produtos por categoria.
- Busca/filtros sofisticados.
- Carrinho.

**Arquivos prováveis:**

- `app/page.tsx`
- `components/public/CategoryCard.tsx`
- `services/categorias/**`

**Critérios de aceite:**

- Home lista categorias ativas.
- Categoria inativa não aparece.
- Estado vazio tratado.
- Página builda como Server Component quando possível.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Expor categoria inativa.
- Transformar home em client component sem necessidade.

**Rollback:**

- Reverter home/cards.
- Restaurar consulta pública anterior.

**Critérios que bloqueiam avanço:**

- Categorias inativas aparecem.
- Home quebra quando não há categorias.
- Hooks usados em Server Component indevidamente.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-06.03 — Implementar listagem por categoria

**ID da etapa:** `IA-06.03`

**Objetivo:** Exibir produtos ativos de uma categoria pública.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-06.02 concluída.
- Produtos ativos/inativos cadastrados.

**Escopo permitido:**

- Criar rota `/categoria/[slug]`.
- Buscar categoria ativa por slug.
- Listar produtos ativos.
- Tratar categoria inexistente/inativa com not-found.

**Escopo proibido:**

- Carrinho.
- Filtros avançados.
- Adicionais complexos.
- Exibir produto inativo.

**Arquivos prováveis:**

- `app/categoria/[slug]/page.tsx`
- `app/categoria/[slug]/not-found.tsx`
- `components/public/ProductCard.tsx`
- `services/produtos/**`

**Critérios de aceite:**

- Categoria válida renderiza produtos.
- Categoria inexistente/inativa retorna 404.
- Produto inativo não aparece.
- Preço formatado em BRL.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Slug não tratado.
- Produto inativo exposto.
- Consulta client-side desnecessária.

**Rollback:**

- Reverter rota de categoria e componentes relacionados.

**Critérios que bloqueiam avanço:**

- 404 não funciona.
- Produto inativo aparece.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-06.04 — Implementar detalhe do produto

**ID da etapa:** `IA-06.04`

**Objetivo:** Exibir detalhe público de produto ativo.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-06.03 concluída.
- ProductCard aponta para detalhe.

**Escopo permitido:**

- Criar rota de detalhe.
- Exibir nome, descrição, preço, imagem e disponibilidade.
- Tratar produto inexistente/inativo.

**Escopo proibido:**

- Adicionar ao carrinho funcional.
- Checkout.
- Reviews, favoritos, recomendações.

**Arquivos prováveis:**

- `app/produto/[id]/page.tsx`
- `app/produto/[id]/not-found.tsx`
- `components/public/ProductDetail.tsx`
- `services/produtos/**`

**Critérios de aceite:**

- Produto ativo renderiza.
- Produto inativo/inexistente retorna 404.
- Imagem tem alt.
- Preço em BRL.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Expor produto inativo.
- Criar client component sem necessidade.

**Rollback:**

- Reverter rota de detalhe e componente.

**Critérios que bloqueiam avanço:**

- Produto inativo acessível.
- Imagem sem alt.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 7 — Carrinho client-side

#### IA-07.01 — Criar modelo de estado do carrinho

**ID da etapa:** `IA-07.01`

**Objetivo:** Criar estado client-side do carrinho sem persistir carrinhos no banco.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 5 parcial aprovado.
- Catálogo público com produtos ativos.

**Escopo permitido:**

- Criar hook/context/store do carrinho.
- Persistir em localStorage.
- Adicionar/remover/alterar quantidade.
- Definir payload mínimo para checkout.

**Escopo proibido:**

- Persistir carrinho no banco.
- Login de cliente.
- Cálculo financeiro definitivo no cliente.

**Arquivos prováveis:**

- `hooks/useCart.ts`
- `components/cart/**`
- `types/cart.ts`
- `tests/domain/cart.test.ts`

**Critérios de aceite:**

- Carrinho adiciona/remove/atualiza itens.
- Estado persiste no browser.
- Payload não inclui preço como fonte da verdade.
- Testes passam.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Hidratação quebrada.
- Cliente acreditar que total local é definitivo.
- localStorage acessado no servidor.

**Rollback:**

- Reverter hook/store/componentes do carrinho.
- Limpar localStorage manualmente em testes.

**Critérios que bloqueiam avanço:**

- Erro de hidratação.
- Carrinho depende de banco.
- Payload exige preço do cliente como verdade.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-07.02 — Criar página `/carrinho`

**ID da etapa:** `IA-07.02`

**Objetivo:** Permitir revisar itens antes do checkout.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-07.01 concluída.
- Rotas de produto/categoria estáveis.

**Escopo permitido:**

- Criar página de carrinho.
- Alterar quantidades.
- Remover itens.
- Mostrar subtotal estimado com aviso implícito/adequado.
- Link para checkout.

**Escopo proibido:**

- Criar pedido.
- Recalcular total definitivo no cliente.
- Login de cliente.

**Arquivos prováveis:**

- `app/carrinho/page.tsx`
- `components/cart/CartView.tsx`
- `components/cart/CartItem.tsx`
- `hooks/useCart.ts`

**Critérios de aceite:**

- Página mostra itens.
- Quantidade pode ser editada.
- Item pode ser removido.
- Carrinho vazio é tratado.
- CTA para checkout funciona.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Subtotal local divergir e ser apresentado como definitivo.
- Carrinho vazio quebrar UI.

**Rollback:**

- Reverter página/componentes do carrinho.

**Critérios que bloqueiam avanço:**

- Carrinho vazio quebra.
- Checkout acessado sem itens sem tratamento.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 8 — Checkout e criação de pedido

#### IA-08.01 — Criar schemas de checkout

**ID da etapa:** `IA-08.01`

**Objetivo:** Validar payload de checkout no servidor antes do cálculo e da persistência.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-07.02 concluída.
- Models Pedido/ItemPedido disponíveis.

**Escopo permitido:**

- Criar schema Zod para dados do cliente, itens e idempotencyKey.
- Definir mensagens de erro.
- Limitar tamanhos de campos.

**Escopo proibido:**

- Criar pedido.
- UI completa de checkout.
- Validação apenas client-side.
- Campos de pagamento online.

**Arquivos prováveis:**

- `lib/validations/checkout.ts`
- `types/checkout.ts`
- `tests/domain/checkout-validation.test.ts`

**Critérios de aceite:**

- Payload inválido rejeitado.
- Campos obrigatórios validados.
- Limites de tamanho definidos.
- idempotencyKey obrigatória.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Aceitar payload malicioso/grande.
- Permitir item sem produto/quantidade.

**Rollback:**

- Remover schema de checkout e testes.

**Critérios que bloqueiam avanço:**

- Payload sem idempotencyKey é aceito.
- Campos longos demais são aceitos.
- Testes falham.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-08.02 — Implementar serviço de cálculo de pedido

**ID da etapa:** `IA-08.02`

**Objetivo:** Recalcular preços, taxa e total no servidor como fonte da verdade.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-08.01 concluída.
- ConfigLoja com taxa de entrega.
- Produtos no banco.

**Escopo permitido:**

- Buscar produtos ativos.
- Recalcular subtotal por item.
- Aplicar taxa de entrega do banco.
- Retornar totais Decimal/BRL consistentes.
- Tratar estoque se habilitado.

**Escopo proibido:**

- Persistir pedido.
- Confiar em preço do cliente.
- Gateway de pagamento.

**Arquivos prováveis:**

- `services/pedidos/calcular-pedido.ts`
- `lib/money.ts`
- `tests/domain/calculo-pedido.test.ts`

**Critérios de aceite:**

- Preço do cliente é ignorado.
- Subtotal/taxa/total corretos.
- Produto inativo/inexistente rejeitado.
- Testes cobrem casos críticos.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Erro monetário por Decimal mal tratado.
- Produto inativo vendido.
- Taxa hardcoded.

**Rollback:**

- Reverter serviço de cálculo.
- Restaurar util monetário anterior.

**Critérios que bloqueiam avanço:**

- Cálculo depende de preço enviado pelo cliente.
- Produto inativo aceito.
- Taxa não vem do banco.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-08.03 — Implementar criação transacional de pedido

**ID da etapa:** `IA-08.03`

**Objetivo:** Persistir pedido com snapshot, itens, idempotência e transação atômica.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-08.02 concluída.
- Schema de Pedido/ItemPedido estável.

**Escopo permitido:**

- Criar serviço/action/route de criação.
- Usar transação Prisma.
- Gerar código público único.
- Respeitar idempotencyKey.
- Salvar snapshot imutável.

**Escopo proibido:**

- UI de checkout completa.
- Pagamento online.
- Atualizar status admin.
- Alterar produto durante pedido fora da transação.

**Arquivos prováveis:**

- `services/pedidos/criar-pedido.ts`
- `app/api/pedidos/route.ts`
- `app/checkout/actions.ts`
- `tests/integration/criar-pedido.test.ts`

**Critérios de aceite:**

- Pedido criado com itens em transação.
- Reenvio com mesma idempotencyKey retorna mesmo pedido.
- Snapshot preserva valores.
- Erro não cria pedido parcial.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Pedido duplicado.
- Pedido parcial sem itens.
- Snapshot dependente do produto atual.

**Rollback:**

- Reverter serviço/route/action.
- Limpar pedidos de teste no banco dev.
- Recriar migration apenas se schema foi afetado.

**Critérios que bloqueiam avanço:**

- Idempotência falha.
- Transação ausente.
- Snapshot incompleto.
- Teste de duplicidade falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-08.04 — Criar página `/checkout`

**ID da etapa:** `IA-08.04`

**Objetivo:** Permitir cliente preencher dados e enviar pedido usando o serviço server-side.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-08.03 concluída.
- Carrinho funcional.
- Serviço de criação de pedido aprovado.

**Escopo permitido:**

- Criar formulário de checkout.
- Ler itens do carrinho.
- Enviar payload mínimo.
- Exibir erros/sucesso.
- Gerar idempotencyKey no fluxo.

**Escopo proibido:**

- Cálculo definitivo no cliente.
- Pagamento online.
- Cadastro/login de cliente.

**Arquivos prováveis:**

- `app/checkout/page.tsx`
- `components/checkout/CheckoutForm.tsx`
- `app/checkout/actions.ts`
- `hooks/useCart.ts`

**Critérios de aceite:**

- Formulário valida campos.
- Pedido válido é criado.
- Carrinho vazio é tratado.
- Erro do servidor é exibido sem stack trace.
- Sucesso redireciona para confirmação.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Duplo clique criar duplicata.
- Exibir erro técnico ao cliente.
- Submeter carrinho vazio.

**Rollback:**

- Reverter página/formulário de checkout.
- Manter serviço de pedido se aprovado.

**Critérios que bloqueiam avanço:**

- Pedido duplicado em duplo submit.
- Campos inválidos aceitos.
- Erro técnico aparece na UI.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-08.05 — Criar página de confirmação de pedido

**ID da etapa:** `IA-08.05`

**Objetivo:** Exibir confirmação com código público após pedido criado.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-08.04 concluída.
- Pedido cria `codigoPublico`.

**Escopo permitido:**

- Criar rota de confirmação.
- Exibir código público, resumo e status inicial.
- Limpar carrinho após sucesso.

**Escopo proibido:**

- Acompanhamento público complexo.
- Alterar pedido pelo cliente.
- Login de cliente.

**Arquivos prováveis:**

- `app/pedido/[codigo]/page.tsx`
- `components/pedido/PedidoConfirmacao.tsx`
- `services/pedidos/consultar-pedido-publico.ts`

**Critérios de aceite:**

- Código público válido mostra resumo seguro.
- Código inválido retorna 404.
- Não expõe dados administrativos.
- Carrinho limpa após sucesso.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Expor PII além do necessário.
- Permitir consulta por ID interno.
- Carrinho não limpar.

**Rollback:**

- Reverter rota de confirmação.
- Restaurar comportamento pós-checkout anterior.

**Critérios que bloqueiam avanço:**

- ID interno exposto.
- Pedido de outro cliente mostra dados sensíveis excessivos.
- Código inválido não trata 404.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 9 — Processamento de pedidos no admin

#### IA-09.01 — Criar listagem de pedidos

**ID da etapa:** `IA-09.01`

**Objetivo:** Permitir que admin veja pedidos com filtros básicos por status.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 6 aprovado.
- Pedidos podem ser criados.

**Escopo permitido:**

- Criar página `/admin/pedidos`.
- Listar pedidos recentes.
- Filtrar por status.
- Paginação simples se necessário.
- Proteger server-side.

**Escopo proibido:**

- Detalhe completo.
- Alteração de status.
- Exportação/BI.
- Notificações.

**Arquivos prováveis:**

- `app/admin/pedidos/page.tsx`
- `components/admin/pedidos/PedidoTable.tsx`
- `services/pedidos/listar-pedidos.ts`

**Critérios de aceite:**

- Admin vê pedidos.
- Filtro por status funciona.
- Sem sessão não acessa.
- Dados exibidos são suficientes para operação.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Listagem pesada sem limite.
- Vazar dados para público.

**Rollback:**

- Reverter página/listagem.
- Manter serviços aprovados se reutilizáveis.

**Critérios que bloqueiam avanço:**

- Rota acessível sem admin.
- Filtro retorna status incorreto.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-09.02 — Criar detalhe do pedido

**ID da etapa:** `IA-09.02`

**Objetivo:** Exibir snapshot completo e histórico do pedido para o admin.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-09.01 concluída.
- Pedidos com itens e histórico existem.

**Escopo permitido:**

- Criar rota de detalhe admin.
- Exibir itens snapshot, cliente, total, forma de pagamento, status e histórico.
- Tratar pedido inexistente.

**Escopo proibido:**

- Alterar status.
- Editar pedido.
- Recalcular pedido antigo pelo preço atual.

**Arquivos prováveis:**

- `app/admin/pedidos/[id]/page.tsx`
- `components/admin/pedidos/PedidoDetalhe.tsx`
- `services/pedidos/obter-pedido-admin.ts`

**Critérios de aceite:**

- Admin vê detalhe completo.
- Valores vêm do snapshot.
- Histórico é exibido.
- Pedido inexistente trata 404.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Usar preço atual do produto no detalhe.
- Expor detalhe sem admin.

**Rollback:**

- Reverter rota/componentes de detalhe.

**Critérios que bloqueiam avanço:**

- Detalhe usa dados atuais do produto em vez de snapshot.
- Rota acessível sem admin.
- 404 ausente.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-09.03 — Implementar máquina de estados

**ID da etapa:** `IA-09.03`

**Objetivo:** Definir transições válidas de status de pedido em lógica testável.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-09.02 concluída.
- Enum StatusPedido estável.

**Escopo permitido:**

- Criar função pura de transição.
- Definir estados finais.
- Bloquear saltos inválidos.
- Testar matriz de transições.

**Escopo proibido:**

- UI de alteração.
- Persistência da alteração.
- Reabertura de cancelado/entregue.

**Arquivos prováveis:**

- `domain/pedidos/status.ts`
- `tests/domain/status-pedido.test.ts`
- `types/pedidos.ts`

**Critérios de aceite:**

- Transições válidas passam.
- Transições inválidas falham.
- Cancelado/Entregue são finais.
- Lógica é isolada e testável.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Status inconsistentes.
- Permitir reabrir pedido finalizado.
- Duplicar regras na UI.

**Rollback:**

- Reverter arquivo de domínio e testes.

**Critérios que bloqueiam avanço:**

- Teste permite salto inválido.
- Estado final pode voltar.
- Regras ficam só na UI.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-09.04 — Implementar alteração de status com histórico

**ID da etapa:** `IA-09.04`

**Objetivo:** Permitir que admin altere status seguindo a máquina de estados e auditando a ação.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-09.03 concluída.
- Detalhe admin de pedido funcional.
- AuditLog/HistoricoStatus disponíveis.

**Escopo permitido:**

- Criar action/service de alteração.
- Validar admin server-side.
- Persistir histórico.
- Registrar audit log.
- Atualizar UI do detalhe.

**Escopo proibido:**

- Transição inválida.
- Editar dados imutáveis do pedido.
- Notificações externas.

**Arquivos prováveis:**

- `app/admin/pedidos/[id]/actions.ts`
- `services/pedidos/alterar-status.ts`
- `components/admin/pedidos/StatusForm.tsx`
- `tests/integration/alterar-status.test.ts`

**Critérios de aceite:**

- Admin altera para próximo status válido.
- Transição inválida bloqueada.
- Histórico registra admin/data/status.
- Pedido finalizado não reabre.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Atualização sem histórico.
- Bypass de transição via request direta.
- Concorrência simples gerar estado incorreto.

**Rollback:**

- Reverter action/service/form.
- Restaurar status de pedidos de teste manualmente no banco dev.

**Critérios que bloqueiam avanço:**

- Request direta aceita status inválido.
- Histórico não é criado.
- Mutação sem admin funciona.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 10 — Configurações da loja

#### IA-10.01 — Criar página admin de configurações

**ID da etapa:** `IA-10.01`

**Objetivo:** Permitir admin editar configurações básicas da loja.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 7 aprovado.
- ConfigLoja modelada/seedada.
- Layout admin pronto.

**Escopo permitido:**

- Editar nome, endereço, telefone, horário, taxa de entrega e logo/imagem se já houver upload seguro aplicável.
- Validar server-side.
- Registrar audit log.

**Escopo proibido:**

- Configurações avançadas.
- Multiloja.
- Integrações externas.
- Configurar gateway.

**Arquivos prováveis:**

- `app/admin/configuracoes/page.tsx`
- `app/admin/configuracoes/actions.ts`
- `components/admin/configuracoes/**`
- `lib/validations/config-loja.ts`
- `services/config-loja/**`

**Critérios de aceite:**

- Admin visualiza e edita config.
- Taxa de entrega validada.
- AuditLog registrado.
- Sem admin não acessa.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Taxa inválida afetar checkout.
- Permitir dados sem validação.

**Rollback:**

- Reverter página/actions.
- Restaurar ConfigLoja via seed/backup local.

**Critérios que bloqueiam avanço:**

- Taxa negativa aceita.
- Config pode ser editada sem admin.
- Checkout quebra após mudança.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-10.02 — Integrar configurações no público e checkout

**ID da etapa:** `IA-10.02`

**Objetivo:** Usar ConfigLoja no layout público e no cálculo de checkout.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-10.01 concluída.
- Serviço de ConfigLoja validado.

**Escopo permitido:**

- Mostrar dados da loja no público.
- Ler taxa no cálculo do pedido.
- Tratar ausência de config com fallback seguro.

**Escopo proibido:**

- Taxa hardcoded.
- Config multi-loja.
- Páginas institucionais extras.

**Arquivos prováveis:**

- `services/config-loja/**`
- `components/public/Footer.tsx`
- `services/pedidos/calcular-pedido.ts`
- `app/layout.tsx`

**Critérios de aceite:**

- Footer/header usam dados do banco.
- Checkout usa taxa de ConfigLoja.
- Ausência de config não quebra app.
- Testes de cálculo atualizados.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Checkout divergir da configuração.
- Dependência circular entre serviços.

**Rollback:**

- Reverter integração e manter ConfigLoja isolada.
- Restaurar teste de cálculo anterior.

**Critérios que bloqueiam avanço:**

- Taxa hardcoded permanece.
- Checkout usa valor diferente do admin.
- App quebra sem ConfigLoja.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 11 — Dashboard admin

#### IA-11.01 — Implementar métricas principais

**ID da etapa:** `IA-11.01`

**Objetivo:** Exibir resumo operacional do dia no dashboard admin.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Gate 7 aprovado.
- Pedidos reais/teste disponíveis.

**Escopo permitido:**

- Total de pedidos do dia.
- Receita do dia por snapshot.
- Pedidos pendentes/em preparo.
- Últimos pedidos.

**Escopo proibido:**

- BI complexo.
- Gráficos avançados.
- Analytics externo.
- Forecast.

**Arquivos prováveis:**

- `app/admin/dashboard/page.tsx`
- `components/admin/dashboard/**`
- `services/dashboard/**`

**Critérios de aceite:**

- Dashboard mostra métricas principais.
- Valores usam snapshot de pedido.
- Consulta limitada e performática para MVP.
- Sem admin não acessa.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Métrica usar preço atual do produto.
- Consulta sem limite ficar pesada.

**Rollback:**

- Reverter dashboard para versão provisória.
- Manter serviços se testes aprovados.

**Critérios que bloqueiam avanço:**

- Receita calculada incorretamente.
- Dashboard acessível sem admin.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-11.02 — Criar alertas operacionais simples

**ID da etapa:** `IA-11.02`

**Objetivo:** Destacar pedidos que precisam de ação sem criar sistema de notificações externo.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-11.01 concluída.
- Status de pedidos operacional.

**Escopo permitido:**

- Alertar pedidos aguardando/em preparo.
- Ordenar últimos pedidos.
- Destacar atrasos simples por tempo se regra estiver definida.

**Escopo proibido:**

- Email/SMS/WhatsApp automático.
- Webhooks.
- Fila/worker.
- BI avançado.

**Arquivos prováveis:**

- `components/admin/dashboard/**`
- `services/dashboard/**`
- `app/admin/dashboard/page.tsx`

**Critérios de aceite:**

- Alertas aparecem apenas no admin.
- Não dependem de serviço externo.
- Não criam novas entidades complexas.
- Testes/build passam.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Virar sistema de notificação fora do MVP.
- Regra de atraso arbitrária sem documentação.

**Rollback:**

- Reverter componentes/serviços de alertas.

**Critérios que bloqueiam avanço:**

- Foi criada integração externa.
- Alerta depende de fila/worker.
- Regra não documentada.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 12 — UX, validação e tratamento de erros

#### IA-12.01 — Padronizar componentes de formulário

**ID da etapa:** `IA-12.01`

**Objetivo:** Unificar UX de formulários admin/públicos sem alterar regras de negócio.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Fluxos principais implementados.
- Validações server-side já existentes.

**Escopo permitido:**

- Criar componentes reutilizáveis de input, textarea, select, submit, mensagens.
- Melhorar acessibilidade de labels/erros.
- Padronizar loading.

**Escopo proibido:**

- Remover validação server-side.
- Refatoração visual ampla sem necessidade.
- Design system complexo.

**Arquivos prováveis:**

- `components/ui/**`
- `components/admin/**`
- `components/checkout/**`
- `app/globals.css`

**Critérios de aceite:**

- Formulários mantêm comportamento.
- Labels/erros acessíveis.
- Loading/disabled padronizados.
- Build/testes passam.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Refatoração quebrar fluxo funcional.
- Acessibilidade piorar.

**Rollback:**

- Reverter componentes UI e usos alterados.

**Critérios que bloqueiam avanço:**

- Checkout/admin param de enviar.
- Validação server-side removida.
- Campos ficam sem label.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-12.02 — Criar tratamento de erro por rota

**ID da etapa:** `IA-12.02`

**Objetivo:** Padronizar `error.tsx`, `not-found.tsx` e mensagens genéricas seguras.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-12.01 concluída.
- Rotas principais existentes.

**Escopo permitido:**

- Criar/ajustar error boundaries.
- Criar not-found por domínio quando útil.
- Evitar stack trace em produção.
- Mensagens em PT-BR.

**Escopo proibido:**

- Expor detalhes internos.
- Mudar regra de negócio.
- Criar observabilidade avançada.

**Arquivos prováveis:**

- `app/error.tsx`
- `app/not-found.tsx`
- `app/admin/error.tsx`
- `app/categoria/[slug]/not-found.tsx`
- `app/produto/[id]/not-found.tsx`

**Critérios de aceite:**

- Erros são genéricos ao usuário.
- 404 funciona em rotas públicas/admin.
- Build passa.
- Sem stack trace em produção.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Vazar detalhe técnico.
- Error boundary quebrar Server Components.

**Rollback:**

- Reverter arquivos error/not-found alterados.

**Critérios que bloqueiam avanço:**

- Stack trace aparece ao usuário.
- 404 não funciona.
- Build falha.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 13 — Segurança aplicada e logs

#### IA-13.01 — Aplicar rate limiting básico

**ID da etapa:** `IA-13.01`

**Objetivo:** Reduzir abuso em login e criação de pedidos com solução simples compatível com MVP.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- Fluxos de login e checkout funcionais.
- Decisão de armazenamento do rate limit documentada.

**Escopo permitido:**

- Limitar tentativas de login.
- Limitar criação de pedidos por IP/chave simples.
- Mensagens genéricas.
- Documentar limitação em serverless.

**Escopo proibido:**

- Redis/fila obrigatórios.
- Captcha obrigatório.
- Bloquear usuários legítimos por regra agressiva.

**Arquivos prováveis:**

- `lib/rate-limit.ts`
- `lib/auth.ts`
- `app/api/pedidos/route.ts`
- `app/checkout/actions.ts`
- `tests/security/rate-limit.test.ts`

**Critérios de aceite:**

- Login abusivo é limitado.
- Flood de pedidos é limitado.
- Mensagens não revelam detalhes.
- Solução é documentada.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Rate limit in-memory não funcionar bem em serverless e dar falsa segurança.
- Bloquear fluxo normal.

**Rollback:**

- Desabilitar/reverter rate limit se quebrar fluxo.
- Manter documentação de limitação.

**Critérios que bloqueiam avanço:**

- Rate limit quebra login válido.
- Não há limitação alguma em login.
- Erro revela informação sensível.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-13.02 — Implementar logs mínimos seguros

**ID da etapa:** `IA-13.02`

**Objetivo:** Registrar eventos sensíveis sem armazenar segredos ou PII desnecessária.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- AuditLog modelado.
- Auth, CRUDs e status funcionais.

**Escopo permitido:**

- Registrar login admin, CRUD sensível, status de pedido, erro crítico.
- Mascarar dados quando necessário.
- Centralizar helper de auditoria.

**Escopo proibido:**

- Logar senha/hash/token.
- Observabilidade externa obrigatória.
- Sentry obrigatório.

**Arquivos prováveis:**

- `lib/audit/**`
- `services/**`
- `app/admin/**/actions.ts`
- `app/api/**`
- `tests/security/audit-log.test.ts`

**Critérios de aceite:**

- Eventos mínimos registrados.
- Sem senha/hash/token em logs.
- Falha de log não quebra fluxo principal indevidamente.
- Testes passam.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Log sensível virar passivo LGPD.
- Log falhar e impedir operação sem necessidade.

**Rollback:**

- Reverter chamadas de auditoria.
- Limpar logs de teste no banco dev.

**Critérios que bloqueiam avanço:**

- Senha/hash/token aparece em log.
- Evento sensível não registra auditoria.
- Mutação quebra se log falha sem tratamento.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-13.03 — Revisão OWASP mínima

**ID da etapa:** `IA-13.03`

**Objetivo:** Auditar o MVP contra riscos básicos de autenticação, autorização, validação, upload e segredos.

**Agente recomendado para execução:** Claude Code no VS Code, em modo revisão/auditoria.

**Agente recomendado para revisão:** Revisão humana obrigatória.

**Pré-requisitos:**

- IA-13.01 e IA-13.02 concluídas.
- Fluxo crítico implementado.

**Escopo permitido:**

- Criar checklist OWASP aplicado.
- Revisar Auth/RBAC.
- Revisar upload.
- Revisar logs/segredos.
- Abrir pendências bloqueantes/não bloqueantes.

**Escopo proibido:**

- Implementar refatorações grandes nessa mesma etapa.
- Adicionar ferramenta externa complexa sem necessidade.

**Arquivos prováveis:**

- `docs/auditorias/owasp-minima.md`
- `docs/checklists/security-checklist.md`

**Critérios de aceite:**

- Checklist preenchido.
- Riscos classificados.
- Pendências bloqueantes identificadas.
- Nenhuma credencial em repositório.

**Comandos obrigatórios de validação:**

```bash
git diff --check
git status --short
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Auditoria superficial deixar bypass crítico.
- Misturar auditoria com implementação grande.

**Rollback:**

- Reverter documentos de auditoria apenas se incorretos.
- Criar etapas corretivas específicas para achados.

**Critérios que bloqueiam avanço:**

- Achado crítico sem etapa corretiva.
- Segredo versionado.
- Bypass admin conhecido sem correção planejada.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 14 — Testes automatizados

#### IA-14.01 — Testes unitários de domínio

**ID da etapa:** `IA-14.01`

**Objetivo:** Cobrir regras puras de domínio: cálculo, validação, status e carrinho.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- Domínio principal implementado.
- Infra de testes pronta.

**Escopo permitido:**

- Adicionar testes unitários para cálculo de pedido, status, validações e carrinho.
- Melhorar testabilidade sem refatoração ampla.

**Escopo proibido:**

- E2E.
- Testes dependentes de rede externa.
- Reescrever domínio sem necessidade.

**Arquivos prováveis:**

- `tests/domain/**`
- `services/**`
- `domain/**`
- `lib/validations/**`

**Critérios de aceite:**

- Casos felizes e erros críticos cobertos.
- `npm test` passa.
- Testes são determinísticos.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Testes frágeis ou sem asserts relevantes.
- Mock mascarar bug de cálculo.

**Rollback:**

- Reverter testes/refatorações auxiliares se quebrarem fluxo.
- Manter correções de bug separadas se descobertas.

**Critérios que bloqueiam avanço:**

- Teste crítico ausente para cálculo/status.
- Testes falham.
- Refatoração altera comportamento sem aceite.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-14.02 — Testes de integração

**ID da etapa:** `IA-14.02`

**Objetivo:** Cobrir integração com banco/Prisma nos fluxos críticos.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-14.01 concluída.
- Banco de teste ou estratégia local definida.

**Escopo permitido:**

- Testar criação de pedido transacional.
- Testar auth/admin quando viável.
- Testar CRUDs principais.
- Isolar dados de teste.

**Escopo proibido:**

- E2E browser.
- Dependência de produção.
- Usar banco real de produção.

**Arquivos prováveis:**

- `tests/integration/**`
- `prisma/seed-test.*`
- `vitest.config.*`
- `.env.example`

**Critérios de aceite:**

- Integração cria pedido sem duplicidade.
- CRUD admin respeita validação/autorização.
- Testes limpam dados.
- `npm test` passa.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Testes poluírem banco dev.
- Depender de ordem de execução.

**Rollback:**

- Limpar dados de teste.
- Reverter setup de integração se instável.

**Critérios que bloqueiam avanço:**

- Teste usa banco de produção.
- Dados não são isolados.
- Fluxo crítico sem integração.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-14.03 — Testes E2E

**ID da etapa:** `IA-14.03`

**Objetivo:** Validar fluxos principais no navegador: compra e admin.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-14.02 concluída.
- App roda localmente com seed de teste.

**Escopo permitido:**

- Configurar Playwright ou Cypress.
- Testar navegação catálogo→carrinho→checkout→confirmação.
- Testar login admin e operações mínimas.
- Documentar execução.

**Escopo proibido:**

- Cobertura E2E exaustiva.
- Testar serviços externos.
- Criar dados manualmente fora de seed.

**Arquivos prováveis:**

- `e2e/**`
- `playwright.config.*`
- `cypress.config.*`
- `package.json`
- `README.md`

**Critérios de aceite:**

- E2E do fluxo de compra passa.
- E2E de login/admin mínimo passa.
- Execução documentada.
- CI pode rodar ou etapa manual documentada.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

**Riscos:**

- E2E flaky.
- Ambiente de teste não reproduzível.

**Rollback:**

- Remover config E2E instável ou marcar execução manual documentada.
- Restaurar package scripts.

**Critérios que bloqueiam avanço:**

- Fluxo de compra não tem E2E.
- E2E depende de dados externos não controlados.
- Teste falha intermitentemente sem justificativa.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-14.04 — Testes de acessibilidade

**ID da etapa:** `IA-14.04`

**Objetivo:** Validar acessibilidade básica nas rotas críticas.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-14.03 concluída.
- Rotas críticas estáveis.

**Escopo permitido:**

- Checar labels, navegação por teclado, alt em imagens, contraste básico.
- Adicionar axe se já compatível.
- Registrar pendências.

**Escopo proibido:**

- Certificação formal WCAG.
- Redesign amplo.
- Ferramentas pagas.

**Arquivos prováveis:**

- `tests/a11y/**`
- `e2e/**`
- `components/**`
- `docs/auditorias/acessibilidade.md`

**Critérios de aceite:**

- Rotas críticas sem violações óbvias.
- Imagens têm alt.
- Formulários têm labels.
- Pendências documentadas.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Acessibilidade ficar só visual.
- Corrigir contraste quebrando identidade sem critério.

**Rollback:**

- Reverter ajustes de UI se quebrarem fluxo.
- Manter relatório de pendências.

**Critérios que bloqueiam avanço:**

- Campo sem label em fluxo crítico.
- Botão essencial inacessível por teclado.
- Imagem crítica sem alt.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 15 — Deploy, ambiente e release

#### IA-15.01 — Preparar variáveis de ambiente

**ID da etapa:** `IA-15.01`

**Objetivo:** Documentar variáveis necessárias para dev, preview e produção sem versionar segredos.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- Testes principais aprovados.
- Lista de integrações do MVP fechada.

**Escopo permitido:**

- Revisar `.env.example`.
- Criar docs de env.
- Definir AUTH_SECRET, DATABASE_URL, NEXTAUTH_URL/NEXT_PUBLIC_SITE_URL se aplicável.
- Checklist Vercel.

**Escopo proibido:**

- Colocar valores reais no repo.
- Criar secrets fora da plataforma sem necessidade.
- Adicionar envs de features pós-MVP.

**Arquivos prováveis:**

- `.env.example`
- `docs/deploy/envs.md`
- `README.md`

**Critérios de aceite:**

- Todas as envs obrigatórias documentadas.
- Nenhum segredo real versionado.
- Ambientes dev/preview/prod diferenciados.

**Comandos obrigatórios de validação:**

```bash
git diff --check
git grep -n "senha\|password\|secret\|DATABASE_URL" -- . ':!.env.example' || true
npm run build
```

**Riscos:**

- Vazar credencial.
- Env ausente quebrar produção.

**Rollback:**

- Remover segredo do histórico se exposto e rotacionar.
- Restaurar `.env.example` seguro.

**Critérios que bloqueiam avanço:**

- Segredo real no repositório.
- Env obrigatória não documentada.
- Build depende de env local não descrita.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-15.02 — Configurar banco de produção

**ID da etapa:** `IA-15.02`

**Objetivo:** Preparar PostgreSQL de produção e estratégia de migration/seed segura.

**Agente recomendado para execução:** Claude Code no VS Code.

**Agente recomendado para revisão:** Codex no VS Code.

**Pré-requisitos:**

- IA-15.01 concluída.
- Provider de PostgreSQL escolhido.
- Backup/rollback documentado.

**Escopo permitido:**

- Configurar DATABASE_URL na plataforma.
- Rodar/planejar `prisma migrate deploy`.
- Seed admin seguro.
- Documentar backup e rollback.

**Escopo proibido:**

- Usar SQLite em produção.
- Seed com senha fraca hardcoded.
- Reset destrutivo em produção.

**Arquivos prováveis:**

- `docs/deploy/database.md`
- `prisma/migrations/**`
- `prisma/seed.*`
- `.env.example`

**Critérios de aceite:**

- Banco de produção conectado.
- Migrations aplicáveis.
- Seed/admin seguro.
- Procedimento de backup documentado.

**Comandos obrigatórios de validação:**

```bash
npx prisma validate
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Migration destrutiva.
- Credencial vazada.
- Seed sobrescrever admin.

**Rollback:**

- Usar backup do provider.
- Reverter commit de migration se ainda não aplicado.
- Criar migration corretiva se aplicado.

**Critérios que bloqueiam avanço:**

- Uso de `migrate reset` em produção.
- Senha admin fraca versionada.
- Sem plano de backup.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-15.03 — Deploy na Vercel

**ID da etapa:** `IA-15.03`

**Objetivo:** Publicar o MVP em ambiente Vercel com CI/CD e variáveis corretas.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code.

**Pré-requisitos:**

- IA-15.02 concluída.
- CI verde.
- Variáveis configuradas na Vercel.

**Escopo permitido:**

- Configurar projeto Vercel.
- Ajustar build command se necessário.
- Validar preview/prod.
- Documentar procedimento.

**Escopo proibido:**

- Infra manual complexa.
- Docker/Kubernetes.
- Deploy sem CI.
- Expor secrets.

**Arquivos prováveis:**

- `vercel.json`
- `README.md`
- `docs/deploy/vercel.md`
- `.github/workflows/ci.yml`

**Critérios de aceite:**

- Deploy conclui.
- App acessível.
- Build da Vercel passa.
- Variáveis corretas sem segredo no repo.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Diferença entre local e Vercel.
- Uploads locais não persistirem em produção.

**Rollback:**

- Rollback pelo painel Vercel para deployment anterior.
- Reverter commit de configuração.

**Critérios que bloqueiam avanço:**

- Build Vercel falha.
- App inacessível.
- Env obrigatória ausente.
- Deploy ignora CI.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-15.04 — Health check e smoke test

**ID da etapa:** `IA-15.04`

**Objetivo:** Validar produção com testes manuais e/ou automatizados mínimos.

**Agente recomendado para execução:** Codex no VS Code.

**Agente recomendado para revisão:** Claude Code no VS Code + revisão humana.

**Pré-requisitos:**

- IA-15.03 concluída.
- URL de produção disponível.

**Escopo permitido:**

- Criar/validar `/api/health`.
- Executar smoke de home, catálogo, checkout, login admin, pedidos.
- Registrar evidências.

**Escopo proibido:**

- Carga/performance avançada.
- Pentest completo.
- Automação externa complexa.

**Arquivos prováveis:**

- `app/api/health/route.ts`
- `docs/deploy/smoke-test.md`
- `README.md`

**Critérios de aceite:**

- Health retorna 200.
- Fluxo crítico funciona em produção.
- Login admin funciona.
- Pedido teste criado e processável.
- Evidências documentadas.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Produção quebrada apesar de build verde.
- Smoke criar dados reais sem marcação.

**Rollback:**

- Rollback Vercel.
- Remover pedido de teste ou marcá-lo adequadamente.
- Reverter rota health se problemática.

**Critérios que bloqueiam avanço:**

- Health falha.
- Checkout não cria pedido.
- Admin não acessa.
- Smoke não documentado.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

### Fase 16 — Auditoria final do MVP

#### IA-16.01 — Auditoria funcional

**ID da etapa:** `IA-16.01`

**Objetivo:** Confirmar que tudo do MVP obrigatório foi implementado e nada essencial ficou ausente.

**Agente recomendado para execução:** Claude Code no VS Code, em modo auditoria.

**Agente recomendado para revisão:** Revisão humana obrigatória.

**Pré-requisitos:**

- Gate 9 aprovado.
- Produção validada por smoke test.

**Escopo permitido:**

- Auditar catálogo, carrinho, checkout, admin, CRUDs, pedidos, status, config, dashboard, deploy e testes.
- Criar matriz MVP entregue/não entregue.

**Escopo proibido:**

- Implementar correções dentro da auditoria.
- Adicionar pós-MVP para compensar lacuna.

**Arquivos prováveis:**

- `docs/auditorias/auditoria-funcional-mvp.md`
- `docs/checklists/mvp-checklist.md`

**Critérios de aceite:**

- Todos os itens obrigatórios classificados.
- Lacunas bloqueantes viram etapas corretivas.
- Pós-MVP permanece separado.

**Comandos obrigatórios de validação:**

```bash
git diff --check
npm run lint
npm run typecheck
npm test
npm run build
```

**Riscos:**

- Confundir desejável com obrigatório.
- Aprovar MVP com lacuna crítica.

**Rollback:**

- Reverter apenas documentos incorretos.
- Abrir etapa corretiva para lacunas.

**Critérios que bloqueiam avanço:**

- Item obrigatório não implementado sem justificativa.
- Auditoria não cita evidências.
- Pós-MVP misturado no MVP.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-16.02 — Auditoria técnica

**ID da etapa:** `IA-16.02`

**Objetivo:** Verificar qualidade, tipos, testes, build, segurança mínima e manutenibilidade.

**Agente recomendado para execução:** Claude Code no VS Code, em modo auditoria.

**Agente recomendado para revisão:** Codex no VS Code + revisão humana.

**Pré-requisitos:**

- IA-16.01 concluída.
- Matriz funcional disponível.

**Escopo permitido:**

- Auditar lint/typecheck/test/build.
- Revisar estrutura de pastas.
- Revisar duplicações e pontos frágeis.
- Classificar débitos.

**Escopo proibido:**

- Refatoração grande sem etapa própria.
- Troca de stack.
- Otimizações prematuras.

**Arquivos prováveis:**

- `docs/auditorias/auditoria-tecnica-mvp.md`

**Critérios de aceite:**

- Relatório técnico completo.
- Débitos classificados por severidade.
- Comandos executados e resultados registrados.

**Comandos obrigatórios de validação:**

```bash
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
```

**Riscos:**

- Aprovar com testes quebrados.
- Débitos críticos sem plano.

**Rollback:**

- Reverter relatório se incorreto.
- Abrir etapas corretivas pequenas.

**Critérios que bloqueiam avanço:**

- Lint/typecheck/test/build falha.
- Prisma inválido.
- Débito crítico sem tratamento.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

#### IA-16.03 — Auditoria de arquitetura

**ID da etapa:** `IA-16.03`

**Objetivo:** Confirmar que as decisões do plano foram respeitadas até o fim do MVP.

**Agente recomendado para execução:** Claude Code no VS Code, em modo arquitetura/auditoria.

**Agente recomendado para revisão:** Revisão humana obrigatória.

**Pré-requisitos:**

- IA-16.02 concluída.
- Relatórios funcional e técnico disponíveis.

**Escopo permitido:**

- Conferir monolito modular, App Router, server-first, Prisma/PostgreSQL, Auth.js, RBAC, checkout server-side, snapshot, idempotência, logs e deploy.
- Gerar parecer final.

**Escopo proibido:**

- Trocar arquitetura nesta etapa.
- Adicionar microserviços/filas/gateway.
- Implementar código.

**Arquivos prováveis:**

- `docs/auditorias/auditoria-arquitetura-mvp.md`
- `docs/auditorias/relatorio-final-mvp.md`

**Critérios de aceite:**

- Parecer final emitido.
- Todas as decisões críticas verificadas.
- Exceções justificadas.
- Release pode ser aprovado ou bloqueado claramente.

**Comandos obrigatórios de validação:**

```bash
git diff --check
npm run lint
npm run typecheck
npm test
npm run build
npx prisma validate
```

**Riscos:**

- Arquitetura desviada sem documentação.
- Liberação com decisão crítica violada.

**Rollback:**

- Reverter apenas documentos incorretos.
- Abrir correções por etapa antes do release final.

**Critérios que bloqueiam avanço:**

- Pages Router usado.
- Auth manual substitui Auth.js.
- Checkout confia no cliente.
- Sem snapshot/idempotência.
- Rotas admin desprotegidas.

**Relatório esperado:**

- Resumo objetivo do que foi alterado.
- Arquivos criados/alterados/removidos.
- Validações executadas e resultado de cada comando.
- Evidências dos critérios de aceite.
- Riscos, pendências e observações para revisão.
- Confirmação explícita de que nada fora do MVP foi adicionado.

---

## 6. Validação antes de avançar para prompts

- [x] Não contém prompts longos ainda.
- [x] Está dividido em etapas pequenas.
- [x] Não mistura várias features em uma etapa.
- [x] Mantém o MVP obrigatório.
- [x] Separa execução de revisão.
- [x] Tem comandos de validação por etapa.
- [x] Tem critérios de bloqueio.
- [x] Tem relatório esperado.

## 7. Regra de uso

Somente depois de uma etapa ser aprovada neste documento deve ser criado um prompt específico para ela. Os prompts devem ser curtos, referenciar o ID da etapa, respeitar o escopo permitido e repetir os critérios de bloqueio relevantes.