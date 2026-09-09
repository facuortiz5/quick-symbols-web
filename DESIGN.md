---
name: Quick Symbols
description: A quiet typographic planetarium for discovering and copying useful symbols.
colors:
  cool-paper: "#f7f8fc"
  midnight-field: "#11142a"
  deep-ink: "#172033"
  moonlit-ink: "#f4f5ff"
  quiet-ink: "#626b80"
  quiet-ink-night: "#bdc2d8"
  action-indigo: "#4f46e5"
  action-indigo-deep: "#3730a3"
  action-indigo-night: "#9da2ff"
  symbol-indigo: "#5148e7"
  symbol-indigo-night: "#adb1ff"
  pale-periwinkle: "#eef0ff"
  pale-periwinkle-night: "#292d5b"
  midnight-surface: "#1b2040"
  white-surface: "#ffffff"
  quiet-border: "#dfe2ea"
  quiet-border-night: "#3b4168"
  focus-indigo: "#6366f1"
  focus-indigo-night: "#aeb2ff"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 8vw, 3rem)"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.035em"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 750
    lineHeight: 1.2
  symbol:
    fontFamily: "Georgia, Times New Roman, Segoe UI Symbol, serif"
    fontWeight: 500
    lineHeight: 1
rounded:
  toast: "11px"
  action: "12px"
  control: "13px"
  card: "16px"
spacing:
  xs: "10px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "28px"
components:
  theme-toggle:
    backgroundColor: "{colors.white-surface}"
    textColor: "{colors.action-indigo}"
    rounded: "{rounded.control}"
    size: "44px"
  copy-toast:
    backgroundColor: "{colors.deep-ink}"
    textColor: "{colors.white-surface}"
    rounded: "{rounded.toast}"
    padding: "10px 15px"
  extension-button:
    backgroundColor: "{colors.action-indigo}"
    textColor: "{colors.white-surface}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "12px 18px"
    height: "50px"
    width: "min(100%, 292px)"
  conversion-card:
    backgroundColor: "{colors.white-surface}"
    textColor: "{colors.deep-ink}"
    rounded: "{rounded.card}"
    padding: "clamp(28px, 7vw, 42px)"
---

# Design System: Quick Symbols

## Overview

**Creative North Star: "The Typographic Planetarium"**

Quick Symbols is a quiet field of useful characters in gentle motion. It demonstrates the product before it explains or promotes it: the entire first viewport belongs to 97 symbols, with only one compact theme control above the field.

The atmosphere is precise, calm, and lightly tactile. Cool paper, indigo type, restrained rounding, and functional depth carry the extension's existing identity without reproducing its popup layout. Night mode is the same world after dark—a deep blue-violet field with moonlit marks, never a generic black inversion. Conversion appears as an earned pause after successful use, not as permanent marketing chrome.

**Key Characteristics:**

- Edge-to-edge typographic motion with no introductory chrome.
- One authored 97-symbol sample shared by every viewport.
- Serif symbols paired with compact system-sans interface language.
- One indigo voice for symbols, action, state, and focus.
- Compact rounded controls, quiet borders, and ambient functional depth.

## Colors

The palette pairs cool neutral fields with a single indigo product voice. Day is airy rather than white; night is blue-violet rather than black.

### Primary

- **Action Indigo:** The authoritative action and interactive-state color.
- **Symbol Indigo:** A slightly brighter voice reserved for the moving catalog.
- **Moonlit Indigo:** The night-mode counterpart, tuned for legibility on the Midnight Field.

### Neutral

- **Cool Paper:** Default day field and browser theme color.
- **Midnight Field:** Saved night-mode field.
- **Deep Ink / Moonlit Ink:** Primary interface text in the two themes.
- **Quiet Ink:** Secondary copy and status language.
- **White / Midnight Surfaces:** Modal and floating-control materials.
- **Quiet Borders:** Low-contrast separation for the persistent control.

**The One Indigo Voice Rule.** Indigo carries identity and state; do not introduce a second decorative accent hue.

**The Daylight Default Rule.** Cool Paper is the first-visit default. Night mode follows an explicit saved user choice.

## Typography

**Display Font:** Inter with system-sans fallbacks  
**Label Font:** Inter with system-sans fallbacks  
**Symbol Font:** Georgia with Times New Roman and Segoe UI Symbol fallbacks

**Character:** Interface type is direct and compact; the serif symbol field supplies the expressive range. The pairing makes the catalog feel authored without a font download.

### Hierarchy

- **Display:** Heavy, tightly tracked, responsive system sans for the one earned conversion question.
- **Label:** Compact, strong system sans for the product lockup, primary action, and feedback.
- **Symbol:** Medium-weight serif glyphs sized responsively; hover or press may temporarily increase weight.

**The Symbols Are the Display Rule.** Do not add a decorative headline to the first viewport; the moving characters already perform that role.

**The Natural Case Rule.** Brand and action labels use natural sentence or title case, never tracked all-caps kickers.

## Layout

The main surface is a full-viewport, overflow-hidden Canvas field with no content container. One 44px theme control occupies the upper-right safe area; copy feedback is centered above the lower safe area. The conversion dialog is centered at a maximum width of 440px with 16px viewport margins.

