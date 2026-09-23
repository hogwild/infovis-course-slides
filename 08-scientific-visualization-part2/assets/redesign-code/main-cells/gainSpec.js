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
