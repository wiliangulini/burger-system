---
description: Revisa implementação, diff ou arquivos sem editar, classificando achados por severidade.
---

# Comando: review-code

Tarefa/contexto recebido:

$ARGUMENTS

## Modo

Atue como revisor sênior. Não altere implementação, testes, schema, migrations,
prompts ou configurações.

## Contrato de escrita

- Se `$ARGUMENTS` informar um relatório, o caminho deve estar em
  `docs/ia-auditorias/`, terminar em `-revisao.md` e corresponder à etapa.
- Esse relatório será o único arquivo que pode ser criado ou atualizado.
- Sem caminho exato, responda somente no chat.
- Não derive nem corrija silenciosamente caminho ambíguo.
- Se o caminho violar o contrato, não escreva e reporte bloqueio.

## Procedimento

1. Confirme branch, `git status`, objetivo e critérios de aceite.
2. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md` e as rules aplicáveis.
3. Leia o diff e os contratos consumidores necessários.
4. Verifique escopo, comportamento, segurança, dados, falhas e regressões.
5. Avalie se os testes mitigam os riscos da mudança.
6. Classifique cada achado como bloqueador, alto, médio, baixo ou observação.
7. Para cada achado, cite arquivo/linha, impacto, evidência e correção mínima.
8. Não implemente as correções.

## Validações

Leia `package.json` antes de executar qualquer script. Use apenas validações
existentes, seguras e relevantes. Separe comandos reexecutados de resultados
apenas registrados em relatórios anteriores.

## Saída

```md
## Veredito
## Achados por severidade
## Evidências dos critérios de aceite
## Validações reexecutadas
## Evidências históricas não reexecutadas
## Riscos remanescentes
## Correções obrigatórias
## Correções recomendadas
Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```
