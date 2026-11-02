# Task-based map selection: source and interpretation notes

Slides 10–13 use five unchanged PNG files from the instructor-supplied `slides_previous_semester/08_Geomaps.pptx`, following the requested reference pages 9, 10, 12, and 13 in order. No images were cropped, redrawn, recolored, or upscaled. The SVG and data assets used elsewhere are unaffected.

| Local asset | Provenance | Dimensions | SHA-256 |
| --- | --- | --- | --- |
| `task-chocolate-sales-bars.png` | Reference slide 9, `ppt/media/image46.png` | 2048 × 1783 | `120196185b23b893e85cc88fb1f7a5826ffb7746dcb928a5173a93218101d7d5` |
| `task-chocolate-sales-map.png` | Reference slide 9, `ppt/media/image52.png` | 1496 × 2048 | `0bc89c374faca3efc841e0ec84519907a1255e05df5c848b802cda9840e395e8` |
| `task-citibike-subway-proximity.png` | Reference slide 10, `ppt/media/image54.png` | 1631 × 2048 | `194a7803ad3964f140aad3bbca82bb34da568f2e3864ee24ea67402c0a082927` |
| `task-bank-presence-map.png` | Reference slide 12, `ppt/media/image48.png` | 1222 × 2048 | `574ca1326fe2c86a87bca768a29cc1f0eb00e3f160c76ec49a4fc903112a4d3d` |
| `task-bank-presence-matrix.png` | Reference slide 13, `ppt/media/image3.png` | 600 × 739 | `68479dc2d506d01631347ade2255e40883853f0e7b57050989de613aed717306` |

## Colorado sales: bars versus map

The reference identifies the data as chocolate sales in cities in Colorado. It does not supply the original author, underlying data file, period, or symbol-size calibration. A targeted source search did not establish those details. The images are reused as the instructor's illustrative encoding comparison, with no invented values, measurements, brand, or date. The bar chart ranks city totals, not time points. The map retains spatial position. Slide 10 focuses on comparing values with a bar chart and observing spatial relationships with a map.

## Citi Bike drop-offs and subway stations

The original screenshot includes blue bike-drop-point circles, red subway symbols, and a size key. Its creator, data interval, and selection procedure are not supplied or independently established. Do not attribute it to NYC DOT, MTA, Tableau, or a named researcher without evidence. The slide uses it to explain why proximity is spatial, not to assert an observed correlation or a quantified share of transfers. Trip purpose is not established, so the revised prose says drop-offs instead of identifying all riders as commuters. The visible text asks about proximity, identifies the two point layers, and explains how their shared geographic reference supports exploring spatial relationships. It omits the distance-calculation paragraph.

## Historical bank map and matrix

- Original graphic authors: Alan Smith and Laura Noonan, Financial Times. Original data credit: FT research. These credits appear on the supplied matrix and are retained visibly.
- Original discussion: Alan Smith, “A love of maps should mean using fewer to illustrate data better,” Financial Times, October 20, 2016: https://www.ft.com/content/de3ef722-9514-11e6-a1dc-bdf38d484582 . The page title is accessible; article text is subscription-restricted.
- The Financial Times' public syndicated article on BBVA, dated October 26, 2016, provides the author's explanation and corroborates the mapping-versus-grid narrative: https://www.bbva.com/en/love-maps-mean-using-fewer-illustrate-data-better/ . It explains that London was added to eight challenger cities as a reference. There are nine displayed cities, not eight in total.
- The reference deck also links https://www.banken.nl/nieuws/8324/duitsland-overweegt-wetsaanpassing-voor-aantrekken-uk-bankiers . Retrieval did not succeed in this session; the original FT and syndicated explanation provide stronger attribution.
- Both images show ten banking groups. The cells encode the highest level of presence (Bank, Branch, Other), not revenue, staffing, branch count, or current banking status. Preserve the two qualifications printed below the matrix. Blank cells do not establish zero assets or zero business activity.
- The Frankfurt/London/Lisbon comparison uses the displayed categories: London has ten red Bank entries; Frankfurt has seven red Bank entries and three orange Branch entries (UBS, Barclays, Bank of America); Lisbon has four orange Branch entries (Deutsche Bank, Credit Suisse, Citi, Barclays) and six blank cells. These directly counted entries explain the visual similarity of banking profiles, not a comprehensive financial-industry similarity score or a forecast about which city replaced London after Brexit.
- Reuse is from the instructor-provided teaching reference. No general open license is asserted.

## Reproduction

The extraction and insertion script is stored in the existing task directory as `tmp/add-map-task-pages.py`. Source-image byte identity is verified against the PPTX ZIP entries. The four pages precede Part 02; the deck now has 46 slides.
