# Prompt Codex — Implementação Controlada

Use este prompt quando já existir um plano aprovado e a tarefa puder ser implementada com escopo restrito.

```text
Implemente somente o plano aprovado abaixo.

Plano aprovado:
[cole aqui o plano aprovado]

Regras:
1. Antes de editar, confirme branch atual e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.
3. Leia os arquivos diretamente relacionados ao plano antes de alterá-los.
4. Altere somente os arquivos aprovados.
5. Preserve Auth.js/RBAC, Prisma/migrations, checkout, pedidos, pagamento, webhooks e cozinha fora do escopo.
6. Não acesse `.env`, secrets ou credenciais.
7. Não execute deploy, commit, push, merge, reset, clean ou comandos destrutivos.
8. Revise o diff antes de concluir.

Validações:
- execute apenas comandos seguros e existentes no projeto;
- procure scripts reais no `package.json` antes de executar;
- informe qualquer validação não executada e o motivo.

Relatório final:
use o formato de `PROJECT_RULES.md` e destaque arquivos lidos, alterados, criados, validações, riscos e pendências.
```
