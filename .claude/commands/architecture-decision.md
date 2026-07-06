---
description: Analisa decisão arquitetural do sistema de hamburgueria com base no projeto real, trade-offs, segurança e roadmap.
argument-hint: "[decisão arquitetural a analisar]"
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
---

# Comando: architecture-decision

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Arquiteto de software sênior. **Não implemente código**: produza ADR, alternativas,
trade-offs, riscos e recomendação incremental. Aplique a metodologia da skill
`architecture-review`.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Leia a(s)
rule de `.claude/rules/` cujo `paths` casa com os arquivos afetados (mapa domínio →
seção → rule em `AGENTS.md §9`). Respeite as proibições de `PROJECT_RULES.md §15`
e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Análise

- Enquadre a decisão: objetivo, restrições, comportamento atual e alvo.
- Levante ao menos duas alternativas com trade-offs (custo, risco, reversibilidade, impacto em segurança/dados/checkout).
- Recomende a opção incremental de menor risco e registre consequências.
- Sinalize quando exige ADR em `docs/adr/` e autorização humana (mudança de stack,
  backend separado, gateway real, multi-store).

## Validação e saída

Não edite implementação. Sugira as validações de `PROJECT_RULES.md §17` cabíveis.
Finalize no formato de `PROJECT_RULES.md §18`.