Every viewport renders the same deliberate set of exactly 97 unique symbols. Responsive behavior changes presentation, not catalog membership or order: symbol sizes are 19–34px through 480px, 22–42px below 768px, and 28–60px from 768px upward. On phones the theme control uses a 12px safe-area inset and the conversion card tightens to 24px horizontal padding.

The live bounds of the theme control define a padded circular obstacle. Symbols are placed and continuously resolved outside that area so the control remains visually clear without reserving a rectangular dead zone.

**The Unframed Field Rule.** The symbol world reaches every edge; never place it inside a card, browser mockup, or conventional hero container.

**The Same Sky Rule.** Desktop, tablet, and mobile share the same 97 symbols; do not rotate, shuffle, or substitute the catalog by device.

## Elevation & Depth

Depth is ambient and functional. The Canvas stays flat. The theme control floats with a quiet diffuse shadow, copy feedback lifts briefly, and the earned conversion card receives the strongest shadow plus an 11px blurred backdrop because it temporarily replaces the interaction hierarchy.

- **Control Float:** A low-opacity blue-gray shadow for the persistent theme control.
- **Toast Lift:** A compact shadow for short-lived copy confirmation.
- **Conversion Lift:** The strongest ambient shadow, used only for the earned pause.
- **Action Glow:** A restrained indigo shadow under the primary Chrome action.

**The Flat Field Rule.** Symbols never receive individual cards, glows, pills, or drop shadows; depth belongs only to functional interface layers.

## Shapes

The form language is softly compact rather than pill-shaped. Controls use 11–13px radii, the modal uses 16px, and the product mark retains its 12px rounded-square silhouette. Borders are thin and quiet. Keyboard focus uses a solid 3px indigo outline with 3px offset.

The `ñ°` browser and dialog mark is derived deterministically from the extension reference artwork, centered with transparent breathing room at favicon sizes. The source artwork remains immutable.

**The No Pills Rule.** Rounding supports compact utility; it is not the identity.

## Components

### Theme Toggle

- **Shape:** A 44px square with 13px corners and a 20px line icon.
- **Material:** Translucent themed surface, quiet border, 10px backdrop blur, and ambient shadow.
- **Pointer states:** Fine-pointer hover deepens indigo and rises 1px; active press returns to the field and scales to 94%. Touch and mouse activation remove incidental focus so no outline persists.
- **Keyboard state:** Real keyboard focus remains clear through the solid `:focus-visible` ring; keyboard activation keeps focus.
- **Spatial behavior:** Its live geometry is an obstacle for the symbol field.

### Copy Feedback

- **Shape:** A compact 11px-radius status surface above the lower safe area.
- **Behavior:** It rises and settles after a successful copy, then leaves without shifting layout.

### Conversion Card

- **Composition:** Product lockup, the single title “Want more symbols?”, and one action—no supporting sentence or decorative arrow.
- **Behavior:** It appears only on the third successful copy in a cycle, pauses the field, takes focus, and resets the cycle when dismissed.
- **Material:** Opaque themed surface, 16px corners, centered layout, ambient shadow, and functional backdrop blur.

### Chrome Extension Button

- **Shape:** Centered action capped at 292px, 50px tall, with 12px corners and 12px × 18px padding.
- **Content:** “Add Quick Symbols to Chrome” links directly to the published Chrome Web Store listing.
- **States:** A 1px lift and stronger indigo shadow on fine-pointer hover, a solid keyboard focus outline, and a restrained pressed scale.

### Symbol Field

- **Catalog:** Exactly 97 deliberate, unique reference symbols on every device.
- **Scale:** 19–34px mobile, 22–42px tablet, and 28–60px desktop.
- **Behavior:** Calm 8.4–18px-per-second base drift before the mobile velocity factor, soft spatial collisions, edge bounce, and a 22px minimum hit radius. Contact slows, scales, copies, and releases the glyph.
- **Accessibility:** The Canvas is focusable; arrow keys select, Enter or Space copies, and selection changes announce the glyph with its English name.
- **Motion preference:** Reduced motion lowers travel to one tenth while retaining the usable field.

## Do's and Don'ts

### Do:

- **Do** let the 97-symbol sample demonstrate the product before showing conversion copy.
- **Do** keep the first viewport silent except for moving symbols and the theme toggle.
- **Do** keep the catalog identical across viewport classes while adapting glyph size.
- **Do** pause the entire scene whenever the conversion dialog is open.
- **Do** preserve keyboard focus while suppressing only incidental mouse and touch focus.
- **Do** treat reduced motion, safe areas, 44px touch controls, and the theme-control obstacle as system requirements.

### Don't:

- **Don't** add navigation, search, categories, footers, testimonials, metrics, or permanent promotional content to the first view.
- **Don't** put symbols in cards, chips, pills, or uniform grid cells.
- **Don't** add gradients, glass panels, extra accent colors, or decorative badges beyond the established field glow and functional backdrop blur.
- **Don't** replace the serif symbol voice with emoji, illustrations, or 3D objects.
- **Don't** let design-system advice override the Quick Symbols brief, its simplicity, or its performance budget.
