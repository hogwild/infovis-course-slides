# Lecture 15 working examples

Open `index.html` for the D3 chart; open `events.html` for the DOM button. Both work offline, with the existing local D3 v7.9.0 library one directory above. `chart.js` is the complete chart program and runs once on page load. Reload after editing; do not append the program repeatedly to the same existing SVG.

## Verify the result
Three rectangles, left edge x=100, y=40/100/160, height=30, widths=239.2/175.2/119.2 pixels (allow floating-point rounding). Six text labels: Apr 1,299,Apr 2,219,Apr 3,149. Button changes text to 667.

Data: daily counts independently verified from `reference/citibike_storytelling_example/citibike_april.csv`, using starttime date; 9268 source trips, three-date subset totals667. Official data: https://citibikenyc.com/system-data . This subset describes bike use; it does not establish before/after lockdown change.

## Teaching references
- DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- D3 selections: https://d3js.org/d3-selection/modifying
- D3 linear scales: https://d3js.org/d3-scale/linear

## Exercise answer
Inside the forEach callback, before appending a rectangle:

```js
let color = "steelblue";
if (day.rides > 250) {
  color = "coral";
}
```

Replace the rectangle's fill call with `.attr("fill", color)`. Only Apr1 changes color; all coordinates and labels remain unchanged.
