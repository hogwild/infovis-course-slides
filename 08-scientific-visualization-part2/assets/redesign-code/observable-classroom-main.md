# Lecture 8: CSV-based classroom notebook

This is the main classroom edition for **Observable Notebooks 2.0**. It contains **18 JavaScript cells and 1 Markdown cell**. Upload one processed CSV, compute the chart summaries in the notebook, and draw four views in the lecture's reading order: exercise performance, reported frustration, knowledge gains, and the paired-score supplement. Finish with a combined figure in two rows.

## Set up the notebook

1. Create a blank Notebooks 2.0 notebook, or replace the earlier classroom cells. Avoid keeping two definitions of the same variable.
2. Upload [ai-programming-analysis.csv](../ai-programming-analysis.csv) as a file attachment. Keep this exact filename. This is the processed analysis table, not the original study CSV.
3. Copy each numbered block below into its own cell. Use **Markdown** for cell 1 and **JavaScript (js)** for cells 2–19. Paste the code itself, without the surrounding Markdown code fences.
4. Run the cells. Data loading, counting, group means, proportions and path counts are computed from the attachment. Specifications reference these variables rather than embedding summary arrays.
5. Check cell 10: **275 students**, **275 unique IDs**, **No AI 96 / Iris 91 / ChatGPT 88**, **92 paths**, **275 students on paths**, and both checks **true**. Then check all four chart outputs and the combined figure in cell 19.

## Use it in class

Prepare cells 2–10 before the demonstration. Explain that the CSV has one row per student and that counting creates the distributions; keep the main discussion on visual design.

In gainSpec, change the single **height: 140** inside groups.map to **height: 220**. All three panels update together. Restore 140, then change one group color in groupColors and observe both the score and gain charts update. Compare the result with the original design.

Counts include zero-count categories on shared scales. Means use individual student records. Frustration proportions use each group's sample size. Paired lines count students with the same starting and ending score; their darkness uses a common scale across groups.

The count-axis limits match the lecture dataset (60 students for exercise scores and 40 for gains). If you use a different dataset, review those limits and keep them consistent across groups.

## Finish with the combined figure

Cell 19 reuses the four specifications and arranges them in two rows:

| First column | Second column |
| --- | --- |
| Exercise performance | Reported frustration |
| Knowledge gains | Supplement: pretest and posttest |

Read left to right, then top to bottom. The supplement stays beside the gains so readers can connect changes to starting and ending scores. Edits to the individual specifications also update the combined figure. The combined view has its own chart output, so all four earlier outputs remain available.

If your notebook already contains cells 1–18, add only cell 19 at the end as a JavaScript cell.

## Share with students

Keep the title and source attribution in cell 1. In the notebook's Settings, choose **Unlisted** for access by link or **Public** for a publicly listed notebook, then copy the notebook URL. Open the shared link while signed out and check the attachment, all four charts and the combined figure. Students can sign in and **Fork** their own copy to experiment.

The [9-cell quick-start edition](observable-classroom.html) remains available as a backup with embedded summary data. The separate 38-cell analysis notebook uses legacy Observable JavaScript (ojs); it is not required for this classroom edition.

