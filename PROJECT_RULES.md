# PROJECT_RULES.md — Regras do projeto burger-shop-system

Este documento concentra as regras técnicas, funcionais, segurança e produto do sistema de hamburgueria. Deve ser lido antes de qualquer implementação, revisão, auditoria, refatoração ou documentação operacional no repositório.

---

## 1. Visão geral

O `burger-shop-system` é um sistema web single-store para uma hamburgueria. O MVP deve entregar uma operação funcional e segura sem sobre-engenharia.

### Público cliente

- visualiza cardápio público;
- navega por categorias e produtos;
- visualiza imagens e detalhes;
- seleciona adicionais/opcionais quando disponíveis;
- monta carrinho;
- preenche checkout;
- escolhe entrega/retirada e pagamento manual no MVP;
- acompanha pedido por código.

### Equipe interna

- acessa painel administrativo protegido;
- gerencia categorias, produtos, adicionais e imagens;
- acompanha pedidos;
- altera status conforme fluxo permitido;
- usa tela de cozinha;
- gerencia horários, taxas, áreas de entrega e configurações da loja;
- consulta dashboard operacional;
- deixa trilha de auditoria administrativa.

### Escopo inicial

O MVP é single-store. Não implementar multiunidade, marketplace, aplicativo nativo, gateway real obrigatório, estoque avançado, emissão fiscal, logística dinâmica ou fila distribuída sem ADR específico.

---

## 2. Fonte de verdade e escopo

Antes de alterar qualquer coisa:

1. leia `PROJECT_RULES.md`;
2. leia `AGENTS.md`;
3. leia `CLAUDE.md`, quando estiver usando Claude Code;
4. leia `CODEX.md`, quando estiver usando Codex ou houver continuidade;
5. leia `.codex/instructions.md`, quando estiver usando Codex;
6. leia `README.md` e `README-IA.md`, se existirem;
7. identifique branch atual;
8. verifique `git status`;
9. identifique stack real e scripts disponíveis;
10. leia os arquivos diretamente relacionados ao escopo;
11. entenda o fluxo afetado;
12. planeje a menor alteração suficiente.

Toda tarefa deve respeitar o escopo solicitado. Antes de editar, formalize conforme a complexidade:

- objetivo;
- comportamento atual;
- comportamento esperado;
- arquivos prováveis;
- arquivos proibidos;
- critérios de aceite;
- validações necessárias;
- riscos.

É proibido:

- alterar arquivos fora do escopo sem necessidade técnica clara;
- misturar feature pequena com refatoração ampla;
- modificar arquitetura global sem justificativa e validação humana;
- instalar dependências sem aprovação;
- remover código sem entender impacto;
- ampliar escopo sem informar justificativa, risco e alternativa de menor impacto;
- alterar contrato de API/Server Action sem revisar consumidores;
- alterar autenticação/autorização sem análise específica;
- executar deploy sem autorização explícita;
- declarar sucesso sem evidência de validação.

---

## 3. Stack obrigatória

```txt
Next.js App Router
React.js
TypeScript
Tailwind CSS
PostgreSQL
Prisma
Auth.js
Zod
Server Components por padrão
Client Components apenas onde houver interatividade
Server Actions para mutações internas
Route Handlers para APIs, health checks e webhooks
```

Restrições:

- Não migrar para Pages Router.
- Não criar backend separado sem ADR e autorização.
- Não trocar Prisma/PostgreSQL sem ADR e autorização.
- Não substituir Auth.js por solução caseira sem ADR e autorização.
- Não usar estado client-side como fonte de verdade para preço, pagamento, pedido ou permissão.
- Não transformar tudo em Client Components.
- Não criar APIs públicas desnecessárias para mutações internas que podem ser Server Actions protegidas.

---

## 4. Arquitetura Next.js App Router

### Regra de ouro

- Página e leitura de dados: Server Components + services server-side.
- Interatividade local: Client Components pequenos e isolados.
- Mutações internas autenticadas: Server Actions.
- APIs públicas, health checks e webhooks: Route Handlers.
- Validação de entrada: Zod no servidor.
- Acesso ao banco: Prisma apenas no servidor.

### Estrutura recomendada

