# Quick Symbols landing

Lightweight interactive landing page for the Quick Symbols Chrome extension.

## Local development

```bash
pnpm install
pnpm dev
```

## Verification

```bash
pnpm typecheck
pnpm build
```

The production output is written to `dist/` and can be deployed to any static host.

## Before publishing

- Replace `https://quicksymbols.example/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the final public domain.

The files in `reference/` are source evidence only. Production code and assets are independent copies and never import from that directory.

The landing's deliberate 97-symbol sample is defined in `src/data/landing-symbols.ts`. Desktop and mobile import that same list; responsive behavior only changes its spatial presentation.
