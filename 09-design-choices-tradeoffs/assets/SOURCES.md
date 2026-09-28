# Lecture 09 · Source and production record

Web source snapshots were downloaded on **2026-09-26**. Historical image files were extracted from the instructor-provided previous-semester deck on the same date. Original publisher images are reproduced with attribution; course SVGs are labeled as adaptations.

## owid-life-expectancy-full.csv

- Download: https://ourworldindata.org/grapher/life-expectancy.csv
- Description / credit / reuse: 原始完整数据；selected CSV 只选择日本、英国、美国 1960–2023 年。该段数据来自 UN WPP 2024，经 OWID 处理。第三方数据沿用来源条款。
- SHA-256: `c304603fb8a7da263619a8ae43b7097f35b648c458855e23f1c4ef8f2ae75c01`

## owid-life-expectancy.metadata.json

- Download: https://ourworldindata.org/grapher/life-expectancy.metadata.json
- Description / credit / reuse: 原始元数据，保留单位、定义、来源与更新时间。
- SHA-256: `748542daa0dad1c4b6741237eb319d405b74c58059502cfe1d9f4e377ca820c1`

## owid-life-expectancy-original.svg

- Download: https://ourworldindata.org/grapher/life-expectancy.svg?tab=chart&time=1960..2023&country=JPN~USA~GBR
- Description / credit / reuse: OWID 原始导出，保持原作者版式及署名；CC BY。
- SHA-256: `978352d92940918e07d6b322b0822631c5775617594a51edbb1c8aad2a2a322c`

## hawkins-warming-stripes.jpg

- Download: https://www.reading.ac.uk/planet/-/media/project/uor-main/uor-campaign/climate-for-change/home/climate-stripes.jpg?h=675&hash=541D667D55ABD2A0E65EF0FFFF00236E&iar=0&w=1200
- Description / credit / reuse: Ed Hawkins / University of Reading，CC BY 4.0。原图不印年份，不推断其精确起止年。Reading 来源页解释基准为 1961–2010；与 NASA 图的 1951–1980 不同。
- SHA-256: `f78347ebb2cefc413b805a2e9911d1c8e57fbeb3a59c282a3972e9c4fff20316`

## owid-mammal-biomass.png

- Download: https://ourworldindata.org/cdn-cgi/imagedelivery/qLq-8BTgXU8yG0N6HnOy8g/17b5bea1-d8ed-496a-6efc-f14d90036a00/w=1548
- Description / credit / reuse: Hannah Ritchie & Klara Auerbach / OWID，CC BY（图中署名）。Bar-On et al. (2018), 2015 estimates. 1 square = 1% global mammal carbon biomass. 4% wild, 34% humans, 62% livestock. 保留完整原图，不替换为更新估计。
- SHA-256: `eae35cee4ffadff6596fd769e7e4aab7a64153f0440ee8a2f63f22a5a64b1e69`

## nasa-climate-spiral.mp4

- Download: https://assets.science.nasa.gov/content/dam/science/esd/climate/2023/11/GISTEMP_Spiral_60sec_C.m4v
- Description / credit / reuse: 官方 60 秒 Celsius 版本；NASA SVS / Mark SubbaRao (2023), Climate Spiral 1880–2022, https://svs.gsfc.nasa.gov/5057/ 。NASA 内容依官方媒体使用规范用于教育并署名：https://www.nasa.gov/nasa-brand-center/images-and-media/ 。视频字节保持原样，仅扩展名 mp4。
- SHA-256: `5f4df5f52d7159d0644efafea7600ad4f39799b1b03a0d422d34be4e83ba6fa5`

## nasa-gistemp.csv

- Download: https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv
- Description / credit / reuse: NASA GISTEMP v4, Land-Ocean global means；单位 °C，基准 1951–1980。课程图取 1880–2022 全部 1716 个逐月值。2026 年下载可能含修订，不能宣称与 2023 视频逐点完全一致。
- SHA-256: `c9ce0750ca93a8241c42fe86cd5bf54d07b28b21ae650b0ae49a206907018cd9`

## Local production and verification

`../render-cases.py` uses Python's standard library and the local CSV snapshots. Re-run from any working directory with `python3 slides/09-design-choices-tradeoffs/render-cases.py` from the repository root. It produces:

