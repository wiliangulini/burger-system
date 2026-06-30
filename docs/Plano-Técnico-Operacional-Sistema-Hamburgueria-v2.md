# Plano Técnico-Operacional: Sistema de Hamburgueria (V2)

## Contexto do projeto  
O projeto é um sistema de ecommerce para uma hamburgueria online, com área pública (cardápio digital) e administrativa. Na área pública, o cliente navega por categorias de lanches e produtos, adiciona itens a um carrinho e finaliza pedidos sem precisar criar conta. Na área administrativa, usuários autenticados (admins) gerenciam categorias, produtos e pedidos (visualizam e atualizam status). O MVP foca em uma única loja (sem multi-tenant), idioma PT‑BR e moeda em reais. A solução deve ser incremental, permitindo operação mínima inicial e futuras expansões. 

## Arquivos de referência obrigatórios  
O planejamento deve incorporar recomendações e correções dos documentos fornecidos:  
- **burgerShopSystem-prompt-plan.md**: prompt original do projeto.  
- **relatorio-burgerShopSystem.docx**: relatório analítico do prompt original.  
- **análise-crítica-do-roadmap-Sistema-Hamburgueria.docx**: críticas ao roadmap original.  

Leia-os completamente para alinhar o novo plano às recomendações e preencher lacunas anteriores.

## Objetivo do planejamento  
Criar um documento de planejamento **técnico e operacional preciso, completo e profissional**, que servirá de base para o desenvolvimento incremental do sistema. O documento deve incluir: escopo de MVP, backlog de tarefas, arquitetura, modelagem de dados, segurança, estratégias de teste e deploy, processos de uso de IA (ChatGPT/Codex/Claude), entre outros. Não é para escrever código agora, mas para orientar toda a implementação futura de forma estruturada.

## Resultado esperado  
O documento final (em Markdown) deve conter todas as seções listadas abaixo (MVP, requisitos, arquitetura, roadmap, etc.) com explicações detalhadas. Deve utilizar cabeçalhos claros e listas para facilitar a leitura. Cada item deve ter instruções precisas e critérios de sucesso. Deve servir como guia completo para um desenvolvedor (assistido por IA) implementar o sistema.

## Stack obrigatória  
- **Front-end:** Next.js (App Router) com React (v17+), TypeScript, e Tailwind CSS.  
- **Back-end:** Prisma ORM com PostgreSQL (gerenciado).  
- **Autenticação:** Auth.js (NextAuth v5 ou similar) com Credentials Provider.  
- **Hospedagem:** Vercel (ou VPS Linux como alternativa); GitHub Actions para CI/CD.  
- **Documentação e processos:** seguir padrões OWASP e práticas DevSecOps.

## Premissas arquiteturais  
- **Monolito modular:** toda a aplicação é um único projeto Next.js, mas organizado por módulos (ex.: `(public)` vs `(admin)`). Evitar microserviços no MVP.  
- **Server-first:** usar React Server Components no App Router para a maioria das páginas (SEO e segurança). Só usar Client Components em partes interativas (ex.: carrinho dinâmico).  
- **Next.js App Router:** usar `/app` com layouts segmentados. Rotas públicas (`/`, `/categoria/[slug]`, `/produto/[id]`, etc.) e separadas das admin (`/admin/*`). Incluir pages `loading.tsx`, `error.tsx` e `not-found.tsx`.  
- **Banco de dados:** PostgreSQL acessado via Prisma; garantir integridade e segurança dos dados com relacionamentos e constraints (FK, UNIQUE, NOT NULL).  
- **Autenticação administrativa:** Auth.js com Credentials Provider. Armazenar usuários admin no banco (`Users`), com senhas hash (argon2 ou bcrypt forte). Cookies de sessão configurados como HttpOnly, Secure e `SameSite=Strict`.  
- **Autorização server-side:** proteger todas as rotas de `/admin` via middleware ou `getServerSession()`. Somente usuários com `role: ADMIN` podem acessar.  
- **Validação no servidor:** nenhuma confiança nos dados do cliente. Usar validação rigorosa (ex.: Zod schemas) em todas as APIs e Server Actions, para prevenir SQLi, XSS e outras injeções.  
- **Carrinho no cliente:** manter itens no browser (por exemplo, em `localStorage` ou estado React). No checkout, o front envia itens selecionados; o servidor recalcua preços, estoques e totais (fonte da verdade). Salvar o pedido no banco de forma atômica e idempotente (usar `idempotencyKey` único) para evitar duplicação em reenvios.  
- **Snapshot de pedido:** ao criar pedido, salvar no banco uma cópia imutável de todos os dados financeiros e do cliente (nome do cliente, endereço, itens, preços unitários, adicionais, subtotais, taxa e total, forma de pagamento, código público curto). Não depender do preço do produto futuro: mesmo se o produto mudar depois, o pedido mantém histórico exato. Manter status atual e registrar histórico de status em tabela separada.  
- **Logs mínimos desde o início:** registrar erros do sistema e ações sensíveis de admin (logins, mudanças de status de pedido, exclusões). Não logar dados sensíveis (senhas, dados de cartão, etc.).  
- **Deploy inicial simples:** empacotar projeto Next.js e fazer deploy no Vercel (usando GitHub). Configurar CI para rodar testes e lint no push. Garantir que haja procedimentos documentados para executar migrations (`prisma migrate`) e para deploy alternativo em VPS, se necessário.

## Escopo funcional inicial (MVP obrigatório)  
Apenas as funcionalidades essenciais para a loja operar:  
- **Catálogo público navegável:** listagem de categorias e produtos acessível ao público.  
- **Categorias:** modelo de dados (nome único, slug, ativo) e CRUD no admin.  
- **Produtos:** modelo com `nome`, `descrição`, `preço`, `categoria`, `imagem`, `estoque` (opcional), `ativo`. CRUD no admin, com upload de imagem segura.  
- **Carrinho de compras:** client-side, permite adicionar/remover itens sem login.  
- **Checkout e criação de pedido:** formulário para nome, endereço e forma de pagamento livre. Backend recalcula total (preços e taxa de entrega fixa), cria pedido com código público curto. Usa chave de idempotência.  
- **Painel administrativo protegido:** rotas sob `/admin`, acessíveis só a admins autenticados.  
- **Login Admin:** formulário de login para administradores (Auth.js).  
- **CRUD de categorias e produtos:** páginas admin para criar, editar e excluir.  
- **Upload seguro de imagens:** apenas PNG/JPEG, tamanho limitado (ex.: 2 MB), renomeação (UUID) e armazenamento em pasta protegida (`/public/uploads` ou serviço externo).  
- **Listagem/detalhe de pedidos:** admin pode ver todos os pedidos, filtrar por status, e visualizar detalhes (itens com preços originais, cliente, total, status, etc.).  
- **Alteração de status de pedido:** seguindo fluxo controlado (ex.: “Aguardando”→“Em Preparo”→“Pronto”→“Entregue”). Permitir “Cancelado” em certos casos, mas nunca retornar de cancelado. Cada mudança válida registra histórico.  
- **Configurações da loja:** admin pode editar nome da loja, endereço, telefone, horário de funcionamento, taxa de entrega e logo/imagem.  
- **Dashboard básico:** métricas simples no admin (ex.: total de pedidos do dia, receita do dia, pedidos pendentes, últimos pedidos).  
- **Deploy funcional:** app deployado em produção (Vercel), acessível publicamente.  
- **Testes mínimos:** implementar testes unitários e de integração cobrindo fluxo principal (criação de pedido, autenticação do admin, etc.). Critérios de aceite claros para cada funcionalidade.  

*Obs.:* Qualquer recurso **não listado acima** deve ficar fora do MVP e constar como backlog futuro (por exemplo: gateway de pagamento, integração iFood, emissão fiscal, app móvel, multi-loja, microserviços, analytics avançado, etc.).

## Princípios de arquitetura  
- **Modularidade:** separar o código por domínios/coesão. Por exemplo, diretórios para admin vs público, serviços de domínio e acesso a dados isolados. Evitar monolitos desorganizados.  
- **Componentização Server/Client:** usar Server Components para páginas de exibição de dados (lista de produtos, detalhes, dashboard) e Client Components para interatividade (carrinho, formulários dinâmicos, upload de imagem). Evitar hooks em componentes server.  
- **Separation of Concerns:** diferenciar claramente lógica de negócio (ex.: cálculo de pedido), acesso a dados (Prisma), APIs (Route Handlers) e UI (componentes React). Ex.: `/domain` ou `/services` para lógica, `/lib/db.ts` para PrismaClient, `/app/api` para rotas, `/components` para UI.  
- **Padrões do Next.js:** seguir convenções (`layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`). Usar `Next/Image` e `Next/Link`. Configurar o middleware Auth.js para `/admin`.  
- **Cache e invalidação:** usar cache no front (ISR) em páginas públicas estáticas (lista de produtos, categorias), com revalidação após mutações (ex.: limpar cache em CRUD de produto). RSC ajudam com caching.  
- **Escalabilidade futura:** manter código desacoplado (ex.: lógica de pagamento separada de modelo de pedido) para permitir mudanças futuras. Não otimizar prematuramente com soluções complexas no MVP, mas facilitar extensões (ex.: adicionar fila, microsserviço de email, etc.).

## Princípios de produto  
- **MVP enxuto:** focar apenas no essencial listado no escopo. Evitar feature creep. Tudo não-MVP vai para backlog.  
- **Usuário no centro:** interface simples, intuitiva e responsiva. Fluxo de compra claro e sem etapas desnecessárias. Texto em PT-BR claro e direto.  
- **Acessibilidade básica:** usar elementos semânticos (botões, labels, etc.) e atributos ARIA mínimos para garantir navegação por teclado e suporte a leitores de tela.  
- **Consistência dos dados:** o front só exibe preço como informação ilustrativa; o cálculo definitivo deve ser sempre no servidor. O cliente SEMPRE verá o preço correto; o backend ignora valores enviados pelo front.  
- **Feedback rápido:** todas as ações do usuário devem ter retorno imediato (ex.: indicadores de carregamento, toasts de sucesso/erro). Não deixar o usuário confuso em estados de espera.  
- **Internacionalização tardia:** por enquanto, apenas português e real. Não projetar telas multilíngues nem multi-moeda.  
- **Mobile-first:** priorizar experiência em smartphones (wireframes/componentes responsivos). Usar layout flexível, menu hambúrguer no mobile, botões grandes, etc.

