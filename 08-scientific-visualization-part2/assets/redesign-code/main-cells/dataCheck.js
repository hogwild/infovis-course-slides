const dataCheck = {
  students: data.length,
  uniqueStudents: new Set(data.map(d => d.pseudonym)).size,
  groupSizes: Object.fromEntries(summary.map(d => [d.group, d.n])),
  allGroupsRecognized: data.every(d => groups.includes(d.group)),
  pairingOK: data.every(d => d.gain === d.post - d.pre),
  paths: pairedCounts.length,
  studentsOnPaths: pairedCounts.reduce((sum, d) => sum + d.count, 0)
};
display(dataCheck);
