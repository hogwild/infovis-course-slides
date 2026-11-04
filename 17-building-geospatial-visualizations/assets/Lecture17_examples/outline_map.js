// Open Worldmap.html with VS Code Live Server.
// Set its map script src to "outline_map.js".

const svg = d3.select("#map");
const width = 1000;
const mapHeight = 490; // The remaining space is reserved for the legend.

function showError(error) {
  d3.select("#status").text(
    "Could not load the map. Check Network and the local server."
  );
  console.error(error);
}
// Load the map data.
d3.json("data/world-income.geojson")
  .then(world => {
    console.log("Features:", world.features);
    drawMap(world);
  })
  .catch(showError);

function drawMap(world) {
  // Set the projection and geographic path generator.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [20, 20],
      [width - 20, mapHeight - 20]
    ],
    world
  );
  const path = d3.geoPath(projection);
  // Draw the Sphere background before the countries.
  svg
    .append("path")
    .attr("class", "sphere")
    .attr("d", path({ type: "Sphere" }));
  // Bind features and draw one path per country.
  const countries = svg
    .selectAll("path.country")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", d => path(d));

  countries.attr("fill", "#b8cce5");
  countries.append("title").text(d => d.properties.name);
  d3.select("#status").text(
    world.features.length + " geographic features drawn."
  );
}
