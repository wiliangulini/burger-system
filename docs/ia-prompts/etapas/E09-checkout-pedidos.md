# E09 — Checkout e pedidos

## Referência obrigatória

Antes de executar qualquer ação, leia:

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- Arquivo atual da etapa: `docs/ia-prompts/etapas/E09-checkout-pedidos.md`

## Correspondência no roadmap de execução

Esta etapa consolida as seguintes entradas do `roadmap-execucao-ia.md`:

- IA-08.01 — Criar schemas de checkout
- IA-08.02 — Implementar serviço de cálculo de pedido
- IA-08.03 — Implementar criação transacional de pedido
- IA-08.04 — Criar página `/checkout`
- IA-08.05 — Criar página de confirmação de pedido

## Contexto obrigatório

- Projeto: Sistema de Hamburgueria.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Arquitetura: monolito modular, server-first, validação no servidor e separação entre área pública e admin.
- Execução: uma etapa por vez.
- MVP: catálogo público, carrinho sem login, checkout com pedido persistido, admin protegido, CRUD de categorias/produtos, upload seguro, pedidos/status, configurações, dashboard, testes e deploy.
- Pós-MVP proibido: gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, app mobile, multiloja, microserviços, filas/Redis/workers, login de cliente, login social, internacionalização, chat ao vivo e BI avançado.

## Objetivo da etapa

Implementar checkout sem login e criação consistente de pedido com validação server-side, recálculo financeiro, snapshot, transação e idempotência.

## Pré-requisitos

E08 aprovada; modelos de Pedido/ItemPedido prontos; catálogo e carrinho funcionando.

## Escopo permitido

- Criar schemas Zod para checkout.
- Validar dados do cliente, endereço, forma de pagamento e itens no servidor.
- Recalcular preços, subtotais, taxa e total no servidor.
- Criar serviço puro de cálculo de pedido com testes unitários.
- Criar pedido em transação atômica.
- Usar `idempotencyKey` para evitar duplicidade.
- Criar snapshots imutáveis de cliente, itens, preço, taxa e total.
- Criar página `/checkout` e confirmação com código público.
- Limpar carrinho após pedido criado com sucesso.

## Escopo proibido

- Gateway de pagamento, Pix automático, webhook bancário ou pagamento real online.
- Login/cadastro de cliente.
- Confiar em preço, subtotal, taxa ou total enviados pelo cliente.
- Criar pedido fora de transação.
- Permitir reenvio duplicado com mesmo idempotencyKey.
- Alterar status admin fora da criação inicial.
- Não fazer commit, merge, push ou deploy automaticamente.

## Arquivos prováveis de alteração

- `app/(public)/checkout/page.tsx`
- `app/(public)/pedido/[codigo]/page.tsx`
- `app/api/pedidos/**`
- `components/checkout/**`
- `lib/validations/checkout.*`
- `domain/order/**`
- `services/order/**`
- `tests/order/**`
- `tests/checkout/**`

## Arquivos proibidos de alteração

- `app/admin/pedidos/**`
- `components/admin/pedidos/**`
- `auth.ts`
- `middleware.ts`
- `prisma/schema.prisma exceto ajuste indispensável e justificado`
- `prisma/migrations/** exceto ajuste indispensável e justificado`
- `.env`
- `.env.local`

## Prompt de execução — Codex

````text
Atue como Codex no VS Code para executar a etapa E09 — Checkout e pedidos do Sistema de Hamburgueria.

Antes de alterar qualquer arquivo, leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E09-checkout-pedidos.md

Objetivo da etapa:
Implementar checkout sem login e criação consistente de pedido com validação server-side, recálculo financeiro, snapshot, transação e idempotência.

Pré-requisito da etapa:
E08 aprovada; modelos de Pedido/ItemPedido prontos; catálogo e carrinho funcionando.

Escopo permitido:
- Criar schemas Zod para checkout.
- Validar dados do cliente, endereço, forma de pagamento e itens no servidor.
- Recalcular preços, subtotais, taxa e total no servidor.
- Criar serviço puro de cálculo de pedido com testes unitários.
- Criar pedido em transação atômica.
- Usar `idempotencyKey` para evitar duplicidade.
- Criar snapshots imutáveis de cliente, itens, preço, taxa e total.
- Criar página `/checkout` e confirmação com código público.
- Limpar carrinho após pedido criado com sucesso.

