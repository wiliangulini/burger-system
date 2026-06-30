# Diagnóstico de adaptação

## 1. O que será reaproveitado da referência operacional

- Hierarquia de instruções entre regras centrais, guia comum, guia específico do agente e relatórios.
- Postura de planner/revisor antes de implementação.
- Exigência de branch + `git status` antes de editar.
- Menor alteração suficiente.
- Separação entre planejamento, implementação, revisão, auditoria e continuidade.
- Relatório final com evidência, validações e status.
- Permissões conservadoras para impedir secrets, deploy, push e comandos destrutivos.

## 2. O que será removido

- Qualquer conteúdo ligado a stack, rotas, módulos e domínio do projeto de referência.
- Regras específicas de player, upload de áudio, licenças musicais e perfis não relacionados.
- Permissões de comandos de frameworks não usados.
- Arquivo `settings.local.json`, por ser local e não versionável.

## 3. O que será adaptado

- Regras de guards/autenticação foram convertidas para Auth.js, middleware, sessão, RBAC e Server Actions protegidas.
- Regras de carrinho/checkout foram convertidas para carrinho client-side com recalculo server-side e snapshots de pedido.
- Regras de dashboard foram convertidas para painel admin, pedidos, cozinha e métricas operacionais.
- Regras de API foram convertidas para Server Actions e Route Handlers.

## 4. O que será criado especificamente para Next.js/Prisma/Auth.js

- Regras de Server Components e Client Components.
- Regras de Prisma, migrations, seed, índices e transações.
- Regras de Auth.js, sessão HttpOnly, roles e RBAC.
- Regras de checkout, pedidos, pagamentos manuais, webhooks futuros e idempotência.
- Regras de store settings, delivery areas e audit log.

## 5. Riscos de copiar configurações locais da referência

- Carregar permissões de comandos não usados.
- Preservar regras de domínio incompatíveis.
- Copiar `settings.local.json` com preferências pessoais ou caminhos locais.
- Permitir comandos legados, deploy, rede ou shells perigosos.
- Levar documentação de negócio falsa para o novo projeto.

## 6. Estrutura final recomendada

A estrutura final está pronta para ser extraída na raiz do repositório e revisada antes da primeira auditoria sem edição.