## Princípios de segurança  
- **Validação e sanitização rigorosas:** todo dado enviado pelo cliente (formulários, JSON) deve ser validado e sanitizado no servidor (ex.: com Zod ou validação manual). Prevenir XSS, SQLi, injeção de comandos. Usar parametrização do Prisma evita SQLi, mas ainda valide tamanhos e formatos. Seguir OWASP Top 10 e boas práticas.  
- **Autenticação segura:** senhas de admin devem ser armazenadas com hash forte (preferencialmente Argon2id, ou bcrypt ≥12). Políticas de senha (mínimo 12 caracteres, mix de letras, números). Cookies de sessão: HttpOnly, Secure, `SameSite=Strict`. Sessão curta (p.ex. 30–60 min) com renovação no uso. Implementar rota de logout que invalida a sessão.  
- **RBAC básico:** embora apenas admins existam, preparar papel “ADMIN” (e futuro “ATENDENTE”). Verificar `session.user.role` em cada API/Server Action protegida. Páginas admin só permitem `role === 'ADMIN'`.  
- **Proteção CSRF:** NextAuth cuida disso no login. Em formulários de mutação, usar tokens CSRF ou dependência de servidor (Server Actions já evitam CSRF). Se for usar rotas API, habilitar tokens anti-CSRF do Auth.js.  
- **Rate limiting:** limitar tentativas de login (ex.: máximo 5 tentativas em 15 min por IP) e número de pedidos por IP (para evitar flood ou ataques). Exigir recaptcha opcional para checkpoints críticos.  
- **Upload seguro:** aceitar apenas arquivos de imagem (PNG/JPEG). Verificar MIME e extensão no servidor. Limitar tamanho (ex.: 2 MB). Renomear arquivos com UUID. Salvar em pasta protegida (`/public/uploads` com permissão restrita) ou serviço externo (S3, Cloudinary) com políticas restritas.  
- **Princípios OWASP:** seguir recomendações do OWASP Top 10 (A05-Injeção, A07-CSV, etc.). Não exibir stack traces em produção; erros genéricos para o usuário. Usar HTTPS padrão (garantido pelo Vercel).  
- **Segredos seguros:** usar variáveis de ambiente para chaves e strings secretas. Nunca versionar credenciais. Em produção, usar sistemas de gerenciamento de secrets (Vercel, Vault, etc.). No dev, usar `.env.local`.  
- **Logs sem dados sensíveis:** logar eventos críticos (login, pedido criado, erro fatal) sem incluir PII. Erros de servidor podem ir para console ou Sentry, mas sem dados do usuário (ex.: mascarar emails).  
- **Auditoria mínima:** além dos logs, manter tabelas de histórico para mudanças importantes (ex.: quem alterou status de pedido e quando).  

## Princípios de execução com IA  
- **Tarefas pequenas:** cada tarefa dada ao agente IA deve ser granular (ex.: criar modelo Prisma de Categoria). Não pedir múltiplas features em uma vez.  
- **Sem exageros de escopo:** agentes não devem adicionar funcionalidades além do MVP acordado.  
- **Stack fixo:** não trocar Next.js App Router, TypeScript, etc. sem autorização.  
- **Manter validações:** o agente nunca deve remover checagens de segurança ou ignorar testes.  
- **Commit controlado:** agente só deve commitar código revisado, em branches de tarefa. Nada de merges automáticos sem revisão.  
- **Segurança nos detalhes:** sem mudanças não justificadas em autenticação, lógica de pagamento ou modelagem de pedido. Qualquer alteração deve ter motivo documentado.  
- **Relatório final obrigatório:** após cada tarefa, o agente deve produzir um relatório (mesmo breve) listando alterações, testes executados e pendências para revisão humana.

## Perguntas permitidas antes do planejamento  
Algumas dúvidas podem ser esclarecidas antes de iniciar, por exemplo:  
- Nome e branding da hamburgueria?  
- Categorias iniciais (sabores de lanche, bebidas, etc.)?  
- Política de entrega (somente entrega, retirada no local)?  
- Formato de adicionais de lanche (ex.: tipo de queijo, molho)?  
- Canal de pagamento inicial (somente dinheiro, Pix manual)?  
- Horário de funcionamento?  
- Quais campos editar nas configurações (horário, logo, etc.)?  
- Cronograma previsto?

## Regras para assumir premissas quando faltarem dados  
Em falta de informação oficial, assumir por padrão:  
- Idioma PT-BR e moeda R$.  
- Loja única (sem subdomínios ou multi-tenant).  
- Cliente final **não faz login**; apenas admin entra com credenciais.  
- Não há conceito de “cliente cadastrado” (endereço sempre informado no pedido).  
- Sem features não solicitadas (p.ex. SEO avançado, multilíngue).  
- Navegadores modernos (Chrome/Safari/Firefox atuais).  
- Sistema dimensionado para carga moderada; escalar futuramente se necessário, sem otimizações prematuras.

## Definição do MVP obrigatório  
O MVP deve conter **exatamente**:  
- Catálogo público (categorias e produtos).  
- Carrinho de compras no cliente.  
- Checkout e persistência de pedidos (com recalculo server).  
- Painel administrativo (rotas `/admin/*`).  
- Login Admin (Auth.js).  
- CRUD de categorias e produtos (com imagens).  
- Listagem e detalhe de pedidos (com itens, dados do cliente).  
- Alteração controlada de status de pedido (fluxo predefinido).  
- Configurações básicas da loja (nome, endereço, contato).  
- Dashboard admin resumido.  
- Deploy funcional e testes do fluxo de compra.

Tudo acima deve ser implementado e testado; **não incluir** nada de pós-MVP salvo justificativa excepcional.

## MVP desejável (opcionais)  
Itens recomendados mas não obrigatórios:  
- **Upload de imagens** no admin (com validação de tipo e tamanho).  
- **Pesquisa ou filtros** simples no catálogo.  
- **Exibir estoque** disponível no catálogo (opcional).  
- **Página “Sobre”** ou “Contato” com informações da loja.  
- **Notificações básicas:** ex.: enviar email ou alerta ao admin sobre novo pedido (pode ser manual/webhook simples).  
- **Melhorias de UX:** preload de imagens, animações leves de carregamento.  
- **Mini-histórico no admin:** registrar logins e ações de admin além do mínimo.  
- Qualquer outro recurso útil que **não acople** a loja a dependências externas (ex.: não adicionar gateway de pagamento completo no MVP).

## Pós-MVP  
Funcionalidades planejadas apenas **depois** do MVP:  
- Integração com gateways de pagamento (Stripe, PayPal) ou automação de pagamento Pix.  
- Webhooks/bancos (retorno automático de pagamento).  
- Integração com marketplaces ou iFood.  
- Emissão de nota fiscal eletrônica (API governo).  
- Impressão automática em impressora térmica.  
- App móvel nativo (React Native/Flutter).  
- Multiloja/Multitenant.  
- Containers (Docker/Kubernetes) ou microsserviços.  
- Uso de Redis, filas (RabbitMQ, Bull), workers assíncronos.  
- Analytics avançado (Google Analytics custom, BI, etc.).  
- Observabilidade extensiva (monitoramento, Sentry, logs estruturados).  
- Automação de cozinha (robôs, pedidos por voz).

## Fora do escopo inicial  
Qualquer coisa **não listada** no MVP obrigatório/desejável ou pós-MVP acima é excluída. Em especial: busca sofisticada, internacionalização multilíngue, checkout com validação de cartão, chat ao vivo, marketing avançado, SEO além do básico, login social, etc.

## Personas e permissões  
- **Cliente (usuário público):** navega pelo cardápio, adiciona itens ao carrinho e finaliza pedido **sem login**. Não acessa área administrativa.  
- **Administrador (backoffice):** usuário autenticado; pode gerenciar categorias, produtos, pedidos e configurações. Tem acesso total (role `ADMIN`). *(Futuro: roles como Atendente com permissões limitadas, mas no MVP só existe ADMIN.)*

## Requisitos funcionais  

- **Público / Cliente:**  
  - Ver lista de **categorias** (p.ex. “Lanches”, “Bebidas”) e selecionar uma.  
  - Ver lista de **produtos** de uma categoria (foto, nome, preço, disponibilidade).  
  - Ver detalhes de cada produto (nome, imagem maior, preço, descrição, possíveis adicionais opcionais).  
  - Adicionar produtos ao **carrinho**, escolhendo quantidade e opcionais (se houver).  
  - Visualizar/editar **carrinho**: alterar quantidades ou remover itens antes de finalizar.  
  - Formulário de **checkout**: informar nome, endereço completo e forma de pagamento (texto livre, ex.: “Dinheiro”).  
  - Conferir **resumo do pedido**: itens, totais, taxa de entrega e valor final (calculado no servidor).  
  - Enviar pedido: servidor cria o pedido no banco, retorna confirmação com código público (ex.: 6 dígitos alfanuméricos). Idempotency evita duplicatas em reenviar.  

- **Admin / Backoffice:**  
  - **Login Admin:** acessar `/admin/login`, autenticar com email/senha.  
  - **Categorias:** criar, editar e excluir (cada categoria deve ter nome único e slug).  
  - **Produtos:** criar, editar, excluir produtos com campos: nome, descrição, preço, categoria, imagem, estoque (opcional), ativo/inativo. Upload de imagem seguro. Se estoque igual a zero, marcar como esgotado.  
  - **Controle de estoque (opcional):** decrementar estoque ao criar pedido; impedir venda se estoque insuficiente (alertar admin).  
  - **Pedidos:** listar (paginada) todos os pedidos realizados, com filtros por status.  
  - **Detalhe do pedido:** ao selecionar um pedido, exibir itens comprados (quantidade, nome, preço unitário antigo), dados do cliente (endereço, forma de pagamento, data), total, código e status atual.  
  - **Atualização de status:** mudar status seguindo regras (p.ex. “Aguardando”→“Em Preparo”→“Pronto”→“Entregue”). Permitir “Cancelado” em estágios apropriados. Bloquear transições inválidas (nenhum salto ou reabertura sem ação explícita). Cada transição válida é registrada no histórico com timestamp e admin responsável.  
  - **Configurações da loja:** editar informações da loja (nome, endereço, telefone, horário de funcionamento, taxa de entrega fixa, logo). Essas informações devem aparecer no site (ex.: rodapé, página de “Sobre”).  
  - **Dashboard:** exibir métricas do dia (número de pedidos, valor total), número de pedidos pendentes/em preparo, e lista dos últimos pedidos criados.  

- **Regras gerais:**  
  - **Preço fonte da verdade:** somente o servidor sabe preços oficiais. Não confiar em valores enviados pelo cliente.  
  - **Disponibilidade:** não permitir adicionar ao carrinho produtos “inativos” ou sem estoque (se controle de estoque habilitado).  
  - **Regras de status:** pedidos concluídos ou cancelados são estados finais; não podem voltar a estágios anteriores. Um pedido cancelado só pode ser reativado por ação explícita do admin (fora do fluxo normal).  
  - **Idempotência do checkout:** usar um identificador único (por cliente/sessão) para evitar criar múltiplos pedidos por cliques repetidos. Se pedido duplicado for detectado, retornar o mesmo registro.  

