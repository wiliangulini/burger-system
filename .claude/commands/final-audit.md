---
description: Executa auditoria final antes de commit, entrega ou continuidade por outro agente.
---

# Comando: final-audit

Tarefa/contexto recebido:

$ARGUMENTS

## Modo

Atue como auditor técnico final. Não corrija a implementação auditada.

## Contrato de escrita

- `$ARGUMENTS` deve informar o caminho exato do relatório.
- O caminho deve estar em `docs/ia-auditorias/`, terminar em
  `-auditoria-final.md` e corresponder à etapa auditada.
- Não altere arquivos de implementação ou documentação funcional. A única
  escrita permitida é o relatório explicitamente autorizado.
- Se o caminho estiver ausente, ambíguo ou inconsistente, não escreva e reporte
  `Status final: Bloqueado`.

## Procedimento

1. Confirme branch, status, escopo, critérios de aceite e caminho autorizado.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md`, rules e prompt da etapa.
3. Compare diff final, execução, revisão e correção, quando existir.
4. Preserve todos os artefatos auditados.
5. Identifique arquivos analisados e alterações fora de escopo.
6. Separe comandos reexecutados de evidências históricas.
7. Nunca aprove uma validação sem resultado verificável.
8. Classifique riscos e determine se a etapa pode avançar.

## Saída

Use `docs/ia-auditorias/TEMPLATE-agent-report.md` e inclua veredito, evidências,
validações executadas e não executadas, riscos, pendências, próximo passo e
status final padronizado.
