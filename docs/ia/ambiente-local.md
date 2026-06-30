# IA-01 — Ambiente local e workspace de agentes

## Objetivo

Definir uma base local, documental, versionável e isolada para futuros artefatos de agentes, sem acesso a produção, integrações externas ou dados reais.

## Limite do ambiente

- O workspace oficial é `workspace-agentes/`, relativo à raiz deste repositório Git.
- Todo conteúdo desta etapa permanece no repositório local.
- O workspace não é um ambiente de execução e não contém agentes, automações, hooks, skills, comandos ou workflows.
- Nenhum serviço externo, API, canal de comunicação ou ambiente de produção integra este workspace.
- A criação das futuras pastas operacionais pertence a outra etapa e não faz parte da IA-01.

## Limites de leitura e escrita

Na IA-01, a escrita fica limitada a:

- `docs/ia/ambiente-local.md`;
- `workspace-agentes/README.md`.

A leitura deve se limitar às fontes obrigatórias da etapa, às regras do repositório e às evidências locais necessárias para validação. São proibidos leitura ou escrita em:

- `.env`, `.env.*`, tokens, secrets, credenciais, certificados ou chaves;
- arquivos com dados pessoais reais;
- arquivos de produção ou de integrações externas;
- `.claude/`, `.codex/` e `.github/workflows/`;
- scripts, comandos, hooks, skills, agentes ou workflows executáveis.

Se um arquivo sensível ou dado pessoal real for identificado no workspace, a etapa deve ser bloqueada sem consultar seu conteúdo.

## Convenções

- Usar caminhos relativos à raiz do repositório.
- Preservar os nomes de arquivos e diretórios definidos na etapa e no roadmap.
- Usar o identificador `IA-01` em referências a esta etapa.
- Manter os artefatos atuais em Markdown e com finalidade exclusivamente documental.
- Não antecipar nomes ou estruturas reservados para etapas futuras.

Detalhes de nomenclatura além dos caminhos definidos para a IA-01: Não especificado no roadmap.

## Versionamento e rastreabilidade

- O Git é o mecanismo de rastreabilidade e rollback.
- Alterações devem permanecer revisáveis e restritas aos arquivos autorizados.
- Commit, push, merge e deploy não fazem parte desta etapa.
- A revisão deve ser feita por agente diferente do executor antes de qualquer avanço.

## Riscos e mitigação

| Risco | Mitigação na IA-01 |
|---|---|
| Confusão entre ambiente local e produção | Manter o workspace relativo ao repositório e proibir serviços externos e produção. |
| Cópia acidental de arquivos sensíveis | Proibir `.env`, secrets, credenciais e dados reais; bloquear a etapa se forem identificados. |
| Falta de rastreabilidade | Manter somente documentação versionável e revisar o estado e o diff do Git. |
| Permissões locais amplas | Limitar a escrita aos dois arquivos da IA-01 e não criar configurações de agentes. |
| Antecipação de etapas futuras | Não criar subpastas operacionais, agentes, automações ou políticas pertencentes a outras etapas. |

## Rollback

Reverter exclusivamente os arquivos criados pela IA-01 por meio do Git ou removê-los manualmente antes do versionamento, mediante autorização. Se houver exposição acidental de dado sensível, bloquear a etapa, preservar apenas evidências não sensíveis, registrar o incidente e revisar permissões; a rotação de credenciais cabe ao responsável humano.
