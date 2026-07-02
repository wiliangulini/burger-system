---
name: safe-refactor
description: Use esta skill para refatorar código com preservação de comportamento, contratos, auth, banco, checkout e pedidos.
---

# safe-refactor — burger-shop-system

## Finalidade

Orientar refatoração com preservação comprovável de comportamento, contratos,
autorização, dados e fluxos financeiros.

## Procedimento

1. Defina o comportamento que não pode mudar e como será observado.
2. Mapeie consumidores, tipos, persistência e efeitos colaterais.
3. Crie ou confirme testes de caracterização antes da mudança.
4. Faça alterações pequenas, sem misturar feature ou mudança de contrato.
5. Compare resultados antes/depois e revise o diff por regressões.
6. Interrompa se a preservação não puder ser demonstrada.

## Restrições

Mudanças em Auth/RBAC, migrations, checkout ou pedidos exigem plano e revisão
específica. A skill não amplia a autorização dada pela tarefa.
