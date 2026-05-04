# Design System Rulebook — Ingredients 2.0
Extended Edition · ezCater

## References
- Design System (Ingredients 2.0): https://www.figma.com/design/oMjvBdJWrluOS88erFGyBR/
- Brand Guidelines: https://www.figma.com/design/ggeblsfqla2VcgwleDxF26/ezCater-Brand-Guidlines-2026
- Performance Dashboard Reference: https://www.figma.com/design/CAanVdfL2YVZeA4mBbc9Sk/Sponsored-listing

---

## Design System Philosophy

Our design system exists to make the ezCater product feel cohesive, trustworthy, and effortless for restaurant partners. Every design decision should serve clarity and task completion — not aesthetic novelty. We favor consistency over creativity, purposeful over ornamental, and accessibility over assumption.

These rules are not suggestions. They are the foundation for scalable, reviewable, and maintainable product design across large teams and evolving systems.

---

## Golden Rules

Non-negotiable. Apply to every screen, component, and annotation.

1. **Tokens only.** Never use raw hex values, hardcoded sizes, or magic numbers.
2. **Check the system first.** Always look in Ingredients 2.0 before building from scratch.
3. **Accessibility is not optional.** Every screen must meet WCAG 2.1 AA at minimum.
4. **Auto-layout everywhere.** Never use blank spacing frames.
5. **Color never stands alone.** Pair all color cues with text or icons.
6. **Typography follows the scale.** No one-off sizes, no custom weights.
7. **Motion must earn its place.** Animate only to communicate change, never to decorate.
8. **Microcopy is design.** Treat labels, error messages, and empty states with the same rigor as layout.
9. **Every interactive element has all its states.** Default, hover, focus, active, disabled, error, loading.
10. **When a rule is missing, document it.** Gaps in the system are contribution opportunities.

---

## 1. Foundations

### 1.1 Tokens
- Always use semantic variable token names instead of raw hex values, including in annotations and redlines.
- Token names must be semantic (e.g., color.text.critical) not descriptive (e.g., red-500).
- Never hardcode spacing values that exist as tokens in the system.
- When a token doesn't exist for your use case, propose one. Don't work around the system.

### 1.2 Spacing
- Use 8px as the base spacing unit. All custom spacing must be a multiple of 8 (8, 16, 24, 32, 40, 48...).
- Use 4px only for micro-spacing within a component (e.g., icon-to-label gap).
- Apply 16px horizontal padding to all interactive elements: buttons, inputs, selects, filters.
- Use 24px vertical spacing between major sections on a page.
- Never use arbitrary spacing values (e.g., 10px, 13px, 15px).

### 1.3 Color
- Never use color as the sole means of conveying meaning — always pair with an icon, label, or text.
- Red is reserved for critical errors and destructive states only.
- Green is reserved for success states only.
- All text must meet WCAG 2.1 AA contrast: 4.5:1 for text, 3:1 for UI components and icons.

### 1.4 Typography
- Use 'Body M' for all standard body text.
- Use 'Body S' and 'Body XS' only for captions, subtitles, helper text, or legal print.
- Typography styles must come exclusively from Ingredients 2.0 — no custom one-off sizes or weights.

### 1.5 Headers
- Use 'Heading L' for the top-level page header only — one per page.
- Use 'Heading S' for section headings within a page.
- Use 'Heading XS' for headings within a paragraph or dense content block.
- Never use more than three heading levels in a single view.

---

## 2. Components

### 2.1 Component Architecture
- Always check Ingredients 2.0 for an existing component before building from scratch.
- Never recreate a component with modified internals — use a system variant or formally propose a new one.
- Components must not be detached from the system without explicit justification and team approval.

### 2.2 Buttons
- Use the default (medium) button size for most UI scenarios.
- Use the small button size only in constrained spaces (e.g., inside a table row).
- In modals and dialogs, place buttons bottom-right in this order: [Secondary] [Primary].
- Use only one primary button per view unless each row in a list requires its own primary CTA.
- Use the destructive variant for delete or remove actions — never a primary button.
- Button labels must be verb-led: "Save changes", "Add promotion", "Remove store".

### 2.3 Form Elements (Inputs, Selects, Filters)
- Apply 16px horizontal padding to all input fields, select dropdowns, and filter controls.
- Every input must have a visible, associated label — placeholder text alone is not a label.
- Error states must include an error message below the field — not just a red border.
- Required fields must be marked clearly (asterisk or explicit "Required" label).

---

## 3. Layout & Responsiveness

### 3.1 Frame Dimensions
- Use 1440 x 1024px as the default desktop frame size.
- Increase frame height to accommodate content — never clip content within a fixed-height frame.

### 3.2 Auto-Layout
- Use auto-layout at all times for frames that contain multiple elements.
- Never create blank "spacing" frames to push elements apart.
- Use "Fill container" on children that should expand, "Hug contents" on containers that should shrink.

---

## 4. Interaction & State Management

- Every interactive component must define all states: Default, Hover, Focus, Active, Disabled, Error, Loading, Empty.
- Loading states must show a skeleton or spinner — never leave a blank space while content loads.
- Empty states must communicate what the user can do next, not just that nothing exists.
- Error states must be actionable: explain what went wrong and how to fix it.

State decision guide:
- Loading — Skeleton for content areas; spinner for inline or button actions
- Empty — Illustration + description + primary CTA
- Error — Inline message + retry action
- Success — Toast notification, auto-dismiss after 4–5 seconds
- Disabled — Reduced opacity + tooltip explaining why

---

## 5. Content & Microcopy

- Write at a 7th-grade reading level. Use clear, human, conversational language.
- All CTAs and button labels must be verb-led: "Save changes", "Add promotion", "Remove store".
- Never use "Click here", "Submit", or "OK" as standalone labels.
- Error messages must tell users what went wrong and what to do next.

Tone: Confident not arrogant · Helpful not patronizing · Direct not blunt · Human not robotic

---

## 6. Accessibility

- Minimum standard: WCAG 2.1 AA compliance on every screen. Target AAA for body text.
- Color contrast: 4.5:1 for text, 3:1 for UI components and icons.
- Never rely on color alone to convey meaning — always pair with text or icon.
- All interactive elements must be keyboard-navigable.
- Focus indicators must always be visible — never suppress or hide the focus ring.

---

## 7. Data Display

- Use tables for multi-column comparable data. Use lists for single-dimension content.
- Paginate tables with more than 25 rows by default.
- Empty table cells must show a dash (—) — never leave a blank cell.
- Charts must always include axis labels, legends, and data point labels or tooltips.
- Never use a pie chart for more than 5 segments — prefer bar charts for comparison.

---

## 8. Shape & Visual Style

- Use 16px border radius for cards, modals, panels, and container elements.
- Use 8px border radius for smaller components: tags, badges, chips.
- Use 4px border radius for inline micro-elements: tooltips, small buttons.
- Never mix border radius values within the same component family.

---

## 9. Placeholder Content

- Use these placeholder store names in order: 1234 Test Store · 1235 Broadway · 1236 Park Place
- Use these placeholder sales values: $1,234 · $2,345 · $3,456
- Never use "Lorem ipsum" — all placeholder text must be product-realistic.
- Date placeholders should use realistic timeframes (e.g., "Last 30 days").
