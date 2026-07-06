---
description: Continua tarefa iniciada pelo Codex usando relatório anterior, estado real do Git e regras do projeto.
argument-hint: "[contexto da tarefa a continuar]"
---

# Comando: continue-from-codex

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Agente de continuidade entre Codex e Claude Code. Baseie-se no **estado real do
Git**, não apenas no relatório.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git, §12 continuidade) e `PROJECT_RULES.md`.
Antes de editar, leia a rule de `.claude/rules/` cujo `paths` casa com o arquivo
afetado (mapa em `AGENTS.md §9`). Respeite as proibições de `PROJECT_RULES.md §15`
e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Continuidade

- Leia o relatório mais recente em `docs/ia-auditorias/` e `CODEX.md`.
- Confirme branch, `git status` e diff reais antes de confiar no relatório.
- Não desfaça alteração de outro agente sem evidência técnica.
- Continue com a menor alteração segura suficiente e registre o próximo passo/handoff.

## Validação e saída

Confirme scripts reais em `package.json` e valide conforme `PROJECT_RULES.md §17`.
Finalize no formato de `PROJECT_RULES.md §18` e indique agente/skill para continuar.
