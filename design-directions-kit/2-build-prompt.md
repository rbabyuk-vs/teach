Build the first main screen of a {{mobile-first | desktop-first}} web {{app | landing page}} for "{{PRODUCT}}": {{one sentence: what it is}}. Launch market: {{market}}. All page copy is in {{language}}.

Conversion goal: {{goal}}. The primary CTA on every version is «{{CTA}}»; it must appear in the hero and repeat at the end of the page. No second competing CTA.

Intent: {{how it should feel, 1–2 sentences}}. A {{target user}} should think "{{the thought you want}}" within 3 seconds.

Core line: «{{TAGLINE}}»

Hero copy (same in all versions; change only line breaks and scale):
- Headline: «{{HEADLINE}}»
- Sub: «{{SUB}}»
- CTA: «{{CTA}}»

Page structure (short):
1. Hero: image + headline + sub + CTA.
2. {{section 2, e.g. how it works in 3 beats, as text, not icons}}
3. {{section 3, e.g. one static sample of the product in use}}
4. {{optional trust line; mark it <!-- TODO: confirm --> if it is not true yet}}
5. Final CTA «{{CTA}}».

Viewport: design at {{390×844 | 1440×900}} first. The hero fits one screen with the CTA visible without scrolling. Respect safe-area insets. Scale cleanly to {{desktop | phone}}. Respect prefers-reduced-motion. Text contrast at least WCAG AA.

Guardrails, always:
- One monumental image anchors the page.
- Imagery is processed, never raw: {{e.g. ink, halftone, dither, grain, linework}}.
- Technical marginalia from the product's own world: {{IDs, timestamps, coordinates, units, cues}}.
- Type at extremes: monumental display or tiny mono labels, little in the middle.
- Near-monochrome ground with a single accent. A version may change this only in its own "Exceptions" line.
- Every font must fully support {{language/script, e.g. Ukrainian Cyrillic і ї є ґ}}. Check this before choosing a font.

Never:
- Purple gradients, glossy 3D SaaS blobs, untextured stock photography, rounded-everything friendliness, icon-grid feature rows, Inter/system-font-only typography, evenly-distributed colorful palettes.
- {{product-specific bans: words, UI patterns, clichés of the field}}

Create {{N}} versions, each in its own folder (v1/ ... v{{N}}/), one per direction below. Each version is a single self-contained index.html (inline CSS and JS, Google Fonts allowed, no build step). Same intent and guardrails for all. Do NOT blend directions: each version commits fully to its own aesthetic.
A reference screenshot is attached for each direction, in the same order (screenshot 1 = v1). Follow its style; never copy its logo, name or text.

{{PASTE THE DIRECTION BLOCKS FROM STEP 1 HERE}}

IMPORTANT: hero images come later. Do NOT generate or source any imagery.
For each version, reserve the hero slot exactly where the placement note says (<img> or background, with the correct aspect and position) and fill it with a flat CSS stand-in that matches the direction's palette. Put the "Future image" line as an HTML comment inside the slot. Size all typography and negative space as if the image were already there, so the real image drops in with zero layout changes.

Root viewer: copy the attached index.html (the version switcher) to the project root. Change only its CONFIG block: set name to "{{PRODUCT}}", list one entry per folder (id "v1"… and the direction's short name), and set defaultFrame to "{{phone | desktop}}". Do not restyle it.

Before finishing, open every version at {{390×844 | 1440×900}} and check: no horizontal scroll, the CTA visible on the first screen, all text renders in the chosen fonts (no fallback glyphs).
