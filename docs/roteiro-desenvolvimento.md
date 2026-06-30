# Roteiro de desenvolvimento

## Branches

- Branch de integração atual: `dev`.
- Branch estável esperada para release: `main`, se existir no repositório remoto.
- Cada etapa deve usar branch própria a partir de `dev`.
- Nome recomendado: `feature/eXX-nome-da-etapa` ou `fix/eXX-ajuste`.

## Fluxo

1. Confirmar branch e `git status --short`.
2. Ler `PROJECT_RULES.md`, `AGENTS.md`, guia do agente e prompt da etapa.
3. Confirmar escopo, arquivos prováveis, arquivos proibidos e critérios de aceite.
4. Implementar a menor mudança suficiente.
5. Executar validações obrigatórias.
6. Revisar diff.
7. Salvar relatório em `docs/ia-auditorias/`.
8. Solicitar revisão cruzada antes de avançar.

## Regras de PR

- Não fazer commit direto em `main`.
- Não fazer merge sem revisão.
- Não fazer push, deploy ou migration destrutiva sem autorização humana explícita.
- Não misturar etapas no mesmo PR.
- Não tratar backlog pós-MVP como requisito do MVP.

## Relatório por etapa

Todo relatório deve conter:

- resumo;
- escopo solicitado;
- arquivos lidos;
- arquivos criados, alterados e removidos;
- decisões técnicas;
- validações executadas;
- validações não executadas;
- riscos e pendências;
- próximo passo recomendado;
- status final.
