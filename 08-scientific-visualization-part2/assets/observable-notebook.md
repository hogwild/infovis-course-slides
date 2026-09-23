# Lecture 8 · Observable Notebook copy guide

本课为 Bassner et al. (2026) 的 AI-supported programming education 研究重设计证据图。将 [ai-programming-analysis.csv](ai-programming-analysis.csv) 添加为 Observable Notebook 同名附件。每个代码框复制到一个 **JavaScript cell**，按顺序运行。共 38 cells，无省略或伪代码。

分析表由作者筛选与计分规则生成。原始 [CSV](merged_data_pseudonymized.csv)、[来源与方法](ai-programming-provenance.md)、[作者 R 脚本](ai-programming-source/1_dataPrep.R)、[可运行 Python 转译](prepare-ai-programming.py) 均在课程包。不是重新寻找研究 claim。

最终阅读顺序：articleIntro → finalFigure → articleReading → articleCaption → articleScope。折叠辅助代码，将设计备选图保留在演示区域。重复移动 cell 不要重复定义名称。sampleCheck 应返回 275 人，三组 96 / 91 / 88，pairingOK = true。

95% percentile bootstrap：每组按参与者重抽样、保留同人的 pre/post，B=10,000，seed=20260922。补充增益差区间未经多重比较调整，不替代论文时间×组别检验。

本地 [研究阅读页](ai-programming-case.html) 和 [数据预览](ai-programming-data-preview.html) 可离线使用。Observable 首次加载依赖需要网络。未创建线上 Notebook。

## 01 · Vega-Embed

```javascript
embed = require("vega-embed@7.1.0")
```

## 02 · Verified analysis records

```javascript
data = FileAttachment("ai-programming-analysis.csv").csv().then(rows => {
  const fields = ["performance", "pre", "post", "gain", "frustration", "comprehension"];
  if (rows.some(d => fields.some(f => d[f] === "" || !Number.isFinite(+d[f])))) {
    throw new Error("Missing or invalid analytical value");
  }
  return rows.map(d => ({...d,
    ...Object.fromEntries(fields.map(f => [f, +d[f]]))}));
})
```

## 03 · Condition order

```javascript
groups = ["No AI", "Iris", "ChatGPT"]
```

## 04 · Condition colors

```javascript
colors = ["#667085", "#3157a4", "#7656a6"]
```

## 05 · Arithmetic mean

```javascript
mean = (values) => values.reduce((a, b) => a + b, 0) / values.length
```

## 06 · Summaries in original units

```javascript
summary = groups.map((group, index) => {
  const rows = data.filter(d => d.group === group);
  return {group, index, n: rows.length,
    performance: mean(rows.map(d => d.performance)),
    pre: mean(rows.map(d => d.pre)), post: mean(rows.map(d => d.post)),
    gain: mean(rows.map(d => d.gain)),
    frustration: mean(rows.map(d => d.frustration))};
})
```

## 07 · Shared chart typography

```javascript
config = ({font: "Arial", background: "white", view: {stroke: null},
  axis: {labelFontSize: 17, titleFontSize: 18, titlePadding: 12,
    labelColor: "#263248", titleColor: "#17233c", gridColor: "#e6e8ed",
    domainColor: "#a1a7b3", labelPadding: 8, labelAngle: 0},
  title: {fontSize: 22, anchor: "start", color: "#17233c", offset: 18,
    subtitleFontSize: 16, subtitleColor: "#667085", subtitlePadding: 8},
  legend: {labelFontSize: 15, titleFontSize: 16, orient: "bottom"}})
```

## 08 · Render a Vega-Lite specification

```javascript
draw = (spec) => embed(spec, {actions: false, renderer: "svg", config})
```

## 09 · Stable condition encoding

```javascript
condition = ({field: "group", type: "nominal", sort: groups, scale: {domain: groups, range: colors}, legend: null})
```

## 10 · A mean-only performance prototype

```javascript
meanSpec = ({
  width: 540, height: 310, data: {values: summary},
  encoding: {
    x: {field: "group", type: "nominal", sort: groups,
      title: null},
    y: {field: "performance", type: "quantitative",
      title: "Exercise score (%)",
      scale: {domain: [0, 100]}}, color: condition},
  layer: [
    {mark: {type: "point", shape: "diamond",
      filled: true, size: 220}},
    {mark: {type: "text", dy: -20, fontSize: 20},
      encoding: {text: {field: "performance",
        format: ".2f"}}}
  ]
})
```