## Requisitos não funcionais  
- **Desempenho:** páginas públicas devem carregar rapidamente. Usar otimizações do Next.js (chunking, imagens otimizadas). Usar ISR/Cache onde adequado (ex.: lista de produtos, que muda pouco).  
- **Escalabilidade:** embora monolítico, infraestrutura deve permitir replicação (p.ex. Vercel escala automaticamente). Banco dimensionado para tráfego moderado. Código desacoplado para future scaling (ex.: migrar a partes para microsserviços sem reescrever tudo).  
- **Confiabilidade:** gerenciar migrations do banco com Prisma Migrate. Fazer backups regulares do PostgreSQL. Implementar testes automáticos e rodá-los no CI a cada push.  
- **Manutenibilidade:** código limpo e padronizado (ESLint, Prettier). TypeScript em todo o código para segurança de tipos. Documentar APIs e models. Testes automatizados facilitam refatorações.  
- **Segurança:** seguir os princípios citados acima (seção de segurança). Realizar auditorias periódicas (mesmo manual) contra OWASP Top 10.  
- **Compatibilidade:** suportar os navegadores modernos (Chrome, Safari, Firefox atuais). Layout responsivo para desktop e mobile.  
- **Acessibilidade:** atender critérios básicos de WCAG AA (contraste suficiente, `alt` em imagens, campos de formulário labelados, navegação por teclado).  
- **Legal/Regulatório:** seguir LGPD minimamente (não armazenar dados pessoais sem motivo; usar HTTPS; informar políticas de privacidade).  

## Regras de negócio  
- **Cálculo de preços no servidor:** na criação do pedido, ignorar preços/valores recebidos do front-end. Recalcular cada item a partir do preço atual do produto no banco (ou preço snapshot do produto no momento da venda) e somar taxas.  
- **Estoque:** se implementado, debitar do estoque assim que o pedido for criado. Se estoque insuficiente, rejeitar a criação do pedido (mensagem de erro ao cliente e notificação ao admin).  
- **Fluxo de status:** exemplos válidos: `CRIADO`→`EM_PREPARO`→`PRONTO`→`ENTREGUE`. A qualquer momento antes de entregue, permitir `CANCELADO` (ex: pedido pago mas não atendido). Não pular etapas: por ex., não ir de `CRIADO` direto para `PRONTO` sem `EM_PREPARO`. Nunca reabrir um pedido após `CANCELADO` ou `ENTREGUE`, a menos que seja via ação explícita especial.  
- **Código público:** gerar um identificador curto (ex.: 6 caracteres alfanuméricos) para o cliente usar como referência. Internamente, usar chave primária seqüencial ou UUID para o pedido.  
- **Dados imutáveis:** todos os campos do pedido (itens, preços, endereço, pagamento) são copiados no momento da criação e não podem ser alterados depois. Se o admin alterar um produto depois, não afeta pedidos já feitos.  
- **Auditoria:** cada mudança sensível (ex.: alterar status, excluir categoria) deve gerar um registro de auditoria. Incluir data/hora e usuário admin.  
- **Idempotência:** ao criar pedido, aceitar repetições (mesmo user reenviando) sem criar duplicatas; reutilizar mesmo registro existente caso a `idempotencyKey` seja reconhecida.

## Fluxos principais  

1. **Navegação do cardápio:** o cliente acessa a home (`/`) e vê as categorias disponíveis. Ao clicar numa categoria, é levada à página com a lista de produtos daquela categoria, com fotos, preços e descrições curtas. Em cada produto, há opção de ver detalhes (nome, imagem grande, preço, descrição completa, adicionais) e botão “Adicionar ao carrinho”. Ele escolhe quantidade/opcionais e adiciona. Vários produtos podem ficar no carrinho.  

2. **Criação de pedido (checkout):** no carrinho, o cliente verifica itens, quantidades e o subtotal. Clica em “Finalizar pedido” e preenche o formulário de entrega (nome, endereço completo, forma de pagamento). Ao confirmar, o front envia (cliente) todos os itens e os dados para o servidor. O servidor: valida todos os campos; verifica cada item no banco (preço atual, estoque); calcula subtotal de cada item (`quantidade × preço unitário`) e soma taxas (por exemplo, taxa de entrega fixa configurada); calcula o valor total. Se tudo OK, cria o registro de pedido no banco com **snapshot** de todos os dados e gera `codigoPublico` único. Retorna confirmação ao cliente com esse código. Se o cliente enviar a mesma requisição duas vezes (por travamento ou clique duplo), a `idempotencyKey` impede duplicação: o servidor retorna o mesmo pedido. Em caso de erro (ex.: estoque insuficiente), o servidor responde erro e não cria nada.  

3. **Painel Admin – Gestão de Categorias/Produtos:** o administrador faz login (`/admin/login`). No dashboard, navega para “Categorias” e vê lista das existentes. Ele pode criar uma nova categoria (informando nome e slug único) ou editar/excluir as já existentes. Em “Produtos”, ele vê lista de produtos e pode criar novo produto (preenchendo nome, descrição, preço, categoria, estoque, ativo, e fazendo upload da imagem). Também edita ou exclui produtos existentes. No upload de imagem, o sistema valida o arquivo (tipo e tamanho), renomeia e salva, e armazena o caminho no banco. A edição de produto permite trocar todos os campos, incluindo imagem (remover imagem antiga). As alterações no admin invalidam caches públicos (para refletir no site).  

4. **Painel Admin – Processamento de Pedidos:** no menu admin “Pedidos”, ele vê todos os pedidos recebidos. Cada pedido mostra resumo (cliente, data, status). Ao clicar em um pedido, abre o detalhe completo: itens comprados (com preços originais, quantidades), endereço do cliente, total, forma de pagamento e status atual. Há opção de mudar o status (ex.: de “Aguardando” para “Em Preparo”). O admin seleciona o próximo status válido e salva. O sistema registra a mudança em histórico (salva em tabela). Se chegar a “Entregue” ou “Cancelado”, o pedido é considerado finalizado. Uma atualização de status bem-sucedida pode disparar um aviso (ex.: notificação de que o pedido progrediu).  

5. **Configurações e Dashboard:** no menu “Configurações”, o admin edita informações da loja (nome, endereço, telefone, horários, taxa de entrega). Essas informações são salvas no banco e mostradas no site (por exemplo, no rodapé ou em página “Sobre”). No “Dashboard” (admin), são exibidas métricas resumidas: total de pedidos do dia (quantidade e valor), número de pedidos em cada status (pendentes, em preparo, etc.), e últimos pedidos criados com links para detalhes. Se houver pedidos sem ação por muito tempo, o dashboard pode realçar isso.

## Arquitetura geral  
A arquitetura será um **monolito Next.js** usando App Router. Principais componentes:  
- **Front-end (Next.js App Router):** arquivos em `/app`: páginas e layouts. Layout geral em `app/layout.tsx` (com cabeçalho/rodapé). Área pública tem rotas como `/page.tsx` (home categorias), `/categoria/[slug]/page.tsx`, `/produto/[id]/page.tsx`, `/carrinho/page.tsx`, `/checkout/page.tsx`. Área admin em `app/(admin)/layout.tsx`, com subpastas `/admin/dashboard`, `/admin/categorias`, `/admin/produtos`, `/admin/pedidos`, `/admin/configuracoes`, além de `/admin/login`. Cada rota tem seus `page.tsx`, e também `loading.tsx` e `error.tsx` ou `not-found.tsx` personalizados.  
- **Autenticação:** NextAuth configurado em `/app/api/auth/[...nextauth]/route.ts`. Usa Credentials Provider. As sessões são cookies HTTP-Only. Middleware (`middleware.ts`) protege `/admin/*` verificando `getServerSession()`.  
- **APIs / Server Actions:** lógicas de negócio (ex.: criar pedido) podem ser feitas em Server Actions (Next.js 14+) ou em rotas de API (`/app/api/...`). Rotas RESTful planejadas, ex.: `POST /api/pedidos` para criar pedido (usado pelo server action do checkout), `GET /api/pedidos` para listar (opcional). Criar rota `/api/health` que retorna 200 OK para health-check.  
- **Prisma + PostgreSQL:** o arquivo `prisma/schema.prisma` define modelos (Categoria, Produto, Pedido, ItemPedido, Usuario, Configuracao, HistoricoStatus). O `PrismaClient` é inicializado em `lib/db.ts`. Todos os dados transitam pelo Prisma para segurança.  
- **Componentes React:** componentes de UI em `/components` (ex.: `Header.tsx`, `Footer.tsx`, `ProductCard.tsx`, `CategoryCard.tsx`, `Cart.tsx`, formulários de categoria/produto). Usar `use client` em componentes interativos (carrinho, uploads).  
- **Armazenamento de arquivos:** imagens de produto em `/public/uploads`. Em produção, pode-se configurar serviço externo (e.g. S3, Cloudinary) e ajustar `next.config.js`.  
- **CI/CD:** GitHub Actions executa lint, testes e `prisma migrate deploy` no push (para aplicar migrations). A branch `main` dispara deploy no Vercel, `vercel.json` define variáveis de ambiente.  
- **Infraestrutura:** a cada push/PR, Vercel cria ambiente de preview. Deploy em produção com bancos (e.g. Neon/PostgreSQL). Roteiro de rollback: reverter commit ou rollback de migration se necessário.

## Estrutura de pastas sugerida  
```
/app
  /admin
    layout.tsx (layout comum do admin)
    login/page.tsx
    dashboard/page.tsx
    /categorias
      page.tsx         (lista de categorias)
      /[id]
        page.tsx       (editar categoria)
      /novo/page.tsx   (criar categoria)
    /produtos
      page.tsx         (lista de produtos)
      /novo/page.tsx   (criar produto)
      /[id]/page.tsx   (editar produto)
    /pedidos
      page.tsx         (lista de pedidos)
      /[id]/page.tsx   (detalhe e status)
    /configuracoes/page.tsx (editar configurações da loja)
  /categoria/[slug]/page.tsx
  /produto/[id]/page.tsx
  /carrinho/page.tsx
  /checkout/page.tsx
  /pedido/[codigo]/page.tsx (opcional: acompanhar status público)
  /page.tsx (home: lista de categorias)
  layout.tsx (layout público geral)
  loading.tsx, not-found.tsx, error.tsx (genéricos)
  
/app/api
  /auth/[...nextauth]/route.ts (Auth.js handlers)
  /pedidos/route.ts       (API CRUD de pedidos, se precisar)
  /categorias/route.ts    (API de categorias, se usar)
  /produtos/route.ts      (API de produtos, se usar)
  /health/route.ts        (retorna 200 OK)
  
/components    (componentes UI compartilhados)
hooks          (ex.: `useCart.ts` para gerenciar carrinho client)
/lib
  db.ts         (inicializa PrismaClient)
  auth.ts       (config do NextAuth)
/models or /types (tipos TypeScript, enums compartilhados)
/prisma
  schema.prisma
/public
  /images (logo, etc.)
  /uploads (imagens de produtos)
/tests (testes unitários e integração)
/scripts (scripts auxiliares, se necessário)
```

