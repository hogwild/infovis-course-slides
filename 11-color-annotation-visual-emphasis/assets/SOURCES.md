# Lecture 11 · Asset provenance

Updated 2026-10-12. The current deck has 53 slides (50 main-lecture pages and three appendix pages). This catalog records both active and retained unused assets; the status list below identifies assets made unused by the latest truncation. All core examples are local files and work offline. Original images retain their own titles, keys, and dates where supplied. Historical examples illustrate encoding decisions, not current conditions. Links are also visible on relevant slides.

## Opening foundation

- **munzner-channel-ranking.png** — Tamara Munzner, *Visualization Analysis and Design*, channel-effectiveness ranking, also reproduced in her [UBC teaching materials](https://www.cs.ubc.ca/~tmm/courses/mds-viz2-17/slides/lect-5-6-4x4.pdf). Original raster recovered from the supplied PPTX. The original terminology remains visible; lecture text separately defines lightness and chroma.
- **nei-eye-anatomy.jpg** — National Eye Institute, [How the Eyes Work](https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work). Labeled eye anatomy, [source image](https://www.nei.nih.gov/sites/default/files/styles/medium/public/2022-04/Eye%20diagram%202-ENG.jpg?itok=7c-yh9TJ). Saved through the rendered source page's image assets. Original labels retained.
- **rods-cones-micrograph.png** — User-requested grayscale micrograph from the supplied PPTX, preserved without changes, including the original Rods / Cones labels and red arrows. The same annotated image is reproduced in the University of Toronto's [Laser Safety Manual, Figure 5-10](https://ehs.utoronto.ca/wp-content/uploads/2021/10/LSM.pdf#page=84). The supplied image has no photographer credit, and its original photographer was not established; do not attribute it to Ralph C. Eagle. The visible Webvision link is a reading reference, not a claim of image authorship.
- **cone-mosaic.png** — User-requested cone-mosaic image from the supplied PPTX, preserved without cropping or recoloring. False colors mark S (blue), M (green), and L (red) classes. [Roorda & Williams, Nature 397, 520–522 (1999)](https://www.nature.com/articles/17383) explains this imaging method and convention in Figure 3. It is cited as scientific reading; the precise crop/panel provenance of the supplied raster remains unverified. Do not infer universal cone percentages from this image.
- **webvision-rods-cones.jpg** — Retained unused asset from the earlier version of slide 6. Ralph C. Eagle / Photo Researchers, Inc., scanning electron micrograph of primate photoreceptors. Reproduced as Figure 1b in Helga Kolb's [Webvision: Photoreceptors](https://www.webvision.pitt.edu/book/part-ii-anatomy-and-physiology-of-the-retina/photoreceptors/), [full-resolution image](https://www.webvision.pitt.edu/wp-content/uploads/imageswv/scanEMphoto.jpg). Opened using the figure link and saved through the browser. Attribution also verified in the [NCBI Bookshelf edition](https://www.ncbi.nlm.nih.gov/books/NBK11522/?report=reader). The image uses false color; it does not show the cells' natural visible colors.
- **blind-spot.svg** — Original R/L experiment layout, based on the mechanism described by [Exploratorium: Blind Spot](https://annex.exploratorium.edu/xref/exhibits/blind_spot.html). Fixation and eye instructions are matched to the left/right placement of the letters. No numeric observational data.
- **photoreceptor-spectral-responses.png** — User-requested spectral response graphic extracted unchanged from the supplied PPTX. Includes Blue Cones, Rods, Green Cones, Red Cones, axes, and a visible-spectrum strip. Original illustrator and underlying measurements are unverified. Used as a qualitative schematic of response overlap, not a calibrated physiological dataset; the drawn peak positions and cutoff wavelengths should not be taught as exact values. The Stockman link on slide 7 is scientific reading, not image or data attribution.
- **stockman-sharpe-cones-2deg.csv**, **cone-spectral-sensitivity.svg** — Retained unused data and plot from the earlier version of slide 7. Stockman & Sharpe (2000), 2° cone fundamentals in energy units, from the CVRL dataset mirrored in the [Colour project's CMF data](https://github.com/colour-science/colour/blob/develop/colour/colorimetry/datasets/cmfs.py). The source dictionary is `Stockman & Sharpe 2 Degree Cone Fundamentals`. The local CSV contains 441 rows, 390–830 nm at 1 nm intervals, columns wavelength_nm, L, M, S. The plotted interval is 390–730 nm and each curve is normalized to its own maximum; source sampled peaks are S 442 nm, M 543 nm, L 570 nm. Curves are data-derived, not artistic approximations. [Stockman's explanation of the cone fundamentals](https://www.cvrl.org/people/Stockman/pubs/2019%20Cone%20fundamentals%20CIE%20S.pdf) supports the interpretation. Do not interpret normalized amplitudes as cell proportions or directly as perceived lightness. No source-code routines were copied.

## News graphics

- **bbc-election-map-2024.png** — BBC News, [General election 2024 results in maps and charts](https://www.bbc.com/news/articles/c4nglegege1o), July 2024. Screenshot of the [original BBC interactive](https://news.files.bbci.co.uk/include/newsspec/38834-uk-general-election-lookup-2024/english/app/embed), with the map-key overlay open. This overlay covers part of the map; the slide teaches category decoding, not constituency coverage. BBC copyright retained.
- **bbc-labour-vote-share-2024.png** — Same BBC article, original [Flourish embed](https://flo.uri.sh/story/2450074/embed#slide-0). Screenshot retains the BBC logo, original bins and status explanation. The embed still displays **“Counting in progress”**; it is presented as an archived counting-stage graphic, not final results. The map is not recolored. BBC copyright retained.
- **bbc-labour-vote-share-2024-v2.png** — Retained unused user-selected asset after replacing the former vote-share slide with three binning examples. The portrait graphic retains the Labour vote-share title and five percentage bands. File preserved unchanged. The same BBC article is its source; unlike the earlier full embed capture, this image does not show the counting-status footer. No final-results status is inferred.
- **nyt-unemployment.png** — The New York Times, [county unemployment interactive](https://www.nytimes.com/interactive/2009/03/03/us/20090303_LEONHARDT.html), June 2010 view. Direct NYT access was unavailable. The unmodified image is preserved and attributed in [Joshua Stevens’s bivariate map tutorial](https://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/), [image URL](https://www.joshuastevens.net/images/js_NYT_unemploymentMap.png). Visible slide credit identifies both the original publisher and preservation source. NYT copyright retained.

## Scientific and cartographic examples

- **noaa-temperature-ranks-2018.png** — NOAA/NCEI, Divisional Average Temperature Ranks, August 2018, record period 1895–2018. Original raster recovered from the user-supplied PPTX. The image title and NOAA mark identify the source. [Official U.S. climate-map collection](https://www.ncei.noaa.gov/access/monitoring/us-maps/) returned HTTP 429 during verification; the figure’s date and key were checked in the supplied original. This is a map of rank categories, not numeric temperature anomalies.
- **tableau-dominant-crop.png** — Sarah Battersby, dominant crop × acres planted. Original raster recovered from the supplied PPTX; the author’s [Tableau bivariate-map tutorial](https://www.tableau.com/blog/how-make-effective-bivariate-choropleth-maps-tableau-83121) reproduces and links this crop example. Data year is not shown in the image. Use as a historical design example only.
- **tableau-bivariate.png** — Same Tableau tutorial, published 2018-03-01. [Original image](https://cdns.tblsft.com/sites/default/files/blog/3_20.png). County food insecurity and obesity, three quantile classes per variable. Retains the two-dimensional legend.
- **tableau-separated.png** — Same tutorial, [original image](https://cdnl.tblsft.com/sites/default/files/blog/2_59.png). Two separate county maps. This source excerpt lacks numeric legends; the notes explicitly identify that limitation.
- **tableau-default.png** — Same tutorial, [original image](https://cdns.tblsft.com/sites/default/files/blog/7_12.png). Default categorical coloring, intentionally shown as a counterexample.

## NASA perception and palette examples

Robert Simmon, NASA Earth Observatory, [The “Perfect” Palette](https://science.nasa.gov/blogs/earth-matters/2013/08/06/subtleties-of-color-part-2-of-6/), 2013-08-06:

- **nasa-contrast.png** — [Original simultaneous-contrast image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_simultaneous_contrast_618.png).
- **nasa-rainbow-grayscale.png** — [Original rainbow and grayscale image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_rainbow_grayscale_618.png). Grayscale is not a CVD simulation.
- **nasa-perceptual-palettes.png** — Retained unused asset after removing the duplicate color-coordinate page and merging perceptual uniformity into slide 19. [Original palette image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_three_perceptual_palettes_618.png).

Robert Simmon, [Different Data, Different Colors](https://science.nasa.gov/blogs/earth-matters/2013/08/12/subtleties-of-color-part-3-of-6/), 2013-08-12:

- **nasa-evapotranspiration.jpg** — Retained unused asset after replacing the earlier NASA example. [Original image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_evapotranspiration_yellow_blue_618.jpg), 0–9 mm/day. Multi-hue sequential, without a meaningful central reference.
- **nasa-cvd-palettes.png** — [Original image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_colorblind_palette_deuteranopia_618.png). Original and revised palettes with the source’s Adobe Photoshop deuteranopia simulations. These images do not certify accessibility for all viewers.
- **nasa-landcover.jpg** — [Original image](https://science.nasa.gov/wp-content/uploads/2013/08/elegant-figures_portland_etm_2001_lcc_618.jpg). Portland 2001 land cover, source legend retained.

## Original explanatory SVGs

The SVGs below are instructional diagrams, not empirical observations. The data-derived cone plot and blind-spot activity are documented separately above. All SVGs remain vector images in HTML and PDF.

- **mapping.svg** — retained unused asset after the colormap-definition redesign. Illustrative unemployment percentage and mapping rule; not measured county data.
- **color-dimensions.svg**, **cyclic.svg** — CIELAB LCh swatches converted to sRGB, illustrating controlled dimensions and wraparound. No claim of perfect perceptual uniformity.
- **qualitative.svg** — first four colors of ColorBrewer Set2, reused on slide 21 after removing the standalone qualitative-palette page. Colors and category labels preserved; label font enlarged for the two-column layout. No universal accessibility claim.
- **ordered-color-dimensions.svg** — original conceptual ramps on slide 21. Neutral gray decreases from sRGB 232 to 58; the saturation row varies HSL saturation from 0.10 to 1.00 at hue 210° and HSL lightness 0.50. These coordinate choices are illustrative, not measured data; constant HSL lightness does not guarantee constant perceived lightness. No calibrated or perceptually equal steps are claimed.
- **sequential.svg**, **diverging.svg** — YlGnBu / BrBG colors from [ColorBrewer](https://colorbrewer2.org/). Cynthia Brewer, Mark Harrower, and The Pennsylvania State University. Continuous interpolation is illustrative.
- **continuous-binned.svg** — retained unused asset after merging the continuous/binned explanation into slide 32. Uses ColorBrewer YlGnBu colors for an illustrative comparison.
- **domain-comparison.svg**, **normalization.svg** — explicitly illustrative numbers showing mapping mechanics. [Matplotlib normalization reference](https://matplotlib.org/stable/users/explain/colors/colormapnorms.html).
- **bivariate-legend.svg** — retained unused asset after matching slide 46 to the preceding map; generic axes, nine-color scheme adapted from [Joshua Stevens](https://www.joshuastevens.net/cartography/make-a-bivariate-choropleth-map/). Not a new visualization of county measurements.
- **food-obesity-bivariate-legend.svg** — slide 46; enlarged vector transcription of the nine-class legend in `food-obesity-comparison.png` on slide 45, from Sarah Battersby’s Tableau tutorial cited above. The modal interior RGB colors, listed top-to-bottom and left-to-right, are `#f3b300`, `#b36600`, `#010002`; `#f4e6b3`, `#b4b4b4`, `#376287`; `#f4f4f3`, `#b3d3e2`, `#509dc2`. Preserves food insecurity increasing left-to-right and obesity increasing bottom-to-top. Four corner annotations always list food insecurity first, then obesity. Labels are enlarged; no new data, thresholds, or palette interpolation is introduced.
- **special-values.svg** — retained unused asset after merging the special-value reminder into the legend slide; conceptual explanation inspired by the BBC key; includes an added known-zero state. It is not a replica of the BBC palette.
- **redundant-cues.svg** — category keys with line patterns and labels, not a data chart. [W3C use-of-color guidance](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

No unresolved source or production placeholders remain. Source images are reproduced for the requested instructional review, with original ownership and attribution preserved. This work does not change the formally published course files.

## Imported perception and colormap examples

All 49 rasters below were copied unchanged from the user-supplied presentation. They are instructional reference images, not newly measured data. Preserve their embedded credits and labels. A reading link on a slide is not a claim of image authorship. The following limitations are recorded rather than assigning an unverified creator.

- **Page 9** — `illumination-color-checkers.png`.
- **Page 10** — `illumination-framed-comparison.svg`.
- **Page 11** — `gray-bars-context.png`, `gray-swatches-gradient.png`.
- **Page 12** — `dress-illumination-comparison.png`.
- **Page 13** — `bezold-color-context.png`.
- **Page 14** — `heliconia-original.png`, `heliconia-deuteranopia.png`, `heliconia-protanopia.png`, `heliconia-tritanopia.png`.
- **Retained unused cultural examples** — `red-authority-painting.png`, `red-double-happiness.png`; retained after the user selected the yellow examples for the merged culture slide.
- **Page 15** — `yellow-smiley.png`, `yellow-imperial-robe.png`.
- **Retained unused chromosome key** — `mouse-chromosome-colors.png`; its complete key is visible within the active combined image `dna-mice-human.png`.
- **Page 16** — now uses the user-selected replacement `dna-mice-human.png`, documented below. The former separate images `human-mouse-homology-colors.png` and `mouse-chromosome-colors.png` are retained unused.
- **Page 18** — `color-component-swatches.png`.
- **Page 19** — `color-solid.png`.
- **Page 23** — `categorical-channel-key.png`, `categorical-palette-examples.png`.
- **Page 24** — `penguin-species-body-mass.png`, `us-electoral-vote-2016.png`.
- **Page 25** — `ordered-palette-examples.png`.
- **Unused diverging-gallery assets** — `diverging-reference-key.png`, `diverging-palette-examples.png`.
- **Unused NOAA raster** — `temperature-ranks-august-2018.png`.
- **Unused sequential-gallery assets** — `sequential-order-key.png`, `sequential-palette-examples.png`.
- **Unused legend-reading examples** — `scientific-surface-colormaps.png`, `florida-election-comparison.png`.
- **Page 29** — `field-blues.png`, `field-turbo.png`, `field-blues-legend.png`, `field-turbo-legend.png`.
- **Page 32** — `continuous-palette-examples.png`, `segmented-palette-examples.png`.
- **Page 43** — `asia-annual-temperature.png`, `africa-gdp-life-expectancy.png`.
- **Page 44** — `crop-acreage-bivariate.png`.
- **Page 45** — `food-obesity-comparison.png`.
- **Page 47** — `bivariate-family-matrix-framed.svg`, embedding the unchanged `bivariate-family-matrix.png` with its original native red frame recovered as a vector overlay.
- **Page 53** — `population-mixed-colors-scatter.png`, `population-mixed-colors-key.png`.
- **Retained unused** — `color-vision-plates.png` (the standalone introduction was removed).
- **Page 48** — `color-wheel-original.png`, `color-wheel-deuteranopia.png`, `color-wheel-protanopia.png`, `color-wheel-tritanopia.png`.
- **Page 49** — `status-icons-redundant-encoding.png`, `blue-orange-map-example.png`.

### Provenance and interpretation

- **Illumination examples (9–10):** original creator unverified. `illumination-framed-comparison.svg` embeds the exact source raster and preserves the two annotation rectangles from the supplied page as vectors. The source patches are not perfectly identical in sampled RGB values, so the text discusses similar values and changes in appearance instead of claiming exact equality. The frames do not change the pixels inside them.
- **Contrast / dress / Bezold (11–13):** original image creators not supplied. The dress and Bezold links were preserved from the source material. In the grayscale example, the two reference bars are different grays; comparisons are made across repeated squares in the same row.
- **Heliconia and color wheels (14, 48):** retain the supplied original/deuteranopia/protanopia/tritanopia labeling. Photographer, simulation algorithm, and severity parameters are unverified; the graphics illustrate possible confusions and are not individualized predictions. Definitions checked against [National Eye Institute](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/color-blindness/types-color-vision-deficiency).
- **Cultural examples (15; red examples retained unused):** supplied smiley, robe illustration, military painting, and wedding symbol. Creators are not established; embedded marks remain unchanged. Revised text explicitly defines cultural color associations and names the practices being compared. Reading sources support interpretation, not image provenance: [Smithsonian, Smiley history](https://www.smithsonianmag.com/history/proliferation-happiness-180968468/), [Smithsonian, Qing court dress](https://asia.si.edu/education/educator-resources/teaching-china-with-the-smithsonian/interactives/images/summer-chaofu-formal-court-dress-for-a-top-rank-prince/), [Getty polychromy symposium abstracts](https://www.getty.edu/museum/conservation/antiquities/Images/polychromy_abstracts.pdf) on the red paludamentum and military authority, and [British Museum, wedding hongbao](https://www.britishmuseum.org/collection/object/C_2014-4133-11). Claims are limited to specific cultural and historical practices, not universal meanings for entire populations.
- **Component swatches and color solid (18–19):** conceptual illustrations. The solid is not claimed to be an exact CIELAB gamut. Hue, saturation, and perceived lightness are distinguished from physical luminance and model-specific coordinate values.
- **Chromosome pair (16):** source study and date unverified. The diagrams illustrate a labeled categorical key and cross-view matching of homologous regions; no claim of identical human/mouse genomes or a fixed 12-hue perceptual limit.
- **Asia temperature map (42):** embedded credit identifies Atlas of the Biosphere, Center for Sustainability and the Global Environment, University of Wisconsin–Madison. Preserve the temperature units and original legend. This is a historical graphic, not current temperature data.
- **Africa map (42):** legend labels gdpPercap and lifeExp establish the two attributes. Original author, year, units, and bin thresholds are not established; no substantive country comparison is taught from it.
- **Palette galleries and keys (23, 25, 32, 46; unused sequential gallery):** examples of mapping structures. The segmented gallery uses named ColorBrewer schemes; visible [ColorBrewer attribution](https://colorbrewer2.org/learnmore/schemes_full.html) is retained in the slide sources. Exact raster creators of the other galleries are unverified. Inclusion does not certify perceptual uniformity or accessibility of every palette pictured.
- **Categorical examples (24):** the penguin image retains species names, body_mass_g and sex labels, consistent with Palmer penguin variables; chart author unverified. The election graphic labels a projected 2016 electoral result of 232/306, not the final electoral-vote count after faithless electors. It is used only to discuss categorical color.
- **Unused NOAA raster (`temperature-ranks-august-2018.png`):** same historical August 2018 divisional temperature-rank example documented above, record 1895–2018, with NOAA mark and neutral Near Average rank.
- **Unused legend-reading examples:** Florida image retains its Results not in status and must not be described as final certified results. The scientific surface image lacks an established study, variable, and unit provenance; use only for a legend-reading / palette critique, not scientific conclusions.
- **Blues / Turbo comparison (29):** source fields and legends retained. The underlying numeric grid and creator are not supplied. The slide is a qualitative comparison of visual emphasis, not a new scientific visualization or a claim that Turbo is generally superior for detail.
- **Crop / food insecurity / obesity (43–44):** Sarah Battersby, [Tableau tutorial (2018)](https://www.tableau.com/blog/how-make-effective-bivariate-choropleth-maps-tableau-83121). Preserve class keys, and do not infer an unshown crop-data year.
- **Bivariate matrix (46):** original raster creator unverified. Reading links to Munzner and Battersby explain the concepts; they are not an unsupported claim of raster ownership. The slide restores the requested Best/Middle/Poorest descriptions and red caution frame. Notes explain these as qualitative teaching heuristics rather than a universal ranking. The SVG embeds the original raster unchanged and reproduces the source presentation’s native red path using its stored coordinates; it introduces no new data.
- **Resources (52):** Tableau was read. The supplied [awsherman Observable notebook](https://observablehq.com/@awsherman/bivariate-choropleth-mapping) could not be fetched for verification; it remains optional further reading, not an offline dependency or a claimed executed notebook.
- **Mixed-color scatterplot (53):** creator, underlying dataset, and mixing function unverified. Preserve the separate standard-deviation/population-sum keys and discuss decoding cost only.
- **Color-vision plates (retained unused):** original plate edition and source unverified. Reproduced for explaining visual discrimination, not for diagnosing students from a screen or projector.
- **Blue–orange map and status icons (49):** original graphic creators / data dates unverified. The map is a palette illustration only. Design guidance is supported by [Jeffrey Shaffer / Tableau](https://www.tableau.com/blog/examining-data-viz-rules-dont-use-red-green-together) and [W3C Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html); blue–orange is not a universal guarantee of accessibility.

## Categorical palette library examples

Slide 23 lists Matplotlib `tab10` and `Set2` in a nested bullet. Both are included under Qualitative in the [official Matplotlib colormap reference](https://matplotlib.org/stable/gallery/color/colormap_reference.html), checked 2026-10-04. This reference supports the palette names; it does not attribute the supplied palette-gallery raster to Matplotlib.

## Sequential and diverging example order

Slides 26–31 now contain the sequential definition, NYT unemployment map, Plasma life-expectancy map, single/multiple-hue emphasis comparison, diverging definition, and NOAA rank map. The two removed diverging pages leave `diverging-reference-key.png`, `diverging-palette-examples.png`, and `temperature-ranks-august-2018.png` as retained unused assets; the active NOAA example uses `noaa-temperature-ranks-2018.png` on slide 31.

## Multi-hue sequential map on slide 28

- **plotly-life-expectancy-plasma.svg** — Offline vector adaptation of the [Plotly choropleth example](https://plotly.com/python/choropleth-maps/#using-built-in-country-and-state-geometries), accessed 2026-10-04. Uses the 2007 Gapminder life-expectancy values and the exact ten-stop Plotly Plasma colorscale, linearly interpolated in RGB over the observed range 39.613–82.603 years. The original webpage explicitly selects year 2007 and Plasma. Projection is equirectangular; typography and horizontal legend are enlarged for classroom use. No data values were invented or recolored by an image generator.
- **gapminder-life-expectancy-2007.csv** — The 142 original country rows from Plotly 7.1.0 `px.data.gapminder()`, filtered to 2007, retaining country name, ISO identifier, year and lifeExp. The bundled table incorrectly duplicates KOR for both Koreas; North Korea's identifier is corrected to PRK, with its value 67.297 unchanged. South Korea remains KOR with value 78.623.
- Geometry uses the public [world_110m TopoJSON](https://cdn.plot.ly/un/world_110m.json) loaded by the original Plotly webpage. Plotly documents these country boundaries as UN data with other base layers from Natural Earth. 139 rows match the polygon geometry; Bahrain, Singapore and Hong Kong are too small or absent in this 110m geometry. Gray polygons indicate no mapped data. The map is a historical palette example, not a claim about present life expectancy.
- The previous NASA evapotranspiration image remains available as an unused reference asset.

## Value-mapping section order

Slides 33–41 now cover domain, normalization, class boundaries, three verified binning examples, special values, consistent mappings, and legends. The continuous/binned explanation is consolidated into slide 32, with its two supplied palette images preserved. Univariate/bivariate examples follow on slides 43–47; the bivariate-legend exercise on slide 46 uses the same colors and variable names as slide 45.


The separate special-values and fixed-mapping pages were removed. Their principles now appear on slides 42 and 35 respectively. **fixed-domain.svg** remains as an unused conceptual asset with illustrative rates.

## Three class-boundary examples (slides 39–41)

Retrieved and checked 2026-10-04. These replace the former BBC Labour vote-share example; the original vote-share files remain unused.

- **bbc-vaccination-equal-interval.svg** — Static adaptation of [BBC News, Global vaccine rollout](https://news.files.bbci.co.uk/include/newsspec/29591-global-vaccine-rollout/english/table/embed), dated 5 July 2022, 13:28 BST. Data credit: Our World in Data. The exact computed colors of the original 248 rendered geographic features are retained; no measurements or class assignments are invented. The original [BBC TopoJSON boundaries](https://news.files.bbci.co.uk/include/newsspec/29591-global-vaccine-rollout/assets/app-project-assets/bbc_world_map_vaccines_wgs84_russia_fix_v2_w_jersey_guernsey.json?v=15) are stored as **bbc-vaccination-boundaries.json**. Projection is changed to equirectangular, and text/legend are enlarged for teaching. The palette progresses through #ffffd4, #fee391, #fed230, #fd9726 and #e6650f; no data is #c2c2c2. **bbc-vaccination-map-classes.json** records the observed path identifiers and palette indices for reproducibility. The 0, 20, 40, 60, 80% boundaries use fixed 20-percentage-point steps; 80%+ is open-ended. BBC's population-denominator caveat allows some reported values above 100%. Do not label the highest class 80–100%, or assume equal country counts.
- **england-imd2019-deciles-map.png** — Map 1 on page 6 of the [MHCLG English Indices of Deprivation 2019 Statistical Release](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/835115/IoD2019_Statistical_Release.pdf). Extracted from the official PDF at 2100 pixels high, trimming only the outer page margin and report footer; original map title, legend, England geography and London inset remain. Page 5 explicitly describes ranking 32,844 LSOAs nationally and dividing them into ten equal groups (deciles). Observations are neighbourhoods, not population or land area. **england-imd2019-decile-key.svg** enlarges the map's ten colors and names the two endpoint groups; each color represents approximately 10% of neighbourhoods. The ten colors were read from the centers of the PDF legend swatches, not newly designed.
- **airnow-wildfire-aqi-june-2023.jpg** — Unmodified second AirNow screenshot reproduced in [Adele Peters, Fast Company, 7 June 2023](https://www.fastcompany.com/90906611/maps-wildfire-smoke-air-quality-hazardous-to-peoples-health). [Exact source image](https://images.fastcompany.com/image/upload/wp-cms/uploads/2023/06/i-2-90906611-wildfire-maps-624x457.jpg). Attribution: AirNow. It is a historical screenshot; no current air-quality claims are made. **airnow-aqi-health-key.svg** repeats the six standard U.S. AQI colors and ranges from [AirNow AQI Basics](https://www.airnow.gov/aqi/aqi-basics/): 0–50, 51–100, 101–150, 151–200, 201–300, 301+. Colors indicate health-concern categories for the monitoring locations; the gray smoke overlay is a separate layer. The category boundaries have health-related meaning rather than being chosen to equalize counts. The separate key enlarges labels that are too small in the original news screenshot.


## Assets retained after removal of former slides 54–78

The main lecture ends with the summary on slide 50; its final example remains on slide 49. The Appendix occupies slides 51–53. The following assets were used only in the removed tail; their files and provenance above are retained, but they no longer appear in the deck:

- **bbc-election-map-2024.png**
- **color-dimensions.svg**
- **cyclic.svg**
- **nasa-contrast.png**
- **nasa-cvd-palettes.png**
- **nasa-landcover.jpg**
- **nasa-rainbow-grayscale.png**
- **redundant-cues.svg**
- **tableau-bivariate.png**
- **tableau-default.png**
- **tableau-dominant-crop.png**
- **tableau-separated.png**

No image files were deleted. Assets shared with retained slides, including the original crop and bivariate examples, remain active.

## Consolidated univariate/bivariate introduction

The two formerly duplicated univariate/bivariate pages are consolidated on current slide 43. The complete definitions and title from the earlier page accompany the same two maps, specific variable captions, and the bivariate-legend reminder. The temperature-map credit and Africa-map metadata limitations are retained. Both image files remain active; subsequent slides shift forward by one.

## User-selected chromosome comparison on slide 16

- **dna-mice-human.png** — Existing local asset explicitly selected by the user on 2026-10-04. Replaces the pair of separate chromosome images in the left region of slide 16. Preserved without cropping, recoloring, or stretching, including its heading, Mouse/Human labels, chromosome identifiers, and scale. Original author, study, and date remain unverified. The figure illustrates color matching of homologous regions; its embedded similarity statement does not mean complete human and mouse DNA sequences are identical. The existing explanatory text and speaker notes retain that distinction.

## Agenda and summary

Slide 2 is the agenda and slide 50 is the summary. Both use the shared theme and synthesize the existing course content without external imagery or new factual sources. All previous content pages moved forward by one, with their images unchanged.

## Consolidated cultural associations on slide 15

The merged page retains its heading, cultural-color-associations definition, and bottom design reminder. At the user’s request, its middle example now restores the yellow smiley and Chinese imperial-robe images and captions from the pre-merge slide 15. Smithsonian smiley-history and Qing-court-dress readings support the interpretations; original image creators remain unverified. The smiley convention is not exclusive to a Western audience, and the robe illustration does not document a particular emperor. The red military and wedding images and their Getty / British Museum readings remain catalogued as unused references. No source image files were modified or deleted.

## Instructor-specified wording on slide 15

The two captions use the instructor’s supplied wording about western happiness/joy and east Asian caution, including the imperial-robe example. The existing Smithsonian readings support the smiley and imperial-dress examples; they do not establish the broader regional caution claim. Caution and imperial authority express different meanings. This distinction is recorded in the speaker notes; image files and visible wording elsewhere are unchanged.

## Combined comparison task on slide 16

The complete `dna-mice-human.png` now accompanies the task-dependent color-capacity explanation, adjacent-versus-separated comparison, and highlighting/labeling advice on a single page. The image is unchanged. The former isolated mouse key remains unused. Source and date limitations, homologous-region interpretation, and the optional Compare Colors activity are retained in the page or speaker notes.

## Appendix placement

The Appendix divider is slide 51. Slide 52 preserves the bivariate-construction resources, and slide 53 preserves the mixed-color scatterplot critique. They were moved after the main lecture’s summary without modifying text, images, credits, or speaker notes. All their assets remain active.

- **Blue–orange distinguishability (48):** [Okabe & Ito, Color Universal Design](https://jfly.uni-koeln.de/color/index.html), verified 2026-10-04, supports warm/cool contrasts and specifically dark blue/orange for thin lines and small objects. The slide states that readers with deuteranopia or protanopia can generally distinguish blue from orange; it does not claim identical appearance across viewers or guarantee every shade and context. Four existing color-wheel rasters remain unchanged.


## Real-data normalization comparison (slide 37)

- **census-state-population-density-2020.csv** — The 50 states' 2020 rows from the U.S. Census Bureau's [Historical Apportionment Data CSV](https://www2.census.gov/programs-surveys/decennial/2020/data/apportionment/apportionment.csv), linked from [Historical Population Density Data (1910–2020)](https://www.census.gov/data/tables/time-series/dec/density-data-text.html), released 26 April 2021 and retrieved 12 October 2026. Density is residents per square mile of land, preserved at the published one-decimal precision. FIPS codes are joined by exact state name. The District of Columbia, Puerto Rico, and national totals are excluded, leaving 50 matched states. This is historical Census data, not a current population estimate.
- **us-states-albers-10m.json** — Unmodified [us-atlas v3 states-albers-10m.json](https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json). Census 2017 cartographic boundaries, simplified and projected with Albers USA for a 975 × 610 viewport; Alaska is rescaled and Alaska/Hawaii are insets. Source [topojson/us-atlas](https://github.com/topojson/us-atlas), Michael Bostock, ISC license retained as **us-atlas-LICENSE.txt**. The DC geometry remains in the downloaded source but is omitted from both displayed maps.
- **census-density-linear-log.svg** — Teaching charts redrawn from the above data and geometry, not screenshots of a published Census visualization. The two maps share the exact 50 values, boundary paths, insets, state labels, continuous D3/ColorBrewer Blues palette, and domain [1.3, 1263.0]. The only mapping change is t=(x−1.3)/(1263−1.3) versus t=ln(x/1.3)/ln(1263/1.3). The linear legend labels 1.3, 400, 800, 1,263; the log legend labels 1.3, 10, 100, 1,263 at their correct normalized positions. The gradient is the same in both legends; all values are positive and none are clipped. WY/TX/CA have identical labels and geometry in both panels. Individual paths contain exact density values and normalized positions for inspection. No simulated measurements or claims of perceptual uniformity are introduced.
