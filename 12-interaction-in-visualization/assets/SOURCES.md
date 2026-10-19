# Lecture 12 · case sources and demonstration states

## Current delivery

The 2026-10-08 revision has **29 slides** organized into Framework, Operations, Combinations, Design principles, and Evaluation. Case screenshots are local images in both HTML and PDF. Visible website links open a new tab; the teacher demonstrates on the original website. Repeated images intentionally connect the five levels. This version does not load the former iframe player. Retained unused assets are not part of its runtime.

The first seven case families were captured and checked in a browser on **2026-10-05**. They show real interface states, not invented data. Historical examples illustrate interaction behavior, not present-day domain findings. Bloomberg uses a supplied screenshot whose original capture date is unknown.

## Cases and provenance

| Current slides | Assets | Original author and source | Evidence and classroom action |
|---|---|---|---|
| 3, 7, 18, 19, 25 | `crossfilter-morning.png`, `crossfilter-live.png` | Square; Mike Bostock, Jason Davies, Tom Carden · [Crossfilter](https://square.github.io/crossfilter/#charts) · ASA Data Expo airline sample, early 2001 | Morning image: Date cleared, Time of Day 07:00–10:00, 46,331 of 231,083 records. Initial image: Date filter active, 71,818 records. Demonstrate scoped reset separately from undo/reset-all. Gray context can remain in the active histogram while linked results use matching records. Rechecked 2026-10-08: a time brush within the default Date filter gave 14,291 matches; resetting Time of Day restored 71,818 while Date remained active. The delay variable is arrival delay. |
| 6, 22, 27 | `les-miserables-hover.png` | Xianbin Gu / hogwild · [Les Misérables network](https://hogwild.github.io/la_miserables/) | Hover Valjean to reveal name/group and connected characters. Move away to clear transient emphasis. The crop excludes unused margin and a group-color legend not discussed in class. Keyboard selection and persistent details are redesign proposals, not claimed existing features. |
| 8, 15 | `sp500-zoom.png`, `sp500-brushed.png` | Xianbin Gu / hogwild · [S&P 500 brush/zoom](https://hogwild.github.io/SP500D3Brush/) · D3 example family | Upper wheel zoom/pan changes the time window. Lower brush selects approximately Dec 2006–Mar 2010 in the detail capture. Underlying series remains the same. Original data URL: https://gist.githubusercontent.com/hogwild/aa34556b4488553b8beebfeed456742b/raw/c31e080d83627939ca2d5a026770c6b34c40af86/sp500.csv . |
| 9, 16, 21, 26 | `owid-live.png`, `owid-small-multiples.png` | Our World in Data · [Life expectancy](https://ourworldindata.org/grapher/life-expectancy?tab=chart&time=1950..2023&country=CHN~IND~USA) · CC BY | China, India, USA; 1950–2023. The overlaid and [split](https://ourworldindata.org/grapher/life-expectancy?tab=chart&time=1950..2023&country=CHN~IND~USA&facet=entity) links configure the same data differently. Original screenshot credits Riley (2005), Zijdeman et al. (2015), HMD (2025), UN WPP (2024). On 2026-10-08 both layouts loaded; the split view exposed Chart settings and a checked Align axis scales control. No native overlay/split toggle was observed; the deck supplies both URLs. Country selection and Line/Table support the control demo. |
| 10 | `gapminder-fertility.png` | Gapminder Foundation · [Gapminder Tools](https://www.gapminder.org/tools/) · Vizabi | Switch x from GDP per capita to Babies per woman while keeping y and year fixed. Captured year is 2025, the default at capture. The data-doubts label remains visible. No current demographic conclusion is inferred. |
| 11 | `flare-display-collapsed.png`, `flare-display-expanded.png` | Mike Bostock / D3 [collapsible tree](https://observablehq.com/@d3/collapsible-tree) · [Xianbin Gu implementation](https://hogwild.github.io/flare_tree/) | Click display to reveal DirtySprite, LineSprite, RectSprite and TextSprite, then collapse. Matching crops retain the root and relevant branch; neighboring branches can extend outside the crop. Real software hierarchy. |
| 12, 14, 20 | `citibike-station-hover.png` | Xianbin Gu / hogwild · [Citi Bike dashboard](https://hogwild.github.io/citibike_symbolmap/) | Hover a map station and trace the linked scatterplot point and bar. May is the selected month. Different highlight colors and the original yellow background are retained for critique. Dataset date/aggregation are incompletely documented, so no numerical or current-usage conclusion is claimed. |
| 23, 28 | `bloomberg-warming-opening.png` | Eric Roston and Blacki Migliozzi · Bloomberg (2015) · [What's Really Warming the World?](https://www.bloomberg.com/graphics/2015-whats-warming-the-world/) | Supplied original screenshot with title, byline, opening question, observed-temperature chart and progress markers. It was extracted losslessly; no plot or text was redrawn. Use to distinguish pace, path and analytical control. Website opened on 2026-10-08 but a subscription banner interfered and later dynamic stages were not fully verified. Treat later controls as live inspection targets, not newly verified facts. Do not promise iframe availability. |

## Classroom reliability

- Every teaching image resolves locally. No case needs network access to display in HTML or PDF.
- Instructor notes contain start conditions, a task, expected observations, recovery guidance, and an offline alternative.
- Use each original website in a new tab. Links include both `noopener` and `noreferrer`.
- Screenshots demonstrate a capture state; live interfaces and source data may later change.
- Evaluate the accessibility of a demonstrated task directly. None of the examples receives a blanket accessibility endorsement.
- For Bloomberg, discuss the supplied opening state if the live story cannot advance; do not bypass a subscription or access restriction.

## Reuse scope

Screenshots are attributed, bounded quotations for educational explanation and critique. Original websites, graphics and data retain their respective rights and terms. OWID's CC BY credit is preserved; underlying datasets retain their own terms. No general open license is asserted for other screenshots, and no third-party JavaScript is bundled into this version.