## Rotas públicas e administrativas  
- **Público:** `/` (home com categorias), `/categoria/[slug]` (produtos de uma categoria), `/produto/[id]` (detalhes do produto), `/carrinho`, `/checkout`. Opcional: `/pedido/[codigo]` para o cliente acompanhar status pelo código.  
- **Admin:** prefixo `/admin`. Ex.: `/admin/login`, `/admin/dashboard`, `/admin/categorias`, `/admin/produtos`, `/admin/pedidos`, `/admin/configuracoes`.  
- As rotas de API sob `/app/api` (route handlers) ficarão fora do esquema de páginas mas devem ser previstas (e.g. `POST /api/pedidos`).  
- Criar `loading.tsx` para estados de espera e `error.tsx`/`not-found.tsx` customizados onde aplicável (por ex. categoria ou produto inexistente).

## Uso de Server Components, Client Components, Server Actions e Route Handlers  
- **Server Components (RSC):** usar para páginas estáticas que apenas exibem dados (ex.: lista de produtos, dashboard) – elas rodam no servidor, favorecendo SEO.  
- **Client Components:** usar apenas quando precisar de estado ou hooks (ex.: carrinho interativo, componentes de formulário que usam `useState`). Adicionar `"use client"` nestes arquivos.  
- **Server Actions:** aproveitar para mutações leves atreladas à UI (Next.js 14+). Por exemplo, formulário de `createCategory` em admin pode ser Server Action que insere no Prisma sem expor endpoint REST separado. Para checkout, pode haver um `createOrder` como Action.  
- **Route Handlers:** usar para APIs REST ou integrações futuras. Exemplos: `/api/pedidos/route.ts` que retorna JSON de pedidos (para possíveis integrações externas), ou `/api/webhooks/...`. Para lógicas internas, prefira Server Actions.  
- **Arquivos especiais:** em cada segmento de rota, criar `loading.tsx`, `error.tsx` e `not-found.tsx` apropriados. Ex.: se `/categoria/[slug]` não encontrar slug, retorne `not-found.tsx`.  
- **Cache e revalidação:** páginas de leitura (produtos, categorias) podem ser estáticas ou ISR (ex.: `export const revalidate = 60`). Após mutações (ex.: criar/editar produto), invalidar cache do front (Next.js revalida no próximo acesso). Documentar política de cache em README.  
- **Estrutura de camadas:** exemplos de diretórios:  
  - `/lib/schemas` para esquemas Zod de validação.  
  - `/app/actions` para Server Actions compartilhadas.  
  - `/services` ou `/domain` para funções de lógica (ex.: função `createOrder()` em TS separado).  
  - `/app/api` para Route Handlers.  
  - `/components/ui` para componentes genéricos (botões, inputs).

## Modelagem de dados (Prisma)  
Modelo relacional focado em integridade histórica:  

- **Categoria:** `id (Int, PK, autoincrement)`, `nome (String, único, não-nulo)`, `slug (String, único, não-nulo)`, `ativa (Boolean)`, `createdAt (DateTime)`, `updatedAt (DateTime)`.   
- **Produto:** `id (Int)`, `nome (String, não-nulo)`, `descricao (String)`, `preco (Decimal/Float, não-nulo)`, `estoque (Int, opcional)`, `imagemPath (String)`, `ativo (Boolean)`, `categoriaId (FK Categoria)`, `createdAt`, `updatedAt`. Defina `preco` como decimal para precisão financeira.  
- **Usuário (admin):** `id (Int)`, `nome (String)`, `email (String, único, não-nulo)`, `senhaHash (String, não-nulo)`, `role (enum: ADMIN ou ATENDENTE)`, `createdAt`. Este modelo será adaptado pelo NextAuth (adapter Prisma).  
- **Pedido:** `id (Int)`, `codigoPublico (String, único)`, `clienteNome (String)`, `endereco (String)`, `formaPagamento (String)`, `taxaEntrega (Decimal)`, `total (Decimal)`, `statusAtual (Enum StatusPedido)`, `createdAt`. Além disso, campos como `subtotal` e etc. podem ser calculados ou gravados.  
- **ItemPedido:** `id (Int)`, `pedidoId (FK Pedido)`, `produtoId (FK Produto)`, `nomeProdSnap (String)`, `precoUnitSnap (Decimal)`, `quantidade (Int)`, `subtotal (Decimal)`, `adicionais (String ou JSON, opcional)`. Este armazena o *snapshot* de cada produto no momento do pedido (nome e preço).  
- **StatusPedido (enum):** possíveis valores como `AGUARDANDO`, `EM_PREPARO`, `PRONTO`, `ENTREGUE`, `CANCELADO`.  
- **HistoricoStatus:** `id (Int)`, `pedidoId (FK)`, `statusAntigo (Enum)`, `statusNovo (Enum)`, `alteradoEm (DateTime)`, `adminId (FK Usuario)`. Guarda o histórico de transições de status.  
- **ConfigLoja (opcional):** pode ser uma tabela key/value (`chave`, `valor`) ou uma única linha com colunas fixas (nomeLoja, endereco, telefone, etc.). Facilita editar configurações no admin.  
- **Sessões Auth.js:** se usar database sessions, haverá tabelas de sessões (definidas por NextAuth Prisma Adapter).  
- **Migrações:** usar `prisma migrate` para gerar migrations de cada mudança. Definir restrições (FK, UNIQUE, NOT NULL) no schema. Adicionar campo `idempotencyKey` no Pedido ou tabela separada para rastrear pedidos processados.  

## Enums e máquina de estados  
- **StatusPedido (enum):** valores ex.: `AGUARDANDO`, `EM_PREPARO`, `PRONTO`, `ENTREGUE`, `CANCELADO`.  
  - Transições válidas sugeridas:  
    - `AGUARDANDO` → `EM_PREPARO` → `PRONTO` → `ENTREGUE`.  
    - Em qualquer estágio antes de `ENTREGUE`, permitir transição para `CANCELADO`.  
    - Não permitir saltos (ex.: não ir direto de `AGUARDANDO` para `PRONTO`).  
    - Não reabrir pedidos de `ENTREGUE` ou `CANCELADO`.  
- **RoleUsuario (enum):** `ADMIN`, (futuro `ATENDENTE`). Usado no usuário admin para controle RBAC.  
- **FormaPagamento:** pode ser campo livre (string) no pedido, já que o sistema não integra gateway. Se quiser enum, poderia ter `DINHEIRO`, `PIX`, etc., mas por enquanto texto aberto.  
- Documentar as regras de negócio associadas (por ex. somente admins realizam mudanças de status, etc.).  

## Estratégia de autenticação e autorização  
- **NextAuth (Auth.js)** com **Credentials Provider**: configurar em `app/api/auth/[...nextauth]/route.ts`. Verificar o usuário no banco (`usuarios`) durante `authorize()`. Utilizar bcrypt ou Argon2 para verificar senha.  
- **Sessões:** usar **cookie sessions**. Idealmente usar sessions no banco (persistência) para permitir logout imediato. No NextAuth v5 (Auth.js), pode-se usar strategy: “database” (salvando sessões no Postgres). Caso seja difícil, usar JWT: certifique-se de rotação de token e curta duração (ex.: 5–10 min, com refresh seguro).  
- **Configurações de cookie:** HttpOnly, Secure, SameSite=Strict. Exemplo de configuração NextAuth:  
  ```js
  session: { strategy: "database" }, 
  cookies: { 
    sessionToken: { name: `__Host-next-auth.session-token`, options: { httpOnly: true, sameSite: 'strict', secure: true } }
  }
  ```  
- **Tabela de usuários:** armazena email e `senhaHash`. Usar Argon2id para hashing (recomendado pelo OWASP). Enforce (min 12 caracteres, mistura de dígitos/alfanuméricos) no front e no back.  
- **RBAC:** verificar `session.user.role` em todas as chamadas API/ServerActions. Middleware no NextAuth pode redirecionar usuários não-admin de /admin para /admin/login.  
- **Logout e expiração:** implementar botão de logout que usa `signOut()` do NextAuth. Configurar tempo de vida da sessão (ex.: maxAge de 30min) e renovação automática a cada request.  
- **Auditoria de login:** opcional: logar tentativas de login (sucesso/erro). Não armazenar senhas nos logs.  
- **Caso JWT:** se JWT (sem banco), documentar revogação: guardar um campo `tokenVersion` no usuário e incrementar no logout para invalidar tokens antigos.  

## Estratégia de segurança  
- **Validação completa server-side:** nenhuma validação só no cliente. Em rotas de API/Actions, usar esquemas (ex.: Zod) para todo input. Verificar tipos, tamanhos e formatos. Sanitizar strings (evitar `<script>`).  
- **Proteção CSRF:** NextAuth já lida com CSRF no formulário de login. Em formulários que usam Server Actions, não há CSRF. Em API routes, aplicar middleware CSRF.  
- **Rate limiting:** implementar middleware (no API ou Next.js) para limitar requisições críticas: e.g. max 5 logins por 15min por IP, max X pedidos/hora por IP. Libs como `express-rate-limit` (ou estratégias similares) podem ser usadas.  
- **Política de senha:** no front-end, exigir e mostrar critérios de senha (min 12 chars). No back-end, validar regra de regex.  
- **Upload de arquivos:** no endpoint que recebe upload de imagem, validar o `content-type` e extensão. Rejeitar arquivos que não sejam imagens. Usar `formidable` ou `multer` no back-end para manipular upload e validar tamanho.  
- **Variáveis de ambiente:** listar obrigatórias (`DATABASE_URL`, `NEXTAUTH_SECRET`, `SMTP_CREDENTIALS` se e-mail, etc.). No CI/produção, configurar pelo UI do serviço (Vercel/Heroku) sem expor no código.  
- **Logging seguro:** erros técnicos vão para console/monitoramento (ex.: Sentry). Mensagens de erro para o usuário devem ser genéricas (“Erro no servidor, tente depois”). Nunca vaze detalhes técnicos nem dados pessoais.  
- **Checklist OWASP:** verificar a aplicação contra injeção de SQL/JS (Prisma ajuda contra SQLi), XSS (sanitizar campos de texto em formulários), Injeção de comandos (não usar eval nem node-apis inseguros). Manter dependências atualizadas.  
- **Dependências seguras:** manter libs como Next.js, Tailwind e Auth.js atualizadas. Usar `npm audit`/`yarn audit` no CI.  



## Estratégia de carrinho e checkout  
- **Carrinho client-side:** manter em React state/context ou `localStorage`. Não salvar no banco até o checkout final. O carrinho pode ter um ID de sessão (ex.: UUID no cookie) para idempotência do pedido.  
- **Fluxo de checkout:** o frontend envia ao backend: a lista de itens (produtoId, qtd, opcionais) e os dados de entrega. O servidor:  
  1. **Valida** itens (produtos existem e estão ativos).  
  2. **Recalcula preços:** para cada item, buscar `preco` atual no banco e calcular subtotal (`preco * quantidade`), incluir preços de opcionais se houver.  
  3. **Verifica estoque:** se estoque configurado, checa se há quantidade suficiente. Se faltar, retorna erro ao usuário.  
  4. **Calcula totais:** soma subtotais e taxa de entrega (fixa, definida nas configurações).  
  5. **Cria pedido:** insere dados no banco (`Pedido`, `ItemPedido` com snapshots) dentro de transação atômica.  
  6. **Retorna confirmação:** incluir o `codigoPublico` do pedido.  
