# Citi Bike browser-foundations demo

A deliberately small, native-browser reconstruction of the instructor's Citi Bike story for Lecture 14. It uses HTML, CSS, prepared SVG, and native JavaScript. It has no React, D3, scroll listener, or intersection observer.

## Open the example

Serve the repository root with the course's local preview server, then open:

`slides/14-web-foundations-for-visualization/assets/citibike-demo/index.html`

For the lecture iframe, append `?embed=1`. This compact layout is designed for a 1136 × 450 viewport. The full page uses a sticky graphic column alongside two narrative sections. Both sections stay in normal document flow in both layouts. Opening the HTML directly through `file://` prevents local JSON fetching in ordinary browsers; the page displays a loading error instead of reporting success.

## Data provenance and exact population

The primary classroom input is the instructor's read-only file:

`reference/citibike_storytelling_example/citibike_april.csv`

It contains 9,268 trip rows and 15 original columns. The independently downloaded [official April 2020 Jersey City monthly release](https://s3.amazonaws.com/tripdata/JC-202004-citibike-tripdata.csv.zip), linked from [Citi Bike System Data](https://citibikenyc.com/system-data), has exactly the same headers and parsed rows in the same order. The only byte difference is that the instructor's CSV omits the final newline in the official file. Checksums and detailed evidence are recorded in `data/audit.json`.

All 9,268 rows are retained. No additional duration, membership, station, or deduplication filters are applied. These counts describe published trip records, not unique riders or all possible bicycle travel. The publisher describes its own preprocessing on the system-data page.

The source `starttime` values contain no timezone offset. The derivation preserves their published local civil-date string; it never converts a `YYYY-MM-DD` string through the browser timezone or UTC. The intended geographic interpretation is Jersey City local dates; the file itself does not independently prove an offset. Every April date has positive records, so no missing date has been silently zero-filled.

| Check | Result |
|---|---:|
| Input / accepted trips | 9,268 / 9,268 |
| Observed April dates | 30 |
| Sum of daily counts | 9,268 |
| Weekday rides / dates | 5,742 / 22 |
| Weekend rides / dates | 3,526 / 8 |
| Mean rides per weekday | 261 |
| Mean rides per weekend day | 440.75 |
| April 1 | 299 rides |
| April 4 | 538 rides |
| Highest count | April 25: 731 |
| Lowest count | April 13: 98 |

The mean difference concerns this month and population only. It does not establish historical change, trip purpose, or causation.

## Files and browser model

- `index.html`: two narrative sections and a shared graphic region, with prepared calendar SVG already present in the document.
- `style.css`: presentation, sticky layout, and the compact embedded layout.
- `app.js`: fetches typed JSON, validates counts, validates visible prepared counts and updates existing SVG titles, and changes chapter presentation through `setActiveChapter`.
- `calendar.svg`: a self-contained copy of the verified calendar.
- `data/daily.json`: 30 records with `{date, rides, isWeekend}`; counts are numbers and weekend flags are booleans.
- `data/summary.json`: totals and means derived from the same population.
- `data/trips-excerpt.csv`: first eight real `starttime`/`tripduration` rows; duration is in seconds.
- `data/audit.json`: source hashes, counting rules, date coverage, exact cross-check, and computed summary.
- `prepare.py`: reproducible derivation and SVG preparation. It reads the reference CSV and never changes it.

The runtime updates prepared graphic elements rather than teaching repeated data-driven mark creation. The two native buttons call `setActiveChapter('overview')` or `setActiveChapter('daily-calendar')`. This setter updates `state.activeChapter`, the visible graphic, title, `figcaption#chapter-caption`, button active classes/`aria-pressed` values, and narrative emphasis. It never hides narrative sections or initiates scrolling. Part 2 can connect additional input mechanisms to the same model.

Useful inspection targets are `#ride-total`, `#chapter-title`, `#calendar-graphic`, and `rect.day[data-date="2020-04-04"]`. Inspect `window.citiBikeDemo` for the current state and verified loaded data. `window.setActiveChapter` is available for a teacher demonstration. Repeated chapter visits do not create SVG cells or attach new listeners.

## Reproduce the data and static figures

Run `python3 slides/14-web-foundations-for-visualization/assets/citibike-demo/prepare.py` from the repository root. For a new official-source cross-check, provide the downloaded archive as `--official-archive /absolute/path/to/JC-202004-citibike-tripdata.csv.zip`. The script performs no network request.

The script also creates lecture-local `../calendar.svg`, `../chapter-states.svg`, and `../style-states.svg`. The final two are static PDF equivalents of chapter presentation and weekend-outline changes. Calendar positions use the actual April 2020 weekday layout; schematic coordinate exercises elsewhere may deliberately use different drawing coordinates.

The public work's design and author attribution remain at [the instructor's Citi Bike story](https://citibike-scrollytelling.vercel.app/). This reconstruction deliberately simplifies the implementation for Part 1; it is not a claim that the original project used native JavaScript alone.

## Runtime verification

Verified at 1136 × 450 in headless Chrome: data load, 30 unique date cells, 9,268 total, three chapter round trips, keyboard activation, both narrative sections remaining in normal document flow, and no JavaScript errors. Both chapter states and the complete page were visually inspected. Static SVGs parse as valid XML and were rendered for inspection. The script also rejects a disagreement between a prepared visible count and the JSON value rather than merely updating its tooltip.
