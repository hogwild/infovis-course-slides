# Lecture 10 · Sources and production record

Updated 2026-09-30. Current deck: 31 pages. Understanding and Task Fit are applied to ONS and Reuters (5–8). Encoding begins at 9 with marks/channels and four evaluation checks (9–10), followed by original Gapminder, NOAA and OWID examples (11–13). The electricity case applies all three stages continuously: task/data and audience (14–15), existing OWID style and Task Fit (16–18), geographic glyph redesign (19–30), including optional pictograms as ornament and an applied legend refinement (26–27), followed by the three-stage summary (31). All referenced media is local and works without a network in exports. Original artwork rights remain with its authors. Earlier assets and provenance records below are retained; no blanket licence is asserted.

## Current lecture: audience evidence, Wheel profiles and electricity redesign

### Original web examples

- **ONS**, *How is inflation affecting your household costs?*: https://www.ons.gov.uk/economy/inflationandpriceindices/articles/howisinflationaffectingyourhouseholdcosts/latest ; calculator: https://www.ons.gov.uk/visualisations/dvc1833/calculator/index.html . Retrieved 2026-09-29. ONS content is available under Open Government Licence v3 except where stated otherwise. `ons-household-heading.png` preserves the title and introduction; `ons-inflation-comparison.png` is the instructor-selected, tightly framed comparison chart used in the current slide 6 (left chart, right Wheel, two bullets below). Its current scenario inputs are not independently verified. The earlier browser capture used only the calculator’s own published monthly reference amounts: food 418, housing 2412, energy 151, petrol 114, train 31, bus 37, eating out 422, holidays 264, clothing 216, childcare 0; default mortgage selection. Those earlier capture inputs were public reference values, not user financial data or a claim to reproduce the UK-average household exactly. The teaching focus is design, not the resulting economic estimate. `ons-spending-guide.png` is a retained preliminary capture and is not used in the deck.
- **Reuters Graphics**, *Yellen’s bet on inflation* (2015): https://graphics.thomsonreuters.com/15/fed-rates/ . Retrieved 2026-09-29. `reuters-inflation-heading.png` shows original heading/introduction; `reuters-inflation-chart.png` shows the first chart in full. Original source: Federal Reserve Bank of St. Louis. Reuters retains copyright. Limited screenshots are used for attributed classroom critique of the displayed design; no open licence is claimed. This is explicitly a historical example, not a current forecast.

Audience descriptions are course inferences from visible language and graphical choices, not measured audience demographics or publisher claims.

### Real Encoding examples (slides 11–13)

Retrieved 2026-09-29. These are original published graphics, not course reconstructions. The evaluations and suggested revisions are course reasoning from visible evidence, not the publishers’ usability findings.

- **Gapminder**, *World Health Chart 2025*, version 2025.1, official page https://www.gapminder.org/fw/world-health-chart/whc2025/ ; mappings and source data https://www.gapminder.org/data/documentation/gd000/ . Official PDF linked by the page: https://drive.google.com/file/d/1cwfGRRNFqQZG3OU29G6v9yf1NcXtZXPW/view . `gapminder-world-health-2025.pdf` is the unmodified PDF; `gapminder-world-health-2025.png` is its full-page 2400px-wide PDFium rendering with no crop. Licence: CC BY 4.0. X is logarithmic income (PPP GDP/person), Y is lifespan, hue denotes four regions, and bubble area denotes population. The PDF explicitly includes estimates/projections for 2025; this is an encoding example, not a claim that all values are final observations. Original source labels remain inside the graphic.
- **NOAA / NWS Raleigh**, Phillip Badgett and James Danco, *October 2022 Central NC Climate Summary*, https://www.weather.gov/media/rah/climate/monthlysummaries/October2022MonthlyClimateSummary.pdf , PDF page 2, Figure 1. `nws-surface-analysis-2022-11-01.png` is the embedded original image extracted without cropping/redrawing (748×562). WPC surface analysis for 00 UTC, 1 November 2022. Retains NOAA logo, issue time and collaborating-centre labels. U.S. government weather graphic; visible NOAA/NWS attribution retained. Symbol references: https://www.weather.gov/hfo/windbarbinfo and https://www.nesdis.noaa.gov/about/k-12-education/weather-forecasting/how-read-weather-map . Blue triangles denote a cold front; wind staff orientation denotes the direction FROM which wind blows. This case evaluates learned symbol meaning, not whether the map is universally too complex.
- **Our World in Data**, *Primary energy use by source*, official chart https://ourworldindata.org/grapher/energy-mix?metric=by_source&source=total ; exact static export https://ourworldindata.org/grapher/energy-mix.png?metric=by_source&source=total . `owid-energy-mix-2026.png` is the unchanged original export (850×600), World 1800–2025. Visible source credit: Energy Institute, Statistical Review of World Energy (2026); Smil (2017). Chart CC BY; underlying third-party data retain provider terms. Nine displayed categories, directly labelled. The capacity judgment treats the nine labelled colors as a reasonable categorical palette in this chart. The main limitation is separability: very small band thickness interferes with hue discrimination. This is not a diagnosis of too many colors or a universal nine-color limit. No chart data or geometry has been changed.

The introductory definitions follow Munzner’s *Visualization Analysis and Design*, Chapter 5: https://www.cs.ubc.ca/~tmm/vadbook/ and the author’s teaching slides https://www.cs.ubc.ca/~tmm/courses/547-22/slides/week3-4x4.pdf . Expressiveness/effectiveness follow L4. Capacity is the practical limit on discriminable values in the viewing/task conditions. Separability follows L4: one channel can be interpreted without substantial interference from another; size can interfere with hue or shape. The NOAA page retains symbol conventions as an additional reading prerequisite, separate from the four checks.

### Conceptual references and local diagrams

- Alberto Cairo, *The Functional Art*, Visualization Wheel: https://www.peachpit.com/store/functional-art-an-introduction-to-information-graphics-9780321834737 . The introductory slide retains the existing instructor-selected `visualization_wheel.png`, with Cairo attribution. `critique-wheel-ons.svg` and `critique-wheel-reuters.svg` redraw the same six pairs for case annotations. `critique-wheel-guide.svg` remains a retained alternative. Dot locations are qualitative course interpretations of the displayed examples, not empirical values or scores supplied by Cairo/ONS/Reuters. No polygon, quality area or optimal midpoint is implied. Three stages are the course framework, not a published Cairo checklist.
- Michael Twyman, *The significance of Isotype*, University of Reading: https://isotyperevisited.org/1975/01/the-significance-of-isotype.php . Recognizable form and consistent rules inform the electricity redesign. Shared source pictograms and written labels identify categories; pie sectors or bar lengths encode shares in country glyphs. The SVG symbols are original course drawings, not historical Isotype artwork.
- Borgo et al. (2013), *Glyph-based Visualization: Foundations, Design Guidelines, Techniques and Applications*: https://www.cg.tuwien.ac.at/research/publications/2013/borgo-2013-gly/borgo-2013-gly-report.pdf . Glyphs may be abstract or pictorial. Lecture 9 already introduces glyphs; Lecture 10 applies the idea by comparing pie and bar glyphs on geographic maps of the same nine source shares, without asserting a historical descent from Isotype.

### Electricity glyph maps: current case (slides 14–30)