- **Idempotência:** usar um token enviado pelo front-end (pode ser `carrinhoId` ou hash do conteúdo) para evitar criar pedidos duplicados. Se o mesmo token for detectado, retornar o pedido existente.  
- **Erros no checkout:** em caso de falha (estoque, validação), retornar HTTP 400 com mensagem específica (ex.: “Produto X indisponível”). O front deve exibir o erro ao usuário.  
- **Segurança do fluxo:** executar esta lógica em Server Action ou rota API protegida (não client). O cliente nunca realiza a criação diretamente no banco.  

## Estratégia de pedidos e snapshots  
- **Snapshot completo:** garantir que *todos* os dados relevantes do pedido sejam copiados no momento da criação: nome do cliente, endereço, forma de pagamento (texto), taxa, total, e para cada item: nome do produto, preço unitário original, quantidade, subtotal, quaisquer adicionais. Assim, mesmo se o nome ou preço do produto mudar depois, o pedido reflete o estado inicial.  
- **Código público:** gerar no backend um código curto e único para o pedido (ex.: 6 caracteres alfanuméricos). Poder ser feito via algoritmo random ou hash. Garantir unicidade (ex.: checando no DB).  
- **Status e histórico:** o pedido tem campo `statusAtual`. Cada vez que o status muda, inserir registro em `HistoricoStatus` com `statusAntigo`, `statusNovo`, data e admin responsável. Isso fornece uma trilha completa.  
- **Idempotência:** incluir campo `idempotencyKey` no Pedido (opcional) ou tabela separada, para reconhecer requisições repetidas do mesmo carrinho.  
- **Regras de cálculo:** reforçar: os preços do frontend não importam. Toda regra de desconto (se houver no futuro) ou taxa deve ser codificada no servidor.  

## Estratégia de dashboard  
- **Métricas principais:** no `/admin/dashboard`, exibir:  
  - Total de pedidos do dia (quantidade e soma de valores) e do mês.  
  - Número de pedidos por status (Em Preparo, Pronto, etc.).  
  - Lista dos 5-10 últimos pedidos criados (com data e status) e link para detalhes.  
- **Atualização:** pode ser renderizado no servidor a cada acesso (SSR). Como o admin precisa ver dados recentes, não usar cache muito longo.  
- **Alertas:** mostrar aviso se houver pedidos há muito tempo sem processar (ex.: “5 pedidos aguardando há >1 dia”).  
- **Validação:** critério de aceite: admin vê ao menos os dados acima no dashboard inicial após login.  

## Estratégia de configurações da loja  
- **Página de Configurações:** em `/admin/configuracoes`, editar nome da loja, endereço completo (rua, número, bairro, cidade, CEP), telefone, logo/imagem da loja, horário de funcionamento e taxa de entrega.  
- **Armazenamento:** usar tabela `Configuracao` key/value ou campos fixos em uma única linha. Ex.: `nomeLoja`, `endereco`, `telefone`, `taxaEntrega`.  
- **Uso dos dados:** mostrar esses dados no site (rodapé, páginas estáticas, emails). A taxa de entrega informada aqui deve ser usada no cálculo do pedido.  
- **Critério:** mudanças devem ser salvas no banco e refletir imediatamente no frontend público (p.ex., atualizar taxa no próximo pedido).  

## Estratégia para cozinha, comanda e impressão  
- **Visão de cozinha:** no MVP, não haverá app ou dispositivo separado para a cozinha. O admin (ou atendente) do escritório/processamento já atua como “cozinha”.  
- **Impressão de comanda:** não há integração física. Como solução simples futura: permitir no detalhe do pedido um botão “Imprimir comanda” que abre `window.print()` com layout de PDF (usando CSS `@media print`). Este PDF conterá o código do pedido e lista de itens para uso manual. Não implementar conexão com impressora térmica agora.  

## Estratégia para WhatsApp, Pix e integrações futuras  
- **WhatsApp (futuro):** planejar o backend para enviar notificações via API (ex.: Twilio, MessageBird). Agora, apenas deixar placeholders (route handlers `/api/whatsapp` não implementados).  
- **Pix/Pagamento:** no MVP, assumir pagamento offline (dinheiro ou Pix pendente). No checkout, cliente pode escrever “Pix pendente” ou similar. Não integrar API de banco.  
- **Webhooks:** criar rota de stub `/api/webhook-pix` para receber notificações futuras. Documentar que, no futuro, seria ligada a mecanismos de verificação de pagamento e atualização de status.  
- **Integrações externas:** desenhar o sistema de forma desacoplada (usar axios ou fetch para APIs externas), mas sem implementação agora. Ex.: deixar rotas API REST completas para servir como webhooks.

## Estratégia de UX/UI  
- **Design simples e responsivo:** usar Tailwind CSS para estilização. Padrão de cores neutras (tons terrosos, ou cores da marca), fonte legível e espaçamentos confortáveis.  
- **Componentes reutilizáveis:** criar componentes genéricos (Botão, CampoTexto, Modal, Card de Produto/Categoria). Manter consistência visual.  
- **Mobile-first:** iniciar estilização considerando telas pequenas. Menu hamburguer no mobile; evitar elementos muito pequenos para tocar.  
- **Feedback visual:** botões e links com estados “loading” (spinner ou muda de texto). Após salvar/criar, mostrar aviso (“Categoria criada com sucesso!”) ou erro. Por exemplo, usar uma biblioteca de toasts ou Snackbar.  
- **Navegação clara:** cabeçalho com link para Home e, se logado, link para Dashboard. No mobile, menu colapsável. Breadcrumbs em detalhes (opcional).  
- **Teste de usabilidade:** verificar que o fluxo de compra pode ser concluído com poucos cliques; ex.: adicionar 2 itens, finalizar em < 5 passos.  

## Estratégia de acessibilidade  
- Usar tags semânticas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<button>`).  
- **Contraste:** escolher cores com contraste suficiente para WCAG AA (ex.: texto >4.5:1 com o fundo). Usar ferramenta de checagem de contraste.  
- **Labels de formulário:** cada `<input>` deve ter `<label>` visível ou `aria-label`. Botões devem ter texto descritivo (não apenas ícones).  
- **Imagens:** `alt` descritivo em todas as imagens de produto (ex.: `alt="Foto do Hambúrguer X com cheddar"`). Logo da loja também deve ter alt.  
- **Navegação por teclado:** garantir tabulação lógica (campo de formulário, botão “Adicionar ao carrinho”, etc.). Evitar “tab trap”.  
- **Títulos de página:** usar `<h1>` no topo de cada página importante (ex.: home, detalhe do produto). Seções internas usam `<h2>`, `<h3>`.  
- **Teste de acessibilidade:** incluir ferramenta como axe ou Lighthouse como parte de revisão; documentar principais ajustes (por exemplo, “todos os formulários com label”).  

## Estratégia de validação e tratamento de erros  
- **Validação frontend:** usar validações HTML5 (required, pattern) e bibliotecas (ex.: React Hook Form) para guiar o usuário: por exemplo, campo obrigatório, formato de CEP. Exibir mensagens inline (ex.: “Informe um nome válido”).  
- **Validação backend:** duplicar todas as checagens do front no servidor. Usar Zod ou similar para cada API/Action. Retornar erros claros (ex.: status 400 com mensagem genérica). Não expor stack trace ou dados sensíveis no erro.  
- **Tratamento de exceções:** usar `error.tsx` do Next.js para capturar erros inesperados; apresentar uma página de erro genérica (“Erro no servidor, tente novamente mais tarde”) para o usuário. Logar o erro detalhado no console ou Sentry.  
- **Mensagens ao usuário:** padronizar textos de sucesso/erro. Ex.: “Pedido criado com sucesso!” ou “Falha ao salvar, tente novamente.” Usar componentes de alerta (toasts, modais de confirmação).  
- **Fallbacks:** em caso de falha de rede/servidor (500), exibir mensagem amigável e opção de retry. No checkout, se falhar, não perder o carrinho do cliente; permitir tentar novamente sem recomeçar tudo.  
- **Erros em APIs:** cada rota deve retornar códigos HTTP apropriados: 200 OK, 400 Bad Request (válidação), 401/403 (autenticação), 404 (não encontrado), 500 (erro interno). O front deve tratar cada caso (ex.: ao 401 forçar logout).  
- **Testes de erro:** escrever testes automatizados que simulem dados inválidos em APIs e verifiquem resposta correta (por exemplo, chamar `/api/pedidos` com body inválido retorna 400).  

## Estratégia de upload de imagens  
- **Tipos permitidos:** somente PNG e JPEG. No frontend, verificar `file.type`. No backend, revalidar MIME.  
- **Tamanho:** limitar, por exemplo, a 2 MB. No front, recusar arquivos maiores; no backend, truncar upload ou retornar erro.  
- **Armazenamento:** salvar em `/public/uploads` (Next.js serve estático) ou usar serviço externo. Renomear com UUID ou hash para evitar colisões e remover caracteres especiais. Ex.: `uploads/UUID.jpg`.  
- **Uso no Next.js:** usar `<Image src={"/uploads/arquivo.jpg"} ...>` para otimizar. Garantir apontar o diretório em `next.config.js` como permitido.  
- **Limpeza:** ao atualizar a imagem de um produto, remover o arquivo antigo para não acumular lixo. Isto pode ser uma ação do server ou script utilitário.  
- **Segurança:** não executar código sobre os arquivos; servir como estático. Se usar serviço externo, configurar bucket com política pública de leitura e restrita de escrita.  

## Estratégia de logs e observabilidade mínima  
- **Logs de servidor:** usar `console.log` (ou biblioteca como `winston/pino`) para eventos importantes: criação de pedido (`console.info` com ID do pedido), erro crítico (`console.error`), login admin (`console.info` email, success/fail). NÃO incluir dados pessoais nos logs.  
- **Monitoramento:** configurar serviço como Vercel Analytics ou Sentry para receber logs de erro runtime. Em produção, reportar erros 500 para Sentry.  
- **Health-check:** criar endpoint `/api/health` que testa a conexão com o banco e retorna 200 OK (ex.: `{ status: "ok" }`). Útil para monitorar uptime.  
- **Alertas futuros:** anotar que, mais tarde, falhas críticas (DB off, CPU alta) devem gerar alertas (email/SMS para admins).  
- **Métricas básicas:** coletar contagem de requisições e latências (por exemplo, via Vercel ou Prometheus). Não essencial no MVP, mas planejar pontos de instrumentação.  

## Estratégia de testes  
- **Linters e typecheck:** configurar ESLint (com regras como Airbnb ou Next.js) e Prettier. CI deve rodar `npm run lint` e `npm run typecheck` (TypeScript).  
- **Testes unitários:** usar Jest + Testing Library. Escrever testes para funções críticas: cálculo de total do pedido, geração de código de pedido, validação de formulário, e para componentes puros (ex.: cálculo do subtotal). Alcançar cobertura ≥80% nas funções de domínio (não precisa testar rotas do Next).  
- **Testes de integração:** testar fluxos completos de APIs com banco (usando SQLite in-memory ou um banco de teste). Exemplo: teste que cria usuário/admin, faz login (chama NextAuth), cria pedido e verifica dados no DB.  
- **Testes E2E:** configurar Cypress ou Playwright. Criar cenários principais: (1) Compra completa: acessar site, adicionar dois produtos ao carrinho, finalizar pedido e verificar mensagem de confirmação; (2) Fluxo admin: logar como admin, criar categoria e produto, ver produto no site público. (3) Status: cliente faz pedido, admin muda status várias vezes e verificar relatório de status no front/DB.  
- **Testes de acessibilidade:** incluir ferramenta como `jest-axe` para checar páginas básicas (por exemplo, home e carrinho). Ideal adicionar script de CI (`npm run test:a11y`) que roda os testes de a11y e falha se erros críticos forem encontrados.  
- **Checklist de revisão de código:** estabelecer que cada PR deve ser revisado manualmente para padrões de segurança/qualidade.  
- **Definição de pronto e de pronto (DoR/DoD):** ver seções específicas abaixo.  

## Estratégia de deploy  
- **Ambiente inicial:** usar **Vercel** para hospedar o app Next.js e conectar ao banco PostgreSQL gerenciado (ex.: Neon, Supabase, Railway).  
- **Branch de preview:** habilitar deploy preview no Vercel para cada PR (automático). O merge na branch principal (`main`) dispara deploy de produção.  
- **Migrations automáticas:** no CI ou no post-deploy, rodar `npx prisma migrate deploy` para aplicar migrations no banco de produção. Garantir que a pasta `prisma/migrations` esteja no repositório.  
- **Variáveis de ambiente:** configurar no Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET`, `JWT_SECRET` (se usar JWT), credenciais de e-mail, etc. Não incluir `.env.local` no repo.  
- **Rollback:** Vercel permite reverter para a versão anterior rapidamente. No banco, manter a possibilidade de revert migrations via `prisma migrate reset` local ou anotar manual de rollback em emergências (e.g., `ALTER TABLE DROP COLUMN`). Documentar como reverter migrations com `prisma migrate resolve --rolled-back`.  
- **Health check:** usar o endpoint `/api/health` no Vercel para monitoramento. Se for necessário, configurar health check no Vercel para checar essa rota periodicamente.  
- **Logs em produção:** monitorar logs no painel do Vercel (build logs e runtime logs). Opcional: integrar um serviço externo (Logflare, Papertrail).  
- **Imagens em produção:** se houver grande volume, avaliar mover `/public/uploads` para bucket S3 e servir via CDN, configurando `next.config.js` com `assetPrefix` ou diretivas de reescrita.

