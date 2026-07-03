# Instruções Gerais para Agentes de IA — Sistema de Hamburgueria

## Finalidade

Este arquivo define regras obrigatórias para todos os prompts de execução, revisão, correção e auditoria do Sistema de Hamburgueria.

Use estas instruções em conjunto com:

- `docs/ia-roadmaps/roadmap-execucao-ia.md`
- o arquivo Markdown da etapa atual em `docs/ia-prompts/etapas/`
- os documentos de arquitetura, decisões e auditoria já versionados no repositório

## Regras obrigatórias

- Trabalhar somente na etapa solicitada.
- Não implementar funcionalidades fora do escopo da etapa atual.
- Não adicionar recursos fora do MVP.
- Não alterar a stack definida: Next.js App Router, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, Auth.js, Vercel e GitHub Actions.
- Não trocar arquitetura sem autorização explícita.
- Não migrar para Pages Router.
- Não introduzir microserviços, filas, Redis, workers, multiloja, app mobile, gateway de pagamento, Pix automático, integração iFood/marketplaces, emissão fiscal, BI avançado, login de cliente, login social, internacionalização ou chat ao vivo no MVP.
- Não remover validações de segurança.
- Não enfraquecer autenticação, autorização, sessão, hash de senha ou proteção de rotas admin.
- Não alterar lógica de pedido, checkout, cálculo financeiro, snapshots ou idempotência sem justificativa explícita e revisão reforçada.
- Não fazer commit, merge, push ou deploy automaticamente.
- Não modificar arquivos fora do escopo permitido pela etapa.
- Sempre listar arquivos criados, alterados e removidos.
- Sempre informar comandos executados e resultados.
- Sempre gerar relatório final da tarefa.
- Sempre apontar pendências, riscos e limitações.

## Regras de segurança

- Validar dados no servidor com Zod ou mecanismo equivalente.
- Não confiar em dados enviados pelo cliente.
- Não logar senhas, tokens, cookies, dados sensíveis ou dados pessoais desnecessários.
- Não expor stack trace em produção.
- Proteger todas as rotas administrativas no servidor.
- Garantir que rotas `/admin/*` sejam acessíveis apenas a usuários autenticados com roles autorizados (`OWNER`, `MANAGER`, `ATTENDANT`, `KITCHEN` conforme permissão da rota — ver `PROJECT_RULES.md §6`).
- Em pedidos, recalcular preços no servidor.
- Em checkout, usar transação atômica e idempotência.
- Em upload, validar MIME, extensão, tamanho e nome do arquivo no servidor.
- Usar `Decimal` para valores monetários no Prisma.
- Versionar apenas `.env.example`, nunca `.env`, `.env.local` ou segredos reais.

## Regras de execução

Antes de alterar qualquer arquivo:

1. Leia `docs/ia-roadmaps/roadmap-execucao-ia.md`.
2. Leia `docs/ia-prompts/INSTRUCOES-GERAIS-PARA-AGENTES.md`.
3. Leia o arquivo da etapa atual em `docs/ia-prompts/etapas/`.
4. Execute `git status --short`.
5. Identifique se existem alterações pendentes de outra etapa.
6. Se houver alterações fora do escopo, pare e registre o bloqueador.

Durante a execução:

- Faça a menor mudança suficiente.
- Preserve padrões já existentes no projeto.
- Prefira Server Components para leitura e páginas públicas/admin quando não houver interatividade local.
- Use Client Components somente para estado local, carrinho, formulários interativos, upload e feedback visual necessário.
- Centralize regras de domínio fora da UI sempre que possível.
- Não duplique lógica financeira.
- Não use dados enviados pelo cliente como fonte da verdade financeira.

## Regras de revisão

A revisão deve verificar:

- aderência ao escopo da etapa;
- ausência de feature creep;
- alterações fora dos arquivos permitidos;
- riscos de segurança;
- regressões de autenticação/autorização;
- integridade do schema Prisma e migrations;
- qualidade de tipagem TypeScript;
- comandos de validação executados;
- evidências dos critérios de aceite;
- relatório final completo.

## Regras de relatório final

Ao final de cada execução, revisão, correção ou auditoria, responder com:

- Tarefa executada.
- Objetivo da etapa.
- Arquivos criados/alterados/removidos.
- Decisões técnicas tomadas.
- Comandos executados.
- Resultado dos comandos.
- Testes realizados.
- Pendências.
- Riscos.
- Confirmação de que não houve aumento de escopo.
- Salve os relatórios de execução, revisão, correção e auditoria em
  `docs/ia-auditorias/` no caminho exato definido pelo prompt da etapa. Em
  revisão ou auditoria, esse relatório deve ser o único arquivo gravável.

## Regra de parada

Se houver ambiguidade crítica, risco de segurança, conflito com o roadmap ou necessidade de alterar escopo, pare e registre a pendência no relatório. Não improvise implementação fora do escopo.

## Regra de correção

Correções pós-revisão devem se limitar aos problemas obrigatórios apontados pelo revisor. Não aproveite uma rodada de correção para refatorar, criar novas telas, alterar domínio, trocar bibliotecas ou antecipar etapas futuras.

## Regra de auditoria final

A auditoria final é somente leitura quanto à implementação e aos documentos do produto. O auditor não deve alterar código, configurações, schema, migrations, testes, prompts ou documentação funcional. A única escrita autorizada é criar ou atualizar o relatório da própria auditoria no caminho exato definido pelo prompt da etapa, em `docs/ia-auditorias/`, usando `docs/ia-auditorias/TEMPLATE-agent-report.md`; nenhum outro arquivo pode ser modificado durante a auditoria.

O auditor deve avaliar o diff, os comandos executados, os critérios de aceite e os riscos remanescentes com evidências verificáveis. Deve separar comandos reexecutados durante a auditoria de resultados apenas registrados em relatórios anteriores e nunca declarar uma validação como executada ou aprovada sem evidência. O relatório deve registrar veredito, arquivos analisados, riscos, pendências, validações executadas e não executadas, ausência de aumento de escopo e o status final padronizado.
