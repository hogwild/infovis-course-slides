# Citi Bike Bootstrap example

Open `layout.html` directly in a browser for the current slide 28 example. All runtime resources are local: the page loads `bootstrap.css` and `calendar.svg`. It uses no JavaScript and adds no custom styles. The earlier `index.html` and `grid.html` remain unchanged as optional examples.

## Current lecture sequence

- Slide 26, “Bootstrap: reusable styles and a 12-column grid”: definition and the complete supplied grid illustration, comparing 6+6 with 4+8. No code block.
- Slide 27, “Responsive layouts adapt to viewport width”: responsive-layout and breakpoint definitions, the complete supplied breakpoint table, and a focused explanation of `md` = 768 CSS pixels. Other table entries are reference only; no code block.
- Slide 28, “Load Bootstrap, then assign layout classes”: a complete one-line stylesheet link labelled “In head” and a complete twelve-line container/row fragment labelled “In body”, paired with actual 800px/360px results from `layout.html`. The two snippets do not constitute a full document by themselves; the linked file includes doctype, html/head/body structure, charset, title and viewport metadata. No displayed element or child is omitted.

The supplied grid and breakpoint images are source material from the user's files, not new website captures. See `../../SOURCES.md` for their provenance and the official technical-reference links.

## Responsive layout

- At viewport widths of 768 CSS pixels or more, `col-md-4` and `col-md-8` share a row in a 1:2 column-width ratio (4 and 8 of Bootstrap’s 12 columns).
- Below 768 CSS pixels, the text and calendar stack vertically in document order.
- `img-fluid` applies `max-width: 100%` and `height: auto`, allowing the image to shrink to its column without losing its aspect ratio.
- `container` provides Bootstrap’s responsive page container, and `row` organizes the columns.
- The two columns in `layout.html` are div elements. The text column contains h2 “Citi Bike” and p “April 2020: 9,268 trips”; the calendar image has alt text “Daily rides”. Its metadata contains `width=device-width, initial-scale=1` so mobile viewports use the intended responsive widths.

## Files and provenance

- `bootstrap.css`: unmodified Bootstrap 5.3.8 minified CSS, downloaded from https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css . Its original copyright and MIT license header are retained.
- CSS integrity (SHA-384, base64): `sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB`.
- `LICENSE`: original MIT license from https://raw.githubusercontent.com/twbs/bootstrap/v5.3.8/LICENSE .
- `calendar.svg`: byte-for-byte copy of this lecture’s `assets/calendar.svg`, containing the verified Jersey City April 2020 daily ride counts (9,268 trip records).
- `layout.html`: the current complete classroom example, with the same content at wide and narrow viewport sizes. The link and body container match the two code blocks on slide 28.
- `index.html`: retained optional earlier responsive example. Its old split-head/body presentation is no longer used in the lecture.
- `grid.html`: retained optional two-col-6 example, not code displayed on current slide 26.
- `../../bootstrap-citibike-wide.png` (800 × 290) and `../../bootstrap-citibike-narrow.png` (360 × 300): actual browser captures of `layout.html`, updated on 2026-10-25 for slide 28. They replace the previous captures of `index.html`; compare arrangement within each image rather than absolute sizes across the independently scaled slide previews.
- Technical references: https://getbootstrap.com/docs/5.3/layout/grid/ , https://getbootstrap.com/docs/5.3/layout/breakpoints/ , and https://getbootstrap.com/docs/5.3/content/images/ .