## Estratégia de Git, branches e commits  
- **Repositório Git:** criar no GitHub. Branch `main` protegida; todos devs operam via pull requests.  
- **Fluxo de trabalho:** cada tarefa ou issue em branch separada (`feature/<descrição>`, `fix/<descrição>`). Nenhuma mudança diretamente no main.  
- **Commits atômicos:** cada commit aborda um único passo. Mensagens claras no formato semântico (ex.: `feat(produto): adicionar endpoint GET /api/produtos`).  
- **Pull Request:** cada PR deve referenciar a tarefa ou issue, descrever mudanças e ter um colega como revisor. Após aprovação, mesclar no main. Branch deve ser deletada.  
- **GitHub Actions:** configurar workflow para cada push/PR que roda lint, typecheck e testes (`npm test`). Opcional: build do Next.js para verificar erros de compile.  
- **Versionamento:** podemos usar tags no Git para releases importantes (ex.: `v1.0.0`).  
- **Controle de mudanças:** usar projetos ou issues no GitHub para vincular tarefas.

## Definition of Ready  
Critérios mínimos para uma tarefa (história) ser iniciada:  
- Descrição clara do que deve ser feito (o que e por quê).  
- Critérios de aceite definidos.  
- Dependências levantadas (e.g. “depende de criar categoria antes do produto”).  
- Tarefas divididas: nenhuma tarefa gigante (cada PR pequeno).  
- UI/UX definido (wireframe ou descrições) quando envolver interface.  
- Ambiente preparado (CI, libs instaladas).  
- Stakeholders consultados sobre requisitos ambíguos.

## Definition of Done  
Para considerar uma tarefa concluída:  
- Código compila sem erros (`npm run build`).  
- Lint e typecheck limpos (`npm run lint` e `npm run typecheck`).  
- Testes automatizados escritos e passando (unitários e integrações).  
- Funcionalidade testada manualmente conforme critérios de aceite.  
- Documentação atualizada (comentários de código relevantes, README, esquema de BD).  
- Requisitos de segurança/padrões conferidos (senhas nunca aparecem em texto, inputs sanitizados).  
- Código revisado (PR aprovado).  
- Commit final segue convenções (feat/fix/docs etc.).  
- Pull request descreve claramente o que mudou e porquê.  

## Roadmap macro  
1. **Setup inicial (Infra/Projeto)** – 1 dia: configurar repositório, iniciar projeto Next.js/TypeScript, conexão com PostgreSQL, Auth.js básico (login), estrutura de pastas, CI (lint/testes).  
2. **Catálogo público** – 3 dias: modelagem de dados para Categorias e Produtos; migrar Prisma; criar páginas públicas de listagem de categorias (`/`), página de produtos por categoria (`/categoria/[slug]`), e página de detalhe do produto (`/produto/[id]`). CRUD inicial de categorias/produtos no admin (sem imagens).  
3. **Carrinho e Checkout** – 4 dias: implementar carrinho local (context React), páginas `/carrinho` e `/checkout`; lógica de criação de pedido no backend (Server Action ou `/api/pedidos`), com recalculo de preços, snapshot e idempotência.  
4. **Painel Admin CRUD** – 5 dias: finalizar CRUD de categorias e produtos no admin (incluir upload de imagens com validação); testes das páginas; proteger com Auth.js; garantir invalidação de cache.  
5. **Processamento de Pedidos** – 3 dias: implementar listagem de pedidos no admin, detalhe de pedido, alteração de status controlada com histórico. Implementar dashboard com métricas. Escrever testes de integração de status.  
6. **Configurações da Loja** – 2 dias: criar página de configurações (nome, endereço, taxa). Integrar ao layout (exibir nome/logotipo).  
7. **Qualidade e Deploy** – 3 dias: escrever testes E2E (fluxo público + admin), rodar CI completo, ajustes de acessibilidade/SEO menores, polimentos de UX. Preparar deploy final e documentação.  
8. **Pós-MVP (backlog)** – iterativo: implementar itens desejáveis (upload de imagens, filtros, notificações) e planejar integrações futuras (pagamentos, email, etc.).  

*Estimativa total:* aproximadamente **2-3 semanas** de trabalho de um desenvolvedor assistido por IA, sem contar pausas. Recomenda-se revisar diariamente o progresso e ajustar prazos conforme necessário.

## Roadmap detalhado por tarefas pequenas  
Abaixo, exemplos de tarefas divididas em partes granulares. Cada tarefa deve seguir este formato: ID, nome, objetivo, motivo, escopo, pré-requisitos, passos, critérios de aceite, testes, riscos, rollback, commit sugerido, prompts para IA e relatório esperado. Só criamos algumas tarefas de exemplo:

- **T1 – Configurar ambiente inicial:**  
  - *Objetivo:* Criar o repositório Git, iniciar projeto Next.js com TypeScript e Tailwind, configurar conexão com PostgreSQL (Prisma).  
  - *Motivo:* Fornecer base para desenvolvimento incremental.  
  - *Pré-requisitos:* Acesso ao GitHub e ao serviço de PostgreSQL.  
  - *Escopo permitido:* `npx create-next-app`, instalar dependências (Prisma, NextAuth, Tailwind), inicializar Prisma (`prisma init`). Commit inicial.  
  - *Escopo proibido:* Não implementar features de domínio (não criar páginas de categoria, etc.).  
  - *Arquivos:* `package.json`, `tsconfig.json`, `tailwind.config.js`, `prisma/schema.prisma` (com DB url), `.github/workflows/ci.yml`.  
  - *Passos:*  
    1. Criar repositório e projeto Next.js com `npx create-next-app` (`--typescript`).  
    2. Instalar dependências: `prisma`, `@prisma/client`, `next-auth`, `tailwindcss`, `eslint`, etc.  
    3. Configurar Tailwind (`npx tailwindcss init`).  
    4. Rodar `prisma init`, criar `DATABASE_URL` no `.env`.  
    5. Commitar alterações, push ao GitHub.  
  - *Critérios de aceite:* Projeto roda (`npm run dev`) sem erros. `.eslintrc` configurado sem problemas de lint. Conexão com BD válida (`npx prisma db pull`). CI (GitHub Actions) configurada com pelo menos lint e typecheck.  
  - *Testes:* Teste de sanity: `npm run build` deve passar, `npm run lint` sem erros.  
  - *Comando validação:* `npm test`, `npm run typecheck`.  
  - *Riscos:* Instalação de versões conflitantes (garantir compatibilidade Next.js 13+, Auth.js v5).  
  - *Rollback:* Reverter para commit vazio. Resetar PR.  
  - *Checklist de revisão:* Estrutura de pastas inicial correta? Dependências coerentes? CI executando?  
  - *Commit sugerido:* `chore: inicializar projeto Next.js com TypeScript e Prisma`.  
  - *Prompt Codex:*  
    > “Codex, crie um novo projeto Next.js com TypeScript (`npx create-next-app`), configure Tailwind CSS e Prisma. Inicialize Prisma com o datasource apontando para PostgreSQL (`prisma init`). Configure ESLint/Prettier básicos e crie um workflow GitHub Actions para lint e testes. Não implemente lógica de negócio ainda.”  
  - *Prompt Claude Code:*  
    > “Claude, atue como engenheiro de devops. Configure o repositório inicial: Next.js (App Router) com TypeScript, configure o `tailwind.config.js`, e inicialize Prisma apontando para um PostgreSQL de teste. Crie também um exemplo de CI no GitHub Actions que roda `npm run lint` e `npm run build`. Documente brevemente a configuração feita.”  
  - *Relatório esperado:*  
    ```
    **Tarefa:** T1 – Configurar ambiente inicial  
    **Arquivos alterados/criados:** package.json, tsconfig.json, tailwind.config.js, prisma/schema.prisma, .github/workflows/ci.yml, README.md  
    **Decisões:** Usamos `create-next-app` com TypeScript e layout App Router. Prisma configurado com env var DATABASE_URL. Tailwind inicializado.  
    **Testes:** npm run build passou sem erros; lint do TS/ESLint limpo.  
    **Pendências:** Conectar o banco real, configurar NextAuth em tarefa futura.
    ```  

