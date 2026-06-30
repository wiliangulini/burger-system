# ADR 0003 - Escopo do MVP

## Status

Aceita

## Contexto

O sistema de hamburgueria precisa evoluir em etapas pequenas e revisáveis. Antes de implementar domínio, banco, autenticação, checkout ou admin, o MVP precisa estar fechado para evitar aumento de escopo.

## Decisão

O MVP será single-store, em PT-BR, com moeda BRL e pagamento manual/offline. O cliente não terá login no MVP.

Escopo obrigatório do MVP:

- catálogo público;
- carrinho sem login;
- checkout com pedido persistido;
- admin protegido;
- CRUD de categorias e produtos;
- upload seguro de imagens;
- pedidos e status;
- tela de cozinha;
- configurações operacionais;
- dashboard básico;
- testes;
- deploy controlado.

Ficam fora do MVP obrigatório:

- gateway de pagamento e Pix automático;
- integração iFood, marketplaces ou WhatsApp automático;
- emissão fiscal;
- app mobile;
- multiloja;
- microserviços;
- filas, Redis e workers;
- login de cliente;
- login social;
- internacionalização;
- chat ao vivo;
- BI avançado.

## Consequências

- Etapas futuras não podem tratar itens pós-MVP como requisito obrigatório.
- Checkout, pedidos, autenticação, RBAC, Prisma e upload continuam áreas sensíveis e exigem revisão reforçada quando forem implementados.
- A E01 fica limitada a base documental, bootstrap técnico, qualidade mínima, teste de sanity e CI inicial.