- `life-expectancy-selected.csv`: 192 observations, no missing years, original numeric precision.
- `life-expectancy-table.html`: all values, offline, semantic table, linked CSV.
- `life-analytical.svg`, `life-explanatory.svg`, `life-presentation.svg`: each has 64 observations per country and identical x/y domains (1960–2023, 60–90 years). The presentation uses a different aspect ratio, not a different value range.
- `life-bars.svg`, `life-dots.svg`, `life-truncated-bars.svg`: same 2023 values. The truncated bars are an explicitly labeled teaching counterexample.
- `life-eight-countries.svg`, `life-three-selected.svg`: same time domain and 30–90-year y domain. Three-country selection disclosed on slide.
- `life-neutral.svg`, `life-emphasis.svg`: all observations and scales retained, stroke emphasis changes.
- `linear-log-scales.svg`: scale geometry schematic, **not observational data**.
- `nasa-monthly-line.svg`: 1880–2022, 1716 monthly records, no interpolation or synthetic data.

`nasa-climate-spiral-2022.png` is an unaltered video frame at 46.5 seconds with the 2022 label visible, extracted using ffmpeg:

```sh
ffmpeg -ss 46.5 -i nasa-climate-spiral.mp4 -frames:v 1 nasa-climate-spiral-2022.png
```

The original NASA video provides user-controlled offline playback in HTML; its labeled PNG is the PDF fallback. The recording has no spoken narration, so the adjacent reading guide explains the encoding. No image-generation service is used and no synthetic image is presented as a publisher original.

## Additional reading and method references

- Financial Times coronavirus chart methods: https://ig.ft.com/coronavirus-chart/ . Only methodological attribution/link; no FT artwork reproduced.
- Warming stripes source / reading guide: https://www.reading.ac.uk/planet/climate-resources/climate-stripes . CC BY discussion by Reading Open Research: https://blogs.reading.ac.uk/open-research/ . No exact year range attributed to the undated source image.
- BBC coverage, 2021: https://www.bbc.com/news/uk-wales-59050953 . Contextual link only; no BBC screenshot.
- NASA primary resource: https://science.nasa.gov/resource/video-climate-spiral-1880-2022/ . Educational slow reveal: https://svs.gsfc.nasa.gov/5383/ . The slide's original video is 5057, not the slow-reveal asset.
- OWID biomass source: https://ourworldindata.org/biodiversity . Primary study: https://doi.org/10.1073/pnas.1711842115 . Use the historical 2015 figure, not the newer estimate linked from the page.
- Reuters Drowning in Plastic: https://graphics.reuters.com/ENVIRONMENT-PLASTIC/0100B275155/index.html . Optional further reading only; no image or numeric claim reused.

## Material status

No unresolved source or production placeholders. No edits to old_slides. No shared-theme changes. Notes provide activity answers and evidence limitations. Build and visual QA are recorded in `../../../design/09-design-choices-tradeoffs-qa.md`.

## Previous-semester images in the 32-slide rebuild

Source package: `slides_previous_semester/06_Tradeoffs_in_design.pptx`. Files below are byte-for-byte extractions from `ppt/media/`, with no redrawing, relabeling, or data substitution. Original artwork rights remain with their creators. The instructor supplied this deck and explicitly authorized reusing its images; this record does not claim the old images are all CC BY. Old slide numbers count from the title slide as page 1.

### holmes-diamonds-comparison.png

- Old slide: 4; PPTX media: `ppt/media/image28.png`.
- Credit: Nigel Holmes / TIME; plain comparison author not identified in the supplied deck.
- SHA-256: `5992a8fb652b9ca9fe65e793047350d361f25a38a2bc067b59d43489030b4d9a`

### mta-geographic-and-diagram.png

- Old slide: 7; PPTX media: `ppt/media/image13.png`.
- Credit: MTA citywide geographic map and subway diagram.
- SHA-256: `2d0f072a2d90d3043d4a01af13d638ae7450ce08ed31400ba9f182fe4981fd4c`

### wsj-football-injuries.png

- Old slide: 16; PPTX media: `ppt/media/image30.png`.
- Credit: The Wall Street Journal, Bumps, Bruises and Breaks; SimpleTherapy / iStock.
- SHA-256: `3d5e7902bee7640a7c4b8b880f971a4cd0a8e722746a9b9f3f231e1b18f05ef1`

### nfl-injuries-2013-bars.png