Revised 2026-09-30. The case now starts with task/data and an audience profile, evaluates the existing OWID chart style using the Visualization Wheel, then builds geographic pie and bar glyphs. The primary audience is general news/teaching readers; analysts’ close numerical comparisons inform the discussion of detail and encoding tradeoffs. OWID already offers time-series, share and source-specific geographic views: https://ourworldindata.org/electricity-mix . The redesign combines country location and full composition for the stated brief; it does not claim that OWID lacks maps. Slide 13 remains the separate **primary-energy** example, explicitly distinguished from electricity on slide 14.

**Electricity data.** The same official 2026-09-30 energy-data download supplies complete **2024** rows for France, Norway, Poland, Denmark, Germany, Spain, Italy and Sweden. `electricity-map-2024-source.json` preserves all eight original rows, original codebook metadata and whole-file download hashes. Nine non-overlapping sources sum exactly to national `electricity_generation` in each country. These are selected examples, not every European country or a representative spatial sample. Sources and field definitions are the same as recorded for the earlier four-country snapshot below. `electricity-map-summary.csv` retains all 72 country/source records.

**Original design.** Slides 16–17 use the unmodified official `electricity-owid-denmark-2000-2024.png`; the original URL and hash remain recorded below and in both source snapshots. The topic page documents the additional time/share/map views; the course does not redraw them as purported OWID originals. Attempts to obtain two additional static exports returned HTTP 403, so those files are not used and no substituted screenshot is presented as an original. The existing valid export is sufficient for the style critique. Wheel positions in `electricity-map-wheel.svg` are qualitative course interpretations, using Cairo’s established six continua.

**Map geometry.** `electricity-map-natural-earth.geojson` is the original **Natural Earth 1:110m Admin 0 Countries** GeoJSON, downloaded 2026-09-30 from https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson . Natural Earth data are public domain: https://www.naturalearthdata.com/about/terms-of-use/ . The complete file is preserved, with its original download hash in `electricity-map-2024-source.json`. No invented country outlines are used. SVG maps use an equirectangular projection with 55°N standard parallel; geographic bounds for the full view are 13°W–36°E, 35–71°N. The regional placement comparison uses 3–25°E, 47–59°N. Geometry is clipped to each stated viewport. The country anchors use the source `LABEL_X` / `LABEL_Y` attributes (joined by country name), not power-plant locations. Muted background countries carry no energy values. Selected country fills mark inclusion, not magnitude.

**Encoding and transformations.** All shares derive from source TWh / domestic generation × 100 with Decimal arithmetic. Geometry uses unrounded ratios; ordinary labels round half-up to one decimal. Country pies have equal radii within a view; sector angle and area are proportional to share, starting at 12 o’clock and running clockwise through the fixed nine-source sequence. Circle area does not encode TWh. Bars use a shared zero-to-100-percent scale and fixed source slots. Slide 23 changes only Denmark’s pie-sector order. Slide 24 extends the same comparison to two bar glyphs: fixed source order versus descending share order. Both retain all nine values, source colors, bar thickness and the same 0–100% length scale. Independent sorting makes one country’s ranking clear; fixed positions support matching categories across glyphs. Zero categories remain labelled and equal values retain source-order ties. Slide 25 preserves the same map, country data and color rules while reducing radius and moving glyphs to expose their anchor links. Slide 20 uses a readable pie-glyph overview to introduce compact part-to-whole profiles. The radial map on slide 30 retains the pictogram, solid color swatch and category-name key used on slide 27. The optional refinement on slides 26–27 adds pictograms as ornament after standardization and placement. The applied map legend retains solid color swatches and names alongside the icons, giving hue a larger continuous area than thin outlines alone. The retained `electricity-map-pie-first.svg` collision map is no longer referenced by the deck. Slide 25 now concentrates the overlap/size/placement critique in the regional before-and-after comparison; the final map uses displaced labels and leader lines. The bar map retains all eight records in geographic callouts. Small-source detail is explicitly 0–5%; no minimum slice or minimum bar exaggerates small values. Nine colors alone do not establish a capacity failure.

**Pictograms and detail.** The radial map (`electricity-map-radial-final.svg`, slide 30) applies the previous page’s encoding to all eight countries. It has the identical nine pictogram/swatch/name legend groups as slide 27. The plain pie map (`electricity-map-pie-standard.svg`) remains as an unused asset. Slide 31 summarizes the general three-stage method; the separate case-reassessment slide has been removed. The separate eight-country wind-share comparison slide has been removed; `electricity-map-wind-detail.svg` remains as an unused source asset. Slide 26 presents `electricity-map-pictogram-key.svg`, identifying the icons as ornament in this specific design. Slide 27 uses `electricity-map-pie-final.svg` with a pictogram, solid color square and written name for each source. Icons add visual character and possible semantic associations; solid swatches provide a clear hue reference. It does not claim a measured gain in recognition or reading accuracy. Country data, color mapping, anchors and glyph placement are identical in the pie and radial maps; glyph geometry changes from proportional pie sectors to fixed-angle radial bars. The restored standalone icon sheet is unchanged. No pictogram-count lesson is repeated. This is a static design, with no implied working interaction. Remaining limits include small slices, geographical crowding and loss of time/absolute-volume information.

**Radial bar alternative (slide 29).** `electricity-map-radial-bars.svg` compares the same nine France shares as linear bars and radial bars. Each radial category has 30 degrees of angular width and a 10-degree gap. The common inner radius is 50 SVG units and the full 0–100% radial span is 100 units: outer radius = 50 + share. Sector area is not the quantitative channel. Pale full-length tracks show category slots only; no minimum bar length is imposed. All values and colors match the preserved source. Fixed angular slots remove narrow pie-slice angles, but small radial extensions remain difficult to see; direct labels and the preceding detail view remain necessary. This is a reasoned encoding alternative, not a measured accuracy claim.

**Radial map (slide 30).** All eight glyphs use an inner zero radius of 10 and full-scale outer radius of 30 SVG units. A source value determines outer radius = 10 + 20 × share / 100. Every category retains the 30-degree angular width, 10-degree gap, clockwise source order and color of the preceding example. Pale full-length tracks indicate category slots; no minimum visible quantity is imposed. Country anchors, leader lines and label positions match the pie map. The map explains the common inner-zero/outer-100% scale and retains the original data and Natural Earth credits.

**Reproducibility.** Run `python3 slides/10-visualization-critique-redesign/render-electricity-map.py` from the repository root. It uses only the two preserved local data snapshots to generate **16 SVGs** (including the retained unused collision map), the 72-row summary and a checks JSON. Earlier four-country, commuting and temperature assets/generators remain intact and are not referenced by the current slides.

### Retained four-country electricity case (superseded by the map case below)

Official **Our World in Data energy-data** snapshot, retrieved 2026-09-30: https://github.com/owid/energy-data . Original CSV: https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-data.csv ; codebook: https://raw.githubusercontent.com/owid/energy-data/master/owid-energy-codebook.csv . Conceptual background: https://ourworldindata.org/electricity-mix . Selected values are **2024 domestic electricity generation** for France, Norway, Poland and Denmark, from Ember (2026), processed by OWID. This fixed, complete-year comparison does not claim to be the latest available data. OWID-authored charts and text are CC BY 4.0; third-party data retain the original providers’ terms.

`electricity-owid-2024-source.json` preserves the complete original CSV rows for all four countries, original metadata records for the selected fields, and the original download URLs, byte lengths and SHA-256 hashes. Whole downloaded source files were parsed in the temporary work directory. All nine component values are present for each country; explicit source zeros are retained, and missing values are never replaced with zero. The nine decimal TWh values sum exactly to `electricity_generation` for every selected country.

