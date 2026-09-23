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