Escopo proibido:
- Gateway de pagamento, Pix automático, webhook bancário ou pagamento real online.
- Login/cadastro de cliente.
- Confiar em preço, subtotal, taxa ou total enviados pelo cliente.
- Criar pedido fora de transação.
- Permitir reenvio duplicado com mesmo idempotencyKey.
- Alterar status admin fora da criação inicial.

Procedimento obrigatório:
1. Execute `git status --short` e identifique alterações pendentes.
2. Se houver arquivos alterados fora do escopo desta etapa, pare e registre o bloqueador.
3. Faça somente a menor implementação/documentação necessária para cumprir os critérios de aceite.
4. Não implemente etapa futura.
5. Não faça commit, merge, push ou deploy automaticamente.
6. Execute os comandos obrigatórios de validação listados neste arquivo.
7. Gere relatório final completo no formato exigido.

Arquivos prováveis de alteração:
- `app/(public)/checkout/page.tsx`
- `app/(public)/pedido/[codigo]/page.tsx`
- `app/api/pedidos/**`
- `components/checkout/**`
- `lib/validations/checkout.*`
- `domain/order/**`
- `services/order/**`
- `tests/order/**`
- `tests/checkout/**`

Arquivos proibidos ou sensíveis:
- `app/admin/pedidos/**`
- `components/admin/pedidos/**`
- `auth.ts`
- `middleware.ts`
- `prisma/schema.prisma exceto ajuste indispensável e justificado`
- `prisma/migrations/** exceto ajuste indispensável e justificado`
- `.env`
- `.env.local`

Critérios de aceite:
- Checkout valida todos os dados no servidor.
- Pedido recalcula valores usando banco como fonte da verdade.
- Pedido é criado em transação.
- Snapshot do pedido preserva dados financeiros e do cliente.
- Idempotência impede duplicação.
- Código público é gerado e exibido.
- Carrinho é limpo apenas após sucesso.
- Testes cobrem cálculo, snapshot e idempotência.