- Old slide: 16; PPTX media: `ppt/media/image23.png`, from `slides_previous_semester/06_Tradeoffs_in_design.pptx`.
- Extracted byte for byte at the instructor’s request and paired with the unchanged `wsj-football-injuries.png` on current slide 8, “What is a good visualization design?”.
- Original title: NFL Injuries in 2013. Bar-chart author unidentified in the supplied material. Injury counts correspond to the SimpleTherapy / WSJ graphic, but this chart omits the Arm category (9). Do not claim the visible category sets are identical or infer injury rates.
- Dimensions: 1276 × 1038. SHA-256: `847630f1a903e4e212eea649623bc500a27e53a8bfbc5b66bb82a65dcb69ea9f`.
- Preserve the complete chart, category labels and values. No general open licence is asserted; reuse is of the instructor-supplied teaching reference.

### cairo-visualization-wheel.png

- Old slide: 18; PPTX media: `ppt/media/image4.png`.
- Credit: Alberto Cairo, The Functional Art, Chapter 3.
- SHA-256: `676c17f0827c304b8588cd91c94245000c9c3ff3c80e1f725e8f8a95ada5415c`

### holmes-monstrous-costs-comparison.png

- Old slide: 21; PPTX media: `ppt/media/image11.png`.
- Credit: Nigel Holmes, Monstrous Costs, with plain counterpart; discussed by Bateman et al. (2010).
- SHA-256: `40640fd7b3bdcd9c81be85bfe6010df833eda02b16e0d27efbf24862647de2d6`

### poppy-field-historical.png

- Old slide: 24; PPTX media: `ppt/media/image22.png`.
- Credit: Valentina D’Efilippo, Poppy Field; interactive version coded by Nicolas Pigelet. Source data: The Polynational War Memorial. Historical graphic covers 1899–2014.
- SHA-256: `95c1932aacaead19b16a4941394131bb3f3430c03fd084687d5e771dec943703`

### isotype-home-factory-weaving.png

- Old slide: 35; PPTX media: `ppt/media/image37.png`.
- Credit: Isotype, Home and Factory Weaving in England, in Modern Man in the Making (1939). Historical image credited to the Isotype tradition; collection context from the University of Reading.
- SHA-256: `59c5f6a02014a1dd1ad7717e89b43d20d744d3f7b42a975e92e4ac19c07b7405`

## Primary references for the rebuilt narrative

- Cairo, *The Functional Art*: https://www.peachpit.com/store/functional-art-an-introduction-to-information-graphics-9780321834737 . Publisher lists August 22, 2012 publication and 2013 copyright. Author’s chapter excerpt on Wheel/audience: https://www.peachpit.com/articles/article.aspx?p=1945331&seqNum=3 . The six pairs are qualitative lenses, not calibrated performance scores. Novelty/Redundancy concerns new information versus repetition/explanation; Originality/Familiarity concerns form.
- Tufte, *The Visual Display of Quantitative Information*: https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/ . First edition 1983. Data-ink is a design heuristic; dense information and restrained treatment can coexist.
- Bateman et al., CHI 2010, *Useful Junk?*: https://vis.csail.mit.edu/classes/6.859/readings/pdfs/Bateman-UsefulJunk.pdf . 20 participants, 14 graphics including 2 training charts; delayed group of 10 assessed 2–3 weeks later. No significant immediate interpretation-accuracy difference; better delayed recall for embellished charts. Viewing time was not fixed. Do not generalize to all decoration, accuracy or speed.
- MTA: https://www.mta.info/projects/subway-map-customer-information-pilot . The geographical map and diagram preserve different spatial properties. The supplied screenshot is historical and is not a current journey planner.
- WSJ: https://www.wsj.com/articles/SB10001424052702303277704579344753369526502 . Use the supplied graphic to discuss photographic location plus abstract counts, not injury rates or medical risks.
- Poppy Field: https://www.poppyfield.org/ . Author credits and reading guide confirm start/end year, flower size and region mapping; the supplied image’s duration axis doubles 1–64 years. Source authors note incomplete, evolving data. This historical snapshot is a design example, not an up-to-date or exhaustive account of conflict deaths. Do not infer exact fatality values from unlabelled flower sizes.
- Norman: https://jnd.org/emotion-design-attractive-things-work-better/ . Essay originally published in *Interactions* (2002). “Zen of Design” is a course synthesis title, not a framework formally named by Norman.
- Isotype: https://isotyperevisited.org/2012/08/introduction.php and https://isotyperevisited.org/1975/01/the-significance-of-isotype.php . Historical context and consistency principles. The weaving graphic’s own legend gives 10,000 weavers per person and 50 million pounds of production per blue symbol. Its year intervals are unequal; pounds denote weight.

