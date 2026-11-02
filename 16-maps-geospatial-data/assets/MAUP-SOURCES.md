# MAUP teaching figures

The eight PNG files are unchanged image assets from the instructor-provided `slides_previous_semester/09_Interaction.pptx` (reference pages 28–33). Credits below identify their original creators. They are teaching examples, not newly generated or reconstructed data.

| Local asset | Original attribution | Interpretation |
|---|---|---|
| `maup-petroleum-districts.png` (retained asset; no longer displayed) | U.S. Energy Information Administration | Five Petroleum Administration for Defense Districts. Categorical region colors; no fuel quantities are shown. |
| `maup-zonation-grid.png`, `maup-zonation-cluster.png`, `maup-zonation-dispersed.png` | Penn State GEOG 486, Fig. 4.cg.6, credited in Tamara Munzner’s course | Same point locations, different aggregation boundaries, qualitative density patterns. Numerical thresholds are not supplied. |
| `maup-indiana-counties.png`, `maup-indiana-tracts.png` | Rick Jones / Cartographica, 19 May 2011; data: IndianaMap | Raw household counts, counties versus census tracts. The original author describes Natural Breaks classification. Matching colors do not establish matching numerical intervals; no numerical legends are available in these assets. |
| `maup-gerrymandering-fifty-voters.png` | Christopher Ingraham / The Washington Post, 1 March 2015, adapted from Stephen Nass | Hypothetical 50 voters: 30 blue, 20 red; five districts of 10 people each. Blue seat counts: 3, 5, 2. Original embedded credits retained. |
| `maup-alabama-district-groupings.png` | Efram Stone / METRANS, 3 February 2017, Fig. 3 | Percentage of residents under five; counties combined into alternative larger regions. Common five-class legend. This is zonation, not a tract/county scale comparison. |

## Verified source links

- EIA reporting-region context: https://www.eia.gov/analysis/transportationfuels/padd1n3/
- Penn State original citation: http://www.e-education.psu.edu/geog486/l4_p7.html (Fig. 4.cg.6); attribution corroborated by Munzner’s original teaching PDF, https://www.cs.ubc.ca/~tmm/talks/minicourse14/vad17fullday.pdf . Original legacy Penn State page unavailable during this edit.
- Indiana original explanation: https://blog.cartographica.com/the-modifiable-areal-unit-problem-in-gis.html . This resolves the erroneous borough/precinct terminology in the reference: counties and census tracts are the actual units. Do not describe raw counts as density.
- Electoral-boundary graphic: https://www.washingtonpost.com/news/wonk/wp/2015/03/01/this-is-the-best-explanation-of-gerrymandering-you-will-ever-see/ . The original labels simplify fairness; the course notes explicitly qualify proportional seats as an incomplete fairness criterion. Use the original pixels supplied by the instructor, including embedded credit.
- Alabama original explanation: https://www.metrans.org/news/the-modifiable-areal-unit-problem-an-overview . Its Figure 3 is the supplied image. Avoid the article’s inconsistent county names and “over 5” typo. No measurement year is asserted. The separate Figure 1 and Figure 2 could not be downloaded reliably and are not used.
- MAUP definition: https://support.esri.com/en-us/gis-dictionary/modifiable-areal-unit-problem ; Openshaw (1984), *The Modifiable Areal Unit Problem*.
- Boundary selection: https://gistbok-ltb.ucgis.org/current/concept/AM-02-098 . Shanghai task/unit rows are illustrative suggestions, not measurements. Smaller areas and regular grids do not eliminate sensitivity.
- Gerrymandering concepts: https://www.brennancenter.org/our-work/research-reports/gerrymandering-explained . Avoid jurisdiction-specific legal conclusions.

## Content checks

- MAUP concerns aggregation and can occur without intent. Gerrymandering concerns intentional electoral manipulation.
- Aggregation scale is distinct from zoom or printed map scale.
- A pooled regional rate uses summed numerator divided by summed denominator, not an unweighted average of component rates.
- A regional color does not reveal variation among the individuals or smaller areas within that region.
- The 50-voter image is a schematic, not election data. Original plan 3 has 9 blue voters in each of two districts and 4 in each of three, totaling 30.
- Part 03 begins after the grid-map and two symbol-map pages. After the Shanghai aggregation-unit example, the channel-ranking, totals-versus-density, and map-summary pages precede the appendix on projections. The old dot/flow/task-selection section has been removed.

## Spatial aggregation before/after diagrams (slide 31)

