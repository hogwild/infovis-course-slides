const frustrationChart = document.createElement("div");
const frustrationResult = await embed(frustrationChart, frustrationSpec,
  {actions: false, renderer: "svg"});
display(frustrationChart);
invalidation.then(() => frustrationResult.finalize());
