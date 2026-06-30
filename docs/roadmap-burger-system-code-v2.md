# Roadmap Técnico v2 — Sistema de Hamburgueria

## 1. Objetivo do roadmap

Este roadmap transforma o planejamento técnico v2 em etapas pequenas, auditáveis e executáveis por IA com revisão humana. Ele substitui o roadmap anterior como trilha prática de execução, mantendo rastreabilidade com as antigas etapas R01-R16, mas reduzindo escopo, quebrando etapas grandes e movendo itens evolutivos para pós-MVP.

O objetivo não é implementar o sistema neste documento. O objetivo é orientar execução incremental com Codex e Claude Code no VS Code, reduzindo risco de big bang, diffs extensos, decisões implícitas e alterações fora do escopo.

## 2. Premissas técnicas

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- PostgreSQL.
- Prisma.
- Auth.js ou autenticação segura compatível com Next.js.
- Monólito modular.
- Validação server-side obrigatória.
- Separação entre área pública e admin.
- Deploy inicialmente simples.
- Sem Kubernetes no MVP.
- Sem gateway de pagamento completo no MVP.
- Sem integração iFood/delivery externo no MVP.
- Revisão manual obrigatória.
- Commits frequentes e pequenos.
- Nenhuma etapa avança sem revisão e aceite.

## 3. Estratégia de execução com IA

Codex e Claude Code devem trabalhar com escopo restrito. Codex é recomendado para implementação mecânica, criação de arquivos e correções pontuais. Claude Code é recomendado para revisão sênior, planejamento de etapa, auditoria de segurança e análise de diffs maiores.

Regras operacionais:

- usar prompts pequenos;
- solicitar plano antes da implementação;
- listar arquivos que serão alterados;
- proibir alterações fora do escopo;
- não instalar dependências sem autorização;
- não fazer commit, push ou deploy sem autorização;
- executar testes antes de concluir etapa;
- produzir relatório final obrigatório;
- realizar revisão cruzada em etapas sensíveis: modelagem, auth, checkout/pedido, upload, deploy.

## 4. Fases do roadmap

### Fase 0 — Preparação operacional

**Objetivo:** Preparar repositório, regras, documentação base e workflow dos agentes.

**Entregáveis esperados:**

- estrutura inicial de documentação;
- regras para Codex e Claude;
- template de relatório final;
- template de checklist por etapa;
- estratégia de branch e commits;
- Definition of Done por tipo de tarefa.

### Fase 1 — Fundação técnica

**Objetivo:** Criar a base Next.js, TypeScript, Tailwind, Prisma e PostgreSQL.

**Entregáveis esperados:**

- projeto Next.js App Router;
- Tailwind configurado;
- Prisma configurado;
- conexão com banco;
- estrutura de pastas;
- layout base;
- variáveis de ambiente documentadas;
- auth admin inicial;
- schema inicial com migrations.

### Fase 2 — Catálogo e administração

**Objetivo:** Criar a base de cardápio e painel administrativo mínimo.

**Entregáveis esperados:**

- categorias;
- produtos;
- disponibilidade;
- preço;
- imagem simples;
- painel admin protegido;
- CRUD mínimo;
- validação server-side.

### Fase 3 — Carrinho, checkout e pedidos

**Objetivo:** Permitir que o cliente monte um pedido e envie para a hamburgueria.

**Entregáveis esperados:**

- cardápio público;
- carrinho;
- checkout;
- dados do cliente;
- endereço;
- observações;
- criação de pedido;
- snapshot de itens;
- snapshot de endereço;
- envio/integração simples com WhatsApp ou tela de confirmação.

### Fase 4 — Operação da hamburgueria

**Objetivo:** Permitir que o admin visualize e gerencie pedidos.

**Entregáveis esperados:**

- listagem de pedidos;
- detalhes do pedido;
- status básico;
- filtros simples;
- atualização manual de status;
- visualização operacional;
- configurações simples da loja;
- dashboard básico se não atrasar o MVP.

### Fase 5 — Deploy e validação

**Objetivo:** Publicar uma versão funcional e validada.

**Entregáveis esperados:**

- deploy em Vercel ou VPS simples;
- variáveis de ambiente;
- banco configurado;
- migrações aplicadas;
- smoke tests;
- checklist de segurança;
- revisão final.

