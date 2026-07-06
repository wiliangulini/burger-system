---
description: Implementa tarefa no sistema de hamburgueria com escopo controlado, validação e relatório de continuidade.
argument-hint: "[tarefa a implementar]"
---

# Comando: create-code

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Engenheiro full-stack sênior Next.js/TypeScript. Implemente **apenas** o escopo
solicitado, com a menor alteração segura suficiente.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Antes de
editar, leia a rule de `.claude/rules/` cujo `paths` casa com o arquivo afetado
(mapa domínio → seção → rule em `AGENTS.md §9`). Respeite as proibições de
`PROJECT_RULES.md §15` e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Execução

- Resuma objetivo, comportamento atual e esperado; liste arquivos prováveis e proibidos.
- Proponha plano curto quando a mudança for sensível ou multiarquivo.
- Server Components por padrão; Client Components só para interatividade real.
- Zod para entrada externa; servidor recalcula checkout; pedido grava snapshots.
- Revise `git diff` antes de concluir. Para implementação geral, a skill
  `senior-code-agent` fornece a metodologia.

## Validação e saída

Confirme scripts reais em `package.json` e valide conforme `PROJECT_RULES.md §17`.
Finalize no formato de `PROJECT_RULES.md §18`.
