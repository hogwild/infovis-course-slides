# Lecture 8: Vega-Lite code for the four redesigned charts

Each JSON specification runs independently and includes the real summary data, mean labels and styles used in the lecture's combined figure. No other notebook cells or CSV files are required. The four charts follow the figure's reading path: exercise performance, reported frustration, knowledge gains, and the pretest/posttest supplement.

To use a specification, select Vega-Lite in the Vega Editor and paste the complete contents of the corresponding JSON file. Alternatively, open index.html in this folder to preview the charts and copy the code. If the copy button is unavailable, expand the code and copy it manually.

These files use the same view specifications as the final combined figure, with the schema and shared configuration added for standalone use. Group sizes are No AI: 96, Iris: 91, and ChatGPT: 88. Mean labels in the frequency charts are calculated from all individual records, rather than by averaging the score categories. The paired chart contains 92 distinct paths representing the same 275 students.

Data: [Zenodo 20285307](https://doi.org/10.5281/zenodo.20285307), CC BY 4.0. Classroom redesign based on Bassner et al. (2026).

To regenerate these files from the repository root, run node slides/08-scientific-visualization-part2/render-ai-programming.mjs, then node slides/08-scientific-visualization-part2/export-redesign-code.mjs.

- **Exercise performance**: [Complete Vega-Lite JSON](exercise-performance.vl.json) · [SVG preview](exercise-performance.svg). Exercise score is on the vertical axis; the horizontal bars show student counts. Dashed lines and labels show group means.
- **Reported frustration**: [Complete Vega-Lite JSON](reported-frustration.vl.json) · [SVG preview](reported-frustration.svg). Each bar shows the proportions of five response levels within a group. Color indicates the response level.
- **Knowledge gains**: [Complete Vega-Lite JSON](knowledge-gains.vl.json) · [SVG preview](knowledge-gains.svg). Knowledge gain is on the vertical axis; the horizontal bars show student counts. Dashed lines and labels show group means.
- **Supplement: pretest and posttest**: [Complete Vega-Lite JSON](pretest-posttest-supplement.vl.json) · [SVG preview](pretest-posttest-supplement.svg). Each line connects a pretest score to a posttest score. Darker lines represent more students following that path, using the same color scale across groups.


Main classroom edition: [CSV-based notebook cells](observable-classroom-main.html) · [Complete code and sharing guide](observable-classroom-main.md).

Quick-start backup: [9 cells with embedded data](observable-classroom.html) · [Backup guide](observable-classroom.md).
