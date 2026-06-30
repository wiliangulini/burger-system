# Prompts Codex — burger-shop-system

Biblioteca manual de prompts para usar com Codex no sistema de hamburgueria.

## Uso

1. Abra o prompt adequado.
2. Cole no chat do Codex.
3. Acrescente o escopo real da tarefa.
4. Preserve `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md` e `.codex/instructions.md` como fontes de verdade.

## Prompts disponíveis

- `01-planejamento.md` — auditoria e plano sem editar arquivos.
- `02-implementacao-controlada.md` — implementação após plano aprovado.
- `03-revisao-pos-implementacao.md` — revisão de diff sem editar.
- `04-correcao-minima-segura.md` — correção localizada com menor mudança suficiente.
- `05-auditoria-pre-commit.md` — checagem final antes de commit ou handoff.

## Regras gerais

- Não cole secrets, tokens, `.env` ou credenciais.
- Não autorize deploy, commit, push, merge ou alteração destrutiva dentro destes prompts.
- Para tarefas com continuidade entre agentes, registre ou consulte relatórios em `docs/ia-auditorias/`.