Comandos obrigatórios de validação:
```bash
npx prisma validate
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

Se algum comando não existir ainda no projeto, registre como pendência com justificativa. Não crie scripts fora do escopo da etapa apenas para mascarar ausência de validação.
````

## Prompt de revisão — Claude Code

````text
Atue como Claude Code no VS Code para revisar criticamente a implementação da etapa E09 — Checkout e pedidos feita pelo Codex.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E09-checkout-pedidos.md
- diff atual da branch

Objetivo da revisão:
Verificar se a implementação cumpre a etapa E09 sem extrapolar escopo, sem enfraquecer segurança e sem antecipar etapas futuras.

Não implemente código nesta revisão, salvo autorização explícita do usuário. Priorize análise, apontamentos e bloqueadores.

Verifique obrigatoriamente:
- Checkout valida todos os dados no servidor.
- Pedido recalcula valores usando banco como fonte da verdade.
- Pedido é criado em transação.
- Snapshot do pedido preserva dados financeiros e do cliente.
- Idempotência impede duplicação.
- Código público é gerado e exibido.
- Carrinho é limpo apenas após sucesso.
- Testes cobrem cálculo, snapshot e idempotência.

Verifique também:
- arquivos alterados versus arquivos prováveis;
- ausência de alterações em arquivos proibidos;
- comandos executados e resultado;
- riscos de autenticação, autorização, dados, pedido, checkout, upload, deploy ou segurança quando aplicável;
- ausência de feature creep;
- qualidade de tipagem, validação server-side e separação de responsabilidades.

Formato da resposta:
- Veredito geral: aprovado, aprovado com ajustes ou reprovado.
- Problemas encontrados por arquivo.
- Correções obrigatórias.
- Correções recomendadas.
- Riscos remanescentes.
- Evidências dos critérios de aceite.
- Confirmação de que nenhum commit, merge, push ou deploy foi feito automaticamente.
````

## Prompt de correção — Codex

````text
Atue como Codex no VS Code para aplicar somente as correções obrigatórias apontadas na revisão da etapa E09 — Checkout e pedidos.

Leia obrigatoriamente:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E09-checkout-pedidos.md
- relatório de revisão do Claude Code

Regras obrigatórias:
- Aplique apenas correções obrigatórias da revisão.
- Não refatore por preferência pessoal.
- Não implemente etapa futura.
- Não adicione nova funcionalidade.
- Não altere arquivos proibidos, salvo se a revisão apontou correção obrigatória e justificada.
- Não faça commit, merge, push ou deploy automaticamente.

Após corrigir:
1. Liste exatamente o que foi corrigido.
2. Execute novamente os comandos obrigatórios de validação.
3. Gere relatório final com pendências e riscos remanescentes.

Comandos obrigatórios:
```bash
npx prisma validate
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```
````

## Prompt de auditoria final — Claude Code

````text
Atue como Claude Code no VS Code para realizar auditoria final da etapa E09 — Checkout e pedidos.

Esta auditoria é somente leitura. Não implemente código, não edite documentação, não faça commit, merge, push ou deploy.

Leia:
- docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md
- docs/ia-roadmaps/roadmap-execucao-ia.md
- docs/ia-prompts/etapas/E09-checkout-pedidos.md
- relatório de execução do Codex
- relatório de revisão do Claude Code
- relatório de correção do Codex, se existir
- diff final da branch

Objetivo:
Confirmar se a etapa pode ser encerrada e se está segura para avançar para a próxima etapa.

Audite:
- Checkout valida todos os dados no servidor.
- Pedido recalcula valores usando banco como fonte da verdade.
- Pedido é criado em transação.
- Snapshot do pedido preserva dados financeiros e do cliente.
- Idempotência impede duplicação.
- Código público é gerado e exibido.
- Carrinho é limpo apenas após sucesso.
- Testes cobrem cálculo, snapshot e idempotência.

Bloqueadores conhecidos desta etapa:
- Qualquer confiança em valores financeiros do cliente.
- Ausência de transação.
- Ausência de idempotência.
- Pedido sem snapshot.
- Teste de cálculo ausente ou falhando.
- Gateway de pagamento introduzido.

Formato da resposta:
- Veredito final: aprovado para avançar, aprovado com ressalvas ou bloqueado.
- Evidências objetivas.
- Arquivos alterados no diff final.
- Comandos validados e resultados informados.
- Riscos remanescentes.
- Pendências para próxima etapa.
- Confirmação de ausência de aumento de escopo.
````

## Critérios de aceite

- Checkout valida todos os dados no servidor.
- Pedido recalcula valores usando banco como fonte da verdade.
- Pedido é criado em transação.
- Snapshot do pedido preserva dados financeiros e do cliente.
- Idempotência impede duplicação.
- Código público é gerado e exibido.
- Carrinho é limpo apenas após sucesso.
- Testes cobrem cálculo, snapshot e idempotência.

## Comandos obrigatórios de validação

```bash
npx prisma validate
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
git status --short
```

## Bloqueadores da etapa

- Qualquer confiança em valores financeiros do cliente.
- Ausência de transação.
- Ausência de idempotência.
- Pedido sem snapshot.
- Teste de cálculo ausente ou falhando.
- Gateway de pagamento introduzido.
- Ausência de relatório final.
- Alterações em arquivos proibidos sem justificativa e revisão reforçada.

## Critérios para avançar para a próxima etapa

- Implementação ou documentação da etapa concluída.
- Revisão cruzada concluída.
- Correções obrigatórias aplicadas.
- Auditoria final aprovada.
- Comandos obrigatórios executados ou pendências justificadas.
- Relatórios salvos em `docs/ia-auditorias/`.
- Commit da etapa realizado manualmente pelo usuário ou responsável humano.

## Relatório esperado

O agente deve responder com:

- Tarefa.
- Objetivo.
- Arquivos criados/alterados/removidos.
- Decisões técnicas.
- Comandos executados.
- Resultado dos comandos.
- Testes executados.
- Pendências.
- Riscos.
- Confirmação de ausência de aumento de escopo.

