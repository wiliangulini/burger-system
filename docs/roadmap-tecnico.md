# Roadmap Técnico — Sistema de Hamburgueria

**Arquivo de origem:** `Plano-Técnico-Operacional-Sistema-Hamburgueria-v2.md`  
**Objetivo deste documento:** transformar o planejamento técnico-operacional em um roadmap executável, dividido em etapas pequenas e gerenciáveis, sem incluir prompts de execução.  
**Escopo:** MVP de ecommerce para hamburgueria online com área pública, carrinho, checkout sem login do cliente e área administrativa protegida.  
**Stack fixada:** Next.js App Router, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, Auth.js/NextAuth, GitHub Actions e Vercel.

---

## 1. Diretriz central do roadmap

Este roadmap foi estruturado para evitar três problemas comuns em projetos assistidos por IA:

1. **Tarefas grandes demais**, que fazem o agente alterar muitos arquivos sem controle.
2. **Feature creep**, adicionando recursos fora do MVP antes da operação mínima funcionar.
3. **Arquitetura improvisada**, onde decisões fundamentais são tomadas tarde demais.

A ordem das etapas segue a lógica de dependência técnica:

1. Base do projeto e qualidade.
2. Modelagem de dados.
3. Autenticação e proteção admin.
4. CRUD administrativo.
5. Catálogo público.
6. Carrinho e checkout.
7. Pedidos, status e dashboard.
8. Configurações da loja.
9. Testes, acessibilidade, segurança, deploy e auditoria final.

---

## 2. Escopo fechado do MVP

### 2.1 Funcionalidades obrigatórias

O MVP deve entregar exatamente:

- Catálogo público com categorias e produtos.
- Carrinho de compras no cliente, sem login.
- Checkout com dados do cliente, forma de pagamento livre e persistência de pedido.
- Recálculo server-side de preços, taxa e total.
- Pedido com snapshot imutável de itens, preços, cliente, taxa e total.
- Código público curto do pedido.
- Idempotência no checkout.
- Login administrativo com Auth.js.
- Rotas `/admin/*` protegidas por sessão e role `ADMIN`.
- CRUD de categorias.
- CRUD de produtos.
- Upload seguro de imagens.
- Listagem e detalhe de pedidos no admin.
- Alteração controlada de status com histórico.
- Configurações básicas da loja.
- Dashboard admin resumido.
- Logs mínimos de eventos sensíveis.
- Testes mínimos do fluxo crítico.
- Deploy funcional em produção.

### 2.2 Fora do MVP

Não implementar nesta primeira versão:

- Gateway de pagamento.
- Pix automático ou webhook bancário funcional.
- Integração iFood/marketplaces.
- Emissão fiscal.
- Impressora térmica integrada.
- App mobile.
- Multi-loja/multitenant.
- Microserviços.
- Filas, Redis, workers assíncronos.
- Analytics avançado.
- Login de cliente.
- Login social.
- Internacionalização.
- Chat ao vivo.
- Painel complexo de BI.

Qualquer item acima deve ir para backlog pós-MVP.

---

## 3. Validação das decisões de arquitetura

Esta seção funciona como uma mini-ADR consolidada. Antes de iniciar a implementação, as decisões abaixo devem ser aceitas como restrições do projeto.