- `spatial-aggregation-before.svg` and `spatial-aggregation-after.svg` are editable course-authored diagrams, replacing the PADD example.
- This is explicitly hypothetical teaching data, not a measured dataset: 12 incident points in three schematic regions. Region counts are A = 5, B = 4, C = 3; the count remains 12.
- Both diagrams use identical polygon vertices. Point-in-polygon membership was computed from the displayed coordinates and verified: every point belongs to exactly one region.
- Categorical colors identify regions; numerical labels encode counts. No quantitative color classification is used.
- The pedagogical operation is spatial assignment followed by grouped counting. The result has one record per region; original incident positions are no longer shown in the aggregated view.

## Fixed points, alternative boundaries (slide 32)

- `maup-same-points-original.svg` and `maup-same-points-redrawn.svg` continue the slide 31 hypothetical incident example. Points and original polygons were read directly from `spatial-aggregation-before.svg`, not independently recreated.
- Both figures have the same 12 point coordinates, mark sizes, mark colors, rectangular extent, and three-region count. The alternative internal boundaries create a left strip (x 20–110), an upper-right region (x 110–460, y 20–90), and a lower-right region (x 110–460, y 90–240).
- Point-in-polygon assignment yields A/B/C counts of 5/4/3 for the original and 2/4/6 for the alternative. Every point belongs to exactly one region; both count totals equal 12.
- Region colors remain categorical. The captions give numerical counts, not densities. The highest regional count changes from A to C without moving or adding/removing points.
- This demonstrates the zonation aspect of MAUP. The full definition also includes changes in aggregation scale, explained on the following pages. Region labels identify the corresponding zones within each plan; their shapes and membership are allowed to change.

## Shanghai geographic groupings (slide 38)

- `maup-shanghai-zones.svg` reproduces the figure from the instructor-specified reference page 33 of `09_Interaction.pptx`: the original Google Maps bitmap plus its original red and blue native vector annotations.
- The image data are embedded unchanged; the two PowerPoint cubic Bézier paths are converted into SVG coordinates relative to the original picture bounds. No map content is regenerated, recolored or cropped, and no old-slide text is included.
- Original bitmap: `ppt/media/image21.png`; original drawing objects: IDs 304 and 305 on `ppt/slides/slide33.xml`. Google’s visible logo is retained, and the slide adds explicit Google Maps attribution.
- The colored lines are schematic teaching marks, not exact administrative boundaries or an exact river trace. Pudong/Puxi is a broad geographical grouping; do not identify it with Pudong New Area's administrative boundary. Central-city/suburban zones must be explicitly defined for an analysis.
- Visible text preserves the original task/unit/reason table: district service budgets and administrative districts; neighborhood service gaps and subdistricts or smaller areas; spatial event densities and equal-area grids. The map supplies geographic context. The bottom sentence emphasizes understandable, task-appropriate zones; sensitivity checks remain in speaker notes. No numerical Shanghai dataset or current boundary claim is introduced.


## Packing and cracking diagrams (slide 35)

Two original PNGs were downloaded unchanged on 2026-11-02 from the Brennan Center for Justice's [Gerrymandering Explained](https://www.brennancenter.org/our-work/research-reports/gerrymandering-explained), under its explanations of the two techniques. The page visibly credits Brennan Center for Justice. Both images are 800 × 367 RGBA, and retain their original transparency, colors, outlines, and aspect ratios. No cropping, recoloring, or generated content was applied; no general open license is asserted.

- `gerrymandering-packing-brennan.png`: https://www.brennancenter.org/sites/default/files/styles/800xauto/public/2021-08/2021_08_09_gerrymandering_graphics_1200_revise1.png?itok=HnW_AoVz . SHA-256: `bdc9ec587aba91137a022868a1a174529da8857727ed3cc490d86cc3eaa58432`.
- `gerrymandering-cracking-brennan.png`: https://www.brennancenter.org/sites/default/files/styles/800xauto/public/2021-08/2021_08_09_gerrymandering_graphics_1200_revise3.png?itok=2izx2vBv . SHA-256: `399bbdd2a7fda1fa427559eeb008a4f2a6b7477a211a29fda8d09560a5b5ea49`.

These are schematic diagrams, not actual election maps or equal-population redistricting plans. The packing diagram illustrates concentrating the light-blue group into fewer districts. The cracking diagram depicts splitting one group, omitting surrounding voters; it does not provide complete district populations or a numerical seat calculation. The following page's existing 50-voter example supplies that complete hypothetical comparison. Packing and cracking are techniques of gerrymandering and may be combined; MAUP itself does not imply intent. Do not use the source article's current jurisdiction-specific legal or political claims as conclusions from these teaching diagrams.
