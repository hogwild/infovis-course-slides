# Data sources and preparation

- Boundary and attribute source: Natural Earth, Admin 0 countries, 1:110m, repository release tag **v5.1.2**.
- Exact source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_110m_admin_0_countries.geojson
- Dataset description: https://www.naturalearthdata.com/downloads/110m-cultural-vectors/110m-admin-0-countries/
- License: public domain. https://www.naturalearthdata.com/about/terms-of-use/
- Retrieved: 2026-11-03. Raw download SHA-256: `6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f`.

## Interpretation

These are **legacy income categories shipped with Natural Earth v5.1.2**, not current World Bank income classifications. The source does not supply an income-classification observation year. POP_YEAR/GDP_YEAR must not be used as the year of INCOME_GRP. The release tag identifies this reproducible snapshot, not the year of the economic observation. Use this dataset to practise coding, not to make a present-day economic claim.

The 177 features are the map units included at this scale, not an exhaustive list of sovereign states. Boundaries follow Natural Earth's default representation. Retain this limitation when sharing.

## Transformations

- Keep every feature and its geometry. Normalize polygon winding for D3's spherical convention where necessary; no boundary coordinates are invented.
- Rename ADM0_A3 to code and NAME to name. `code` is a Natural Earth identifier, not guaranteed to be an ISO code.
- Merge `1. High income: OECD` and `2. High income: nonOECD` into `High income`. Other labels lose their numeric prefixes. This produces four ordered income categories without encoding OECD membership as a fifth income tier.
- Antarctica (ATA) receives a null/blank classroom income value: this economic classification is not applicable. The source's original value is retained in CSV column source_income_group. The UI explicitly labels Antarctica as not applicable; it is not evidence of a missing country join.
- world-income.geojson embeds the normalized income_group. world.geojson contains only code/name properties; income.csv carries the attributes separately.
- 177 unique codes in each file, zero unmatched records, 176 classified features, one not-applicable value.
- No fabricated income values, random omissions, synthetic country names or inferred classifications.

D3 7.9.0 is bundled under its ISC license in ../lib/LICENSE-D3.

## Portugal–Spain TopoJSON teaching example

`portugal-spain.topojson` is derived from the same Natural Earth v5.1.2 PRT and ESP Polygon boundaries in `world.geojson`. Arc 0 is their shared border (19 positions, 18 segments); arcs 1 and 2 hold the remaining Portugal and Spain boundaries. Portugal references `[0, 1]`; Spain references `[-1, 2]`. Negative reference -1 means arc 0 reversed (index = ~reference). Coordinates are unquantized absolute longitude/latitude, so no transform or delta encoding is used. Expanding these arcs preserves every original directed ring edge. No new source data or runtime library is introduced.
