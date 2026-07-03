# Como usar os prompts

## 1. Objetivo da pasta `docs/ia-prompts/`

A pasta `docs/ia-prompts/` organiza os prompts operacionais usados para executar, revisar, corrigir e auditar cada etapa do roadmap de IA.

Esta pasta não cria agentes reais, não cria automações reais, não cria comandos executáveis e não substitui aprovação humana. Ela serve como camada documental e operacional para conduzir o trabalho incremental com segurança.

## 2. Fonte obrigatória

Antes de usar qualquer prompt, leia:

- `roadmap-execucao-ia.md`
- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- o prompt específico da etapa em execução

Quando o arquivo importado do roadmap tiver sufixo, como `roadmap-execucao-ia(1).md`, trate esse arquivo como equivalente ao `roadmap-execucao-ia.md`.

## 3. Ordem correta de uso em cada etapa

Execute os arquivos da etapa sempre nesta ordem:

```txt
01-execucao.md
02-revisao.md
03-correcao-pos-revisao.md
04-auditoria-final.md
```

Não pule arquivos. Não use auditoria antes da revisão. Não execute correção sem relatório de revisão.

## 4. Quem executa cada tipo de prompt

### `01-execucao.md`

Use com o agente executor indicado no roadmap para a etapa. O executor realiza apenas o escopo permitido, executa as validações obrigatórias e entrega relatório final.

### `02-revisao.md`

Use com o agente revisor indicado no roadmap. O revisor avalia a entrega do executor, verifica escopo, segurança, LGPD, arquivos e comandos de validação. O revisor não deve corrigir diretamente a execução.

### `03-correcao-pos-revisao.md`

Use com o agente executor original ou outro agente técnico autorizado para corrigir somente os pontos apontados no relatório de revisão. Não refaça a etapa inteira.

### `04-auditoria-final.md`

Use com o agente auditor ou revisor definido para validar se a etapa pode avançar. A auditoria final decide entre:

- `APROVADO PARA AVANÇAR`
- `APROVADO COM PENDÊNCIAS NÃO BLOQUEANTES`
- `BLOQUEADO`

## 5. Como usar Claude Code e Codex no fluxo

Use Claude Code e Codex como executores ou revisores de prompts, não como agentes autônomos de produção.

Fluxo recomendado:

1. Use uma IA para executar `01-execucao.md`.
2. Exija relatório final.
3. Use outra IA para executar `02-revisao.md`.
4. Corrija somente os pontos indicados usando `03-correcao-pos-revisao.md`.
5. Use `04-auditoria-final.md` para decidir avanço.
6. Registre resultado e pare no fim da etapa.

O mesmo agente não deve executar e aprovar a própria entrega.

## 6. Quando parar

Pare imediatamente quando ocorrer qualquer item abaixo:

- ausência do roadmap;
- ausência de relatório final da etapa anterior;
- tentativa de acessar `.env`, tokens, secrets, credenciais ou dados reais;
- tentativa de criar agente real, workflow real, script ou comando executável;
- tentativa de conectar API externa;
- tentativa de publicar, enviar, agendar, disparar campanha ou operar produção;
- dúvida de segurança sem resposta no roadmap;
- critério de bloqueio acionado;
- revisão reprovada;
- auditoria final marcada como `BLOQUEADO`.

Ao parar, registre o bloqueio no relatório.

## 7. Quando pedir revisão humana

Peça revisão humana quando houver:

- ação crítica;
- dúvida de escopo;
- risco de segurança;
- risco de LGPD;
- alteração que possa afetar produção;
- possibilidade de envio, publicação, campanha, orçamento ou uso de dados reais;
- conflito entre roadmap, prompt e estado atual do repositório;
- relatório com pendência bloqueante.

A aprovação humana deve ser rastreável. Agentes não podem simular aprovação humana.

## 8. Como registrar relatório final

Cada prompt deve terminar com relatório final no formato exigido pelo próprio arquivo.

O relatório deve registrar:

- etapa;
- agente;
- fonte;
- arquivos criados ou alterados;
- comandos executados;
- evidências;
- riscos;
- bloqueadores;
- pendências;
- rollback;
- decisão final;
- confirmação de que não houve código, agente real, workflow real, ação externa, dados reais ou acesso a secrets.

## 9. Como avançar para a próxima etapa

Avance somente após:

1. execução concluída;
2. revisão concluída;
3. correção concluída quando houver ajustes obrigatórios;
4. auditoria final aprovada;
5. relatório final completo;
6. ausência de bloqueadores;
7. rollback documentado;
8. validações obrigatórias registradas.

Sem esses itens, a próxima etapa permanece bloqueada.

## 10. Por que não gerar todos os lotes de uma vez

Não gere todos os lotes de uma vez porque o roadmap depende de execução incremental, revisão por agente diferente, critérios de aceite, critérios de bloqueio, logs, rollback e validação antes de cada avanço.

Gerar muitos lotes antes de validar os anteriores aumenta risco de:

- escopo incorreto;
- políticas frágeis;
- prompts desalinhados;
- automações prematuras;
- criação acidental de agentes reais;
- permissões excessivas;
- falhas de LGPD;
- ausência de rollback;
- avanço sem aprovação humana.

## 11. Regra para IA-04 até IA-18

Nesta execução, gere conteúdo completo somente para:

- IA-01;
- IA-02;
- IA-03.

IA-04 até IA-18 permanecem apenas como estrutura planejada. Os prompts dessas etapas devem ser gerados em execuções futuras, depois que o Lote 1 estiver validado.

Não crie conteúdo operacional para IA-04 até IA-18 nesta rodada.