## 11 · Mean-only view

```javascript
meanFigure = draw(meanSpec)
```

## 12 · Preserve exact values; count repeated observations

```javascript
frequency = (field) => groups.flatMap((group, index) => {
  const rows = data.filter(d => d.group === group);
  const values = [...new Set(rows.map(d => d[field]))]
    .sort((a,b) => a-b);
  return values.map(value => ({group, index, value,
    count: rows.filter(d => d[field] === value).length}));
})
```

## 13 · Direct group labels include sample sizes

```javascript
groupAxis = ({values: [0, 1, 2], title: null, grid: false, tickSize: 0,
  labelLineHeight: 20, labelOverlap: false,
  labelExpr: "[['No AI', 'n = 96'], ['Iris', 'n = 91'], ['ChatGPT', 'n = 88']][datum.value]"})
```

## 14 · Discrete frequency view

```javascript
frequencySpec = (field, domain, title, width = 150, height = 340) => {
  const counts = frequency(field);
  const isGain = field === "gain";
  const values = isGain ? Array.from({length: 13}, (_, i) => i - 6)
    : [...new Set(counts.map(d => d.value))].sort((a,b) => a-b);
  const maxCount = Math.ceil(Math.max(...counts.map(d => d.count)) / 10) * 10;
  const padding = isGain ? 0.5 : (domain[1] - domain[0]) * 0.05;
  return {
    hconcat: groups.map((group, index) => {
      const stats = summary.find(d => d.group === group);
      const rows = values.map(value => ({group, value,
        count: counts.find(d => d.group === group && d.value === value)?.count ?? 0}));
      const meanRow = {value: stats[field], label: "Mean " + stats[field].toFixed(2)};
      return {
        title: {text: group, subtitle: "n = " + stats.n,
          color: colors[index], fontSize: 19, offset: 10,
          subtitleFontSize: 15, subtitlePadding: 4},
        width, height, data: {values: rows},
        encoding: {y: {field: "value", type: "quantitative",
          scale: {domain: [domain[0] - padding, domain[1] + padding], nice: false},
          axis: {title: index === 0 ? title : null, values,
            labels: index === 0, ticks: index === 0, domain: index === 0,
            grid: false, format: ".1~f", labelFontSize: 16,
            labelOverlap: false, labelPadding: 4, titlePadding: 8}}},
        layer: [
          {mark: {type: "bar", orient: "horizontal", color: colors[index], size: 14},
            encoding: {x: {field: "count", type: "quantitative",
              scale: {domain: [0, maxCount], nice: false},
              axis: {title: "Students", values: [0, maxCount / 2, maxCount],
                labelFontSize: 16, labelOverlap: false, titleFontSize: 17, titlePadding: 8}},
              tooltip: [{field: "group"}, {field: "value", title},
                {field: "count", title: "Students"}]}},
          {data: {values: [meanRow]},
            mark: {type: "rule", color: "#17233c", strokeDash: [5, 4], strokeWidth: 2}},
          {data: {values: [meanRow]},
            mark: {type: "text", align: "right", baseline: "bottom",
              dx: -3, dy: isGain ? -15 : -5,
              fontSize: isGain ? 14 : 15, fontWeight: "bold", color: "#17233c"},
            encoding: {x: {datum: maxCount, type: "quantitative"},
              text: {field: "label"}}}
        ]
      };
    }),
    spacing: 18,
    resolve: {scale: {x: "shared", y: "shared"}}
  };
}
```

## 15 · Performance frequencies and means

```javascript
performanceSpec = ({
  ...frequencySpec("performance", [0, 100], "Exercise score (%)"),
  title: {text: "A  Exercise performance"}
})
```

## 16 · Performance distribution

```javascript
performanceFigure = draw(performanceSpec)
```

## 17 · Pre/post pairs preserve each starting score