| Country | Total domestic generation (TWh) | Largest source | Share |
|---|---:|---|---:|
| France | 561.780 | Nuclear | 67.7% |
| Norway | 157.110 | Hydro | 88.8% |
| Poland | 172.120 | Coal | 54.3% |
| Denmark | 35.060 | Wind | 58.2% |

- Source order is coal, gas, oil, nuclear, hydro, wind, solar, bioenergy, other renewables. CSV fields are the corresponding `_electricity` fields, with `biofuel_electricity` labelled **Bioenergy** and `other_renewable_exc_biofuel_electricity` labelled **Other renew.** The latter excludes separately shown bioenergy. The overlapping `other_renewable_electricity` field is preserved in the source row and metadata only; it is not added to the nine-source mix.
- Share = source TWh / each country’s total domestic generation × 100. This is not primary energy, consumption, installed capacity, import-adjusted supply, or the number of power stations. Source TWh and shares are retained together in `electricity-country-summary.csv`.
- Main percentage charts and all glyph axes use 0–100%. Detail views explicitly use 0–1% on slide 22 and 0–5% on slide 24. Geometry uses unrounded ratios; displayed labels use decimal half-up rounding, usually one decimal. Independently rounded labels need not sum to exactly 100.
- The 100-unit overview allocates floors and then remaining units by descending fractional remainder, with source order breaking ties. Every country has exactly 100 identical bolts; each category’s error is below one percentage point. These are percentage units, not physical objects. Norway’s oil gets one unit (0.46%); solar (0.34%) and bioenergy (0.15%) get zero and retain labels.
- Slide 20 compares a fixed approximate 5 TWh unit with an approximate 1% unit. France and Denmark have 9 and 4 absolute units versus 8 and 58 percentage units after nearest-integer rounding. All bolts have the same geometry; the labelled unit changes. France produces more wind electricity, while Denmark has a larger wind share.
- Category pictograms are original vector drawings; a coal lump, flame, barrel, atom, water drop, turbine, solar panel and leaf are cues accompanied by category labels. “Other renewables” uses an ellipsis and text. Identical bolts carry quantity; category icons are not scaled by values. The colors and category order are fixed across locally authored views.
- Three-group aggregation is fossil fuels (coal + gas + oil), nuclear, and renewables (hydro + wind + solar + bioenergy + other renewables). Nuclear is not classified as renewable. Norway and Denmark illustrate how grouping conceals different renewable mixes. Nine colors are not automatically treated as a capacity failure; small colored areas motivate the separability critique.
- Radial glyphs encode shares by radius; polygon area encodes no additional quantity. Slide 26 uses identical France data in radial and linear layouts. Slide 27 holds Denmark’s values, scales, colors and radius fixed while permuting the nine axes. Slide 28 repeats linear glyphs with nine shared rows and identical length scales for all countries. This applies L9’s glyph concept rather than repeating its definition.
- `render-electricity-case.py` reads only the preserved snapshot, producing twelve SVGs, `electricity-country-summary.csv` and `electricity-checks.json`. Reproduce from the repository root with `python3 slides/10-visualization-critique-redesign/render-electricity-case.py`. The local redesigns and critique judgments are course analysis, not publisher-produced alternatives or measured user-study findings.

**Original chart for slide 16:** OWID, *Electricity generation by source, Denmark, 2000 to 2024*, https://ourworldindata.org/grapher/electricity-prod-source-stacked?country=~DNK&time=2000..2024 . Exact official export: https://ourworldindata.org/grapher/electricity-prod-source-stacked.png?country=~DNK&time=2000..2024 . `electricity-owid-denmark-2000-2024.png` is the unmodified 850×600 export, retrieved 2026-09-30. Its source credit and original palette remain visible. The critique recognizes its time-series purpose, then changes the arrangement to fit the lecture’s cross-country comparison task. No data, labels or geometry in the original image were edited.

### Retained city commuting case (not used in current deck)

Official U.S. Census Bureau **2023 ACS 1-year Summary File**, retrieved 2026-09-29. This is a historical, internally consistent snapshot, not a claim to use the latest data. Download index and format documentation: https://www.census.gov/programs-surveys/acs/data/summary-file.html . Source folder: https://www2.census.gov/programs-surveys/acs/summary_file/2023/table-based-SF/ . Definitions: https://www.census.gov/topics/employment/commuting/about/faq.html and https://www2.census.gov/programs-surveys/acs/tech_docs/subject_definitions/2023_ACSSubjectDefinitions.pdf . The API currently requires a key; the official publicly downloadable Summary File was used instead.

`commuting-acs2023-source.json` retains the complete source rows (estimates and published MOEs) for B08301, B08013 and B08303, plus original table-shell definitions and official geography names. It also records URLs, byte lengths and SHA-256 hashes of the five downloaded official files. Only four selected cities are packaged with the deck; downloaded whole-country files were parsed in the temporary work directory. Values are U.S. government statistical data; local original SVG diagrams are attributed to their data source on the slides.

| City | Census GEO_ID | Commuters | Car/van | Transit | Walk | Bike | Other | Mean minutes |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| New York | 1600000US3651000 | 3,444,254 | 29.5% | 55.2% | 10.9% | 1.8% | 2.6% | 40.1 |
| Boston | 1600000US2507000 | 312,870 | 47.2% | 30.5% | 16.9% | 3.1% | 2.4% | 30.2 |
| Seattle | 1600000US5363000 | 333,650 | 62.5% | 19.9% | 11.8% | 3.8% | 2.0% | 25.5 |
| Los Angeles | 1600000US0644000 | 1,618,024 | 84.8% | 7.6% | 4.0% | 0.9% | 2.7% | 31.4 |

- Geography is Census place (city proper), based on residence. These are workers aged 16+ living in each city, not all people working in it, and not a metropolitan-area series.
- Denominator = B08301_E001 − B08301_E021; cross-check against B08303_E001. Worked-from-home respondents are excluded throughout the comparison.
- Five exhaustive groups: Car/van B08301_E002 (includes truck and carpool); Transit _E010 (excludes taxicab); Walk _E019; Bike _E018; Other _E016 + _E017 + _E020 (taxicab, motorcycle, other means).
- A person reporting several modes uses the one covering the longest distance. Values concern usual transportation to work in the survey reference week; they are not vehicle counts, ridership trips, or tracked journeys.
- Mean one-way minutes = B08013_E001 / B08303_E001. This is an all-mode city average, not mode-specific travel time. Aggregation and mean are subject to source rounding and survey estimation. No causal or significance claim is made from city comparisons.
- Bars use unrounded shares on a common 0–100% domain. Numerical labels use one decimal and may not add to exactly 100 after independent rounding. Point positions use unrounded means on a common 0–60 minute domain.
- Unit charts use 100 identical person symbols per city. Take floors, then allocate residual symbols by descending fractional remainder (largest remainder); the approximation error is less than one percentage point per mode. These symbols are a normalized composition, not 100 observed survey respondents. Notes and visible labels make rounding explicit.
- Mode colors and order: car/van coral; transit blue; walk mint; bike violet; other muted gray. Fixed mode symbols provide a semantic cue. Person symbols encode the percentage unit. Other remains a mixed category labelled in words.
- The final multi-attribute city glyph uses five aligned bars and a separate minute axis. Repeated glyphs form small multiples. This is a visual design extension of the lecture, not a historical descent claim about Isotype.
- `render-commuting-case.py` reads the saved source snapshot with no network access and produces 12 SVGs, `commuting-city-summary.csv` and `commuting-checks.json`. Reproduce with `python3 slides/10-visualization-critique-redesign/render-commuting-case.py`.
- Examples of problematic mappings (scaled vehicle symbols, mixed denominators, tiny marks or changing order) are specific design comparisons with the same source data. No claim is made that these diagrams were published by Census or empirically user-tested.

