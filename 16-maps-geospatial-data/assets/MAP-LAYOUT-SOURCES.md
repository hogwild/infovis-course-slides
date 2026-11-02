# Map layout examples and controlled comparisons

## Local data and scope

The original 2020 Census CSV and us-atlas geometry were already verified for this course; their original URLs, retrieval history, and licenses are in `MODELING-SOURCES.md`. `render-layout-assets.cjs` joins the 50 state rows by FIPS and checks names. Most new maps show the contiguous 48 states, excluding Alaska, Hawaii, DC, and territories. The equal-unit grid shows all 50 states. No observations or real-world measurements were invented.

- Population is the 2020 resident population, not a current estimate.
- Density is residents per square mile of land, at the published one-decimal precision.
- The 2017 state geometry is the existing simplified Albers USA topology. Comparisons of geographic area use the contiguous states, avoiding the Alaska inset's rescaling.
- Map diagrams are course renderings, not graphics published by the Census Bureau. Labels and geometric layouts are teaching annotations.

## Reused reference images

These files are byte-identical copies of assets embedded in the supplied `slides_previous_semester/08_Geomaps.pptx`. They are reused as reference material at the instructor's request; no new licensing claim is made.

- `choropleth-us-unemployment-2016.png`: `ppt/media/image2.png`, reference slide 15. County unemployment rates, August 2016; the old slide's word “country” is corrected to county. Original chart attribution: Mike Bostock / D3, https://observablehq.com/@d3/choropleth ; data attribution: U.S. Bureau of Labor Statistics. The image's original legend is retained. The notebook has since been edited, so the historical screenshot's date is taken from the supplied reference, not from the current notebook publication date.

## Geographic area and salary color on slide 18

`choropleth-median-full-time-salary-2024.png` is a byte-identical copy of `ppt/media/image41.png` from reference slide 17 of the supplied `08_Geomaps.pptx`, selected after confirming the intended image with the instructor. SHA-256: `34d819eadf6cfc8106eb279097d6294e739bc94628fcdb187b9bcc066bdc67de`. No cropping, recoloring, or raster edits were applied.

