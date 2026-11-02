# Spatial-data modeling figures

Run `node slides/16-maps-geospatial-data/render-modeling-assets.cjs` from the repository root to regenerate the five SVGs. The script resolves every input relative to its own location and uses the local D3 and TopoJSON libraries.

- `spatial-field-material.svg`: original conceptual illustration of a scalar field on a material sample. It does not contain observed measurements or represent a real experiment.
- `us-states-albers-10m.json`: unchanged us-atlas v3 geometry, copied from the verified Lecture 11 asset. Original: https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json . Simplified 2017 U.S. Census cartographic boundaries in Albers USA coordinates. Michael Bostock's ISC license is retained in `us-atlas-LICENSE.txt`.
- `spatial-object-state-shapes.svg`: selects Arizona, California, Nevada, Oregon, and Utah from that geometry. Each filled path is a state; the California highlight is categorical emphasis, not a statistic. The figure preserves the source projection and uniformly fits the selected states to the canvas.
- `citibike-start-stations-202004.json`: 51 distinct start station IDs, names, longitudes, and latitudes from `reference/citibike_storytelling_example/citibike_april.csv`. All repeated names and coordinate pairs agree within each station ID. This is the set of observed trip origins, not an inventory of every operating station.
- Original station data: Citi Bike / Lyft, https://citibikenyc.com/system-data and https://s3.amazonaws.com/tripdata/JC-202004-citibike-tripdata.csv.zip . The repository's existing provenance and byte/record verification are recorded in `slides/14-web-foundations-for-visualization/assets/citibike-demo/data/audit.json`.
- `geolocated-citibike-stations.svg`: projects all 51 station locations using Mercator, with geographic grid lines. Equal-size point symbols encode only station location; they do not encode footprint, capacity, or trip count.

## Actual map for spatial objects

- `great-smoky-mountains-nps-map.png`: complete one-page National Park Service map rendered at 3200 pixels wide from https://www.nps.gov/grsm/planyourvisit/upload/grsmmap_2024_reduced_508.pdf, linked by the official park page https://www.nps.gov/grsm/planyourvisit/maps.htm and retrieved October 31, 2026. Rendered using `pdftoppm -f 1 -singlefile -scale-to 3200 -png`; geography, colors, labels, and proportions are unchanged. The PDF's source filename identifies the 2024 map version. Slide 7 uses the central green park region, blue Fontana Lake/rivers, and red road routes to explain area and line marks.
- The NPS cartography collection describes its government-produced maps as public domain: https://www.nps.gov/media/photo/collection-item.htm?cid=305fb7af-a71b-469b-941e-a98b439c882f&id=8410e7f4-0499-4e4e-802f-7bbdfb85b5fa . National Park Service credit remains visible on the slide. No navigation or current road-status claim is made.
- The previous `spatial-object-state-shapes.svg` remains available but is no longer displayed on slide 7.

## Introductory example images

The three PNGs below are unchanged image assets from the provided `slides_previous_semester/08_Geomaps.pptx`. They are reused as course reference material, without adding an attribution to the previous lecture on the slide. The PPTX does not identify an original image creator or license; no new authorship or licensing claim is made here.

Slide 5 deliberately revisits the MRI and state-border images from slide 4 to explain their data models: grayscale as field values, and state boundaries as object geometry. Slide 6 revisits state borders and the Citi Bike map to compare boundary-following area marks with point symbols located on a reference map. The images remain unchanged.

- `spatial-data-us-state-borders.png`: `ppt/media/image13.png`, used on slide 3. Illustrates state shapes and boundaries.
- `spatial-data-brain-mri.png`: `ppt/media/image8.png`, used on slide 3. Sagittal MRI image used to illustrate the spatial form of brain anatomy; no diagnostic or segmentation claim is made.
- `spatial-data-citibike-map.png`: `ppt/media/image47.png`, used on slide 7. Illustrates Citi Bike station locations in New York City. The screenshot's date and the measure encoded by circle size are not specified, so the introductory slide makes no quantitative claim about them. This is separate from the retained Jersey City April 2020 SVG asset, which is no longer displayed on slide 8.

## Located-event example

- `geolocated-rocket-warnings-fires.png`: unchanged `ppt/media/image5.png`, the left-hand image on slide 8 of the supplied PPTX. Its visible date is October 7–9, 2023; its legend distinguishes rocket warnings and fires. The instructor identified the image as BBC News reporting on the Hamas attack on the Nova music festival. That attribution and reporting context are now visible on slide 8. The exact article URL has not been confirmed, and no new licensing claim is made. Reused at the user's request to illustrate events represented by point marks on a reference map. No counts, current-event claims, or causal conclusions are added.
- Slide 8's right-hand example now describes the warnings and fires in the displayed image. Point position locates a recorded event; symbol shape and size do not encode its physical shape or area of impact. Rocket-warning locations are not labelled as impact locations.

## Geometry and attributes comparison

Slide 9 now frames this pair through marks and channels: area-mark position and outline encode spatial information, and the color channel encodes population density on the same marks. The left figure explicitly labels the unit as one area mark per state. Data and geometry are unchanged.