```javascript
pairedSpec = {
  const paths = groups.flatMap(group => {
    const counts = new Map();
    for (const d of data.filter(d => d.group === group)) {
      const key = `${d.pre}:${d.post}`;
      if (!counts.has(key)) counts.set(key,
        {group, pre: d.pre, post: d.post, path: key, count: 0});
      counts.get(key).count += 1;
    }
    return [...counts.values()];
  }).sort((a, b) => a.count - b.count);
  const maxCount = Math.max(...paths.map(d => d.count));
  return {
    title: {text: "Supplement: pretest and posttest",
      subtitle: "Darker line = more students on the same path"},
    data: {values: paths},
    transform: [{fold: ["pre", "post"], as: ["time", "score"]}],
    facet: {column: {field: "group", sort: groups, title: null,
      header: {labelFontSize: 19, labelColor: "#17233c"}}},
    spacing: 24,
    spec: {width: 150, height: 340,
      mark: {type: "line", strokeWidth: 2.5, opacity: 1},
      encoding: {
        x: {field: "time", type: "ordinal", sort: ["pre", "post"],
          title: null, scale: {padding: 0.2}},
        y: {field: "score", type: "quantitative",
          scale: {domain: [0, 6], nice: false},
          title: "Correct items", axis: {values: [0,1,2,3,4,5,6]}},
        detail: {field: "path", type: "nominal"},
        color: {field: "count", type: "quantitative",
          scale: {domain: [1, maxCount], nice: false,
            range: ["#b0bfd7", "#17233c"]},
          legend: {title: "Students on path", orient: "bottom",
            direction: "horizontal", gradientLength: 220, titleLimit: 240,
            values: [1, 4, 8, 12, 16], format: "d"}},
        tooltip: [{field: "group", title: "Group"},
          {field: "pre", title: "Pretest"},
          {field: "post", title: "Posttest"},
          {field: "count", title: "Students"}]
      }},
    resolve: {scale: {y: "shared", color: "shared"}}
  };
}
```

## 18 · Paired alternative

```javascript
pairedFigure = draw(pairedSpec)
```

## 19 · Reproducible pseudo-random generator

```javascript
rng = (seed) => () => {
  seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
  return seed / 4294967296;
}
```

## 20 · Linearly interpolated percentile

```javascript
quantile = (sorted, p) => {
  const x = (sorted.length - 1) * p, i = Math.floor(x);
  return sorted[i] + (sorted[Math.min(i + 1, sorted.length - 1)] - sorted[i]) * (x - i);
}
```

## 21 · Participant bootstrap, preserving pre/post pairing

```javascript
boot = {
  const random = rng(20260922), B = 10000;
  const draws = groups.map(group => {
    const rows = data.filter(d => d.group === group);
    return Array.from({length: B}, () => {
      const gains = Array.from({length: rows.length}, () => {
        const person = rows[Math.floor(random() * rows.length)];
        return person.post - person.pre;
      });
      return mean(gains);
    });
  });
  const interval = values => {
    const sorted = values.slice().sort((a,b) => a-b);
    return {lo: quantile(sorted, 0.025), hi: quantile(sorted, 0.975)};
  };
  return {
    means: summary.map((d, i) => ({...d, ciX: i - 0.42, ...interval(draws[i])})),
    differences: [1, 2].map(i => ({group: groups[i], comparison: groups[i] + " - No AI",
      estimate: summary[i].gain - summary[0].gain,
      ...interval(draws[i].map((v, b) => v - draws[0][b]))})),
    B, seed: 20260922, method: "95% percentile bootstrap; participants within groups"
  };
}
```

## 22 · Knowledge gain frequencies and group means

```javascript
gainSpec = ({
  ...frequencySpec("gain", [-6, 6], "Knowledge gain (points)"),
  title: {text: "B  Knowledge gains"}
})
```

## 23 · Gain distribution and confidence intervals

```javascript
gainFigure = draw(gainSpec)
```

## 24 · Intervals for the comparisons

```javascript
differenceSpec = ({width: 560, height: 160,
  title: {text: "Mean gain difference versus No AI", subtitle: "Classroom estimates; unadjusted 95% bootstrap intervals"},
  layer: [{data: {values: [{}]}, mark: {type: "rule", color: "#a1a7b3", strokeDash: [4,4]},
    encoding: {x: {datum: 0}}},
    {data: {values: boot.differences}, mark: {type: "rule", strokeWidth: 3},
      encoding: {x: {field: "lo", type: "quantitative", title: "Difference in gain (points)", scale: {domain: [-0.8,0.8]}},
        x2: {field: "hi"}, y: {field: "comparison", sort: ["Iris - No AI","ChatGPT - No AI"], title: null, axis: {labelLimit: 220}}, color: condition}},
    {data: {values: boot.differences}, mark: {type: "point", filled: true, size: 150},
      encoding: {x: {field: "estimate", type: "quantitative"},
        y: {field: "comparison", sort: ["Iris - No AI","ChatGPT - No AI"]}, color: condition}}
  ]})
```

