# Prompt Codex — Revisão Pós-Implementação

Use este prompt para revisar um diff atual sem editar arquivos.

```text
Revise a implementação atual sem editar arquivos.

Escopo esperado:
[descreva aqui o que deveria ter sido implementado]

Procedimento:
1. Confirme branch atual e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md`.
3. Leia `git diff --stat`, `git diff --name-only` e o diff dos arquivos alterados.
4. Leia os arquivos alterados e consumidores diretos quando necessário.
5. Verifique aderência ao escopo, regressão, contratos, segurança, tipagem, UX e validações.
6. Não acesse `.env`, secrets ou credenciais.
7. Não execute comandos destrutivos ou deploy.

Entregue achados primeiro, por severidade:
- Crítico;
- Alto;
- Médio;
- Baixo;
- Observação.

Finalize com:
- arquivos revisados;
- validações analisadas;
- validações recomendadas;
- decisão objetiva;
- status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado.
```
