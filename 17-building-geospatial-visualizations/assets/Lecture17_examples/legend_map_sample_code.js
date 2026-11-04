// Open Worldmap.html with VS Code Live Server.
// Set its map script src to "legend_map_sample_code.js".
// Reference code: compare after completing your own version.

const svg = d3.select("#map");
const width = 1000;
const mapHeight = 490; // The remaining space is reserved for the legend.

function showError(error) {
  d3.select("#status").text(
    "Could not load the map. Check Network and the local server."
  );
  console.error(error);
}

// Load geometry, then load the table. Returning the CSV promise lets catch
// handle a failure in either request, or an error in the drawing code.
// Load the map data.
d3.json("data/world.geojson")
  .then(world => {
    return d3.csv("data/income.csv").then(rows => {
      console.assert(
        new Set(rows.map(d => d.code)).size === rows.length,
        "CSV codes must be unique"
      );
      console.assert(
        new Set(world.features.map(d => d.properties.code)).size ===
          world.features.length,
        "Geometry codes must be unique"
      );

      world.features.forEach(feature => {
        const row = rows.find(d => d.code === feature.properties.code);
        feature.properties.income_group = row ? row.income_group || null : null;
      });

      const unmatchedFeatures = world.features.filter(
        feature => !rows.some(row => row.code === feature.properties.code)
      );
      const unmatchedRows = rows.filter(
        row =>
          !world.features.some(feature => feature.properties.code === row.code)
      );
      const missingValues = world.features.filter(
        d => !d.properties.income_group
      );
      console.log("Join audit", {
        features: world.features.length,
        rows: rows.length,
        unmatchedFeatures: unmatchedFeatures.length,
        unmatchedRows: unmatchedRows.length,
        missingValues: missingValues.length
      });
      drawMap(world);
    });
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

  // Optional: change existing paths instead of drawing a second map layer.
  // null means no active filter. The last legend label represents missing values.
  // Update existing country paths for the selected group.
  function highlight(level) {
    countries.attr("opacity", d => {
      const group = d.properties.income_group || "No data / not applicable";
      return level === null || group === level ? 1 : 0.2;
    });
    d3.select("#status").text(
      level === null
        ? "All groups visible. Hover or Tab to a legend item."
        : "Highlight: " + level
    );
  }

  items
    .attr("tabindex", 0)
    .attr("role", "button")
    .attr("aria-label", d => "Highlight " + d)
    .on("mouseenter", (event, d) => highlight(d))
    .on("mouseleave", () => {
      // Keep the keyboard-focused group active when the pointer leaves.
      const focused = legend.select(".legend-item:focus");
      highlight(focused.empty() ? null : focused.datum());
    })
    .on("focus", (event, d) => highlight(d))
    .on("blur", () => highlight(null))
    .on("click", (event, d) => highlight(d))
    .on("keydown", (event, d) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        highlight(d);
      }
      if (event.key === "Escape") highlight(null);
    });
  highlight(null);
}
