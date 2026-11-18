// Module 5: follow the complete pipeline here, then read each implementation.
import { loadData } from "./data.js";
import { buildTree } from "./buildTree.js";
import { computeLayout, drawTreemap, drawLegend } from "./treemap.js";
import { addTooltips } from "./interaction.js";

const attributes = ["Sex", "Pclass"];
const width = 1100;
const height = 600;
const svg = d3.select("#chart").attr("viewBox", `0 0 ${width} ${height}`);

async function main() {
  // Stage 1: records → plain tree → D3 hierarchy and coordinates → SVG.
  const rows = await loadData("data/titanic.csv");
  const treeData = buildTree(rows, attributes);
  const root = computeLayout(treeData, width, height);
  const cells = drawTreemap(svg, root);
  drawLegend("#legend");
  d3.select("#hierarchy").text(attributes.join(" → "));
  svg.attr("aria-label", `Titanic passengers grouped by ${attributes.join(" → ")}`);

  d3.select("#summary").text(
    `${rows.length} passengers · ${root.data.survived} survivors · ` +
    `${d3.format(".1%")(root.data.rate)} overall survival · ${root.leaves().length} groups`
  );

  // Stage 2 adds just one call. It reuses the Stage 1 cells and geometry.
  if (document.body.dataset.stage === "tooltip") {
    addTooltips(cells, "#tooltip", "#detail");
  }

  // Teaching aid: inspect each intermediate result in the browser console.
  window.lab = { rows, treeData, root, cells };
}

main().catch(error => {
  document.querySelector("#summary").textContent = "Chart could not be loaded.";
  document.querySelector("#error").textContent = error.message;
  console.error(error);
});
