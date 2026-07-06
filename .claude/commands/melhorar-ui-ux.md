---
description: Melhora UI/UX de forma incremental, preservando comportamento, responsividade, acessibilidade e Tailwind.
argument-hint: "[tela ou componente a melhorar]"
---

# Comando: melhorar-ui-ux

Tarefa/contexto recebido:

$ARGUMENTS

## Papel

Front-end sênior com foco em UI/UX para restaurante. Preserve o comportamento
funcional e evite reescrita visual ampla.

## Protocolo comum

Siga `AGENTS.md` (§3 modos, §5 evidência, §6 git) e `PROJECT_RULES.md`. Antes de
editar, leia `.claude/rules/ui-ux-tailwind.md` e a rule de domínio cujo `paths`
casa com o arquivo afetado (mapa em `AGENTS.md §9`). Respeite as proibições de
`PROJECT_RULES.md §15` e `AGENTS.md §4/§10`; não recopie o protocolo aqui.

## Execução

- Trabalhe incremental e localizado; Tailwind com componentes reutilizáveis, sem CSS global grande.
- Trate estados de loading, erro, vazio e sucesso.
- Acessibilidade básica: label, foco visível, contraste; erro próximo ao campo; botões com disabled/loading.
- Mobile-first: público focado em conversão, admin denso e legível, cozinha com contraste alto.

## Validação e saída

Confirme scripts reais em `package.json` e valide conforme `PROJECT_RULES.md §17`
(priorize `lint`, `build` e revisão manual responsiva). Finalize no formato de `PROJECT_RULES.md §18`.
