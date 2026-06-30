# Manifesto — Etapa 4: Prompts por etapa para Codex e Claude Code

Este pacote contém a documentação operacional da Etapa 4 para o Sistema de Hamburgueria.

## Arquivos gerados

- `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`
- `docs/ia-prompts/etapas/E01-setup-inicial.md`
- `docs/ia-prompts/etapas/E02-modelagem-prisma.md`
- `docs/ia-prompts/etapas/E03-auth-admin.md`
- `docs/ia-prompts/etapas/E04-layout-publico-admin.md`
- `docs/ia-prompts/etapas/E05-categorias-admin.md`
- `docs/ia-prompts/etapas/E06-produtos-admin.md`
- `docs/ia-prompts/etapas/E07-catalogo-publico.md`
- `docs/ia-prompts/etapas/E08-carrinho.md`
- `docs/ia-prompts/etapas/E09-checkout-pedidos.md`
- `docs/ia-prompts/etapas/E10-pedidos-admin-status.md`
- `docs/ia-prompts/etapas/E11-dashboard-configuracoes.md`
- `docs/ia-prompts/etapas/E12-testes-deploy.md`

## Observação

O arquivo `docs/ia-roadmaps/roadmap-execucao-ia.md` foi incluído no pacote como conveniência, copiando o arquivo importado nesta conversa. Se o seu repositório já tiver esse arquivo revisado e versionado, compare antes de substituir.

## Como copiar para o repositório

Extraia o ZIP na raiz do repositório ou copie manualmente a pasta `docs/`.

Depois inspecione:

```bash
git status
git diff --stat
find docs/ia-prompts -maxdepth 3 -type f | sort
git diff --name-only
```

Commit sugerido se somente os prompts foram adicionados:

```bash
git add docs/ia-prompts
git commit -m "docs: adicionar prompts para Codex e Claude por etapa"
```
