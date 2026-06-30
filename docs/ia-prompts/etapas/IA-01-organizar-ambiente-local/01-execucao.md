# IA-01 — Organizar ambiente local e workspace de agentes — 01-execucao

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`

Quando o roadmap estiver importado com sufixo, trate-o como fonte equivalente. Não renomeie arquivos.

## 2. Contexto

Esta etapa faz parte do Lote 1 do roadmap operacional de IA. A execução deve permanecer local, documental, versionável e sem ações externas.

IA-01 é a primeira etapa do roadmap. Não depende de IA anterior.

## 3. Objetivo

Criar uma base local segura, versionada e isolada para organizar documentos, rascunhos, aprovações, logs e futuros artefatos de agentes sem tocar produção.

## 4. Agente executor recomendado

Agente Técnico/Dev.

## 5. Agente revisor recomendado

Agente Auditor de Segurança.

## 6. Pré-requisitos

- Repositório Git inicial ou pasta de trabalho versionável.
- Editor local disponível.
- Decisão de que nenhuma integração externa real será usada nesta etapa.
- Permissão para criar apenas documentação e estrutura local de planejamento.

## 7. Arquivos permitidos

- `roadmap-execucao-ia.md`
- `README.md`
- `docs/ia/ambiente-local.md`
- `workspace-agentes/`
- `workspace-agentes/README.md`

Altere somente arquivos necessários para cumprir esta etapa. Registre todos os arquivos criados ou alterados no relatório final.

## 8. Arquivos proibidos

- `.env`
- arquivos de tokens, secrets, credenciais ou chaves de API
- arquivos contendo dados pessoais reais
- arquivos de produção
- arquivos de integração externa
- `.claude/agents/`
- `.claude/commands/`
- `.codex/`
- qualquer script de automação

Também é proibido criar arquivos de agentes reais, comandos executáveis, hooks, skills, workflows, scripts ou configurações de automação.

## 9. Escopo permitido

- Definir workspace local dedicado.
- Registrar convenções de nomes.
- Documentar limites de leitura e escrita.
- Preparar base para futuras pastas operacionais.
- Validar que o trabalho está restrito ao repositório ou sandbox.

## 10. Escopo proibido

- Criar agentes reais.
- Criar workflows n8n/Make.
- Conectar APIs externas.
- Criar scripts de automação.
- Publicar, enviar mensagens ou disparar campanhas.
- Manipular `.env`, tokens, credenciais ou dados pessoais reais.

Além disso, é proibido publicar, enviar mensagens, enviar e-mails, disparar campanhas, conectar APIs externas, acessar produção, acessar dados reais ou acessar secrets.

## 11. Procedimento de execução

1. Leia o `roadmap-execucao-ia.md`.
2. Leia `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`.
3. Confirme que a etapa atual é `IA-01`.
4. Confirme que o ambiente é local, sandbox ou pasta versionável.
5. Liste os arquivos que pretende criar ou alterar.
6. Execute somente o escopo permitido.
7. Registre qualquer lacuna como `Não especificado no roadmap.`.
8. Não toque em arquivos proibidos.
9. Não crie integrações, agentes reais, workflows, scripts ou comandos executáveis.
10. Execute os comandos obrigatórios de validação.
11. Registre as evidências de validação.
12. Gere o relatório final no formato obrigatório.
13. Pare após o relatório final.

## 12. Comandos obrigatórios de validação extraídos do roadmap

Execute ou documente a indisponibilidade do comando no ambiente:

- `git status`
- `git diff --stat`
- `ls`
- `tree workspace-agentes`, se `tree` estiver disponível
- Validação manual documentada da ausência de `.env`, tokens e dados pessoais no workspace

A indisponibilidade de `tree` deve ser registrada sem instalar ferramenta nova e sem executar ação externa.

## 13. Critérios de aceite

- Existe uma definição clara do workspace local.
- O workspace está sob controle de versão ou pronto para versionamento.
- A fronteira entre arquivos permitidos e proibidos está documentada.
- Não há arquivos sensíveis dentro do workspace.
- Nenhuma ação externa foi configurada.

## 14. Critérios de bloqueio

Bloqueie a etapa quando ocorrer qualquer item abaixo:

- Workspace fora do repositório sem justificativa.
- Presença de secrets, `.env`, credenciais ou dados reais.
- Agente com acesso amplo ao sistema de arquivos.
- Alteração em produção ou serviço externo.
- Ausência de Git ou mecanismo equivalente de rastreabilidade.

Também bloqueie quando houver tentativa de acessar `.env`, tokens, secrets, credenciais, dados pessoais reais ou serviço externo.

## 15. Riscos

- Confusão entre sandbox e produção.
- Arquivos sensíveis copiados por engano.
- Falta de versionamento dificultar rollback.
- Permissões locais amplas demais.

Registre mitigação ou pendência para cada risco identificado.

## 16. Rollback

Reverter alterações da etapa via Git ou restaurar backup do workspace. Se algum arquivo sensível foi copiado, remover do workspace, registrar incidente, rotacionar credenciais afetadas e revisar permissões antes de continuar.

## 17. Formato obrigatório do relatório final

Entregue o relatório final neste formato:

```md
# Relatório final — IA-01 — Organizar ambiente local e workspace de agentes

## Status
Aprovado / Aprovado com ajustes / Bloqueado

## Agente executor
Agente Técnico/Dev

## Fonte consultada
- roadmap-execucao-ia.md
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md

## Escopo executado

## Arquivos criados ou alterados

## Arquivos consultados

## Comandos de validação executados

## Evidências de validação

## Critérios de aceite atendidos

## Critérios de bloqueio verificados

## Riscos encontrados

## Rollback documentado

## Pendências

## Confirmações obrigatórias
- Não houve implementação de código.
- Não houve criação de agentes reais.
- Não houve criação de workflows reais.
- Não houve criação de scripts de automação.
- Não houve ação externa.
- Não houve publicação, envio, campanha ou agendamento real.
- Não houve conexão com APIs externas.
- Não houve uso de dados reais.
- Não houve acesso a `.env`, tokens, secrets ou credenciais.
- A execução permaneceu no escopo do roadmap.

## Decisão final
Aprovado para revisão / Bloqueado
```

## 18. Instrução final

Não avance automaticamente para `02-revisao.md`. Pare após entregar o relatório final da execução.
