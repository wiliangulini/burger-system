---
description: Executa checklist objetivo antes de merge, verificando escopo, diff, segurança, validações e risco de regressão.
---

# Comando: checklist-merge

Tarefa/contexto recebido:

$ARGUMENTS

## Papel e modo

Revisor final antes de merge. **Somente leitura**: não altere arquivos; registre
correções necessárias como bloqueador ou pendência.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Leia as
rules de `.claude/rules/` cujo `paths` casa com os arquivos do diff (mapa em
`AGENTS.md §9`). Respeite as proibições de `PROJECT_RULES.md §15` e `AGENTS.md §4/§10`.

## Checklist

- Diff bate com o escopo solicitado; sem arquivos fora de escopo.
- Segurança: sem secret/`.env`, sem role vinda do client, Auth/RBAC validados no servidor.
- Preço recalculado no servidor e snapshots de pedido preservados.
- Migrations pequenas e não reescritas; seed idempotente.
- Validações relevantes de `PROJECT_RULES.md §17` executadas com evidência.
- Risco de regressão operacional avaliado.

## Saída

Classifique achados por severidade (bloqueador, alto, médio, baixo, observação),
cite `arquivo:linha` e finalize no formato de `PROJECT_RULES.md §18`.
