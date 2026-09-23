document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-vega-spec]').forEach(async node => {
    try {
      const response = await fetch(node.dataset.vegaSpec);
      const spec = await response.json();
      const specBaseURL = new URL('.', new URL(node.dataset.vegaSpec, document.baseURI)).href;
      const resolveLocalURLs = value => {
        if (Array.isArray(value)) {
          value.forEach(resolveLocalURLs);
          return;
        }
        if (!value || typeof value !== 'object') return;
        Object.entries(value).forEach(([key, child]) => {
          if (key === 'url' && typeof child === 'string' && !/^(?:[a-z]+:|\/)/i.test(child)) {
            value[key] = new URL(child, specBaseURL).href;
          } else {
            resolveLocalURLs(child);
          }
        });
      };
      resolveLocalURLs(spec);
      await vegaEmbed(node, spec, {actions: false, renderer: 'svg'});
    } catch (error) {
      node.textContent = 'Interactive rendering unavailable; use the static figure below.';
      console.error(error);
    }
  });
});
