# Roadmap técnico detalhado para o sistema de hamburgueria

## Resumo executivo

O documento-fonte pede um **Sistema de Hamburgueria completo, profissional, incremental e implementável**, com cardápio online, carrinho, checkout, pedidos, painel administrativo, dashboard e preparação futura para cozinha, WhatsApp, Pix, gateway de pagamento e delivery, usando obrigatoriamente **Next.js, React, TypeScript, Tailwind CSS, PostgreSQL e Prisma**, e com forte ênfase em **segurança no admin, validação server-side, tarefas pequenas para IA, revisão manual e commits frequentes**.

A recomendação principal deste roadmap é uma arquitetura **modular monolítica** centrada em **Next.js App Router**, com **Server Components por padrão**, **Client Components apenas onde houver interatividade**, **Route Handlers para APIs/webhooks** e **Server Actions para mutações internas do produto**, porque isso reduz a quantidade de JavaScript no cliente, mantém segredos no servidor, simplifica o fluxo de leitura/escrita e acelera o MVP sem sacrificar extensibilidade. O próprio Next.js documenta que layouts e pages são Server Components por padrão; Client Components devem ser usados quando houver estado, event handlers ou APIs do navegador; e Route Handlers são os handlers HTTP customizados do diretório `app`. [\[1\]](https://nextjs.org/docs/app/getting-started/server-and-client-components)

Para autenticação administrativa, a recomendação é **Auth.js com sessão em cookie HttpOnly**, RBAC simples e proteção de rotas/endpoints/actions no servidor. O Auth.js documenta duas estratégias principais de sessão — JWT e sessão em banco — e destaca que o cookie `HttpOnly` dificulta o acesso via JavaScript no cliente. Em paralelo, a OWASP recomenda cookies com atributos `HttpOnly`, `Secure` e `SameSite`, além de ciclo de vida de sessão bem controlado. [\[2\]](https://authjs.dev/concepts/session-strategies)

Para o banco, PostgreSQL + Prisma continuam sendo a melhor escolha para esse cenário porque o Prisma oferece schema declarativo, migrations SQL versionadas, índices explícitos e transações com rollback automático em caso de erro; ao mesmo tempo, a própria documentação alerta para manter transações curtas e para considerar pooling externo em cenários serverless para não exaurir conexões. [\[3\]](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview)

Como hipótese operacional, este roadmap assume **uma hamburgueria inicialmente single-store**, com operação local, picos moderados de pedidos, equipe interna pequena e necessidade de crescimento posterior para integrações, fila de cozinha mais sofisticada, analytics e eventual multiunidade. Isso permite um **MVP funcional em 10 a 14 semanas para um desenvolvedor full-time com IA e revisão manual**, ou **6 a 8 semanas com uma squad enxuta**. Essa cadência está alinhada com o princípio do documento de “não construir tudo de uma vez” e dividir o trabalho em etapas pequenas com objetivo, critérios de aceite, testes, revisão e commit próprio.

As duas stacks recomendadas são estas:

| Opção                                 | Composição                                                                                           | Quando escolher                                                               | Vantagens                                                                                                                                                                                                                                                                                                                                                                                                | Desvantagens                                                                                                                                                                                                     |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack A recomendada**               | Next.js App Router + TypeScript + Tailwind + Auth.js + Prisma + PostgreSQL + Vercel/managed Postgres | MVP, time pequeno, iteração rápida, menor custo cognitivo                     | Menos moving parts; leitura e mutação no mesmo runtime; App Router já oferece Server Components, Route Handlers, mutações e features de cache/revalidação. [\[4\]](https://nextjs.org/docs/app)                                                                                                                                                                                                          | Acoplamento maior entre frontend e backend; exige atenção a pooling e limites em serverless. [\[5\]](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool) |
| **Stack B alternativa para evolução** | Next.js no front + backend dedicado Node/NestJS + PostgreSQL + Redis + storage objeto + Kubernetes   | Multi-loja, integrações pesadas, múltiplos consumidores de API, filas/eventos | Separação mais nítida entre BFF/UI e domínio; implantação mais flexível em cluster; crescimento horizontal mais previsível. Isso é uma inferência arquitetural, apoiada no fato de que Kubernetes trabalha com Deployments declarativos, Services como abstração de exposição de backends e probes de readiness/liveness. [\[6\]](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) | Mais custo operacional; maior esforço de DevOps; time-to-market pior no MVP.                                                                                                                                     |

A recomendação final é **adotar a Stack A no MVP** e **planejar a Stack B apenas como trilha evolutiva**, porque isso respeita o escopo obrigatório do arquivo-base e reduz risco de sobre-engenharia logo no início.

## Arquitetura alvo e decisões técnicas

A arquitetura proposta separa o sistema em cinco domínios lógicos dentro do mesmo repositório: **catálogo**, **checkout/carrinho**, **pedidos/operação**, **admin/cozinha** e **plataforma**. No App Router, a área pública e a área interna ficam isoladas por grupos de rota e layouts separados, mantendo a UI pública leve e o backoffice protegido. Essa divisão conversa diretamente com a estrutura sugerida no documento-fonte para `app/(public)`, `app/admin`, `app/api`, `components`, `services`, `actions`, `schemas`, `types` e `prisma`.

A regra de ouro é simples: **página e leitura de dados em Server Component; interação local em Client Component; mutação autenticada em Server Action; integração externa/webhook/API pública em Route Handler**. O próprio Next.js explica que Server Components são padrão e são ideais para buscar dados perto da origem, usar segredos com segurança e reduzir JavaScript enviado ao navegador; Client Components entram quando há estado, handlers e APIs de browser; Route Handlers são request handlers HTTP no diretório `app`; e, após mutações, `revalidatePath` ou `revalidateTag` devem ser usados para refrescar cache. [\[7\]](https://nextjs.org/docs/app/getting-started/server-and-client-components)

Em autenticação, o escopo desta aplicação pede **RBAC enxuto** com papéis como `OWNER`, `MANAGER`, `ATTENDANT` e `KITCHEN`. Para o MVP, um fluxo de login por credenciais com senha forte, hash seguro, sessão curta e auditoria básica de ações administrativas já cobre bem o problema. O Auth.js suporta credenciais arbitrárias e sessões via JWT ou banco; para esse caso, a trilha mais simples é **sessão por JWT/HttpOnly no MVP** e migração opcional para sessão em banco se surgirem requisitos como “logout de todos os dispositivos” ou limitação de sessões concorrentes. [\[8\]](https://authjs.dev/getting-started/providers/credentials)

No banco, a modelagem deve favorecer **integridade, auditabilidade e performance previsível**. O Prisma Migrate mantém schema e banco sincronizados, gera histórico SQL e permite customização; o suporte a índices brilha especialmente em PostgreSQL, inclusive com `BTree` padrão e opções como `GIN` quando houver caso real de JSONB ou busca mais avançada. Para o domínio de restaurante, os índices mais importantes no MVP são: `Product.slug`, `Category.slug`, `Order.code`, `(Order.status, createdAt)`, `(Order.createdAt)`, `(Order.paymentStatus)`, `(Order.customerPhone)` e chaves estrangeiras bem definidas. [\[9\]](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview)

Para deploy, o melhor caminho inicial é **Vercel + banco gerenciado** porque a plataforma oferece suporte nativo ao ecossistema Next.js e infraestrutura aware para SSR, com escala automática. Para a trilha self-hosted, Next.js documenta o cenário de self-hosting e o uso em **Node.js server/Docker container**, o que combina bem com VPS Linux ou Kubernetes quando o produto sair do MVP. [\[10\]](https://vercel.com/docs/frameworks/nextjs)

Diagrama de arquitetura de referência

[Baixar o SVG da arquitetura](architecture-burger-system.svg)

Se quiser gerar esse mesmo diagrama a partir de um arquivo Mermaid, a forma mais direta é usar o **Mermaid CLI**, que aceita um arquivo de definição Mermaid como entrada e gera **SVG/PNG/PDF** como saída; o comando documentado é `mmdc -i input.mmd -o output.svg`. [\[11\]](https://github.com/mermaid-js/mermaid-cli)

A estrutura de pastas recomendada fica assim:

```text
src/
  app/
    (public)/
      page.tsx
      cardapio/page.tsx
      produto/[slug]/page.tsx
      carrinho/page.tsx
      checkout/page.tsx
      pedido/confirmado/[code]/page.tsx
      acompanhar-pedido/[code]/page.tsx
    admin/
      login/page.tsx
      dashboard/page.tsx
      pedidos/page.tsx
      pedidos/[id]/page.tsx
      produtos/page.tsx
      produtos/novo/page.tsx
      produtos/[id]/editar/page.tsx
      categorias/page.tsx
      configuracoes/page.tsx
      cozinha/page.tsx
    api/
      health/live/route.ts
      health/ready/route.ts
      webhooks/pagamento/route.ts
      public/store/route.ts
  components/
    ui/
    public/
    admin/
    kitchen/
  lib/
    auth/
    prisma/
    env/
    observability/
    utils/
  services/
    catalog/
    cart/
    checkout/
    order/
    payment/
    delivery/
    analytics/
  actions/
  schemas/
  types/
  hooks/
  prisma/
    schema.prisma
    migrations/
    seed.ts
  tests/
    unit/
    integration/
    e2e/
public/
```

## Modelo de dados, APIs e fluxos centrais

O núcleo de dados precisa cobrir catálogo, cliente, checkout, pedido, pagamento, áreas de entrega e configuração da loja. O desenho abaixo é o mínimo sólido para o MVP com folga de evolução:

| Entidade              | Função                   | Campos-chave                                                                                                              | MVP             |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `User`                | autenticação admin/staff | `id`, `name`, `email`, `passwordHash`, `role`, `isActive`, `lastLoginAt`                                                  | Sim             |
| `Category`            | agrupar produtos         | `id`, `name`, `slug`, `displayOrder`, `isActive`                                                                          | Sim             |
| `Product`             | item vendável            | `id`, `categoryId`, `name`, `slug`, `description`, `price`, `status`, `isFeatured`, `displayOrder`                        | Sim             |
| `ProductImage`        | imagens do produto       | `id`, `productId`, `storageKey`, `altText`, `sortOrder`                                                                   | Sim             |
| `Additional`          | opcionais                | `id`, `name`, `price`, `isActive`                                                                                         | Pós-MVP ou MVP+ |
| `ProductAdditional`   | vínculo produto-opcional | `productId`, `additionalId`, `maxQty`                                                                                     | Pós-MVP         |
| `Customer`            | dados do comprador       | `id`, `name`, `phone`, `email?`                                                                                           | Sim             |
| `Address`             | endereço reutilizável    | `id`, `customerId`, `street`, `number`, `district`, `complement`, `reference`, `zip?`                                     | Sim             |
| `Order`               | agregado principal       | `id`, `code`, `customerId`, `deliveryType`, `status`, `subtotal`, `deliveryFee`, `discount`, `total`, `notes`, `placedAt` | Sim             |
| `OrderItem`           | linhas do pedido         | `id`, `orderId`, `productId`, `productNameSnapshot`, `unitPriceSnapshot`, `qty`, `notes`, `lineTotal`                     | Sim             |
| `OrderItemAdditional` | snapshot de opcionais    | `id`, `orderItemId`, `nameSnapshot`, `unitPriceSnapshot`, `qty`                                                           | Pós-MVP         |
| `Payment`             | estado de pagamento      | `id`, `orderId`, `method`, `status`, `provider`, `providerRef`, `paidAt`, `changeFor`                                     | Sim             |
| `DeliveryArea`        | regra de taxa            | `id`, `name`, `fee`, `minOrderValue`, `isActive`                                                                          | Sim             |
| `StoreSettings`       | configuração operacional | `id`, `storeName`, `whatsapp`, `isOpenManual`, `prepTimeAvgMin`, `minimumOrderValue`                                      | Sim             |
| `OperatingHour`       | horário de atendimento   | `id`, `weekday`, `openAt`, `closeAt`, `isClosed`                                                                          | Sim             |
| `AuditLog`            | rastreabilidade admin    | `id`, `actorUserId`, `entityType`, `entityId`, `action`, `beforeJson?`, `afterJson?`, `createdAt`                         | Sim             |

Do ponto de vista de integridade, a regra mais importante é usar **snapshots** em `OrderItem` e `Payment`, em vez de confiar no catálogo vivo. Preço do carrinho nunca pode ser o preço “decisivo”; o backend deve recalcular tudo no momento do checkout com base no estado vigente do catálogo e gravar snapshot do que foi efetivamente vendido. Transações Prisma ajudam a fechar esse fluxo com rollback automático se qualquer parte falhar, mas a própria documentação recomenda transações curtas e sem chamadas externas lentas dentro do bloco transacional. [\[12\]](https://www.prisma.io/docs/orm/prisma-client/queries/transactions)

O contrato de APIs deve seguir uma separação simples:

| Camada                          | Tecnologia                           | Exemplo de uso                       |
| ------------------------------- | ------------------------------------ | ------------------------------------ |
| Leitura de catálogo e dashboard | Server Components + services         | páginas públicas e admin             |
| Mutações internas do produto    | Server Actions                       | CRUD admin, alteração de status      |
| Integrações externas            | Route Handlers                       | webhooks de pagamento, health checks |
| Operações client-side           | Client state + validação server-side | carrinho, checkout multi-etapas      |

Versão em código:  
  

```mermaid
erDiagram
USER ||--o{ AUDIT_LOG : gera
CATEGORY ||--o{ PRODUCT : organiza
PRODUCT ||--o{ PRODUCT_IMAGE : possui
PRODUCT ||--o{ ORDER_ITEM : referencia
PRODUCT ||--o{ PRODUCT_ADDITIONAL : habilita
ADDITIONAL ||--o{ PRODUCT_ADDITIONAL : compoe
CUSTOMER ||--o{ ADDRESS : possui
CUSTOMER ||--o{ ORDER : realiza
ORDER ||--|{ ORDER_ITEM : contem
ORDER_ITEM ||--o{ ORDER_ITEM_ADDITIONAL : inclui
ORDER ||--|| PAYMENT : recebe
DELIVERY_AREA ||--o{ ORDER : precifica
STORE_SETTINGS ||--o{ OPERATING_HOUR : define
USER {
string id PK
string email
string passwordHash
enum role
boolean isActive
datetime lastLoginAt
}
CATEGORY {
string id PK
string name
string slug UK
int displayOrder
boolean isActive
}
PRODUCT {
string id PK
string categoryId FK
string name
string slug UK
decimal price
enum status
boolean isFeatured
int displayOrder
}
PRODUCT_IMAGE {
string id PK
string productId FK
string storageKey
int sortOrder
}
ADDITIONAL {
string id PK
string name
decimal price
boolean isActive
}
PRODUCT_ADDITIONAL {
string productId FK
string additionalId FK
int maxQty
}
CUSTOMER {
string id PK
string name
string phone
string email
}
ADDRESS {
string id PK
string customerId FK
string street
string number
string district
string complement
string reference
}
ORDER {
string id PK
string code UK
string customerId FK
string deliveryAreaId FK
enum deliveryType
enum status
decimal subtotal
decimal deliveryFee
decimal total
datetime placedAt
}
ORDER_ITEM {
string id PK
string orderId FK
string productId FK
string productNameSnapshot
decimal unitPriceSnapshot
int qty
decimal lineTotal
}
ORDER_ITEM_ADDITIONAL {
string id PK
string orderItemId FK
string nameSnapshot
decimal unitPriceSnapshot
int qty
}
PAYMENT {
string id PK
string orderId FK
enum method
enum status
string provider
string providerRef
decimal changeFor
datetime paidAt
}
DELIVERY_AREA {
string id PK
string name
decimal fee
decimal minOrderValue
boolean isActive
}
STORE_SETTINGS {
string id PK
string storeName
string whatsapp
boolean isOpenManual
int prepTimeAvgMin
decimal minimumOrderValue
}
OPERATING_HOUR {
string id PK
string storeSettingsId FK
int weekday
string openAt
string closeAt
boolean isClosed
}
AUDIT_LOG {
string id PK
string actorUserId FK
string entityType
string entityId
string action
datetime createdAt
}
```


---

Os fluxos críticos do sistema são estes:

Versão em código dos 3 diagramas acima:  
  

```mermaid
sequenceDiagram
participant C as Cliente
participant UI as Next.js Public UI
participant S as Checkout Service
participant DB as PostgreSQL
C->>UI: monta carrinho
UI->>S: envia itens + entrega + pagamento
S->>DB: valida produtos ativos/disponíveis
S->>DB: recalcula subtotal/taxa/total
alt dados válidos
S->>DB: cria Customer/Address se necessário
S->>DB: cria Order + OrderItems + Payment (PENDENTE ou MANUAL)
S-->>UI: retorna code do pedido
UI-->>C: tela de pedido confirmado
else dados inválidos
S-->>UI: erro de validação
UI-->>C: corrige checkout
end
```

---

```mermaid
sequenceDiagram
participant C as Cliente
participant UI as Checkout UI
participant S as Payment Adapter
participant G as Gateway
participant W as Webhook Handler
participant DB as PostgreSQL
C->>UI: escolhe Pix/cartão
UI->>S: inicia pagamento
S->>G: cria order/payment intent
G-->>UI: QR Code / status inicial / redirect-safe data
G-->>W: webhook HTTP POST com atualização
W->>DB: valida assinatura + idempotência
W->>DB: atualiza Payment.status e Order.status
W-->>UI: status disponível para consulta
```

---

```mermaid
sequenceDiagram
participant A as Admin/Pedidos
participant K as Tela da Cozinha
participant O as Order Service
participant DB as PostgreSQL
A->>O: pedido criado
O->>DB: grava status RECEBIDO
K->>O: consulta fila aberta
O->>DB: lista RECEBIDO/EM_PREPARO
K->>O: mudar para EM_PREPARO
O->>DB: valida transição
K->>O: mudar para PRONTO
O->>DB: atualiza status
A->>O: entregar/finalizar
O->>DB: grava FINALIZADO
```

---  
  
  
Para integrações, a recomendação é esta ordem. **Pagamento**: Mercado Pago como opção principal para Brasil, porque a documentação oficial do Checkout Transparente cobre cartões, Pix e notificações; os **webhooks** são enviados por `HTTP POST` e devem ser configurados com URLs separadas para teste e produção. **Entrega**: Google Maps Routes API apenas quando a loja realmente quiser cálculo dinâmico de distância; a API oferece `Compute Routes` e `Compute Route Matrix` com distâncias e tempos de viagem. **Analytics**: GA4 como mínimo de tráfego e conversão, já que o modelo é baseado em eventos, não em sessões legadas. [\[13\]](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/overview)

## Roadmap incremental e prompts por etapa

A priorização abaixo respeita o princípio do arquivo-base: **fases pequenas, objetivos claros, escopo proibido explícito, testes e commit próprio**.

**Linha do tempo priorizada por marcos**

| Marco            | Semanas | Resultado                                             |
| ---------------- | ------- | ----------------------------------------------------- |
| Fundação         | 1 a 2   | Repositório, qualidade, banco, modelo inicial, auth   |
| Experiência base | 3 a 4   | shells público/admin, cardápio, categorias, produtos  |
| Comércio core    | 5 a 7   | carrinho, checkout, pedido, painel admin, status      |
| Operação         | 8 a 9   | cozinha, dashboard, settings, delivery areas          |
| Plataforma       | 10 a 12 | pagamentos, analytics, CI/CD, deploy, observabilidade |
| Hardening        | 13 a 14 | performance, backup, rollback, readiness produtiva    |

**Tabela de alocação de recursos**

| Papel                   | Foco                                     | FTE-semanas |
| ----------------------- | ---------------------------------------- | ----------- |
| Tech lead / arquiteto   | decisões, revisão, segurança, padrões    | 4.0         |
| Engenheiro full-stack A | frontend público + checkout              | 6.0         |
| Engenheiro full-stack B | admin + pedidos + integrações            | 6.0         |
| QA                      | estratégia de teste, regressão, E2E      | 2.5         |
| DevOps / Platform       | CI/CD, deploy, observabilidade, backup   | 2.0         |
| UX/UI                   | fluxo mobile-first, cozinha e admin      | 1.5         |
| Product/Ops             | regras de negócio, validação operacional | 1.5         |

**Catálogo de etapas**

| ID  | Objetivo                                              | Pré-requisitos        | Esforço      | Entregáveis                                                  | Critérios de aceite                        | Riscos                 | Rollback                                      |
| --- | ----------------------------------------------------- | --------------------- | ------------ | ------------------------------------------------------------ | ------------------------------------------ | ---------------------- | --------------------------------------------- |
| R01 | alinhar produto, ADRs, backlog e convenções           | arquivo-base aprovado | S / 4–8h     | ADRs, README técnico, backlog, Definition of Done            | decisões base registradas e versionadas    | ambiguidade de escopo  | reverter docs para último commit              |
| R02 | criar scaffold Next.js + toolchain de qualidade       | R01                   | M / 6–12h    | app inicial, lint, format, typecheck, aliases                | `lint`, `typecheck`, `build` verdes        | drift de padrão        | reverter scaffold e configs                   |
| R03 | subir infra local e staging com PostgreSQL/Prisma     | R02                   | M / 8–14h    | `.env.example`, compose local, prisma generate               | app conecta ao banco em dev e staging      | env incorreta          | rollback de infra e `.env`                    |
| R04 | modelar domínio núcleo + migrations + seed            | R03                   | M / 10–18h   | schema, migrations, seed, ER revisado                        | migrate/seed reprodutíveis                 | migration quebrada     | `migrate reset` em dev e restore              |
| R05 | autenticação admin, sessão e RBAC                     | R04                   | M / 10–16h   | login, middleware, guards, seed admin                        | login, logout, bloqueio de rota e papéis   | sessão insegura        | desabilitar auth nova e voltar login anterior |
| R06 | shells de UI público e staff + design tokens          | R02,R05               | S/M / 6–12h  | layouts, nav, sidebar, estados loading/error                 | rotas base responsivas                     | dívida visual          | revert de layout                              |
| R07 | cardápio público, categorias e produto detalhado      | R04,R06               | M / 8–16h    | listagem, filtros, detail page, estados vazios               | catálogo navegável em mobile e desktop     | cache inconsistente    | fallback para render server-only              |
| R08 | CRUD de categorias admin                              | R05,R06,R04           | S/M / 6–12h  | lista, criar, editar, ativar, ordenar                        | CRUD completo com validação                | permissão mal aplicada | reverter actions/rotas                        |
| R09 | CRUD de produtos + upload seguro de imagem            | R08                   | M / 10–18h   | formulário, imagens, disponibilidade                         | produto editável e imagem segura           | upload inseguro        | bloquear upload e manter placeholder          |
| R10 | carrinho client-side com contrato server-side         | R07,R09               | M / 8–14h    | cart store, drawer/page, resumo                              | subtotal consistente e persistente         | preço manipulado       | limpar storage e recalcular no servidor       |
| R11 | checkout e criação idempotente de pedido              | R10,R04               | L / 14–24h   | formulário, validação, order create, code                    | pedido salvo, total recalculado no backend | pedidos duplicados     | soft-disable checkout e rollback da action    |
| R12 | painel admin de pedidos + mudanças de status          | R11,R05               | M / 10–18h   | listagem, detalhe, filtros, transições                       | admin acompanha e atualiza fluxo           | transição inválida     | trava de status e restore lógico              |
| R13 | tela de cozinha e fluxo operacional                   | R12                   | M / 8–14h    | fila de cozinha, polling, badges, impressão browser opcional | cozinha enxerga fila e muda status         | UI ilegível em pico    | voltar para painel admin unificado            |
| R14 | pagamentos desacoplados + webhooks + reconciliação    | R11                   | M/L / 12–22h | adapter, sandbox, webhook idempotente                        | webhook atualiza pagamento/pedido          | fraude, duplicidade    | desligar integração por feature flag          |
| R15 | delivery areas, store settings, dashboard e analytics | R12,R13               | M / 10–18h   | taxas, horários, métricas, GA4                               | dashboard e regras de entrega funcionam    | cálculo incorreto      | fallback para taxa fixa e métricas básicas    |
| R16 | CI/CD, deploy, observabilidade, backup e escala       | todas                 | L / 16–28h   | workflow, staging/prod, probes, alertas, backup              | pipeline e rollback testados               | deploy instável        | rollback para release anterior                |

A seguir, cada etapa já vem com dois prompts prontos. Os prompts pressupõem o stack obrigatório do projeto e mantêm o princípio de mudanças pequenas, sem refatorações laterais.

**R01 — Governança, ADRs e backlog**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: criar a documentação-base do projeto e registrar ADRs mínimos.
    Entrada: burgerShopSystem-prompt-plan.md, README.md (se existir), docs/ (se existir).
    Saídas esperadas: docs/adr/0001-stack.md, docs/adr/0002-auth.md, docs/backlog-mvp.md, atualização do README técnico.
    Stack: Next.js App Router, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js.
    Restrições: não criar código de feature; não alterar package.json; não inventar integrações obrigatórias no MVP.
    Testes: validar links internos dos docs; revisar consistência das nomenclaturas; checar checklist de MVP.
    Relatório final: arquivos criados, decisões registradas, dúvidas remanescentes, próximos passos sugeridos.

Prompt Claude Code

    Atue como Claude Code em modo planejamento + execução controlada.
    Objetivo: preparar a base documental do burger-shop-system antes de qualquer implementação.
    Entradas: burgerShopSystem-prompt-plan.md, README.md, estrutura atual do repositório.
    Saídas: ADRs mínimos, backlog técnico granular, estratégia de versões/branches e Definition of Done.
    Antes de editar: liste todos os arquivos que pretende criar/alterar.
    Proibido: gerar código de app, instalar dependências, refatorar arquivos não relacionados.
    Critérios de aceite: documentação suficiente para iniciar R02 sem ambiguidade crítica.
    Teste/validação: revisão manual de consistência e completude dos artefatos.
    Formato do relatório: resumo do que foi criado, riscos percebidos, itens pendentes para aprovação.

**R02 — Scaffold e qualidade**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: preparar o scaffold do projeto com Next.js + TypeScript + Tailwind e baseline de qualidade.
    Entrada: package.json, next.config.*, tsconfig.json, eslint/prettier configs, src/.
    Saídas: estrutura inicial do App Router, aliases, lint, format, typecheck, scripts NPM.
    Restrições: não implementar regras de negócio; não conectar ainda a gateway de pagamento.
    Testes: npm run lint, npm run typecheck, npm run build.
    Esperado: projeto sobe localmente sem erros e com pastas alinhadas ao ADR.
    Relatório final: arquivos alterados, comandos executados, eventuais gaps na config.

Prompt Claude Code

    Atue como Claude Code no VS Code, em modo seguro.
    Objetivo: criar a base executável do projeto sem codar features de domínio.
    Entradas: repositório atual, documentação-base.
    Saídas: App Router funcional, padrão de pastas, scripts de qualidade.
    Antes de editar: liste os arquivos-alvo e descreva o impacto de cada um.
    Proibido: adicionar bibliotecas extras sem justificativa curta; mudar stack.
    Testes obrigatórios: lint, typecheck, build, execução local da home placeholder.
    Relatório final: diffs relevantes, como validar localmente, o que ficou para R03.

**R03 — Infra local e staging**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: configurar ambiente local e staging com PostgreSQL e Prisma.
    Entrada: .env.example, prisma/, docker-compose.* (se existir), scripts.
    Saídas: .env.example consistente, docker compose local, prisma generate/migrate scripts, healthcheck de DB.
    Restrições: não modelar ainda todas as entidades finais; sem deploy produtivo.
    Testes: subir banco local, prisma generate, prisma db pull ou migrate status, conexão via script de smoke test.
    Esperado: ambiente reproduzível por outro desenvolvedor em até 15 minutos.
    Relatório final: variáveis necessárias, comandos e troubleshooting.

Prompt Claude Code

    Atue como Claude Code em modo planejamento antes de editar.
    Objetivo: tornar o setup local/staging previsível e reproduzível.
    Entradas: configs atuais de ambiente, pasta prisma, package.json.
    Saídas: compose local, env template, documentação de setup e smoke test de conexão.
    Proibido: hardcode de segredos; banco em memória; dependências fora da stack principal.
    Critérios de aceite: novo desenvolvedor conseguir bootstrapar o ambiente.
    Testes: prisma generate, conexão bem-sucedida, health endpoint local.
    Relatório final: arquivos modificados, passos de setup, pontos sensíveis.

**R04 — Modelo núcleo, migrations e seed**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar a modelagem inicial do banco e migrations do núcleo de negócio.
    Entrada: prisma/schema.prisma, docs/ER, seed.ts.
    Saídas: entidades User, Category, Product, ProductImage, Customer, Address, Order, OrderItem, Payment, DeliveryArea, StoreSettings, OperatingHour, AuditLog.
    Restrições: sem opcionais complexos se isso atrasar o MVP; sem multi-store.
    Testes: prisma validate, prisma migrate dev, prisma db seed, consultas básicas de smoke test.
    Esperado: banco migrado, seed funcional e relações íntegrias.
    Relatório final: entidades criadas, índices, defaults, limitações deixadas para pós-MVP.

Prompt Claude Code

    Atue como Claude Code com escopo estrito na camada de dados.
    Objetivo: transformar o modelo conceitual em schema Prisma inicial e seed mínimo.
    Entradas: diagramas/ADRs, prisma/schema.prisma, prisma/seed.ts.
    Saídas: schema versionado, migration SQL, seed do admin inicial, categorias-base e produtos mock.
    Antes de editar: mostre a lista de modelos e enums que serão criados.
    Proibido: criar endpoints, telas ou lógica de UI.
    Testes obrigatórios: validate, migrate, seed e leitura simples de cada agregado.
    Relatório final: modelos, índices, observações de integridade e rollback sugerido.

**R05 — Auth admin e RBAC**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar autenticação admin com Auth.js, sessão segura e RBAC básico.
    Entrada: src/lib/auth, src/app/admin/login, middleware.*, User model.
    Saídas: login/logout, proteção de rotas admin, guards de role, seed seguro de usuário inicial.
    Restrições: sem social login; sem fluxo público de cadastro.
    Testes: login válido, login inválido, acesso negado sem sessão, acesso por papel inadequado, logout.
    Esperado: cookie de sessão seguro, middleware funcional e audit log de login opcional.
    Relatório final: arquivos alterados, papéis suportados, como testar manualmente.

Prompt Claude Code

    Atue como Claude Code em modo seguro para autenticação.
    Objetivo: liberar somente a área admin protegida, com menor superfície de ataque possível.
    Entradas: User model, rotas admin, utilitários de auth.
    Saídas: auth config, middleware, página de login, helpers de autorização.
    Proibido: autenticação client-only, armazenamento de sessão em localStorage, bypass por querystring.
    Critérios de aceite: qualquer rota admin exige sessão válida e papel autorizado.
    Testes: cenários positivo/negativo de login, logout e acesso a rota protegida.
    Relatório final: desenho do fluxo auth, riscos e próximos ajustes de segurança.

**R06 — Shells de UI público e staff**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: criar os layouts-base do site público e do painel staff.
    Entrada: src/app/(public), src/app/admin, components/ui, tailwind config.
    Saídas: layout público, layout admin, header, sidebar, estados loading/error/not-found.
    Restrições: sem lógica de negócio profunda; sem gráficos reais ainda.
    Testes: navegação entre rotas-base, responsividade mobile/desktop e acessibilidade básica.
    Esperado: base visual consistente para próximas etapas.
    Relatório final: componentes novos, decisões de responsividade e dívida visual.

Prompt Claude Code

    Atue como Claude Code focado em UX estrutural.
    Objetivo: levantar a casca da experiência pública e interna sem acoplar a lógica final.
    Entradas: rotas existentes, componentes compartilhados, estilos globais.
    Saídas: layouts reutilizáveis, navegação, placeholders elegantes e estados de erro/loading.
    Proibido: adicionar bibliotecas pesadas de UI sem necessidade.
    Critérios de aceite: experiência mobile-first clara e navegação interna/admin consistente.
    Testes: inspeção manual em larguras mobile, tablet e desktop.
    Relatório final: telas cobertas, componentes reutilizáveis e pontos a refinar.

**R07 — Cardápio público**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar cardápio público com categorias, listagem e detalhe de produto.
    Entrada: Category/Product services, rotas públicas, componentes de catálogo.
    Saídas: /, /cardapio, /produto/[slug], filtros por categoria, produtos indisponíveis sinalizados.
    Restrições: sem carrinho complexo nesta etapa; sem busca full-text avançada.
    Testes: catálogo carrega do banco, categorias filtram, slug inválido retorna not-found.
    Esperado: usuário consegue navegar e entender o cardápio.
    Relatório final: rotas criadas, contratos de leitura e pontos pendentes do carrinho.

Prompt Claude Code

    Atue como Claude Code com foco em frontend público + leitura server-side.
    Objetivo: entregar o fluxo de descoberta de produtos com boa performance.
    Entradas: schema Prisma, services de catálogo, páginas públicas e componentes.
    Saídas: listagem por categoria, card de produto, tela de detalhe e estados vazios.
    Proibido: guardar preço no cliente como fonte de verdade; inventar API externa.
    Critérios de aceite: catálogo responsivo, SEO básico e carregamento estável.
    Testes: smoke test de navegação e renderização server side.
    Relatório final: arquivos alterados, performance percebida e lacunas do checkout.

**R08 — CRUD de categorias**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar CRUD admin de categorias com ordenação e ativação/inativação.
    Entrada: src/app/admin/categorias, server actions/route handlers, schemas.
    Saídas: tabela/lista, formulário, ordenação, soft toggle isActive.
    Restrições: não alterar produtos nesta etapa.
    Testes: criar, editar, reordenar, inativar, validar slug/nome duplicado.
    Esperado: categorias gerenciáveis pelo admin com RBAC.
    Relatório final: actions criadas, validações e como testar rapidamente.

Prompt Claude Code

    Atue como Claude Code para uma tarefa pequena e isolada.
    Objetivo: entregar o módulo administrativo de categorias ponta a ponta.
    Entradas: rotas admin, schema Category, componentes base do painel.
    Saídas: página de categorias, action de persistência, feedback visual e estados de erro.
    Proibido: refatorar produtos, mudar a modelagem de pedidos, trocar layout global.
    Critérios de aceite: operações de CRUD e ordenação funcionam sem quebrar o painel.
    Testes: formulário válido/inválido, duplicidade e verificação de permissão.
    Relatório final: diff, validações, comandos e observações.

**R09 — CRUD de produtos e upload**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar CRUD admin de produtos com disponibilidade e upload de imagem seguro.
    Entrada: Product/ProductImage models, admin/produtos, storage adapter.
    Saídas: listagem, create/edit, toggle disponibilidade, upload por adapter com validação.
    Restrições: sem crop avançado; sem CDN complexa se não for necessária.
    Testes: criar produto, editar preço, marcar indisponível, upload válido/inválido.
    Esperado: catálogo administrável sem risco básico de upload.
    Relatório final: adapter escolhido, limites aplicados e fallback de imagem.

Prompt Claude Code

    Atue como Claude Code com foco em backoffice de produtos.
    Objetivo: permitir ao staff manter o catálogo atualizado com segurança.
    Entradas: Product schema, Category relations, componentes de formulário e storage util.
    Saídas: ProductForm, actions/handlers, validação de imagem, feedback de sucesso/erro.
    Proibido: aceitar qualquer Content-Type sem validação real; armazenar uploads no webroot sem critério.
    Critérios de aceite: produto aparece no catálogo público após criação/edição válida.
    Testes: upload acima do limite, extensão inválida, slug duplicado, produto inativo.
    Relatório final: arquivos modificados, testes realizados e riscos residuais.

**R10 — Carrinho**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar carrinho client-side com persistência local e resumo consistente.
    Entrada: rotas /carrinho, componentes de cart, services de validação de preço.
    Saídas: add/remove/update qty, observações, subtotal local, persistência segura.
    Restrições: o total final não pode depender apenas do cliente.
    Testes: adicionar/remover itens, persistir reload, recalcular quando produto ficar indisponível.
    Esperado: carrinho funcional e pronto para ser validado pelo checkout no servidor.
    Relatório final: modelo de estado do carrinho, pontos de validação server-side e como testar.

Prompt Claude Code

    Atue como Claude Code para UX de carrinho e integridade básica.
    Objetivo: criar a experiência de carrinho sem violar a regra de fonte de verdade no backend.
    Entradas: componentes públicos, Product types, utilitários de moeda e storage.
    Saídas: store do carrinho, drawer/página, resumo e mensagens de inconsistência.
    Proibido: gravar preço confiável apenas no localStorage; acoplar o carrinho ao banco.
    Critérios de aceite: ações do carrinho são previsíveis e resilientes a refresh.
    Testes: itens duplicados, quantidade zero, produto removido do catálogo.
    Relatório final: arquitetura do estado, componentes criados e gaps do checkout.

**R11 — Checkout e criação idempotente de pedido**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar checkout e criação idempotente de pedidos.
    Entrada: schemas de checkout, services/order, página /checkout, route/action de create order.
    Saídas: formulário completo, validação server-side, recálculo de total, geração de code e proteção contra submissão duplicada.
    Restrições: sem gateway online obrigatório nessa etapa; pagamento manual deve funcionar.
    Testes: entrega e retirada, bairro inválido, mudança de preço, double submit, pedido com item indisponível.
    Esperado: pedido persistido com snapshots corretos e tela de confirmação.
    Relatório final: fluxo implementado, idempotência usada e cenários cobertos.

Prompt Claude Code

    Atue como Claude Code com escopo estrito no agregado Order.
    Objetivo: fechar o fluxo cliente -> checkout -> pedido salvo.
    Entradas: models Customer/Address/Order/OrderItem/Payment, página de checkout, cart store.
    Saídas: action/handler de create order, schemas Zod, feedback de erro e sucesso.
    Proibido: confiar no total vindo do cliente; chamar gateway externo dentro da transação principal.
    Critérios de aceite: pedido salvo corretamente em todos os cenários válidos.
    Testes: happy path, falha de validação, idempotência, rollback transacional.
    Relatório final: contratos de entrada/saída, testes e riscos.

**R12 — Painel de pedidos e status**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar painel admin de pedidos com filtros, detalhe e transições de status.
    Entrada: admin/pedidos, services/order, enums de status, auth guards.
    Saídas: lista, detalhe, filtros por status/período, action de mudança de status com trilha de auditoria.
    Restrições: sem analytics complexo aqui; foco operacional.
    Testes: transições válidas/inválidas, cancelamento, atualização da fila e bloqueio por role.
    Esperado: staff consegue operar o ciclo do pedido com segurança.
    Relatório final: regras de transição aplicadas e ações auditadas.

Prompt Claude Code

    Atue como Claude Code para operação administrativa.
    Objetivo: dar visão operacional de pedidos ao staff.
    Entradas: modelos Order/Payment/Customer, rotas admin, componentes do painel.
    Saídas: tabela/lista de pedidos, detalhe rico, filtros e mudança de status validada.
    Proibido: permitir salto de status sem validação; expor dados sensíveis sem necessidade.
    Critérios de aceite: pedido pode ser acompanhado e operado ponta a ponta pelo admin.
    Testes: filtros, cancelamento, transição fora da ordem, permissão por papel.
    Relatório final: diffs, cenários testados e eventuais débitos.

**R13 — Cozinha e fulfillment**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: criar a tela de cozinha e o fluxo de fulfillment.
    Entrada: admin/cozinha, services/order, components/kitchen.
    Saídas: fila de RECEBIDO/EM_PREPARO/PRONTO, polling simples, visualização de observações e ações rápidas.
    Restrições: sem integração com impressora térmica como dependência do MVP.
    Testes: atualização periódica, legibilidade em tela grande, mudança de status rápida, fila vazia.
    Esperado: cozinha opera sem depender do painel administrativo completo.
    Relatório final: abordagem usada para atualização e limitações conhecidas.

Prompt Claude Code

    Atue como Claude Code com foco em operação de cozinha.
    Objetivo: entregar uma tela rápida de leitura e execução.
    Entradas: enum de status, service de pedidos abertos, componentes admin.
    Saídas: board de cozinha, badges, timers simples/opcionais e ações de status.
    Proibido: websocket complexo se polling resolver o MVP; hardware de impressão.
    Critérios de aceite: operador da cozinha enxerga e movimenta pedidos com poucos cliques.
    Testes: painel com muitos pedidos, observações longas e mutações concorrentes leves.
    Relatório final: UX operacional, trade-offs e próximos passos.

**R14 — Pagamentos e webhooks**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: criar a camada de integração de pagamentos com adapter e webhook idempotente.
    Entrada: services/payment, app/api/webhooks/pagamento/route.ts, Payment model.
    Saídas: interface PaymentProvider, adapter sandbox, persistência de providerRef, webhook com assinatura/idempotência.
    Restrições: foco em sandbox/MVP; não espalhar lógica de gateway pela aplicação.
    Testes: criação de pagamento sandbox, webhook duplicado, assinatura inválida, reconciliação de status.
    Esperado: status de pagamento refletido no pedido sem efeitos colaterais duplicados.
    Relatório final: contrato do adapter, pontos de extensão e cenários cobertos.

Prompt Claude Code

    Atue como Claude Code para integração externa desacoplada.
    Objetivo: inserir pagamentos sem contaminar o domínio principal.
    Entradas: modelo Payment, agregado Order, rotas de webhook e settings/env.
    Saídas: adapter, handler de webhook, feature flag e logs mínimos de reconciliação.
    Proibido: acoplar diretamente a UI a SDK do gateway; processar webhook sem idempotência.
    Critérios de aceite: gateway pode ser desligado/substituído sem reescrever pedidos.
    Testes: happy path sandbox, retry do webhook, falha de assinatura e timeout.
    Relatório final: arquivos alterados, contratos e rollback sugerido.

**R15 — Delivery, settings, dashboard e analytics**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: implementar configurações da loja, áreas de entrega, dashboard inicial e analytics de eventos.
    Entrada: StoreSettings, DeliveryArea, OperatingHour, admin/dashboard, analytics util.
    Saídas: CRUD de configurações, cálculo de taxa fixa por área, métricas-base e eventos GA4/server analytics.
    Restrições: sem roteirização avançada se não for necessário; sem BI complexo.
    Testes: loja fechada, pedido abaixo do mínimo, taxa por bairro, dashboard diário, evento de conversão.
    Esperado: operação configurável e métricas confiáveis do MVP.
    Relatório final: fórmulas usadas, pontos de auditoria e backlog de evolução.

Prompt Claude Code

    Atue como Claude Code com foco em regras operacionais e métricas.
    Objetivo: consolidar configuração da loja, entrega e visão de negócio do MVP.
    Entradas: models de settings/delivery/order/payment, rotas admin e util de analytics.
    Saídas: página de configurações, regras de abertura/fechamento, dashboard básico e integração de eventos.
    Proibido: cálculo de distância em produção sem feature flag; sobrecarregar o dashboard com métricas instáveis.
    Critérios de aceite: loja consegue operar com taxa, horário e mínimo configuráveis.
    Testes: cenários de bairro, horário fechado e consistência do dashboard.
    Relatório final: regras implementadas, limitações e próximos passos.

**R16 — CI/CD, deploy, observabilidade e escala**

Prompt Codex

    Você é o OpenAI Codex atuando no repositório burger-shop-system.
    Tarefa: preparar CI/CD, deploy de staging/produção, observabilidade e readiness de escala.
    Entrada: .github/workflows, Dockerfile (se houver), manifests k8s, health routes, observability utils.
    Saídas: workflow de CI, pipeline de deploy, healthchecks, logs estruturados, métricas/traces, backup checklist.
    Restrições: sem introduzir plataforma desnecessária além da estratégia aprovada.
    Testes: pipeline verde, deploy em staging, rollback simples, probes respondendo, alertas mínimos.
    Esperado: release controlado, rastreável e com fallback operacional.
    Relatório final: pipeline, comandos, runbook de rollback e riscos residuais.

Prompt Claude Code

    Atue como Claude Code para plataforma e produção.
    Objetivo: fechar a trilha de entrega contínua e operação segura.
    Entradas: workflow atual, configs de ambiente, manifests, health endpoints, docs operacionais.
    Saídas: CI/CD funcional, deploy em staging/prod, observabilidade mínima e runbooks.
    Proibido: automatizar push para produção sem gate; deixar segredo em arquivo versionado.
    Critérios de aceite: pipeline reprodutível, rollback testado e sinais de saúde disponíveis.
    Testes: lint/typecheck/test/build no CI, deploy em staging, probes, fluxo de rollback.
    Relatório final: arquivos alterados, como operar, como desfazer.

## Entrega, segurança, operação e escalabilidade

A linha de DevSecOps recomendada é: **CI forte em pull request, CD com aprovações explícitas, health routes, rollback rápido e observabilidade desde o staging**. O GitHub Actions documenta o uso de `actions/setup-node`, cache de dependências com `cache: 'npm'` e estratégia de matrix para múltiplas versões de Node. Kubernetes documenta Deployments declarativos, Services para expor grupos de Pods e readiness probes para evitar tráfego em contêineres ainda não prontos. [\[14\]](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs)

**Exemplo de workflow GitHub Actions**

    name: ci

    on:
      pull_request:
      push:
        branches: [main, develop]

    jobs:
      build-test:
        runs-on: ubuntu-latest
        strategy:
          matrix:
            node-version: ['20.x']
        services:
          postgres:
            image: postgres:16
            env:
              POSTGRES_USER: app
              POSTGRES_PASSWORD: app
              POSTGRES_DB: burger_shop_test
            ports:
              - 5432:5432
            options: >-
              --health-cmd="pg_isready -U app -d burger_shop_test"
              --health-interval=10s
              --health-timeout=5s
              --health-retries=5

        env:
          DATABASE_URL: postgresql://app:app@localhost:5432/burger_shop_test
          AUTH_SECRET: test-secret
          NODE_ENV: test

        steps:
          - uses: actions/checkout@v6
          - uses: actions/setup-node@v4
            with:
              node-version: ${{ matrix.node-version }}
              cache: npm
          - run: npm ci
          - run: npx prisma generate
          - run: npx prisma migrate deploy
          - run: npm run lint
          - run: npm run typecheck
          - run: npm run test -- --runInBand
          - run: npm run build

O snippet acima combina o padrão de matrix/cache documentado pelo GitHub com um serviço PostgreSQL para testes de integração. [\[15\]](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs)

**Exemplo de manifest Kubernetes**

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: burger-shop-web
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: burger-shop-web
      template:
        metadata:
          labels:
            app: burger-shop-web
        spec:
          containers:
            - name: web
              image: ghcr.io/acme/burger-shop-web:1.0.0
              ports:
                - containerPort: 3000
              envFrom:
                - secretRef:
                    name: burger-shop-secrets
              readinessProbe:
                httpGet:
                  path: /api/health/ready
                  port: 3000
                initialDelaySeconds: 5
                periodSeconds: 5
              livenessProbe:
                httpGet:
                  path: /api/health/live
                  port: 3000
                initialDelaySeconds: 15
                periodSeconds: 10
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: burger-shop-web
    spec:
      selector:
        app: burger-shop-web
      ports:
        - port: 80
          targetPort: 3000
      type: ClusterIP

Esse desenho segue diretamente a documentação de Deployment, Service e probes do Kubernetes: Deployment para atualizações declarativas, Service para abstrair Pods efêmeros e readiness probe para impedir o envio de tráfego antes do contêiner estar apto. [\[6\]](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Na segurança, o mínimo aceitável para o MVP é: senha com hash robusto, cookie de sessão `HttpOnly + Secure + SameSite`, RBAC no servidor, variáveis de ambiente segregadas, rate limiting de login, logs de ações administrativas e upload seguro. A OWASP recomenda que **não se confie em** `Content-Type`, que se valide extensão/assinatura/tamanho do arquivo, que arquivos tenham nome gerado pela aplicação e que, preferencialmente, sejam armazenados fora do webroot ou em host separado. [\[16\]](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

Para upload de imagens do catálogo, a orientação objetiva é esta: aceitar apenas extensões previstas para negócio, impor limite de tamanho, renomear arquivos, validar conteúdo real e armazenar em storage controlado — S3/R2/Blob ou storage separado — evitando servir uploads diretamente da raiz pública da aplicação. Isso reduz risco operacional e facilita CDN no futuro. [\[17\]](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

Na observabilidade, o caminho mais equilibrado é: **logs estruturados + métricas de negócio + traces**. O ecossistema OpenTelemetry trata sinais de **traces, metrics e logs**; Prometheus foca em séries temporais e recording rules; e Grafana centraliza visualização e alertas. Para este sistema, os painéis mais úteis são: latência por rota, erro por endpoint, pedidos por status, webhooks entregues/falhos, taxa de conversão de checkout, tempo entre `RECEBIDO` e `PRONTO`, e backlog de cozinha. [\[18\]](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)

Em integrações futuras, a ordem de menor para maior risco é: **wa.me / mensagem pronta**, depois **Pix manual**, depois **gateway com webhook**, depois **taxa por distância/Routes API**, depois **integrações de delivery/ecossistema externo**. Isso preserva o princípio do documento-fonte de não transformar pagamento online, iFood, emissão fiscal ou impressão térmica em dependência do MVP.

## Cronograma, alocação, critérios de pronto e recomendação final

Para um **desenvolvedor solo trabalhando 8h/dia com apoio de ChatGPT, Codex e Claude Code**, a estimativa realista é esta:

| Faixa                                                                 | Duração                |
| --------------------------------------------------------------------- | ---------------------- |
| Planejamento e fundação                                               | 1–2 semanas            |
| MVP enxuto operável                                                   | 6–8 semanas            |
| MVP completo com painel, cozinha e dashboard básico                   | 10–12 semanas          |
| Habilitação de pagamento, analytics, CI/CD, staging e observabilidade | +2 semanas             |
| Readiness para uso real com hardening e rollback validado             | 12–14 semanas no total |

Para uma **squad enxuta** com 2 full-stacks, 1 QA parcial e 1 DevOps parcial, o mesmo escopo cai para **6–8 semanas**, desde que revisão de PR, validações manuais e critérios de aceite sejam respeitados.

Os marcos de aceite do MVP são objetivos. O MVP está pronto quando o cliente consegue navegar no cardápio, montar um carrinho, fechar checkout, criar um pedido e receber confirmação; o pedido é salvo no banco com snapshots corretos; o admin consegue ver o pedido, alterar status e operar a cozinha; categorias e produtos são gerenciáveis; a loja consegue ajustar disponibilidade e regras básicas; o dashboard diário fecha sem divergência relevante; a autenticação admin está funcional e protegida; o deploy de staging e produção é reprodutível; e o rollback para a release anterior é executável em minutos. Isso é uma tradução direta dos objetivos do documento-fonte para critérios verificáveis.

A recomendação final, portanto, é esta: **começar por um modular monolith em Next.js**, proteger cedo o admin, gravar snapshots de preço e itens no pedido, adotar webhooks idempotentes para pagamentos, manter integrações atrás de adapters e feature flags, usar Vercel no início e deixar Kubernetes/VPS robusto para quando houver necessidade real de controle maior de runtime e custos. Essa linha honra o escopo obrigatório do arquivo, segue as práticas do App Router, das sessões seguras e do deployment moderno documentadas pelos fornecedores oficiais, e reduz o risco mais frequente em produtos assistidos por IA: tentar fazer demais cedo demais. [\[19\]](https://nextjs.org/docs/app/getting-started/server-and-client-components)

[\[1\]](https://nextjs.org/docs/app/getting-started/server-and-client-components) [\[7\]](https://nextjs.org/docs/app/getting-started/server-and-client-components) [\[19\]](https://nextjs.org/docs/app/getting-started/server-and-client-components) Getting Started: Server and Client Components \| Next.js

<https://nextjs.org/docs/app/getting-started/server-and-client-components>

[\[2\]](https://authjs.dev/concepts/session-strategies) Auth.js \| Session Strategies

<https://authjs.dev/concepts/session-strategies>

[\[3\]](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview) [\[9\]](https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview) Prisma Migrate: Database, Schema, SQL Migration Tool \| Prisma Documentation

<https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/overview>

[\[4\]](https://nextjs.org/docs/app) Next.js Docs: App Router \| Next.js

<https://nextjs.org/docs/app>

[\[5\]](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool) Connection pool \| Prisma Documentation

<https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool>

[\[6\]](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) Deployments \| Kubernetes

<https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>

[\[8\]](https://authjs.dev/getting-started/providers/credentials) Auth.js \| Credentials

<https://authjs.dev/getting-started/providers/credentials>

[\[10\]](https://vercel.com/docs/frameworks/nextjs) Next.js on Vercel

<https://vercel.com/docs/frameworks/nextjs>

[\[11\]](https://github.com/mermaid-js/mermaid-cli) GitHub - mermaid-js/mermaid-cli: Command line tool for the Mermaid library · GitHub

<https://github.com/mermaid-js/mermaid-cli>

[\[12\]](https://www.prisma.io/docs/orm/prisma-client/queries/transactions) Transactions and batch queries (Reference) \| Prisma Documentation

<https://www.prisma.io/docs/orm/prisma-client/queries/transactions>

[\[13\]](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/overview) Documentación - Mercado Pago Developers

<https://www.mercadopago.com.br/developers/pt/docs/checkout-api/overview>

[\[14\]](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs) [\[15\]](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs) Building and testing Node.js - GitHub Docs

<https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs>

[\[16\]](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) [\[17\]](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) File Upload - OWASP Cheat Sheet Series

<https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html>

[\[18\]](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/) Node.js \| OpenTelemetry

<https://opentelemetry.io/docs/languages/js/getting-started/nodejs/>
