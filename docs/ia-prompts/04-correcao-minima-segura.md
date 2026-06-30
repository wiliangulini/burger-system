# Prompt Codex — Correção Mínima Segura

Use este prompt para corrigir um problema específico sem ampliar o escopo.

```text
Corrija o problema abaixo com a menor alteração segura suficiente.

Problema:
[descreva aqui o bug ou ajuste]

Restrições:
1. Confirme branch atual e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.
3. Leia os arquivos relacionados ao sintoma antes de editar.
4. Identifique causa provável ou confirmada antes da correção.
5. Não refatore fora do escopo.
6. Não altere Auth.js/RBAC, Prisma/migrations, checkout, pedidos, pagamento, webhooks ou cozinha sem aprovação explícita.
7. Não acesse `.env`, secrets ou credenciais.
8. Não execute deploy, commit, push, merge, reset, clean ou comandos destrutivos.

Depois de alterar:
- revise o diff;
- execute validações existentes e relevantes;
- informe validações não executadas;
- gere relatório final no formato de `PROJECT_RULES.md`.
```
