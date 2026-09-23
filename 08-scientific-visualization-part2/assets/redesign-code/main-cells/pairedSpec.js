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