The older FT/BBC/Reuters references and unused critique assets above are retained for the planned Lecture 10 handoff. Their retention does not imply a corresponding Lecture 9 slide.

## Weather comparison inserted on 2026-09-27

New Lecture 9 slide 6 uses the two images explicitly requested by the instructor from previous-semester Lecture 06, slide 6. Both are extracted byte for byte, with all existing Alamy watermarks, source imprints and borders retained. The request authorizes reuse of these supplied images; no general open licence or unknown photographer credit is asserted. The pair illustrates representation styles and depicts different weather situations. Added colours and map boundaries mean the cloud image also contains abstraction.

- `weather-realism-clouds.png`: `slides_previous_semester/06_Tradeoffs_in_design.pptx`, slide 6, `ppt/media/image12.png`. Visible credit: The Weather Channel / Alamy, image ID ARWRE4. SHA-256: `b6017895febf53ba9f2123ddfec34e1a073e566e4b86df977542041a45c4755a`.
- `weather-abstraction-pressure-fronts.png`: `slides_previous_semester/06_Tradeoffs_in_design.pptx`, slide 6, `ppt/media/image8.png`. Visible credit: Alamy, image ID E6D6ET. SHA-256: `e92480dbedc3e82c81eabb3ebefa55e7007c3042555850bc26dd57389f67ed48`.

## Design dimensions and tradeoffs revision · 2026-09-27

The 35-slide revision reuses all existing media and datasets. Two broad style dimensions replace the former four-philosophy framing. Historical examples illustrate different evaluation priorities rather than a universal succession of styles. The Wheel supports qualitative discussion of benefits and costs for a reader/task/context; no scores or objectively optimal midpoint are asserted.

- Alberto Cairo, *The Functional Art*, official chapter excerpt: https://www.peachpit.com/articles/article.aspx?p=1945331 . Used to connect visual treatment with presenting information and supporting exploration. Existing six Wheel pairs remain unchanged.
- Michael Twyman, *The significance of Isotype*, University of Reading, Isotype Revisited: https://isotyperevisited.org/1975/01/the-significance-of-isotype.php . Supports pictorial communication, repeated fixed-unit symbols, the development of consistent conventions, cross-chart comparisons, and information transformation for a public audience.
- Isotype Revisited introduction: https://isotyperevisited.org/2012/08/introduction.php . Historical context and collaboration. The Isotype example is a historical synthesis, not the chronological end of visualization design.

Slide 33 discusses observable limitations of the supplied weaving graphic as course analysis: symbols represent specified units; repeated quantities occupy space; the selected years have unequal intervals despite the row layout. No exact original totals, new measurements of reading performance, or unverified rounding errors are claimed. In this example, each worker denotes 10,000 weavers, and each blue production symbol denotes 50 million pounds of output (weight, not currency). A fixed unit applies within the relevant symbol family; different charts may require different explicitly labelled units.


## Introductory style comparison inserted · 2026-09-27

New slide 4 reuses the complete, unchanged `holmes-diamonds-comparison.png` from the former slide 5. The layout follows the former slide 6 weather comparison, with parallel definitions above the evidence. Decoration remains on the left and Minimalism on the right to match the original image. No new asset, crop, reconstruction, or dataset is introduced. Subsequent slides shift by one. Original extraction details and attribution remain as recorded above.

## Four-image style gallery · 2026-09-27

Slide 3 uses the four instructor-selected images in a two-by-two gallery. Each row is a separate example; the four images are not representations of one shared dataset. All files are copied or extracted byte for byte, without cropping or redrawing.