Original graphic: Niccolo Conte (research/writing) and Sabrina Lam (art direction/design), Visual Capitalist, [Mapped: Median Full-Time Salary by State](https://www.visualcapitalist.com/mapped-median-salary-by-u-s-state/). The original graphic credits the U.S. Census Bureau, American Community Survey 2024 1-year estimates, and describes full-time employed civilians aged 16 and over. The visible rounded values used in the explanation are Texas $58.7K, Massachusetts $79.1K, and Delaware $61.7K. The original publisher's indexed page confirms the graphic title and Texas/Massachusetts values; opening the page returned HTTP 403 during this revision. Attribution and other values are read directly from the supplied original graphic. No inaccessible page content was assumed.

This is an authentic design example, not a controlled experiment isolating area: label sizes, decoration, and callouts may also affect visual attention. Keep comparison to the contiguous states and do not compare rescaled Alaska/Hawaii or enlarged DC with them. The later symbol-map page explicitly returns to the separate 2020 population-density example. It does not imply that its colors and values are those of this salary map. The previous `layout-choropleth-density.svg` asset is retained, but no longer displayed on slide 18.

## Historical poverty comparison

Slide 19 retains six unchanged PNGs from the supplied deck: maps `image4.png` / `image20.png`, class diagrams `image14.png` / `image6.png`, and palettes `image7.png` / `image18.png`. Their destination names are `poverty-{guardian,aisch}-{map,class-breaks,palette}.png`. SHA-256 comparisons verified byte identity. No cropping or recoloring was applied.

Original attribution: Simon Rogers / The Guardian, https://www.theguardian.com/news/datablog/interactive/2011/sep/15/us-poverty-mapped ; comparison and analysis: Gregor Aisch, “Take Care of your Choropleth Maps” (2011), https://www.vis4.net/blog/choropleth-maps/ . These sources verify the dataset and the two mappings. This is a historical example, not a current poverty estimate. Slide 19 focuses on bin widths: the original limits [6,9,12,15,18,23] yield widths [3,3,3,3,5] percentage points. The alternative uses five equal intervals over [6.6,22.7], each 3.22 points wide; its labels round to one decimal. Both class limits and colors change. The following county-unemployment example explains why equal-width intervals are not always suitable.

## Skewed county unemployment and distribution-aware intervals

Slides 20–21 retain four unchanged images embedded in the supplied PPTX. Extracted bytes were compared with their source ZIP entries; no cropping, recoloring, or data changes were applied.

| Asset | PPTX media entry | Meaning |
| --- | --- | --- |
| `unemployment-linear-map.png` | `ppt/media/image17.png` | County unemployment with continuous Min/Max mapping. |
| `unemployment-linear-color-scale.png` | `ppt/media/image30.png` | Original linear ramp, 1–26%. |
| `unemployment-median-map.png` | `ppt/media/image51.png` | Same data with continuous Min/Median/Max mapping. |
| `unemployment-median-color-scale.png` | `ppt/media/image38.png` | Original ramp with the median, 6%, at the midpoint. |

Original author and interpretation verified from Lisa Charlotte Muth, “How to choose a color palette for choropleth maps” (27 October 2017), https://www.datawrapper.de/blog/how-to-choose-a-color-palette-for-choropleth-maps . The article's Min/Max and Min/Medium/Max sections identify the maps, range, and median. “Medium” is the historical interface label for the median. The publication year is not asserted to be the data year.

The second map devotes equal halves of the continuous ramp to [1,6] and [6,26], so about half the counties fall on either side of the middle color. It is **not** a discrete quantile choropleth. The slide separately recommends quantile classification for classed maps, with roughly equal observation counts per bin. Method reference: Muth, “How to choose an interpolation for your color scale” (2022), https://www.datawrapper.de/blog/interpolation-for-color-scales-and-maps ; Esri, https://doc.esri.com/en/arcgis-pro/latest/help/mapping/layer-properties/data-classification-methods.html . The later article uses different data; none of its exact counts, date, or thresholds are assigned to these historical images. The supplied slides' unsupported count claim below 5% is replaced by the verified low-value concentration and long upper tail. No generic skew-distribution picture is treated as a measured histogram.

## Newman’s 2016 state-winner comparison

Slide 23 uses two byte-identical images extracted from the instructor-supplied PPTX:

- `newman-2016-state-geographic.png`: `ppt/media/image19.png`; ordinary geographic state map. SHA-256: `193a43ee6b44e18d4669b60d48a8c906dce35c230cc6822a2fd6ad5fe06e22f3`.
- `newman-2016-state-population-cartogram.png`: `ppt/media/image15.png`; state areas scaled by population. SHA-256: `aab475db875bfa5dbb433a4bb3fe6d4b68b940fbadcf41ff0c841d6a2c5f61a8`.

Original creator: Mark Newman, University of Michigan, “Maps of the 2016 US presidential election results,” http://www-personal.umich.edu/~mejn/election/2016/ . Institutional attribution: https://lsa.umich.edu/cscs/people/core-faculty/mejn/cartograms-of-the-2016-election-results.html . The original personal-site URL was unavailable during this revision; its population-scaling explanation is preserved as an attributed quotation at https://geographyeducation.org/2016/11/13/election-cartograms/ . A contemporary reproduction at https://xray-delta.com/2016/11/20/a-cartographic-analysis-of-the-2016-u-s-presidential-election/ identifies the state maps and links `statemap512.png` and `statepop1024.png`. These references establish population weighting, correcting the supplied slide’s loose wording about numbers of voters. No new population year, voter count, or numerical area ratio is asserted.

Red and blue encode the Republican/Democratic statewide winner. Area encodes geographic extent in the first image and population in the second. Population is not turnout, popular-vote share, or Electoral College votes. Because each state has a single winner color, total red/blue area cannot be read as the national popular-vote split. Both images retain their original bounds, colors, aspect ratios, and geometry; no cropping or recoloring was applied. General cartogram definition: Gastner and Newman (2004), https://arxiv.org/abs/physics/0401102 .

## Verified election-map panels

Retained assets from an earlier draft, no longer displayed: the following panels were cropped directly from Michael T. Gastner, Vivien Seguy, and Pratyush More, “Fast flow-based algorithm for creating density-equalizing map projections” (2018), https://arxiv.org/abs/1802.07625 (PDF: https://arxiv.org/pdf/1802.07625). These are Electoral College-weighted maps, distinct from the population-weighted Newman pair on slide 23. The figure captions specify the area variable.

- `gastner-2018-electoral-geographic.png`: Fig. 2A, PDF page 2. An Albers equal-area geographic map of the 2016 Electoral College, with rescaled Alaska/Hawaii insets.
- `gastner-2018-electoral-cartogram.png`: Fig. 3A, PDF page 3. A contiguous diffusion cartogram with region area proportional to 2016 Electoral College votes. The Alaska/Hawaii insets use the same area scale as the main cartogram.
- Party color is categorical: Republican red, Democratic blue. Neither figure encodes the popular vote. Maine is divided into two electoral units in the source to represent its split allocation. White circles mark state capitals.
- Extraction: original PDF crop boxes [54,441,304,660] and [54,532,304,738] in PDF points, then `pdftoppm -cropbox -png -r 300`. The Fig. 3A extraction also clips to the union of [54,566,250,172] and [85,533,130,52] (x, y, width, height) to exclude adjacent Fig. 3B labels while retaining all of Fig. 3A and its Alaska/Hawaii inset. No reshaping, recoloring, or data changes. Original figure panel letters and state labels remain.

- Retained shape-detail layouts (no longer displayed): `cartogram-shape-montana.svg` and `cartogram-shape-new-jersey.svg`, generated by `render-cartogram-details.cjs`, embed the unchanged panel PNGs inside clipped SVG viewports. Montana crop boxes: geographic [190,80,220,160], cartogram [190,145,160,116]; New Jersey: geographic [815,215,165,145], cartogram [785,250,165,145] (x,y,width,height in original PNG pixels). Each viewport uses uniform scaling. The independent zoom levels were disclosed in the earlier draft; these retained details illustrate shape recognition, not quantitative area ratios. Headers and an arrow provide the comparison structure without repainting or redrawing the maps.
- Concrete teaching comparison: Montana and Washington, DC each had three electoral votes in 2016 despite their very different land areas. The cartogram changes their relative visual weight; the paired original map supports recognition of distorted states.

## Generated comparisons

Run `node slides/16-maps-geospatial-data/render-layout-assets.cjs` from the repository root. Inputs resolve relative to the script. All generated SVGs have meaningful titles, exact local inputs, and static HTML/PDF compatibility. `layout-comparison-metadata.json` records boundaries, counts, and the grid arrangement.

| Asset | Controlled comparison / rule |
| --- | --- |
| `layout-choropleth-density.svg` | Five density classes with boundaries 50, 100, 250, and 500; labels identify TX, MA, and DE. |
| `layout-map-ranking.svg` | Identical five western-state density values on geographic shapes and sorted bars. A continuous Blues scale [0,260] isolates quantitative channel ranking (color lightness versus aligned position/length) from discrete class boundaries. |
| `layout-color-symbol-density.svg` | Same density classes and palette; one equal-size circle per state at the geographic centroid. Circle size carries no measurement. |
| `layout-population-symbols.svg` | Circle area proportional to state population; true geographic anchors, descending-size drawing order, transparency, and an explicit size key. |
| `layout-count-density.svg` | Changes the quantity from population to population / land area. Each panel states its own units and scale; geography is identical. |
| `layout-classification.svg` | Retained comparison asset, no longer displayed on slide 19. Identical values and colors. Equal-interval boundaries: 260, 520, 780, 1040. Quantiles: 41.46, 71.32, 156.56, 274.76. Labels round to one decimal; classification uses the recorded exact thresholds. |
| `layout-palette-contrast.svg` | Retained comparison asset, no longer displayed on slide 20. Identical values and boundaries 50, 100, 250, 500. A conventional Blues sequence is compared with a deliberately uneven sequence whose last step is unusually dark. |
| `layout-density-linear-log.svg` | Retained comparison asset, no longer displayed on slide 21. Same values, palette, geometry, and positive domain [5.9, 1263]. Only linear versus logarithmic normalization changes. 37 of 48 states have density below 250. |
| `layout-dorling-population.svg` | Retained standalone circle cartogram, no longer shown in the introductory page. Circle area proportional to residents; circles start at geographic centroids and move to avoid overlap. Numeric checks verify area proportionality and nonoverlapping marks. |
| `layout-cartogram-population-comparison.svg` | Retained comparison asset, no longer shown on slide 23. Geographic choropleth versus population-scaled circle cartogram. Both use identical density values, bins [50,100,250,500], and colors. MT/NJ labels and coral outlines identify the concrete comparison: NJ 9,288,994 residents, MT 1,084,225; area ratio about 8.57, verified numerically from the drawn radii. Color is residents per land square mile. Geographic visual area is replaced by resident-weighted area; the circle layout preserves approximate arrangement, not exact positions. Uses the existing deterministic layout and nonoverlap checks. |
| `layout-dorling-demers.svg` | Retained comparison asset, no longer displayed on slide 25. Same values and same area-per-person constant, using circles and squares. The square version is a Demers-style deterministic layout, not a reproduction of a specific published optimizer. |
| `layout-cartogram-displacement.svg` | Retained asset, no longer displayed after the grid-map summary revision. Same initial geographic anchors and circle-area scale. Gray stems identify five northeastern states’ displacement; packed-circle contact does not imply a geographic border. |
| `layout-cartogram-area-ranking.svg` | Retained asset, no longer displayed after the grid-map summary revision. CA and TX populations in a Dorling layout versus aligned, labeled bars. Values: 39,538,223 and 29,145,505, ratio about 1.36. |
| `layout-grid-density.svg` | One equal-size tile per state, color = the same density classes. Manual grid positions are design choices, not geographic coordinates or measurements. Includes all 50 states and omits DC. |
| `layout-grid-false-neighbors.svg` | Retained asset, no longer displayed after the grid-map summary revision. Actual CA/NV/UT geometry versus an exact fragment of the manual grid. The grid makes CA and UT touch even though they share no geographic border. Highlight colors identify states and encode no measurement. |

## Concepts and original sources

- Tamara Munzner, *Visualization Analysis and Design*, Chapters 5 and 8: quantitative channel ranking, channel separability/interference, geographic position, area marks, choropleths, and cartograms. Slides 18 and 39 also use the established definitions and qualifications in the course’s Lecture 04.
- Esri, graduated colors: https://doc.esri.com/en/arcgis-pro/latest/help/mapping/layer-properties/graduated-colors.html . Class boundaries, colors, and legends.
- Esri, choropleth maps: https://doc.arcgis.com/en/insights/latest/create/choropleth-maps.htm . Rates/ratios and normalization. Product lifecycle status is irrelevant to the cartographic concepts; no current-product recommendation is made.
- Esri, proportional symbols: https://doc.esri.com/en/arcgis-pro/latest/help/mapping/layer-properties/proportional-symbology.html . Quantitative symbol sizing, overplotting, and drawing order.
- Gastner and Newman, “Diffusion-based method for producing density equalizing maps” (2004): https://arxiv.org/abs/physics/0401102 . Population-area cartograms and geographic distortion.
- Harry Stevens, Dorling cartogram: https://observablehq.com/@harrystevens/dorling-cartogram .
- Nicolas Lambert, Demers cartogram: https://observablehq.com/@neocartocnrs/dorling-vs-demers .
- Sylvain Lesage, grid cartograms: https://observablehq.com/@severo/grid-cartograms . A one-region tile map is distinguished from geographic hexagonal binning.

The reference deck informs the teaching sequence. The requested historical poverty example now has verified original attribution. Other comparisons retain measured local data; the old course layout is not reused.

## Worldmapper comparison: cartogram advantages and limitations

Slide 24 uses two unchanged images from Worldmapper, retrieved 2026-10-31:

- `worldmapper-reference.png`: https://worldmapper.org/wp-content/uploads/2018/03/Worldmapper_Basemap_label.png ; source page https://worldmapper.org/maps/worldmapper-basemap/ . SHA-256: `83cbaffd40fe74f6b18495bc5890fe3d38a3ee1d5a9b288cc5abe4af81ac2eb9`. Equirectangular reference map; its displayed areas are not exactly proportional to land area. The original regional color key and logo are retained.
- `worldmapper-population-2018.png`: https://worldmapper.org/wp-content/uploads/2018/03/People_TotalPopulation_2018.png ; source page https://worldmapper.org/maps/population-year-2018/ . SHA-256: `92420ca43729311d075f49cd034d84ad227026b577cf8052bfb8b6ed6412b632`. Territory area represents its share of the 2018 world population. Data: United Nations World Population Prospects, 2017 revision, as identified by Worldmapper.

Both source pages license the images under Creative Commons Attribution–NonCommercial–ShareAlike 4.0 (https://creativecommons.org/licenses/by-nc-sa/4.0/). Credit and license links appear on the slide. Images are displayed complete, with original colors, shapes and aspect ratios; no raster editing or cropping. The shared color scheme distinguishes geographic regions, not numerical population magnitudes. These images provide visual intuition, while the three bullets describe the general benefit, recognition cost, and role of labels. Worldmapper’s FAQ (https://worldmapper.org/faq/) discusses territory identification using shape, position, consistent colors, and reference maps.


## Dorling and Demers comparison on slide 25

The requested reference pages introduce circle and square cartograms. Slide 25 now uses the labeled versions from the original author, Kenneth Field (2017), “Cartograms,” GIS&T Body of Knowledge, Figures 3 and 4: https://gistbok-ltb.ucgis.org/current/concept/CV-04-032 .

- `field-2012-dorling-cartogram.png`: https://bok-figures.s3.amazonaws.com/files/Figure3_cartograms_clr.png .
- `field-2012-demers-cartogram.png`: https://bok-figures.s3.amazonaws.com/files/Figure4_cartograms_clr.png .

Both images were downloaded on 2026-10-31 and are reproduced byte-for-byte, without cropping, recoloring, relabeling or reshaping. They depict the 2012 U.S. presidential election. Each symbol represents a state, its area encodes total votes, and blue/red identifies the Democratic/Republican statewide winner. Labels are part of the original figures. The author’s original Dorling example explicitly identifies the quantity as overall vote at state level: https://www.arcgis.com/home/item.html?id=ae964bc7147348dead251d54e2d9dffa ; metadata snapshot in the task reference directory. This is not population or Electoral College weighting. Do not infer individual vote shares from winner colors, or compare absolute symbol areas between independently fitted image panels.

Field’s https://www.esri.com/arcgis-blog/products/arcgis-pro/mapping/graphical-cartograms-in-arcgis-pro supports the conceptual contrast: Dorling generally limits displacement, while Demers seeks tighter packing/contiguity and may accept more displacement. That article’s pictured 2016 Electoral College data are distinct from these 2012 figures. Neither compactness nor geographic adjacency is guaranteed for arbitrary layouts. Both geometric-mark variants sacrifice geographic shapes and locations; area comparisons remain perceptually imprecise.

- SHA-256 `field-2012-dorling-cartogram.png`: `54044a9cafa88c3b2ba8bc4443ad078e7821c4bda6c37ae01b152a9b17b67e2f`.
- SHA-256 `field-2012-demers-cartogram.png`: `e2f86e1669e287adb1a1eaf4d39740a5365e9ccc2e0f14fba176c9732cc83fae`.

## Grid-map summary revision

Slide 26 reuses `layout-grid-density.svg` unchanged for a concise equal-unit grid-map introduction. One tile represents one state; color shows 2020 population density. The separate displacement, area-ranking, and false-neighbor slides were removed; their assets remain available but are not displayed.


## Visualization Wheel and choropleth overview (slide 17)

- `choropleth-visualization-wheel.svg` contains the unchanged 1120 × 990 PNG `ppt/media/image12.png` from the instructor-supplied `08_Geomaps.pptx`, reference slide 16, plus that page's two original native red ellipse annotations (shape IDs 223 and 224). Ellipse coordinates and stroke widths are transformed from the source picture's EMU rectangle to the SVG viewBox. The complete wheel is retained, without raster editing or cropping.
- Original bitmap SHA-256: `676c17f0827c304b8588cd91c94245000c9c3ff3c80e1f725e8f8a95ada5415c`. The SVG embeds those exact bytes, making the figure self-contained for HTML and PDF.
- Credit: Alberto Cairo, *The Functional Art*, Visualization Wheel. Author/publisher excerpt: https://www.peachpit.com/articles/article.aspx?p=1945331&seqNum=3 . The wheel is a qualitative design framework, not a numerical performance scale. Connecting the circled Familiarity and Figuration dimensions to choropleths is a teaching interpretation.
- The page retains the supplied overview's two benefits and three limitations, with prose rephrased for the course. It previews the detailed limitation pages; the later summary remains a post-example review. No general open license for the original figure is asserted.
- Extraction/assembly script: `/Users/bing/Developer/03_Sandbox/scratch/Information_Visualization/2026-10-30-lecture16-spatial-modeling-01a18bb8/tmp/add-choropleth-wheel.py`.

## Retained pie-chart glyph example (no longer displayed)

- `glyph-germany-land-use-pies.png` is the unchanged `ppt/media/image35.png` from reference slide 39 of `slides_previous_semester/08_Geomaps.pptx`. Dimensions: 1066 × 904 pixels. SHA-256: `a8721eff206616a033b1e1db1e3f06fef3c11bdac00272e982f0c5907bc3a21c`.
- Original figure: Thomas Rahlf, *Data Visualisation with R*, https://www.datavisualisation-r.com/pdf/maps_germany_cities_piecharts_outline.pdf . The author's companion site identifies the book and provides the figures: https://www.datavisualisation-r.com/ . The image retains the printed source credit, Statistisches Bundesamt, Fachserie 3, Reihe 5.1.
- One equal-size pie glyph per German state. Yellow identifies agriculture, green forest area, and red settlement area. Sector angles describe the relative proportions of the three displayed categories. Berlin's large red sector and Niedersachsen's large yellow sector support the on-slide comparison. No exact percentages, observation year, absolute land areas, or omitted categories are inferred.
- The full map and legend are preserved. The figure is a historical teaching example, not a current statistical estimate. Its point anchors represent states, not the within-state locations of individual land uses. This pie-chart example was superseded by the instructor-requested bar-chart glyph map; the original asset remains available.

## Bar-chart glyph symbol map (slide 29)

- `glyph-us-state-bar-charts.png` is the unchanged `ppt/media/image42.png` from the left panel of reference slide 39 in `slides_previous_semester/08_Geomaps.pptx`. Dimensions: 1960 × 1366 pixels. SHA-256: `86a848930383a7e1aafffcdf22c1bf3ad687ce648bb8adc6564218e3436d81e9`. Preserve its transparency and full legends.
- Original source: Vanessa Peña-Araya, Emmanuel Pietriga and Anastasia Bezerianos, “A Comparison of Visualizations for Identifying Correlation over Space and Time,” IEEE Transactions on Visualization and Computer Graphics, 26(1), 375–385 (2020). DOI: https://doi.org/10.1109/TVCG.2019.2934807 . Author manuscript: https://arxiv.org/pdf/1907.06399 . The source image visually matches Fig. 1c (Barchart1M), including the Texas, Utah, Wisconsin and Maine glyphs and the two legend ranges.
- Fig. 1 and section 3.4 explicitly state that the data were artificially created for the experiment. The two variables are labelled literacy rate and working hours per week. They are not actual U.S. state statistics; the slide visibly labels the data as artificially generated.
- Each state has four adjacent bars, ordered by year from 2000 to 2003. Bar height/length encodes literacy rate and blue lightness encodes weekly working hours. The Texas glyph's second bar is tallest and darkest. The visible comparison stays qualitative, with no invented precise value.
- The image and definitions follow the proportional-symbol page and precede MAUP. The source paper describes a broader experiment; this slide uses only its encoding example, not a claim that bar-chart glyphs always outperform other map layouts.
