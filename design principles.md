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
- Use color tokens for all text, backgrounds, borders, icons, and overlays.
- Token names must be semantic (e.g., `color.text.critical`) not descriptive (e.g., `red-500`).
- Never hardcode spacing values that exist as tokens in the system.
- Theming must be entirely token-based — no local inline overrides.
- When a token doesn't exist for your use case, propose one. Don't work around the system.

**DO:** Reference `color.background.surface` for card backgrounds. Use spacing tokens for all gaps.
**DON'T:** Use `#FF0000` directly in any annotation. Create local styles that duplicate system tokens.
*Anti-patterns:* "Magic number" spacing values (13px, 17px) with no token basis.

### 1.2 Spacing
- Use 8px as the base spacing unit. All custom spacing must be a multiple of 8 (8, 16, 24, 32, 40, 48...).
- Use 4px only for micro-spacing within a component (e.g., icon-to-label gap).
- Apply 16px horizontal padding to all interactive elements: buttons, inputs, selects, filters.
- Use 24px vertical spacing between major sections on a page.
- Follow the built-in spacing within components — never manually override label-to-input gaps.
- Never use arbitrary spacing values (e.g., 10px, 13px, 15px).

**DO:** Use 8px between an icon and its label. Use 24px between a card header and content sections.
**DON'T:** Insert blank "spacer" frames. Override built-in component spacing. Use 10px gaps.

### 1.3 Color
- Never use color as the sole means of conveying meaning — always pair with an icon, label, or text.
- Red is reserved for critical errors and destructive states only.
- Green is reserved for success states only.
- Decorative color is permitted only in illustrations, never in UI components.
- All text must meet WCAG 2.1 AA contrast: 4.5:1 for text, 3:1 for UI components and icons.
- Prefer AAA (7:1) contrast for body text and critical information.

**DO:** Pair a red error icon with an error text message below the field.
**DON'T:** Use color as the only differentiator between two states.

### 1.4 Typography
- Use 'Body M' for all standard body text.
- Use 'Body S' and 'Body XS' only for captions, subtitles, helper text, or legal print.
- Never use 'Body S' or 'Body XS' as the primary reading text in a view.
- Typography styles must come exclusively from Ingredients 2.0 — no custom one-off sizes or weights.
- Establish hierarchy through a combination of weight, size, color, and positioning — not size alone.
- Monospace fonts are reserved for code. Tabular numerals are used for financial/data figures.

**DO:** Use 'Body M Regular' for descriptive card text. Use 'Body S' for timestamps and helper text.
**DON'T:** Use a custom 13px text style. Apply 'Heading XS' to body paragraphs.

