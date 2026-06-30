# CODEX.md — Instruções específicas para Codex no burger-shop-system

Complementa `PROJECT_RULES.md` e `AGENTS.md`. Em caso de conflito, a hierarquia definida em `AGENTS.md` prevalece.

`.codex/instructions.md` deve ser lido explicitamente no início de cada sessão.

---

## 1. Papel do Codex

O Codex atua como agente técnico sênior para:

- planejamento seguro;
- implementação incremental;
- revisão de diff;
- investigação de bugs;
- documentação operacional;
- continuidade entre Codex e Claude Code.

Objetivo: evoluir o `burger-shop-system` sem quebrar catálogo, checkout, pedidos, admin, cozinha, Auth.js/RBAC, Prisma ou a base funcional existente na branch atual.

---

## 2. Protocolo de início de sessão

Antes de qualquer tarefa:

1. Leia `PROJECT_RULES.md`, `AGENTS.md`, este `CODEX.md` e `.codex/instructions.md`.
2. Verifique branch atual e `git status`.
3. Confirme objetivo, escopo, comportamento esperado e critérios de aceite.
4. Identifique arquivos diretamente relacionados, consumidores e contratos.
5. Confirme que não existe autorização humana pendente.
6. Confirme scripts reais no `package.json` antes de sugerir ou executar validações.

Para regras de implementação, revisão, debug, refatoração e arquitetura, consulte:

- `PROJECT_RULES.md` — escopo, stack, módulos, segurança e validação;
- `AGENTS.md` — modos de atuação, segurança, evidência e continuidade;
- `.codex/instructions.md` — matriz de impacto e critérios para alterar arquivos.

Nunca implemente com base apenas em suposição.

---

## 3. Áreas sensíveis para Codex

Exigem plano antes de edição:

- `src/lib/auth/**`, `src/middleware.ts`, `auth.ts`, `middleware.ts`;
- Server Actions administrativas;
- checkout, criação de pedido e status;
- pagamento, Pix futuro, gateway e webhooks;
- `prisma/schema.prisma`, migrations e seed;
- `.env.example`, variáveis públicas e documentação de secrets;
- scripts de build, CI/CD, deploy e dependências.

Nunca leia ou edite `.env`, `.env.*`, secrets ou credenciais.

---

## 4. Continuidade com Claude Code

Ao finalizar tarefa que pode ser continuada por Claude Code, informe no relatório:

- arquivos lidos, alterados e criados;
- decisões tomadas e riscos identificados;
- validações executadas e não executadas;
- próximo passo recomendado;
- skill do Claude Code sugerida para continuar:
  - `senior-code-agent` — implementação;
  - `senior-code-review` — revisão;
  - `safe-refactor` — refatoração;
  - `implementation-planning` — planejamento;
  - `legacy-code-audit` — auditoria de base existente;
  - `architecture-review` — decisão arquitetural;
  - `final-audit` — auditoria antes de commit/handoff.

---

## 5. Critérios para aceitar uma entrega

Entrega concluída apenas quando:

- escopo e critérios de aceite foram atendidos;
- não houve alteração fora do escopo sem autorização;
- decisões foram apoiadas em evidência;
- contratos e comportamento existente foram preservados ou a mudança foi declarada;
- diff foi revisado;
- validações executadas e ausentes foram informadas;
- riscos e pendências foram registrados.

---

## 6. Relatório final

Use o formato e os status definidos em `PROJECT_RULES.md`.
Para relatórios de continuidade, use `docs/ia-auditorias/TEMPLATE-agent-report.md`.
Não crie formato concorrente. Não declare validação executada sem evidência.
