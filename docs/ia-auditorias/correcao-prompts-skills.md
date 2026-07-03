# Relatório de tarefa — Correção de RBAC e workflows de IA

## 1. Identificação

**Agente:** Codex
**Data:** 2026-07-01
**Branch atual:** `feature/e03-auth-admin`
**Tipo de tarefa:** Documentação
**Status final:** Aprovado com observações

## 2. Objetivo

Alinhar os prompts ao RBAC canônico, consolidar skills redundantes e separar
commands, skills e rules com contratos seguros de escrita de relatórios.

## 3. Escopo solicitado

- Corrigir referências à role inexistente `ADMIN`.
- Manter a E03 restrita a `OWNER`.
- Definir a matriz futura de autorização.
- Manter sete skills canônicas e remover quatro aliases autorizados.
- Especializar revisão, auditoria, segurança e Prisma/banco.
- Autorizar somente o relatório exato em revisões e auditorias.

## 4. Escopo não incluído

- Código da aplicação, Auth.js, sessão, guards ou testes.
- Prisma, migrations, seed ou banco.
- Dependências, build, deploy, commit ou push.

## 5. Fontes de verdade consultadas

- `PROJECT_RULES.md`, `AGENTS.md`, `CODEX.md`, `.codex/instructions.md`.
- `CLAUDE.md`, `.claude/settings.json`, commands, rules e skills.
- Prompts E01–E12c e instruções gerais.
- Relatórios de E03 e da auditoria de prompts/skills.
- Schema e política Auth somente para confirmar o baseline `OWNER`.

## 6. Arquivos alterados

- `PROJECT_RULES.md` — matriz mínima de autorização e rollout incremental.
- `CLAUDE.md` e `docs/ia-agentes/claude-code.md` — fronteiras entre recursos.
- Prompts ativos E01–E12c — caminho exclusivo do relatório de revisão.
- E03, E05, E06 e E10 — roles corrigidas conforme o domínio.
- `review-code`, `final-audit`, `revisar-seguranca`,
  `revisar-performance` e `checklist-merge` — modo somente leitura coerente.
- Sete skills canônicas — procedimentos distintos.
- `docs/ia-auditorias/E02-modelagem-prisma-revisao.md` — referência atualizada
  para a skill canônica `senior-code-agent`.

## 7. Arquivos criados

- `.claude/commands/revisar-prisma-banco.md`.
- Este relatório.

## 8. Arquivos preservados

- Implementação E03, testes, Prisma e dependências.
- `docs/ia-auditorias/E03-auth-admin-revisao.md`, criado concorrentemente por
  outro agente durante esta tarefa.
- `docs/ia-prompts/etapas/E12-testes-deploy.md` foi mantido depreciado e não
  recebeu alteração desta tarefa.
- Alterações preexistentes no working tree.

## 9. Arquivos removidos

- `.claude/skills/controlled-implementation/SKILL.md` → `senior-code-agent`.
- `.claude/skills/continue-from-codex/SKILL.md` → command homônimo.
- `.claude/skills/implementation-plan/SKILL.md` → `implementation-planning`.
- `.claude/skills/senior-review/SKILL.md` → `senior-code-review`.

## 10. Estado inicial observado

O schema e a implementação E03 já utilizavam `OWNER`, `MANAGER`, `ATTENDANT` e
`KITCHEN`, com acesso E03 exclusivo a `OWNER`. Os prompts ainda citavam
`ADMIN`. Commands de revisão proibiam escrita enquanto as etapas exigiam salvar
relatório, e as onze skills tinham corpo operacional idêntico.

## 11. O que foi implementado

- Matriz RBAC central com autorização por módulo.
- E03 documentada como baseline `OWNER`-only.
- Quatorze prompts ativos de revisão com relatório exato e exclusivo.
- Quatorze auditorias ativas confirmadas com relatório `-auditoria-final.md`.
- Sete skills canônicas com responsabilidades diferentes.
- Treze commands, incluindo revisão Prisma/banco sem mutação.
- Contrato chat-only quando uma revisão não recebe caminho válido.

## 12. Decisões técnicas

### Commands como entrypoints

Commands controlam modo e escrita. Skills fornecem metodologia e não concedem
permissão. Isso mantém a automação explícita e elimina workflows concorrentes.

### RBAC incremental

A E03 permanece exclusiva para `OWNER`. As demais roles só serão habilitadas
quando os respectivos módulos e guards por operação existirem.

## 13. Validações executadas

- `git diff --check` — passou.
- Busca por `role ADMIN` nos prompts ativos — nenhuma ocorrência.
- Busca por referências às quatro skills removidas — nenhuma referência ativa;
  o relatório histórico de auditoria foi preservado.
- Contagem de skills — sete.
- Contagem de commands — treze.
- Contratos de revisão — quatorze prompts ativos com `-revisao.md`.
- Contratos de auditoria — quatorze prompts ativos com
  `-auditoria-final.md`.
- Hash dos corpos das skills — todos distintos.

## 14. Validações não executadas

- Testes, lint, typecheck, build e Prisma — não aplicáveis ao escopo documental.

## 15. Riscos e pendências

| Risco | Severidade | Mitigação |
|---|---|---|
| Working tree já continha alterações amplas | Médio | Patches localizados; nenhum arquivo foi restaurado |
| Roles futuras ainda não habilitadas no código | Baixo nesta tarefa | Implementar incrementalmente nas etapas dos módulos |
| Relatórios históricos citam decisões antigas | Baixo | Preservar histórico; guias operacionais apontam recursos canônicos |

## 16. Compatibilidade

- Auth.js/RBAC existente preservado: Sim.
- Prisma/migrations preservados: Sim.
- Código, testes e dependências preservados: Sim.
- Secrets acessados: Não.
- Commit, push ou deploy executados: Não.

## 17. Próximo passo recomendado

Tratar os ajustes registrados em `docs/ia-auditorias/E03-auth-admin-revisao.md`
antes de executar a auditoria final da E03.

## 18. Conclusão

Os prompts agora usam as roles reais do projeto, e os workflows de revisão e
auditoria possuem escrita mínima explícita. Recursos duplicados foram
consolidados sem alterar a implementação.

Status final: Aprovado com observações
