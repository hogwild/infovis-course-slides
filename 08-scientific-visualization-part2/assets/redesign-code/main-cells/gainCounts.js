// Include every possible gain from -6 to +6, including zero-count categories.
const gainValues = Array.from({length: 13}, (_, i) => i - 6);
const gainCounts = countScores("gain", gainValues);
