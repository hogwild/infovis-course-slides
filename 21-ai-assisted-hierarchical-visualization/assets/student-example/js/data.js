// Module 1: load records, convert types, and derive an age category.
// D3 is loaded by the HTML page before main.js runs.
export async function loadData(url) {
  const rawRows = await d3.csv(url);
  return prepareData(rawRows);
}

export function prepareData(rawRows) {
  const ids = new Set();

  return rawRows.map((d, index) => {
    const id = Number(d.PassengerId);
    const age = d.Age.trim() === "" ? null : Number(d.Age);

    // Do not silently turn blank ages into zero or discard invalid rows.
    if (!Number.isInteger(id) || id <= 0 || ids.has(id) ||
        !["male", "female"].includes(d.Sex) ||
        !["1", "2", "3"].includes(d.Pclass) ||
        !["0", "1"].includes(d.Survived) ||
        (age !== null && (!Number.isFinite(age) || age < 0))) {
      throw new Error(`Invalid or duplicate record at CSV row ${index + 2}.`);
    }
    ids.add(id);

    return {
      PassengerId: id,
      Sex: d.Sex,
      Pclass: `Class ${d.Pclass}`,
      Age: age,
      AgeGroup: ageGroup(age),
      Survived: Number(d.Survived)
    };
  });
}

function ageGroup(age) {
  if (age === null) return "Unknown";
  const lower = Math.floor(age / 10) * 10;
  return `${lower}–${lower + 10}`; // [lower, lower + 10)
}
