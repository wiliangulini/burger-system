# IA-03 — Definir estrutura de pastas operacionais — 01-execucao

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`

Quando o roadmap estiver importado com sufixo, trate-o como fonte equivalente. Não renomeie arquivos.

## 2. Contexto

Esta etapa faz parte do Lote 1 do roadmap operacional de IA. A execução deve permanecer local, documental, versionável e sem ações externas.

IA-03 depende da conclusão de IA-01 e IA-02. Não inicie IA-03 sem políticas de segurança, permissões e limites já documentadas.

## 3. Objetivo

Definir uma estrutura de pastas para separar entradas, rascunhos, aprovações, publicações controladas, templates, logs, relatórios, auditorias e arquivos de teste.

## 4. Agente executor recomendado

Agente Técnico/Dev.

## 5. Agente revisor recomendado

Agente de Planejamento.

## 6. Pré-requisitos

- IA-01 concluída.
- IA-02 concluída.
- Convenções de permissões disponíveis.
- Workspace local ou sandbox definido.

## 7. Arquivos permitidos

- `docs/ia/estrutura-pastas.md`
- `workspace-agentes/briefings/`
- `workspace-agentes/drafts/`
- `workspace-agentes/reviews/`
- `workspace-agentes/approved/`
- `workspace-agentes/published/`
- `workspace-agentes/templates/`
- `workspace-agentes/logs/`
- `workspace-agentes/reports/`
- `workspace-agentes/audits/`

Altere somente arquivos necessários para cumprir esta etapa. Registre todos os arquivos criados ou alterados no relatório final.

## 8. Arquivos proibidos

- templates reais de WhatsApp
- posts reais
- campanhas reais
- automações reais
- arquivos de configuração de agentes
- arquivos de API externa
- `.env`
- tokens, secrets, credenciais ou dados pessoais reais
- `.claude/agents/`
- `.claude/commands/`
- `.codex/`

Também é proibido criar arquivos de agentes reais, comandos executáveis, hooks, skills, workflows, scripts ou configurações de automação.

## 9. Escopo permitido

- Planejar pastas operacionais.
- Separar estados do fluxo editorial.
- Separar logs e relatórios por etapa.
- Definir nomes e convenções de arquivos.
- Definir áreas proibidas para agentes.

## 10. Escopo proibido

- Criar templates reais de WhatsApp.
- Criar posts reais.
- Criar campanhas.
- Criar automações.
- Criar arquivos de configuração de agentes.
- Conectar qualquer API.

Além disso, é proibido publicar, enviar mensagens, enviar e-mails, disparar campanhas, conectar APIs externas, acessar produção, acessar dados reais ou acessar secrets.

## 11. Procedimento de execução

1. Leia o `roadmap-execucao-ia.md`.
2. Leia `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`.
3. Confirme que a etapa atual é `IA-03`.
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
- `ls workspace-agentes`
- `tree workspace-agentes`, se disponível
- Validação manual documentada do fluxo entre pastas

A indisponibilidade de `tree` deve ser registrada sem instalar ferramenta nova e sem executar ação externa.

## 13. Critérios de aceite

- Estrutura separa claramente entrada, rascunho, revisão, aprovação, publicação controlada, logs e auditorias.
- Nenhuma pasta implica envio ou publicação automática.
- A movimentação entre estágios depende de revisão e aprovação.
- Pastas sensíveis e proibidas estão documentadas.
- Estrutura é compatível com futuras automações em teste.

## 14. Critérios de bloqueio

Bloqueie a etapa quando ocorrer qualquer item abaixo:

- Mistura entre `drafts/`, `approved/` e `published/`.
- Falta de pasta de logs ou relatórios.
- Pastas com nomes que induzem publicação automática sem aprovação.
- Estrutura contendo dados reais ou credenciais.
- Ausência de documentação de transição entre estados.

Também bloqueie quando houver tentativa de acessar `.env`, tokens, secrets, credenciais, dados pessoais reais ou serviço externo.

## 15. Riscos

- Agente operar na pasta errada.
- Conteúdo não aprovado ser confundido com aprovado.
- Logs ficarem dispersos.
- Futuras automações usarem caminhos ambíguos.

Registre mitigação ou pendência para cada risco identificado.

## 16. Rollback

Reverter a estrutura via Git ou restaurar o estado anterior do workspace. Se houver arquivos movidos incorretamente, registrar a inconsistência no relatório e retornar os arquivos ao estágio correto antes de prosseguir.

## 17. Formato obrigatório do relatório final

Entregue o relatório final neste formato:

```md
# Relatório final — IA-03 — Definir estrutura de pastas operacionais

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