```txt
src/app/(public)/
src/app/admin/
src/app/api/
src/components/ui/
src/components/public/
src/components/admin/
src/components/kitchen/
src/lib/auth/
src/lib/prisma/
src/lib/env/
src/lib/observability/
src/services/catalog/
src/services/cart/
src/services/checkout/
src/services/order/
src/services/payment/
src/services/delivery/
src/actions/
src/schemas/
src/types/
prisma/
```

### Regras

- Nunca importe Prisma Client em Client Component.
- Não coloque secrets em `NEXT_PUBLIC_*`.
- Use `revalidatePath`/`revalidateTag` após mutações que afetam páginas cacheadas, quando aplicável.
- `use client` deve aparecer apenas onde houver estado, event handlers, efeitos, APIs de browser ou stores locais.
- Componentes de UI devem ser puros sempre que possível.
- Server Actions sensíveis devem validar sessão, role e payload.
- Route Handlers sensíveis devem validar método HTTP, autenticação, assinatura/idempotência e rate limit quando aplicável.

---

## 5. Modelo de domínio mínimo

Entidades esperadas para o MVP ou MVP+:

```txt
User
Category
Product
ProductImage
Additional
ProductAdditional
Customer
Address
Order
OrderItem
OrderItemAdditional
Payment
DeliveryArea
StoreSettings
OperatingHour
AuditLog
```

Regras de modelagem:

- `Order.code` deve ser único e seguro para consulta pública limitada.
- `OrderItem` deve gravar snapshot de nome, preço e quantidade vendidos.
- `Payment` deve registrar método, status, provider e referência futura.
- `AuditLog` deve registrar ações administrativas relevantes.
- Slugs de categoria/produto devem ser únicos.
- Preços devem usar tipo decimal no banco e conversão segura na camada de domínio.
- Estados devem usar enum quando o conjunto for fechado.

---

## 6. Autenticação, sessão e RBAC

### Roles iniciais

```txt
OWNER      acesso total administrativo
MANAGER    catálogo, pedidos, dashboard e configurações operacionais
ATTENDANT  atendimento e pedidos
KITCHEN    tela de cozinha e status operacionais permitidos
```

### Matriz mínima de autorização

| Área | Roles autorizadas |
|---|---|
| Autenticação inicial e bootstrap E03 | `OWNER` |
| Dashboard administrativo | `OWNER`, `MANAGER` |
| Categorias e produtos | `OWNER`, `MANAGER` |
| Pedidos e atendimento | `OWNER`, `MANAGER`, `ATTENDANT` |
| Cozinha e transições operacionais permitidas | `OWNER`, `MANAGER`, `KITCHEN` |
| Configurações operacionais | `OWNER`, `MANAGER` |
| Usuários, roles e permissões | `OWNER` |

Na E03, `OWNER` é o baseline seguro e exclusivo de acesso ao painel. As demais
roles devem ser habilitadas incrementalmente quando seus módulos existirem.
Autenticar uma role não concede acesso global ao painel: cada Server Action,
Route Handler e serviço sensível deve autorizar a operação conforme a matriz.
`KITCHEN` não acessa catálogo, configurações ou dados pessoais desnecessários;
`ATTENDANT` não altera catálogo, usuários ou configurações.

### Regras

- Admin/staff não autenticado não acessa área interna.
- Usuário inativo não autentica e não executa mutações.
- Toda Server Action administrativa deve validar sessão e role.
- Todo Route Handler administrativo deve validar sessão e role.
- Não confiar em role vinda do client-side.
- Sessão deve usar cookie seguro/HttpOnly via Auth.js.
- Alterações de senha, role, usuário ativo/inativo e permissões devem gerar `AuditLog`.
- Seed de admin deve usar senha forte via variável de ambiente apenas em `.env.example`; nunca hard-code de senha real.

### Áreas sensíveis

- `src/lib/auth/**`
- `src/middleware.ts`
- `src/actions/**` administrativas
- `src/app/admin/**`
- `src/app/api/**` com autenticação
- `prisma/schema.prisma` em modelos `User`, `Session`, `Account`, `AuditLog`

Mudanças nessas áreas exigem plano antes de implementação.

---

## 7. Prisma, banco e migrations

### Regras gerais

- `schema.prisma` é contrato central de dados.
- Migrations devem ser versionadas, pequenas e revisáveis.
- Não editar migration já aplicada em ambiente compartilhado sem autorização.
- Não executar `prisma migrate reset` sem autorização explícita.
- Não rodar migrations contra produção sem confirmação explícita do ambiente.
- Antes de `migrate dev`, confirmar que é ambiente local.
- Preferir constraints, índices e relações explícitas.
- Seeds devem ser idempotentes.

