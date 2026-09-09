# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite, strict TypeScript, semantic HTML, CSS, and Canvas 2D. No React, server, database, physics engine, animation framework, external font service, or unnecessary large dependency. The finished site must deploy as static files.

## Users

People who need uncommon Unicode characters while writing, calculating, coding, or communicating in a browser and want to copy them with almost no friction.

## Product Purpose

Quick Symbols makes a complete catalog of useful characters immediately available in the extension. This landing page introduces the product through a deliberate 97-symbol interactive sample: touch or click a moving symbol to copy it.

## Positioning

The product is demonstrated instead of explained. Its landing experience is the actual one-click copy interaction, with the full-catalog extension offer appearing only after three successful copies in a cycle.

## Operating Context

The site runs as a full-viewport, pointer- and touch-friendly experience on desktop, laptop, tablet, iPhone, and Android. The separate Chrome extension is represented by source material in `reference/`, which is read-only and never a production dependency.

## Capabilities and Constraints

- Render one explicit 97-entry selection from the 193-entry source catalog on every viewport; only size, spacing, and distribution adapt responsively.
- Animate symbols slowly with Canvas 2D, `requestAnimationFrame`, bounded device pixel ratio, edge collisions, and spatially partitioned symbol collisions.
- Copy through the Clipboard API and show brief, quiet feedback.
- Pause the scene and block copies when the conversion dialog opens on every third successful copy; dismissing outside resets the cycle.
- Always default to day mode. Only the saved manual theme preference may override later visits.
- Respect reduced motion, keyboard focus, mobile target sizes, Page Visibility, and static-host constraints.
- Keep first-load UI to the symbols and icon-only theme control. Do not add navigation, introductory copy, search, categories, footer, analytics, accounts, audio, 3D, or promotional UI before engagement.
- Keep the verified Chrome Web Store URL in configuration and the final public site URL as an obvious replaceable placeholder.

## Brand Commitments

The product name is Quick Symbols. Preserve the extension's ñ° isotopy and its existing light identity: cool off-white ground, dark blue-gray ink, indigo primary color, pale periwinkle surfaces, restrained rounding, and clear system typography. Night mode must feel like the same product rather than a generic black inversion. UI copy is concise, natural English.

## Evidence on Hand

- `reference/symbols.js`: the authoritative 193-entry Unicode catalog, bilingual names, and search keywords.
- `reference/categories.js`: grouping evidence only; the landing must not expose categories.
- `reference/popup.css`: existing color, typography, spacing, focus, and feedback behavior.
- `reference/manifest.json`: extension identity and icon declarations.
- Verified Chrome Web Store destination supplied by the user: `https://chromewebstore.google.com/detail/aippaakfdoegjcaggenmndonedgijenb`.
- `reference/icons/`: matching 16, 32, 48, and 128 px ñ° application icons.
- No testimonials, customer logos, benchmarks, pricing, analytics requirement, or verified Chrome Web Store/public-domain URL is supplied; do not fabricate them.

## Product Principles

1. Demonstrate utility before asking for conversion.
2. Keep the motion calm, legible, and performant.
3. Preserve the extension's recognizable identity without copying its popup layout.
4. Prefer the simplest accessible implementation that fully satisfies the interaction.
5. Treat the reference extension as immutable source evidence, never as runtime code.

## Accessibility & Inclusion

Maintain strong contrast and visible keyboard focus, provide accessible names for icon-only controls, make touch targets comfortable, support pointer and touch input without hover dependence, and substantially reduce motion when requested by the operating system.
