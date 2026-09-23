const combinedSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  // Read left to right across the first row, then the second row.
  concat: [exerciseSpec, frustrationSpec, gainSpec, pairedSpec].map(
    ({$schema, config, ...view}) => view
  ),
  columns: 2,
  align: "each",
  center: false,
  spacing: 24,
  resolve: {scale: {x: "independent", y: "independent", color: "independent"}},
  config: chartConfig
};

const combinedChart = document.createElement("div");
combinedChart.style.maxWidth = "100%";
const combinedResult = await embed(combinedChart, combinedSpec,
  {actions: false, renderer: "svg"});

// Fit the complete figure to the notebook width, keeping its proportions.
const combinedSvg = combinedChart.querySelector("svg");
combinedSvg.setAttribute("viewBox",
  "0 0 " + combinedSvg.getAttribute("width") + " " + combinedSvg.getAttribute("height"));
combinedSvg.style.maxWidth = "100%";
combinedSvg.style.height = "auto";

display(combinedChart);
invalidation.then(() => combinedResult.finalize());
