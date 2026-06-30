# ADR 0001 — Modelo operacional de IA

## Status

Aceita

## Contexto

O projeto será desenvolvido com apoio de Codex no VS Code e Claude Code no VS Code. O risco principal é permitir que agentes alterem escopo, segurança, autenticação, banco ou pedidos sem plano e sem evidência.

## Decisão

Adotar um modelo operacional baseado em:

- `PROJECT_RULES.md` como fonte central;
- `AGENTS.md` como contrato comum entre agentes;
- `CLAUDE.md`, `.claude/commands/`, `.claude/rules/` e `.claude/skills/` para Claude Code;
- `CODEX.md` e `.codex/instructions.md` para Codex;
- relatório final obrigatório em `docs/ia-auditorias/TEMPLATE-agent-report.md`;
- proibição de leitura/edição de secrets;
- validação baseada em scripts reais do `package.json`.

## Consequências

- Mais previsibilidade entre sessões.
- Melhor continuidade entre Codex e Claude Code.
- Menor risco de alterações destrutivas.
- Mais trabalho documental inicial, compensado por revisão mais segura.
