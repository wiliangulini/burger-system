---
name: senior-code-review
description: Use esta skill para revisar código, diff ou implementação sem editar, classificando achados por severidade.
---

# senior-code-review — burger-shop-system

## Finalidade

Revisar diff ou implementação sem editar o produto, priorizando defeitos,
regressões, segurança e aderência aos critérios de aceite.

## Procedimento

1. Confirme escopo solicitado, branch, status e base de comparação.
2. Leia o diff e o contexto necessário de cada contrato alterado.
3. Verifique comportamento, autorização, validação, dados e tratamento de falhas.
4. Avalie testes pelo risco que mitigam, não apenas pela existência.
5. Classifique achados como bloqueador, alto, médio, baixo ou observação.
6. Cite arquivo e linha, impacto, evidência e correção mínima recomendada.

## Saída

Comece pelos achados em ordem de severidade. Depois informe dúvidas, validações
executadas e não executadas, riscos residuais e veredito. A skill não autoriza
escrita; use command com caminho explícito quando um relatório for necessário.
