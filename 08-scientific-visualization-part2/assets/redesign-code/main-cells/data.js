const csvRows = await FileAttachment("ai-programming-analysis.csv").csv();
const numericFields = ["performance", "pre", "post", "gain", "frustration", "comprehension"];

// Keep pseudonym and group as text; convert only the measured fields.
const data = csvRows.map((row, index) => {
  const student = {...row};
  for (const field of numericFields) {
    if (row[field] == null || row[field].trim() === "" || !Number.isFinite(Number(row[field]))) {
      throw new Error("Missing or invalid " + field + " in CSV row " + (index + 2));
    }
    student[field] = Number(row[field]);
  }
  return student;
});
