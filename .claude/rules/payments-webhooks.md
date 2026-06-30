# Regra Claude — Pagamentos e webhooks

## Aplicação

Use esta regra quando a tarefa tocar pagamentos e webhooks no `burger-shop-system`.

## Regras específicas

- MVP usa pagamento manual; gateway real exige ADR e autorização.
- Adapters de pagamento devem ficar isolados em services/payment.
- Webhooks devem ser Route Handlers.
- Todo webhook real deve validar assinatura, idempotência e providerRef.
- Não salve secrets de gateway em código ou documentação.
- Não atualize pedido pago sem reconciliação mínima.

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
