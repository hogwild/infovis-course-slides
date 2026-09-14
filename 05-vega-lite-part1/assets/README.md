# Lecture 05 assets

- `cars.json`: 406 Cars records from Vega Datasets, originally StatLib Cars.
- Data provenance / permissions: https://github.com/vega/vega-datasets/blob/main/datapackage.json . Cars metadata permits educational/scientific use; the repository-wide BSD license should not be substituted for that dataset-specific statement.
- `vega.min.js`: Vega 6.4.0, BSD-3-Clause; copied from the already bundled Lecture 06 runtime.
- `vega-lite.min.js`: Vega-Lite 6.4.3, BSD-3-Clause; copied from the already bundled Lecture 06 runtime.
- Upstream runtime projects: https://github.com/vega/vega and https://github.com/vega/vega-lite . Copyright notices and redistribution terms are in `THIRD-PARTY-LICENSES.txt`.
- `*.vl.json`: standalone examples containing the complete Cars dataset and common projection styling. Paste into Vega Editor or another environment to run without a relative data URL.
- Chart SVGs with a corresponding `.vl.json` are actual outputs from that specification. Their data, encoding, aggregation, binning and sorting match the code on the slides.
- `mark-*-glyph.svg`: original schematic drawings for the mark vocabulary table. These illustrate graphical forms, with no numerical data, axes, or statistical claims.
- `cars-scatter-size.*` and `cars-scatter-shape.*`: additional runnable examples linked from the channel vocabulary table.
- The remaining original assets are retained as previous-course source material and are not used by this revision.

Authoritative compact definitions: `../examples.json`. The compact definitions and displayed slide code use `data/cars.json`, which Vega Editor resolves. The rendering helper reads the local `assets/cars.json` and embeds its records in the portable examples; no local `data/` directory is required. Regenerate SVGs and portable JSON with `node slides/05-vega-lite-part1/render-examples.mjs` from the repository root. Edit the Marp source directly when revising slide copy; do not edit built outputs.

Course syntax convention: `mark` selects the graphical primitive. Explicit channel definitions belong in `encoding`: use `value` for fixed visual values and `field`/`type` for data mappings. Common projection defaults in `config` are separate from the example-specific declarations.