- `census-state-population-density-2020.csv`: unchanged copy of the verified Lecture 11 dataset. Contains the 50 states' 2020 rows from the U.S. Census Bureau's Historical Apportionment Data CSV, https://www2.census.gov/programs-surveys/decennial/2020/data/apportionment/apportionment.csv, released April 26, 2021. Original traceability is in `slides/11-color-annotation-visual-emphasis/assets/SOURCES.md`. Density is residents per square mile of land at the published one-decimal precision.
- `state-geometry-boundaries.svg` and `state-attributes-density.svg`: use the same five states (Arizona, California, Nevada, Oregon, Utah), simplified 2017 Census geometry, Albers USA coordinates, fit, and exact boundary paths. The first uses a uniform fill without attribute labels. The second joins Census attributes by FIPS, labels state names, and maps density through a continuous linear blue scale with domain [0, 260]. California's 253.7 people/mi² is called out explicitly. These are course-rendered charts of real data, not Census-published graphics. Generated by `render-modeling-assets.cjs`.

## Latitude, longitude, and projection introduction

- `noaa-latitude.jpg` and `noaa-longitude.jpg`: unchanged diagrams from NOAA's “What are latitude and longitude?” tutorial, https://oceanservice.noaa.gov/education/tutorial_nautical_charts/nautical_charts02_information_2b.html . Image files: https://oceanservice.noaa.gov/education/tutorial_nautical_charts/latitude.jpg and https://oceanservice.noaa.gov/education/tutorial_nautical_charts/longitude.jpg . Retrieved October 31, 2026. NOAA's corresponding latitude/longitude fact pages credit iStock; that credit is retained visibly. No public-domain or new licensing claim is made.
- `globe-to-flat-map.svg`: original teaching map using the existing World Atlas/Natural Earth country geometry. Orthographic globe view at center 30°E, 20°N and a clipped Mercator map show the same illustrative coordinate P (60°E, 30°N). No observations or invented measured data are used.
- `projection-family-cylindrical.svg`: Mercator example with polar regions clipped to a finite map frame. The frame is shifted north to include Greenland and Africa completely. Greenland's existing Natural Earth feature (ID 304) is highlighted and both regions are labelled for the area-distortion comparison. Southernmost regions are outside the frame.
- `projection-family-conic.svg`: Albers equal-area conic example with standard parallels 30°N and 60°N, displaying North America between 160°W–40°W and 15°N–75°N. The map is clipped to that graticule footprint. The standard parallels are highlighted and labelled, alongside Canada and the U.S. These are geographic orientation labels, not a comparison of complete national totals; some northern areas are clipped.
- `projection-family-azimuthal.svg`: azimuthal equidistant example centered at the North Pole, clipped to the northern hemisphere. Blue radii connect N to illustrative A (60°W, 60°N) and B (60°E, 30°N). The dashed coral A–B segment shows a distance that is not preserved. The points are teaching coordinates, not recorded events or stations.
- All four SVGs are generated by `node slides/16-maps-geospatial-data/render-coordinate-assets.cjs`, using local D3 and TopoJSON libraries. These are rendered mathematical projections, not screenshots of USGS figures. Definitions/family descriptions follow NOAA and USGS, with visible source links. Geometry remains the lecture's `countries-110m.json` from World Atlas 2.0.2 / Natural Earth.

## Projection surface models

- `projection-model-cylinder.svg`, `projection-model-cone.svg`, and `projection-model-plane.svg`: original mathematical schematics generated by `render-coordinate-assets.cjs`. Each shows an orthographic 3D view of an ideal spherical Earth, a surrounding/intersecting/tangent surface, the relevant cut/unfolding action, and a flat result. These are conceptual family models, not literal light-projection derivations or measured data.
- Cylinder: unit-radius surface tangent to the unit sphere at the Equator, height 2.4 sphere radii. Its rectangle preserves width/height = 2π/2.4. Cone: rho = (1+sqrt(3))/2 − z, crossing the sphere at 30°N and 60°N. The illustrated 45° half-angle cone opens into a 360/sqrt(2) degree sector, retaining the contact circles' slant-distance ratios. Plane: z=1 touches the unit sphere at the North Pole; its lower view retains the rectangular sheet and adds a radial map grid.
- Geometry-family explanation follows the USGS Map Projections poster, https://store.usgs.gov/assets/mod/storefiles/PDF/16573.pdf . Surface schematics have visible course-illustration credit. Existing actual projection maps move to the adjacent example page without changing their data or formulas.

## Projection preservation and task comparison

Slide 46 explains the properties of the three named formulas, rather than assigning a single preservation property to each geometric family. The regional maps use the existing local geometry and projection parameters, with educational labels and overlays generated by `render-coordinate-assets.cjs`.

- Mercator: local angles/shapes, straight rhumb lines, high-latitude area inflation, and constant-bearing sea navigation. Source: https://doc.esri.com/en/arcgis-pro/latest/help/mapping/properties/mercator.html .
- Albers: equal-area preservation, shape/distance distortion away from the standard parallels, and east–west midlatitude regional area/thematic comparisons. Source: https://doc.esri.com/en/arcgis-pro/latest/help/mapping/properties/albers.html .
- Azimuthal equidistant: true distances and azimuths from the center, increasing outward shape/area distortion, and distance-from-center tasks. The spherical straight N–A/N–B radii and nonradial A–B segment illustrate the distinction. Source: https://doc.esri.com/en/arcgis-pro/latest/help/mapping/properties/azimuthal-equidistant.html .
- All three sources were checked October 31, 2026 and are linked visibly on the slide. The lecture uses spherical D3 formulas; it makes no claim about a Web Mercator implementation's ellipsoidal accuracy.
