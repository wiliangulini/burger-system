# PROJECT_RULES.md — Regras do projeto burger-shop-system

Este documento concentra as regras técnicas, funcionais, segurança e produto do sistema de hamburgueria. Deve ser lido antes de qualquer implementação, revisão, auditoria, refatoração ou documentação operacional no repositório.

Seções de domínio/arquitetura (§4-13, §16) foram extraídas para notas atômicas em
[`docs/regras-dominio/`](docs/regras-dominio/README.md) — este arquivo continua a fonte de verdade;
cada seção abaixo mantém número e título, com um ponteiro para a nota completa.

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

> Moved to [`docs/regras-dominio/arquitetura-nextjs-app-router.md`](docs/regras-dominio/arquitetura-nextjs-app-router.md) — load on demand.

---

## 5. Modelo de domínio mínimo

> Moved to [`docs/regras-dominio/modelo-de-dominio.md`](docs/regras-dominio/modelo-de-dominio.md) — load on demand.

---

## 6. Autenticação, sessão e RBAC

> Moved to [`docs/regras-dominio/autenticacao-sessao-rbac.md`](docs/regras-dominio/autenticacao-sessao-rbac.md) — load on demand.

---

## 7. Prisma, banco e migrations

> Moved to [`docs/regras-dominio/prisma-banco-migrations.md`](docs/regras-dominio/prisma-banco-migrations.md) — load on demand.

---

## 8. Catálogo, produtos, imagens e adicionais

> Moved to [`docs/regras-dominio/catalogo-produtos-adicionais.md`](docs/regras-dominio/catalogo-produtos-adicionais.md) — load on demand.

---

## 9. Carrinho, checkout e pedidos

> Moved to [`docs/regras-dominio/carrinho-checkout-pedidos.md`](docs/regras-dominio/carrinho-checkout-pedidos.md) — load on demand.

---

## 10. Tela de cozinha e fluxo operacional

> Moved to [`docs/regras-dominio/cozinha-fluxo-operacional.md`](docs/regras-dominio/cozinha-fluxo-operacional.md) — load on demand.

---

## 11. Pagamento manual, Pix/gateway futuro e webhooks

> Moved to [`docs/regras-dominio/pagamento-webhooks.md`](docs/regras-dominio/pagamento-webhooks.md) — load on demand.

---

## 12. Store settings, horários e delivery

> Moved to [`docs/regras-dominio/store-settings-delivery.md`](docs/regras-dominio/store-settings-delivery.md) — load on demand.

---

## 13. UI/UX e Tailwind

> Moved to [`docs/regras-dominio/ui-ux-tailwind.md`](docs/regras-dominio/ui-ux-tailwind.md) — load on demand.

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

> Moved to [`docs/regras-dominio/padrao-implementacao-incremental.md`](docs/regras-dominio/padrao-implementacao-incremental.md) — load on demand.

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
