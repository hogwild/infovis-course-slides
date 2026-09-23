const pairedCounts = groups.flatMap(group => {
  const counts = new Map();
  for (const student of data.filter(d => d.group === group)) {
    const path = student.pre + ":" + student.post;
    if (!counts.has(path)) {
      counts.set(path, {group, pre: student.pre, post: student.post, path, count: 0});
    }
    counts.get(path).count += 1;
  }
  return [...counts.values()];
}).sort((a, b) => a.count - b.count);

// One shared color scale across all three groups.
const maxPathCount = Math.max(1, ...pairedCounts.map(d => d.count));
