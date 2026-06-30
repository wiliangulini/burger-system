# IA-03 — Definir estrutura de pastas operacionais — 02-revisao

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- relatório final produzido por `01-execucao.md`

## 2. Papel do agente revisor

Atue como Agente de Planejamento. Revise a entrega feita por Agente Técnico/Dev.

O revisor não deve aprovar a própria execução. O revisor não deve corrigir diretamente a entrega, salvo quando o roadmap da etapa pedir explicitamente. Para esta etapa, correções diretas não estão autorizadas.

## 3. Itens a verificar

Verifique obrigatoriamente:

- aderência ao objetivo da etapa;
- aderência ao escopo permitido;
- ausência de escopo proibido;
- arquivos criados ou alterados;
- arquivos proibidos não alterados;
- comandos de validação executados;
- relatório final da execução;
- critérios de aceite;
- critérios de bloqueio;
- riscos e rollback;
- ausência de implementação de código;
- ausência de agentes reais;
- ausência de workflows reais;
- ausência de scripts;
- ausência de ações externas;
- ausência de acesso a `.env`, tokens, secrets, credenciais ou dados pessoais reais.

## 4. Aderência ao roadmap

Compare a execução com o bloco `IA-03` do `roadmap-execucao-ia.md`.

Classifique cada item como:

- `Conforme`;
- `Conforme com ajuste`;
- `Não conforme`;
- `Não especificado no roadmap`.

## 5. Verificação de escopo

Confirme que a entrega não ultrapassou o escopo permitido e não executou o escopo proibido.

Registre qualquer arquivo, pasta, ação ou decisão fora da etapa.

## 6. Verificação de segurança

Confirme que:

- o princípio de menor permissão foi respeitado;
- nenhum comando destrutivo foi executado;
- nenhum serviço externo foi configurado ou acionado;
- nenhum arquivo sensível foi acessado;
- nenhum agente recebeu permissão ampla sem justificativa;
- nenhuma produção foi alterada.

## 7. Verificação de LGPD

Confirme que:

- não houve uso de dados pessoais reais;
- exemplos usam dados fictícios ou anonimizados;
- não há credenciais, tokens ou identificadores sensíveis nos arquivos;
- logs e relatórios não expõem dados pessoais;
- qualquer lacuna foi registrada sem suposição perigosa.

## 8. Verificação de arquivos criados/alterados

Liste todos os arquivos citados no relatório de execução e classifique:

- permitido;
- proibido;
- exige esclarecimento;
- não especificado no roadmap.

## 9. Verificação dos comandos de validação

Confirme se os comandos abaixo foram executados ou se a indisponibilidade foi documentada:

- `git status`
- `git diff --stat`
- `ls workspace-agentes`
- `tree workspace-agentes`, se disponível
- Validação manual documentada do fluxo entre pastas

A ausência de evidência para comando obrigatório deve ser registrada como ajuste obrigatório ou bloqueador, conforme impacto.

## 10. Verificação do relatório final da execução

O relatório de execução deve conter:

- status;
- agente executor;
- fonte consultada;
- escopo executado;
- arquivos criados ou alterados;
- comandos executados;
- evidências;
- critérios de aceite;
- critérios de bloqueio;
- riscos;
- rollback;
- pendências;
- confirmações obrigatórias;
- decisão final.

## 11. Critérios para decisão

### Aprovar

Aprove somente quando:

- escopo está correto;
- comandos obrigatórios têm evidência;
- critérios de aceite foram atendidos;
- não há bloqueadores;
- rollback está documentado;
- relatório final está completo.

### Aprovar com ajustes

Use quando houver pendências não bloqueantes, como clareza documental, formatação, evidência parcial ou detalhe complementar sem risco de segurança, LGPD ou escopo.

### Reprovar

Reprove quando houver:

- acesso a secrets, `.env`, credenciais ou dados reais;
- ação externa;
- criação de agente real, workflow real, script ou comando executável;
- alteração fora do escopo;
- ausência de validação obrigatória;
- ausência de rollback;
- ausência de relatório final;
- risco de segurança ou LGPD não mitigado.

## 12. Formato obrigatório do relatório de revisão

```md
# Relatório de revisão — IA-03 — Definir estrutura de pastas operacionais

## Status da revisão
Aprovado / Aprovado com ajustes / Reprovado

## Agente revisor
Agente de Planejamento

## Execução revisada
Identifique o relatório de execução revisado.

## Aderência ao roadmap

## Verificação de escopo

## Verificação de segurança

## Verificação de LGPD

## Arquivos criados ou alterados

## Comandos de validação verificados

## Relatório final da execução

## Problemas encontrados
| ID | Severidade | Problema | Evidência | Correção exigida |
|---|---|---|---|---|

## Ajustes obrigatórios

## Pendências não bloqueantes

## Bloqueadores

## Decisão
Aprovado para auditoria final / Enviar para correção pós-revisão / Bloqueado
```

## 13. Instrução final

Não corrija diretamente a execução. Entregue somente o relatório de revisão e pare.