- **T2 – Modelar entidade Categoria (Prisma):**  
  - *Objetivo:* Definir o modelo `Categoria` no `schema.prisma` e gerar migration.  
  - *Motivo:* Base de dados necessária para categorias do cardápio.  
  - *Pré-requisitos:* T1 concluído (Prisma iniciado).  
  - *Escopo permitido:* Adicionar modelo no `schema.prisma`, rodar `prisma migrate dev`. Criar arquivo de seed inicial (opcional).  
  - *Escopo proibido:* Não criar APIs ou UI ainda; não implementar front.  
  - *Arquivos:* `prisma/schema.prisma`, migration em `prisma/migrations`.  
  - *Passos:*  
    1. Adicionar ao `schema.prisma`:  
       ```prisma
       model Categoria {
         id        Int      @id @default(autoincrement())
         nome      String   @unique
         slug      String   @unique
         ativa     Boolean  @default(true)
         createdAt DateTime @default(now())
         updatedAt DateTime @updatedAt
         produtos  Produto[]
       }
       ```  
    2. Salvar e rodar `npx prisma migrate dev --name add_categoria`.  
    3. (Opcional) Criar seed em TS para categorias iniciais.  
  - *Critérios de aceite:* Migration aplicada sem erros. A tabela `Categoria` existe no DB com colunas corretas (`nome`, `slug` unique).  
  - *Testes:* No console do Prisma: `npx prisma studio` mostra a tabela `Categoria`.  
  - *Comando validação:* `npx prisma validate`, `npx prisma migrate deploy --preview-feature` no CI.  
  - *Riscos:* Conflito de nomes na migration se a tabela já existir.  
  - *Rollback:* `prisma migrate reset` (apagar DB de dev) ou deletar migration.  
  - *Checklist:* Verificar se `@unique` foi usado. Schema atende requisitos.  
  - *Commit:* `feat(prisma): adicionar modelo Categoria`.  
  - *Prompt Codex:*  
    > “Codex, implemente no `prisma/schema.prisma` o modelo `Categoria` com os campos: id (Int autoincrement), nome (String único), slug (String único), ativa (Boolean, default true), createdAt, updatedAt. Em seguida, gere e aplique uma migration (`npx prisma migrate dev`).”  
  - *Prompt Claude Code:*  
    > “Claude Code, atue como engenheiro de banco de dados. No arquivo `schema.prisma`, defina o modelo Categoria conforme o escopo: `id`, `nome`, `slug`, `ativa`, timestamps. Execute `prisma migrate dev` para criar a migration. Informe no relatório a estrutura final da tabela.”  
  - *Relatório esperado:*  
    ```
    **Tarefa:** T2 – Modelar entidade Categoria  
    **Arquivos criados:** prisma/schema.prisma, prisma/migrations/..._add_categoria  
    **Decisões:** Nome da tabela no singular (convenção Prisma). usei `@unique` para nome e slug.  
    **Testes:** Prisma Studio mostra tabela Categoria. Migration aplicada com sucesso.  
    **Pendências:** Nenhuma. Categoria pronta para uso em CRUD.
    ```  

- **T3 – CRUD de Categorias (Next.js App Router):**  
  - *Objetivo:* Implementar páginas e API para criar, listar, editar e excluir categorias no admin.  
  - *Motivo:* Permitir ao admin gerenciar categorias via interface.  
  - *Pré-requisitos:* T2 concluído (modelo Categoria no DB). Auth.js básico pronto para proteger rotas.  
  - *Escopo permitido:*  
    - Página `/admin/categorias/page.tsx` (lista de categorias, botão “Nova Categoria”).  
    - Páginas para criar (`/admin/categorias/novo`) e editar (`/admin/categorias/[id]`) com formulário (campo nome e slug).  
    - Usar Server Actions ou rotas API (`/api/categorias`) para salvar no DB via Prisma.  
    - Botão de deletar categoria (com confirmação).  
    - Todas as páginas devem usar `getServerSession` para verificar admin.  
  - *Escopo proibido:* Não implementar UI pública. Não mexer em produtos.  
  - *Arquivos previstos:*  
    - `app/(admin)/categorias/page.tsx` (listar categorias)  
    - `app/(admin)/categorias/novo/page.tsx` (formulário de criação)  
    - `app/(admin)/categorias/[id]/page.tsx` (formulário de edição)  
    - possivelmente `app/api/categorias/route.ts` (endpoints GET/POST/PUT/DELETE).  
  - *Passos:*  
    1. Em `app/(admin)/categorias/page.tsx`: buscar lista de categorias do Prisma no servidor e renderizar tabela ou cards com “Editar” e “Excluir”. Botão “Nova Categoria” leva a `/admin/categorias/novo`.  
    2. Em `/admin/categorias/novo/page.tsx`: criar formulário (Server Component com Server Action): campos `nome`, `slug`. Ao submeter, chamar ação que usa `prisma.categoria.create`.  
    3. Em `/admin/categorias/[id]/page.tsx`: buscar categoria pelo ID, preencher formulário para editar. No submit, chamar ação que usa `prisma.categoria.update`.  
    4. Implementar exclusão: no detalhe ou lista, adicionar botão “Excluir” que chama ação/rota para `prisma.categoria.delete`. Pedir confirmação (JS confirm).  
    5. Proteger todas rotas: usar `await getServerSession()` no início de cada página; redirecionar se não admin.  
  - *Critérios de aceite:*  
    - Admin consegue listar categorias no backend (mesmo que vazio) com botões de editar/excluir.  
    - Criar categoria: ao salvar, volta à lista e mostra nova categoria. Slug gerado ou preenchido (ver detalhes).  
    - Editar categoria: alterar nome/slug reflete na lista.  
    - Excluir categoria: remove do banco e da UI.  
    - Não devem ocorrer erros no console e os dados devem persisitir no Postgres.  
  - *Testes:* Criar testes unitários: função de serviço que chama `prisma.categoria.create` e `update`. Teste de integração: usar Supertest (ou NextRequest) para chamar a rota POST `/api/categorias` e verificar DB.  
  - *Comando validação:*  
    ```bash
    npm test -- --grep "Categoria"  # ou similar
    ```  
  - *Riscos:* Slug duplicado causa erro. Validação de frontend vs backend deve ser consistente (e.g., verificação de slug único).  
  - *Rollback:* Reverter arquivos afetados ou restaurar DB de teste.  
  - *Checklist:* A UI segue o layout esperado? Rotas estão protegidas? Não existe leak de rotas públicas?  
  - *Commit:* `feat(admin): implementar CRUD de categorias`.  
  - *Prompt Codex:*  
    > “Codex, crie no Next.js (App Router) as páginas de CRUD de Categoria para o admin. Em `app/(admin)/categorias/page.tsx` liste todas as categorias do banco (via Prisma) com botões de Editar/Excluir. Em `novo/page.tsx` faça um formulário para criar nova categoria (nome e slug). Em `[id]/page.tsx` faça um formulário para editar categoria existente. Proteja todas essas páginas com `getServerSession()`. Use Server Actions ou rotas API para comunicação com Prisma.”  
  - *Prompt Claude Code:*  
    > “Claude Code, implemente a interface de administração de Categorias em Next.js App Router. Gere a página de listagem (`/admin/categorias`), a página de novo e a de edição. Cada formulário deve salvar via Prisma. Documente como o guardião de sessão é aplicado. Escreva o código e descreva as partes importantes no relatório.”  
  - *Relatório esperado:*  
    ```
    **Tarefa:** T3 – CRUD de Categorias  
    **Arquivos alterados/criados:** app/(admin)/categorias/page.tsx, novo/page.tsx, [id]/page.tsx, prisma/schema.prisma (relacionamento).  
    **Decisões:** Usei Server Action em formulários. Em lista, chamei servidor com Prisma no layout. Slug no form é manual (não auto).  
    **Testes:** Criei teste unitário do serviço CategoriaService (create, update). Todas as operações testadas manulamente no front.  
    **Pendências:** Validar slug único (agora confiando no Prisma).
    ```  

- **T4 – Modelar entidade Produto (Prisma):**  
  - *Objetivo:* Definir modelo `Produto` no `schema.prisma` e gerar migration.  
  - *Motivo:* Representar produtos do cardápio no banco.  
  - *Pré-requisitos:* T2 concluído (modelo Categoria).  
  - *Escopo permitido:* Adicionar modelo no Prisma e relacioná-lo a Categoria.  
  - *Escopo proibido:* Não criar páginas/publicação.  
  - *Arquivos:* `prisma/schema.prisma`, migration.  
  - *Passos:*  
    1. Adicionar no `schema.prisma`:  
       ```prisma
       model Produto {
         id          Int       @id @default(autoincrement())
         nome        String
         descricao   String?
         preco       Decimal   @db.Decimal(10,2)
         estoque     Int?
         imagemPath  String?
         ativo       Boolean   @default(true)
         categoria   Categoria @relation(fields: [categoriaId], references: [id])
         categoriaId Int
         createdAt   DateTime  @default(now())
         updatedAt   DateTime  @updatedAt
         itensPedido ItemPedido[]
       }
       ```  
    2. Criar migration: `npx prisma migrate dev --name add_produto`.  
  - *Critérios de aceite:* Migration bem-sucedida. Tabela Produto no banco com FK para Categoria (`categoriaId`).  
  - *Testes:* Prisma Studio ou `prisma migrate deploy`.  
  - *Riscos:* Precisão do tipo decimal. Usei `@db.Decimal(10,2)` para preço.  
  - *Rollback:* `prisma migrate reset`.  
  - *Checklist:* Campos corretos? Relacionamento com Categoria ativo?  
  - *Commit:* `feat(prisma): adicionar modelo Produto`.  
  - *Prompt Codex:*  
    > “Codex, no `schema.prisma` defina o modelo `Produto` com campos: id, nome, descricao, preco (decimal 10,2), estoque, imagemPath, ativo, e relacionamento many-to-one com Categoria. Crie a migration para isso.”  
  - *Prompt Claude Code:*  
    > “Claude Code, defina o modelo `Produto` no Prisma com campos nome, descricao, preco (decimal), estoque, imagemPath, ativo, e ligue à Categoria via `categoriaId`. Gere e aplique a migration.”  
  - *Relatório esperado:*  
    ```
    **Tarefa:** T4 – Modelar entidade Produto  
    **Arquivos alterados:** prisma/schema.prisma, prisma/migrations/..._add_produto  
    **Decisões:** Usei Decimal(10,2) para `preco`. FK `categoriaId` para Categoria. Campos opcionais para imagem e estoque.  
    **Testes:** Produto aparece no Prisma Studio após migrate.  
    **Pendências:** Nenhuma. Produto pronto para CRUD.
    ```  

