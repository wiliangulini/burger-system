---
name: senior-code-agent
description: Use esta skill para implementação técnica geral com postura sênior, escopo controlado, validação e relatório.
---

# senior-code-agent — burger-shop-system

## Descrição

Skill operacional para o sistema de hamburgueria baseado em Next.js App Router, React, TypeScript, Tailwind, PostgreSQL, Prisma, Auth.js e Zod.

## Quando usar

Use quando a tarefa envolver diretamente o objetivo descrito no frontmatter e houver necessidade de padronizar análise, execução, revisão ou continuidade entre agentes.

## Quando não usar

Não use quando:

- a tarefa for trivial e de uma linha sem risco;
- o usuário pediu apenas explicação conceitual;
- a skill não corresponde ao tipo de trabalho;
- a tarefa exigir credenciais, deploy ou ação destrutiva sem autorização;
- o escopo estiver ambíguo e a próxima ação segura for pedir plano/autorização.

## Leitura obrigatória

1. `PROJECT_RULES.md`.
2. `AGENTS.md`.
3. `CLAUDE.md`, se estiver usando Claude Code.
4. `CODEX.md` e `.codex/instructions.md`, se houver continuidade com Codex.
5. Regras relevantes em `.claude/rules/`.
6. Relatório anterior em `docs/ia-auditorias/`, quando houver continuidade.
7. Arquivos reais relacionados ao escopo.

## Procedimento

1. Confirme branch atual e `git status`.
2. Reescreva o objetivo em uma frase clara.
3. Declare escopo permitido e fora de escopo.
4. Identifique arquivos prováveis, arquivos proibidos e módulos afetados.
5. Separe fatos, hipóteses, riscos e decisões.
6. Para mudança sensível ou multiarquivo, proponha plano incremental antes de editar.
7. Preserve Server Components por padrão e Client Components apenas quando houver interatividade.
8. Preserve Auth.js/RBAC, Prisma, checkout, pedidos, status e segurança.
9. Não leia nem edite `.env`, `.env.*`, secrets ou credenciais.
10. Não execute comandos destrutivos, deploy ou push sem autorização.
11. Revise o diff antes de concluir.
12. Execute validações reais e disponíveis.
13. Gere relatório final.

## Checklist

- [ ] Branch e `git status` verificados.
- [ ] Documentação obrigatória lida.
- [ ] Escopo entendido e delimitado.
- [ ] Arquivos relevantes lidos antes de editar.
- [ ] Nenhum secret acessado.
- [ ] Nenhum comando destrutivo executado.
- [ ] Auth/RBAC preservado ou revisado.
- [ ] Prisma/migrations preservados ou revisados.
- [ ] Checkout/pedidos preservados ou revisados.
- [ ] UI responsiva e acessível quando aplicável.
- [ ] Validações executadas ou pendentes informadas.
- [ ] Relatório final gerado.

## Formato de saída

```md
## Resumo
## Escopo
## Arquivos lidos
## Arquivos alterados
## Achados ou implementação
## Decisões técnicas
## Validações executadas
## Validações não executadas
## Riscos e pendências
## Próximo passo recomendado
Status final: Aprovado | Aprovado com observações | Requer ajustes | Bloqueado
```
