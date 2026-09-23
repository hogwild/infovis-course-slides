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
