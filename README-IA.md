# README-IA — Operação com Codex e Claude Code

Este pacote define a base operacional dos agentes de IA para o `burger-shop-system`.

## Objetivo

Padronizar como Codex e Claude Code devem planejar, implementar, revisar, auditar e entregar tarefas no sistema de hamburgueria.

## Arquivos principais

```txt
AGENTS.md                         regras comuns para qualquer agente
PROJECT_RULES.md                  fonte central de regras técnicas e produto
CLAUDE.md                         guia operacional do Claude Code
CODEX.md                          guia operacional do Codex
.codex/config.toml                postura local conservadora do Codex
.codex/instructions.md            instruções operacionais específicas do Codex
.claude/settings.json             permissões seguras do Claude Code
.claude/commands/*.md             comandos reutilizáveis do Claude Code
.claude/rules/*.md                regras modulares por domínio
.claude/skills/*/SKILL.md         skills reutilizáveis do Claude Code
docs/ia-auditorias/TEMPLATE-agent-report.md template de relatório final
docs/adr/*.md                     decisões arquiteturais iniciais
docs/ia-prompts/*.md              prompts manuais para Codex
```

## Como iniciar uma sessão segura

1. Rode `git status`.
2. Confirme a branch real.
3. Leia `PROJECT_RULES.md`, `AGENTS.md` e o guia do agente usado.
4. Para Codex, leia `.codex/instructions.md`.
5. Para Claude Code, use Plan Mode quando a tarefa for sensível ou multiarquivo.
6. Nunca leia `.env` ou credenciais.
7. Nunca execute deploy, push, reset, clean, `rm -rf`, `sudo`, `ssh`, `curl` ou `wget` sem autorização explícita.
8. Antes de validar, confirme scripts reais no `package.json`.
9. Gere relatório final no template de auditoria.

## Primeira tarefa recomendada

Execute uma auditoria sem edição:

```txt
Leia PROJECT_RULES.md, AGENTS.md, CLAUDE.md, CODEX.md, .codex/instructions.md e a estrutura atual do repositório.
Não edite arquivos.
Confirme se a configuração de agentes está coerente com Next.js App Router, Prisma, Auth.js/RBAC, checkout, pedidos e segurança.
Finalize com Status final.
```
