# AGENTS.md — Instruções para agentes de IA no burger-shop-system

Use este arquivo para Codex, Claude Code e qualquer outro agente que atue neste repositório.

---

## 1. Identidade do projeto

**Projeto:** burger-shop-system — sistema single-store para hamburgueria, com cardápio público, carrinho, checkout, pedidos, painel administrativo, tela de cozinha, RBAC, configurações operacionais e preparação futura para Pix/gateway/WhatsApp/delivery.

**Stack principal:**

```txt
Next.js App Router
React.js
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Auth.js
Zod
Server Components por padrão
Client Components apenas onde houver interatividade
Server Actions para mutações internas
Route Handlers para APIs, health checks e webhooks
```

**Branch padrão real deste repositório:** `dev` (o repositório não possui `main`; branches de trabalho seguem o padrão `feature/*` e `docs/*`).

O agente deve sempre confirmar a branch real com `git branch`, registrá-la no relatório e não trocar de branch sem autorização.

---

## 2. Prioridade das instruções

1. Solicitação explícita do usuário/desenvolvedor.
2. `PROJECT_RULES.md` — fonte central de regras técnicas, funcionais, segurança e produto.
3. Este arquivo `AGENTS.md`.
4. `CLAUDE.md`, `.claude/commands/`, `.claude/rules/` e `.claude/skills/` — quando estiver usando Claude Code.
5. `CODEX.md` e `.codex/instructions.md` — quando estiver usando Codex ou houver continuidade entre agentes.
6. Código existente da branch atual.
7. Boas práticas atuais de Next.js App Router, React, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js, Zod e segurança web.

Em conflito entre instruções, preserve segurança, integridade de dados, autenticação/autorização, checkout, pedidos e estabilidade da branch atual. Comunique antes de aplicar mudanças amplas.

### 2.1 Mapa de responsabilidades (quem responde pelo quê)

Cada assunto tem um dono. Não duplique conteúdo entre arquivos; referencie o dono.

| Arquivo | Responsabilidade | Não deve |
| --- | --- | --- |
| `PROJECT_RULES.md` | Fonte de verdade única: escopo, stack, domínio, segurança, **bloco de validação** e **formato de relatório** canônicos. | — |
| `AGENTS.md` | Roteador operacional comum a todos os agentes: modos, segurança operacional, evidência, git, continuidade e roteamento por domínio. | Recopiar seções inteiras de `PROJECT_RULES.md`. |
| `CLAUDE.md` | Comportamento do Claude Code (carrega `@PROJECT_RULES.md`). | Duplicar regras de domínio. |
| `CODEX.md` + `.codex/instructions.md` | Comportamento e matriz de impacto do Codex. | Criar formato de relatório concorrente. |
| `.claude/commands/*` | Entrypoints de tarefa (`/nome` + `$ARGUMENTS`): papel + regra principal + checklist específico + saída. | Recopiar o protocolo comum. |
| `.claude/skills/**` | Metodologias reutilizáveis. Não concedem autorização de escrita. | Virar workflow duplicado de um command. |
| `.claude/rules/*` | Invariantes de domínio acionáveis por `paths`. | Repetir procedimento/validação/bloqueio genéricos. |
| `docs/ia-agentes/`, `docs/ia-prompts/`, `docs/ia-auditorias/` | Documentação humana e relatórios. | Ser fonte de regra concorrente. |

**Ativação de rules por caminho:** antes de editar um arquivo, consulte em `.claude/rules/` a rule cujo frontmatter `paths` casa com o caminho e leia-a. O protocolo comum (validação, formato de relatório, proibições) vive em `PROJECT_RULES.md` e neste `AGENTS.md`; commands e rules **referenciam**, não recopiam.

---

## 3. Modos de atuação

### Implementação

Pode editar arquivos somente quando o escopo estiver claro. Antes de editar:

1. confirme branch e `git status`;
2. leia documentação obrigatória;
3. entenda objetivo, comportamento atual e comportamento esperado;
4. identifique arquivos prováveis e arquivos proibidos;
5. proponha plano quando a tarefa for sensível, multiarquivo ou ambígua;
6. implemente a menor alteração suficiente;
7. revise o diff;
8. execute validações disponíveis;
9. gere relatório final.

### Revisão/auditoria

Não edite arquivos salvo pedido explícito. Leia diff e arquivos alterados, compare com escopo, classifique achados por severidade e recomende status final.

### Planejamento

Não crie, mova, edite ou exclua arquivos. Analise, mapeie riscos e entregue plano no chat ou em arquivo apenas quando o usuário pedir explicitamente um artefato.

### Documentação

Pode criar ou atualizar documentação dentro do escopo. Não documente recurso inexistente como implementado. Diferencie decisão, plano, implementação real e hipótese.

---

## 4. Segurança operacional

Pare e peça autorização explícita quando a tarefa envolver:

- dados de produção;
- deploy;
- credenciais, tokens, secrets ou `.env`;
- `git push`, merge, rebase, reset, clean ou commit;
- `rm`, remoção em massa ou sobrescrita destrutiva;
- `sudo`, `ssh`, `curl`, `wget`, scripts remotos ou comandos desconhecidos;
- instalação de dependências;
- alteração de autenticação, sessão, RBAC, middleware ou permissões;
- alteração destrutiva de banco, migrations ou seed com risco de perda de dados;
- mudança de contrato de checkout, pedido, pagamento, webhook ou API pública;
- mudança ampla de arquitetura;
- escopo ambíguo com alto risco.

É proibido ler ou editar `.env`, `.env.*`, arquivos de credenciais, dumps privados, chaves, tokens, certificados e diretórios `secrets/`.