### Fase 6 — Pós-MVP

**Objetivo:** Listar evoluções futuras sem misturar com o MVP.

**Itens pós-MVP:**

- Gateway de pagamento;
- Pix automatizado e webhooks;
- Integração iFood/delivery externo;
- Impressão térmica;
- Dashboard/analytics avançado;
- Observabilidade avançada;
- Filas, cache avançado e Kubernetes;
- Multi-loja, app mobile e fidelidade;
- app mobile;
- múltiplas lojas;
- programa de fidelidade.

## 5. Etapas executáveis

As etapas abaixo substituem ou reorganizam as antigas R01-R16. As etapas antigas grandes foram quebradas em subtarefas menores, especialmente modelagem de dados, autenticação, produtos/upload, checkout/pedido, pagamentos/webhooks e CI/CD/observabilidade/escala.

| Nova etapa | Origem R01-R16 | Objetivo | Agente recomendado | Tamanho | Critério de aceite |
| --- | --- | --- | --- | --- | --- |
| E00 | Novo/R00 | Criar documentação operacional base, DoD, estratégia de branch e template de relatório. | Claude Code | P | Docs base existem e não há ambiguidade sobre fluxo de execução. |
| E01 | R01 | Consolidar README técnico, ADR inicial e regras de escopo do MVP. | Claude Code | P | MVP essencial/recomendado/pós-MVP documentados. |
| E02 | R02 | Criar scaffold Next.js App Router com TypeScript e Tailwind. | Codex | P | App sobe localmente, lint/typecheck/build verdes. |
| E03 | R03 | Configurar envs, .env.example, Prisma e conexão com PostgreSQL. | Codex | P | Conexão validada, sem secrets reais no código. |
| E04 | R04a | Modelagem conceitual convertida em schema inicial mínimo. | Claude + Codex | M | Schema cobre User, Category, Product, Customer, Order, OrderItem, Payment e snapshots. |
| E05 | R04b | Criar migrations, constraints e índices essenciais. | Codex | M | Migration revisável, índices essenciais presentes, banco aplica limpo. |
| E06 | R04c | Criar seed mínimo seguro para desenvolvimento. | Codex | P | Seed não define credencial fraca em produção e é documentado. |
| E07 | R05a | Implementar login admin e sessão segura. | Codex | M | Login/logout funcionam e cookie/sessão não expõe segredo. |
| E08 | R05b | Implementar proteção server-side e RBAC básico. | Claude + Codex | M | Rotas/actions admin negam acesso sem sessão/role. |
| E09 | R06 | Criar layout público e layout admin separados. | Codex | P | Shell público/admin sem lógica de negócio indevida. |
| E10 | R07 | Implementar cardápio público por categorias. | Codex | P | Cliente vê produtos ativos e indisponíveis não são vendáveis. |
| E11 | R08 | Implementar CRUD de categorias no admin. | Codex | P | Criar/editar/inativar categoria com validação server-side. |
| E12 | R09a | Implementar CRUD de produtos sem upload. | Codex | M | Produto com nome, preço, categoria, status e disponibilidade. |
| E13 | R09b | Implementar upload/gestão simples de imagem com validação segura. | Claude + Codex | M | Limite de tamanho, tipo permitido, nome gerado e armazenamento seguro. |
| E14 | R10 | Implementar carrinho client-side com revalidação prevista no servidor. | Codex | M | Adicionar/remover/alterar itens e observações. |
| E15 | R11a | Implementar schema e validação server-side do checkout. | Claude + Codex | M | Dados inválidos são recusados; entrega exige endereço. |
| E16 | R11b | Implementar cálculo server-side de subtotal, taxa e total. | Codex | M | Servidor recalcula tudo e ignora preço enviado pelo cliente. |
| E17 | R11c | Persistir pedido idempotente com snapshots. | Claude + Codex | G | Pedido, itens, pagamento e endereço histórico são persistidos em transação curta. |
| E18 | R11d | Criar tela de confirmação e tracking simples por código. | Codex | P | Cliente recebe código e visualiza confirmação. |
| E19 | R12a | Implementar listagem admin de pedidos. | Codex | P | Admin vê pedidos recentes com status e filtros simples. |
| E20 | R12b | Implementar detalhe do pedido e mudança de status. | Codex | M | Status muda apenas por transições válidas. |
| E21 | R12c | Registrar histórico/log de mudança de status. | Claude + Codex | P | Cada alteração relevante gera log ou OrderStatusHistory. |
| E22 | R15a | Implementar configurações essenciais da loja. | Codex | M | Nome, WhatsApp, horário simples, pedido mínimo e taxa configuráveis. |
| E23 | R15b | Implementar dashboard básico operacional. | Codex | P | Pedidos do dia, faturamento estimado e status. |
| E24 | R16a | Configurar CI mínimo. | Codex | P | GitHub Actions roda lint/typecheck/build/test. |
| E25 | R16b | Preparar deploy simples e checklist de envs. | Claude + Codex | M | Deploy reproduzível em Vercel ou VPS simples. |
| E26 | R16c | Executar validação final, smoke test e revisão de segurança. | Claude Code | M | MVP aceito segundo critérios gerais. |
| E27 | R13 | Tela dedicada de cozinha. | Pós-MVP | M | Somente após admin de pedidos estabilizado. |
| E28 | R14 | Gateway/webhooks/reconciliação. | Pós-MVP | G | Somente após pagamentos manuais estabilizados. |
| E29 | R15/R16 | Analytics, observabilidade avançada, filas, cache e Kubernetes. | Pós-MVP | G | Somente com demanda operacional comprovada. |

