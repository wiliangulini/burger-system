# Prompt Codex — Auditoria Pré-Commit

Use este prompt antes de commit, handoff ou revisão humana.

```text
Audite o estado atual antes de commit ou handoff. Não edite arquivos.

Contexto:
[descreva a tarefa ou cole o relatório anterior]

Verificações:
1. Confirme branch atual e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.
3. Revise `git diff --stat`, `git diff --name-only`, `git diff --check` e o diff dos arquivos alterados.
4. Confirme se houve alteração fora do escopo.
5. Confirme se `src/`, configs, dependências, `.claude/**`, `.codex/**`, Prisma ou arquivos sensíveis foram alterados sem aprovação.
6. Verifique logs temporários, código morto, secrets, comandos perigosos e documentação pendente.
7. Não execute deploy, commit, push, merge, reset, clean ou comandos destrutivos.

Entregue:
- resumo do diff;
- arquivos alterados e criados;
- conformidade com escopo;
- riscos;
- validações executadas e pendentes;
- recomendação;
- status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado.
```
