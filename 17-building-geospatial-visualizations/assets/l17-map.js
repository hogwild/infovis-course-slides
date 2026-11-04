(function () {
  const metricDefinitions = {
    rate: {
      label: 'requests per 1,000 residents',
      value: d => d.rate,
      format: d => d == null ? 'No reported request count' : `${d.toFixed(1)} per 1,000`
    },
    requests: {
      label: 'reported requests',
      value: d => d.requests,
      format: d => d == null ? 'No reported request count' : `${d3.format(',')(d)} requests`
    }
  };

  async function start() {
    if (typeof d3 === 'undefined') return;
    const svg = d3.select('#l17-live-map');
    if (svg.empty()) return;

    try {
      const [geo, rows] = await Promise.all([
        d3.json('assets/harbor-city.geojson'),
        d3.csv('assets/district-metrics.csv', d => ({
          district_id: d.district_id,
          requests: d.requests === '' ? null : Number(d.requests),
          population: Number(d.population)
        }))
      ]);

      const byId = new Map(rows.map(d => [d.district_id, {
        ...d,
        rate: d.requests == null ? null : d.requests / d.population * 1000
      }]));
      geo.features.forEach(feature => {
        feature.properties.metrics = byId.get(feature.properties.district_id) || null;
      });

      const width = 760;
      const height = 390;
      const projection = d3.geoMercator().fitExtent([[30, 28], [width - 205, height - 32]], geo);
      const path = d3.geoPath(projection);
      svg.attr('viewBox', `0 0 ${width} ${height}`);
      const mapLayer = svg.append('g');
      const legendLayer = svg.append('g').attr('transform', `translate(${width - 175},76)`);
      const status = document.getElementById('l17-map-status');

      function render(metricName) {
        const definition = metricDefinitions[metricName];
        const values = geo.features.map(f => definition.value(f.properties.metrics || {})).filter(Number.isFinite);
        const color = d3.scaleSequential(d3.interpolateBlues).domain(d3.extent(values));

        mapLayer.selectAll('path').data(geo.features, d => d.properties.district_id).join('path')
          .attr('d', path)
          .attr('fill', d => {
            const value = definition.value(d.properties.metrics || {});
            return Number.isFinite(value) ? color(value) : '#d9d9d9';
          })
          .attr('stroke', '#ffffff').attr('stroke-width', 2.2)
          .attr('tabindex', 0)
          .attr('role', 'img')
          .attr('aria-label', d => `${d.properties.name}: ${definition.format(definition.value(d.properties.metrics || {}))}`)
          .on('pointerenter focus', function (event, d) {
            d3.select(this).attr('stroke', '#c9455a').attr('stroke-width', 4);
            if (status) status.textContent = `${d.properties.name} · ${definition.format(definition.value(d.properties.metrics || {}))}`;
          })
          .on('pointerleave blur', function () {
            d3.select(this).attr('stroke', '#ffffff').attr('stroke-width', 2.2);
            if (status) status.textContent = `Metric: ${definition.label}`;
          });

        legendLayer.selectAll('*').remove();
        legendLayer.append('text').attr('x', 0).attr('y', -25).attr('font-size', 14).attr('font-weight', 700).attr('fill', '#17233c').text(definition.label);
        const ticks = d3.ticks(values[0] === undefined ? 0 : d3.min(values), values[0] === undefined ? 1 : d3.max(values), 4);
        legendLayer.selectAll('rect.swatch').data(ticks).join('rect').attr('class', 'swatch').attr('x', 0).attr('y', (d, i) => i * 33).attr('width', 26).attr('height', 24).attr('fill', d => color(d));
        legendLayer.selectAll('text.tick').data(ticks).join('text').attr('class', 'tick').attr('x', 36).attr('y', (d, i) => i * 33 + 17).attr('font-size', 13).attr('fill', '#4f5d73').text(d3.format(metricName === 'rate' ? '.1f' : ','));
        legendLayer.append('rect').attr('x', 0).attr('y', ticks.length * 33 + 7).attr('width', 26).attr('height', 24).attr('fill', '#d9d9d9');
        legendLayer.append('text').attr('x', 36).attr('y', ticks.length * 33 + 24).attr('font-size', 13).attr('fill', '#4f5d73').text('missing');
        if (status) status.textContent = `Metric: ${definition.label}`;
      }

      document.querySelectorAll('[data-l17-metric]').forEach(button => {
        button.addEventListener('click', event => render(event.currentTarget.dataset.l17Metric));
      });
      render('rate');
    } catch (error) {
      const status = document.getElementById('l17-map-status');
      if (status) status.textContent = 'Local files could not be loaded. Use the static map shown in the PDF fallback.';
    }
  }

  document.addEventListener('DOMContentLoaded', start);
}());
