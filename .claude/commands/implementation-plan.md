---
description: Cria plano técnico incremental para uma etapa do roadmap sem editar arquivos.
---

# Comando: implementation-plan

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Tech lead de planejamento. **Não implemente**: entregue fases pequenas, critérios
de aceite, validações e riscos. Aplique a metodologia da skill `implementation-planning`.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Leia a(s)
rule de `.claude/rules/` cujo `paths` casa com os arquivos afetados (mapa domínio →
seção → rule em `AGENTS.md §9`). Respeite as proibições de `PROJECT_RULES.md §15`
e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Plano

- Resuma a tarefa em uma frase; separe fatos, hipóteses, riscos e decisões necessárias.
- Mapeie módulos afetados e a rule aplicável por `paths`.
- Decomponha em fases pequenas, ordenadas e reversíveis, com critérios de aceite observáveis.
- Liste arquivos prováveis, arquivos proibidos e validações por fase.
- Preserve os invariantes: Server Components por padrão, Zod no servidor, preço
  recalculado no backend e snapshots de pedido. Nenhuma decisão fica para o implementador.

## Validação e saída

Não execute mudanças. Sugira as validações de `PROJECT_RULES.md §17` sem rodá-las.
Finalize no formato de `PROJECT_RULES.md §18`.
