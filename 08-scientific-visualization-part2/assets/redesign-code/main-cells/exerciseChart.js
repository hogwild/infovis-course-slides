const exerciseChart = document.createElement("div");
const exerciseResult = await embed(exerciseChart, exerciseSpec,
  {actions: false, renderer: "svg"});
display(exerciseChart);
invalidation.then(() => exerciseResult.finalize());