- `bassner-exercise-performance-original.png`: copy of `slides/08-scientific-visualization-part2/assets/bassner-2026-figure3-performance.png`. Bassner et al. (2026), original Figure 3 exercise-performance panel. Paper: https://doi.org/10.1016/j.caeai.2025.100537 ; CC BY 4.0. SHA-256: `97dcd8f3830aa9d6da14351b479a06669b29232ef37293e5ca423d398f30d310`.
- `exercise-performance-frequencies.svg`: copy of `slides/08-scientific-visualization-part2/assets/ai-programming-performanceFigure.svg`. Course frequency redraw from the same retained 275-participant sample; original group ordering differs. Source record: https://doi.org/10.5281/zenodo.20285307 ; CC BY 4.0. Processing and validation: `slides/08-scientific-visualization-part2/assets/ai-programming-provenance.md`. SHA-256: `70900cb761a82adbd871110f44a71f48559423285313644b572d6da7964b52f0`.
- `bloomberg-china-debt-risk-map.jpg`: exact extraction of `ppt/media/image36.jpg` from the instructor-provided `slides_previous_semester/06_Tradeoffs_in_design.pptx`, slide 28, left picture. Original credit and data note: Bloomberg calculations based on provincial government budget reports. Historical snapshot, not a current statistic. SHA-256: `34e773cef212c26f4f8f189e7cb5216f038136b22c6bf67da9d5e44c34198736`.
- `china-debt-risk-schematic-map.png`: exact extraction of `ppt/media/image33.png` from the same supplied PPTX, slide 29, left picture. Credit printed in image: 神奇海螺试验场; source link supplied with the image: https://lab.magiconch.com/ . The title, color legend, labels and source imprint remain intact. SHA-256: `1378e3304919602b707c6a18be9ba66ea84d4ff3c294f9486843c6fe51ed7a15`.

The map pair illustrates geographic versus schematic representation. Its precise numerical and categorical equivalence has not been independently established, so the teaching notes restrict the comparison to visual form. The user's requested reuse of these two historical graphics does not establish an open license; original artwork rights remain with their creators. Visible citations name original authors and data sources, with no old-lecture provenance added to slide footers.


## Single exercise-performance image · 2026-09-27

Slide 3 now uses the instructor-supplied `exercise-performance.png` as one complete image, replacing the four-image gallery. It combines the original Bassner et al. exercise-performance panel and the course frequency redraw. The file is displayed unchanged with its original aspect ratio; original paper and data citations remain visible. No map appears on this slide. Earlier gallery files are retained in assets.

- SHA-256: `0006e1ef5b8a0e71e6fb0de5b904d78d2cb53dafc4541c6fa911a709ac63781e`.


## Single debt-risk image · 2026-09-27

New slide 4 uses the instructor-supplied `debt-risk.png` as one complete image, with the same title and layout as slide 3. It combines the Bloomberg geographic debt-risk map and the schematic map credited to 神奇海螺试验场. The file is displayed unchanged with its original aspect ratio; embedded legends and credits remain intact. Teaching notes retain the historical scope and do not claim independently verified numerical equivalence.

- SHA-256: `c99e030e0466f8a505e64c5fa589d6a296adb66049841bbd481a8d4f330e83db`.


## News graphics and minimalism expansion · 2026-09-27

Seven images are extracted byte for byte from the instructor-supplied `slides_previous_semester/06_Tradeoffs_in_design.pptx`, as explicitly requested. No redrawing, cropping, relabeling or new data is introduced. Original artwork rights remain with their creators; no open licence is asserted. Source and attribution limits are recorded below rather than silently assigning an author.

### holmes-steelworker-employment-costs.png

- Reference: slide 9, `ppt/media/image38.png`. Dimensions: 1162 × 1552.
- SHA-256: `1cd1b44a85c45f4b54ebabdc6f0dd42d0d295bdf641a6f175648219660ddbfb9`.
- Credit / use boundary: Nigel Holmes / TIME. Data credit in the image: World Steel Dynamics, first nine months of 1982, including benefits. Used as an illustration of historical news design, not current labour costs.

### decorative-perspective-life-expectancy.png

- Reference: slide 9, `ppt/media/image9.png`. Dimensions: 1024 × 768.
- SHA-256: `2f8d650c17cfd2b1ccb75b8b732716098447131aa1dabf335cd1e8c74391823b`.
- Credit / use boundary: Creator and statistical source unidentified in the supplied material. Instructor-authorized reference image. Used only to analyze texture, shadow, perspective and comparison difficulty, not to assert the displayed life-expectancy estimates.

### data-ink-unemployment-comparison.png

