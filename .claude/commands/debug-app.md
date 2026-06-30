---
description: Investiga bugs com hipóteses, evidências, causa raiz, correção mínima e validação.
---

# Comando: debug-app

Tarefa/contexto recebido:

$ARGUMENTS

## Papel do agente

Atue como engenheiro sênior de debug e análise de causa raiz para o `burger-shop-system`.

## Leitura obrigatória

1. Verifique branch atual e `git status`.
2. Leia `PROJECT_RULES.md`.
3. Leia `AGENTS.md`.
4. Leia `CLAUDE.md`.
5. Leia regras relevantes em `.claude/rules/` conforme o módulo afetado.
6. Se houver continuidade, leia o relatório mais recente em `docs/ia-auditorias/` e `CODEX.md`.
7. Leia arquivos reais relacionados antes de concluir ou editar.

## Regra principal

Investigue antes de alterar. Não implemente correções especulativas.

## Regras de escopo

- Identifique objetivo, comportamento atual, comportamento esperado e critérios de aceite.
- Liste arquivos prováveis e arquivos proibidos antes de editar, quando houver edição.
- Não leia nem edite `.env`, `.env.*`, secrets ou credenciais.
- Não execute deploy, push, reset, clean, `rm -rf`, `sudo`, `ssh`, `curl` ou `wget` sem autorização explícita.
- Não instale dependências sem justificativa e aprovação.
- Não altere Auth.js/RBAC, Prisma/migrations, checkout, pedidos, pagamentos ou webhooks sem plano.
- Não declare validação executada sem evidência.

## Procedimento

1. Resuma a tarefa em uma frase objetiva.
2. Separe fatos, hipóteses, riscos e decisões necessárias.
3. Mapeie módulos afetados: catálogo, admin, auth/RBAC, Prisma, carrinho, checkout, pedidos, cozinha, pagamento, delivery, UI ou observabilidade.
4. Para tarefa sensível ou multiarquivo, proponha plano incremental antes de editar.
5. Execute somente a menor alteração segura suficiente, quando a edição estiver autorizada.
6. Preserve Server Components por padrão e Client Components apenas para interatividade.
7. Preserve validação server-side com Zod em entradas externas.
8. Preserve regra de preço: servidor recalcula checkout e pedidos gravam snapshots.
9. Revise `git diff` antes de concluir.
10. Gere relatório final.

## Validações

Antes de executar comandos, leia `package.json` e confirme scripts reais. Use somente comandos existentes e seguros:

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test
npm run test:unit
npm run test:e2e
npx prisma validate
npx prisma generate
npx prisma migrate status
```

`npx prisma migrate dev` e `npx prisma db seed` exigem confirmação de ambiente local. Nunca execute `migrate reset` sem autorização explícita.

## Formato de relatório

```md
## Resumo
## Escopo
## Arquivos lidos
## Arquivos alterados
## Arquivos criados
## Decisões técnicas
## Validações executadas
## Validações não executadas
## Riscos e pendências
## Próximo passo recomendado
Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```
