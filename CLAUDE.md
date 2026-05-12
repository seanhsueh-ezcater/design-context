# ezCater Prototyping Rules

These rules apply to every prototype built in this repo. Follow them without being asked.

## Tech stack — always use this

- **React 18** with functional components and hooks
- **TypeScript** — all files use `.tsx` / `.ts`, never `.jsx` / `.js`
- **Tailwind CSS** for all layout and spacing — no inline `style={{}}` except for CSS custom property values (e.g. `style={{ color: 'var(--green-700)' }}`)
- **Vite** as the build tool
- Props and data shapes must have explicit TypeScript interfaces or types — no `any`

## Design system — Tapas / Ingredients 2.0

- Always check Tapas for an existing component before building from scratch: https://tapas.ezcater.com
- Import components from `@ezcater/tapas` when available
- Use ezCater design tokens (CSS custom properties) for all colors — never hardcode hex values
- Typography: use Tapas text styles (`heading-xl`, `heading-sm`, `body-md`, `body-sm`) — never hardcode font sizes
- Border radius: `16px` for cards/modals, `8px` for badges/chips, `4px` for micro-elements
- Spacing: `8px` base unit, `24px` between page sections, `16px` horizontal padding on interactive elements
- Buttons: use default (medium) size unless inside a table row — then use small

## File structure

Every prototype lives in its own subdirectory with this shape:

```
my-prototype/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tailwind.config.ts
  postcss.config.js
  src/
    main.tsx
    App.tsx
    index.css          # Tailwind directives + CSS custom properties
    icons.tsx          # SVG icon components
    components/
      ui.tsx           # Tapas primitive wrappers
      FeatureName.tsx  # Feature-level components
```

## Component rules

- One component per file for anything beyond a small helper
- No default exports for UI primitives — named exports only
- `forwardRef` on any component that wraps a DOM element
- Never use `React.FC` — type props with an explicit interface instead
- Co-locate data (mock arrays, constants) in the same file as the component that owns it

## Placeholder content

Use these when mocking store or sales data:
- Stores: `1234 Test Store`, `1235 Broadway`, `1236 Park Place`
- Sales: `$1,234` · `$2,345` · `$3,456`

## What not to do

- No class components
- No `any` types
- No inline styles for layout (use Tailwind)
- No hardcoded hex colors (use CSS custom properties)
- No `console.log` left in committed code
- Do not install `@ezcater/tapas` if it fails — build equivalent primitives using the same API shape and Tapas CSS tokens
