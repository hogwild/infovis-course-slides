// Open Worldmap.html with VS Code Live Server.
// Set its map script src to "interactive_map_sample_code.js".
// Reference code: compare after completing your own version.

const svg = d3.select("#map");
// Define the ordered income levels and colormap.
const levels = [
  "Low income",
  "Lower middle income",
  "Upper middle income",
  "High income"
];
const missing = "No data / not applicable";
const color = d3
  .scaleOrdinal()
  .domain(levels)
  .range(d3.schemeBlues[4])
  .unknown("#b8bec8");
// Load the map data.
d3.json("data/world-income.geojson")
  .then(drawMap)
  .catch(error => console.error(error));
function drawMap(world) {
  // Set the projection and geographic path generator.
  const projection = d3.geoEqualEarth().fitExtent(
    [
      [20, 20],
      [980, 470]
    ],
    world
  );
  const path = d3.geoPath(projection);
  // Draw the Sphere background before the countries.
  svg
    .append("path")
    .attr("d", path({ type: "Sphere" }))
    .attr("fill", "#fff3df");

  // Bind features and draw one path per country.
  const countries = svg
    .selectAll("path.country")
    .data(world.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", d => path(d))
    .attr("fill", d => color(d.properties.income_group))
    .attr("stroke", "white")
    .attr("stroke-width", 0.5);
  // Position the legend below the map.
  const legend = svg.append("g").attr("transform", "translate(30,510)");
  const items = legend
    .selectAll("g")
    .data(levels.concat([missing]))
    .enter()
    .append("g")
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
    .text(d => d);
  // Update existing country paths for the selected group.
  function highlight(level) {
    countries.attr("opacity", d => {
      const group = d.properties.income_group || missing;
      return level === null || group === level ? 1 : 0.2;
    });
  }
  // Highlight on mouse entry; reset on mouse exit.
  items
    .on("mouseenter", (event, d) => highlight(d))
    .on("mouseleave", () => highlight(null));
}
