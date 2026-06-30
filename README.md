# Burger Shop System

Sistema web single-store para hamburgueria. Este repositório está no setup inicial do MVP: base Next.js App Router, TypeScript, Tailwind CSS, qualidade mínima, teste de sanity e CI.

## Escopo do MVP

O MVP será limitado a:

- catálogo público;
- carrinho sem login;
- checkout com pedido persistido;
- pagamento manual/offline;
- painel administrativo protegido;
- CRUD de categorias e produtos;
- upload seguro de imagens;
- pedidos, status e tela de cozinha;
- configurações operacionais;
- dashboard básico;
- testes e deploy controlado.

Itens pós-MVP ficam fora do escopo obrigatório e estão registrados em `docs/backlog-pos-mvp.md`.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma
- Auth.js
- Zod
- GitHub Actions
- Vercel

## Comandos locais

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

## Convenções de trabalho

- Branch de integração atual: `dev`.
- Branches de etapa devem usar nomes objetivos, por exemplo `feature/e01-setup-inicial`.
- Não fazer commit direto em `main`.
- Não fazer push, merge, deploy, migrations destrutivas ou alterações em secrets sem autorização humana explícita.
- Cada etapa deve ter relatório em `docs/ia-auditorias/`.

## Estado da E01

A etapa E01 cria somente a base técnica e documental. Ela não implementa domínio, Prisma, Auth.js, admin, API, carrinho, checkout, pedidos ou upload.
