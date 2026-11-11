# Lecture 18 · Implementation appendix sources

The appendix uses Citi Bike (slides 25–32) to introduce D3 forceSimulation and dragging. Slide 25 links to the complete bubble example, whose navigation also opens the node-link diagram. Runtime source files come from `reference/Lecture19_examples/vanilla_js/`.

## Active figures

- `graphs/bubble-example.png` and `graphs/node-link-example.png`: Citi Bike example images reused from Lecture 19 and displayed together on slide 25. Each is stored inside this lecture’s assets directory.

## Retained materials outside the current slide scope

Earlier appendix assets remain on disk but are not used in the slides: FR diagrams and animation (original paper: https://reingold.co/force-directed.pdf), population comparisons (https://lab-examples.vercel.app/week9/worldmap_bubble and https://lab-examples.vercel.app/week8/worldmap_barchart), `graphs/citibike-node-link-javascript.png`, and `implementation-data-flow.svg` (an original diagram for Final Project Guideline §4.5). These files are not additional appendix pages.

## Runnable JavaScript examples

`vanilla-examples/` contains byte-for-byte runtime copies from `reference/Lecture19_examples/vanilla_js/`:

- `forceLinkedGraph.html` / `forceLinkedGraph.js`: node-link data, simulation, SVG joins and coordinate updates.
- `forceCollide.html` / `forceCollide.js`: bubble metric, radius, collision simulation and SVG circles.
- `forceLinkedGraph-static.html`, `forceLinkedGraph-dynamic.html`, `forceCollide-static.html`, `forceCollide-dynamic.html`: teaching pages linked on slides 29–30, with visualization and editable JavaScript.
- `teaching.css`, `teaching-view.js`, `teaching-preview.html`, `teaching-preview.js`: local editor layout and isolated preview runtime.
- `vendor/codemirror-5.65.20/`: local syntax-highlighting editor, including source notes and license.
- `shared.js`: mode switching, drag, colors and view fitting in the complete examples.
- `styles.css`, `citibike-data.js`, `vendor/d3.v7.9.0.min.js`: local styles, prepared data and D3 v7.9.0. `vendor/LICENSE-d3-v7.txt` is copied from the reference runtime’s `vendor/LICENSE-d3.txt`. The earlier v6 library and its `LICENSE-d3.txt` are retained but are not loaded by these two complete examples.

The three `.js.txt` files are identical reading copies of the corresponding scripts. All runtime dependencies are local; example links in the built deck resolve within its assets folder. No network request is needed to draw either example. Data preprocessing is documented in the reference directory and is not required in the browser.

## Data

Original fixed CSV: https://gist.githubusercontent.com/hogwild/4a23b2327e88e6e3aa101bb01ddb28ba/raw/81fd842af7328d2ad6d2a498cc4589031ae5b4af/citibike_rawdata_2020_4.csv.

The examples aggregate 9,268 trips into 52 stations and 916 undirected station pairs. The node-link diagram omits 51 same-station pairs, rendering 865 connections; same-station trips remain in station counts. Oakland Ave (3207) has 66 arrivals and 90 departures. Pair 3195–3207 has 17 trips. Source SHA-256 and aggregation metadata are embedded in `citibike-data.js`.

The node-link node field `popularity` is copied from arrivals. Bubble `value` is arrivals or arrivals + departures according to the metric control, independent of static/dynamic mode. The complete examples with controls use linear radius scales; circle area is not proportional to the count. The separate static/dynamic teaching bubble pages use a square-root scale from zero, so area represents arrivals, and add 1 to each collision radius. Teaching node-link pages keep a linear radius scale. Both teaching static pages use 300 manual ticks. Color is the second digit of the station ID, not geography.

## API references

- https://d3js.org/d3-force
- https://d3js.org/d3-force/simulation
- https://d3js.org/d3-force/link
- https://d3js.org/d3-force/many-body
- https://d3js.org/d3-force/center
- https://d3js.org/d3-drag

Code excerpts retain actual function and field names. Speaker notes identify omitted controls, labels and view fitting. Manual ticks require an explicit coordinate update; dynamic ticks dispatch an event. Fresh object copies preserve the source data when D3 changes coordinates and link endpoints.

## Retained Assignment 6 materials (not in the current slides)

- `assignment6-city-bubbles.png`: actual all-airlines SVG captured from the local Assignment 6 reference implementation; only the visualization is included, not the instructor source code.
- `bubble-area-ratio.svg`: original mathematical diagram of a 1:4 area ratio and a 1:2 radius ratio; not observational data.
- `bubble-fixed-scale.svg`: Dallas-Fort Worth, United States: 771 route endpoints across all airlines and 364 for American Airlines. Computed from the supplied `assignments/assignment-6/starter/data/airline-routes.csv`; full-city maximum 1438. Both circles enlarged by the same factor for legibility.
- `bubble-position-forces.svg`, `bubble-collision-radii.svg`: original schematic illustrations of position targets and padded collision radii; positions and radii are conceptual geometry.
- Assignment settings and coverage follow `gradescope/04-bubble-chart.md`, `05-linked-views.md`, `06-findings.md` and the public starter's bubble-chart/config/helpers/app modules.
- Supplemental official API references: https://d3js.org/d3-force/position, https://d3js.org/d3-force/collide, https://d3js.org/d3-scale/pow#scaleSqrt, https://d3js.org/d3-selection/joining.
- Airline data dates and licensing are not established in the supplied files; preserve the assignment's existing provenance limitations and do not describe counts as current traffic or passenger totals.
