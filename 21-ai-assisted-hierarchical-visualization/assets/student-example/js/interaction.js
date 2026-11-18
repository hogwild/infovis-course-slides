// Module 4: add details to existing marks without changing data or layout.
export function addTooltips(cells, tooltipElement, detailElement) {
  const tooltip = d3.select(tooltipElement);
  const detail = d3.select(detailElement);

  function description(d) {
    const path = d.ancestors().reverse().slice(1)
      .map(node => node.data.name).join(" → ");
    return `${path}: ${d.data.count} passengers; ${d.data.survived} survived ` +
      `(${d3.format(".1%")(d.data.rate)}).`;
  }

  function show(event, d) {
    tooltip.property("hidden", false).text(description(d));
    detail.text(description(d));

    // Fixed-position tooltips use viewport coordinates, not SVG coordinates.
    const bounds = tooltip.node().getBoundingClientRect();
    const x = Math.min(event.clientX + 12, innerWidth - bounds.width - 8);
    const y = Math.min(event.clientY + 12, innerHeight - bounds.height - 8);
    tooltip.style("left", `${Math.max(8, x)}px`)
      .style("top", `${Math.max(8, y)}px`);
  }

  function hide() {
    tooltip.property("hidden", true);
  }

  cells.classed("interactive", true)
    .attr("role", "img")
    .attr("aria-label", description)
    .on("pointerenter.tooltip pointermove.tooltip", show)
    .on("pointerleave.tooltip", hide);
}
