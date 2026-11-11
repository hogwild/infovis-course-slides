// A fresh frame owns each run's DOM, data, simulations, and event handlers.
(() => {
  const simulations = new Set();
  let token;
  let failed = false;
  let started = false;
  function stop() { simulations.forEach(simulation => simulation.stop()); }
  function report(action, error) {
    parent.postMessage({channel: 'teaching-preview', token, action, error}, '*');
  }
  function fail(error) {
    failed = true;
    stop();
    report('error', error?.name ? `${error.name}: ${error.message}` : String(error));
  }
  // Install before D3 captures requestAnimationFrame. Catch exceptions here so
  // file:// browsers do not reduce callback errors to an opaque "Script error".
  function guard(callback) {
    if (typeof callback !== 'function') return callback;
    return function (...args) {
      if (failed) return;
      try { return callback.apply(this, args); }
      catch (error) { fail(error); }
    };
  }
  for (const method of ['requestAnimationFrame', 'setTimeout', 'setInterval']) {
    const schedule = window[method].bind(window);
    window[method] = (callback, ...args) => schedule(guard(callback), ...args);
  }
  window.addEventListener('error', event => {
    event.preventDefault();
    fail(event.error || event.message);
  });
  window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
    fail(event.reason);
  });
  window.addEventListener('pagehide', stop);
  window.addEventListener('message', event => {
    const message = event.data;
    if (event.source !== parent || message?.channel !== 'teaching-preview'
      || message.action !== 'run' || started) return;
    started = true;
    token = message.token;
    try {
      if (!window.d3 || !window.CITIBIKE_DATA) throw new Error('D3 or Citi Bike data could not load.');
      const svg = document.querySelector('svg');
      svg.setAttribute('viewBox', message.viewBox);
      svg.setAttribute('aria-label', message.label);
      document.body.classList.toggle('draggable', message.draggable);
      const createSimulation = d3.forceSimulation;
      d3.forceSimulation = (...args) => {
        const simulation = createSimulation(...args);
        simulations.add(simulation);
        return simulation;
      };
      new Function(message.code + '\n//# sourceURL=classroom-example.js')();
      // Give an animated layout its first tick before displaying the frame.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (!failed) report('ready');
      }));
    } catch (error) {
      fail(error);
    }
  });
})();