- Reference: slide 10, `ppt/media/image27.png`. Dimensions: 1178 × 702.
- SHA-256: `a466966061115ed35e119b5544906a4ce5e17bc15382e9d2fc5a4891966c7c37`.
- Credit / use boundary: Creator, observation dates and statistical source unidentified in the supplied material. Instructor-authorized teaching comparison illustrating Tufte’s data-ink principle; no measured pixel ratio or claim that the right graphic improves performance.

### tufte-fuel-economy-lie-factor.png

- Reference: slide 11, `ppt/media/image34.png`. Dimensions: 2048 × 994.
- SHA-256: `48825c7e91150ecb55a05ab7803aac67de1aeed2d68aa55a8e0c8365e2689af4`.
- Credit / use boundary: Original: The New York Times, August 9, 1978, p. D-2. Analysis/measurement annotations: Edward Tufte, The Visual Display of Quantitative Information, pp. 57–58. Relative length change 783.3%, relative data change 52.8%, lie factor 14.8421, rounded to 14.8.

### sparklines-exchange-rate-layout.png

- Reference: slide 12, `ppt/media/image2.png`. Dimensions: 1100 × 291.
- SHA-256: `40d912a999e51de43938a944934a6c672a2c56433aeaa283bcf040ea5e623e43`.
- Credit / use boundary: Layout follows Edward Tufte’s exchange-rate sparkline example. The supplied variant shows dates 2015.1.1 and 2021.4.30 with an inconsistent 65 months header; who changed the dates and the underlying series version are unidentified. Preserve the requested image, treat it as a layout example only, and do not claim the time span or prices are verified. Concept source: https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ .

### minimalism-qualitative-curves.png

- Reference: slide 13, `ppt/media/image10.png`. Dimensions: 2048 × 1183.
- SHA-256: `53e72ebace6d30a81f15756546da6337da6b9a29816340118a4d8db6d16b50e4`.
- Credit / use boundary: Creator, subject, series identities and any data source unidentified in the supplied material. Instructor-authorized schematic example. Analyze sparse color/shape and repeated layout only; do not invent quantitative axes, series meanings or a measured 2020–2024 change.

### chatgpt-topic-shares-mosaic.png

- Reference: slide 14, `ppt/media/image24.png`. Dimensions: 1194 × 758.
- SHA-256: `c312c89a56542b1df802eff92279dc898bed3d64de005823abdafcc16b91dec3`.
- Credit / use boundary: Chatterji et al. (2025), How People Use ChatGPT, Figure 9. https://www.nber.org/papers/w34255 . Original figure and full caption retained. Variable-width stacked/mosaic chart: coarse shares in widths, detailed overall shares in segment areas. Historical sample May 15, 2024–June 26, 2025, with weighting described in the image; not current usage figures.

Primary textual references checked September 27, 2026:

- TIME publisher letter, February 11, 1980: https://time.com/archive/6883304/a-letter-from-the-publisher-feb-11-1980/ . Contemporary account of Holmes’s illustrated charts and reader engagement.
- Tufte, The Visual Display of Quantitative Information, pp. 57–58 (lie factor) and data-ink discussion: https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/ . The annotated original-book excerpt confirms the 18/27.5 and 0.6/5.3 example. Both measures are diagnostics with limits, not overall quality scores.
- ONS current Chart elements guidance: https://service-manual.ons.gov.uk/data-visualisation/build-specifications/chart-elements . Retains useful gridlines and direct labels while excluding decorative borders/backgrounds. Used as evidence of continued influence, not a survey of aesthetic preferences.
- Tufte’s Sparkline theory and practice: https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/ . Compact trend lines gain context from adjacent words and numeric references.


## Traditional and minimalist bars — added 2026-09-27

- File: `traditional-and-minimalist-bars.png`
- Instructor-supplied original: `slides_previous_semester/06_Tradeoffs_in_design.pptx`, slide 15, `ppt/media/image17.png`; byte-for-byte extraction, no crop or redraw.
- SHA-256: `0a94299a9d8f14043f8a97a4bf2724613fd08fa0e7419d26ebe31281aca14920`
- Depicts the traditional and maximized-data-ink bar-chart styles associated with Tufte. Used as a historical style comparison, not as independently sourced substantive data.
- Study: Ohad Inbar, Noam Tractinsky, Joachim Meyer (2007), *Minimalism in information visualization: Attitudes towards maximizing the data-ink ratio*. https://doi.org/10.1145/1362550.1362587 . Primary university abstract: https://www.bgu.ac.il/en/researcher/noam-tractinsky/publications/39002191/ .
- The 87-student study measured preference. Familiarity is a possible explanation; faster or more accurate comprehension was not established. The requested slide headings retain the instructor’s wording, with this research boundary documented in speaker notes.


