// Module 2: turn a table into plain nested objects. No SVG or coordinates here.
export function buildTree(rows, attributes, name = "Passengers") {
  const count = rows.length;
  const survived = d3.sum(rows, d => d.Survived);
  const node = { name, count, survived, rate: count ? survived / count : 0 };

  // Base case: this leaf summarizes the records in one final group.
  if (attributes.length === 0) return node;

  // Recursive case: group by one field, then consume the remaining fields.
  const [field, ...rest] = attributes;
  node.children = d3.groups(rows, d => d[field])
    .map(([key, group]) => buildTree(group, rest, key));

  return node;
}
