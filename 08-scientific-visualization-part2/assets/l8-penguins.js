/* Progressive enhancement: each chart starts with its checked static SVG. */
(() => {
  async function start() {
    for (const pre of document.querySelectorAll('pre[data-cell]')) {
      const label = pre.previousElementSibling;
      const button = document.createElement('button');
      button.className = 'l8-pg-copy';
      button.textContent = 'Copy cell';
      button.setAttribute('aria-label', 'Copy Observable cell ' + pre.dataset.cell);
      button.addEventListener('click', async event => {
        event.stopPropagation();
        try {
          await navigator.clipboard.writeText(pre.querySelector('code').textContent);
          button.textContent = 'Copied';
        } catch {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(pre.querySelector('code'));
          selection.removeAllRanges(); selection.addRange(range);
          button.textContent = 'Select / copy';
        }
        setTimeout(() => { button.textContent = 'Copy cell'; }, 1800);
      });
      label.append(button);
    }
    if (typeof vegaEmbed !== 'function') return;
    const cache = new Map();
    await Promise.all([...document.querySelectorAll('[data-pg-spec]')].map(async figure => {
      try {
        const url = figure.dataset.pgSpec;
        if (!cache.has(url)) cache.set(url, fetch(url).then(response => {
          if (!response.ok) throw new Error(response.status + ' ' + url);
          return response.json();
        }));
        const spec = structuredClone(await cache.get(url));
        const result = await vegaEmbed(figure.querySelector('.l8-pg-live'), spec,
          {actions: false, renderer: 'svg'});
        const svg = figure.querySelector('.l8-pg-live svg');
        svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        figure.classList.add('l8-pg-ready');
        figure.dataset.renderStatus = 'ready';
        window.addEventListener('pagehide', () => result.view.finalize(), {once: true});
      } catch (error) {
        figure.dataset.renderStatus = 'fallback';
        console.error('Penguins chart kept its static fallback:', error);
      }
    }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