## Wheel, audience and Isotype insertion · 2026-09-27
Instructor requested all reference slides 18–36 after current slide 23. Fourteen additional bitmaps below are byte-for-byte extracts from `slides_previous_semester/06_Tradeoffs_in_design.pptx`. Existing Wheel, Monstrous Costs, Poppy Field and Isotype images are reused. User-supplied artwork is retained intact; no additional open licence is asserted unless specified.

### us-geographic-election-map.png

- Reference: slide 20, `ppt/media/image18.png`.
- SHA-256: `193a43ee6b44e18d4669b60d48a8c906dce35c230cc6822a2fd6ad5fe06e22f3`.
- Credit / use boundary: U.S. election map. Original creator/year not identified in supplied material; analyze geographic recognition, not election results.

### us-square-election-cartogram.png

- Reference: slide 20, `ppt/media/image19.png`.
- SHA-256: `c4e387f3ea1ac2c90954939af26df9f184852b2c1b6d74a7ec325bb4e2deefe0`.
- Credit / use boundary: U.S. rectangular cartogram. Original creator/year/size variable not identified; no claim of identical data with the geographic map.

### long-run-gdp-and-inventions.png

- Reference: slide 22, `ppt/media/image16.png`.
- SHA-256: `0c7b7088b6c2e92b793c9e45696a751cdba206d246c3097a761e736ef7d55e90`.
- Credit / use boundary: Long-run GDP illustration, creator unverified. Logarithmic axes and historical dates retained; compare design density, not causes or economic values.

### us-real-gdp-1990-2015.png

- Reference: slide 22, `ppt/media/image14.png`.
- SHA-256: `19209bf2956e138d1c56f216debadf30eea96f40390b4ab4da52cfb720b0497e`.
- Credit / use boundary: Historical real U.S. GDP, constant 2009 dollars, 1990–2015. Original creator unverified; not current economic evidence.

### urban-land-population-gdp-panels.png

- Reference: slide 23, `ppt/media/image21.png`.
- SHA-256: `be7ba7c571a30dde7671830f255a2085f4b1ccc7cdb74bad8adfb459b1e28f79`.
- Credit / use boundary: Mahtta et al. (2022), Urban land expansion: the role of population and economic growth for 300+ cities. https://doi.org/10.1038/s42949-022-00048-y . 363 cities, 2000–2014; no causal inference from the scatterplots.

### three-year-pie-charts.png

- Reference: slide 24, `ppt/media/image15.png`.
- SHA-256: `27dcdc7cca64f4bd9aa6480493396543c2807224970f17321bba7e97da17d623`.
- Credit / use boundary: Teaching comparison, 2015–2017, categories A–E. Original creator/data unspecified. Original red bad annotation retained; familiar form is not necessarily suitable.

### annotated-apple-candlestick.png

- Reference: slide 25, `ppt/media/image25.png`.
- SHA-256: `83c436cece3aa00a88ee9cb074edaa42f5b9571ebcdeff299d4e31016cbb44f2`.
- Credit / use boundary: TradingView imprint retained. Original annotation creator unspecified. Historical screenshot used for communication design only.

### bloomberg-debt-risk-map.jpg

- Reference: slide 28, `ppt/media/image36.jpg`.
- SHA-256: `34e773cef212c26f4f8f189e7cb5216f038136b22c6bf67da9d5e44c34198736`.
- Credit / use boundary: Bloomberg historical Growing Debt Risks map. Original legend, source note and statistical limitations retained.

### schematic-debt-risk-map.png

- Reference: slide 29, `ppt/media/image33.png`.
- SHA-256: `1378e3304919602b707c6a18be9ba66ea84d4ff3c294f9486843c6fe51ed7a15`.
- Credit / use boundary: 神奇海螺试验场 https://lab.magiconch.com/ . Historical design comparison; equivalence of source data/thresholds with the Bloomberg map not independently verified.

### cairo-two-design-tastes.png