Documentation: [Notebooks 2.0 system guide](https://observablehq.github.io/notebook-kit/system-guide), [Notebooks user guide](https://observablehq.com/@observablehq/notebooks-user-guide), [Vega-Embed API](https://vega.github.io/vega-embed/), [Vega-Lite concatenation](https://vega.github.io/vega-lite/docs/concat.html).

## Complete cells

### 1. Notebook title and sources

Cell type: **Markdown**

```markdown
# Redesigning figures for a research paper

Compare exercise performance, reported frustration and knowledge gains across three groups: No AI, Iris and ChatGPT. Use the paired-score supplement to see the starting and ending levels behind the gains.

The attached **ai-programming-analysis.csv** is a processed analysis table: one row per student. This notebook computes chart summaries from that table.

Classroom redesign based on [Bassner et al. (2026)](https://doi.org/10.1016/j.caeai.2025.100537).
Original data: [Zenodo 20285307](https://doi.org/10.5281/zenodo.20285307), CC BY 4.0.
```

### 2. Import the charting library

Cell type: **JavaScript**

```javascript
import embed from "npm:vega-embed@7.1.0";
```

### 3. Read the processed CSV attachment

Cell type: **JavaScript**

```javascript
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
```

### 4. Shared group order, colors and typography

Cell type: **JavaScript**

```javascript
const groups = ["No AI", "Iris", "ChatGPT"];
const groupColors = {"No AI": "#667085", Iris: "#3157a4", ChatGPT: "#7656a6"};
const chartConfig = {
  font: "Arial",
  background: "white",
  view: {stroke: null},
  axis: {
    labelFontSize: 17,
    titleFontSize: 18,
    titlePadding: 12,
    labelColor: "#263248",
    titleColor: "#17233c",
    gridColor: "#e6e8ed",
    domainColor: "#a1a7b3",
    labelPadding: 8,
    labelAngle: 0
  },
  title: {
    fontSize: 22,
    anchor: "start",
    color: "#17233c",
    offset: 18,
    subtitleFontSize: 16,
    subtitleColor: "#667085",
    subtitlePadding: 8
  },
  legend: {labelFontSize: 15, titleFontSize: 16, orient: "bottom"}
};
```

### 5. Compute group sizes and means

Cell type: **JavaScript**

```javascript
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
```

### 6. Count students at each exercise score

Cell type: **JavaScript**

```javascript
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
```

### 7. Count students at each knowledge gain

Cell type: **JavaScript**

```javascript
// Include every possible gain from -6 to +6, including zero-count categories.
const gainValues = Array.from({length: 13}, (_, i) => i - 6);
const gainCounts = countScores("gain", gainValues);
```

### 8. Compute proportions for the five response levels

Cell type: **JavaScript**

```javascript
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
```

### 9. Count students following each pretest–posttest path

Cell type: **JavaScript**

```javascript
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
```

### 10. Check the loaded sample

Cell type: **JavaScript**

```javascript
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
```

### 11. Exercise performance: editable specification

Cell type: **JavaScript**

```javascript
const exerciseSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  hconcat: groups.map((group, index) => ({
    title: {frame: "group", text: group, color: groupColors[group], fontSize: 17, offset: 8},
    width: 140,
    height: 140,
    data: {values: exerciseCounts.filter(d => d.group === group)},
    encoding: {
      y: {
        field: "value",
        type: "quantitative",
        scale: {domain: [-5, 105], nice: false},
        axis: {
          title: index === 0 ? "Score (%)" : null,
          values: scoreValues,
          labels: index === 0,
          ticks: index === 0,
          domain: index === 0,
          grid: false,
          format: ".1~f",
          labelFontSize: 13,
          labelOverlap: false,
          labelPadding: 3,
          titlePadding: 6,
          titleFontSize: 13
        }
      }
    },
    layer: [
      {
        mark: {type: "bar", orient: "horizontal", color: groupColors[group], size: 7},
        encoding: {
          x: {
            field: "count",
            type: "quantitative",
            scale: {domain: [0, 60], nice: false},
            axis: {
              title: "Students",
              values: [0, 30, 60],
              labelFontSize: 13,
              labelOverlap: false,
              titleFontSize: 14,
              titlePadding: 4,
              labelPadding: 3
            }
          },
          tooltip: [
            {field: "group"},
            {field: "value", title: "Exercise score (%)"},
            {field: "count", title: "Students"}
          ]
        }
      },
      {
        data: {values: meanRows(group, "performance")},
        mark: {type: "rule", color: "#17233c", strokeDash: [5, 4], strokeWidth: 2}
      },
      {
        data: {values: meanRows(group, "performance")},
        mark: {
          type: "text",
          align: "right",
          baseline: "bottom",
          dx: -3,
          dy: -4,
          fontSize: 13,
          fontWeight: "bold",
          color: "#17233c"
        },
        encoding: {x: {datum: 60, type: "quantitative"}, text: {field: "label"}}
      }
    ]
  })),
  spacing: 18,
  resolve: {scale: {x: "shared", y: "shared"}},
  title: {frame: "group", text: "Exercise performance", fontSize: 22, offset: 16},
  config: chartConfig
};
```

### 12. Exercise performance: chart output

Cell type: **JavaScript**

```javascript
const exerciseChart = document.createElement("div");
const exerciseResult = await embed(exerciseChart, exerciseSpec,
  {actions: false, renderer: "svg"});
display(exerciseChart);
invalidation.then(() => exerciseResult.finalize());
```

### 13. Reported frustration: editable specification

Cell type: **JavaScript**

```javascript
const frustrationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  width: 440,
  height: 140,
  data: {values: frustrationCounts},
  title: {
    frame: "group",
    text: "Reported frustration",
    subtitle: "Five response levels; lower = less",
    fontSize: 22,
    subtitleFontSize: 13,
    offset: 13,
    subtitlePadding: 9
  },
  encoding: {
    x: {field: "group", type: "nominal", sort: groups, title: null, axis: {labelFontSize: 14, labelPadding: 4}},
    y: {
      field: "start",
      type: "quantitative",
      title: "Responses (%)",
      scale: {domain: [0, 1]},
      axis: {
        format: ".0%",
        values: [0, 0.5, 1],
        labelFontSize: 13,
        titleFontSize: 13,
        labelPadding: 3,
        titlePadding: 6
      }
    },
    color: {
      field: "level",
      type: "ordinal",
      sort: [1, 2, 3, 4, 5],
      scale: {domain: [1, 2, 3, 4, 5], range: ["#fff3df", "#fedbb2", "#f3b981", "#d58c50", "#9a502c"]},
      legend: {title: null, direction: "horizontal", offset: 6, labelFontSize: 13}
    },
    tooltip: [{field: "group"}, {field: "level"}, {field: "count"}, {field: "proportion", format: ".1%"}]
  },
  layer: [
    {mark: {type: "bar", width: 64, stroke: "white", strokeWidth: 1}, encoding: {y2: {field: "end"}}},
    {
      mark: {type: "text", fontSize: 13},
      encoding: {
        y: {field: "middle", type: "quantitative"},
        text: {field: "proportion", format: ".0%"},
        color: {condition: {test: "datum.level >= 4", value: "white"}, value: "#17233c"},
        opacity: {condition: {test: "datum.proportion >= 0.06", value: 1}, value: 0}
      }
    }
  ],
  config: chartConfig
};
```

### 14. Reported frustration: chart output

Cell type: **JavaScript**

```javascript
const frustrationChart = document.createElement("div");
const frustrationResult = await embed(frustrationChart, frustrationSpec,
  {actions: false, renderer: "svg"});
display(frustrationChart);
invalidation.then(() => frustrationResult.finalize());
```

### 15. Knowledge gains: editable specification

Cell type: **JavaScript**

```javascript
const gainSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  hconcat: groups.map((group, index) => ({
    title: {frame: "group", text: group, color: groupColors[group], fontSize: 17, offset: 8},
    width: 140,
    height: 140,
    data: {values: gainCounts.filter(d => d.group === group)},
    encoding: {
      y: {
        field: "value",
        type: "quantitative",
        scale: {domain: [-6.5, 6.5], nice: false},
        axis: {
          title: index === 0 ? "Gain (points)" : null,
          values: [-6, -4, -2, 0, 2, 4, 6],
          labels: index === 0,
          ticks: index === 0,
          domain: index === 0,
          grid: false,
          format: ".1~f",
          labelFontSize: 13,
          labelOverlap: false,
          labelPadding: 3,
          titlePadding: 6,
          titleFontSize: 13
        }
      }
    },
    layer: [
      {
        mark: {type: "bar", orient: "horizontal", color: groupColors[group], size: 7},
        encoding: {
          x: {
            field: "count",
            type: "quantitative",
            scale: {domain: [0, 40], nice: false},
            axis: {
              title: "Students",
              values: [0, 20, 40],
              labelFontSize: 13,
              labelOverlap: false,
              titleFontSize: 14,
              titlePadding: 4,
              labelPadding: 3
            }
          },
          tooltip: [
            {field: "group"},
            {field: "value", title: "Knowledge gain (points)"},
            {field: "count", title: "Students"}
          ]
        }
      },
      {
        data: {values: meanRows(group, "gain")},
        mark: {type: "rule", color: "#17233c", strokeDash: [5, 4], strokeWidth: 2}
      },
      {
        data: {values: meanRows(group, "gain")},
        mark: {
          type: "text",
          align: "right",
          baseline: "bottom",
          dx: -3,
          dy: -9,
          fontSize: 13,
          fontWeight: "bold",
          color: "#17233c"
        },
        encoding: {x: {datum: 40, type: "quantitative"}, text: {field: "label"}}
      }
    ]
  })),
  spacing: 18,
  resolve: {scale: {x: "shared", y: "shared"}},
  title: {frame: "group", text: "Knowledge gains", fontSize: 22, offset: 16},
  config: chartConfig
};
```

### 16. Knowledge gains: chart output

Cell type: **JavaScript**

```javascript
const gainChart = document.createElement("div");
const gainResult = await embed(gainChart, gainSpec,
  {actions: false, renderer: "svg"});
display(gainChart);
invalidation.then(() => gainResult.finalize());
```

### 17. Supplement: pretest and posttest: editable specification

Cell type: **JavaScript**

```javascript
const pairedSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  title: {frame: "group", text: "Supplement: pretest and posttest", fontSize: 22, offset: 16},
  data: {values: pairedCounts},
  transform: [{fold: ["pre", "post"], as: ["time", "score"]}],
  facet: {
    column: {
      field: "group",
      sort: groups,
      title: null,
      header: {labelFontSize: 17, labelColor: "#17233c", labelFontWeight: "bold", labelPadding: 3}
    }
  },
  spacing: 24,
  spec: {
    width: 130,
    height: 140,
    mark: {type: "line", strokeWidth: 2.5, opacity: 1},
    encoding: {
      x: {
        field: "time",
        type: "ordinal",
        sort: ["pre", "post"],
        title: null,
        scale: {padding: 0.2},
        axis: {labelFontSize: 13, labelPadding: 4}
      },
      y: {
        field: "score",
        type: "quantitative",
        scale: {domain: [0, 6], nice: false},
        title: "Correct items",
        axis: {
          values: [0, 1, 2, 3, 4, 5, 6],
          labelFontSize: 13,
          titleFontSize: 13,
          labelPadding: 3,
          titlePadding: 6
        }
      },
      detail: {field: "path", type: "nominal"},
      color: {
        field: "count",
        type: "quantitative",
        scale: {domain: [1, maxPathCount], nice: false, range: ["#b0bfd7", "#17233c"]},
        legend: {
          title: ["Students", "on path"],
          orient: "right",
          direction: "vertical",
          gradientLength: 95,
          titleLimit: 100,
          values: [1, 4, 8, 12, maxPathCount].filter((d, i, a) => d <= maxPathCount && a.indexOf(d) === i),
          format: "d",
          titleFontSize: 13,
          labelFontSize: 12,
          gradientThickness: 10,
          offset: 10
        }
      },
      tooltip: [
        {field: "group", title: "Group"},
        {field: "pre", title: "Pretest"},
        {field: "post", title: "Posttest"},
        {field: "count", title: "Students"}
      ]
    }
  },
  resolve: {scale: {y: "shared", color: "shared"}},
  config: chartConfig
};
```

### 18. Supplement: pretest and posttest: chart output

Cell type: **JavaScript**

```javascript
const pairedChart = document.createElement("div");
const pairedResult = await embed(pairedChart, pairedSpec,
  {actions: false, renderer: "svg"});
display(pairedChart);
invalidation.then(() => pairedResult.finalize());
```

### 19. Combine the four views in reading order

Cell type: **JavaScript**

```javascript
const combinedSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  // Read left to right across the first row, then the second row.
  concat: [exerciseSpec, frustrationSpec, gainSpec, pairedSpec].map(
    ({$schema, config, ...view}) => view
  ),
  columns: 2,
  align: "each",
  center: false,
  spacing: 24,
  resolve: {scale: {x: "independent", y: "independent", color: "independent"}},
  config: chartConfig
};

const combinedChart = document.createElement("div");
combinedChart.style.maxWidth = "100%";
const combinedResult = await embed(combinedChart, combinedSpec,
  {actions: false, renderer: "svg"});

// Fit the complete figure to the notebook width, keeping its proportions.
const combinedSvg = combinedChart.querySelector("svg");
combinedSvg.setAttribute("viewBox",
  "0 0 " + combinedSvg.getAttribute("width") + " " + combinedSvg.getAttribute("height"));
combinedSvg.style.maxWidth = "100%";
combinedSvg.style.height = "auto";

display(combinedChart);
invalidation.then(() => combinedResult.finalize());
```
