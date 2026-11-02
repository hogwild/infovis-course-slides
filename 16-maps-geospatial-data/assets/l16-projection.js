(function () {
  const choices = {
    equalEarth: {label: 'Equal Earth · area comparison', make: () => d3.geoEqualEarth()},
    mercator: {label: 'Mercator · local angles', make: () => d3.geoMercator()},
    azimuthal: {label: 'Azimuthal equal-area · polar focus', make: () => d3.geoAzimuthalEqualArea().rotate([0, -90])}
  };

  async function start() {
    if (typeof d3 === 'undefined' || typeof topojson === 'undefined') return;
    const svg = d3.select('#l16-projection-map');
    if (svg.empty()) return;

    try {
      const topology = await d3.json('assets/countries-110m.json');
      const countries = topojson.feature(topology, topology.objects.countries);
      const width = 720;
      const height = 350;

      function render(name) {
        const choice = choices[name];
        const projection = choice.make().fitExtent([[18, 18], [width - 18, height - 18]], {type: 'Sphere'});
        const path = d3.geoPath(projection);
        svg.attr('viewBox', `0 0 ${width} ${height}`);
        svg.selectAll('*').remove();
        svg.append('path').datum({type: 'Sphere'}).attr('d', path).attr('fill', '#eef2f7').attr('stroke', '#768198');
        svg.append('path').datum(d3.geoGraticule10()).attr('d', path).attr('fill', 'none').attr('stroke', '#c8ced8').attr('stroke-width', 0.7);
        svg.append('g').selectAll('path').data(countries.features).join('path').attr('d', path).attr('fill', '#8fb7d8').attr('stroke', '#fff').attr('stroke-width', 0.35);
        const status = document.getElementById('l16-projection-status');
        if (status) status.textContent = choice.label;
      }

      document.querySelectorAll('[data-l16-projection]').forEach(button => {
        button.addEventListener('click', event => render(event.currentTarget.dataset.l16Projection));
      });
      render('equalEarth');
    } catch (error) {
      const status = document.getElementById('l16-projection-status');
      if (status) status.textContent = 'Projection data could not be loaded. Use the static comparison below.';
    }
  }

  document.addEventListener('DOMContentLoaded', start);
}());