### Retained temperature data and reproducibility (not used in current deck)


NASA GISTEMP v4 global Land-Ocean temperature anomalies: https://data.giss.nasa.gov/gistemp/ ; original CSV https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv ; FAQ https://data.giss.nasa.gov/gistemp/faq/ ; scientific method Lenssen et al. (2024), https://doi.org/10.1029/2023JD040179 . The existing `nasa-gistemp.csv` snapshot is unchanged and byte-identical to L9, SHA-256 `c9ce0750ca93a8241c42fe86cd5bf54d07b28b21ae650b0ae49a206907018cd9`.

The previous temperature views select 1880–2019, °C relative to 1951–1980. There are 1680 months, 140 annual arithmetic means and 14 complete decades of 120 months each. The historical endpoint ensures equal groups, not latest-data coverage. Decimal arithmetic retains intermediate precision; display values are rounded to 0.01°C. Baseline is not pre-industrial.

`render-audience-temperature.py` reproduces the existing audience- SVGs and derived CSV/check files. Retained temperature graphics are monthly-line, monthly-heatmap, liquid-levels, concept, symbol-detail, shape-drift, aggregation, scales-local, scales-common, revision-start, revision-standard, color-rule and time-order. Other audience- assets remain available alternatives. Mean-only thermometers use the common −0.5 to +1.0°C position domain. Bulb/outline area does not encode temperature; the liquid top is the quantitative position. Color always uses a fixed −1.5 to +1.5°C blue–neutral–coral mapping, supplementary to positions and signed labels.

`render-critique-glyphs.py` generates the three Wheel SVGs and `critique-glyph-anatomy.svg`, `critique-glyph-pair.svg`, `critique-glyph-final.svg`, `critique-glyph-statistics.csv`, `critique-glyph-checks.json`. For every decade, mean/min/max are computed from the same 120 source monthly anomalies. All glyph features share an expanded −1.0 to +1.5°C position domain, containing all values (overall min −0.82, max +1.37). Color still maps the decade mean with the same fixed color domain. Brackets show observed monthly min/max, **not confidence intervals, measurement uncertainty or the full distribution**. Exact geometry and values are embedded in SVG attributes for checking. The final 14 glyphs use two rows of seven and an explicit reading order.

No unresolved source or production placeholders. See the current QA record for verification and the local-file browser inspection restriction.

## Retained prior three-case lecture (not used in the current deck)

The prior 35-page lecture applied Lecture 9 principles to three datasets: mammal biomass, life expectancy and global temperature anomalies. It contains no AI output review. Isotype history, portraits, IPCC panels and the six-endpoint report examples are retained as unused local assets; they no longer form separate lecture sections. The source deck and design specification define current use.

New editable assets are generated with `python3 slides/10-visualization-critique-redesign/render-tradeoff-cases.py`:

- `biomass-shares.csv`: the original OWID graphic’s three main shares (wild mammals 4%, humans 34%, livestock 62%) and 2015 reference year. Percentages measure mammal carbon biomass. The original graphic includes additional subcategories; the slides explicitly distinguish that added detail from the use of pictograms.
- `biomass-compact-bars.svg`: a local zero-based rendering of these three shares.
- `biomass-explained-bars.svg`: identical bar geometry and values, with the measure explained and the derived 96% combined share stated. These locally rendered bars are not claimed as a documented predecessor of the original OWID graphic.
- `life-two-local-scales.svg` and `life-two-common-scales.svg`: Japan and India, the same 128 annual values in each version. Separate vertical ranges expose variation within each series; the shared 30–90-year range supports comparison of levels. Each scale is explicitly labelled. Data attributes retain country, observation count and vertical domain for verification.

The retained eight-country overlays, focus and small-multiple views retain their existing geometry and full data. The three-country candidate retains 192 observations and is explicitly critiqued for removing five comparison countries. The raw source snapshot is unchanged.

## Isotype originals

