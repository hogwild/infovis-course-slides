# Citi Bike classroom examples

Open the HTML files directly in a browser; all runtime dependencies and data are local.

| View | Static | Dynamic / draggable |
|---|---|---|
| Node-link diagram | [forceLinkedGraph-static.html](forceLinkedGraph-static.html) | [forceLinkedGraph-dynamic.html](forceLinkedGraph-dynamic.html) |
| Bubble chart | [forceCollide-static.html](forceCollide-static.html) | [forceCollide-dynamic.html](forceCollide-dynamic.html) |

The chart appears on the left and editable, syntax-highlighted JavaScript on the right. Changes rerun automatically after about 450 ms, or with Ctrl/Command + Enter. Edits stay in the current tab; refreshing restores the saved example. Static examples have no dragging; dynamic examples allow nodes to be dragged.

The complete examples with controls are [Bubble graph](forceCollide.html) and [Node-link diagram](forceLinkedGraph.html). They link to each other through their top navigation.

## Data and dependencies

These are copies of the course examples in `reference/Lecture19_examples/vanilla_js/`. Data contains 9,268 April 2020 Citi Bike trips and 52 stations. Node-link diagrams show 865 connections after excluding same-station links. Full source and aggregation details are in [the lecture asset sources](../SOURCES.md) and the `meta` object in `citibike-data.js`.

The teaching bubble chart uses a square-root radius scale; its circle area represents arrivals. The complete bubble example with controls retains its original linear radius scale. Both teaching static examples compute 300 ticks before drawing.

- D3 v7.9.0: `vendor/d3.v7.9.0.min.js`, license in `vendor/LICENSE-d3-v7.txt`.
- CodeMirror 5.65.20: `vendor/codemirror-5.65.20/`, including its license and sources.
- `teaching-view.js` manages the editor; `teaching-preview.html` and `teaching-preview.js` execute each revision in a fresh iframe.
