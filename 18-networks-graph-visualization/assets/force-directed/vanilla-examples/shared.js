// Small helpers shared by the two examples. D3 is loaded by the HTML page.
const ForceExample = {
  width: 960,
  height: 600,

  color(id) {
    const digit = Number(String(id)[1]);
    return d3.schemeCategory10[Number.isInteger(digit) ? digit : 0];
  },

  fitView(circles) {
    // Fit the camera to the layout without changing simulated coordinates.
    const marks = circles.nodes();
    const left = d3.min(marks, e => +e.getAttribute('cx') - +e.getAttribute('r'));
    const top = d3.min(marks, e => +e.getAttribute('cy') - +e.getAttribute('r'));
    const right = d3.max(marks, e => +e.getAttribute('cx') + +e.getAttribute('r'));
    const bottom = d3.max(marks, e => +e.getAttribute('cy') + +e.getAttribute('r'));
    const padding = 32;
    d3.select('#chart').attr('viewBox',
      `${left - padding} ${top - padding} ${right - left + 2 * padding} ${bottom - top + 2 * padding}`);
  },

  drag(simulation) {
    return d3.drag()
      .on('start', event => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on('drag', event => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on('end', event => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });
  },

  setMode(simulation, circles, updatePositions, mode, iterations) {
    circles.on('.drag', null);
    simulation.stop().alphaTarget(0);
    simulation.nodes().forEach(d => {d.fx = null; d.fy = null;});

    if (mode === 'static') {
      // Manual ticks do not dispatch tick events, so render explicitly.
      simulation.alpha(1).tick(iterations);
      updatePositions();
      ForceExample.fitView(circles);
    } else {
      circles.call(ForceExample.drag(simulation));
      updatePositions();
      // Keep enough space for the first animation, then fit on simulation end.
      d3.select('#chart').attr('viewBox', `-120 -120 ${ForceExample.width + 240} ${ForceExample.height + 240}`);
      simulation.alpha(1).restart();
    }
    d3.select('#chart').classed('is-dynamic', mode === 'dynamic');
    d3.select('#mode-status').text(mode === 'dynamic'
      ? 'Dynamic layout · Drag a station to move it.'
      : 'Static layout · Positions are fixed.');
  }
};