Legenda de tamanho: P = pequena; M = média; G = grande ou sensível. Etapas G devem ser preferencialmente quebradas novamente na execução, caso o diff previsto passe de poucos arquivos.

## 6. Prompt padrão por etapa

```text
Atue como agente de implementação com escopo estrito no repositório do Sistema de Hamburgueria.

Leitura obrigatória antes de editar:
- relatorio-tecnico-planejamento-Sistema-Hamburgueria-v2.docx ou sua versão Markdown equivalente;
- roadmap-burger-system-code-v2.md;
- README.md;
- ADRs existentes;
- arquivos diretamente relacionados à etapa atual.

Objetivo da etapa:
- [preencher com o objetivo exato da etapa]

Arquivos de entrada:
- [listar documentos e arquivos existentes necessários]

Arquivos que podem ser alterados:
- [listar caminhos explícitos]

Arquivos proibidos:
- [listar caminhos proibidos ou declarar “todos os demais arquivos”]

Antes de qualquer alteração:
1. Resuma em 8 a 12 linhas o entendimento da etapa.
2. Liste todos os arquivos que pretende criar, alterar ou remover.
3. Informe o que ficará fora de escopo.
4. Informe se pretende instalar dependências. Não instale sem autorização.
5. Informe quais comandos de validação serão executados.

Escopo permitido:
- somente a etapa atual;
- somente os arquivos autorizados;
- menor mudança suficiente para cumprir o critério de aceite;
- testes mínimos relacionados à etapa.

Escopo proibido:
- refatorações laterais;
- alterar arquitetura global sem ADR;
- instalar dependências sem autorização;
- alterar schema, auth, deploy ou envs fora da etapa;
- fazer commit, push, PR ou deploy sem autorização;
- ocultar falhas de lint, typecheck, build ou testes.

Checklist de segurança obrigatório:
- validar entrada no servidor;
- não confiar em preço, total, role, status ou disponibilidade vindos do cliente;
- verificar sessão/role no servidor para qualquer mutação admin;
- não expor secrets no cliente;
- tratar erros sem vazar dados sensíveis;
- se houver upload, validar extensão, tipo real, tamanho, nome gerado e storage seguro;
- se houver pedido/pagamento, garantir idempotência ou justificar limitação.

Testes mínimos:
- lint;
- typecheck;
- build quando aplicável;
- testes unitários/integrados afetados;
- checklist manual do fluxo alterado.

Critérios de aceite:
- [preencher critérios objetivos da etapa]

Relatório final obrigatório:
- objetivo da etapa;
- arquivos criados;
- arquivos alterados;
- dependências adicionadas ou justificativa para não adicionar;
- regras de negócio implementadas;
- validações e segurança aplicadas;
- testes executados e resultado;
- pendências/riscos;
- itens que exigem revisão humana;
- como desfazer as mudanças.
```