Se for necessário ampliar o escopo, informe arquivo adicional, justificativa técnica, risco e alternativa de menor impacto antes de editar.

---

## 5. Evidência obrigatória

Toda conclusão técnica deve se apoiar em evidência verificável:

- arquivo lido;
- trecho de código real;
- erro reproduzido;
- diff analisado;
- comando executado;
- script existente no `package.json`;
- documentação do projeto;
- validação manual descrita.

Quando não houver evidência suficiente, declare incerteza. Nunca invente estrutura, rotas, APIs, scripts, variáveis de ambiente, payloads, modelos Prisma, componentes, services ou dependências.

---

## 6. Git e branch

- Confirme branch atual e `git status` antes de qualquer edição.
- Não execute `git add`, `git commit`, `git push`, `git merge`, `git rebase`, `git reset --hard`, `git clean` ou ações destrutivas sem pedido explícito.
- Commits devem ser pequenos, objetivos e criados apenas quando solicitados.
- Se houver alterações pendentes de outro agente ou desenvolvedor, não sobrescreva. Registre e isole sua alteração.
- Para feature branches, use nomes claros quando autorizado, por exemplo `feature/r11-checkout-orders` ou `fix/admin-login-rbac`.

---

## 7. Validação

Antes de executar comandos, abra `package.json` e confirme scripts reais. A lista
de comandos possíveis é canônica em `PROJECT_RULES.md §17`; não a recopie aqui.

Regras:

- não afirme validação executada sem executar;
- se não executar, informe o motivo;
- se falhar, registre comando, erro e hipótese se a falha parece pré-existente;
- `npx prisma migrate dev` e `npx prisma db seed` exigem cuidado: confirme ambiente local e nunca rode contra produção;
- nunca rode `prisma migrate reset` sem autorização explícita.

---

## 8. Estrutura de código e escopo por caminho

A **estrutura real prevalece**. A arquitetura-alvo (route groups, services, libs) está em
`PROJECT_RULES.md §4` — não a duplique aqui. Estado atual relevante: `app/` na raiz,
`src/actions/`, `src/lib/auth/`, `src/lib/db.ts`, `src/components/`, `prisma/`. Caminhos de
`PROJECT_RULES §4` que ainda não existem são referência de arquitetura, não fato.

Para saber qual invariante se aplica a um caminho, use o frontmatter `paths` das rules em
`.claude/rules/` (ver §2.1). Não trate uma área como impactada sem evidência no repositório.

---

## 9. Roteamento por domínio (regra e seção-fonte)

Cada domínio sensível tem uma seção-fonte em `PROJECT_RULES.md` e uma rule acionável. Leia a rule
correspondente antes de editar; ela exige plano quando a mudança for sensível ou multiarquivo.

| Domínio | Seção em PROJECT_RULES | Rule |
| --- | --- | --- |
| Auth.js, sessão, RBAC, middleware, área admin | §6 | `.claude/rules/auth-admin-rbac.md` |
| Prisma, schema, migrations, seed, transações | §7 | `.claude/rules/prisma-database.md` |
| Catálogo, produtos, imagens, adicionais | §8 | `.claude/rules/catalog-products.md` |
| Carrinho, checkout, pedidos e snapshots | §9 | `.claude/rules/cart-checkout-orders.md` |
| Status de pedido e tela de cozinha | §10 | `.claude/rules/kitchen-order-flow.md` |
| Pagamento manual, gateway futuro e webhooks | §11 | `.claude/rules/payments-webhooks.md` |
| Delivery, horários e store settings | §12 | `.claude/rules/delivery-store-settings.md` |
| App Router, Server/Client, Server Actions, Route Handlers | §4 | `.claude/rules/nextjs-app-router.md` |
| UI/UX e Tailwind | §13 | `.claude/rules/ui-ux-tailwind.md` |
| Segurança, secrets e deploy (transversal) | §15 | `.claude/rules/security-deploy.md` |

Invariantes que nunca mudam sem plano: preço/taxa recalculados no servidor; pedido grava snapshots;
role validada no servidor; migrations aplicadas não são reescritas destrutivamente; webhook real
valida assinatura e idempotência. Roles iniciais: `OWNER`, `MANAGER`, `ATTENDANT`, `KITCHEN`.

---

## 10. Proibições técnicas

Consolidadas em `PROJECT_RULES.md §3` (restrições de stack/escopo) e `§15` (segurança e secrets), e
reforçadas na §4 deste arquivo (segurança operacional). Em resumo, sem autorização e plano não se
deve: mudar a stack, criar backend separado, virar multi-store, adicionar gateway real, usar preço
do client como verdade, expor dados admin em público, alterar Auth.js/RBAC ou migrations aplicadas,
instalar dependências, fazer deploy, ler/editar `.env`/secrets ou rodar comandos destrutivos.

---

## 11. Relatório final

Todo agente deve finalizar com:

```txt
Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```

Use `Aprovado com observações` quando houver suposições importantes, validações não executadas, scripts ausentes, branch diferente da esperada ou pendências não bloqueantes.

---

## 12. Continuidade entre agentes

Quando uma tarefa alternar entre Codex, Claude Code ou outro agente:

1. leia o relatório anterior em `docs/ia-auditorias/`, se existir;
2. confirme o estado real do Git;
3. não confie em relatório sem verificar diff e arquivos;
4. não desfaça alterações de outro agente sem evidência técnica;
5. registre decisões, riscos, validações e próximo passo sugerido;
6. indique qual agente/skill deve continuar.
