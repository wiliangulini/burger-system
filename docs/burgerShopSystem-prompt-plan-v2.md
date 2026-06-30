**Resumo das melhorias:** A V2 refina profundamente o planejamento, impondo uma separação clara entre MVP obrigatório e recursos pós-MVP; tarefas minuciosas em vez de marcos gigantes; decisões arquiteturais fechadas (e.g. escolha de sessões Auth.js, estrutura de pedido com snapshots); regras de segurança e qualidade muito mais rigorosas; e um contrato operacional específico para o uso de agentes IA (proibições explícitas). O novo prompt é mais objetivo, orientado por princípios sólidos (segurança, acessibilidade, DevSecOps) e estruturado para facilitar execução incremental por IA.

# burgerShopSystem-prompt-plan-v2.md

## Papel da IA executora  
Você é ChatGPT atuando como arquiteto de software sênior, engenheiro de requisitos e tech lead full-stack, com experiência em Next.js (App Router), React, TypeScript, Tailwind CSS, PostgreSQL, Prisma e Auth.js. Além disso, você é consultor de desenvolvimento assistido por IA (ChatGPT, Codex e Claude Code). Sua função é elaborar um planejamento técnico e operacional detalhado para o Sistema de Hamburgueria, seguindo estritamente as instruções abaixo.

## Contexto do projeto  
O sistema é para uma hamburgueria online, com área pública (cardápio digital) e área administrativa. Na área pública, clientes devem navegar por categorias e produtos, montar um carrinho e finalizar pedidos (sem precisar de login). Na área administrativa, usuários autenticados gerenciam categorias, produtos e pedidos, alterando status e consultando informações da loja. O projeto deve ser incremental, permitindo operação inicial e expansão futura. O foco inicial é uma instalação única (sem multi-lojas ou multi-tenant) com linguagem PT-BR e moeda em reais.

## Arquivos de referência obrigatórios  
Baseie-se nos seguintes documentos importados: 
- **burgerShopSystem-prompt-plan.md** (prompt original).  
- **relatorio-burgerShopSystem.docx** (relatório analítico do prompt original).  
- **análise-crítica-do-roadmap-Sistema-Hamburgueria.docx** (críticas ao roadmap original).  

Leia-os completamente antes de iniciar o planejamento, para incorporar recomendações e corrigir lacunas.

## Objetivo do planejamento  
Gerar um documento de planejamento técnico-operacional **preciso, abrangente e profissional**, que sirva como guia para desenvolvimento incremental do sistema. Não se trata de escrever código, mas de detalhar arquitetura, backlog, MVP e processos, de modo a garantir segurança, qualidade e viabilidade por um único desenvolvedor com IA. O planejamento deve viabilizar o projeto real e servir de base para implementação futura.

## Resultado esperado  
O resultado deve ser um plano estruturado em Markdown contendo todas as seções listadas abaixo (incluindo MVP, requisitos, arquitetura, roadmap, etc.), com instruções claras para cada item. O documento final deve detalhar o escopo, arquitetura, tarefas e critérios de sucesso, pronto para ser executado por agentes (ChatGPT/Codex/Claude Code) sob supervisão humana.

## Stack obrigatória  
- **Next.js (App Router)**: use a arquitetura monolítica do App Router.  
- **React** (17+ no App Router).  
- **TypeScript** em todo o código.  
- **Tailwind CSS** para estilo.  
- **PostgreSQL** para banco de dados.  
- **Prisma ORM** para acesso a dados.  
- **Auth.js** (NextAuth v5 ou similar) para autenticação no admin.  
- **Vercel** para deploy inicial (ou VPS Linux como alternativa), e **GitHub Actions** para CI/CD.  
- Documentação técnica e processos devem seguir padrões OWASP, DevSecOps e de qualidade de software.

