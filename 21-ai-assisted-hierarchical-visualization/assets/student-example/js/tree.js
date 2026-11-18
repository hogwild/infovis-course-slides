// Appendix: reuse the treemap's data preparation, then change layout and marks.
import { loadData } from "./data.js";
import { buildTree } from "./buildTree.js";

async function main() {
  // 1. The same records and nested objects used by the treemap.
  const rows = await loadData("data/titanic.csv");
  const treeData = buildTree(rows, ["Sex", "Pclass"]);
  const root = d3.hierarchy(treeData);

  // 2. A tree layout assigns x/y to every node. No sum() is needed.
  const width = 1100, height = 260;
  d3.tree().size([width, height])(root);

  // Reserve margins beyond the layout extent for circles and text labels.
  const svg = d3.select("#tree").attr("viewBox", "0 0 1260 340");
  const g = svg.append("g").attr("transform", "translate(30,40)");

  // 3. Draw the links first so they sit behind the nodes.
  const link = d3.linkVertical().x(d => d.x).y(d => d.y);
  g.selectAll("path").data(root.links()).join("path")
    .attr("d", link).attr("fill", "none").attr("stroke", "#9aa7ba");
  const nodes = g.selectAll("g.node").data(root.descendants())
    .join("g").attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);
  nodes.append("circle").attr("r", 5).attr("fill", "#3157a4");
  nodes.append("text").attr("x", 9).attr("dy", "0.32em")
    .text(d => d.data.name);

  d3.select("#summary").text(
    `${rows.length} passengers · ${root.descendants().length} nodes · ` +
    `${root.links().length} parent–child links`
  );

  // Inspect the shared data and the tree coordinates in the browser console.
  window.lab = { rows, treeData, root, nodes };
}

main().catch(error => {
  d3.select("#summary").text("Tree could not be loaded.");
  d3.select("#error").text(error.message);
  console.error(error);
});
