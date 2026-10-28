const daily = [
  {date: "Apr 1", rides: 299},
  {date: "Apr 2", rides: 219},
  {date: "Apr 3", rides: 149}
];
const svg = d3.select("#chart");
// Available bar width: 520 - 100 (dates) - 100 (counts) = 320.
const x = d3.scaleLinear().domain([0, 400]).range([0, 320]);
daily.forEach((day, i) => {
  svg.append("rect")
    .attr("x", 100).attr("y", 40 + i * 60)
    .attr("width", x(day.rides)).attr("height", 30)
    .attr("fill", "steelblue");
  svg.append("text")
    .attr("x", 90).attr("y", 60 + i * 60)
    .attr("text-anchor", "end").text(day.date);
  svg.append("text")
    .attr("x", 108 + x(day.rides))
    .attr("y", 60 + i * 60).text(day.rides);
});