### Índices mínimos recomendados

```txt
Category.slug
Product.slug
Order.code
Order.status + Order.createdAt
Order.createdAt
Order.paymentStatus
Order.customerPhone, quando existir campo normalizado
DeliveryArea.isActive
AuditLog.createdAt
```

### Transações

Use transação Prisma para checkout/criação de pedido. Não coloque chamadas externas lentas dentro da transação. Webhooks devem ser idempotentes.

---

## 8. Catálogo, produtos, imagens e adicionais

### Catálogo público

- Deve listar apenas categorias/produtos ativos e disponíveis.
- Deve tratar estado vazio, loading e erro.
- Deve ser responsivo e mobile-first.
- Deve preservar SEO básico com metadata adequada.

### Admin de catálogo

- Criar, editar, ativar/desativar e ordenar categorias.
- Criar, editar, ativar/desativar produtos.
- Validar nome, slug, preço, categoria e disponibilidade com Zod.
- Não permitir preço negativo.
- Imagens devem ter `altText` e ordem.
- Upload ou storage real só deve ser implementado com política de segurança definida.

### Adicionais/opcionais

- Adicionais devem ter preço e disponibilidade próprios.
- Produtos devem declarar quais adicionais aceitam e quantidade máxima.
- Checkout deve gravar snapshot de adicionais vendidos.

---

## 9. Carrinho, checkout e pedidos

### Carrinho

- Pode usar estado client-side/localStorage para UX.
- Não é fonte de verdade para preço, estoque, taxa ou disponibilidade.
- Deve enviar payload mínimo para o servidor: produto, quantidade, adicionais e observações.

### Checkout

- Deve validar dados do cliente, telefone, endereço, delivery/retirada, forma de pagamento e observações.
- Deve recalcular subtotal, taxa, desconto e total no servidor.
- Deve validar horário de funcionamento e pedido mínimo.
- Deve criar pedido de forma idempotente quando possível.
- Deve gravar snapshots de produtos/adicionais.
- Deve retornar código de acompanhamento seguro.

### Pedidos

Status sugeridos:

```txt
RECEIVED
CONFIRMED
IN_PREPARATION
READY
OUT_FOR_DELIVERY
DELIVERED
CANCELLED
```

Transições devem ser validadas por serviço de domínio. Cancelamento deve registrar motivo e ator quando feito pelo admin.

---

## 10. Tela de cozinha e fluxo operacional

- A tela de cozinha deve priorizar legibilidade, contraste, tempo de preparo e agrupamento por status.
- Usuário `KITCHEN` deve acessar apenas o necessário.
- Alterações de status devem respeitar transições permitidas.
- Polling simples é aceitável no MVP; realtime só com necessidade real.
- Impressão via navegador é opcional e não deve bloquear MVP.
- Não expor dados pessoais além do necessário para preparo.

---

## 11. Pagamento manual, Pix/gateway futuro e webhooks

### MVP

- Pagamento manual é permitido: dinheiro, cartão na entrega/retirada, Pix manual informado fora do gateway.
- O sistema deve registrar `Payment.method` e `Payment.status`.
- Não implementar cobrança real sem ADR e validação de segurança.

### Futuro gateway/Pix

- Usar adapter em `src/services/payment/`.
- Webhook deve ser Route Handler.
- Webhook deve validar assinatura, idempotência, providerRef e status.
- Não confiar em payload sem validação.
- Não atualizar pedido pago sem reconciliação mínima.
- Não expor chaves do gateway.

---

## 12. Store settings, horários e delivery

- `StoreSettings` define nome, WhatsApp, abertura manual, tempo médio, pedido mínimo e flags operacionais.
- `OperatingHour` define horários por dia da semana.
- `DeliveryArea` define área/bairro, taxa, pedido mínimo e disponibilidade.
- Checkout deve validar se a loja aceita pedido naquele momento.
- Mudanças em horários, taxas e pedido mínimo devem gerar `AuditLog`.
- Cálculo dinâmico por distância não entra no MVP sem ADR.

---

## 13. UI/UX e Tailwind

### Direção visual

- Mobile-first.
- Interface pública rápida, clara e focada em conversão.
- Admin objetivo e denso o suficiente para operação.
- Cozinha com botões grandes, contraste e leitura rápida.

