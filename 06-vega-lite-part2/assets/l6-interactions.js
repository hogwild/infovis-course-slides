(function () {
  const data = { url: 'assets/cars.json' };
  const baseEncoding = {
    x: { field: 'Horsepower', type: 'quantitative' },
    y: { field: 'Miles_per_Gallon', type: 'quantitative', title: 'Miles per gallon' }
  };
  const config = {
    background: '#fffdf9',
    axis: { labelColor: '#64728c', titleColor: '#17233c', gridColor: '#dce2eb' },
    view: { stroke: '#dce2eb' }
  };
  const show = (id, spec, options = {}) => {
    const el = document.getElementById(id);
    if (!el || typeof vegaEmbed !== 'function') return;
    vegaEmbed(el, { $schema: 'https://vega.github.io/schema/vega-lite/v6.json', ...spec, config }, { actions: false, renderer: 'svg', ...options })
      .then(result => {
        window.__l6Views = window.__l6Views || {};
        window.__l6Views[id] = result.view;
        if (id === 'vl-intention' && !document.getElementById('l6-intention-tooltip-size')) {
          const style = document.createElement('style');
          style.id = 'l6-intention-tooltip-size';
          style.textContent = '#l6-intention-tooltip{font-size:16px;line-height:1.35}#l6-intention-tooltip td.value{max-width:260px}';
          document.head.appendChild(style);
        }
      });
  };
  document.addEventListener('DOMContentLoaded', () => {
    show('vl-intention', {
      width: 640, height: 370, data,
      params: [{ name: 'intentBrush', select: { type: 'interval', encodings: ['x'], translate: false, zoom: false } }],
      mark: { type: 'point', filled: true, size: 48 },
      encoding: {
        ...baseEncoding,
        x: { ...baseEncoding.x, axis: { labelFontSize: 14, titleFontSize: 16, tickCount: 5 } },
        y: { ...baseEncoding.y, axis: { labelFontSize: 14, titleFontSize: 16, tickCount: 5 } },
        color: { condition: { param: 'intentBrush', value: '#cc455a' }, value: '#c8cfda' },
        tooltip: [
          { field: 'Name', type: 'nominal' }, { field: 'Horsepower', type: 'quantitative' },
          { field: 'Miles_per_Gallon', type: 'quantitative', title: 'MPG' }, { field: 'Origin', type: 'nominal' }
        ]
      }
    }, { tooltip: { id: 'l6-intention-tooltip', styleId: 'l6-intention-tooltip-style' } });
    show('vl-tooltip', {
      width: 480, height: 260, data, mark: { type: 'point', filled: true, color: '#315cab' },
      encoding: { ...baseEncoding, tooltip: [
        { field: 'Name', type: 'nominal' }, { field: 'Horsepower', type: 'quantitative' },
        { field: 'Miles_per_Gallon', type: 'quantitative', title: 'MPG' }, { field: 'Origin', type: 'nominal' }
      ] }
    });
    show('vl-condition', {
      width: 480, height: 260, data,
      params: [{ name: 'chosen', select: 'point' }], mark: { type: 'point', filled: true },
      encoding: { ...baseEncoding, opacity: { condition: { param: 'chosen', value: 0.95 }, value: 0.18 }, color: { value: '#315cab' } }
    });
    show('vl-interval', {
      width: 480, height: 260, data,
      params: [{ name: 'brush', select: { type: 'interval', encodings: ['y'] } }], mark: { type: 'point', filled: true },
      encoding: { ...baseEncoding, color: { condition: { param: 'brush', value: '#cc455a' }, value: '#c8cfda' } }
    });
    show('vl-filter', {
      data,
      hconcat: [
        { width: 300, height: 230, params: [{ name: 'brush', select: { type: 'interval', encodings: ['y'] } }], mark: { type: 'point', filled: true }, encoding: { ...baseEncoding, color: { condition: { param: 'brush', value: '#cc455a' }, value: '#c8cfda' } } },
        { width: 300, height: 230, transform: [{ filter: { param: 'brush' } }], mark: { type: 'point', filled: true, color: '#315cab' }, encoding: baseEncoding }
      ]
    });
    const coordinated = {
      data,
      hconcat: [
        {
          width: 390, height: 260,
          params: [{ name: 'brush', select: { type: 'interval', encodings: ['y'] } }],
          mark: { type: 'point', filled: true },
          encoding: { ...baseEncoding, color: { condition: { param: 'brush', value: '#cc455a' }, value: '#c8cfda' } }
        },
        {
          width: 300, height: 260,
          transform: [{ filter: { param: 'brush' } }],
          mark: { type: 'bar', color: '#7656aa' },
          encoding: {
            x: { field: 'Horsepower', type: 'quantitative', bin: { step: 20, extent: [40, 240] }, title: 'Horsepower' },
            y: { aggregate: 'count', type: 'quantitative', title: 'Cars' }
          }
        }
      ]
    };
    show('vl-coordinated', coordinated);
  });
}());