## 7. Critérios gerais de aceite do MVP

O MVP será considerado pronto quando todos os critérios abaixo forem atendidos:

- cardápio público funcional;
- produtos gerenciáveis pelo admin;
- carrinho funcional;
- checkout funcional;
- pedido persistido no banco;
- snapshot de pedido preservado;
- snapshot de endereço preservado quando houver entrega;
- admin autenticado;
- RBAC básico;
- status de pedido alterável por regra válida;
- validação server-side nas mutações críticas;
- variáveis sensíveis fora do código;
- deploy funcional;
- smoke test executado;
- documentação mínima atualizada;
- revisão humana final registrada.

## 8. Fora de escopo do MVP

- Gateway de pagamento completo.
- Pix automatizado com webhook.
- Webhooks de pagamento.
- Impressão térmica.
- Integração com iFood/delivery externo.
- Dashboard avançado.
- Analytics avançado.
- Observabilidade avançada.
- Filas e cache avançado.
- Kubernetes.
- Backend separado.
- App mobile.
- Múltiplas lojas.
- Programa de fidelidade.
- Cozinha dedicada como requisito obrigatório do go-live.

## 9. Riscos e mitigação

| Risco | Severidade | Impacto | Mitigação |
| --- | --- | --- | --- |
| Escopo inflado | Alta | MVP vira “MVP plus” e atrasa. | Separar MVP essencial, recomendado e pós-MVP; cada etapa deve declarar escopo proibido. |
| IA alterando fora do escopo | Alta | Diff grande, regressão e revisão difícil. | Prompt padrão com arquivos permitidos/proibidos; relatório final; revisão humana obrigatória. |
| Autenticação frágil | Alta | Admin vulnerável e dados operacionais expostos. | Sessão segura, hash de senha, RBAC server-side, seed admin trocado em produção. |
| Upload inseguro | Alta | Risco de execução/armazenamento de arquivo malicioso. | Tratar upload como etapa isolada, com validações OWASP e storage controlado. |
| Modelagem excessiva | Média | Tempo gasto com entidades que não geram valor no MVP. | Começar com núcleo de pedidos e catálogo; opcionais/additionals pós-MVP. |
| Pedido inconsistente | Alta | Preço, endereço ou status divergente. | Recalcular total no servidor; snapshots; histórico/Log de status; transação curta. |
| Falta de testes | Média | Falhas em checkout/admin descobertas tarde. | Testes mínimos por etapa: lint, typecheck, build, unit/integration para regras críticas e smoke manual. |
| Deploy mal configurado | Média | Sistema sobe sem envs, auth ou banco. | Checklist de envs, migrations, smoke test e rollback simples. |
| Falta de revisão humana | Alta | A IA pode entregar algo “compilável”, mas incorreto no negócio. | Nenhuma etapa avança sem revisão do diff e aceite manual. |

## 10. Ordem recomendada de execução

1. E00 a E01: preparação operacional e documentação base.
2. E02 a E06: fundação técnica, banco e seed.
3. E07 a E08: autenticação, sessão e RBAC.
4. E09 a E13: layout, cardápio, categorias, produtos e upload se necessário.
5. E14 a E18: carrinho, checkout, cálculo, criação idempotente e confirmação.
6. E19 a E21: operação de pedidos no admin e histórico de status.
7. E22 a E23: configurações e dashboard básico, se não atrasar go-live.
8. E24 a E26: CI, deploy e validação final.
9. E27 em diante: pós-MVP, somente depois do MVP validado.

Regra de avanço: avançar para a etapa seguinte somente quando a etapa atual estiver concluída, testada, revisada e aceita.

## 11. Conclusão

O roadmap v2 está pronto para ser usado como base de execução. Ele preserva as decisões técnicas corretas do planejamento original, mas corrige o principal problema apontado pela análise crítica: escopo amplo demais e etapas grandes demais para um dev solo com IA.

A execução recomendada é sequencial, com prompts pequenos, revisão humana e commits frequentes. O próximo passo ideal é criar os prompts individuais das etapas E00, E01 e E02, executar a Fase 0 e só então iniciar implementação técnica.
