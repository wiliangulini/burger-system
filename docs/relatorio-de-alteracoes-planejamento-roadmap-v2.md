# Relatório de Alterações — Planejamento e Roadmap v2

## 1. Resumo executivo

Foram gerados dois artefatos revisados: `relatorio-tecnico-planejamento-Sistema-Hamburgueria-v2.docx` e `roadmap-burger-system-code-v2.md`. A revisão incorporou a análise crítica do roadmap anterior, preservando o núcleo técnico correto e corrigindo os principais riscos: escopo inflado, etapas grandes demais para IA, mistura de MVP com pós-MVP, autenticação pouco fechada, lacunas no modelo histórico de pedido e fragilidade nos guardrails operacionais.

O roadmap v2 foi recriado como trilha nova, não apenas remendado. Ele mantém rastreabilidade com R01-R16, mas reorganiza as etapas em E00-E29, quebra blocos grandes e move pagamentos avançados, integrações, observabilidade avançada e Kubernetes para pós-MVP.

## 2. Problemas da análise crítica incorporados

- Redução do MVP para catálogo, carrinho, checkout, pedido, admin, status e configurações essenciais.
- Separação explícita entre MVP essencial, MVP recomendado e pós-MVP.
- Remoção de Kubernetes e infraestrutura complexa da rota principal.
- Remoção de gateway de pagamento completo, webhooks e integração delivery externo do MVP.
- Quebra de R04, R05, R09, R11, R12, R15 e R16 em etapas menores.
- Inclusão de Fase 0 para documentação operacional, DoD, branch strategy e templates de IA.
- Reforço da autenticação com sessão segura, hash robusto, RBAC e autorização server-side.
- Inclusão de snapshot de endereço no pedido.
- Inclusão de histórico/log de mudança de status como recomendação complementar.
- Separação do CRUD de produtos do upload de imagem.
- Definição de prompt universal por etapa com arquivos permitidos/proibidos, dependências, testes e relatório final.

## 3. Problemas parcialmente incorporados

| Ponto | Como foi tratado |
| --- | --- |
| Cozinha dedicada | Foi mantida como pós-MVP curto ou recomendada apenas se não atrasar go-live. |
| Observabilidade | Logs estruturados e health check foram antecipados como mínimos; tracing, métricas centralizadas e alertas avançados foram movidos para pós-MVP. |
| Dashboard | Dashboard básico permaneceu recomendado; analytics avançado foi removido do MVP. |
| Pix | Pix manual permaneceu como recomendado; Pix automatizado e webhooks foram movidos para pós-MVP. |

## 4. Recomendações adiadas para pós-MVP

| Recomendação | Motivo do adiamento |
| --- | --- |
| Gateway de pagamento | Exige sandbox, assinatura de webhook, idempotência, reconciliação e tratamento de falhas. Não deve bloquear o primeiro fluxo operacional. |
| Pix automatizado e webhooks | Depende de provedor, validação de assinatura, retries e conciliação. Entrar após pedido manual estar estável. |
| Integração iFood/delivery externo | Alto acoplamento externo e regras próprias. Deve entrar quando o fluxo interno estiver validado. |
| Impressão térmica | Depende de hardware, rede local, drivers e rotina operacional. Deve ser pós-MVP ou piloto isolado. |
| Dashboard/analytics avançado | Pode consumir muito tempo antes de haver dados reais suficientes. |
| Observabilidade avançada | Logs estruturados mínimos entram cedo; tracing, métricas centralizadas e alertas complexos ficam para evolução. |
| Filas, cache avançado e Kubernetes | Não são necessários para single-store com picos moderados. Adotar apenas com pressão operacional real. |
| Multi-loja, app mobile e fidelidade | São evoluções de produto, não premissas da primeira versão. |
| Backend dedicado | Arquitetura separada aumenta custo cognitivo e operacional no início. |
| App mobile | Web responsivo deve validar primeiro o fluxo transacional. |

## 5. Partes do planejamento reestruturadas

| Parte | Alteração feita |
| --- | --- |
| Escopo | Separado em MVP essencial, MVP recomendado e pós-MVP. |
| Modelo de dados | Simplificado para o núcleo e reforçado com snapshot de endereço e histórico/log de status. |
| Segurança | Diretrizes objetivas de sessão, hash, RBAC, validação e uploads. |
| IA | Workflow Codex + Claude Code com plano, arquivos-alvo, testes e relatório final. |
| Git | Branch por etapa, PR obrigatório, commits pequenos e revisão manual. |
| Testes | Mínimos por tipo de etapa, não apenas “adicionar testes”. |
| Deploy | Vercel/Postgres gerenciado ou VPS simples, sem Kubernetes no MVP. |

## 6. Partes do roadmap antigo mantidas

