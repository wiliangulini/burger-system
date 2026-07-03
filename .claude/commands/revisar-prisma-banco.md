---
description: Revisa schema, migrations, seed, integridade e transações Prisma sem alterar banco ou implementação.
---

# Comando: revisar-prisma-banco

Tarefa/contexto recebido:

$ARGUMENTS

## Modo e escrita

Realize revisão somente leitura de Prisma e banco. Não execute migration, seed,
reset, deploy, escrita no banco ou alteração de implementação.

Se `$ARGUMENTS` autorizar relatório, o caminho deve estar em
`docs/ia-auditorias/`, terminar em `-revisao.md`, corresponder à etapa e ser o
único arquivo gravável. Sem caminho exato, responda somente no chat.

## Leitura obrigatória

1. Leia `PROJECT_RULES.md`, `AGENTS.md`, `CLAUDE.md`.
2. Leia `.claude/rules/prisma-database.md`.
3. Leia schema, migrations, seed, serviços e testes relacionados sem acessar
   `.env`, credenciais ou banco de produção.

## Checklist especializado

- Coerência do schema, tipos, enums e relações.
- Políticas `onDelete` e risco de perda ou órfãos.
- `Decimal` para valores monetários.
- Constraints, unicidade e nulabilidade.
- Índices coerentes com consultas e invariantes.
- Migrations pequenas, ordenadas e não reescritas.
- Compatibilidade com dados existentes e estratégia corretiva.
- Seed idempotente, restrito ao ambiente correto e sem credenciais.
- Transações curtas para checkout e criação de pedido.
- Snapshot financeiro e idempotência.
- Separação explícita entre local, preview e produção.

## Saída

Classifique achados como bloqueador, alto, médio, baixo ou observação. Cite
arquivo/linha, risco para dados, evidência e correção mínima. Diferencie análise
estática de comandos realmente executados e nunca recomende `migrate reset` como
correção automática.
