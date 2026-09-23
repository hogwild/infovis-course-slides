function countScores(field, levels) {
  return groups.flatMap(group => {
    const students = data.filter(d => d.group === group);
    return levels.map(value => ({
      group, value, count: students.filter(d => d[field] === value).length
    }));
  });
}

// All groups use the same observed score positions, including zero counts.
const scoreValues = [...new Set(data.map(d => d.performance))].sort((a, b) => a - b);
const exerciseCounts = countScores("performance", scoreValues);