*(Outras tarefas seguem este padrão: p. ex., T5 – CRUD de Produtos, T6 – Implementar carrinho e checkout, T7 – CRUD de Pedidos/Status, etc. Cada uma deve ser dividida em partes pequenas conforme necessário.)*

## Backlog técnico para IA  
Tarefas auxiliares para manter o projeto organizado:  
- **Configurar CI/CD:** implementar GitHub Actions com lint, typecheck, testes e deploy.  
- **Template de PR:** criar arquivo `.github/PULL_REQUEST_TEMPLATE.md` com checklist de revisão.  
- **Documentação inicial:** atualizar README com instruções de setup local, como rodar o app e testes.  
- **Logs e auditoria:** configurar middleware de logs (ex.: Winston) ou serviços de log.  
- **Monitoramento:** configurar serviço de erro (Sentry) para capturar exceções em produção.  
- **PWA (futuro):** planejar service worker básico para cache do front.  
- **Atualizações de dependências:** script para `npm outdated` e plano de atualização sem quebrar.  
- **Refatorações:** revisar código duplicado após implementação de MVP (DRY).  

## Prompts prontos para Codex  
Exemplos de comandos a passar ao Codex para tarefas específicas:  

- **Tarefa “Modelar entidades no Prisma”:**  
  > “Codex, atue como backend developer. No arquivo `prisma/schema.prisma`, crie os modelos de dados `Categoria`, `Produto`, `Pedido` e `ItemPedido` conforme especificado (incluindo todos os campos e relacionamentos). Em seguida, gere e aplique uma migration (`npx prisma migrate dev`). Forneça também o comando terminal usado.”  

- **Tarefa “CRUD de Categorias no Next.js”:**  
  > “Codex, implemente no Next.js App Router as páginas e APIs de CRUD de categorias. No admin (`/admin/categorias`): lista de categorias, página para criar (com formulário) e para editar. Proteja essas rotas com autenticação do NextAuth. Atualize também a parte pública para exibir categorias. Use Server Actions ou Route Handlers conforme adequado.”  

- **Tarefa “Carrinho e Checkout”:**  
  > “Codex, desenvolva o carrinho de compras e fluxo de checkout no Next.js. O carrinho é um componente client-side que guarda itens (use React Context ou similar). A página `/carrinho` deve listar itens e permitir editar quantidades. A página `/checkout` deve ter formulário de entrega e, ao submeter, chamar um Server Action que revalida preços e salva o pedido no Prisma. Lembre de implementar idempotência.”  

*(Fornecer prompts detalhados ajuda o agente IA a saber contexto e limites.)*  

## Prompts prontos para Claude Code  
Exemplos equivalentes para Claude Code:  

- **Tarefa “Criar modelo de dados no Prisma”:**  
  > “Claude, atue como arquiteto de banco de dados. No arquivo `schema.prisma`, defina os modelos `Categoria`, `Produto`, `Pedido` e `ItemPedido` de acordo com as especificações fornecidas. Depois, execute `prisma migrate dev` para aplicar as alterações. Documente a estrutura final do banco.”  

- **Tarefa “Implementar Login Admin”:**  
  > “Claude Code, configure a autenticação NextAuth no Next.js. Crie o provedor Credentials que autentica contra a tabela `usuarios` do banco. Assegure hashing Argon2 para senha, cookies seguros HttpOnly/SameSite. Edite `app/api/auth/[...nextauth]/route.ts` com essa configuração.”  

- **Tarefa “Implementar interface de Pedidos”:**  
  > “Claude Code, crie as páginas admin de listagem de pedidos (`/admin/pedidos`) e detalhe (`/admin/pedidos/[id]`). A listagem deve mostrar status e data; o detalhe deve listar itens e permitir alterar status via dropdown. Use Server Actions ou API routes para atualizar o status no banco.”  

## Template mestre de prompt para agentes  
> **Modelo de instruções para o agente IA:**  
> “Você é um **assistente de desenvolvimento** (ChatGPT/Codex/Claude Code) focado na *tarefa atual*. Siga este modelo:  
> 1. Leia atentamente o enunciado da tarefa.  
> 2. Liste os passos que serão necessários para executar a tarefa.  
> 3. Implemente cada passo, escrevendo código ou comandos conforme solicitado.  
> 4. Não crie arquivos que não estejam mencionados.  
> 5. Ao concluir, gere um **relatório** explicando: quais arquivos foram alterados/ criados, principais decisões de implementação, testes realizados e se a tarefa está completa.”  

Esse template deve guiar o agente para dividir bem a tarefa e reportar seu progresso.

## Template de relatório final de agente  
Após cada tarefa, o agente deve retornar um relatório neste formato:  
```
**Tarefa:** [ID] – [Nome da tarefa]  
**Arquivos alterados:** lista de arquivos criados/alterados  
**Decisões:** descrições de escolhas técnicas (e.g. “Usei Argon2 para hash”).  
**Testes:** resumo dos testes automáticos realizados (ex.: “Rodado teste unitário X, passou com Y/X”).  
**Pendências:** itens não concluídos ou dúvidas restantes (ex.: “A imagem antiga de produto não foi removida”).  
```  
Exemplo breve:  
```
**Tarefa:** T3 – CRUD de Categorias  
**Arquivos alterados:** prisma/schema.prisma, prisma/migrations/..., app/admin/categorias/*.tsx, app/api/categorias/route.ts  
**Decisões:** Nome da tabela no singular; usei Zod para validar nome.  
**Testes:** Rodado teste de serviço Categoria (5/5 passou).  
**Pendências:** Nenhuma.
```

## Checklist de revisão manual  
Antes de aceitar qualquer PR, revisar manualmente:  
- [ ] Funcionalidade cumpre **todos** os critérios de aceite?  
- [ ] Testar fluxo localmente – o output está correto?  
- [ ] Código segue padrões (lint, formatação, sem aviso)?  
- [ ] Não há lógica de segurança removida ou falhas óbvias (senhas no log, campo não validado, etc.)?  
- [ ] Testes cobrem casos importantes (e estão verdes no CI)?  
- [ ] Interface está responsiva e acessível (teste rápido de tabulação)?  
- [ ] Dependências atualizadas, arquivos de configuração revisados (ex.: `next.config.js`, `tsconfig.json`).  
- [ ] Mensagem do PR/commit é clara e descritiva (apontando o que e por quê).  

## Riscos e mitigação  
- **Escopo excessivo:** risco de adicionar funcionalidades extras. *Mitigação:* seguir estritamente o escopo MVP; cada PR verifica contra requisitos definidos.  
- **Tarefas muito grandes:** agentes podem falhar em tarefas enormes. *Mitigação:* quebrar tudo em tarefas atômicas (cada PR pequeno).  
- **Falhas de segurança por omissão:** IA pode esquecer validações. *Mitigação:* revisão manual focada em segurança (validação, criptografia, checagem de autorização).  
- **Erro em deploy/CI:** má configuração de pipeline pode quebrar deploy. *Mitigação:* testar deploy em staging; ter script de rollback (versão anterior).  
- **Falta de clareza:** detalhes ambíguos levam a suposições incorretas. *Mitigação:* manter comunicação aberta e atualizar planejamento se novas informações surgirem.  
- **Inconsistência de ambiente:** diferenças entre ambiente dev e prod (ex.: SQLite vs Postgres). *Mitigação:* usar PostgreSQL também no dev (ex.: Docker local) para testes.  
- **Subestimação de tempo:** cada etapa pode levar mais do que o previsto. *Mitigação:* revisar estimativas regularmente e ajustar prioridades.  
- **Integração de dependências externas:** adição de serviços externos pode atrasar. *Mitigação:* deixar integrações como “mocks” no MVP e planejá-las para depois.

## Estimativa realista  
Esforço aproximado por fase (um desenvolvedor + assistência IA):  
- **Setup inicial:** ~1 dia.  
- **Catálogo público:** ~3 dias (modelos, migrations, listagens, páginas).  
- **Carrinho & Checkout:** ~4 dias (carrinho state, páginas de checkout, lógica de pedido).  
- **CRUD Admin (Categorias/Produtos):** ~5 dias (formulários, upload de imagens, validação).  
- **Processamento de pedidos:** ~3 dias (lista, detalhe, status, dashboard).  
- **Configurações e polimento:** ~2 dias.  
- **Testes e Deploy:** ~3 dias (testes E2E, CI, acessibilidade, ajustes finais).  

**Total:** cerca de **3 a 4 semanas** de trabalho efetivo (considerando revisão e correções) para entregar o MVP completo, incluindo buffer para imprevistos.

## Critérios de pronto do MVP  
O MVP será considerado pronto quando:  
- Todas as funcionalidades obrigatórias acima estiverem implementadas e testadas.  
- O fluxo completo de compra (público compra e admin atualiza status) foi validado em testes E2E.  
- Não há erros críticos (lint/testes/verificação de segurança aprovados).  
- O aplicativo está deployado em produção e acessível pelo público.  
- Documentação básica (README, instruções de ambiente) está finalizada.  
- Checklist de revisão concluído e feedbacks incorporados.  
- O usuário consegue fazer um pedido do início ao fim sem bloqueios.

## Próximos passos após receber o planejamento  
- **Revisão do plano:** equipe técnica valida este documento e esclarece dúvidas. Ajustar detalhes conforme feedback.  
- **Priorização:** dividir as tarefas em sprints ou iterações curtas, conforme capacidade.  
- **Setup do ambiente:** criar repositório GitHub, configurar banco de teste, CI básico.  
- **Iniciar implementação:** seguir o roadmap macro, começando pela primeira tarefa (ex.: T1 – Setup).  
- **Acompanhamento:** em cada sprint, reavaliar o backlog com base no progresso. Manter comunicação com stakeholders.  
- **Uso de IA:** ao delegar tarefas ao ChatGPT/Codex/Claude, aplicar os templates acima, supervisionar os commits e testar cada entrega antes de aprovar.

---  

**Por que esta V2 é superior:** Escopo bem definido, tarefas minuciosas, decisões técnicas fechadas (e.g. uso de Server Actions, Auth.js), foco reforçado em segurança (validação, OWASP, logs), e contrato claro para uso de agentes IA. A estrutura Markdown está organizada e completa, com DoR/DoD, critérios de aceite e checklist para viabilizar implementação incremental real por um único desenvolvedor assistido por IA.

**Cuidados ao executar a V2:** Manter estritamente o escopo MVP aqui definido. Revisar consistentemente a lista de requisitos obrigatórios. Sempre revisar manualmente o código gerado por IA para segurança e qualidade. Atualizar este planejamento se surgirem novas informações de negócio. Acompanhar dependências de tecnologia (versões do Next.js, Auth.js, etc.) e ajustar instruções se mudarem APIs. E lembre-se: estimativas são aproximadas; monitore o progresso e ajuste conforme necessário.