- Reference: slide 30, `ppt/media/image20.png`.
- SHA-256: `0e0553bc99f99e36016faf62177b8eaff74dbce1d0ede7e18f73c70a6694b05d`.
- Credit / use boundary: Alberto Cairo, The Functional Art, Ch. 3. Profession labels are illustrative rhetorical categories, not demographic findings.

### familial-neuropsychiatric-relations.png

- Reference: slide 32, `ppt/media/image31.png`.
- SHA-256: `83dff0f42e72beaac39667a5b583f9633eb14848b62e0bb4951362d00ecf785e`.
- Credit / use boundary: Campbell & Wang (2012), Familial Linkage between Neuropsychiatric Disorders and Intellectual Interests, Figure 1, CC BY. https://doi.org/10.1371/journal.pone.0030405 . Heatmap brightness encodes adjusted chi-square p-values; dendrogram uses correlations. Not illness severity or causality.

### cairo-games-and-toys.png

- Reference: slide 33, `ppt/media/image35.png`.
- SHA-256: `75258babaee60def1e2070ac75401474fa069e1153121360014256ccf896f440`.
- Credit / use boundary: Alberto Cairo, The Functional Art, Figure 4.1. Fictional company and illustrative data; the book uses it to discuss limited exploration, not empirically established public readability.

### vgg16-architecture.png

- Reference: slide 36, `ppt/media/image26.png`.
- SHA-256: `836c7ac320d537d73619142dd6a620add544ff8963ac851fc57fbb2894b96aa5`.
- Credit / use boundary: Architecture: Simonyan & Zisserman (2014), https://www.robots.ox.ac.uk/~vgg/research/very_deep/ . Supplied diagram illustrator unspecified. Compare consistent layer shapes/colors, not fixed population-like units or an asserted Isotype lineage.

### population-cartogram-2011.png

- Reference: slide 36, `ppt/media/image32.png`.
- SHA-256: `e4105aa1fea5137e24e0ac996cadc8ddc80f76a174f23915515390b3fa1709a9`.
- Credit / use boundary: The Shape of Seven Billion, National Geographic (January 2011). John Tomanio / NGM staff; cartogram XNR Productions and John Tomanio; UN data. Two million people per dot, 1960 vs projected 2011. Historical projection, not current estimate. Publication scan: https://warwick.ac.uk/fac/arts/history/students/modules/hi31v/syllabus/week4/kunzig-natgeo-2011.pdf .

### cairo-wheel-comparison-profiles.svg

- Reference: slide 27. Original `image4.png` Wheel embedded intact, with 2 original PPTX freeform path(s) transcribed into image coordinates, retaining stroke colors and widths.
- SHA-256: `4b8561f905722f2ae2709260f472bbd4819798ba9c2d6af4eb0cc1e0bbcf3772`.
- No numeric scores were inferred. Geometry preserves the instructor-supplied qualitative illustration, not a measurement of chart quality. Wheel credit: Alberto Cairo, The Functional Art, Ch. 3.

### cairo-wheel-geographic-profile.svg

- Reference: slide 28. Original `image4.png` Wheel embedded intact, with 1 original PPTX freeform path(s) transcribed into image coordinates, retaining stroke colors and widths.
- SHA-256: `3f6d10c65197510568093eca40146bbd15709cc0f3c4fc53e56f67994e48c742`.
- No numeric scores were inferred. Geometry preserves the instructor-supplied qualitative illustration, not a measurement of chart quality. Wheel credit: Alberto Cairo, The Functional Art, Ch. 3.

### cairo-wheel-schematic-profile.svg

- Reference: slide 29. Original `image4.png` Wheel embedded intact, with 1 original PPTX freeform path(s) transcribed into image coordinates, retaining stroke colors and widths.
- SHA-256: `8978680fd1b4c42183bffac620202d7eba8b16339be00a8ef8eea9301eb70f37`.
- No numeric scores were inferred. Geometry preserves the instructor-supplied qualitative illustration, not a measurement of chart quality. Wheel credit: Alberto Cairo, The Functional Art, Ch. 3.

Text references: Cairo, https://www.peachpit.com/store/functional-art-an-introduction-to-information-graphics-9780321834737 ; Don Norman, Emotion & Design (2002), https://jnd.org/emotion-design-attractive-things-work-better/ ; University of Reading, https://isotyperevisited.org/ .
