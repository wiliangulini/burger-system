---
paths:
  - "app/**/*.tsx"
  - "app/globals.css"
  - "src/components/**/*"
  - "tailwind.config.ts"
  - "postcss.config.mjs"
---

# Regra Claude — UI/UX e Tailwind

Derivada de `PROJECT_RULES.md §13`. Se esta rule divergir da regra do projeto,
atualize `PROJECT_RULES.md` primeiro. Procedimento, validação e sinais de bloqueio
vivem no protocolo comum (`AGENTS.md §3-§10`, `PROJECT_RULES.md §17`).

## Invariantes

- Interface pública mobile-first e focada em conversão.
- Admin objetivo, legível e eficiente.
- Cozinha com botões grandes e alto contraste.
- Use Tailwind sem criar CSS global grande sem necessidade.
- Formulários têm labels, mensagens de erro e estado loading/disabled.
- Não adicione biblioteca visual sem aprovação.
