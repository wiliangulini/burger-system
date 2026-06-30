# IA-02 — Criar regras de segurança, permissões e limites — 01-execucao

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`

Quando o roadmap estiver importado com sufixo, trate-o como fonte equivalente. Não renomeie arquivos.

## 2. Contexto

Esta etapa faz parte do Lote 1 do roadmap operacional de IA. A execução deve permanecer local, documental, versionável e sem ações externas.

IA-02 depende da conclusão de IA-01. Não inicie IA-02 sem relatório final e revisão/auditoria de IA-01.

## 3. Objetivo

Definir uma política operacional de segurança para agentes, incluindo permissões mínimas, limites por agente, ações proibidas, aprovação humana, proteção de credenciais, LGPD e bloqueios para comandos perigosos.

## 4. Agente executor recomendado

Agente Auditor de Segurança.

## 5. Agente revisor recomendado

Agente Técnico/Dev.

## 6. Pré-requisitos

- IA-01 concluída.
- Workspace local definido.
- Lista inicial de agentes envolvidos.
- Decisão de que a etapa é documental e não altera integrações reais.

## 7. Arquivos permitidos

- `docs/ia/security-rules.md`
- `docs/ia/permissoes-agentes.md`
- `docs/ia/lgpd-e-dados.md`
- `docs/ia/acoes-criticas.md`
- `workspace-agentes/logs/security-review.md`

Altere somente arquivos necessários para cumprir esta etapa. Registre todos os arquivos criados ou alterados no relatório final.

## 8. Arquivos proibidos

- `.env`
- arquivos de tokens, secrets, credenciais ou chaves de API
- arquivos contendo dados pessoais reais de clientes
- hooks reais de bloqueio
- agentes ou comandos executáveis
- arquivos de API externa
- `.claude/agents/`
- `.claude/commands/`
- `.codex/`
- scripts de automação

Também é proibido criar arquivos de agentes reais, comandos executáveis, hooks, skills, workflows, scripts ou configurações de automação.

## 9. Escopo permitido

- Documentar permissões por agente.
- Definir ações críticas que exigem aprovação humana.
- Definir arquivos e pastas proibidos.
- Definir política de secrets e dados pessoais.
- Definir critérios de bloqueio para envio, publicação e produção.
- Definir regras de LGPD, opt-in, retenção e logs.

## 10. Escopo proibido

- Criar hooks reais de bloqueio.
- Criar agentes ou comandos executáveis.
- Configurar APIs externas.
- Executar testes destrutivos.
- Usar dados reais de clientes.
- Expor conteúdo de `.env` ou credenciais.

Além disso, é proibido publicar, enviar mensagens, enviar e-mails, disparar campanhas, conectar APIs externas, acessar produção, acessar dados reais ou acessar secrets.

## 11. Procedimento de execução

1. Leia o `roadmap-execucao-ia.md`.
2. Leia `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`.
3. Confirme que a etapa atual é `IA-02`.
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
- `ls docs/ia`
- Validação manual documentada da política de permissões
- Validação manual documentada da ausência de comandos destrutivos

A indisponibilidade de `tree` deve ser registrada sem instalar ferramenta nova e sem executar ação externa.

## 13. Critérios de aceite

- Cada agente possui permissões esperadas e limites explícitos.
- Ações críticas exigem aprovação humana.
- WhatsApp não oficial está proibido.
- Publicação, envio e campanhas reais estão bloqueados sem aprovação.
- Secrets, `.env` e dados pessoais possuem regra explícita de proteção.
- Regras de LGPD, opt-in, logs e retenção estão documentadas.

## 14. Critérios de bloqueio

Bloqueie a etapa quando ocorrer qualquer item abaixo:

- Qualquer agente com permissão ampla sem justificativa.
- Ausência de aprovação humana para publicação, envio, orçamento ou produção.
- Permissão para WhatsApp não oficial.
- Política sem tratamento de LGPD, opt-in ou retenção.
- Arquivo de política contendo secrets ou dados pessoais reais.

Também bloqueie quando houver tentativa de acessar `.env`, tokens, secrets, credenciais, dados pessoais reais ou serviço externo.

## 15. Riscos

- Política genérica demais para bloquear ações perigosas.
- Excesso de autonomia concedida a agentes.
- Falha de compliance por ausência de opt-in e retenção.
- Vazamento de credenciais em logs ou documentação.

Registre mitigação ou pendência para cada risco identificado.

## 16. Rollback

Reverter arquivos de política da etapa via Git e restaurar a versão anterior. Se uma regra insegura já tiver sido usada em etapa posterior, pausar o roadmap, auditar logs e corrigir permissões antes de retomar.

## 17. Formato obrigatório do relatório final

Entregue o relatório final neste formato:

```md
# Relatório final — IA-02 — Criar regras de segurança, permissões e limites

## Status
Aprovado / Aprovado com ajustes / Bloqueado

## Agente executor
Agente Auditor de Segurança

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