## 25 · Comparison estimates

```javascript
differenceFigure = draw(differenceSpec)
```

## 26 · The five response proportions

```javascript
responses = groups.flatMap(group => {
  const rows = data.filter(d => d.group === group);
  let start = 0;
  return [1,2,3,4,5].map(level => {
    const count = rows.filter(d => d.frustration === level).length;
    const proportion = count / rows.length, end = start + proportion;
    const out = {group, level, count, proportion, start, end, middle: (start + end) / 2};
    start = end;
    return out;
  });
})
```

## 27 · Preserve the ordered response categories

```javascript
frustrationSpec = ({width: 340, height: 340, data: {values: responses},
  title: {text: "C  Reported frustration", subtitle: "Five response levels; lower = less"},
  encoding: {
    x: {field: "group", type: "nominal", sort: groups, title: null},
    y: {field: "start", type: "quantitative", title: "Responses (%)",
      scale: {domain: [0,1]}, axis: {format: ".0%"}},
    color: {field: "level", type: "ordinal", sort: [1,2,3,4,5],
      scale: {domain: [1,2,3,4,5], range: ["#fff3df","#fedbb2","#f3b981","#d58c50","#9a502c"]},
      legend: {title: "Response level", direction: "horizontal"}},
    tooltip: [{field: "group"},{field: "level"},{field: "count"}, {field: "proportion", format: ".1%"}]},
  layer: [{mark: {type: "bar", width: 64, stroke: "white", strokeWidth: 1},
    encoding: {y2: {field: "end"}}},
    {mark: {type: "text", fontSize: 16}, encoding: {
      y: {field: "middle", type: "quantitative"}, text: {field: "proportion", format: ".0%"},
      color: {condition: {test: "datum.level >= 4", value: "white"}, value: "#17233c"},
      opacity: {condition: {test: "datum.proportion >= 0.06", value: 1}, value: 0}}}]
})
```

## 28 · Frustration proportions

```javascript
frustrationFigure = draw(frustrationSpec)
```

## 29 · Standardized alternative relative to No AI

```javascript
overviewRows = ["performance", "gain", "frustration"].flatMap(metric => {
  const base = data.filter(d => d.group === "No AI").map(d => d[metric]);
  const center = mean(base);
  const sd = Math.sqrt(base.reduce((s,x) => s + (x-center)**2, 0) / (base.length-1));
  return summary.map(d => ({group: d.group, metric,
    standardized: (d[metric] - center) / sd}));
})
```

## 30 · One common numerical scale

```javascript
overviewSpec = ({width: 470, height: 255, data: {values: overviewRows},
  title: {text: "Means relative to No AI", subtitle: "Difference divided by No AI sample SD"},
  layer: [{mark: {type: "rule", color: "#a1a7b3"}, encoding: {x: {datum: 0}}},
    {mark: {type: "point", filled: true, size: 120}, encoding: {
      x: {field: "standardized", type: "quantitative", title: "No AI standard deviations", scale: {domain: [-1.2,1.4]}},
      y: {field: "metric", type: "nominal", sort: ["performance","gain","frustration"], title: null},
      yOffset: {field: "group", sort: groups}, color: {...condition, legend: {title: null}}}}]
})
```

## 31 · Standardized overview

```javascript
overviewFigure = draw(overviewSpec)
```

## 32 · Align the outcomes and supplement in two rows

