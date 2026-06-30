# Regra Claude — Carrinho, checkout e pedidos

## Aplicação

Use esta regra quando a tarefa tocar carrinho, checkout e pedidos no `burger-shop-system`.

## Regras específicas

- Carrinho client-side é apenas UX, não fonte de verdade.
- Checkout deve recalcular subtotal, taxa, desconto e total no servidor.
- Pedidos devem gravar snapshots de produto, preço e adicionais.
- Código de pedido deve ser único e seguro para acompanhamento público limitado.
- Criação de pedido deve ser transacional e preferencialmente idempotente.
- Status e cancelamento devem seguir regras explícitas.

## Procedimento obrigatório

1. Confirme branch e `git status`.
2. Leia `PROJECT_RULES.md`, `AGENTS.md` e `CLAUDE.md`.
3. Leia os arquivos diretamente relacionados ao módulo.
4. Identifique contratos, consumidores e riscos.
5. Se a mudança for sensível ou multiarquivo, proponha plano antes de editar.
6. Implemente a menor alteração segura suficiente.
7. Revise diff.
8. Execute validações existentes e relevantes.
9. Informe validações não executadas.
10. Finalize com status.

## Validações recomendadas

- `npm run lint`, se existir.
- `npm run typecheck`, se existir.
- `npm run build`, se existir.
- Testes unitários/e2e relevantes, se existirem.
- Validação manual do fluxo afetado.
- `npx prisma validate` quando houver Prisma.

## Sinais de bloqueio

- necessidade de secrets ou `.env`;
- dependência nova sem aprovação;
- alteração destrutiva de banco;
- mudança de contrato público sem revisão;
- risco de expor admin, pedido, pagamento ou dados pessoais.