| Decisão | Validação técnica | Motivo | Risco se ignorada |
|---|---|---|---|
| Monolito modular em Next.js | A aplicação deve estar em um único projeto, separando módulos por domínio e rota. | Reduz complexidade operacional no MVP e mantém deploy simples. | Microserviços prematuros, duplicação de lógica, aumento de custo e manutenção. |
| Next.js App Router | Usar `/app`, layouts segmentados, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`. | App Router é adequado para RSC, Server Actions e rotas segmentadas. | Mistura confusa com Pages Router, perda de padrão e dificuldade de manutenção. |
| Server-first | Páginas de leitura e dados sensíveis devem ser Server Components quando possível. | Melhor SEO, menor exposição de lógica e menor JS no cliente. | Client Components excessivos, mais superfície de ataque e pior performance. |
| Client Components apenas onde necessário | Carrinho, formulários interativos, upload e estados locais usam `"use client"`. | Interatividade real exige estado no browser. | Hooks em Server Components, erros de runtime e acoplamento incorreto. |
| Prisma + PostgreSQL | Modelos, migrations e constraints devem ser definidos no Prisma. | Integridade relacional, tipagem e segurança no acesso a dados. | Dados inconsistentes, SQL manual frágil e dificuldade de evolução. |
| Decimal para preço | Campos financeiros devem usar `Decimal`, não `Float`. | Evita imprecisão monetária. | Totais incorretos por arredondamento. |
| Auth.js com Credentials Provider | Admin autentica por email/senha com hash forte. | Simples para MVP e compatível com painel administrativo. | Autenticação caseira insegura. |
| RBAC server-side | Toda mutação/admin deve verificar sessão e `role === ADMIN`. | Segurança não pode depender da UI. | Acesso indevido por requisições diretas. |
| Carrinho client-side | Carrinho fica em estado/localStorage até checkout. | Cliente não precisa de conta e reduz persistência desnecessária. | Banco poluído com carrinhos abandonados. |
| Checkout server-side | Backend recalcula preço, estoque, taxa e total. | Cliente nunca é fonte da verdade financeira. | Manipulação de preço pelo browser. |
| Idempotência no checkout | Cada tentativa de pedido deve ter `idempotencyKey` único. | Evita pedidos duplicados em clique duplo/reenvio. | Pedidos duplicados e inconsistência operacional. |
| Snapshot de pedido | Pedido salva cópia imutável dos dados financeiros e do cliente. | Histórico continua correto mesmo com alterações futuras de produto. | Pedido antigo muda semanticamente quando produto/preço é editado. |
| Máquina de estados de pedido | Transições válidas devem ser explícitas. | Evita fluxo operacional inválido. | Status inconsistentes e pedidos reabertos indevidamente. |
| Upload validado | PNG/JPEG, limite de tamanho, renomeação segura, validação no servidor. | Reduz risco de arquivos maliciosos e colisões. | Upload inseguro, path traversal, arquivos não esperados. |
| CI desde o início | GitHub Actions deve rodar lint, typecheck, testes e build. | Garante qualidade contínua por PR. | Quebras acumuladas e deploy instável. |
| Vercel como deploy inicial | Deploy simples com previews por PR. | Adequado para Next.js e MVP. | Infra manual precoce e maior custo operacional. |

---

## 4. Gates de validação por fase

Cada fase só deve ser considerada concluída quando passar por um gate técnico.

| Gate | Momento | O que valida |
|---|---|---|
| Gate 0 — Escopo e arquitetura | Antes de codar domínio | Stack, escopo MVP, estrutura modular e decisões críticas aceitas. |
| Gate 1 — Base técnica | Após bootstrap | Projeto compila, CI roda, lint/typecheck/build funcionam. |
| Gate 2 — Banco e domínio | Após models Prisma | Migrations aplicadas, constraints corretas, seed mínimo funcional. |
| Gate 3 — Segurança admin | Após Auth.js | Login, sessão, hash, RBAC e proteção `/admin/*`. |
| Gate 4 — Admin operacional | Após CRUDs | Admin gerencia categorias/produtos/configurações com validação. |
| Gate 5 — Fluxo público | Após catálogo/carrinho | Cliente navega, adiciona itens e prepara checkout. |
| Gate 6 — Pedido consistente | Após checkout | Pedido é criado com recálculo, snapshot, transação e idempotência. |
| Gate 7 — Operação de pedidos | Após status/dashboard | Admin processa pedido com histórico e métricas. |
| Gate 8 — Release candidate | Antes do deploy final | Testes E2E, acessibilidade, segurança, build e documentação. |
| Gate 9 — Produção | Após deploy | App acessível, envs corretas, migrations aplicadas e smoke test aprovado. |

---

## 5. Roadmap técnico detalhado

### Fase 0 — Preparação e congelamento de escopo

#### Etapa 0.1 — Consolidar premissas do MVP

**Objetivo:** transformar o planejamento em uma lista imutável de decisões para a primeira versão.

**Tarefas:**

- Confirmar que o MVP é de loja única.
- Confirmar PT-BR e moeda em reais.
- Confirmar ausência de login do cliente.
- Confirmar que o admin é o único usuário autenticado.
- Confirmar pagamento manual/offline no MVP.
- Confirmar ausência de integrações externas reais no MVP.
- Registrar em `docs/decisoes-arquitetura.md` ou `docs/adr/0001-escopo-mvp.md`.

**Validação arquitetural:**

- O escopo não deve conter recursos pós-MVP.
- A arquitetura deve continuar monolítica.
- Nenhum requisito deve exigir microserviço, fila, app mobile ou gateway.

**Critérios de aceite:**

- Documento de decisões criado.
- Backlog pós-MVP separado do MVP.
- Itens ambíguos marcados como premissas, não como tarefas obrigatórias.

**Riscos:**

- Começar a codar sem definir fronteiras do MVP.
- Incluir integrações futuras como obrigação inicial.

---

#### Etapa 0.2 — Definir convenções de trabalho

**Objetivo:** padronizar execução, revisão e versionamento antes da implementação.

**Tarefas:**

- Definir branch principal: `main`.
- Definir branches por tarefa: `feature/<id>-<slug>`, `fix/<id>-<slug>`.
- Definir padrão de commit semântico.
- Criar checklist de PR.
- Criar `docs/roteiro-desenvolvimento.md`.
- Definir que cada PR deve ser pequeno e revisável.

**Validação arquitetural:**

- O workflow deve impedir alterações gigantes sem revisão.
- Cada PR deve ter critério de aceite e validação de segurança.

**Critérios de aceite:**

- Checklist de PR versionado.
- README inicial menciona fluxo de branches.
- Nenhum commit direto em `main` deve ser usado após a configuração.

---

### Fase 1 — Bootstrap técnico e qualidade de base

#### Etapa 1.1 — Inicializar projeto Next.js

**Objetivo:** criar a base do projeto com stack correta.

**Tarefas:**

- Criar projeto Next.js com App Router.
- Habilitar TypeScript.
- Configurar Tailwind CSS.
- Confirmar estrutura `/app`.
- Criar layout público inicial.
- Criar página inicial simples de sanity.
- Configurar aliases de importação, por exemplo `@/*`.

**Arquivos esperados:**

- `package.json`
- `tsconfig.json`
- `tailwind.config.ts`
- `postcss.config.js`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

**Validação arquitetural:**

- Não usar Pages Router.
- Não iniciar com estrutura de microfrontend.
- Não criar lógica de domínio ainda.

**Critérios de aceite:**

- `npm run dev` inicia sem erro.
- `npm run build` passa.
- A página inicial renderiza.

**Comandos de validação:**

```bash
npm run dev
npm run build
```

---

#### Etapa 1.2 — Configurar qualidade mínima

**Objetivo:** impedir que problemas básicos de padrão e tipo avancem.

**Tarefas:**

- Configurar ESLint.
- Configurar Prettier.
- Configurar script de typecheck.
- Padronizar scripts no `package.json`.
- Criar `.editorconfig`.
- Criar `.prettierignore`.
- Criar `.eslintignore`, se necessário.

**Scripts esperados:**

```json
{
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "build": "next build",
  "test": "jest"
}
```

**Validação arquitetural:**

- TypeScript deve ser obrigatório.
- Não permitir `any` sem justificativa.
- Não permitir código que compile com erros silenciosos.

**Critérios de aceite:**

- `npm run lint` passa.
- `npm run typecheck` passa.
- `npm run build` passa.

---

#### Etapa 1.3 — Configurar testes base

**Objetivo:** preparar a infraestrutura de testes antes da lógica de negócio.

**Tarefas:**

- Escolher e configurar Jest ou Vitest.
- Configurar Testing Library.
- Criar teste de sanity.
- Configurar pasta `tests/` ou `__tests__/`.
- Configurar ambiente para testes de domínio puro.

**Validação arquitetural:**

- Testes de domínio não devem depender da UI.
- Funções críticas devem ficar isoladas para teste.

**Critérios de aceite:**

- `npm test` executa.
- Existe ao menos um teste de sanity passando.
- O projeto está preparado para testar cálculo de pedido, status e validações.

---

#### Etapa 1.4 — Configurar CI inicial

**Objetivo:** automatizar verificação por push/PR.

**Tarefas:**

- Criar `.github/workflows/ci.yml`.
- Rodar install, lint, typecheck, test e build.
- Configurar cache de dependências.
- Garantir execução em pull requests.

**Validação arquitetural:**

- Todo incremento deve passar pelo pipeline.
- CI deve falhar se build, lint, typecheck ou testes falharem.

**Critérios de aceite:**

- Workflow aparece no GitHub Actions.
- CI executa com sucesso no primeiro PR.
- O README documenta os comandos locais equivalentes.

---

### Fase 2 — Banco de dados, Prisma e modelos de domínio

#### Etapa 2.1 — Configurar Prisma e PostgreSQL

**Objetivo:** estabelecer a camada de persistência.

**Tarefas:**

- Instalar `prisma` e `@prisma/client`.
- Criar `prisma/schema.prisma`.
- Configurar `DATABASE_URL`.
- Criar `lib/db.ts` com PrismaClient singleton.
- Validar conexão com PostgreSQL.
- Documentar setup de `.env.example`.

**Validação arquitetural:**

- Banco oficial do projeto deve ser PostgreSQL.
- Não usar SQLite como banco principal.
- PrismaClient não deve ser instanciado diretamente em múltiplos pontos.

**Critérios de aceite:**

- `npx prisma validate` passa.
- `npx prisma db pull` ou conexão equivalente funciona.
- `.env.local` não é versionado.
- `.env.example` contém variáveis sem segredos reais.

---

#### Etapa 2.2 — Modelar Categoria e Produto

**Objetivo:** criar a base do cardápio.

**Tarefas:**

- Criar model `Categoria`.
- Criar model `Produto`.
- Definir relacionamento `Categoria -> Produto`.
- Usar `Decimal` para preço.
- Adicionar flags `ativa` e `ativo`.
- Adicionar timestamps.
- Criar migration.
- Criar seed mínimo de categorias/produtos.

**Campos mínimos:**

- `Categoria`: `id`, `nome`, `slug`, `ativa`, `createdAt`, `updatedAt`.
- `Produto`: `id`, `nome`, `descricao`, `preco`, `estoque`, `imagemPath`, `ativo`, `categoriaId`, `createdAt`, `updatedAt`.

**Validação arquitetural:**

- `nome` e `slug` de categoria devem ser únicos.
- `preco` deve ser `Decimal`.
- Produto deve depender de categoria por FK.
- Exclusões futuras devem respeitar relação com pedidos.

**Critérios de aceite:**

- Migration aplicada.
- Seed cria ao menos duas categorias e alguns produtos.
- Prisma Studio mostra relacionamento correto.
- O schema não permite categoria duplicada por slug.

**Testes recomendados:**

- Teste de criação de categoria com slug único.
- Teste de rejeição de slug duplicado.
- Teste de criação de produto com preço decimal.

---

#### Etapa 2.3 — Modelar Usuário Admin e roles

**Objetivo:** preparar autenticação e autorização.

**Tarefas:**

- Criar model `Usuario`.
- Criar enum `RoleUsuario`.
- Definir role inicial `ADMIN`.
- Incluir campo `senhaHash`.
- Incluir `email` único.
- Criar seed de admin de desenvolvimento.
- Garantir que senha seed seja configurável por env.

**Validação arquitetural:**

- Nunca armazenar senha em texto puro.
- O model deve estar pronto para RBAC.
- Seed não deve sobrescrever senha forte em produção.
- Admin seed deve ser restrito a ambiente local/dev.

**Critérios de aceite:**

- Usuário admin pode existir no banco com `senhaHash`.
- `email` único.
- `role` obrigatório.
- Seed não expõe senha real no repositório.

---

#### Etapa 2.4 — Modelar Pedido, ItemPedido e snapshot

**Objetivo:** criar a estrutura central de pedidos.

**Tarefas:**

- Criar enum `StatusPedido`.
- Criar model `Pedido`.
- Criar model `ItemPedido`.
- Criar model `HistoricoStatus`.
- Adicionar `codigoPublico` único.
- Adicionar `idempotencyKey` único.
- Adicionar campos de snapshot:
  - nome do cliente;
  - endereço;
  - forma de pagamento;
  - taxa de entrega;
  - subtotal;
  - total;
  - nome do produto no momento da venda;
  - preço unitário no momento da venda;
  - quantidade;
  - subtotal por item;
  - adicionais, se houver.

**Validação arquitetural:**

- Pedido não deve depender do preço atual de `Produto` para exibir histórico.
- `ItemPedido` deve guardar snapshot independente.
- `HistoricoStatus` deve guardar transições.
- `idempotencyKey` deve impedir duplicação.
- `codigoPublico` deve ter constraint de unicidade.

**Critérios de aceite:**

- Migration aplicada.
- Schema permite criar pedido com itens em transação.
- Pedido mantém dados imutáveis.
- Status inicial é `AGUARDANDO` ou equivalente definido.

---

#### Etapa 2.5 — Modelar ConfigLoja e Auditoria

**Objetivo:** preparar configurações operacionais e trilha mínima de eventos.

**Tarefas:**

- Criar model `ConfigLoja`.
- Preferir tabela de linha única com colunas fixas:
  - `nomeLoja`;
  - `endereco`;
  - `telefone`;
  - `horarioFuncionamento`;
  - `taxaEntrega`;
  - `logoPath`;
  - timestamps.
- Criar model `AuditLog` ou equivalente.
- Definir eventos mínimos:
  - login admin;
  - criação/edição/exclusão de categoria;
  - criação/edição/exclusão de produto;
  - alteração de status de pedido;
  - erro crítico relevante.

**Validação arquitetural:**

- Taxa de entrega deve vir de `ConfigLoja`, não hardcoded.
- Logs não devem armazenar senha nem dados sensíveis desnecessários.
- Auditoria deve ser útil para ações sensíveis do admin.

**Critérios de aceite:**

- Configuração seedada.
- Taxa de entrega lida do banco.
- AuditLog preparado para uso nas próximas etapas.

---

#### Gate 2 — Banco e domínio

Antes de avançar para autenticação/admin, validar:

```bash
npx prisma validate
npx prisma migrate dev
npx prisma studio
npm run typecheck
npm test
```

Checklist:

- [ ] Todos os models existem.
- [ ] Campos financeiros usam Decimal.
- [ ] Constraints únicas estão aplicadas.
- [ ] Relacionamentos estão corretos.
- [ ] Seed local funciona.
- [ ] Nenhuma senha real foi versionada.

---

### Fase 3 — Autenticação, sessão e proteção administrativa

#### Etapa 3.1 — Configurar Auth.js/NextAuth

**Objetivo:** implementar login administrativo seguro.

**Tarefas:**

- Instalar dependências necessárias do Auth.js.
- Criar configuração em `lib/auth.ts`.
- Criar rota `app/api/auth/[...nextauth]/route.ts`.
- Implementar Credentials Provider.
- Validar email e senha no servidor.
- Verificar `senhaHash` com Argon2id ou bcrypt forte.
- Incluir `role` na sessão.
- Configurar segredo por env.

**Validação arquitetural:**

- Não criar autenticação manual fora do Auth.js.
- Não expor motivo específico de falha de login.
- Não retornar senhaHash em sessão ou API.
- Sessão deve incluir apenas dados mínimos.

**Critérios de aceite:**

- Login com credenciais válidas funciona.
- Login inválido retorna erro genérico.
- Sessão contém `id`, `email`, `nome`, `role`.
- Senha nunca aparece em log, response ou client bundle.

---

#### Etapa 3.2 — Proteger rotas `/admin/*`

**Objetivo:** bloquear acesso administrativo sem autenticação e autorização.

**Tarefas:**

- Criar middleware ou helper server-side de autorização.
- Redirecionar não autenticados para `/admin/login`.
- Bloquear usuários sem `role === ADMIN`.
- Garantir proteção também em Server Actions e Route Handlers.
- Criar página `/admin/login`.

**Validação arquitetural:**

- Proteção não pode depender apenas de esconder links no front.
- Toda mutação administrativa deve verificar sessão no servidor.
- APIs admin devem retornar 401/403 quando apropriado.

**Critérios de aceite:**

- Acessar `/admin/dashboard` sem login redireciona.
- Acessar `/admin/*` sem role admin bloqueia.
- Requisição direta para mutação admin sem sessão falha.
- Logout encerra sessão.

---

#### Etapa 3.3 — Criar layout administrativo

**Objetivo:** estabelecer shell visual e navegação do backoffice.

**Tarefas:**

- Criar `app/admin/layout.tsx` ou estrutura equivalente.
- Criar menu admin:
  - Dashboard;
  - Categorias;
  - Produtos;
  - Pedidos;
  - Configurações;
  - Sair.
- Exibir usuário logado.
- Criar página `/admin/dashboard` provisória.
- Criar estados de loading e erro.

**Validação arquitetural:**

- Layout admin deve ser separado do layout público.
- Dados do usuário devem vir da sessão server-side.
- Navegação não deve expor páginas futuras não implementadas como funcionais.

**Critérios de aceite:**

- Admin logado acessa layout.
- Menu funciona.
- Logout funciona.
- Layout responsivo mínimo.

---

#### Gate 3 — Segurança admin

Checklist:

- [ ] Auth.js configurado.
- [ ] Senha com hash forte.
- [ ] Role `ADMIN` validada no servidor.
- [ ] `/admin/*` protegido.
- [ ] Server Actions/Route Handlers protegidos.
- [ ] Logout implementado.
- [ ] Erros de login genéricos.
- [ ] Nenhum segredo versionado.

---

### Fase 4 — Administração de categorias

#### Etapa 4.1 — Criar camada de validação de categoria

**Objetivo:** centralizar regras antes da UI.

**Tarefas:**

- Criar schema Zod para categoria.
- Validar:
  - nome obrigatório;
  - slug obrigatório;
  - tamanho máximo;
  - formato de slug;
  - ativa booleana.
- Criar serviço/repositório de categoria.
- Normalizar slug quando necessário.

**Validação arquitetural:**

- A validação deve ocorrer no servidor.
- A UI pode validar também, mas não substitui o backend.
- Regras de slug único dependem do banco e tratamento de erro.

**Critérios de aceite:**

- Inputs inválidos são rejeitados.
- Mensagens de erro são claras.
- Não há duplicação de lógica em múltiplas actions.

---

#### Etapa 4.2 — Implementar CRUD de categorias no admin

**Objetivo:** permitir gestão completa das categorias.

**Tarefas:**

- Página `/admin/categorias`.
- Página `/admin/categorias/nova`.
- Página `/admin/categorias/[id]`.
- Ação de criar.
- Ação de editar.
- Ação de ativar/inativar.
- Ação de excluir, se seguro.
- Tratamento de categoria com produtos associados.

**Validação arquitetural:**

- Preferir inativação quando houver produtos associados.
- Mutação deve registrar audit log.
- Após mutações, invalidar cache de rotas públicas relacionadas.

**Critérios de aceite:**

- Admin lista categorias.
- Admin cria categoria.
- Admin edita categoria.
- Admin inativa categoria.
- Categoria inativa não aparece no catálogo público.
- Erro de slug duplicado é tratado.

**Testes recomendados:**

- Criar categoria válida.
- Rejeitar slug duplicado.
- Inativar categoria e verificar ausência no público.
- Bloquear mutação sem sessão admin.

---

### Fase 5 — Administração de produtos

#### Etapa 5.1 — Criar validação e serviço de produtos

**Objetivo:** preparar regras de produto fora da UI.

**Tarefas:**

- Criar schema Zod para produto.
- Validar:
  - nome obrigatório;
  - descrição opcional com limite;
  - preço decimal positivo;
  - estoque inteiro opcional;
  - categoria existente;
  - ativo booleano.
- Criar serviço de produto.
- Padronizar conversão de valores monetários.

**Validação arquitetural:**

- Valores financeiros devem ser tratados com Decimal.
- Produto não deve ser criado sem categoria válida.
- Inatividade deve ser preferida a exclusão quando houver histórico.

**Critérios de aceite:**

- Produto inválido é rejeitado.
- Produto com categoria inexistente é rejeitado.
- Preço negativo ou zero é rejeitado conforme regra definida.

---

#### Etapa 5.2 — Implementar CRUD de produtos sem upload

**Objetivo:** entregar gestão de cardápio antes de imagens.

**Tarefas:**

- Página `/admin/produtos`.
- Página `/admin/produtos/novo`.
- Página `/admin/produtos/[id]`.
- Criar produto com categoria.
- Editar produto.
- Ativar/inativar produto.
- Exibir preço formatado em BRL.
- Exibir status de estoque, se configurado.

**Validação arquitetural:**

- Produto inativo não aparece no público.
- Alteração de preço não altera pedidos antigos.
- Mutação deve invalidar cache público.

**Critérios de aceite:**

- Admin cria produto.
- Admin edita preço e categoria.
- Produto aparece corretamente na listagem admin.
- Produto inativo fica oculto no catálogo público.
- Build e testes passam.

---

#### Etapa 5.3 — Implementar upload seguro de imagens

**Objetivo:** permitir imagem de produto com segurança mínima.

**Tarefas:**

- Criar componente de upload no admin.
- Validar no frontend:
  - tipo PNG/JPEG;
  - tamanho máximo de 2 MB.
- Revalidar no servidor:
  - MIME;
  - extensão;
  - tamanho;
  - nome seguro.
- Renomear arquivo com UUID/hash.
- Salvar path no produto.
- Exibir imagem com `next/image`.
- Remover ou substituir imagem antiga ao trocar, se possível.

**Validação arquitetural:**

- Validação server-side é obrigatória.
- Não confiar em `file.type` do browser.
- Não preservar nome original como path público.
- Não permitir SVG no MVP.
- Não executar conteúdo do arquivo.

**Critérios de aceite:**

- PNG/JPEG válido é aceito.
- Arquivo acima do limite é rejeitado.
- Arquivo com extensão inválida é rejeitado.
- Produto exibe imagem no admin e público.
- Nome salvo é seguro e sem caracteres especiais.

**Observação técnica:**

Para produção na Vercel, `/public/uploads` pode não ser persistente para uploads em runtime. A decisão operacional precisa ser validada antes do deploy final:

- Para protótipo/local: `/public/uploads`.
- Para produção real: preferir storage externo como S3, Cloudinary, Supabase Storage ou Vercel Blob.

Se o MVP for realmente usado em produção por cliente real, tratar storage externo como obrigatório antes do release.

---

#### Gate 4 — Admin operacional parcial

Checklist:

- [ ] CRUD de categorias completo.
- [ ] CRUD de produtos completo.
- [ ] Upload validado.
- [ ] Regras server-side aplicadas.
- [ ] Cache público invalidado após mutações.
- [ ] Audit logs básicos registrados.
- [ ] Rotas admin protegidas.

---

### Fase 6 — Catálogo público

#### Etapa 6.1 — Criar layout público

**Objetivo:** estabelecer experiência pública mobile-first.

**Tarefas:**

- Criar header público.
- Criar footer com dados da loja.
- Criar navegação por categorias.
- Criar estados de loading/error/not-found.
- Usar Tailwind para layout responsivo.
- Garantir elementos semânticos.

**Validação arquitetural:**

- Layout público deve ser separado do admin.
- Dados de loja devem vir de `ConfigLoja`.
- Não expor links admin desnecessários para clientes.

**Critérios de aceite:**

- Home carrega em mobile e desktop.
- Header/footer aparecem corretamente.
- Dados básicos da loja são exibidos quando configurados.

---

#### Etapa 6.2 — Implementar home com categorias

**Objetivo:** permitir entrada no cardápio.

**Tarefas:**

- Renderizar categorias ativas.
- Usar Server Component.
- Aplicar cache/ISR se adequado.
- Exibir estado vazio.
- Criar cards de categoria.

**Validação arquitetural:**

- Deve buscar apenas categorias ativas.
- Não deve usar Client Component sem necessidade.
- Cache deve ser revalidado após CRUD de categoria.

**Critérios de aceite:**

- Home mostra categorias ativas.
- Categoria inativa não aparece.
- Clique leva para `/categoria/[slug]`.
- Página tem `<h1>` correto.

---

#### Etapa 6.3 — Implementar listagem por categoria

**Objetivo:** exibir produtos filtrados por categoria.

**Tarefas:**

- Criar `/categoria/[slug]`.
- Buscar categoria por slug.
- Retornar `notFound()` se não existir ou inativa.
- Listar produtos ativos.
- Mostrar nome, imagem, descrição curta, preço e disponibilidade.
- Linkar para detalhe do produto.

**Validação arquitetural:**

- Produtos inativos não aparecem.
- Categoria inexistente não renderiza erro técnico.
- Página usa Server Component.

**Critérios de aceite:**

- Categoria válida renderiza produtos.
- Categoria vazia mostra mensagem adequada.
- Categoria inválida retorna página 404.
- Preços formatados em BRL.

---

#### Etapa 6.4 — Implementar detalhe do produto

**Objetivo:** permitir decisão de compra.

**Tarefas:**

- Criar `/produto/[id]`.
- Buscar produto ativo.
- Exibir imagem, nome, descrição, preço e disponibilidade.
- Adicionar componente client para seleção de quantidade e adicionar ao carrinho.
- Criar fallback para produto sem imagem.

**Validação arquitetural:**

- Dados do produto vêm do servidor.
- Apenas componente de interação é client-side.
- Produto inativo retorna 404 ou indisponível conforme regra definida.

**Critérios de aceite:**

- Produto ativo abre detalhe.
- Botão de adicionar ao carrinho funciona.
- Quantidade mínima e máxima são validadas no client.
- Estado sem estoque é tratado, se estoque estiver ativo.

---

#### Gate 5 — Fluxo público parcial

Checklist:

- [ ] Cliente consegue navegar categorias.
- [ ] Cliente consegue ver produtos.
- [ ] Cliente consegue abrir detalhe.
- [ ] Produtos/categorias inativos não aparecem.
- [ ] Páginas públicas usam Server Components quando possível.
- [ ] Layout mobile-first validado.

---

### Fase 7 — Carrinho client-side

#### Etapa 7.1 — Criar modelo de estado do carrinho

**Objetivo:** estruturar carrinho no browser sem persistir no banco.

**Tarefas:**

- Criar tipo `CartItem`.
- Criar hook/contexto de carrinho.
- Persistir em `localStorage`.
- Gerar `cartId` ou `idempotencySeed`.
- Implementar adicionar item.
- Implementar remover item.
- Implementar alterar quantidade.
- Implementar limpar carrinho.

**Validação arquitetural:**

- Carrinho não deve salvar preço como fonte da verdade.
- Preço no carrinho é apenas informativo.
- Checkout deve enviar `produtoId`, quantidade e opcionais, não total confiável.

**Critérios de aceite:**

- Item adicionado permanece após refresh.
- Quantidade pode ser alterada.
- Carrinho pode ser limpo.
- Dados inválidos no localStorage não quebram a página.

---

#### Etapa 7.2 — Criar página `/carrinho`

**Objetivo:** permitir revisão antes do checkout.

**Tarefas:**

- Listar itens do carrinho.
- Permitir alteração de quantidade.
- Permitir remoção.
- Mostrar subtotal estimado.
- Exibir aviso de que total final será confirmado no checkout.
- Botão para checkout.
- Estado de carrinho vazio.

**Validação arquitetural:**

- A página pode usar Client Component.
- Total exibido é estimativo.
- Não deve criar pedido nesta etapa.

**Critérios de aceite:**

- Cliente revisa itens.
- Cliente remove itens.
- Cliente altera quantidades.
- Cliente avança para `/checkout`.
- Carrinho vazio orienta voltar ao cardápio.

---

### Fase 8 — Checkout e criação de pedido

#### Etapa 8.1 — Criar schemas de checkout

**Objetivo:** validar dados do cliente e itens antes de qualquer persistência.

**Tarefas:**

- Criar schema Zod para dados do cliente.
- Validar nome.
- Validar endereço completo.
- Validar forma de pagamento.
- Validar itens:
  - `produtoId`;
  - `quantidade`;
  - opcionais, se existirem;
  - `idempotencyKey`.
- Definir limites de tamanho para strings.

**Validação arquitetural:**

- Toda validação deve ocorrer no servidor.
- Frontend apenas melhora UX.
- Inputs devem ser sanitizados e normalizados.

**Critérios de aceite:**

- Checkout inválido retorna erro controlado.
- Dados excessivamente longos são rejeitados.
- Quantidade inválida é rejeitada.
- Produto inexistente é rejeitado.

---

#### Etapa 8.2 — Implementar serviço de cálculo de pedido

**Objetivo:** centralizar a regra financeira do sistema.

**Tarefas:**

- Criar função de domínio para calcular pedido.
- Buscar produtos no banco.
- Verificar produto ativo.
- Verificar estoque, se aplicável.
- Recalcular preço unitário.
- Calcular subtotal por item.
- Buscar taxa de entrega em `ConfigLoja`.
- Calcular total.
- Retornar estrutura pronta para persistência.

**Validação arquitetural:**

- O frontend não pode enviar preço confiável.
- O servidor ignora qualquer total vindo do cliente.
- Valores financeiros usam Decimal.
- Regra deve ser testável sem UI.

**Critérios de aceite:**

- Cálculo correto para múltiplos itens.
- Taxa de entrega aplicada corretamente.
- Produto inativo impede pedido.
- Estoque insuficiente impede pedido, se estoque ativo.
- Testes unitários cobrem cenários principais.

---

#### Etapa 8.3 — Implementar criação transacional de pedido

**Objetivo:** persistir pedido, itens e snapshot de forma atômica.

**Tarefas:**

- Criar Server Action ou Route Handler para criar pedido.
- Verificar `idempotencyKey`.
- Se chave já existir, retornar pedido existente.
- Se não existir, abrir transação Prisma.
- Criar `Pedido`.
- Criar `ItemPedido`.
- Criar primeiro `HistoricoStatus`, se aplicável.
- Debitar estoque dentro da transação, se habilitado.
- Gerar `codigoPublico`.
- Registrar log/auditoria mínima.
- Retornar dados de confirmação.

**Validação arquitetural:**

- A criação deve ser atômica.
- Idempotência deve ter constraint no banco.
- Não pode criar `Pedido` sem `ItemPedido`.
- Não pode salvar preço enviado pelo client como verdade.
- Snapshot deve ser gravado no momento da transação.

**Critérios de aceite:**

- Pedido válido é criado.
- Clique duplo retorna o mesmo pedido.
- Falha de estoque não cria pedido parcial.
- Erro de validação não cria pedido.
- `codigoPublico` é único.
- Teste de integração cobre criação completa.

---

#### Etapa 8.4 — Criar página `/checkout`

**Objetivo:** permitir finalização do pedido pelo cliente.

**Tarefas:**

- Criar formulário de checkout.
- Exibir resumo do carrinho.
- Coletar nome, endereço e forma de pagamento.
- Mostrar mensagens de erro.
- Bloquear envio duplicado visualmente.
- Chamar ação/endpoint de criação.
- Redirecionar para confirmação.

**Validação arquitetural:**

- UI não deve tentar calcular total final definitivo.
- Deve preservar carrinho em caso de erro.
- Deve limpar carrinho apenas após confirmação de pedido criado.

**Critérios de aceite:**

- Cliente preenche dados.
- Pedido é enviado.
- Erros aparecem sem perder carrinho.
- Após sucesso, carrinho é limpo.
- Cliente vê código público.

---

#### Etapa 8.5 — Criar página de confirmação de pedido

**Objetivo:** concluir o fluxo público com feedback claro.

**Tarefas:**

- Criar `/pedido/[codigo]` ou página de confirmação equivalente.
- Exibir código público.
- Exibir resumo do pedido.
- Exibir status atual.
- Exibir orientação sobre pagamento/entrega.
- Tratar código inexistente.

**Validação arquitetural:**

- Não expor dados sensíveis além do necessário.
- Código público deve ser suficiente para consulta simples.
- Não exigir login do cliente.

**Critérios de aceite:**

- Pedido recém-criado pode ser consultado.
- Código inválido retorna 404 ou mensagem segura.
- Cliente entende que o pedido foi recebido.

---

#### Gate 6 — Pedido consistente

Checklist:

- [ ] Checkout valida inputs no servidor.
- [ ] Preços são recalculados no servidor.
- [ ] Pedido usa transação.
- [ ] Snapshot gravado.
- [ ] Idempotência funcionando.
- [ ] Código público único.
- [ ] Carrinho é limpo apenas após sucesso.
- [ ] Testes unitários e integração cobrindo pedido.

---

### Fase 9 — Processamento de pedidos no admin

#### Etapa 9.1 — Criar listagem de pedidos

**Objetivo:** permitir ao admin visualizar pedidos recebidos.

**Tarefas:**

- Criar `/admin/pedidos`.
- Listar pedidos paginados.
- Exibir:
  - código;
  - cliente;
  - data;
  - status;
  - total;
  - forma de pagamento.
- Filtrar por status.
- Ordenar por mais recentes.
- Linkar para detalhe.

**Validação arquitetural:**

- Página protegida por admin.
- Dados devem ser lidos server-side.
- Lista não deve expor campos desnecessários.

**Critérios de aceite:**

- Admin vê pedidos.
- Filtro por status funciona.
- Paginação ou limite inicial evita carga excessiva.
- Pedido recém-criado aparece.

---

#### Etapa 9.2 — Criar detalhe do pedido

**Objetivo:** exibir snapshot completo do pedido.

**Tarefas:**

- Criar `/admin/pedidos/[id]`.
- Exibir dados do cliente.
- Exibir itens com snapshot:
  - nome do produto no pedido;
  - preço unitário no pedido;
  - quantidade;
  - subtotal.
- Exibir taxa e total.
- Exibir histórico de status.
- Exibir status atual.

**Validação arquitetural:**

- Detalhe deve usar snapshot, não preço atual do produto.
- Pedido inexistente retorna 404.
- Admin deve ver informações necessárias para operação.

**Critérios de aceite:**

- Detalhe exibe todos os itens corretamente.
- Alterar produto após compra não muda pedido antigo.
- Histórico aparece em ordem cronológica.

---

#### Etapa 9.3 — Implementar máquina de estados

**Objetivo:** controlar transições válidas de pedido.

**Tarefas:**

- Criar função `getNextValidStatuses(statusAtual)`.
- Criar função `canTransition(from, to)`.
- Definir transições:
  - `AGUARDANDO -> EM_PREPARO`;
  - `EM_PREPARO -> PRONTO`;
  - `PRONTO -> ENTREGUE`;
  - qualquer estado não final antes de entregue -> `CANCELADO`;
  - `ENTREGUE` e `CANCELADO` são finais.
- Bloquear saltos.
- Criar testes unitários para transições.

**Validação arquitetural:**

- Regra de status deve ficar no domínio, não apenas no select da UI.
- Backend deve bloquear transição inválida.
- Estados finais não devem reabrir no fluxo normal.

**Critérios de aceite:**

- Transições válidas passam.
- Saltos inválidos falham.
- Cancelado não reabre.
- Entregue não reabre.
- Testes cobrem todos os estados.

---

#### Etapa 9.4 — Implementar alteração de status com histórico

**Objetivo:** permitir operação do pedido com rastreabilidade.

**Tarefas:**

- Criar Server Action/Route Handler para mudar status.
- Verificar sessão admin.
- Validar transição.
- Atualizar `Pedido.statusAtual`.
- Criar registro em `HistoricoStatus`.
- Registrar `adminId`.
- Registrar data/hora.
- Registrar audit log.

**Validação arquitetural:**

- Atualização de status deve ser transacional.
- Histórico deve ser obrigatório.
- Admin responsável deve ser salvo.
- Não permitir alteração direta no banco pela UI sem action protegida.

**Critérios de aceite:**

- Admin muda status pelo detalhe do pedido.
- Histórico mostra alteração.
- Transição inválida retorna erro.
- Usuário sem sessão não altera status.
- Teste de integração cobre alteração válida e inválida.

---

#### Gate 7 — Operação de pedidos

Checklist:

- [ ] Admin lista pedidos.
- [ ] Admin vê detalhe com snapshot.
- [ ] Status muda apenas por transições válidas.
- [ ] Histórico registra admin e data.
- [ ] Estados finais são respeitados.
- [ ] Mutação é protegida.
- [ ] Testes de status passam.

---

### Fase 10 — Configurações da loja

#### Etapa 10.1 — Criar página admin de configurações

**Objetivo:** permitir edição de dados operacionais da loja.

**Tarefas:**

- Criar `/admin/configuracoes`.
- Formulário para:
  - nome da loja;
  - endereço;
  - telefone;
  - horário;
  - taxa de entrega;
  - logo, se aplicável.
- Validar campos.
- Salvar em `ConfigLoja`.
- Registrar audit log.

**Validação arquitetural:**

- Taxa de entrega deve alimentar checkout.
- Configuração deve ter uma única fonte de verdade.
- Não hardcodar nome/taxa em componentes.

**Critérios de aceite:**

- Admin altera dados.
- Dados aparecem no footer público.
- Taxa alterada reflete no próximo pedido.
- Valores inválidos são rejeitados.

---

#### Etapa 10.2 — Integrar configurações no público e checkout

**Objetivo:** usar dados da loja em rotas reais.

**Tarefas:**

- Exibir nome/telefone/endereço no layout público.
- Usar taxa de entrega no cálculo de pedido.
- Exibir horário no footer ou seção de informações.
- Tratar ausência de configuração com fallback seguro.

**Validação arquitetural:**

- Configuração deve ser lida server-side.
- Checkout deve usar a taxa persistida no banco.
- UI não deve duplicar valores fixos.

**Critérios de aceite:**

- Alterar taxa no admin altera cálculo do pedido.
- Alterar nome da loja atualiza header/footer.
- Sistema funciona com configuração seedada.

---

### Fase 11 — Dashboard admin

#### Etapa 11.1 — Implementar métricas principais

**Objetivo:** dar ao admin visão operacional mínima.

**Tarefas:**

- Total de pedidos do dia.
- Receita do dia.
- Total de pedidos do mês, se mantido.
- Pedidos por status.
- Últimos 5 a 10 pedidos.
- Link rápido para detalhe de pedido.

**Validação arquitetural:**

- Dashboard deve renderizar server-side.
- Não usar cache longo para dados operacionais.
- Consultas devem ser simples e eficientes.

**Critérios de aceite:**

- Métricas aparecem após login.
- Pedido recém-criado aparece nos últimos pedidos.
- Valores batem com dados do banco.
- Dashboard não quebra sem pedidos.

---

#### Etapa 11.2 — Criar alertas operacionais simples

**Objetivo:** destacar pedidos que exigem ação.

**Tarefas:**

- Mostrar contagem de `AGUARDANDO`.
- Mostrar pedidos parados há muito tempo.
- Destacar status com cor/label acessível.
- Linkar para fila de pedidos.

**Validação arquitetural:**

- Alertas devem ser derivados do banco, sem worker.
- Não adicionar notificações externas no MVP.

**Critérios de aceite:**

- Admin identifica pedidos pendentes.
- Dashboard continua simples.
- Nenhuma integração externa foi adicionada.

---

### Fase 12 — UX, validação e tratamento de erros

#### Etapa 12.1 — Padronizar componentes de formulário

**Objetivo:** reduzir duplicação e melhorar consistência.

**Tarefas:**

- Criar componentes:
  - Input;
  - Textarea;
  - Select;
  - Button;
  - Alert;
  - FieldError;
  - LoadingButton.
- Padronizar mensagens.
- Garantir labels visíveis.
- Garantir estados disabled/loading.

**Validação arquitetural:**

- Componentes genéricos não devem conter lógica de domínio.
- Validação de domínio continua no servidor.
- Acessibilidade deve ser incorporada desde os componentes.

**Critérios de aceite:**

- Formulários admin usam componentes comuns.
- Campos têm label.
- Erros são exibidos próximos ao campo.

---

#### Etapa 12.2 — Criar tratamento de erro por rota

**Objetivo:** impedir falhas técnicas visíveis ao usuário.

**Tarefas:**

- Criar `error.tsx` global.
- Criar `not-found.tsx`.
- Criar loading states por rota crítica.
- Padronizar respostas de API/Actions.
- Não expor stack trace.

**Validação arquitetural:**

- Erros técnicos ficam no log.
- Usuário vê mensagem amigável.
- APIs retornam status HTTP coerente.

**Critérios de aceite:**

- Produto/categoria inexistente mostra 404.
- Falha inesperada mostra erro genérico.
- Checkout com erro não perde carrinho.
- Admin recebe feedback de falha ao salvar.

---

### Fase 13 — Segurança aplicada e logs

#### Etapa 13.1 — Aplicar rate limiting básico

**Objetivo:** reduzir abuso em endpoints críticos.

**Tarefas:**

- Rate limit em login.
- Rate limit em criação de pedido.
- Definir estratégia compatível com ambiente de deploy.
- Registrar tentativas bloqueadas sem dados sensíveis.

**Validação arquitetural:**

- Login deve ter proteção contra brute force.
- Checkout deve ter proteção contra flood.
- Não depender de memória local se ambiente serverless exigir persistência externa.

**Critérios de aceite:**

- Múltiplas tentativas de login são bloqueadas.
- Flood de pedidos é limitado.
- Mensagem ao usuário é genérica.

**Observação técnica:**

Em Vercel/serverless, rate limiting em memória pode não ser confiável. Para produção real, avaliar Upstash Redis, Vercel Firewall, middleware externo ou proteção no provider.

---

#### Etapa 13.2 — Implementar logs mínimos seguros

**Objetivo:** registrar eventos críticos sem vazar dados.

**Tarefas:**

- Logar criação de pedido por ID/código.
- Logar login admin com sucesso/falha sem senha.
- Logar alteração de status.
- Logar erros críticos.
- Mascarar dados sensíveis.
- Definir utilitário `logger`.

**Validação arquitetural:**

- Não logar senha.
- Não logar endereço completo em logs técnicos.
- AuditLog pode registrar ação administrativa, mas com payload controlado.

**Critérios de aceite:**

- Eventos críticos aparecem nos logs.
- Nenhum log contém senha/hash.
- Alteração de status é rastreável.

---

#### Etapa 13.3 — Revisão OWASP mínima

**Objetivo:** verificar riscos básicos antes do release.

**Tarefas:**

- Revisar validação de inputs.
- Revisar autorização em Server Actions.
- Revisar upload.
- Revisar cookies/sessão.
- Revisar tratamento de erro.
- Rodar `npm audit`.
- Verificar headers básicos se aplicável.

**Validação arquitetural:**

- Segurança deve estar em backend e domínio, não apenas UI.
- Mutação sem sessão deve ser impossível.
- Inputs devem ter limites.

**Critérios de aceite:**

- Checklist OWASP básico preenchido.
- Falhas críticas corrigidas.
- Dependências sem vulnerabilidade crítica conhecida.

---

### Fase 14 — Testes automatizados

#### Etapa 14.1 — Testes unitários de domínio

**Objetivo:** proteger regras críticas.

**Tarefas:**

- Testar cálculo de pedido.
- Testar formatação/normalização de preço.
- Testar geração de código público.
- Testar idempotência em nível de serviço, se possível.
- Testar máquina de estados.
- Testar validação de schemas.

**Critérios de aceite:**

- Cobertura alta nas funções de domínio.
- Casos inválidos testados.
- Testes não dependem da UI.

---

#### Etapa 14.2 — Testes de integração

**Objetivo:** validar banco, Prisma e fluxos críticos.

**Tarefas:**

- Criar ambiente de teste com banco isolado.
- Testar criação de pedido com itens.
- Testar tentativa duplicada por `idempotencyKey`.
- Testar criação de produto/categoria.
- Testar status com histórico.
- Testar autorização admin nas mutações.

**Validação arquitetural:**

- Testes devem confirmar constraints reais do banco.
- Não usar mocks para tudo nas regras transacionais.

**Critérios de aceite:**

- Pedido completo é criado em banco de teste.
- Duplicidade é impedida.
- Histórico de status é persistido.
- Mutação sem admin falha.

---

#### Etapa 14.3 — Testes E2E

**Objetivo:** validar o MVP como usuário real.

**Tarefas:**

- Configurar Playwright ou Cypress.
- Cenário 1: compra pública completa.
- Cenário 2: admin cria categoria e produto.
- Cenário 3: produto aparece no catálogo.
- Cenário 4: cliente cria pedido.
- Cenário 5: admin muda status até entregue.
- Cenário 6: fluxo inválido de status é bloqueado.

**Critérios de aceite:**

- E2E passa localmente.
- E2E passa no CI ou em job separado.
- Fluxo completo de compra validado.

---

#### Etapa 14.4 — Testes de acessibilidade

**Objetivo:** garantir acessibilidade básica.

**Tarefas:**

- Verificar labels.
- Verificar contraste.
- Verificar navegação por teclado.
- Verificar `alt` em imagens.
- Rodar axe/Lighthouse.
- Corrigir problemas críticos.

**Critérios de aceite:**

- Home, categoria, produto, carrinho, checkout e admin básico sem erros críticos de acessibilidade.
- Fluxo principal navegável por teclado.
- Imagens relevantes têm `alt`.

---

### Fase 15 — Deploy, ambiente e release

#### Etapa 15.1 — Preparar variáveis de ambiente

**Objetivo:** garantir deploy reproduzível.

**Tarefas:**

- Documentar `DATABASE_URL`.
- Documentar `NEXTAUTH_SECRET` ou equivalente.
- Documentar env de storage, se usado.
- Criar `.env.example`.
- Configurar envs no Vercel.
- Confirmar que `.env.local` está no `.gitignore`.

**Critérios de aceite:**

- Projeto roda local com `.env.local`.
- Vercel tem todas envs necessárias.
- Nenhum segredo está no Git.

---

#### Etapa 15.2 — Configurar banco de produção

**Objetivo:** conectar app a PostgreSQL gerenciado.

**Tarefas:**

- Criar banco PostgreSQL em provider escolhido.
- Configurar connection string.
- Rodar `prisma migrate deploy`.
- Rodar seed seguro, se necessário.
- Criar usuário admin inicial com senha forte.
- Validar backup/manual de restauração.

**Validação arquitetural:**

- Produção deve usar PostgreSQL.
- Migrations devem vir do repositório.
- Seed de admin não pode criar senha fraca fixa em produção.

**Critérios de aceite:**

- Banco de produção recebe migrations.
- Admin inicial existe.
- App conecta ao banco em produção.

---

#### Etapa 15.3 — Deploy na Vercel

**Objetivo:** disponibilizar o MVP publicamente.

**Tarefas:**

- Conectar repositório ao Vercel.
- Configurar branch de produção.
- Configurar previews por PR.
- Configurar build command.
- Configurar envs.
- Validar build em preview.
- Fazer deploy de produção.

**Critérios de aceite:**

- URL pública acessível.
- Build passa na Vercel.
- Rotas públicas funcionam.
- Login admin funciona.
- Checkout cria pedido no banco de produção.

---

#### Etapa 15.4 — Health check e smoke test

**Objetivo:** validar produção depois do deploy.

**Tarefas:**

- Criar endpoint `/api/health`.
- Verificar conexão com banco.
- Fazer smoke test público:
  - abrir home;
  - abrir categoria;
  - abrir produto;
  - adicionar ao carrinho;
  - finalizar pedido.
- Fazer smoke test admin:
  - login;
  - ver pedido;
  - mudar status;
  - ver dashboard.

**Critérios de aceite:**

- `/api/health` retorna OK.
- Pedido criado em produção.
- Admin processa pedido.
- Logs não exibem dados sensíveis.

---

### Fase 16 — Auditoria final do MVP

#### Etapa 16.1 — Auditoria funcional

**Objetivo:** confirmar que tudo do MVP foi implementado.

**Checklist:**

- [ ] Catálogo público.
- [ ] Carrinho.
- [ ] Checkout.
- [ ] Criação de pedido.
- [ ] Idempotência.
- [ ] Snapshot.
- [ ] Código público.
- [ ] Login admin.
- [ ] Proteção `/admin/*`.
- [ ] CRUD categorias.
- [ ] CRUD produtos.
- [ ] Upload de imagens.
- [ ] Pedidos no admin.
- [ ] Alteração de status.
- [ ] Histórico de status.
- [ ] Configurações da loja.
- [ ] Dashboard.
- [ ] Testes.
- [ ] Deploy.

---

#### Etapa 16.2 — Auditoria técnica

**Objetivo:** verificar qualidade e riscos.

**Checklist:**

- [ ] `npm run lint` passa.
- [ ] `npm run typecheck` passa.
- [ ] `npm test` passa.
- [ ] `npm run build` passa.
- [ ] E2E principal passa.
- [ ] Prisma migrations versionadas.
- [ ] Sem segredo no Git.
- [ ] Inputs validados no servidor.
- [ ] Mutations admin protegidas.
- [ ] Upload validado.
- [ ] Erros genéricos para usuário.
- [ ] Logs sem senha/PII desnecessária.
- [ ] README atualizado.
- [ ] `.env.example` atualizado.
- [ ] Checklist de deploy atualizado.

---

#### Etapa 16.3 — Auditoria de arquitetura

**Objetivo:** confirmar que as decisões do plano foram respeitadas.

| Item | Deve estar verdadeiro |
|---|---|
| Monolito modular | Não há microserviços, filas ou workers no MVP. |
| Server-first | Páginas públicas e admin de leitura usam Server Components quando possível. |
| Client Components controlados | Carrinho/upload/formulários interativos usam client-side apenas onde necessário. |
| Prisma/PostgreSQL | Persistência central usa Prisma com Postgres. |
| Auth.js | Login admin usa Auth.js, não auth caseira. |
| RBAC | Server verifica `role === ADMIN`. |
| Checkout seguro | Servidor recalcula tudo. |
| Snapshot | Pedido preserva dados históricos. |
| Idempotência | Reenvio não duplica pedido. |
| Estado de pedido | Transições inválidas são bloqueadas no backend. |
| Upload seguro | Tipo/tamanho/nome validados no servidor. |
| Deploy simples | Vercel + PostgreSQL gerenciado funcionando. |

---

## 6. Sequência recomendada de PRs

Abaixo está uma sugestão de PRs pequenos e revisáveis.

| PR | Conteúdo | Depende de |
|---|---|---|
| PR-001 | Bootstrap Next.js + Tailwind + TypeScript | Nenhum |
| PR-002 | ESLint, Prettier, typecheck, testes base | PR-001 |
| PR-003 | GitHub Actions CI | PR-002 |
| PR-004 | Prisma + PostgreSQL + envs | PR-001 |
| PR-005 | Models Categoria/Produto + seed | PR-004 |
| PR-006 | Models Usuario/Auth + seed admin dev | PR-004 |
| PR-007 | Models Pedido/Item/Historico/Config/Audit | PR-005 |
| PR-008 | Auth.js Credentials + login | PR-006 |
| PR-009 | Proteção `/admin/*` + layout admin | PR-008 |
| PR-010 | CRUD Categorias | PR-009 + PR-005 |
| PR-011 | CRUD Produtos sem upload | PR-010 |
| PR-012 | Upload seguro de imagens | PR-011 |
| PR-013 | Layout público + home categorias | PR-010 |
| PR-014 | Página categoria + detalhe produto | PR-011 + PR-013 |
| PR-015 | Carrinho client-side | PR-014 |
| PR-016 | Checkout schemas + cálculo server-side | PR-015 + PR-007 |
| PR-017 | Criação transacional de pedido + idempotência | PR-016 |
| PR-018 | Confirmação/consulta de pedido | PR-017 |
| PR-019 | Admin listagem/detalhe de pedidos | PR-017 + PR-009 |
| PR-020 | Máquina de estados + alteração de status | PR-019 |
| PR-021 | Configurações da loja | PR-009 + PR-007 |
| PR-022 | Dashboard admin | PR-019 + PR-021 |
| PR-023 | UX, erros, loading, not-found | PRs anteriores |
| PR-024 | Testes unitários e integração críticos | PRs de domínio |
| PR-025 | E2E fluxo público/admin | MVP integrado |
| PR-026 | Segurança, logs e auditoria | MVP integrado |
| PR-027 | Deploy Vercel + produção | CI verde |
| PR-028 | Auditoria final do MVP | Produção validada |

---

## 7. Estimativa operacional

Estimativa para um desenvolvedor com apoio de IA, revisão humana e correções:

| Fase | Estimativa |
|---|---:|
| Preparação e bootstrap | 1 a 2 dias |
| Banco/modelagem/domínio | 2 a 3 dias |
| Auth/admin base | 1 a 2 dias |
| CRUD categorias/produtos/upload | 4 a 6 dias |
| Catálogo público/carrinho | 3 a 4 dias |
| Checkout/pedidos/idempotência | 3 a 5 dias |
| Admin pedidos/status/dashboard/config | 4 a 6 dias |
| Testes, segurança, acessibilidade | 3 a 5 dias |
| Deploy e auditoria final | 1 a 2 dias |

**Total realista:** 3 a 4 semanas de trabalho efetivo, considerando revisão, ajustes e correções.

---

## 8. Backlog pós-MVP

Itens recomendados após o MVP estar estável:

1. Página pública de acompanhamento de pedido mais completa.
2. Impressão simples de comanda via `window.print()`.
3. Filtros simples no catálogo.
4. Busca textual no cardápio.
5. Notificação manual por WhatsApp.
6. Integração com storage externo, se ainda não implementada.
7. Integração Pix.
8. Gateway de pagamento.
9. Integração iFood.
10. Impressora térmica.
11. Perfis adicionais, como `ATENDENTE`.
12. Relatórios financeiros mais completos.
13. Sentry/observabilidade mais robusta.
14. Backup automatizado do banco.
15. Testes de carga básicos.
16. PWA para operação mobile.
17. Cupom/desconto.
18. Horário de funcionamento com bloqueio automático de pedido.
19. Controle de bairros/taxa por região.
20. Multi-loja, somente se houver demanda real.

---

## 9. Critério final de sucesso do MVP

O MVP estará pronto quando:

- Um cliente conseguir navegar pelo cardápio.
- O cliente conseguir adicionar produtos ao carrinho.
- O cliente conseguir finalizar um pedido sem login.
- O servidor recalcular o total e persistir o pedido corretamente.
- O pedido possuir snapshot e código público.
- Reenvios não criarem duplicatas.
- O admin conseguir logar.
- O admin conseguir gerenciar categorias e produtos.
- O admin conseguir visualizar e processar pedidos.
- O admin conseguir mudar status seguindo regras válidas.
- O dashboard mostrar métricas básicas.
- As configurações da loja influenciarem o sistema.
- O fluxo crítico estiver coberto por testes.
- A aplicação estiver deployada e acessível publicamente.
- O checklist de segurança mínima estiver aprovado.
- O README permitir que outro dev rode o projeto localmente.

---

## 10. Ordem objetiva de execução

Para execução prática, siga esta ordem sem pular etapas:

1. Congelar escopo e decisões.
2. Criar projeto base.
3. Configurar qualidade e CI.
4. Configurar Prisma/PostgreSQL.
5. Criar modelos de domínio.
6. Criar Auth.js e proteção admin.
7. Criar CRUD de categorias.
8. Criar CRUD de produtos.
9. Criar upload seguro.
10. Criar catálogo público.
11. Criar carrinho.
12. Criar checkout.
13. Criar pedido transacional.
14. Criar confirmação de pedido.
15. Criar admin de pedidos.
16. Criar máquina de status.
17. Criar configurações.
18. Criar dashboard.
19. Padronizar UX/erros.
20. Aplicar segurança/logs.
21. Escrever testes unitários/integrados.
22. Escrever E2E.
23. Deploy preview.
24. Deploy produção.
25. Auditoria final.

---

## 11. Observações críticas antes de implementar

1. **Storage de imagens em produção precisa de decisão explícita.** `/public/uploads` é aceitável para desenvolvimento, mas não é a melhor escolha para produção serverless.
2. **Idempotência deve ser implementada cedo no checkout.** Não deixar para ajuste posterior.
3. **Snapshot não é opcional.** É essencial para histórico correto de pedidos.
4. **Status de pedido deve ser regra de domínio.** Não implementar só como dropdown no front.
5. **RBAC precisa estar no servidor.** Middleware sozinho pode não bastar para Server Actions e APIs.
6. **Preço nunca vem do cliente.** O browser só informa produto e quantidade.
7. **Decimal é obrigatório para dinheiro.** Evitar `Float`.
8. **Seed de admin não pode comprometer produção.** Senha fraca apenas local/dev, e ainda assim preferir env.
9. **Toda feature extra deve ser recusada até o MVP estar em produção.**
10. **Cada PR deve ser pequeno.** Se uma etapa alterar muitas áreas, dividir antes de executar.

---

## 12. Resultado esperado após seguir o roadmap

Ao final deste roadmap, o projeto deve estar em uma condição operacional realista:

- Código organizado por camadas e rotas.
- Banco relacional coerente.
- Área pública funcional.
- Área admin protegida.
- Fluxo de pedido completo.
- Controle básico de operação.
- Segurança mínima aplicada.
- Testes cobrindo regras críticas.
- Deploy funcional.
- Base preparada para evolução pós-MVP sem reescrita estrutural.
