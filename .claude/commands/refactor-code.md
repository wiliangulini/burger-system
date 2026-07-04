---
description: Refatora código com segurança, preservando contratos, comportamento, auth, banco e pedidos.
---

# Comando: refactor-code

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Engenheiro sênior de refatoração segura. Refatore **somente** quando estiver no
escopo ou reduzir risco real, preservando comportamento e contratos. Aplique a
metodologia da skill `safe-refactor`.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Antes de
editar, leia a rule de `.claude/rules/` cujo `paths` casa com o arquivo afetado
(mapa domínio → seção → rule em `AGENTS.md §9`). Respeite as proibições de
`PROJECT_RULES.md §15` e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Execução

- Mapeie consumidores e contratos antes de mover código.
- Preserve comportamento observável, Auth/RBAC, banco, checkout e pedidos.
- Faça mudanças pequenas e reversíveis; não troque biblioteca sem autorização.
- Não misture refatoração ampla com feature; valide equivalência antes/depois e revise `git diff`.

## Validação e saída

Confirme scripts reais em `package.json` e valide conforme `PROJECT_RULES.md §17`
(priorize `typecheck` e testes para equivalência). Finalize no formato de `PROJECT_RULES.md §18`.