## Premissas arquiteturais  
- Arquitetura **monolito modular**: todo o sistema em um único projeto Next.js, mas organizado por módulos (público vs admin, etc.). Não usar microserviços ou Kubernetes no MVP.  
- **Server-first**: usar React Server Components para páginas; apenas componentes clientes para interatividade (p.ex. carrinho dinâmico).  
- **Next.js App Router**: uso consistente de layouts e pasta `/app`, com rotas segmentadas para público e admin.  
- Separação clara entre área pública e administrativa (ex.: rotas /, /categoria, /produto para público; /admin/* para admin).  
- Persistência em **PostgreSQL** via Prisma. Segurança e integridade dos dados como prioridade.  
- **Autenticação administrativa**: Auth.js (Credentials Provider) usando usuário no banco. Sessões em cookie HttpOnly, Secure, SameSite=Strict.  
- **Autorização server-side**: controle de acesso via middleware/guards em rotas e server actions. Apenas admins autenticados podem acessar /admin.  
- **Validação obrigatória no servidor**: Ninguém confia no cliente. Todas as entradas (carrinho, formulários) são validadas e sanitizadas no backend antes de salvar.  
- Carrinho mantido localmente no navegador. No checkout, o servidor **recalcula preços e totais** e salva o pedido de forma atômica e idempotente (usar chave de idempotência para evitar duplicados).  
- **Snapshot histórico de pedido**: cada pedido salva instantâneos (nome do produto, preço unitário, adicionais, subtotal, taxa de entrega, total, endereço, forma de pagamento, código público curto e status inicial). Status e mudanças futuros são rastreados (p.ex., tabela de histórico de status). Não se perde histórico financeiro do pedido.  
- Logs mínimos desde o início: log de erros, log de ações administrativas sensíveis (logins, mudanças de status).  
- Deploy inicial simples e reproduzível: geralmente Vercel + banco PostgreSQL gerenciado. Preparar evolução futura mas sem acoplamento (ex.: permitir trocar para VPS depois sem reescrever arquitetura).  

## Escopo funcional inicial  
Inclua **somente** as funcionalidades essenciais para operação básica (MVP obrigatório). Qualquer recurso listado como pós-MVP deve ser excluído do escopo inicial. O MVP inicial deve incluir:  
- **Catálogo público**: listagem de categorias e produtos visíveis aos clientes.  
- **Categorias**: modelo de dados e página de gerenciamento.  
- **Produtos**: modelo (incluindo nome, descrição, preço, ativo, estoque, imagem) e página de gerenciamento.  
- **Carrinho de compras** no cliente: permite adicionar/remover itens (sem persistência no servidor).  
- **Checkout e criação de pedido**: formulário de finalização (endereço, pagamento); backend recalcula totais e persiste o pedido. Inclua geração de código público curto do pedido.  
- **Painel administrativo**: protegido por login.  
- **Login Admin**: tela e fluxo de autenticação para administradores.  
- **CRUD de categorias** (nome, slug, ativa).  
- **CRUD de produtos** (nome, descrição, preço, categoria, imagem, estoque, ativo). Upload de imagem seguro.  
- **Listagem e detalhamento de pedidos** no admin: visualizar todos os pedidos feitos (com itens e dados do cliente).  
- **Alteração de status de pedido**: regras de transição controladas (e.g. “Aguardando”→“Em Preparo”→“Pronto”→“Entregue” ou “Cancelado”). Bloquear transições inválidas.  
- **Configurações essenciais da loja**: edição de informações como nome, endereço, contato da hamburgueria (e.g. tabela Settings no DB).  
- **Dashboard básico do admin**: métricas simples (total de pedidos do dia, pedidos pendentes, receita do dia, últimos pedidos).  
- **Deploy funcional** em ambiente de produção (p. ex. Vercel).  
- **Testes mínimos do fluxo principal**: testes unitários/integr. cobrindo a criação de pedido e autenticação. Critérios de aceite (veja seção específica abaixo).  

Todo o restante (gateway de pagamento, Pix, iFood, emissão fiscal, impressão, app nativo, multi-loja, Kubernetes, Redis, filas, analytics avançado, BI, automações complexas de cozinha etc.) deve ser considerado pós-MVP e **não incluído no escopo inicial**, salvo justificativa excepcional.

## Princípios de arquitetura  
- **Monolito modular**: estrutura de código coesa, mas organizada por domínios (público vs admin, features). Evitar monolitos “bagunçados” com responsabilidades soltas.  
- **Server Components prioritários**: páginas renderizadas no servidor sempre que possível (para SEO e segurança), usando Cache/ISR apropriado.  
- **Separação de camadas**: diferenciar domínio de negócio (logic de pedidos, estoque), acesso a dados (Prisma), APIs (Route Handlers) e UI (componentes). Criar diretórios como `/domain`, `/lib/db`, `/app/api`, `/app/(admin)`, `/components`.  
- **Resiliência e manutenibilidade**: codificar de forma legível e modular. Favor configurações explícitas em vez de soluções mágicas.  
- **Conformidade com padrões**: seguir convenções do Next.js (arquivos `layout.tsx`, `loading.tsx`, `error.tsx` e `not-found.tsx` onde aplicável). Respeitar guidelines (ex.: usar Link, Next/Image, NextAuth middleware).  
- **Cache e invalidação**: planejar cache de dados (p.ex. revalidation incremental em páginas públicas) e invalidação imediata após mutações críticas (e.g. ao criar/editar produto, limpar cache de lista de produtos).  
- **Escalabilidade futura**: manter código desacoplado para permitir refatoração (por exemplo, não acoplar lógica de pagamento na modelagem de pedido). Mas não otimizar prematuramente.  

## Princípios de produto  
- **MVP enxuto**: focar no essencial para valer a pena operar a loja no ar. Evitar “feature creep”. Qualquer coisa não listada em MVP obrigatório fica como extra ou backlog futuro.  
- **Orientação ao usuário**: interfaces simples, intuitivas e responsivas. Fluxos de compra sem complicações. Textos claros em PT-BR.  
- **Acessibilidade básica**: elementos semânticos e atributos ARIA mínimos para navegação por teclado e leitores de tela (detalhes em seção de acessibilidade).  
- **Dados confiáveis**: preço no front-end é apenas sinalizador; o cálculo final é do servidor. O usuário deve sempre ver o preço correto sem manipulação de frontend.  
- **Feedback rápido**: use indicadores de carregamento em ações do usuário (p.ex. “criando pedido…”). Não deixar usuário sem retorno.  
- **Internacionalização tardia**: inicialmente, idioma único (português) e moeda fixa. Não fazer sistema multi-idioma/tenancy agora.  
- **Mobile-first**: priorizar uso em smartphones (muitos clientes pedirão pelo celular).

## Princípios de segurança  
- **Validação e sanitização**: todo input (formulário, JSON de API) validado e sanitizado no servidor (por exemplo usando Zod ou validação manual). Impedir SQLi/XSS.  
- **Autenticação segura**: senhas de admin com hash Argon2id (ou bcrypt forte), políticas de senha (mínimo 12 caracteres). Cookies de sessão HttpOnly/Secure/SameSite=Strict. Sessão curta (e.g. 30–60 min). Incluir rotas de logout e expiração automática.  
- **RBAC básico**: ao menos dois níveis – administrador (gerencia tudo) e, se necessário futuro, operador. Implementar checagem de permissão server-side em todas as APIs e páginas protegidas.  
- **Proteção CSRF**: usar mecanismos nativos do Auth.js ou tokens Anti-CSRF em formulários de mutação.  
- **Rate limiting**: limitar tentativas de login (ex: 5 tentativas em 15 min) e, opcionalmente, criação de pedidos (para evitar flood ou erro de form).  
- **Upload seguro**: permitir apenas imagens (PNG/JPEG) com validação MIME real, tamanho limitado (ex: 2MB) e renomeação de arquivo (usar UUID) em storage seguro. Armazenar uploads em pasta protegida ou serviço externo (S3/Cloudinary) com políticas adequadas.  
- **Regras OWASP**: seguir recomendações do OWASP Top 10. Não expor stack traces em produção, não vazar informações sensíveis em erros. Utilizar HTTPS (padronizado pelo Vercel).  
- **Segredo em ambiente seguro**: variáveis de ambiente para senhas, chaves. Nunca hardcode credenciais. Use arquivos `.env.local` só no dev; no CI/produção, usar os sistemas de secret manager do serviço (Vercel, etc).  
- **Logs sem dados sensíveis**: registrar eventos importantes (login admin, criação de pedido, erro fatal) sem incluir senhas, cartões, etc. Logs de erro técnicos vão para console/serviço de monitoramento, mas sem informações de usuários.  
- **Auditoria mínima**: manter trilha (tabela) de mudanças críticas (e.g. status de pedido alterado por qual admin, quando).  

## Princípios de execução com IA  
- **Tarefas pequenas e focadas**: cada tarefa deve ser granular. O agente IA não deve tentar implementar múltiplas features de uma vez nem criar funcionalidades não solicitadas.  
- **Respeito ao escopo**: não antecipe integrações ou recursos além do MVP acordado (e não adicione gates não pedidas).  
- **Stack fixo**: não mude de Next.js/App Router, TypeScript, ou outras tecnologias sem permissão.  
- **Manter validações**: o agente nunca deve remover validações (segurança) ou ignorar testes.  
- **Comandos de controle**: o agente só deve commitar código revisado, nunca alterações em arquivos fora do escopo da tarefa. Nada de merges automáticos.  
- **Segurança nos detalhes sensíveis**: não modifique configuração de autenticação, regras financeiras ou modelagem de pedidos sem justificativa documentada.  
- **Relatório final obrigatório**: após cada tarefa ou fase, o agente deve gerar relatório explicando mudanças, decisões, testes executados e pendências, para revisão humana.  

## Perguntas permitidas antes do planejamento  
O agente pode fazer perguntas clarificadoras caso algo não esteja claro. Exemplos permitidos:  
- Qual o nome/comunicação (branding) da hamburgueria?  
- Quais categorias iniciais existiriam (sabores de lanche, combos, bebidas)?  
- Como será a política de entrega (somente entrega, retirar local)?  
- Há algum formato padrão para os produtos (ex.: adicionais de lanche)?  
- Existe um canal de pagamento já definido (ex.: só dinheiro, Pix manual)?  
- Há restrições de horário de funcionamento?  
- Quais informações devem constar nas configurações da loja (horário, logo, etc.)?  
- Qual cronograma previsto para o projeto?  

## Regras para assumir premissas quando faltarem dados  
Se faltarem detalhes, assuma de forma conservadora:  
- A loja opera em R$ e linguagem PT-BR.  
- É uma loja única (não multi-tenant).  
- O cliente final **não faz login**; apenas admin faz login.  
- Apenas um tipo de endereço por pedido (não armazenar múltiplos endereços por cliente).  
- Não implemente funcionalidades não solicitadas no MVP (tags SEO, internacionalização, etc.).  
- Padrões modernos de navegadores (Chrome, Safari, Firefox atuais).  
- Capacidade do sistema dimensionada para alguns pedidos por hora (sem otimizações prematuras).  

## Definição do MVP obrigatório  
O **MVP obrigatório** deve conter apenas o essencial para operar:  
- Catálogo público navegável (categorias e lista de produtos).  
- Carrinho no cliente.  
- Checkout e persistência de pedido.  
- Painel administrativo com autenticação.  
- CRUD de categorias e produtos.  
- Listagem e detalhe de pedidos no admin.  
- Alteração de status de pedido (fluxo controlado).  
- Cadastro de configurações básicas da loja.  
- Dashboard administrativo resumido.  
- Deploy básico funcionando e testes do fluxo de compra.  

Cada item acima deve estar implementado e testado. **Não incluir** (a menos que explicitamente justificado) nada de pós-MVP. O agente deve verificar cada funcionalidade listada com critérios de aceite claros.

## MVP desejável  
Recursos que seriam bons ter no MVP, mas são opcionais:  
- **Upload de imagens** para produtos no admin (com validação).  
- **Pesquisa/filtragem simples** de produtos no catálogo.  
- **Exibição de estoque** (quantidade disponível) opcional no catálogo.  
- **Página “Sobre nós” ou “Contato”** com informações da loja.  
- **Notificações básicas**: enviar um email ou mensagem para o admin quando há novo pedido (simples, manual ou via webhook minimamente).  
- **Melhorias de UX**: por exemplo, pré-carregar imagens de produtos, animações leves.  
- **Mini-historico de ações** no admin (além do mínimo exigido), como registrar quem realizou login.  
- Qualquer funcionalidade que não esteja estritamente no MVP obrigatório pode entrar aqui, desde que não acople o MVP a dependências externas.

## Pós-MVP  
Funcionalidades complexas a serem planejadas **depois** do MVP (não exigidas inicialmente):  
- Integração com gateways de pagamento (Stripe, PayPal etc.) e automação de pagamentos Pix.  
- Webhooks de pagamento ou callbacks bancários.  
- Integração com marketplaces ou iFood.  
- Emissão de nota fiscal eletrônica (conexão com APIs de governo).  
- Impressão automática de comandas em impressora térmica local.  
- Aplicativos móveis nativos (React Native/Flutter).  
- Multi-loja ou multi-tenant.  
- Arquiteturas de contêineres (Docker, Kubernetes) ou microsserviços.  
- Uso de Redis, filas de mensageria ou workers assíncronos.  
- Analytics avançado (ex.: Google Analytics custom, BI).  
- Observabilidade expandida (monitoramento de performance, logs estruturados, Sentry, etc.).  
- Automação de cozinha (robôs, voice orders).  

## Fora do escopo inicial  
Qualquer coisa não listada no MVP obrigatório, desejável ou pós-MVP é **excluída neste planejamento inicial**. Em particular: sistema de busca complexo, internacionalização multilíngue, checkout avançado (validação de cartão, carteira de pagamento interna), chat ao vivo, marketing (SEO aprofundado), acessibilidade além dos requisitos básicos, social login, e quaisquer outras inovações que não sejam essenciais ao MVP. O foco inicial é simples: atender pedidos de forma segura e escalonável para uma hamburgueria.

## Personas e permissões  
- **Cliente (usuário público)**: pode navegar pelo cardápio, adicionar itens ao carrinho e finalizar pedido sem necessidade de cadastro. Não tem login no sistema.  
- **Administrador (painel backoffice)**: usuário autenticado com credenciais. Pode gerenciar categorias, produtos, pedidos e configurações da loja.  
- *(Opcional futuro)*: roles como “Atendente” ou “Gerente” com permissões limitadas (p.ex. só ver pedidos, não mudar configurações). Para o MVP, assumir um único nível de admin.  

## Requisitos funcionais  
Liste todas as funcionalidades do sistema, separadas por contexto:  
- **Público / Cliente:**  
  - Ver lista de categorias e selecionar uma categoria.  
  - Ver lista de produtos de cada categoria.  
  - Visualizar detalhes de produto (nome, imagem, preço, descrição, adicionais possíveis).  
  - Adicionar produtos (com qtd e opcionais) ao carrinho.  
  - Ver e editar carrinho (ajustar quantidades, remover itens).  
  - Preencher checkout: informar dados de entrega (nome, endereço) e forma de pagamento (texto livre, ex.: “Dinheiro”).  
  - Conferir resumo do pedido com cálculo final de preços e taxas.  
  - Enviar pedido: o sistema cria o pedido no servidor. O cliente recebe confirmação com código curto.  
- **Admin / Backoffice:**  
  - Tela de login para administradores.  
  - **Gerenciamento de categorias:** criar, editar, excluir categorias (cada categoria tem nome único e slug).  
  - **Gerenciamento de produtos:** criar, editar, excluir produtos (nome, descrição, preço, categoria associada, imagem, estoque opcional, ativo/inativo). Upload seguro de imagem.  
  - **Controle de estoque (opcional):** marcar produtos como esgotados se estoque chegar a zero.  
  - **Visualização de pedidos:** lista paginada de todos os pedidos realizados, com filtros (p.ex. status).  
  - **Detalhe do pedido:** ao selecionar um pedido, ver itens (quantidade, nome, preço histórico), dados do cliente (endereço), total, forma de pagamento, data e status atual.  
  - **Atualização de status de pedido:** mudar status seguindo regras (ex.: “Aguardando Pagamento”→“Em Preparo”→“Pronto”→“Entregue”). Permitir “Cancelado” apenas em certos casos. Cada transição válida é gravada no histórico.  
  - **Configurações da loja:** editar informações como nome da loja, endereço, telefone e horários.  
  - **Dashboard:** exibir métricas resumidas (total de pedidos do dia, valor total, pedidos pendentes, últimos pedidos).  
- **Regras gerais:**  
  - Preço do produto só no servidor é fonte de verdade (preço no front-end não confiável).  
  - Não permitir vendas de produtos indisponíveis (p.ex. estoque zero ou marcação “inativo”).  
  - Impedir transições de status inválidas. Um pedido finalizado ou cancelado não pode voltar para o fluxo ativo sem passo explícito.  
  - Utilizar chave de idempotência no checkout para evitar pedidos duplicados por reenvio.  

## Requisitos não funcionais  
- **Desempenho:** páginas devem carregar rapidamente; otimizar bundling e usar cache/ISR onde fizer sentido (ex.: lista de produtos muda raramente).  
- **Escalabilidade:** embora seja um monolito, a infraestrutura deve permitir replicação (ex.: Vercel escala instâncias) e o banco dimensionável para carga média de loja.  
- **Confiabilidade:** migrar esquemas de banco de forma segura; backup regular do PostgreSQL; CI executando testes em cada push.  
- **Manutenibilidade:** código bem documentado, padronizado (lint, formatação). Uso de TypeScript garante tipagem. Testes automatizados facilitam refatoração.  
- **Segurança:** conforme seção de segurança.  
- **Compatibilidade:** suportar browsers modernos, comportamento responsivo em mobile.  
- **Acessibilidade:** cumprir critérios básicos de WCAG (texto alternativo em imagens, contraste adequado, navegação por teclado).  
- **Legal/Regulatório:** considerar LGPD minimamente (não armazenar dados pessoais sem necessidade, usar HTTPS).  

## Regras de negócio  
- **Checkout e preços:** o servidor recalcule todo o total do pedido (incluindo possíveis descontos, taxas de entrega etc.) e ignore quaisquer valores de preço enviados pelo frontend.  
- **Estoque:** se for implementado, o sistema deve debitar estoque ao criar o pedido. Se o estoque for insuficiente, alertar o admin ou impedir o pedido.  
- **Status de pedido:** exemplos de fluxo válido: “Criado”→“Em preparo”→“Pronto”→“Entregue”. Deve haver transições controladas. Nunca pular estágios ou reabrir um pedido concluído/cancelado sem uma ação explícita.  
- **Código do pedido:** gerar um identificador único curto (ex.: 6 dígitos alfanuméricos) para o cliente consultar ou informar. Internamente, usar chave primária autoincremental ou UUID.  
- **Dados imutáveis:** campos do pedido (endereços, preços, forma de pagamento) devem ser copiados para o pedido no momento da criação e não mudam, mesmo que o produto/valor seja alterado depois.  
- **Registro de auditoria:** alterações sensíveis (e.g. mudança de status, exclusão de registro) devem ser acompanhadas em log ou tabela de auditoria.  
- **Idempotência:** aceitar repetição do mesmo checkout sem criar pedidos duplicados (usar chave de idempotência por cliente ou sessão).  

## Fluxos principais  
1. **Navegação de Cardápio:** o cliente abre o site, vê categorias. Ao escolher uma categoria, vê os produtos e seus detalhes (nome, foto, preço, opções). Ele adiciona itens ao carrinho com quantidade e adicionais.  
2. **Criação de Pedido:** no carrinho, o cliente revisa itens, ajusta quantidades ou remove itens. Ele clica em “Finalizar pedido”, preenche formulário (nome, endereço, pagamento) e confirma. O frontend envia os dados ao servidor. O servidor valida estoque e preços, cria o pedido (snapshot) no banco e retorna confirmação com código do pedido. Se o cliente tentar reenviar, o servidor detecta idempotência.  
3. **Painel Admin – Gestão de Produtos/Categorias:** o administrador faz login. No dashboard, ele pode navegar para gestão de categorias: criar novas, editar nomes, excluir. Em produtos, ele cria novos produtos informando nome, preço, etc., faz upload de imagem (válida e armazenada). Ele também edita e exclui produtos existentes.  
4. **Painel Admin – Processamento de Pedidos:** o administrador acessa a lista de pedidos. Ao clicar em um pedido, vê detalhes (itens comprados com preços originais, dados do cliente). O admin seleciona o novo status (ex.: “Em Preparo”) e salva. O sistema registra a mudança em histórico e notifica, se aplicável. Quando o pedido chega a “Entregue” ou “Cancelado”, o fluxo encerra.  
5. **Controle de Configurações e Dashboard:** o admin pode editar dados da loja em uma tela de configuração (e.g., endereço, telefone) e visualizar métricas no dashboard.  

## Arquitetura geral  
Descreva em texto (ou diagrama conceitual) uma arquitetura de software. Exemplos de componentes e camadas:  
- **Next.js App Router** com rotas: público (/) e grupo administrativo (/admin). Usar layouts distintos (`app/layout.tsx` geral, `app/(admin)/layout.tsx` para admin).  
- **Banco de Dados (PostgreSQL)** acessado via Prisma. Definir modelo de dados em `prisma/schema.prisma`.  
- **Camada de Domínio/Serviços:** implementar lógica de criação de pedido (recalcular valores, snapshot) em funções server-side (server actions ou API routes).  
- **API Route Handlers:** (Next.js App Router) para endpoints RESTful (ex.: `/api/pedidos`, `/api/usuarios`). Úteis para integração externa futura (webhooks, tracking de pedido).  
- **Componentes React:** usar Server Components para páginas de listagem e leitura; Client Components para formulários interativos e estado (p.ex., carrinho, upload de imagem).  
- **Autenticação:** NextAuth integrado via `[...]` middleware; proteger rotas admin com middleware e `getServerSession()`.  
- **Armazenamento de Arquivos:** pasta `/public/uploads` ou serviço externo para fotos de produto.  
- **Infraestrutura:** rede simples de front+back no Next.js; deploy em Vercel (pull request cria preview automaticamente). GitHub Actions roda lint/testes em cada PR.  

## Estrutura de pastas sugerida  
Sugestão (Next.js 13+ com App Router):  
```
/app
  /admin
    /dashboard
    /categorias
      page.tsx (lista)
      /[id]/page.tsx (editar)
    /produtos
      page.tsx
      /novo/page.tsx
      /[id]/page.tsx
    /pedidos
      page.tsx
      /[id]/page.tsx
    /configuracoes/page.tsx
    layout.tsx (layout admin)
    login/page.tsx
  /categoria/[slug]/page.tsx
  /produto/[id]/page.tsx
  /pedido/[codigo]/page.tsx (opcional, tracking)
  /page.tsx (home/lista de categorias)
  layout.tsx (layout público)
  loading.tsx
  not-found.tsx
  error.tsx
/app/api
  /auth/[...].ts (Auth.js handlers)
  /pedidos/route.ts (API CRUD de pedidos, se necessário)
  /health/route.ts (health check simples)
  ...
/components  (UI compartilhado: Cabeçalho, Rodapé, ProdutoCard, CategoriaCard, Formularios etc)
/lib
  /db.ts (inicialização do PrismaClient)
  /auth.ts (config do Auth.js)
/hooks (custom hooks, e.g. useCart)
/models ou /domain (tipos de domínio, enums compartilhados)
/prisma
  schema.prisma
/public
  /images (logo, etc.)
  /uploads (imagens de produtos, se usar local)
/tests (testes unitários e integração)
/scripts (scripts de migração ou setup, se necessário)  
```
Cada pasta deve refletir domínio claro. Documentar estrutura no README do projeto.

## Rotas públicas e administrativas  
**Roteamento (App Router):**  
- Público: `/` (home); `/categoria/[slug]`; `/produto/[id]`; `/carrinho`; `/checkout`; possivelmente `/pedido/[codigo]` para rastrear pedido.  
- Admin: prefixo `/admin`. Ex.: `/admin/login`; `/admin/dashboard`; `/admin/categorias`; `/admin/produtos`; `/admin/pedidos`; `/admin/configuracoes`.  
Para Next.js: usar rotas de arquivo em `/app` conforme estrutura acima. Criar páginas `loading.tsx`, `error.tsx` e `not-found.tsx` personalizadas onde aplicável (p.ex. se `/categoria/[slug]` não existir).  

## Uso de Server Components, Client Components, Server Actions e Route Handlers  
- **Server Components (RSC):** usar para páginas que apenas exibem dados (ex.: lista de produtos). Permitem SSR e carregamento no servidor.  
- **Client Components:** somente onde há interatividade no cliente (e.g. formulário de carrinho com estado local, componente de upload de imagens que mostra preview). Marcar componentes com `'use client'` quando necessário (p.ex. `Cart.tsx`).  
- **Server Actions:** aproveitar para mutações leves vinculadas à UI (Next.js 14+). Ex.: um `createOrder` como Server Action em componente de checkout, ou `createCategory` em formulário admin. Elas permitem atualizar o DB diretamente pelo componente.  
- **Route Handlers (App API):** usar para contratos HTTP formais ou integração futura. Exemplo: `/api/pedido/check-status` que retorna status JSON (para um futuro rastreamento no site), ou `/api/webhook` vazio como placeholder. Evite usar Route Handlers para funções internas que podem ser Server Actions.  
- **Arquivos especiais:** criar `loading.tsx` para estados de carregamento (spinner genérico), `error.tsx` para tratamento de exceções em cada rota, e `not-found.tsx` para páginas 404 personalizadas.  
- **Cache e revalidação:** por padrão, publique as páginas (Server Components) como stateless/dinâmicas ou use ISR com `revalidate` após mutações. Sempre invalidar dados em cache após criar/atualizar objetos (p.ex. revalidar a lista de produtos após CRUD). Documente politicas de cache.
- **Separação de camadas:** por exemplo, put schemas de validação (Zod) em `/lib/schemas`, ações em `/app/actions`, modelos Prisma no esquema, componentes UI em `/components`.  

## Modelagem de dados  
Projete o banco de dados considerando integridade histórica:  
- **Tabela categorias**: `id, nome, slug, ativo, createdAt, updatedAt`. Unique slug.  
- **Tabela produtos**: `id, nome, descricao, preco, estoque, imagemPath, ativo, categoriaId (FK)`. Considerar `preco` decimal e `estoque` inteiro opcional.  
- **Tabela usuarios (admin)**: `id, nome, email, senhaHash, role, createdAt`. Roles ex.: 'admin'.  
- **Tabela pedidos**: `id, codigoPublico, clienteNome, enderecoTexto, taxaEntrega, formaPagamento, total, statusAtual (enum), criadoEm`. Todos os campos acima recebem o snapshot do valor no momento da criação. `codigoPublico` é curto e único para consulta.  
- **Tabela itens_pedido**: `id, pedidoId (FK), produtoId (FK), nomeProdSnap, precoUnitSnap, quantidade, subtotalSnap, adicionaisSnap`. Armazena snapshot do produto e opcional "adicionais" como string/JSON.  
- **Enum`StatusPedido`**: exemplo: `AGUARDANDO`, `EM_PREPARO`, `PRONTO`, `ENTREGUE`, `CANCELADO`.  
- **Tabela historico_status**: `id, pedidoId, statusAntigo, statusNovo, alteradoEm, adminId (FK)` para trilha de auditoria.  
- **(Opcional)** Tabela de **configuracoes/loja**: `id, chave, valor` (para armazenamento de nome, endereço). Ou campos diretos em uma linha fixa de configuração.  
- **Modelo de credenciais (Auth.js)**: usar o modelo `User` padrão do Auth.js vinculado à tabela `usuarios`.  
- Use migrations controladas (Prisma Migrate) e defina constraints (ex.: NOT NULL onde obrigatório, UNIQUE em slugs/codigoPublico).  
- **Idempotency:** incluir no pedido um campo `idempotencyKey` (string única) para evitar duplicação. Ou criar tabela `idempotency_keys` separada mapeando chaves a pedidos já processados.

## Enums e máquina de estados  
Defina enums claros e transitions permitidas:  
- **StatusPedido** (enum): `AGUARDANDO`, `EM_PREPARO`, `PRONTO`, `ENTREGUE`, `CANCELADO`.  
  - *Transições válidas sugeridas*: AGUARDANDO→EM_PREPARO→PRONTO→ENTREGUE. Em qualquer momento antes de ENVIAR, permitir transição para CANCELADO (se pedido não tiver sido finalizado). Uma vez EM_PREPARO/PRONTO, só pra PRONTO/ENTREGUE, respectivamente.  
- **RoleUsuario** (enum): `ADMIN`, (opcional `ATENDENTE`). Controlar acesso no servidor usando esse campo.  
- **FormaPagamento** (enum ou string): poderia ser `DINHEIRO`, `CARTAO`, `PIX`, mas como no MVP não integra, pode ser um campo livre que armazene texto informado pelo cliente.  
- (Outros enums): não há requisitos de idioma ou tipo de usuário adicionais no MVP.  
Documente as regras de negócio associadas a esses enums (p.ex. quais transições de status são inválidas).

## Estratégia de autenticação e autorização  
- **Auth.js (NextAuth)** com **Credentials Provider** para login admin. Em `/api/auth/[...nextauth].ts`, configure provedor de credenciais. Use Prisma Adapter ou callbacks manual para verificar usuário no PostgreSQL.  
- **Sessões**: por padrão do Auth.js, use **cookie session** (opção `session: { strategy: "database" }` ou JWT). Como abordagem conservadora, prefira **database sessions** (armazenar sessões no DB para permitir revogação imediata). Em v5 do Auth.js pode exigir configuração extra para DB; se inviável, documente fallback para JWT. Em qualquer caso:  
  - **Rotação e expiração**: sessões curtas (ex.: 30min), renovar token ao interagir.  
  - **Logout**: rota de logout que destrói sessão.  
  - **Limite de sessões**: no admin, talvez permitir poucas sessões ativas (implementação simples: logout manual).  
- **Cookie de sessão**: HttpOnly, Secure, SameSite=Strict. Defina `cookie.secure = true` e `cookie.sameSite = 'strict'`.  
- **User model**: tabela de usuários admin deve conter `email único` e `senhaHash` (usar argon2id ou bcrypt forte). Senha deve ser solicitada reforço (ex: min 12 chars, incluir letras e números).  
- **RBAC**: embora só exista “ADMIN” no MVP, planeje suporte a múltiplas funções. Em cada camada (API/Server Action), verifique `session.user.role`. Rotas de admin só acessíveis se `role === 'ADMIN'`.  
- **Guards server-side**: em todas as páginas/admin components usar `getServerSession()` para garantir usuário logado. Alternativamente, usar NextAuth middleware no `/admin` (middleware.ts) para redirecionar não-autenticados.  
- **Auditoria de login:** registrar em log se possível (sucesso/erro de login de admin).  
- **Caso JWT seja usado:** documentar o plano de revogação (e.g. guardar token version no DB), rotação periódica, expiração curta (5–10 min), refresh tokens para sess. longas. O prompt deve obrigar justificar claramente se JWT for escolhido em vez de DB sessions, abordando logout forçado e segurança.

## Estratégia de segurança  
- **Validação server-side completa:** reforce que nenhuma validação pode ficar apenas no cliente. Use bibliotecas (Zod ou libs built-in do Next.js) para verificar schema dos dados em cada API/Action.  
- **Sanitização de entrada:** aplicar sanitizadores em campos de texto (e.g. rejeitar tags HTML em campos básicos). Para descrições ricas, considerar whitelist de HTML.  
- **Proteção contra CSRF:** NextAuth já cuida disso em formulários de login. Em Server Actions, não há problema de CSRF. Se usar rotas API, incluir CSRF token.  
- **Rate limiting:** implemente middleware que limita requisições de login e de endpoint de criação de pedido (evitar abuso). Por exemplo, max. 10 pedidos criados por IP/hora.  
- **Política de senha:** exigir senha forte para admin. Pode usar verificação client-side e server-side.  
- **Upload de arquivos:** detalhes conforme acima (validação de extensão e MIME, tamanho máximo, nome gerado). Considere usar serviços de terceiros para armazenar imagens em produção.  
- **Configuração segura:** liste variáveis de ambiente necessárias (DATABASE_URL, NEXTAUTH_SECRET, S3 credentials se houver, etc). Use mecanismos de secrets do deploy.  
- **Logging e auditoria:** evite logar dados sensíveis (senha, cartão). Log de erros críticos deve ser habilitado (p.ex. Sentry ou Vercel Logs) em produção.  
- **Checklist OWASP:** incluir verificação mínima contra XSS, SQL Injection (Prisma previne SQLi se usado corretamente), Injeção de comandos, etc. Colocar testes de segurança no CI seria ótimo (ex.: ESLint de segurança, OWASP zap em avaliação manual).  

## Estratégia de carrinho e checkout  
- **Carrinho no cliente:** mantenha itens em memória ou `localStorage`. Não persista em banco até o checkout.  
- **Checkout (Server):** quando o cliente finaliza, o frontend envia os itens e dados de entrega. No servidor:  
  - Verificar cada item contra DB (nome, preço atualizado, stock). Recalcular `subtotal = preço * quantidade + adicionais`.  
  - Calcular taxa de entrega (pode ser fixa ou variável; se fixa, só configurar uma constante nas configurações da loja).  
  - Somar tudo para total final.  
  - Criar o pedido no banco com todos os dados *gerados*, ignorando valores enviados pelo cliente.  
  - Associar uma chave de idempotência (p.ex. hash do payload + ID do usuário/anônimo) para garantir sem duplicação.  
  - Retornar confirmação ao cliente (código do pedido).  
- **Erros de checkout:** se algo falhar (produto indisponível ou erro de estoque), informar o cliente adequadamente (ex: “Produto X está indisponível”). Não criar pedido parcial.  
- **Segurança:** usar Server Action para criar pedido ou rota API protegida, para que o cliente não possa forjar pedidos arbitrariamente.  

## Estratégia de pedidos e snapshots  
- **Snapshot completo:** no modelo de dados e na lógica de criação de pedido, garanta que o pedido armazene snapshots de *todos* os dados financeiros e de escolha do cliente: nome do produto, preço unitário, adicionais e seus preços, subtotais, taxa de entrega, total final, endereço completo, forma de pagamento. Mesmo que o produto seja editado depois, o pedido mantém os valores originais.  
- **Código público:** gere no momento da criação um código curto (ex.: 6 caracteres alfanum.). Garanta unicidade. Use esse código em URLs de confirmação.  
- **Status e histórico:** cada pedido armazena o `statusAtual`. Mantenha uma tabela ou campo de histórico registrando cada transição (quem alterou, quando).  
- **Idempotência:** adicione campo `idempotencyKey` para guardar a primeira requisição do checkout. Se o cliente enviar repetidamente, retorne o mesmo pedido sem duplicar.  
- **Regras de cálculo:** deixar claro no plano que *o preço do frontend não vale*, sempre usar dados do servidor. Qualquer lógica de desconto ou taxa deve estar no servidor.  
- **Fluxo de pagamentos:** no MVP, assumir pagamentos off-line (ex.: “dinheiro” ou “Pix pendente”). Incluir esses dados como texto no pedido, mas não integrar gateway.  

## Estratégia de dashboard  
- Apresentar no `/admin/dashboard`:  
  - **Resumo financeiro:** total de pedidos do dia (quantidade) e total em R$ deste dia.  
  - **Pedidos por status:** números de pedidos em cada status (“Em Preparo”, “Pronto”, etc.).  
  - **Últimos pedidos:** lista dos 5 pedidos mais recentes com link para detalhe.  
  - **Alertas rápidos:** se houver pedidos não processados há muito tempo, destacar.  
- O dashboard deve ser simples e autoexplicativo. Não requer gráficos sofisticados, mas deve atualizar em tempo real (recarregando ao montar página).  
- Validação: critérios de aceite podem incluir “o admin vê pelo menos os dados acima ao logar”.  

## Estratégia de configurações da loja  
- Criar uma seção no admin (`/admin/configuracoes`):  
  - Campos editáveis: nome da loja, endereço completo (rua, nº, bairro, cidade, CEP), telefone, horário de funcionamento. Opção de logo/imagem da loja.  
  - Armazenar em tabela de configurações (keys/values) ou em linha única.  
  - Esses dados são exibidos no frontend (p.ex., rodapé, páginas estáticas “Sobre”).  
  - Permitir que a loja defina, por exemplo, taxa de entrega padrão.  
  - Critério: mudanças salvas devem refletir imediatamente no site.  

## Estratégia para cozinha, comanda e impressão  
- **Visão de cozinha (após MVP):** para este plano, apenas o admin verá lista de pedidos. Não criar interface separada.  
- **Comanda ou impressão:** no MVP, não integrar impressoras térmicas físicas.  
  - Como alternativa futura: permitir ao admin gerar um PDF da comanda no detalhe do pedido (p. ex. um botão “Imprimir” que chama `window.print()` ou API).  
  - Esse PDF conteria código do pedido e itens, pronto para ser entregue na cozinha. Mas não implementar hardware real agora.  

## Estratégia para WhatsApp, Pix e integrações futuras  
- **WhatsApp:** não previsto no MVP, mas assegurar que o backend possa, no futuro, chamar APIs (ex.: enviar mensagem de confirmação pelo Twilio/WhatsApp) sem refatorar arquitetura. Não implementar agora.  
- **Pix / Pagamento:** no MVP assumir pagamento na entrega ou PIX manual. Não integrar API de pagamento. Em checkout, permitir que cliente escreva “Pix pendente” ou similar.  
- **Webhooks de pagamento:** crie rota placeholder (`/api/webhook-pix`) para uso futuro. No planejamento, anote como seria adicionado (ex.: verificar recebimento e atualizar status).  
- **Integrações externas:** mesma abordagem genérica: planejar a infraestrutura (route handlers, services desacoplados) para integrações futuras, mas sem detalhes agora.  

## Estratégia de UX/UI  
- Design **simples e responsivo**: usar Tailwind para criar layout que se adapta a mobile e desktop sem quebrar.  
- Padrões de form: botões destacados (ex.: “Adicionar ao carrinho”, “Finalizar pedido”), validação inline (mensagens de erro claras).  
- **Consistência visual:** paleta de cores neutra focada em comida (tons terrosos/vermelhos sutis), espaçamento confortável, fontes legíveis.  
- **Componentização:** criar componentes genéricos (Header, Footer, Button, Input) para reutilização.  
- **Mobile-first:** testar no tamanho de tela pequeno (é fato que muitos usam celular).  
- **Feedback ao usuário:** após ações como salvar, mostrar toast ou aviso de sucesso/erro. Durante carregamentos (e.g. criando pedido), exibir spinner.  
- **Navegação clara:** menu com link para home e, se logado, para área admin. Em mobile, usar menu hambúrguer.  

## Estratégia de acessibilidade  
- Usar tags HTML semânticas (`<header>`, `<nav>`, `<main>`, `<button>`).  
- Garantir contraste mínimo (cores do texto vs fundo) conforme padrões AA (ex. texto ~> AA no Lighthouse).  
- Todos os campos de formulário devem ter `<label>` ou `aria-label`. Botões devem ter texto descritivo.  
- Imagens de produtos com atributo `alt` descritivo (ex.: alt = “Foto do sanduíche X”).  
- Navegação por teclado: testar se é possível completar o fluxo (e.g. tab entre campos do formulário).  
- Títulos de página (`<h1>`) claros em cada view; listar títulos de sessões com `<h2>` adequadamente.  
- Incluir teste básico de acessibilidade (por exemplo, comando `npm run test:a11y` ou usar axe). Documentar pontos importantes de acessibilidade no checklist de revisão.

## Estratégia de validação e tratamento de erros  
- **Validação no frontend:** usar as capacidades de React (ex.: HTML5, form validation, ou bibliotecas de formulários) para avisar o usuário de campos obrigatórios/ formato incorreto. Mas isso é complemento, nunca substitui backend.  
- **Validação no backend:** para cada formulário de mutação (login, cadastro, etc.), usar validação estrita (p.ex. esquema Zod). Retornar erros amigáveis (ex.: “Senha muito curta”) ou genéricos (“Formato inválido”) sem vazar info sensível.  
- **Tratamento de exceções:** criar um componente `ErrorBoundary` global ou usar `error.tsx` do Next.js para capturar erros inesperados. Mostrar página de erro genérica ao usuário, mas logar detalhes para devs.  
- **Mensagens ao usuário:** usar um sistema de toast ou modais para avisos ( sucesso/erro) conforme necessário. Padronizar esses textos (ex.: “Pedido criado com sucesso!”).  
- **Fallbacks:** em casos de falha de rede/servidor, exibir página de erro genérico (“Tente novamente mais tarde”) e instruções para reverter ação se necessário.  
- **Erros API:** rotas API devem retornar códigos HTTP adequados (400, 401, 404, 500) com JSON explicativo. Codex/agent deve escrever testes que verificam esses códigos.  

## Estratégia de upload de imagens  
- Somente produtos terão upload de imagem (no admin).  
- Validar no frontend o tipo de arquivo e tamanho (p.ex. máximo 2MB). No backend, verificar `content-type` e tamanho do arquivo recebido.  
- Salvar imagem num diretório controlado (`/public/uploads`) ou em serviço (S3/Cloudinary) definindo regras de nome (ex.: `UUID_timestamp.jpg`). Guardar o caminho/URL no DB.  
- Usar componente Next/Image para exibição, definindo `width/height`.  
- Se for implementar em memória local no dev, documentar que em produção deve usar serviço de arquivos estático.  
- Garantir que arquivos antigos sejam removidos quando atualizar imagem de produto.  

## Estratégia de logs e observabilidade mínima  
- **Logs de servidor:** escrever logs básicos (usando `console.log` ou biblioteca) para eventos importantes (e.g. “Pedido #123 criado”, “Erro ao conectar DB”). Não logar dados sensíveis.  
- **Monitoramento:** usar ferramentas integradas (Vercel Analytics, Sentry) para capturar erros em produção. Incluir status de uptime (página `/api/health` que retorne 200 OK).  
- **Health checks:** criar um endpoint simples (`/api/health`) que cheque conexão com DB e retorne OK (útil para monitorar se a aplicação está viva).  
- **Alertas:** não configurar sistemas complexos no MVP, mas documentar que, futuramente, falhas críticas (ex.: DB inacessível) deverão notificar equipe.  
- **Métricas básicas:** número de requests, latência de APIs. Emci não estritamente necessário no MVP, mas planejar como coletá-los (através do próprio Vercel ou ferramentas de CI).  

## Estratégia de testes  
- **Lint e Typecheck:** configurar CI para rodar ESLint (com regras Airbnb ou Google) e `tsc --noEmit`. Definir `npm run lint` e `npm run typecheck`.  
- **Testes unitários:** usar Jest + Testing Library. Escrever testes de unidade para lógica crítica, como cálculo de total, geração de snapshots de pedido, transições de status. Cobertura mínima ~80%.  
- **Testes de integração:** testar interações com Prisma e NextAuth. Por exemplo, testar criação de usuário/admin, login, criação de pedido usando um banco de testes (SQLite em memória ou PostgreSQL de teste).  
- **Testes E2E:** configurar Cypress ou Playwright para fluxo principal: 
  1. Acessar site público e adicionar itens ao carrinho. 
  2. Preencher checkout e verificar resposta (pedido criado e aparece no admin). 
  3. Realizar login no admin, encontrar pedido e mudar status.  
- **Testes manuais guiados:** checklist para que o desenvolvedor/humano verifique (ex.: preencher forma difernetes).  
- **Acessibilidade e responsividade:** usar ferramentas (axe CLI, Lighthouse) periodicamente. Documentar no CI rodadas simples (ex: `npm run test:axe`).  
- **Revisão de código:** cada PR deve ser revisado por humanos. Usar checklist de revisão (confira se implementações de segurança não foram quebradas, etc.).  
- **Definições de pronto (DoR) e pronto (DoD):** ver seções próprias.  

## Estratégia de deploy  
- **Ambientação inicial:** usar **Vercel** para hospedar app Next.js (integração zero-config). Banco de dados PostgreSQL gerenciado (ex.: Neon, Supabase, Railway).  
- **Branch de preview:** cada PR no GitHub aciona deploy em ambiente de preview. `main` ou `main` deve acionar deploy de produção.  
- **Variáveis de ambiente:** Configurar no Vercel: `DATABASE_URL`, `NEXTAUTH_SECRET`, outros segredos. No dev, usar `.env.local`. Nunca commitar `.env`.  
- **Migrations:** executar `prisma migrate deploy` no deploy para aplicar migrations no banco. Documentar processo de rodar migrations localmente e no CI.  
- **Rollback:** em caso de falha no deploy, voltar para commit anterior (Vercel permite reverter). Documentar como desfazer alterações de schema (prisma migrate rollback) em emergências.  
- **Health check:** configurar página `/api/health` no Vercel. Pode-se usar Vercel’s Health Check feature para monitorar rota e alertar.  
- **Logs:** monitorar console de produção no Vercel para erros. Se a stack permitir, configurar logging (ex.: Logtail).  
- **Armazenamento de mídia em produção:** se o tamanho de imagens for grande, considerar usar serviço de arquivos estáticos (e.g. bucket S3) e apontar `next.config.js` para isso via `basePath` ou `assetPrefix`.  

## Estratégia de Git, branches e commits  
- **Repositório Git no GitHub:** branches protegidas (`main`). Pull requests obrigatórios para mesclar.  
- **Fluxo de trabalho:** uma estratégia simples: cada tarefa pequena em uma branch separada (`feature/nome-da-tarefa`). Usar prefixos de convenção se quiser (ex: `feat/`, `fix/`).  
- **Commits atômicos:** cada commit deve corresponder a um passo claro da tarefa (e.g. “feat(product): criar modelo Prisma do produto”). Incluir no PR o ID da tarefa gerado.  
- **Mensagens de commit:** usar padrão (Conventional Commits) se possível, ou pelo menos ser descritivo. Ex.: `feat`: novas features, `fix`: correção de bugs, `docs`: atualizações de documentação.  
- **Pull Request:** deve conter referência à tarefa/ticket e breve descrição. Revisão obrigatória por outro desenvolvedor ou role de revisão.  
- **GitHub Actions:** configurar workflow que executa lint/test em cada PR e no push para main. Opcionalmente, deploy na main.  
- **Evolução de branches:** após merge, deletar branch de feature. Atualizar local dev antes de criar nova branch.  
- **Semântica de tags:** opcionalmente usar tags ou versões (v0.1.0) para releases significativos.  

## Definition of Ready  
Critérios mínimos para uma história/tarefa ser iniciada:  
- Descrição clara do que fazer (objetivo e motivo).  
- Critérios de aceite definidos.  
- Dependências levantadas (e.g. “é preciso ter categorias criadas antes de CRUD de produto”).  
- Tarefas divididas: nenhuma tarefa gigantesca.  
- UI/UX mínima definida (wireframes ou exemplo).  
- Ambiente preparado (configurado CI, libs instaladas).  
- Todos os stakeholders relevantes informados ou consultados.  

## Definition of Done  
Critérios para considerar uma tarefa concluída:  
- Código compilado sem erros (lint/tsc aprovados).  
- Testes automáticos pertinentes criados e passando.  
- Funcionalidade verificada manualmente.  
- Critérios de aceite atendidos.  
- Documentação atualizada (README, comentários de código, modelo de dados, fluxograma se necessário).  
- Segurança e performance conferidas (pequena revisão).  
- Código revisado por outra pessoa (PR aprovado).  
- Commit final na branch de tarefa com mensagem adequada.  
- Descrição de PR/commit inclui quais mudanças foram feitas e por quê.  

## Roadmap macro  
Divida o projeto em fases gerais (MVP e além):  
- **Fase 1: Setup inicial (Infra/Projeto)** – Configurar repositório, Next.js, conexão com DB, Auth.js básica, modelo de usuário. Incluir CI com lint/testes.  
- **Fase 2: Catálogo público** – Modelagem de categorias e produtos; páginas públicas de listagem e detalhe; criação de categorias/produtos no admin sem imagem.  
- **Fase 3: Carrinho e Checkout** – Implementar carrinho no cliente e fluxo de checkout; lógica de criação de pedido (sem integração de pagamento).  
- **Fase 4: Painel Admin CRUD** – Finalizar CRUD completo de categorias e produtos (incluir upload de imagem); listar e detalhar pedidos.  
- **Fase 5: Processamento de Pedidos** – Implementar mudança de status no admin; dashboard básico de métricas; histórico de status.  
- **Fase 6: Configurações da Loja** – Página de configurações (nome, endereço, taxas); incorporar no layout.  
- **Fase 7: Qualidade e Deploy** – Ajustes finais, testes E2E, acessibilidade, revisão geral; configurar deploy e pipelines definitivos.  
- **Fase 8: Pós-MVP** – Itens opcionais e backlog (integrações, app móvel, etc).  
Cada fase corresponde a um conjunto de tarefas menores a serem planejadas detalhadamente.

## Roadmap detalhado por tarefas pequenas  
Para cada fase do roadmap, liste tarefas *pequenas* com:  
- **ID da tarefa:** código único (ex: T1, T2...).  
- **Nome:** breve e claro.  
- **Objetivo:** o que deve ser atingido.  
- **Motivo:** por que é importante.  
- **Pré-requisitos:** tarefas anteriores ou condições necessárias.  
- **Escopo permitido:** exatamente o que deve ser feito nessa tarefa.  
- **Escopo proibido:** o que não cabe nessa tarefa (para evitar overflow).  
- **Arquivos/paths previstos:** indicar onde provavelmente tocar (p.ex. `prisma/schema.prisma`, `app/admin/categorias/page.tsx`).  
- **Passos de execução:** sequência de ações (por exemplo, “1. Criar migration; 2. Executar migrate; 3. Escrever teste; 4. Implementar API”).  
- **Critérios de aceite:** como saber se a tarefa foi bem-sucedida (p.ex. “Ao adicionar categoria, ela aparece na listagem público e admin; testes de unidade passando”).  
- **Testes obrigatórios:** quais testes criar para validar (unitários, integração, e2e).  
- **Comandos de validação:** exemplos de comandos CLI (p.ex. `npm test -- filtro tarefaX`).  
- **Riscos:** possíveis dificuldades ou dependências (e.g. “SQLite local difere de Postgres, atenção”).  
- **Rollback:** como desfazer se algo der muito errado (ex.: “reverter migration” ou “resetar DB de teste”).  
- **Checklist de revisão manual:** pontos para revisão por humano (p.ex. “a UI segue o layout esperado?”, “senhas não estão no log?”).  
- **Sugestão de mensagem de commit:** exemplo do commit final (ex.: `feat(categorias): implementar CRUD de categorias`).  
- **Prompt para Codex:** texto pronto a ser dado ao Codex para executar essa tarefa específica.  
- **Prompt para Claude Code:** texto pronto para Claude Code, caso se use essa ferramenta.  
- **Relatório esperado do agente:** descrição breve do que o agente deve reportar ao final (arquivos modificados, resumo das mudanças, passos de teste).  

Exemplo resumido de uma tarefa (demonstrativo):  
- *ID:* T1  
- *Nome:* Modelo de categoria  
- *Objetivo:* Criar entidade Categoria no Prisma.  
- *Escopo permitido:* Definir schema, migration, model TS e CRUD básico sem UI.  
- *Escopo proibido:* Não criar páginas Next.js; não adicionar autenticação.  
- *Arquivos:* `prisma/schema.prisma`, `prisma/migrations/*`, `/app/api/categorias/route.ts`.  
- *Passos:* (1) Atualizar schema.prisma; (2) rodar `prisma migrate`; (3) criar endpoint `/api/categorias`; (4) escrever testes unitários.  
- *Critérios:* Ao chamar GET `/api/categorias`, retorna lista (mesmo que vazia).  
- *Testes:* Unitário em `service/categoria`.  
- *Prompt Codex:* “Implemente o model Categoria...” etc.  

Cada tarefa deve ser pequena o suficiente para ser resolvida por um agente de IA de forma confiável. Não crie tarefas enormes. Divida grandes features em passos menores (modelagem separada de migrations, depois API, depois UI, etc.). Use este formato para todas.

## Backlog técnico para IA  
Além das tarefas funcionalidade, crie um backlog de tarefas técnicas para suporte da equipe/IA, como:  
- Configurar GitHub Actions (CI pipeline) para lint/testes.  
- Definir arquétipo de PR (template) com checklist.  
- Escrever documentação inicial (README com instruções de setup).  
- Implementar auditoria de logs de servidor (p.ex. configurar Winston ou usar console).  
- Melhorias no deploy (monitoramento, backups do banco).  
- Atualizar dependências críticas (Tailwind, Next) periodicamente.  
- PWA básico (service worker) como futuro.  
- Refatorar código duplicado detectado durante desenvolvimento.  

## Prompts prontos para Codex  
Forneça prompts detalhados para as primeiras tarefas que serão dadas ao Codex. Exemplo:  
- *Tarefa “Modelar entidades no Prisma”*:  
  > “Codex, você é um backend developer. Use o arquivo `prisma/schema.prisma` para criar os modelos de dados das tabelas Categoria, Produto, Pedido, ItemPedido conforme especificado no planejamento. Em seguida, gere e aplique uma migration. Escreva o comando no terminal para isso.”  
- *Tarefa “CRUD de Categorias no Next.js”*:  
  > “Codex, implemente no Next.js usando App Router: as páginas e API de CRUD de Categorias. No admin, crie páginas para listar, criar, editar e excluir categorias, protegendo rotas com autenticação. Use formulários e Actions. Atualize rotas públicas para exibir categorias.”  
- E assim por diante. Cada prompt deve contextualizar a tarefa, a stack e as instruções claras.  

## Prompts prontos para Claude Code  
Forneça prompts equivalentes para Claude Code (pode ter tom ligeiramente diferente). Exemplo:  
- *Tarefa “Criar modelo de dados no Prisma”*:  
  > “Claude, atue como backend architect. No arquivo `schema.prisma`, defina os modelos de Categoria, Produto, Pedido e ItemPedido conforme as specs fornecidas. Gere a migration e escreva o comando para aplicá-la. Documente o resultado.”  
- *Tarefa “Implementar Login Admin”*:  
  > “Claude Code, configure o NextAuth no Next.js. Crie o provedor de Credentials para admins. Garanta hash de senha Argon2 e session cookies seguros. Escreva o código necessário em `app/api/auth/[...nextauth].ts`.”  

## Template mestre de prompt para agentes  
Forneça um modelo de instruções para quando usar agentes de IA, por exemplo:  
> *“Você é um assistente de desenvolvimento (ChatGPT/Codex/Claude Code) focado nesta tarefa específica. Siga este modelo: 1) Leia o enunciado da tarefa; 2) Liste os passos que irá realizar; 3) Execute cada passo, escrevendo o código na linguagem solicitada; 4) Não crie arquivos não mencionados; 5) Ao finalizar, gere um relatório explicando o que foi feito (arquivos alterados, decisões).”*  
Esse template deve guiar o agente a não omitir etapas, a reportar e a não ultrapassar o escopo.

## Template de relatório final de agente  
Mostre como deve ser o relatório que o agente devolve após cada tarefa. Deve conter:  
- **Título da tarefa** (ID e nome).  
- **Alterações feitas:** listar arquivos criados/modificados.  
- **Decisões principais:** por exemplo, escolha de bibliotecas ou estratégias (e.g. “Usei NextAuth.js com Credentials conforme planejado”).  
- **Testes realizados:** quais testes foram rodados e resultados (passou/falhou).  
- **Pendências:** se restou algo ou questões em aberto (ex.: “falta implementar UI de confirmação”).  

Exemplo de formato:  
```
**Tarefa:** T3 - Implementar CRUD de Categorias  
**Arquivos alterados:** prisma/schema.prisma, prisma/migrations/..., app/api/categorias/route.ts, app/admin/categorias/*.tsx, ...  
**Decisões:** Nome da tabela “Categoria” no singular; usei Zod para validar nome.  
**Testes:** Rodado teste unitário de serviço de Categoria (resultado: 5/5 passou).  
**Pendências:** Nenhuma. Tarefa concluída com sucesso.  
```  

## Checklist de revisão manual  
Instruções para revisão humana de cada entrega:  
- [ ] Código atende aos **critérios de aceite** da tarefa?  
- [ ] Funcionalidade testa bem (rodar localmente e validar output)?  
- [ ] Qualidade de código (lint, padrões, segurança)?  
- [ ] Testes cobrem casos importantes (e passam no CI).  
- [ ] Interfaces visuais seguem o design e são responsivas.  
- [ ] Senhas não expostas, logs seguros, credenciais fora do código.  
- [ ] Versão de pacotes compatíveis, arquivos de configuração revisados.  
- [ ] Descrição do PR/comentários de commit claros e relevantes.  

## Riscos e mitigação  
- **Escopo excessivo:** risco de adicionar features não essenciais. Mitigar respeitando estritamente o escopo do MVP e backlog; revisão cuidadosa de cada tarefa.  
- **Sobrecarregar agente IA:** tarefas muito grandes podem falhar. Mitigar quebrando tudo em tarefas menores (cada PR *deve* ser pequeno).  
- **Erros de segurança:** IA pode omitir validações. Mitigar por revisão manual focada em segurança (OWASP) e testes de penetração simples.  
- **Problemas de deploy:** configuração incorreta de CI/CD. Mitigar fazendo deploy manual em staging primeiro e testando rollback.  
- **Falta de clareza nos requisitos:** suposições podem estar erradas. Mitigar mantendo comunicação aberta, atualizando o planejamento se necessário.  
- **Estouro de prazo/estimativas:** tarefas podem demorar mais. Mitigar revisão diária de progresso e ajustes de prioridade.  
- **Dados inconsistentes:** sem validação, estoque e preços podem falhar. Mitigar com validação rigorosa server-side e locks de transação no DB se necessário.  
- **Ambiente de desenvolvimento:** diferenças entre dev e prod (ex.: SQLite vs Postgres). Mitigar usando Docker ou mesmo PostgreSQL local no dev para testes.  

## Estimativa realista  
Forneça uma estimativa de esforço ou prazos para cada fase, somando um total. Por exemplo:  
- **Setup inicial:** ~1 dia (repositório, Next.js, config Auth.js).  
- **Catálogo público:** ~3 dias (modelagem, APIs, páginas de categorias/produtos).  
- **Carrinho & Checkout:** ~4 dias (estado do carrinho, server action, lógica de pedido).  
- **CRUD Admin:** ~5 dias (crud completo de categorias e produtos com imagens).  
- **Processamento de pedidos:** ~3 dias (lista de pedidos, status, dashboard).  
- **Configurações loja & polimento:** ~2 dias.  
- **Testes & Deploy:** ~3 dias (testes finais, CI, documentação, deploy).  
Total estimado: **2-3 semanas** de trabalho efetivo (solo) para o MVP, sem contar buffers. Seja conservador e considere imprevistos. Escreva como semanas/hora de trabalho, não prometer entrega imediata.

## Critérios de pronto do MVP  
O MVP está pronto quando:  
- Todas as funcionalidades obrigatórias foram implementadas e validadas (teste E2E do fluxo de compra passando).  
- As user stories do escopo estão marcadas como concluídas.  
- Requisitos de qualidade atendidos (lint limpo, testes verdes).  
- Aplicação está devidamente deployada e configurada para produção.  
- Usuário consegue fazer um pedido do início ao fim sem falhas.  
- Checklist de revisão concluído e feedbacks atendidos.  
- Documentação básica (README, instruções de setup) está finalizada.  

## Próximos passos após receber o planejamento  
- **Revisão do documento:** equipe/leads validam o plano. Ajustar dúvidas ou erros apontados.  
- **Priorização e sequência:** dividir o backlog em sprints ou iterações conforme recursos.  
- **Setup do ambiente:** criar repositório no GitHub, configurar CI e accessos (banco, Vercel).  
- **Início da implementação:** seguir o roadmap macro/tarefas como guia. Executar a primeira tarefa (ex.: modelo de dados).  
- **Acompanhamento e ajustes:** em cada sprint, reavaliar o planejamento com base no progresso.  
- **Comunicação:** manter partes interessadas informadas sobre avanços e bloqueios.  

---

**Por que esta V2 é superior:**  
- *Escopo claro e contido:* define exatamente o MVP essencial, evitando inflar o projeto.  
- *Tarefas minuciosas:* exige roadmap detalhado em tarefas pequenas com pré-requisitos e proibições, facilitando gerenciamento.  
- *Decisões fechadas:* indica explicitamente tecnologias e estratégias (e.g. sessão Auth.js, estrutura de pedidos) para eliminar ambiguidade.  
- *Foco em segurança e qualidade:* inclui checagens de OWASP, validações server-side e integração de testes desde o início.  
- *Orientação ao uso de IA:* estabelece um contrato operacional rigoroso para agentes (não adicionar código sozinho, revisar manual, etc.), evitando sobrecarga.  
- *Profissionalismo:* segue estrutura Markdown padronizada, com Definition of Ready/Done, Critérios de aceite e checklist, próprio para projeto real.  

**Cuidados ao executar esta V2 posteriormente:**  
- **Manter-se no escopo:** ao usar o prompt, cuide para não incluir nada fora do MVP obrigatório sem justificativa forte (e.g., não implemente integração de pagamento no MVP).  
- **Verificar consistência:** confira se todas as seções estão alinhadas (por exemplo, MVP definido em *Definição do MVP* corresponde ao escopo nas tarefas).  
- **Prompt conforme instruções:** ao passar para ChatGPT/agents, assegure que eles leiam todas as seções acima, especialmente restrições.  
- **Tamanho das tarefas:** garanta que o agente não crie tarefas grandes demais; use a seção de Roadmap detalhado para subdividir.  
- **Revisão manual obrigatória:** sempre revise o código gerado antes de aceitar. Não confie cegamente em agentes.  
- **Ambiente atualizado:** adapte instruções caso alguma tecnologia (Next.js, Auth.js) mude de API até lá.  
- **Seguir contrato de IA:** certifique-se de que os agentes obedeçam às regras listadas (sem commits automáticos, sem ignorar testes ou segurança).  
- **Validar premissas:** se surgirem dados novos (por exemplo, mudança no negócio), reavalie as premissas e atualize o planejamento.  
- **Estimativas cautelosas:** lembre-se de acrescentar folga no cronograma, pois estimativas solo+IA costumam subestimar complexidade real.