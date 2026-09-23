const gainChart = document.createElement("div");
const gainResult = await embed(gainChart, gainSpec,
  {actions: false, renderer: "svg"});
display(gainChart);
invalidation.then(() => gainResult.finalize());