```javascript
finalSpec = {
  function bars(s,isGain){
   s.title={frame:"group",text:isGain?'Knowledge gains':'Exercise performance',fontSize:22,offset:16};
   for(const p of s.hconcat){
    p.width=140;p.height=140;
    p.title={frame:"group",text:p.title.text,color:p.title.color,fontSize:17,offset:8};
    Object.assign(p.encoding.y.axis,{labelFontSize:13,titleFontSize:13,labelPadding:3,titlePadding:6});
    if(isGain)p.encoding.y.axis.values=[-6,-4,-2,0,2,4,6];
    if(p.encoding.y.axis.title)p.encoding.y.axis.title=isGain?"Gain (points)":"Score (%)";
    p.layer[0].mark.size=7;
    Object.assign(p.layer[0].encoding.x.axis,{labelFontSize:13,titleFontSize:14,titlePadding:4,labelPadding:3});
    Object.assign(p.layer[2].mark,{fontSize:13,dy:isGain?-9:-4});
   }
   s.spacing=18;return s;
  }
  const performance = bars(structuredClone(performanceSpec), false);
  const gain = bars(structuredClone(gainSpec), true);
  const frustration = structuredClone(frustrationSpec);
  const paired = structuredClone(pairedSpec);
  frustration.width=440;frustration.height=140;
  frustration.title={frame:'group',text:'Reported frustration',subtitle:'Five response levels; lower = less',fontSize:22,subtitleFontSize:13,offset:13,subtitlePadding:9};
  frustration.encoding.x.axis={labelFontSize:14,labelPadding:4};
  frustration.encoding.y.axis={format:'.0%',values:[0,.5,1],labelFontSize:13,titleFontSize:13,labelPadding:3,titlePadding:6};
  frustration.encoding.color.legend={...frustration.encoding.color.legend,title:null,offset:6,labelFontSize:13};
  frustration.layer[1].mark.fontSize=13;
  paired.title={frame:'group',text:'Supplement: pretest and posttest',fontSize:22,offset:16};
  paired.facet.column.header={labelFontSize:17,labelColor:'#17233c',labelFontWeight:'bold',labelPadding:3};
  paired.spec.width=130;paired.spec.height=140;
  paired.spec.encoding.x.axis={labelFontSize:13,labelPadding:4};
  paired.spec.encoding.y.axis={values:[0,1,2,3,4,5,6],labelFontSize:13,titleFontSize:13,labelPadding:3,titlePadding:6};
  paired.spec.encoding.color.legend={...paired.spec.encoding.color.legend,title:['Students','on path'],orient:'right',direction:'vertical',titleFontSize:13,labelFontSize:12,gradientLength:95,gradientThickness:10,offset:10,titleLimit:100};
  return {
    $schema: "https://vega.github.io/schema/vega-lite/v6.json",
    concat: [performance, frustration, gain, paired],
    columns: 2, align: "each", center: false, spacing: 24,
    resolve: {scale: {x: "independent", y: "independent", color: "independent"}}
  };
}
```

## 33 · Completed evidence figure

```javascript
finalFigure = draw(finalSpec)
```

## 34 · Check the data before reading the figure

```javascript
sampleCheck = ({
  participants: data.length,
  groups: summary.map(d => ({group: d.group, n: d.n})),
  pairingOK: data.every(d => d.gain === d.post - d.pre),
  uniqueIDs: new Set(data.map(d => d.pseudonym)).size
})
```

## 35 · Research context and qualified claim

```javascript
articleIntro = md`# Exercise performance and immediate learning with AI support

Bassner et al. studied an approximately 90-minute Java concurrency exercise in an introductory programming course. Students received no AI support, the Iris tutor, or unrestricted ChatGPT. Iris and ChatGPT also differed in access to course and code context.

In this short programming exercise, students in both AI-supported conditions achieved higher exercise scores and reported less frustration than the no-AI group, but the study did not detect greater immediate conceptual knowledge gains.

This is a classroom paraphrase of the results, not a quotation. The figure below uses the authors' retained analysis sample of 275 participants from 452 raw records.