Primary context: [University of Reading · Isotype Revisited, Introduction](https://isotyperevisited.org/2012/08/introduction.php), [Kindel et al. (2010)](https://isotyperevisited.org/2010/09/isotype-revisited.php), [Michael Twyman (1975)](https://isotyperevisited.org/1975/01/the-significance-of-isotype.php).

The 1929 Die bunte Welt cover and portraits are archival originals from the Reading project. Gerd Arntz portrait: Wolfgang Suschitsky. The transformation pair reproduces International Picture Language (1936), pp. 76–77. The annual table and four grouped periods have different time resolution. The varying-size marriage image shows rates in selected single years, while the repeated-symbol image shows grouped annual quantities. They are examples of encoding conventions, not a controlled before/after pair with identical data.

- `isotype-colourful-world-cover.jpg` (475 × 323): https://isotyperevisited.org/01_DbWelt_cover.jpg
- `isotype-transformation-numbers.jpg` (475 × 326): https://isotyperevisited.org/intro01a_IPL_p76.jpg
- `isotype-transformation-pictures.jpg` (475 × 329): https://isotyperevisited.org/intro01b_IPL_p77.jpg
- `isotype-marriage-scaled.jpg` (475 × 306): https://isotyperevisited.org/Section%201%20Introduction%20Bad%20Marriage.jpg
- `isotype-marriage-repeated.jpg` (475 × 504): https://isotyperevisited.org/Section%201%20Introduction%20Good%20Marriage.jpg
- `otto-neurath.jpg` (727 × 1000): https://isotyperevisited.org/Section%201%20Introduction%20Otto%20Neurath.jpg
- `marie-neurath.jpg` (244 × 335): https://isotyperevisited.org/Section%201%20Introduction%20Marie%20Neurath%20small.jpg
- `gerd-arntz.jpg` (244 × 335): https://isotyperevisited.org/Section%201%20Introduction%20Gerd%20Arntz.jpg

`isotype-home-factory-weaving.png` is copied without image changes from the L9 asset extracted from the instructor-provided `slides_previous_semester/06_Tradeoffs_in_design.pptx`, slide 35, `ppt/media/image37.png`. Credit: Isotype, Home and Factory Weaving in England, Modern Man in the Making (1939). One person = 10,000 weavers; one blue production symbol = 50 million pounds by weight. Year intervals are unequal. The original PPTX has not been modified.

`owid-mammal-biomass.png` is copied unchanged from L9. Credit: Hannah Ritchie & Klara Auerbach / Our World in Data, CC BY as credited in the graphic. Bar-On et al. (2018), 2015 estimates. One square = 1% of global mammal carbon biomass; 4% wild mammals, 34% humans, 62% livestock. These are historical biomass estimates, not numbers of individual animals or updated estimates.

- Context: https://ourworldindata.org/biodiversity
- Original download: https://ourworldindata.org/cdn-cgi/imagedelivery/qLq-8BTgXU8yG0N6HnOy8g/17b5bea1-d8ed-496a-6efc-f14d90036a00/w=1548
- Primary study: https://doi.org/10.1073/pnas.1711842115

The connection from Isotype to modern report practice is a comparison of methods, not a claim of direct historical descent.

## IPCC report standards and originals

- [WGI Visual Style Guide, June 2022](https://www.ipcc.ch/site/assets/uploads/2022/09/IPCC_AR6_WGI_VisualStyleGuide_2022.pdf): printed p. 9 / PDF p. 11.
- [AR6 WGI Summary for Policymakers, 2021](https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_SPM_final.pdf): SPM.4 printed p. 13 / PDF p. 17; SPM.8 printed p. 22 / PDF p. 26, caption continues printed p. 23 / PDF p. 27.

`ipcc-ssp-key.svg` reproduces the official RGB mapping: SSP5-8.5 (149,27,30); SSP3-7.0 (231,29,37); SSP2-4.5 (247,148,32); SSP1-2.6 (23,60,102); SSP1-1.9 (0,173,207). This is a categorical key, not statistical data.

The three PNGs are original panel excerpts: CO₂ emissions from SPM.4(a), temperature SPM.8(a), September Arctic sea-ice area SPM.8(b). Axes, units, curves, labels, and uncertainty areas are retained. In SPM.8(a–b), shading shows very likely ranges for SSP1-2.6 and SSP3-7.0; do not relabel them generic 95% confidence intervals. Each panel retains its appropriate unit and scale. Extraction from the official PDF with Poppler:

```sh
pdftoppm -f 17 -l 17 -r 216 -x 294 -y 438 -W 828 -H 690 -singlefile -png ipcc-wg1-spm.pdf ipcc-spm4-co2
pdftoppm -f 26 -l 26 -r 216 -x 276 -y 294 -W 882 -H 411 -singlefile -png ipcc-wg1-spm.pdf ipcc-spm8-temperature
pdftoppm -f 26 -l 26 -r 216 -x 276 -y 717 -W 882 -H 447 -singlefile -png ipcc-wg1-spm.pdf ipcc-spm8-sea-ice
```

## UN/OWID source snapshot and course revisions

- Original data: https://ourworldindata.org/grapher/life-expectancy.csv
- Original metadata: https://ourworldindata.org/grapher/life-expectancy.metadata.json
- Reading/source page: https://ourworldindata.org/grapher/life-expectancy
- Snapshot copied unchanged from L9, downloaded 2026-09-26. Selected 1960–2023 values are UN World Population Prospects 2024, processed by OWID; third-party data retain source terms. Local originals: `owid-life-expectancy-full.csv` and `owid-life-expectancy.metadata.json`.

Period life expectancy at birth summarizes mortality rates in a given year, in years. It is not an individual newborn's forecast. Eight teaching countries: Japan, UK, US, China, India, France, Germany, Brazil; these are neither exhaustive nor a representative sample of the world. Each has all 64 annual observations from 1960 through 2023, with original precision, no missing years and no interpolation.

`../render-cases.py` generates the new editable SVGs and selection files using the Python standard library:

```sh
python3 slides/10-visualization-critique-redesign/render-cases.py
```

- `country-visual-key.svg`: stable course country mapping, inherited from L9.
- `report-color-drift.svg`: six 1990/2023 values, valid common zero scale, intentionally changing country colours in the second panel.
- `report-consistent.svg`: same six values, stable colours/order and common 0–90-year scale.
- `report-draft.svg`: same six values; intentional colour drift and different nonzero baselines (60 and 75).
- `life-eight-focus.svg`, `life-overclaim.svg`, `life-bounded-claim.svg`: all 512 observations, 1960–2023 and 30–90 years. Differences are emphasis and claim scope; the overclaim is a course counterexample.
- `life-eight-multiples.svg`: all 512 observations, eight panels with identical dimensions and domains (1960–2023; 30–90 years).
- `life-endpoint-slope.svg`: exactly six 1990/2023 observations, common vertical 70–90-year scale. Segments do not assert intermediate annual trajectories. Close initial values use offset labels and leaders.
- `life-annual-1990-2023.svg`: all 102 annual values for Japan, UK, US, showing intervening variation.
- `life-eight-selected.csv`: 512 selected country/year/value records; `life-studio-endpoints.csv`: three countries with two endpoints and gains (the existing filename is retained; the lecture now uses a fully explained report example); `case-values.json`: numeric checks.

SVGs originally copied from L9 (graph geometry unchanged): `life-bars.svg`, `life-dots.svg`, `life-truncated-bars.svg`, `life-eight-countries.svg`, `life-three-selected.svg`. Their reproducible source is `slides/09-design-choices-tradeoffs/render-cases.py`. The three-country selection removes five countries and is explicitly identified on the slide. The truncated bar chart starts at 75 years. Its accessible description now states that encoding directly. All original quantities and chart geometry are unchanged.

Selected checks (unrounded values): Japan 1990 = 78.9928, 2023 = 84.7123; UK = 75.7377, 81.3015; US = 75.3743, 79.3043. Japan–US gap = 3.6185 years in 1990 and 5.4080 in 2023, an increase of 1.7895 years. The 2023 truncated-length ratio is 2.2564; the true value ratio is 1.0682. Values printed in graphics are rounded to one decimal; arithmetic retains original precision.

## Retained prior temperature case (1880–2022; not used in the current deck)

The instructor requested the dataset introduced in Lecture 9 slide 30. `nasa-gistemp.csv` is copied byte for byte from that lecture. Original download: https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv . NASA GISTEMP v4 Land-Ocean global means, degrees Celsius relative to 1951–1980. The same existing 2026 snapshot is used; it is not replaced with a newer download. Selection: every month of 1880–2022, 1716 observations, no missing values.

Primary documentation checked 2026-09-28:

- GISTEMP Team, 2026: https://data.giss.nasa.gov/gistemp/ . Lenssen et al. (2024), A GISTEMPv4 observational uncertainty ensemble: https://doi.org/10.1029/2023JD040179 .
- Temperature anomalies and month-specific reference values: https://data.giss.nasa.gov/gistemp/faq/ . Global anomalies aggregate local anomalies; they are not raw absolute temperatures. The reference is not the pre-industrial period.
- Graphical form references: Ed Hawkins / NASA SVS, https://svs.gsfc.nasa.gov/5057/ ; Ed Hawkins / University of Reading, https://www.reading.ac.uk/planet/climate-resources/climate-stripes . The original Reading stripes use 1961–2010 reference settings. Their original image is not mixed into this comparison.

`python3 slides/10-visualization-critique-redesign/render-temperature-case.py` reproduces the new data selections and six editable charts:

- `temperature-monthly-selected.csv`: the 1716 exact monthly source values, with year, month, Celsius anomaly and baseline.
- `temperature-annual-means.csv`: 143 arithmetic means of each year's twelve monthly anomalies, calculated with decimal arithmetic. These are derived from the supplied monthly values, not the separately rounded J-D column. Extra arithmetic digits do not imply added measurement precision.
- `temperature-monthly-line.svg`: all 1716 chronological values, x = monthly index, y = anomaly on −1 to +1.5°C.
- `temperature-spiral.svg`: accumulated static form. Month sets angle, radius = 145 + 80 × anomaly. All 1716 positions are retained. The view is locally rendered from the same snapshot, not copied from the NASA video. It makes no claim of a smooth within-month observed trajectory.
- `temperature-monthly-heatmap.svg`: 143 columns × 12 rows, no data removed.
- `temperature-stripes.svg` and `temperature-stripes-labelled.svg`: identical 143 annual values, band widths/heights and colour mapping. The latter adds title, year labels, baseline and numerical legend.
- `temperature-2022-aggregation.svg`: the final year's twelve monthly values plus their mean, 0.8925°C. Monthly minimum 0.73 (November); maximum 1.05 (March).
- `temperature-checks.json`: counts, window, baseline, colour domain and numerical check values.

Colour is a linear diverging interpolation between the course blue, a pale neutral at zero and the course coral over a fixed −1.5 to +1.5°C domain. The spiral, heatmap and both stripe views share this mapping. No values are clipped. The axis bounds are visual scale references, not policy thresholds. All charts are static, local, and available identically in HTML and PDF. Numerical encoding attributes are retained for inspection.

## Local asset integrity

SHA-256 values below cover the local source files. Documentation itself is excluded.

| Asset | SHA-256 |
|---|---|
| `case-values.json` | `111df32ea1bb484c88484a97d5d0e24afe0311d47df8c101d92cc97530743121` |
| `country-visual-key.svg` | `8c50e29d7fcef6e21dd902300bbfd72772b45b604ab03fd02cb7bdd1e2cd74f5` |
| `gerd-arntz.jpg` | `cdfa86a7838df533a08e8b5da84679bdf8134c86cefc4fb5ffb0d0cd698c0cd2` |
| `ipcc-spm4-co2.png` | `bb7b7a2cf4945fbd0127690856e185b0e95c28318d7ab881314d6fafcfb67670` |
| `ipcc-spm8-sea-ice.png` | `156d09629e53f0d9d9a2fa9f3ee28536eed2429b18f1a711c0da0687334d0aa4` |
| `ipcc-spm8-temperature.png` | `eb73c0a57d860d5fb6e575a6cc2b5af383beb0f0090d161a1a01f2dd03d29b12` |
| `ipcc-ssp-key.svg` | `74850c17816ee4797e24b55a332343ed7a165087a682797015f9f08d7c499e85` |
| `isotype-colorful-world-cover.jpg` | `617a35d1cbd3848abfe86f57d9652b87962dd3da73d4c2bb37312f392742737f` |
| `isotype-home-factory-weaving.png` | `59c5f6a02014a1dd1ad7717e89b43d20d744d3f7b42a975e92e4ac19c07b7405` |
| `isotype-marriage-repeated.jpg` | `bbf650bdb61b1a948a587145ae88b0253c36cceb02ca563e2aabb15ac8c9f682` |
| `isotype-marriage-scaled.jpg` | `55a07a85575c663bd50302e7bcbe9fb42fa9ed12764e7f66255bb0c90d27a21b` |
| `isotype-transformation-numbers.jpg` | `f67cc6349d6205ed61b0a20a916a3e8a66bf6b8cd6fdb419d6c2343337ffe671` |
| `isotype-transformation-pictures.jpg` | `f4f5f322165cd8b7adae81cf90885bad4658901da3f0a31cbe498f572e1d0623` |
| `life-annual-1990-2023.svg` | `82d00cc79abb423792f66d36a465e2c1ad4a64616505fa250068b31900a855a4` |
| `life-bars.svg` | `b74a1847a0c7b12001890535a104cef4ff2526fddc9591259849cb270231377e` |
| `life-bounded-claim.svg` | `91706397ad2cbcd2a1f6a682d910d6273feee12503f7bff8e89b92ded434838d` |
| `life-dots.svg` | `7a2bfac7952e4eb5352e6d5a88e9dee5e88556c160bccb94c7c1961dc5cc9a39` |
| `life-eight-countries.svg` | `045ed7b69279f5eb84625192942d5045e4ac9cb9a09453f399c3e928e13f4e83` |
| `life-eight-focus.svg` | `b35193b2630cf78cc746cfe170f37fb468f34465a82dd41f94616d1964bd28f4` |
| `life-eight-multiples.svg` | `cc0e8fba4bbd32aad44f132f6d602f0b1fbd1c603ffe90f463e3dc7424524f36` |
| `life-eight-selected.csv` | `e6e5bbb1063175fe21273456c6aa21f3a66b3d7dc6fe3ed0e48a512b6dc8d1d3` |
| `life-endpoint-slope.svg` | `9c4a9e73f7ddcfe289bbd0ad2dd9f049addbe208a6972b491e718360ae561210` |
| `life-overclaim.svg` | `a0eb3b4d2c62901193b05669504c5132bb6609b6965a24158a8cad17a36c5c14` |
| `life-studio-endpoints.csv` | `912a87faa6d87bf17c82192ecdecec56a23bc24468255122e296b04a1062003e` |
| `life-three-selected.svg` | `95ad8c4cf5e674d7aa31cd4487e04c18afe6e46e835e593745c89ec458f45943` |
| `life-truncated-bars.svg` | `451349760d9348c77ee6bdf586dcea9991864e8f16dae36b13afac8b4717907f` |
| `marie-neurath.jpg` | `ad69a9f1680c1a2fdc0ef5f88c83b23e5fbf06675b4487e9eba374d5cc849e53` |
| `otto-neurath.jpg` | `e65b67471a99d08189a1850c091bcbd7d592e170c0bf1f208530b61f1f9bdc59` |
| `owid-life-expectancy-full.csv` | `c304603fb8a7da263619a8ae43b7097f35b648c458855e23f1c4ef8f2ae75c01` |
| `owid-life-expectancy.metadata.json` | `748542daa0dad1c4b6741237eb319d405b74c58059502cfe1d9f4e377ca820c1` |
| `owid-mammal-biomass.png` | `eae35cee4ffadff6596fd769e7e4aab7a64153f0440ee8a2f63f22a5a64b1e69` |
| `report-color-drift.svg` | `68ebab5e7d3b14ae8c03e23649a1b6f5d6e040dd01e97f63b27f9291432330b7` |
| `report-consistent.svg` | `391f8deb6633eeb2bcf7d1c0ea55def8ca0442c15a3b8a24d5fc419852a36433` |
| `report-draft.svg` | `41a9fd658e13a90440dbd1c65b4c97cf80e315b77a8269d298715d114170f174` |
| `biomass-shares.csv` | `2648f42bcc76a85caccdff5f268659850fa32419d97905f27ba1b292af614078` |
| `biomass-compact-bars.svg` | `8c32dffa8c4a1ad1b79c78e6bfcf59ac7361194099b2f9aa204dc7346e25e664` |
| `biomass-explained-bars.svg` | `810327120e3e2c446bfd053a2e3deaa6b50f56c1ae2699ec642d8996eac3458d` |
| `life-two-local-scales.svg` | `ca48d5eeee6f8c657c5f4f559e8a25b69ae4cd35606f0d40d7792b389d6f3528` |
| `life-two-common-scales.svg` | `c7e80c4a30fb2b53391b4751d3963d3af08f64e90c4c5c8ac997a8ac764c4b33` |
| `nasa-gistemp.csv` | `c9ce0750ca93a8241c42fe86cd5bf54d07b28b21ae650b0ae49a206907018cd9` |
| `temperature-monthly-selected.csv` | `dacbdbcd21c9174390787a2d9917990d29b3ce7f0eef9f23d7e6a9d0394e8f17` |
| `temperature-annual-means.csv` | `90fba8fd100d0f242054cddc198253482ccb12628c0b2d6b91d1209012b7be15` |
| `temperature-monthly-line.svg` | `2232acdd2f85a7b96fb52b0d841e9eea84faf6a042a53122fd166c893ff663b8` |
| `temperature-spiral.svg` | `9951800141f740b98b31f1c1c057c7c19639510d77e692966c82bbd4fa88b149` |
| `temperature-monthly-heatmap.svg` | `eab00e2ebd107689d86c79f98e62a7f0751837052ed63e9d9babe9aac5e7eb1b` |
| `temperature-stripes.svg` | `275be7aaafec9704cb1b172c47dc40f0d9e52155b61bf30e142832d5b36bc9e9` |
| `temperature-stripes-labelled.svg` | `1caa233340ca6c0eceacc76988daf538ef46920d0e9a5d63c7b75afa1fdbd136` |
| `temperature-2022-aggregation.svg` | `764c8ab9b5635360b7560dc25b3f01c6de2ebb053b8b5b5fd870e37c22db4988` |
| `temperature-checks.json` | `97b0c130da0b8126a862148bf59df04c87ce23bee6b72365f20fc534788ce09d` |

No unresolved source or production placeholders. See `../../../design/10-visualization-critique-redesign-qa.md` for export and inspection results.
| `audience-aggregation.svg` | `4212415c3e1aad5b6985251cc8abd1f576969d4957e66d0ed91dececf8df8ec3` |
| `audience-annual-means.csv` | `a168279c99a0afdbdaff7447631ed1036816d3d758a8ec83e990ede38f40b535` |
| `audience-checks.json` | `197330498cc7bec0437a470062d8574db6b4300652a85f8127ba325bbcfc5688` |
| `audience-color-rule.svg` | `b81644a1e73f0ba88ca31d9844486c7732eab75e6934223883fb5c777ea2ca2a` |
| `audience-concept.svg` | `55df194082341ee2c416f7059d84ce68dc34a76b60e35b47fef3a81b8e2c2da5` |
| `audience-decade-means.csv` | `63bcde630e85855491d2cae6f60ac51dcc6b2c5b511467f9c1c1bc357bc7a7ad` |
| `audience-liquid-levels.svg` | `a4329a64263cad4f800d8258054150bef63226c8947eb2089ae32560d63855ac` |
| `audience-monthly-heatmap.svg` | `163d553be3e0491c6bfb92ec5535c09a107c53c98decaf3f7cd48b6682b44019` |
| `audience-monthly-line.svg` | `1d65b7012ed84e8e9d699c590c601fb960e5e307d2e6da06d90e03afff5f47a9` |
| `audience-monthly-selected.csv` | `bdf645331d8890aacedae04dbc72818e9a97d1ef59452863d7cca04824744585` |
| `audience-revision-standard.svg` | `02d3d699d3eb0830a61bc40f62d3bcd7072159e5a2513f64bff5be09fcf975f0` |
| `audience-revision-start.svg` | `6e48101473971a051bb0ba34934ea08c6e90418d351d66fa2beae4c9eb77964e` |
| `audience-scales-common.svg` | `ac72ec615c6af60b2536ff3d224115fc782de4ed695b691fd1a459bbe1abb5e2` |
| `audience-scales-local.svg` | `33c1523ad89af541164e1aeff4b7292ae8545e058816a77a5ee6726f05cfa797` |
| `audience-shape-drift.svg` | `27bc9db29013e16facbfa7d121e90ac4cab223468e3a2b7e6be31507a3fbbc83` |
| `audience-spiral.svg` | `1f1dbb99eda4599451ff587b4d00488df05d381452e52cd05f6553c2d77f50b0` |
| `audience-stripes-labelled.svg` | `7bf78aefacf0014f1e841e5c95c476ec9e6d488dee415dd5c91f30d873e69d0f` |
| `audience-stripes.svg` | `3da0e910233de8fcedefff131855df5e32da665ae78f9cd15f29b0a19c236013` |
| `audience-symbol-detail.svg` | `34a22a4d2b2e1b1a382cf89d618a01ac00075f85099b2f9b9a506870da70a584` |
| `audience-thermometers-final.svg` | `6415e34542d126fff4f32c2b27ba4fd0b08fbb810e1db4adfab21d66836f2f4f` |
| `audience-thermometers-structured.svg` | `eaa172e98b614541c10598b04dfbbf0276378c41c5e21caf49e8d7a56fb14449` |
| `audience-time-order.svg` | `047e9c202a135d8a319408870cd9901f8ec8ad844ce1c8605143ebb97a0b05c0` |

## Current new assets · integrity (2026-09-29)

| Asset | SHA-256 |
|---|---|
| `critique-glyph-anatomy.svg` | `7db004b281312df5295f597b707b43567c49ceafa1f83c3090ba40d1217d4861` |
| `critique-glyph-checks.json` | `842e42bb1a8d4c5392abae281d80c87d95577c58af4faec1b5ef844264caa4f9` |
| `critique-glyph-final.svg` | `bbe22fa78ace121ccf3521c4053e785b6ad428a5e5a3b372babd66613c9c1f37` |
| `critique-glyph-pair.svg` | `9deebd51f2027c92232c02f88c5f09e0f38b8f884ed4429f4e83657db810307d` |
| `critique-glyph-statistics.csv` | `2c426130bf132106e1a2ec1c71be6634615ec3e0040ff502e78de62ff1c2908b` |
| `critique-wheel-guide.svg` | `cd330332e45bbd9cc405f094be76ec300770f65280beb33c05c5931444f24877` |
| `critique-wheel-ons.svg` | `75b5b9c515b71212031cc09d49f6c19730c37dbe0d15af1cb73342ea78a50abe` |
| `critique-wheel-reuters.svg` | `f10ad66cf773d88c65ba2625bbc4e3529fc18a905f81093e2bbddda44df77f34` |
| `ons-household-heading.png` | `6b9402a1d26e2878b4892c167297f472325b3e5b23da3a339b018e73ebdbdb2a` |
| `ons-inflation-comparison.png` | `13922955914a9882806f76e0f2a6ed0b267f84dc4d4a6c1e95b3174ef88479b8` |
| `ons-spending-guide.png` | `de9ecab55827d68346fd136c0c5996272de9c3113813459e52c7647f1817253c` |
| `reuters-inflation-chart.png` | `4517dd5f657058d3e91f6687eebaf56d1901b4c454618e9487b8e6b0b4db8e33` |
| `reuters-inflation-heading.png` | `008691af7af9b5b4e1bb56fdea1ecb511dfbc2ab0fb90bda0f305b41da9357e1` |
| `gapminder-world-health-2025.pdf` | `5847fac503f5a2a94d96134329c64fc37b03df50d384bdfb4d600e71961b2e81` |
| `gapminder-world-health-2025.png` | `8ab3dccc6f78f4553bb95c8fd37c04918a6f8b2fea6b6fd6da8b70ac21bcdf88` |
| `nws-surface-analysis-2022-11-01.png` | `b4c4d7f85f236af4017834247270ed8d37d1a9e9c3ea1851715b8a83245fe37b` |
| `owid-energy-mix-2026.png` | `dcd626a8474bdfc911970f403ada9bc999c3a50907302159de3bee557a7e6289` |

## City commuting assets · integrity (2026-09-29)

| File | SHA-256 |
|---|---|
| `commuting-acs2023-source.json` | `8551f4305df1f6a10cabef118cea7b95c3c10c4753b2e8ce09c1565b3271f8d3` |
| `commuting-checks.json` | `dc8efa8e6196c439f26f34d3045e754c07eeaae2dce57000b2fff71a8d3cd80b` |
| `commuting-city-summary.csv` | `9e95b22a5de13489b42eeb64021255e1c701be13c960dcc7ed7f4fb0e33f2a8e` |
| `commuting-counts-shares.svg` | `adb32151b566338ae569ac5e51a23cbd99ddca084904c9847fe8815077258e86` |
| `commuting-denominator.svg` | `5d8dc4123f4ed2402b39bfbaf47be323eeccd82146559e0fee1de7d54f8527ca` |
| `commuting-glyph-anatomy.svg` | `e76d9c207940ddb0c069e3ffc6f30503ce3ef80acbc3389dc88aac1a40634a69` |
| `commuting-glyph-final.svg` | `fc7196250e105af4d6097fe5996576cca2b94679683e6cabbf7100c414a9bd6d` |
| `commuting-glyph-scales.svg` | `afc50b4ab322766a1449103c209da7fbcab49a16990e18b4b23b85491dbe7add` |
| `commuting-order.svg` | `a58a66457c5b112df683dc9a7eea24befa4a03cf9e613772f70d479a05869a19` |
| `commuting-pictograms.svg` | `d7dd5533478fe11af42be475e647fe4e3a993e0527937f65a7b2f89f93cd3fb7` |
| `commuting-separability.svg` | `39e22f5b9f3488559afd5d5be08913fd50e8b4825fcfba96dac1e3a16ced4f19` |
| `commuting-simplify.svg` | `e1422450b383baaa2ec5c6f64f5d32cf03525ce5009847713dd930d3f26fa640` |
| `commuting-size-accuracy.svg` | `748986963053ad9358c3d394b02846361c003dc6f2f5958ce1b2e7c4e571fbfa` |
| `commuting-unit-overview.svg` | `96ecac5c0f789df1efff447ea374122ca6fea1ff21ac9563cbaf6bbfc3dbf558` |
| `commuting-unit.svg` | `1416f56e00f27713023e933e053092e7773d93d07724ec97028c4bbbc7523a82` |

## Electricity assets · integrity (2026-09-30)

| Asset | SHA-256 |
|---|---|
| `electricity-audience-options.svg` | `1587ecd69fe7b5494b2d6184ffbfb76a27b3fedb3a9d60b090b6d948c9222e28` |
| `electricity-checks.json` | `4ab110825f113906f1aace2962b3c28de20277e2da4b49a4757035218c8664e9` |
| `electricity-country-summary.csv` | `b5a651b4ca3079aaa7c906d13281df6c35ea141310d2ace5c79d79a5c9a0e6c8` |
| `electricity-glyph-final.svg` | `f42681ae0fc0392353a62b2d257bb077d9f2249f3948f061b8f716a624fb4a91` |
| `electricity-glyph-layouts.svg` | `f1e9b5239ecd4dc3291775d420dc5936f7f561e662dfc52f71483fcbf9222c94` |
| `electricity-glyph-order.svg` | `54a007e534bec0533ba62b969c16c59cd6496df619d89c1849c820c42afaca32` |
| `electricity-grouping.svg` | `fed0543f31f237825fa6d42e33f9d49decfd9c447fc6efb6441d61cae62e95ca` |
| `electricity-owid-2024-source.json` | `b7bad28d1fcb979d5bbaca51bfa231cbafbd6a0faf89702aca246bfe3129982f` |
| `electricity-owid-denmark-2000-2024.png` | `29d1e5b20bc5a314efe88a4dbc7da79e668db10dbfd94d0f7ecd78a6c7f64295` |
| `electricity-separability.svg` | `3fbf5699a81da998c127833e39bdbf23bd689d0abb9c4fc95d97207771e4425c` |
| `electricity-small-shares.svg` | `4f1f8b27bd290c0013c20639c1f991d78a0bcd898418a85be77ee14da03513c8` |
| `electricity-stacked-aligned.svg` | `6f09b3cf75c416dce5dfc06170e1736e158ae4bfae65803c07dee4f58e65d22b` |
| `electricity-symbol-choice.svg` | `3a8bf8c0d1b6f60895c1b3dd09a5ecd85935388024c2d3a77456378e50c648fe` |
| `electricity-unit-choice.svg` | `ec3d4614cddfa5c779d4d51a886a349ca81f640b65db8e2122c628f0805a4ada` |
| `electricity-unit-overview.svg` | `36a82cadf0b96b7f9595a8c781d4ea3e9df85884efd9b653aae371cdaccbc539` |
| `electricity-volume-share.svg` | `b22800078032e512a00c1fa3c9c32ac11c4fa73cdfe9a03769c4e3ca8e447cc0` |

## Electricity map assets · integrity (2026-09-30)

| Asset | SHA-256 |
|---|---|
| `electricity-map-2024-source.json` | `29947e5b1ff1449f27f680b0cbd7e113ea84fb649f9997521fbeea3fdfbfb8d1` |
| `electricity-map-bar-order.svg` | `84010e8d4d130eb25c0db0b892346de8926a097c699c3426d2bc6eb0179e3ba0` |
| `electricity-map-bar.svg` | `a927d0d4ff8f1d7f3decbc06d305ab81f7db8e9877c03366b9e3351cbbdc7b2c` |
| `electricity-map-checks.json` | `eef89c1cdc0a09ca39c23367b3edb7be091b7cfabc72264297aa386a45fbbc79` |
| `electricity-map-effectiveness.svg` | `099772166c6a6511ef5c105f7a730e13eec2e216f771f562ab3f4e86420f104e` |
| `electricity-map-glyph-choice.svg` | `87880d90da8b116d68aeafb665c8c57b486c240add83f35cce8c2b56c4747743` |
| `electricity-map-natural-earth.geojson` | `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f` |
| `electricity-map-order.svg` | `588ac2b99a5fbd535fe5af6308cb4f8fc531ccf6b43c33e04fed56e30c8a0d9f` |
| `electricity-map-pictogram-key.svg` | `0734cc289dd1c9aa7f5c68b07d15eb110710247f1ee2c67752dba25d140cf040` |
| `electricity-map-pie-final.svg` | `126686841de425fb64356b0b8be6cba2d09aef0de9e4c54292500ffe181a02bc` |
| `electricity-map-pie-first.svg` | `5735739a98ead560de09af74ba4d2d22f2c144b0d77bb7b67a34e08b7600be91` |
| `electricity-map-pie-overview.svg` | `169ca8003e8c1c7cdef941bcfa5c023657c03b7a196a2024fbbe70454dbdd231` |
| `electricity-map-placement.svg` | `6962a482e5ef3b37ea47387659b521131f4ceea99d0e204cd2b65c8ba164824e` |
| `electricity-map-small-shares.svg` | `9ecfc16b5fc098aeb70fe50495476fdebbb4bb4a968d7b5efc0f66528da84393` |
| `electricity-map-summary.csv` | `d6df35f10e34dffc43e9f84b5af8cac81b4891320f3b8e6e3db22591d8e24cb6` |
| `electricity-map-wheel.svg` | `d2e435f95a19e0466b5172121eb6a19e81ff2710771f9a4e64af47c16a7910ab` |
| `electricity-map-wind-detail.svg` | `dd965de708b2f2422b89a2deff333670b8e45029215dc7445d394a57809e924f` |

| `electricity-map-pie-standard.svg` | `4a7bcab1feb88292bda3f8294314c8ed07ddc665920490851915d15cb3ad7e9b` |

| `electricity-map-radial-bars.svg` | `ad6d2ff4094999c057db630c03a3df76d2df76a78af4dcf72771b1616eaa07cd` |

| `electricity-map-radial-final.svg` | `a77f423bc0bff12c9cc84ab07d307db13c08e65723c4e248828a659cd4266c7c` |
