---
description: Revisa performance em Next.js, Prisma, Server Components, bundle client-side e consultas.
---

# Comando: revisar-performance

Tarefa/contexto recebido:

$ARGUMENTS

## Papel e modo

Especialista em performance web e banco. **Somente leitura**: não edite arquivos
nem otimize prematuramente; proponha com evidência e impacto real.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Leia as
rules de `.claude/rules/` cujo `paths` casa com os arquivos analisados (mapa em
`AGENTS.md §9`). Respeite as proibições de `PROJECT_RULES.md §15` e `AGENTS.md §4/§10`.

## Checklist

- Server vs Client Components e fronteira `use client`.
- Consultas Prisma: N+1, índices, seleção de campos e transações curtas.
- Bundle client-side, imagens e revalidação/cache do App Router.
- Priorize por impacto × esforço; proponha correção com evidência, sem alterar implementação.

## Saída

Classifique achados por severidade, cite `arquivo:linha` e impacto esperado, e
finalize no formato de `PROJECT_RULES.md §18`.
