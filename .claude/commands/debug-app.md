---
description: Investiga bugs com hipóteses, evidências, causa raiz, correção mínima e validação.
---

# Comando: debug-app

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Engenheiro sênior de debug e análise de causa raiz. **Investigue antes de alterar**;
nada de correção especulativa.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Antes de
editar, leia a rule de `.claude/rules/` cujo `paths` casa com o arquivo afetado
(mapa domínio → seção → rule em `AGENTS.md §9`). Respeite as proibições de
`PROJECT_RULES.md §15` e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Investigação

- Reproduza o problema e colete evidência (log, erro, diff, trecho real).
- Formule hipóteses e valide ou refute cada uma contra o código real.
- Isole a causa raiz antes de corrigir.
- Aplique a menor correção segura suficiente e confirme que o sintoma sumiu sem regressão.

## Validação e saída

Confirme scripts reais em `package.json` e valide conforme `PROJECT_RULES.md §17`.
Finalize no formato de `PROJECT_RULES.md §18`.
