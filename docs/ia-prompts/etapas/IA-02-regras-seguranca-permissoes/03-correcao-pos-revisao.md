# IA-02 — Criar regras de segurança, permissões e limites — 03-correcao-pos-revisao

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- relatório final de `01-execucao.md`
- relatório de `02-revisao.md`

## 2. Objetivo da correção

Corrigir somente os problemas apontados no relatório de revisão da etapa `IA-02`.

## 3. Regra central

Não refaça a etapa inteira.

Não amplie escopo. Não crie novos artefatos fora dos pontos exigidos na revisão. Não introduza ferramentas, integrações, automações, scripts, agentes reais ou comandos executáveis.

## 4. Obrigação de rastreabilidade

Para cada problema corrigido, cite:

- ID do problema no relatório de revisão;
- descrição do problema;
- arquivo ou seção corrigida;
- alteração aplicada;
- validação executada;
- resultado.

## 5. Arquivos que podem ser alterados

- `docs/ia/security-rules.md`
- `docs/ia/permissoes-agentes.md`
- `docs/ia/lgpd-e-dados.md`
- `docs/ia/acoes-criticas.md`
- `workspace-agentes/logs/security-review.md`

Altere somente arquivos relacionados aos problemas registrados na revisão.

## 6. Arquivos proibidos

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

Não acesse `.env`, tokens, secrets, credenciais, dados pessoais reais, arquivos de produção ou configurações executáveis de agentes.

## 7. Procedimento de correção

1. Leia o relatório de revisão.
2. Liste todos os problemas marcados como obrigatórios ou bloqueantes.
3. Corrija somente esses problemas.
4. Preserve partes aprovadas da execução.
5. Não substitua a entrega inteira.
6. Não avance para nova etapa.
7. Execute validações pós-correção.
8. Gere relatório de correção.

## 8. Comandos de validação pós-correção

Execute ou documente indisponibilidade:

- `git status`
- `git diff --stat`
- `ls docs/ia`
- Validação manual documentada da política de permissões
- Validação manual documentada da ausência de comandos destrutivos

Inclua validação manual dos pontos corrigidos.

## 9. Critérios de aceite da correção

A correção será aceita quando:

- todos os problemas obrigatórios forem tratados;
- cada correção citar o ID do problema correspondente;
- nenhum novo escopo for adicionado;
- nenhum arquivo proibido for acessado ou alterado;
- os comandos de validação forem executados ou documentados;
- o rollback permanecer aplicável;
- o relatório de correção estiver completo.

## 10. Critérios de bloqueio

Bloqueie a correção quando houver:

- tentativa de refazer a etapa inteira;
- alteração fora dos pontos apontados na revisão;
- acesso a `.env`, tokens, secrets, credenciais ou dados reais;
- criação de agente real, workflow real, script ou comando executável;
- ação externa;
- impossibilidade de validar a correção;
- perda de rastreabilidade dos ajustes.

## 11. Rollback

Reverter arquivos de política da etapa via Git e restaurar a versão anterior. Se uma regra insegura já tiver sido usada em etapa posterior, pausar o roadmap, auditar logs e corrigir permissões antes de retomar.

Se a correção introduzir novo erro, reverta apenas a correção pós-revisão e preserve o relatório de revisão original.

## 12. Formato obrigatório do relatório de correção

```md
# Relatório de correção pós-revisão — IA-02 — Criar regras de segurança, permissões e limites

## Status
Aprovado / Aprovado com ajustes / Bloqueado

## Agente corretor
Agente Auditor de Segurança

## Relatório de revisão usado como fonte

## Problemas corrigidos
| ID do problema | Correção aplicada | Arquivo/seção | Validação | Resultado |
|---|---|---|---|---|

## Problemas não corrigidos

## Arquivos alterados

## Comandos de validação executados

## Evidências de validação

## Novos riscos encontrados

## Rollback

## Confirmações obrigatórias
- Não houve reexecução integral da etapa.
- Não houve alteração fora dos pontos da revisão.
- Não houve implementação de código.
- Não houve criação de agentes reais.
- Não houve criação de workflows reais.
- Não houve ação externa.
- Não houve uso de dados reais.
- Não houve acesso a `.env`, tokens, secrets ou credenciais.

## Decisão
Enviar para auditoria final / Retornar para revisão / Bloqueado
```

## 13. Instrução final

Pare após entregar o relatório de correção. Não avance automaticamente para auditoria final.
