# Burger Shop System

Sistema web para gestão de pedidos de uma hamburgueria (single-store), em desenvolvimento incremental por etapas.

## Status

Em desenvolvimento. Já implementados: modelagem completa do domínio (Prisma) e autenticação do painel administrativo, com testes e CI. Catálogo público, carrinho, checkout e tela de cozinha ainda não foram construídos — ver [Limitações](#limitações).

## Problema

Pequenos estabelecimentos que atendem por WhatsApp/telefone perdem controle de pedidos, status e histórico à medida que o volume cresce. O objetivo é um sistema simples, single-store, com pagamento manual/offline (sem gateway) e sem exigir login do cliente — ver [ADR 0003](docs/adr/0003-escopo-mvp.md).

## Funcionalidades

- **Autenticação administrativa**: login com e-mail/senha, hash de credenciais (bcrypt), gestão de sessão e políticas de acesso — com suíte de testes dedicada.
- **Modelagem de domínio completa** (Prisma/PostgreSQL): categorias, produtos, pedidos, itens de pedido, histórico de status, configuração da loja e log de auditoria.
- **Base do painel administrativo**: rotas protegidas (`app/admin/(protected)`) separadas da área pública.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · PostgreSQL · Prisma · Auth.js · Zod · Jest + Testing Library · GitHub Actions (CI)

## Arquitetura

```
app/
  (public)/          rotas públicas
  admin/login/        tela de login
  admin/(protected)/  área administrativa autenticada
src/
  actions/            server actions (ex.: auth.ts)
  lib/auth/            credenciais, sessão, políticas de acesso
prisma/
  schema.prisma        modelo de dados
  migrations/
tests/
  auth/                 testes de autenticação (ações, credenciais, sessão, política, formulário)
docs/adr/               decisões de arquitetura registradas
```

Decisões documentadas em `docs/adr/` (modelo operacional, stack e escopo do MVP).

## Instalação

```bash
git clone https://github.com/wiliangulini/burger-system.git
cd burger-system
npm install
cp .env.example .env   # preencha com suas próprias credenciais locais
npx prisma migrate dev
npm run dev
```

## Variáveis de ambiente

Definidas em `.env.example` (sem valores reais):

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | Conexão PostgreSQL local |
| `SEED_ADMIN_ENABLED` | Habilita seed de admin em desenvolvimento (`false` por padrão) |
| `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` | Credenciais do seed de desenvolvimento, quando habilitado |

## Comandos

```bash
npm run dev        # ambiente de desenvolvimento
npm run build       # build de produção
npm run lint         # ESLint
npm run typecheck    # checagem de tipos
npm test              # Jest + Testing Library
```

## Testes

Suíte com Jest e Testing Library cobrindo o fluxo de autenticação (ações, validação de credenciais, sessão, política de acesso e formulário de login). CI no GitHub Actions executa lint, typecheck, testes e build a cada push/PR para `dev` e `main`.

## Limitações

Este é um projeto em construção incremental (etapas documentadas em `docs/ia-auditorias/`). Ainda não implementados: catálogo público navegável, carrinho, checkout, upload de imagens, tela de cozinha e dashboard operacional — todos previstos no escopo do MVP ([ADR 0003](docs/adr/0003-escopo-mvp.md)), mas pendentes.

## Contexto

Projeto pessoal, desenvolvido com apoio de agentes de IA sob supervisão humana (fluxo documentado em `docs/adr/0001-ia-operating-model.md`). Convenção do repositório: integração ocorre na branch `dev`; `main` fica reservada.