[Paper](https://doi.org/10.1016/j.caeai.2025.100537) · [Data version](https://doi.org/10.5281/zenodo.20285307)`
```

## 36 · Read the evidence

```javascript
articleReading = md`## What the figure makes visible

Exercise-score means are 29.85%, 57.50% and 71.84% for No AI, Iris and ChatGPT. Three side-by-side horizontal bar charts share a vertical score axis and a horizontal 0–60 student-count scale. Bar lengths reveal concentration at each exact score; dashed horizontal lines mark group means. At 100%, the counts are 15, 28 and 52 students, respectively.

The response item is “I was frustrated during the exercise.” Levels 1–5 mean strongly disagree, disagree, neutral, agree and strongly agree. More agreement means more frustration. Numerical means, using the paper's scoring convention, are 4.09, 3.21 and 3.13. The proportions keep the ordinal response structure visible.

The lower-left view compares individual knowledge gains in three side-by-side horizontal bar charts. Knowledge gain runs from −6 to +6 on the vertical axis; horizontal bar length shows student counts on a common 0–40 scale. The mean gains are 0.85, 0.71 and 0.83 points, labeled directly above the corresponding dashed horizontal lines. Counts at zero are 35, 36 and 24 students. The paper's time-by-group interaction is p = .773. This is not an equivalence test.

The gain distributions do not retain starting scores. The lower-right supplemental paired-score view keeps both starting and ending scores. Each line groups students who share the same pretest and posttest scores; darker lines represent more students on a shared 1–16 count scale. The No AI 0-to-0 path represents 16 students, while the ChatGPT 4-to-5 path represents 5. These counts describe the observed paths, not an estimated AI effect. [Supplement: pretest and posttest](ai-programming-pairedFigure.svg).`
```

## 37 · An inspectable caption

```javascript
articleCaption = md`## Figure caption

Classroom redesign, recalculated from Zenodo record 20285307 (CC BY 4.0). The authors' filtering rules retain 275 of 452 participants: No AI n = 96, Iris n = 91, ChatGPT n = 88. All panels use those participants.

The upper-left view shows exercise-score distributions in three side-by-side horizontal bar charts, ordered No AI, Iris and ChatGPT. Vertical position shows each exact observed test-pass percentage on a shared numeric scale from 0 to 100. Bar length encodes student count on a common horizontal 0–60 scale. Small margins beyond the score endpoints keep the full bars visible. The nine observed scores are labeled at their numeric positions, so the unobserved 33.3% score leaves a gap. Group colors match the knowledge-gain panel; dashed horizontal lines and direct labels show arithmetic means. Sample sizes are listed above.

The upper-right view shows within-group proportions for the five response categories, ordered from 1 (strongly disagree) at the bottom to 5 (strongly agree) at the top. Labels are rounded percentages. The question is “I was frustrated during the exercise.” Frustration is an ordinal response. Its numerical mean assumes the paper's 1–5 scoring convention.

The lower-left view shows knowledge-gain distributions in three side-by-side horizontal bar charts, ordered No AI, Iris and ChatGPT. Vertical position shows each integer gain from −6 to +6; horizontal bar length shows student counts on a common 0–40 scale. Small margins keep endpoint bars visible. Group colors match the exercise-score view. Dashed horizontal lines mark arithmetic means, with numerical labels just above their right ends. The same group sizes apply to every view. These are counts, not proportions. Gain values preserve each student's amount of change but do not retain starting scores. Mean confidence intervals remain in the notebook calculations and reference table.

The lower-right supplemental paired-score view shows pretest and posttest scores on a shared 0–6 scale, separately for each group. One line represents each distinct starting–ending score pair. A common linear light-to-dark scale encodes 1–16 students per path. The 92 paths account for all 275 students (No AI 96, Iris 91, ChatGPT 88). Line widths are constant and lines are opaque, so crossings do not add darkness. Distinct paths may still cross or share an endpoint. Counts are not adjusted for group size.

Core counts and descriptive means match the paper's reported precision. The original R inferential models were not rerun. Significance claims come from the paper, Tables 4–8. Supplemental gain-difference intervals in this notebook are new, unadjusted classroom estimates, not the paper's tests. This short task and immediate test do not establish equal effects or long-term learning outcomes.`
```

## 38 · Sources and reproducibility

```javascript
articleScope = md`## Data, code and scope

[Original CSV](https://zenodo.org/records/20285307/files/merged_data_pseudonymized.csv?download=1), [author's preparation script](https://zenodo.org/records/20285307/files/1_dataPrep.R?download=1) and [questionnaire](https://zenodo.org/records/20285307/files/survey_questions.json?download=1). The raw CSV has 452 unique participants and 76 columns. Its MD5 is 5e77465a489bd77ab9e24a295a37144e.

The course package includes the Python translation, the original R files, the complete ordered exclusion log and all checked means. The age, gender and experience exclusions are the authors' analysis choices. Similar retained group sizes do not establish that exclusions introduced no bias.

Paper: Bassner, Lenk-Ostendorf, Beinstingel, Wasner and Krusche (2026), Computers and Education: Artificial Intelligence, 10, 100537. [DOI](https://doi.org/10.1016/j.caeai.2025.100537). Figures 3 and 4 and data record 20285307: CC BY 4.0. Vega-Lite and Vega-Embed: BSD-3-Clause.`
```
