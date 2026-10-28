// Three days of Citi Bike trips in Jersey City, April 2020.
const daily = [
  {date: "Apr 1", rides: 299},
  {date: "Apr 2", rides: 219},
  {date: "Apr 3", rides: 149}
];
const svg = d3.select("#chart");
// Available bar width: 520 - 100 (dates) - 100 (counts) = 320.
const x = d3.scaleLinear().domain([0, 400]).range([0, 320]);

// Match records, create the missing rectangles, then set attributes.
svg.selectAll("rect")
  .data(daily)
  .enter().append("rect")
  .attr("x", 100)
  .attr("y", (d, i) => 40 + i * 60)
  .attr("width", d => x(d.rides))
  .attr("height", 30)
  .attr("fill", "steelblue");

// Use separate selections for date labels and count labels.
svg.selectAll("text.date-label")
  .data(daily)
  .enter().append("text")
  .attr("class", "date-label")
  .attr("x", 90)
  .attr("y", (d, i) => 60 + i * 60)
  .attr("text-anchor", "end")
  .text(d => d.date);

svg.selectAll("text.count-label")
  .data(daily)
  .enter().append("text")
  .attr("class", "count-label")
  .attr("x", d => 108 + x(d.rides))
  .attr("y", (d, i) => 60 + i * 60)
  .text(d => d.rides);
