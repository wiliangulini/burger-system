---
description: Revisa segurança de auth, RBAC, checkout, pedidos, webhooks, secrets e superfície web.
---

# Comando: revisar-seguranca

Tarefa/contexto recebido:

$ARGUMENTS

## Modo e escrita

Realize revisão de segurança sem alterar implementação. Se `$ARGUMENTS`
autorizar relatório, aplique o mesmo contrato de `review-code`: caminho exato
em `docs/ia-auditorias/`, sufixo `-revisao.md`, correspondência com a etapa e
nenhum outro arquivo gravável. Sem caminho, responda somente no chat.

## Leitura obrigatória

Leia `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md` e, conforme o escopo:

- `.claude/rules/auth-admin-rbac.md`;
- `.claude/rules/security-deploy.md`;
- `.claude/rules/cart-checkout-orders.md`;
- `.claude/rules/payments-webhooks.md`;
- `.claude/rules/catalog-products.md`.

## Checklist especializado

- Auth.js, expiração, cookies, sessão e dados expostos.
- Diferença entre autenticação e autorização.
- Matriz RBAC validada no servidor por operação.
- Proteção de Server Actions e Route Handlers.
- Enumeração de usuário, força bruta e rate limiting.
- Zod, limites e validação de payloads externos.
- Checkout server-side, snapshots e idempotência.
- Upload: MIME, extensão, tamanho, nome e path traversal.
- Logs, PII, tokens, cookies, hashes e secrets.
- Dependências, configurações inseguras e superfície de ataque.

## Saída

Classifique achados como bloqueador, alto, médio, baixo ou observação. Para cada
um, cite arquivo/linha, cenário de exploração, impacto e mitigação mínima.
Separe validações reexecutadas de evidências históricas. Não implemente correções.
