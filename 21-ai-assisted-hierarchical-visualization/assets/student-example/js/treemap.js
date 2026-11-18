// Module 3: calculate geometry, then render it. These are separate operations.
export function computeLayout(treeData, width, height) {
  const root = d3.hierarchy(treeData)
    .sum(d => d.children ? 0 : d.count)
    .sort((a, b) => b.value - a.value);

  // Only leaves contribute to sum: parent counts must not be counted twice.
  d3.treemap()
    .tile(d3.treemapSquarify)
    .size([width, height])
    .paddingOuter(4)
    .paddingInner(2)
    .paddingTop(d => d.children ? 24 : 0)
    .round(true)(root);

  return root;
}

export function drawTreemap(svg, root) {
  const color = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);

  // Rebuild a small chart. Keep the chart description for accessibility.
  svg.selectAll("g").remove();
  const layer = svg.append("g");
  const cells = layer.selectAll("g.leaf")
    .data(root.leaves())
    .join("g")
    .attr("class", "leaf")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);

  cells.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => color(d.data.rate));

  // Text must fit; hiding a label must not remove its rectangle or data.
  cells.filter(d => d.x1 - d.x0 > 110 && d.y1 - d.y0 > 80)
    .each(function (d) {
      const label = d3.select(this).append("text")
        .attr("x", 8).attr("y", 24)
        .attr("fill", d.data.rate < 0.55 ? "#17233c" : "white");
      label.append("tspan").text(d.data.name);
      label.append("tspan").attr("x", 8).attr("dy", 24)
        .text(`${d.value} people`);
      label.append("tspan").attr("x", 8).attr("dy", 22)
        .text(d3.format(".1%")(d.data.rate));
    });

  const branches = layer.selectAll("g.branch")
    .data(root.descendants().filter(d => d.children && d.depth > 0))
    .join("g").attr("class", "branch");

  branches.append("rect")
    .attr("x", d => d.x0).attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0);

  branches.append("text")
    .attr("x", d => d.x0 + 6).attr("y", d => d.y0 + 18)
    .text(d => `${d.data.name} · ${d.value} people`);

  return cells; // Stage 2 attaches event listeners to these same marks.
}

export function drawLegend(container) {
  const color = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);
  const legend = d3.select(container).append("svg")
    .attr("viewBox", "0 0 380 36")
    .attr("role", "img").attr("aria-label", "Survival rate: light blue 0%, dark blue 100%");
  legend.append("text").attr("x", 0).attr("y", 23).text("Survival rate");
  legend.selectAll("rect").data(d3.range(100)).join("rect")
    .attr("x", d => 140 + d * 1.7).attr("y", 8)
    .attr("width", 1.7).attr("height", 16).attr("fill", d => color(d / 99))
    .attr("shape-rendering", "crispEdges");
  legend.append("text").attr("x", 112).attr("y", 23).text("0%");
  legend.append("text").attr("x", 322).attr("y", 23).text("100%");
}
