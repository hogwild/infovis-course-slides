const frustrationCounts = groups.flatMap(group => {
  const students = data.filter(d => d.group === group);
  let start = 0;
  return [1, 2, 3, 4, 5].map(level => {
    const count = students.filter(d => d.frustration === level).length;
    const proportion = students.length ? count / students.length : 0;
    const end = start + proportion;
    const result = {group, level, count, proportion, start, end, middle: (start + end) / 2};
    start = end;
    return result;
  });
});
