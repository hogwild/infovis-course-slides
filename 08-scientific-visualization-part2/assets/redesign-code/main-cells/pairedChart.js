const pairedChart = document.createElement("div");
const pairedResult = await embed(pairedChart, pairedSpec,
  {actions: false, renderer: "svg"});
display(pairedChart);
invalidation.then(() => pairedResult.finalize());
