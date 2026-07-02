---
name: final-audit
description: Use esta skill para auditoria final antes de commit, entrega ou handoff, sem editar arquivos.
---

# final-audit — burger-shop-system

## Finalidade

Fornecer metodologia de auditoria antes de encerrar etapa, handoff ou release.
A skill não concede permissão de escrita; somente um command ou prompt explícito
pode autorizar o caminho exato do relatório.

## Procedimento

1. Compare solicitação, critérios de aceite, diff e relatórios anteriores.
2. Identifique arquivos analisados e alterações fora do escopo.
3. Separe validações reexecutadas de resultados apenas registrados.
4. Verifique segurança, integridade de dados, contratos e regressões.
5. Classifique achados por severidade e cite evidência verificável.
6. Emita veredito sem corrigir a implementação auditada.

## Saída

Registre escopo, evidências, achados, validações executadas e não executadas,
riscos, pendências, próximo passo e status final padronizado.
