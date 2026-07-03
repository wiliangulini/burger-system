# Instruções gerais para agentes de IA

## 1. Fonte obrigatória

A fonte principal e obrigatória para execução, revisão, correção e auditoria é:

- `roadmap-execucao-ia.md`

Leia o roadmap antes de iniciar qualquer etapa. Use também este arquivo:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`

Quando o arquivo importado estiver com sufixo, como `roadmap-execucao-ia(1).md`, `roadmap-execucao-ia(2).md` ou similar, trate esse arquivo como fonte equivalente ao `roadmap-execucao-ia.md`.

Não renomeie arquivos sem autorização explícita.

## 2. Regra de lacunas

Quando um detalhe operacional não estiver claro no roadmap, registre exatamente:

```txt
Não especificado no roadmap.
```

Não complete lacunas com suposições, integrações, automações, ferramentas, comandos, permissões, agentes, credenciais, fluxos ou arquivos que não estejam previstos no roadmap ou autorizados na etapa atual.

## 3. Limites globais

É proibido:

- implementar código;
- criar agentes reais;
- criar workflows reais n8n/Make;
- criar scripts de automação;
- criar arquivos `.claude/agents/`, `.claude/commands/`, `.codex/`, skills, hooks ou comandos executáveis;
- publicar conteúdo;
- agendar conteúdo real;
- enviar mensagens;
- enviar e-mails;
- disparar campanhas;
- conectar APIs externas;
- usar WhatsApp pessoal, WhatsApp Web automatizado, bibliotecas não oficiais ou scraping;
- acessar `.env`, tokens, secrets, credenciais ou dados pessoais reais;
- expor credenciais, logs sensíveis, transcrições confidenciais ou dados pessoais;
- operar em produção;
- fazer merge em branch principal;
- aprovar a própria entrega;
- avançar para a próxima etapa sem validação.

Trabalhe somente em ambiente local, sandbox ou teste, conforme o ambiente permitido no roadmap.

## 4. Regras de segurança

Aplique as seguintes regras em todas as etapas:

- preserve o princípio de menor permissão;
- limite leitura e escrita aos arquivos permitidos pela etapa;
- não acesse arquivos sensíveis;
- não solicite, copie, imprima, registre ou exponha secrets;
- não execute comandos destrutivos;
- não execute comandos que publiquem, enviem, disparem, conectem ou alterem serviços externos;
- registre bloqueio quando encontrar credencial, dado pessoal real, arquivo sensível ou escopo externo;
- mantenha rastreabilidade por Git, relatório e evidências de validação;
- bloqueie a etapa quando houver risco não resolvido de segurança, LGPD ou ação externa.

## 5. Regras de LGPD

Aplique LGPD desde as primeiras etapas:

- use finalidade definida para qualquer dado;
- minimize dados em documentos, logs e relatórios;
- use dados fictícios ou anonimizados;
- não use dados pessoais reais de clientes;
- não registre dados pessoais desnecessários;
- não registre conversas reais;
- não registre credenciais, tokens ou identificadores sensíveis;
- respeite opt-in quando houver comunicação futura;
- registre retenção limitada quando houver logs ou relatórios;
- preserve rastreabilidade de consentimento somente quando a etapa futura autorizar dados reais.

Nesta fase inicial, qualquer dado pessoal real encontrado deve bloquear a etapa.

## 6. Proibição de ações externas

Nenhum agente pode executar, configurar ou simular como real:

- publicação em redes sociais;
- agendamento real de conteúdo;
- envio de e-mail;
- envio de WhatsApp;
- disparo de campanha;
- alteração de orçamento;
- integração com CRM, marketing, e-mail, WhatsApp, métricas ou redes sociais;
- automação externa;
- chamada para API externa;
- scraping.

Quando houver exemplos, use apenas dados fictícios ou anonimizados.

## 7. Separação obrigatória de papéis

Toda etapa deve separar:

1. execução;
2. revisão;
3. correção pós-revisão;
4. auditoria final.

O agente executor não pode aprovar a própria entrega. A revisão deve ser feita por agente diferente do executor, conforme definido no roadmap.

## 8. Relatório final obrigatório por etapa

Cada execução, revisão, correção e auditoria deve terminar com relatório final. O relatório deve conter, no mínimo:

- etapa executada;
- agente executor ou revisor;
- fonte consultada;
- arquivos criados ou alterados;
- escopo realizado;
- escopo não realizado;
- comandos de validação executados;
- evidências dos comandos;
- riscos encontrados;
- bloqueadores;
- pendências;
- rollback aplicável;
- confirmação de ausência de secrets, dados reais e ações externas;
- decisão final.

Sem relatório final completo, a etapa não pode avançar.

## 9. Critérios de bloqueio globais

Bloqueie a etapa quando ocorrer qualquer item abaixo:

- ausência do `roadmap-execucao-ia.md`;
- tentativa de avançar sem ler o roadmap;
- execução fora do ambiente permitido;
- criação de agente real;
- criação de workflow real;
- criação de script de automação;
- criação de arquivo de configuração executável de agente;
- acesso a `.env`, tokens, secrets, credenciais ou dados pessoais reais;
- presença de secrets ou dados pessoais no workspace;
- ação externa configurada ou executada;
- WhatsApp não oficial, scraping ou biblioteca não autorizada;
- publicação, envio, campanha, orçamento ou produção sem aprovação humana;
- agente com permissão ampla sem justificativa;
- ausência de Git ou mecanismo equivalente de rastreabilidade;
- ausência de comandos de validação obrigatórios;
- ausência de rollback documentado;
- ausência de relatório final.

## 10. Política de não avanço sem validação

A próxima etapa só pode começar quando todos os itens abaixo forem verdadeiros:

- execução concluída;
- relatório final da execução entregue;
- revisão por agente diferente concluída;
- ajustes obrigatórios corrigidos;
- auditoria final aprovada;
- comandos obrigatórios executados ou justificativa documentada quando o comando não existir no ambiente;
- critérios de aceite atendidos;
- critérios de bloqueio inexistentes;
- rollback documentado;
- aprovação humana registrada quando aplicável.

Na presença de bloqueador, pare a execução, registre o motivo e não avance.
