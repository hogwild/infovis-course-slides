const summary = groups.map(group => {
  const students = data.filter(d => d.group === group);
  const mean = field => students.length
    ? students.reduce((sum, d) => sum + d[field], 0) / students.length
    : null;
  return {group, n: students.length, performance: mean("performance"), gain: mean("gain")};
});

function meanRows(group, field) {
  const value = summary.find(d => d.group === group)[field];
  return value == null ? [] : [{value, label: "Mean " + value.toFixed(2)}];
}