| Parte mantida | Justificativa |
| --- | --- |
| Next.js App Router + React + TypeScript + Tailwind | Stack preservada. |
| PostgreSQL + Prisma | Preservado como base de persistência. |
| Monólito modular | Preservado como arquitetura do MVP. |
| Server Components/Server Actions/Route Handlers | Preservada a divisão conceitual de responsabilidades. |
| Área pública separada de admin | Preservado por segurança e clareza. |
| Snapshots de pedido | Preservado e ampliado para endereço. |
| Validação server-side | Preservada e reforçada. |
| Revisão manual e commits frequentes | Preservados e operacionalizados. |

## 7. Partes removidas ou movidas para pós-MVP

- Gateway de pagamento, webhooks e reconciliação: movidos para pós-MVP porque exigem integração externa, assinatura, retries, idempotência e conciliação.
- Integrações iFood/delivery externo: movidas para pós-MVP porque dependem de contratos e regras externas.
- Kubernetes/backend dedicado/Redis obrigatório: removidos do MVP porque não são necessários para single-store inicial.
- Observabilidade avançada, backups complexos, alertas e escala: movidos para pós-MVP; no MVP ficam logs e health check simples.
- Analytics avançado: movido para pós-MVP; dashboard básico permanece recomendado.
- Impressão térmica: movida para pós-MVP por depender de hardware, rede local e rotina operacional validada.
- App mobile, multi-loja e fidelidade: movidos para backlog evolutivo.

## 8. Etapas quebradas em tarefas menores

| Etapa antiga | Nova organização |
| --- | --- |
| R04 | R04a schema núcleo; R04b migrations/índices; R04c seed mínimo. |
| R05 | R05a login/sessão; R05b RBAC/guards/auditoria mínima. |
| R09 | R09a CRUD de produtos sem upload; R09b upload seguro. |
| R11 | R11a validação checkout; R11b cálculo server-side; R11c persistência idempotente; R11d confirmação/tracking. |
| R12 | R12a listagem; R12b detalhe/status; R12c histórico/log. |
| R14 | Movido para pós-MVP: adapter, sandbox, webhook e reconciliação. |
| R15 | Separado em settings/delivery e dashboard básico; analytics para pós-MVP. |
| R16 | R16a CI mínimo; R16b deploy/health/logs; R16c backup/escala/observabilidade avançada pós-MVP. |

## 9. Decisões técnicas preservadas

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- PostgreSQL.
- Prisma.
- Auth.js ou autenticação segura compatível.
- Monólito modular.
- Server Components por padrão.
- Client Components apenas quando houver interatividade real.
- Server Actions para mutações internas.
- Route Handlers para APIs, health checks, tracking e webhooks futuros.
- Validação server-side.
- Área pública separada da área admin.
- RBAC básico.
- Snapshots de pedido.
- Testes mínimos.
- Commits frequentes.
- Revisão manual obrigatória.

## 10. Decisões técnicas alteradas

- Auth: deixou de aceitar genericamente “JWT no MVP” como decisão implícita e passou a exigir ADR/trade-off entre sessão JWT e sessão em banco, com preferência conservadora por validação server-side robusta para admin.
- Modelo de pedido: passou a exigir snapshot de endereço além de snapshot de item/preço.
- Produtos: upload foi separado do CRUD para reduzir risco de segurança.
- Pagamento: gateway saiu do MVP; métodos manuais permanecem.
- Infra: Kubernetes, backend dedicado, filas e cache avançado saíram da trilha MVP.
- Observabilidade: logs/health check ficam no MVP recomendado; observabilidade avançada foi adiada.
- Roadmap: R01-R16 não foram mantidas literalmente; foram reorganizadas em etapas menores E00-E29.

## 11. Riscos restantes

- O projeto ainda pode inflar se itens pós-MVP forem puxados antes do fluxo principal estar validado.
- A autenticação precisa de decisão registrada em ADR antes da implementação.
- Upload de imagem continua sensível e deve ser tratado como etapa isolada.
- O cálculo de pedido precisa de testes unitários e de integração para evitar divergência financeira.
- Deploy pode falhar se envs, migrations e seed seguro não forem revisados.
- A IA ainda pode produzir diffs grandes se o prompt padrão não for usado de forma rígida.
- O dashboard básico deve ser cortado se atrasar cardápio, checkout, pedido ou admin.

## 12. Próximo passo recomendado

O próximo passo ideal é aprovar o planejamento v2 e o roadmap v2, depois gerar prompts individuais para E00, E01 e E02. A execução deve começar pela Fase 0, preparando documentação, DoD, branch strategy e templates de relatório antes de qualquer implementação do sistema.

A recomendação prática permanece: avançar para uma etapa somente quando a anterior estiver concluída, testada, revisada e aceita.
