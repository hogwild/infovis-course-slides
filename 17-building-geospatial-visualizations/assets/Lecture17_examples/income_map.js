// Open Worldmap.html with VS Code Live Server.
// Set its map script src to "income_map.js".

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
    console.log("Features:", world.features.length);
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

  // Define the ordered income levels and colormap.
  const levels = [
    "Low income",
    "Lower middle income",
    "Upper middle income",
    "High income"
  ];
  const color = d3
    .scaleOrdinal()
    .domain(levels)
    .range(d3.schemeBlues[4])
    .unknown("#b8bec8");

  // Bind features and draw one path per country.
  const countries = svg
    .selectAll("path.country")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", d => path(d));

  countries.attr("fill", d => color(d.properties.income_group));
  countries.append("title").text(d => {
    const label = d.properties.income_group || "No data / not applicable";
    return d.properties.name + ": " + label;
  });

  // Use the same scale for country fills and legend swatches.
  // Create the legend rows.
  const legendLevels = levels.concat(["No data / not applicable"]);
  // Position the legend below the map.
  const legend = svg.append("g").attr("transform", "translate(30, 510)");
  const items = legend
    .selectAll("g.legend-item")
    .data(legendLevels)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => "translate(0," + i * 25 + ")");

  // Add a color swatch and label to each row.
  items
    .append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", d => color(d));
  items
    .append("text")
    .attr("x", 28)
    .attr("y", 14)
    .attr("font-size", 17)
    .attr("fill", "#263248")
    .text(d => d);

  svg
    .append("text")
    .attr("x", 430)
    .attr("y", 530)
    .attr("font-size", 17)
    .attr("fill", "#566275")
    .text("Natural Earth legacy income groups");
  svg
    .append("text")
    .attr("x", 430)
    .attr("y", 557)
    .attr("font-size", 15)
    .attr("fill", "#566275")
    .text("v5.1.2 snapshot; observation year unspecified");
  svg
    .append("text")
    .attr("x", 430)
    .attr("y", 582)
    .attr("font-size", 15)
    .attr("fill", "#566275")
    .text("Antarctica: not applicable");

  d3.select("#status").text(
    "177 features: 176 classified, Antarctica not applicable."
  );
}
