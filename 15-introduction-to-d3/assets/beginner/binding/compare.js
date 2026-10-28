const daily = [
  {date: "Apr 1", rides: 299},
  {date: "Apr 2", rides: 219},
  {date: "Apr 3", rides: 149}
];
const x = d3.scaleLinear().domain([0, 400]).range([0, 320]);
{
  const svg = d3.select("#loop");
daily.forEach((d, i) => {
  svg.append("rect")
    .attr("x", 100)
    .attr("y", 40 + i * 60)
    .attr("width", x(d.rides))
    .attr("height", 30)
    .attr("fill", "steelblue");
});
}
{
  const svg = d3.select("#binding");
svg.selectAll("rect")
  .data(daily)
  .enter().append("rect")
  .attr("x", 100)
  .attr("y", (d, i) => 40 + i * 60)
  .attr("width", d => x(d.rides))
  .attr("height", 30)
  .attr("fill", "steelblue");
}
