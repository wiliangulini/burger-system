# IA-03 — Definir estrutura de pastas operacionais — 04-auditoria-final

## 1. Fonte obrigatória

Use obrigatoriamente:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- relatório de `01-execucao.md`
- relatório de `02-revisao.md`
- relatório de `03-correcao-pos-revisao.md`, quando houver correção

## 2. Papel da auditoria final

Atue como auditor final da etapa `IA-03`. Verifique se a etapa está segura, completa, rastreável e pronta para avançar.

Não implemente correções. Não altere arquivos. Não execute ações externas.

## 3. Perguntas obrigatórias

Responda uma a uma:

- Pode avançar para a próxima etapa?
- Há bloqueadores?
- Houve alteração fora de escopo?
- Há risco de segurança?
- Há risco de LGPD?
- Houve acesso a `.env`, tokens, secrets, credenciais ou dados reais?
- Houve ação externa?
- Os arquivos estão versionáveis?
- Os comandos de validação foram executados?
- O relatório final está completo?
- Há rollback documentado?

## 4. Critérios de aprovação final

A etapa só pode ser aprovada quando:

- objetivo da etapa foi atendido;
- escopo permitido foi respeitado;
- escopo proibido não ocorreu;
- execução e revisão foram separadas;
- correções obrigatórias foram tratadas;
- comandos obrigatórios foram executados ou indisponibilidade foi documentada;
- não há bloqueadores;
- não há risco de segurança não tratado;
- não há risco de LGPD não tratado;
- não houve acesso a secrets, credenciais ou dados reais;
- não houve ação externa;
- rollback está documentado;
- relatório final está completo;
- arquivos estão versionáveis.

## 5. Critérios de bloqueio final

Declare `BLOQUEADO` quando ocorrer qualquer item abaixo:

- ausência de relatório de execução;
- ausência de revisão por agente diferente;
- ausência de evidência dos comandos obrigatórios;
- ausência de rollback;
- arquivo proibido alterado;
- criação de agente real;
- criação de workflow real;
- criação de script ou comando executável;
- acesso a `.env`, tokens, secrets, credenciais ou dados reais;
- ação externa;
- publicação, envio, campanha ou produção;
- risco de segurança ou LGPD sem tratamento;
- escopo da etapa misturado com etapa futura;
- aprovação humana exigida e não registrada.

## 6. Matriz de decisão

Use exatamente uma das decisões abaixo:

### `APROVADO PARA AVANÇAR`

Use quando todos os critérios de aprovação final forem atendidos e não houver bloqueadores.

### `APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES`

Use quando houver pendências documentais menores que não afetam segurança, LGPD, escopo, rollback, validação ou avanço seguro.

### `BLOQUEADO`

Use quando houver qualquer bloqueador final.

## 7. Verificação dos comandos obrigatórios

Confirme evidência para:

- `git status`
- `git diff --stat`
- `ls workspace-agentes`
- `tree workspace-agentes`, se disponível
- Validação manual documentada do fluxo entre pastas

## 8. Formato obrigatório do relatório de auditoria final

```md
# Relatório de auditoria final — IA-03 — Definir estrutura de pastas operacionais

## Decisão final
APROVADO PARA AVANÇAR / APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES / BLOQUEADO

## Agente auditor
Agente de Planejamento

## Fontes verificadas

## Respostas às perguntas obrigatórias
| Pergunta | Resposta | Evidência |
|---|---|---|
| Pode avançar para a próxima etapa? |  |  |
| Há bloqueadores? |  |  |
| Houve alteração fora de escopo? |  |  |
| Há risco de segurança? |  |  |
| Há risco de LGPD? |  |  |
| Houve acesso a `.env`, tokens, secrets, credenciais ou dados reais? |  |  |
| Houve ação externa? |  |  |
| Os arquivos estão versionáveis? |  |  |
| Os comandos de validação foram executados? |  |  |
| O relatório final está completo? |  |  |
| Há rollback documentado? |  |  |

## Aderência ao roadmap

## Verificação de segurança

## Verificação de LGPD

## Verificação de arquivos

## Verificação de validações

## Verificação de rollback

## Pendências não bloqueantes

## Bloqueadores finais

## Recomendação operacional
Avançar / Corrigir pendências / Bloquear próxima etapa
```

## 9. Instrução final

Pare após entregar o relatório de auditoria final. Não inicie a próxima etapa automaticamente.