### 1.5 Headers
- Use 'Heading L' for the top-level page header only — one per page.
- Use 'Heading S' for section headings within a page.
- Use 'Heading XS' for headings within a paragraph or dense content block.
- Never use more than three heading levels in a single view.
- Do not skip heading levels (e.g., don't jump from Heading L directly to Heading XS).
- Do not use bold body text as a substitute for a semantic heading.

**DO:** One 'Heading L' as the page title. 'Heading S' to introduce each settings card section.
**DON'T:** Place two 'Heading L' elements on the same page.

---

## 2. Components

### 2.1 Component Architecture
- Always check Ingredients 2.0 for an existing component before building from scratch.
- Read the component's documented guidelines in Ingredients 2.0 before placing it in a design.
- Never recreate a component with modified internals — use a system variant or formally propose a new one.
- Prefer composition over customization: combine existing components rather than modifying them.
- Components must not be detached from the system without explicit justification and team approval.

**DO:** Use the system Filter component before building a custom filter.
**DON'T:** Detach a component and manually edit its internals.
*Anti-patterns:* "Zombie components" — detached instances that drift from the system over time.

### 2.2 Buttons
- Use the default (medium) button size for most UI scenarios.
- Use the small button size only in constrained spaces (e.g., inside a table row).
- Never use a large button unless explicitly specified in the design reference.
- In modals and dialogs, place buttons bottom-right in this order: [Secondary] [Primary].
- Use only one primary button per view unless each row in a list requires its own primary CTA.
- Use the destructive variant for delete or remove actions — never a primary button.
- Disabled buttons must be paired with a tooltip or inline explanation of why they are disabled.
- Button labels must be verb-led: "Save changes", "Add promotion", "Remove store".

**DO:** Use [Cancel] [Save changes] right-aligned in modal footers.
**DON'T:** Place two primary buttons side-by-side. Use "OK", "Yes", or "Submit" as standalone labels.

### 2.3 Form Elements (Inputs, Selects, Filters)
- Apply 16px horizontal padding to all input fields, select dropdowns, and filter controls.
- Every input must have a visible, associated label — placeholder text alone is not a label.
- Error states must include an error message below the field — not just a red border.
- Required fields must be marked clearly (asterisk or explicit "Required" label).
- All inputs must support keyboard navigation and screen reader labels.

**DO:** Use the system Input component with its built-in label slot.
**DON'T:** Use placeholder text as a label substitute. Rely on a red border alone to indicate an error.

---

## 3. Layout & Responsiveness

### 3.1 Frame Dimensions
- Use 1440 x 1024px as the default desktop frame size.
- Increase frame height to accommodate content — never clip or hide content within a fixed-height frame.
- Do not shrink the frame width below 1440px for desktop designs unless explicitly designing a responsive breakpoint.

### 3.2 Auto-Layout
- Use auto-layout at all times for frames that contain multiple elements.
- Never create blank "spacing" frames to push elements apart.
- Set explicit alignment (top, center, baseline) on all auto-layout containers.
- Use "Fill container" on children that should expand, "Hug contents" on containers that should shrink.
- Prefer nested auto-layouts over absolute positioning.

**DO:** Use a vertical auto-layout with 24px gap for page sections.
**DON'T:** Insert a blank frame between elements to create spacing.

### 3.3 Responsive Behavior
- Design for 1440px as the primary breakpoint. Annotate responsive behavior for navigation, tables, and data-heavy components.
- Content must reflow at smaller viewports — not be hidden or clipped.
- Never design interactions that require a mouse — all interactions must be keyboard-accessible.

---

## 4. Interaction & State Management

- Every interactive component must define all states: Default, Hover, Focus, Active, Disabled, Error, Loading, Empty.
- Focus states must always be visible — never suppress the focus ring without replacing it.
- Loading states must show a skeleton or spinner — never leave a blank space while content loads.
- Empty states must communicate what the user can do next, not just that nothing exists.
- Error states must be actionable: explain what went wrong and how to fix it.
- Success states should be transient (toast/banner) and must not block the user's workflow.
- Provide immediate visual feedback (spinner, disabled state) within 300ms of a user action.

**State decision guide:**
- Loading — Skeleton for content areas; spinner for inline or button actions
- Empty — Illustration + description + primary CTA
- Error — Inline message + retry action
- Success — Toast notification, auto-dismiss after 4–5 seconds
- Disabled — Reduced opacity + tooltip explaining why

---

## 5. Content & Microcopy

- Treat microcopy with the same rigor as visual decisions — words are part of the design.
- Write at a 7th-grade reading level. Use clear, human, conversational language.
- Use contractions (it's, you'll, we'll) to sound conversational.
- Avoid jargon, corporate speak, and passive voice.
- All CTAs and button labels must be verb-led: "Save changes", "Add promotion", "Remove store".
- Never use "Click here", "Submit", or "OK" as standalone labels.
- Omit punctuation from single-sentence UI labels unless the sentence is a question.
- Apply the "Jenga test" — remove every word possible until meaning breaks, then add one back.
- Error messages must tell users what went wrong and what to do next.

**Tone guidelines:** Confident not arrogant · Helpful not patronizing · Direct not blunt · Human not robotic

---

## 6. Accessibility & Internationalization

### 6.1 Accessibility
- Minimum standard: WCAG 2.1 AA compliance on every screen. Target AAA for body text.
- Color contrast: 4.5:1 for text, 3:1 for UI components and icons.
- Never rely on color alone to convey meaning — always pair with text or icon.
- All interactive elements must be keyboard-navigable (Tab, Enter, Space, Escape, Arrow keys).
- All images must have descriptive alt text. Decorative images use `alt=""`.
- All form inputs must have a visible, associated label — not just placeholder text.
- Focus indicators must always be visible — never suppress or hide the focus ring.
- Modals must trap focus when open. Focus returns to the trigger element on close.

### 6.2 Internationalization
- Design layouts to accommodate text expansion of up to 30% for translated languages.
- Never embed text inside images — always use live text.
- Avoid idioms and colloquialisms that may not translate accurately.
- Date formats must use the user's locale — never hardcode US-specific formats (MM/DD/YYYY).

---

## 7. Data Display & Complexity Handling

- Use tables for multi-column comparable data. Use lists for single-dimension content.
- Always provide column sorting for tabular data where comparison is the goal.
- Paginate tables with more than 25 rows by default — do not infinite-scroll data tables.
- Empty table cells must show a dash (—) — never leave a blank cell.
- Truncate long text in table cells with an ellipsis and expose full content via tooltip or expanded row.
- Charts must always include axis labels, legends, and data point labels or tooltips.
- Never use a pie chart for more than 5 segments — prefer bar charts for comparison.
- Filters and search must narrow visible data, not navigate to a new page.

---

## 8. Motion & Feedback

- Motion must be purposeful — it helps users understand what changed, not decorate the interface.
- Keep animations short: 100–200ms for micro-interactions, 200–300ms for page-level transitions.
- All animations must have a no-motion fallback that respects `prefers-reduced-motion`.
- Loading feedback must appear within 300ms of a user action.
- Toast notifications auto-dismiss after 4–5 seconds. Error toasts do not auto-dismiss.

**Motion reference:**
- Dropdown appearing — 150ms ease-out fade
- Modal opening — 200ms ease-out scale + fade
- Toast notification — 200ms slide-in, auto-dismiss after 4–5s
- Page-level transition — 250ms fade
- Skeleton loading — continuous 1.5s pulse

---

## 9. Shape & Visual Style

- Use 16px border radius for cards, modals, panels, and container elements.
- Use 8px border radius for smaller components: tags, badges, chips.
- Use 4px border radius for inline micro-elements: tooltips, small buttons.
- Never mix border radius values within the same component family.
- Elevation (shadows) must follow the token system — never add custom drop shadows outside the system.

---

## 10. Placeholder Content

- Use these placeholder store names in order: **1234 Test Store · 1235 Broadway · 1236 Park Place**
- Use these placeholder sales values: **$1,234 · $2,345 · $3,456**
- Placeholder content must be realistic — use formats that reflect real product data.
- Never use "Lorem ipsum" — all placeholder text must be product-realistic.
- Date placeholders should use realistic timeframes (e.g., "Last 30 days", not "Jan 1 – Jan 1").

---

## 11. Governance & Contribution

- If a component or pattern doesn't exist in Ingredients 2.0, document the gap before building anything.
- New components must include: use case rationale, anatomy, all states, and usage guidelines.
- Design reviews must verify: token usage, component adherence, accessibility, and microcopy quality.
- Any rule in this document can be challenged — but changes require team agreement and documentation.
- When in doubt, default to the more accessible, more consistent option.

**Contribution checklist for new components:**
- [ ] Documented use case and rationale
- [ ] All states defined (default, hover, focus, active, disabled, error, loading, empty)
- [ ] Accessibility requirements confirmed
- [ ] Token usage verified
- [ ] Microcopy guidelines included
- [ ] Added to Ingredients 2.0 or formally proposed to the team
