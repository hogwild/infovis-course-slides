/* Plain JavaScript + D3. The same radius function controls marks and collisions. */
(() => {
  const {width, height} = ForceExample;
  const graph = d3.select('#chart').append('g');
  const mode = document.getElementById('layout-mode');
  const metric = document.getElementById('activity-metric');
  const labelToggle = document.getElementById('show-labels');
  let simulation;
  let circles;
  let labels;
  let radius;
  let updatePositions;

  // 1. Keep the metric independent of static versus dynamic rendering.
  function prepareNodes() {
    return CITIBIKE_DATA.nodes.map(d => ({
      ...d,
      value: metric.value === 'total' ? d.arrivals + d.departures : d.arrivals
    }));
  }

  // 2. Position forces gather nodes; collision radii keep circles apart.
  function createSimulation(nodes) {
    return d3.forceSimulation(nodes)
      .velocityDecay(0.2)
      .force('x', d3.forceX(width / 2).strength(0.02))
      .force('y', d3.forceY(height / 2).strength(0.02))
      .force('collide', d3.forceCollide()
        .radius(d => radius(d.value)).iterations(2))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2))
      .stop().tick(1);
  }

  // 3. Draw circles with exactly the radii used by forceCollide.
  function drawBubbles(nodes) {
    circles = graph.append('g').selectAll('circle')
      .data(nodes).join('circle').attr('class', 'node')
      .attr('r', d => radius(d.value))
      .attr('fill', d => ForceExample.color(d.id))
      .attr('tabindex', 0).attr('role', 'img')
      .attr('aria-label', describeStation);
    circles.append('title').text(describeStation);
    circles.on('mouseenter focus', (event, d) => {
      d3.select('#details').text(describeStation(d));
    }).on('mouseleave blur', () => {
      d3.select('#details').text('Hover over or focus a bubble to inspect its station.');
    });
    labels = graph.append('g').selectAll('text')
      .data(nodes).join('text').attr('class', 'station-label')
      .attr('dy', '0.35em').text(d => d.name);
    updateLabels();

    return function updatePositions() {
      circles.attr('cx', d => d.x).attr('cy', d => d.y);
      labels.attr('x', d => d.x).attr('y', d => d.y);
    };
  }

  function describeStation(d) {
    const label = metric.value === 'total' ? 'arrivals + departures' : 'arrivals';
    return `${d.name} (${d.id}): ${d.value.toLocaleString()} ${label}`;
  }

  // 4. Reuse tick and drag behavior; manual static ticks need an explicit draw.
  function applyMode() {
    ForceExample.setMode(simulation, circles, updatePositions, mode.value, 1000);
  }

  function updateLabels() {
    labels.attr('display', d => labelToggle.checked && radius(d.value) >= 22 ? null : 'none');
  }

  function restartLayout() {
    if (simulation) simulation.stop();
    graph.selectAll('*').remove();
    const nodes = prepareNodes();
    radius = d3.scaleLinear().domain(d3.extent(nodes, d => d.value)).range([1, 100]);
    simulation = createSimulation(nodes);
    updatePositions = drawBubbles(nodes);
    simulation.on('tick', updatePositions);
    simulation.on('end.fit', () => ForceExample.fitView(circles));
    const label = metric.value === 'total' ? 'arrivals + departures' : 'arrivals';
    d3.select('#data-summary').text(`${nodes.length} stations · ${CITIBIKE_DATA.meta.tripCount.toLocaleString()} trips`);
    d3.select('#encoding').text(`Radius: linear scale of ${label} · Color: second digit of station ID`);
    d3.select('#details').text('Hover over or focus a bubble to inspect its station.');
    applyMode();
  }

  mode.addEventListener('change', applyMode);
  metric.addEventListener('change', restartLayout);
  labelToggle.addEventListener('change', updateLabels);
  document.getElementById('reset-layout').addEventListener('click', restartLayout);
  document.getElementById('fit-view').addEventListener('click', () => ForceExample.fitView(circles));
  window.addEventListener('pagehide', () => simulation.stop());
  window.addEventListener('pageshow', event => {if (event.persisted) applyMode();});
  restartLayout();
})();