### Regras

- Preferir Tailwind com componentes reutilizáveis.
- Não introduzir biblioteca visual sem aprovação.
- Não criar estilos globais grandes sem necessidade.
- Estados de loading, erro, vazio e sucesso devem ser tratados.
- Formulários devem exibir erros próximos ao campo.
- Botões devem ter estado disabled/loading quando mutações estão pendentes.
- Navegação pública e admin devem funcionar em mobile.
- Acessibilidade básica: label, foco visível, contraste, sem botões falsos.

---

## 14. Observabilidade básica

- Health checks em Route Handlers: `app/api/health/live/route.ts` e `app/api/health/ready/route.ts`.
- Logs não devem expor dados sensíveis.
- Erros de checkout/pedido devem ter mensagem segura para o usuário e detalhe controlado no servidor.
- Auditoria administrativa deve registrar quem fez o quê, quando e em qual entidade.

---

## 15. Segurança e secrets

É proibido:

- ler `.env` ou `.env.*`;
- editar `.env` ou `.env.*`;
- expor secrets em código, relatório, print ou log;
- usar `NEXT_PUBLIC_*` para segredo;
- executar `curl`, `wget`, `ssh`, `sudo` ou deploy sem autorização;
- criar permissões admin baseadas em dado do client;
- aceitar payload de checkout/pagamento sem validação server-side;
- registrar senha, token, cookie ou chave em log;
- commitar `settings.local.json`.

Use `.env.example` apenas com nomes de variáveis e placeholders.

---

## 16. Padrão de implementação incremental

Toda implementação deve ser:

- incremental;
- localizada;
- simples;
- testável;
- reversível;
- compatível com a arquitetura atual;
- pequena o suficiente para revisão humana.

Prefira:

- menor mudança suficiente;
- nomes explícitos;
- tipagem clara;
- Zod para entrada externa;
- services server-side para regra de negócio;
- Server Components por padrão;
- Client Components pequenos;
- Server Actions protegidas para mutações internas;
- Route Handlers para health/webhooks/API externa.

Evite:

- overengineering;
- abstrações prematuras;
- duplicação desnecessária;
- lógica de negócio complexa em componente visual;
- mocks permanentes;
- dependências novas sem necessidade comprovada;
- reformatação de arquivos inteiros sem relação com a tarefa.

---

## 17. Validação

Antes de executar qualquer comando, confirme scripts reais no `package.json`.

Comandos possíveis, se existirem:

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test
npm run test:unit
npm run test:e2e
npx prisma validate
npx prisma generate
npx prisma migrate status
npx prisma migrate dev
npx prisma db seed
```

Critérios:

- Alteração em tipos/schemas/services: priorize `typecheck`, testes unitários e `prisma validate` se afetar Prisma.
- Alteração em UI: priorize `lint`, `typecheck`, `build` e validação manual responsiva.
- Alteração em banco: `prisma validate`, `prisma generate`, `migrate status`; `migrate dev` apenas local.
- Alteração em auth/RBAC: validar login, logout, acesso negado e acesso permitido por role.
- Alteração em checkout/pedidos: validar preço recalculado, snapshots, status inicial e idempotência.

Nunca declarar validação executada sem evidência.

---

## 18. Relatório final padrão

Todo relatório final deve conter:

```md
## Resumo

## Escopo solicitado

## Arquivos lidos

## Arquivos alterados

## Arquivos criados

## O que foi feito

## Decisões técnicas

## Validações executadas

## Validações não executadas

## Riscos e pendências

## Próximo passo recomendado

Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```

### Status

- `Aprovado`: escopo cumprido, validações relevantes executadas, sem risco residual relevante.
- `Aprovado com observações`: escopo cumprido, mas há validações não executadas, suposições, scripts ausentes ou risco residual não bloqueante.
- `Requer ajustes`: há problema relevante que deve ser corrigido antes de continuar.
- `Bloqueado`: falta informação, autorização, dependência, ambiente ou há risco alto sem mitigação.

---

## 19. Continuidade entre Codex e Claude Code

Ao finalizar tarefa que outro agente pode continuar, registre:

- branch atual;
- estado do Git;
- arquivos lidos;
- arquivos alterados/criados/removidos;
- decisões tomadas;
- riscos;
- validações executadas e não executadas;
- próximo passo sugerido;
- comando/skill sugerido para continuidade.
