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
