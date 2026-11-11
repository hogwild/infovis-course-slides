/* Plain JavaScript + D3: data → simulation → SVG → updates and interaction. */
(() => {
  const {width, height} = ForceExample;
  const svg = d3.select('#chart');
  const graph = svg.append('g');
  const mode = document.getElementById('layout-mode');
  const labelToggle = document.getElementById('show-labels');
  let simulation;
  let circles;
  let labels;
  let updatePositions;

  // 1. Copy data: D3-force mutates node positions and edge endpoints.
  function prepareGraph() {
    return {
      nodes: CITIBIKE_DATA.nodes.map(d => ({...d, popularity: d.arrivals})),
      links: CITIBIKE_DATA.links
        .filter(d => d.source !== d.target)
        .map(d => ({...d}))
    };
  }

  // 2. Forces calculate coordinates; they do not draw SVG elements.
  function createSimulation(nodes, links) {
    return d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id).distance(d => 500 / d.value))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .stop().tick(1);
  }

  // 3. Create the marks. The returned function only updates coordinates.
  function drawGraph(nodes, links) {
    const radius = d3.scaleLinear()
      .domain(d3.extent(nodes, d => d.popularity)).range([5, 20]);
    const edges = graph.append('g').selectAll('line')
      .data(links).join('line').attr('class', 'edge')
      .attr('stroke-width', d => Math.sqrt(d.value));
    circles = graph.append('g').selectAll('circle')
      .data(nodes).join('circle').attr('class', 'node')
      .attr('r', d => radius(d.popularity))
      .attr('fill', d => ForceExample.color(d.id))
      .attr('tabindex', 0).attr('role', 'img')
      .attr('aria-label', describeStation);
    circles.append('title').text(describeStation);
    circles.on('mouseenter focus', (event, d) => {
      d3.select('#details').text(describeStation(d));
    }).on('mouseleave blur', () => {
      d3.select('#details').text('Hover over or focus a station to inspect its activity.');
    });
    labels = graph.append('g').selectAll('text')
      .data(nodes).join('text').attr('class', 'station-label')
      .attr('dy', d => -radius(d.popularity) - 6).text(d => d.name);
    updateLabels();

    return function updatePositions() {
      edges.attr('x1', d => d.source.x).attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x).attr('y2', d => d.target.y);
      circles.attr('cx', d => d.x).attr('cy', d => d.y);
      labels.attr('x', d => d.x).attr('y', d => d.y);
    };
  }

  function describeStation(d) {
    return `${d.name} (${d.id}): ${d.arrivals.toLocaleString()} arrivals, ${d.departures.toLocaleString()} departures`;
  }

  // 4. Dynamic mode updates on tick; static mode draws after manual ticks.
  function applyMode() {
    ForceExample.setMode(simulation, circles, updatePositions, mode.value, 5000);
  }

  function updateLabels() {
    labels.attr('display', labelToggle.checked ? null : 'none');
  }

  function restartLayout() {
    if (simulation) simulation.stop();
    graph.selectAll('*').remove();
    const {nodes, links} = prepareGraph();
    simulation = createSimulation(nodes, links);
    updatePositions = drawGraph(nodes, links);
    simulation.on('tick', updatePositions);
    simulation.on('end.fit', () => ForceExample.fitView(circles));
    d3.select('#data-summary').text(`${nodes.length} stations · ${links.length} connections · ${CITIBIKE_DATA.meta.tripCount.toLocaleString()} trips`);
    d3.select('#details').text('Hover over or focus a station to inspect its activity.');
    applyMode();
  }

  mode.addEventListener('change', applyMode);
  labelToggle.addEventListener('change', updateLabels);
  document.getElementById('reset-layout').addEventListener('click', restartLayout);
  document.getElementById('fit-view').addEventListener('click', () => ForceExample.fitView(circles));
  window.addEventListener('pagehide', () => simulation.stop());
  window.addEventListener('pageshow', event => {if (event.persisted) applyMode();});
  restartLayout();
})();
