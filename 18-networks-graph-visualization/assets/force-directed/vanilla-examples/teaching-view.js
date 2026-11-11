// Editable teaching source. Each run gets its own preview document and timers.
(() => {
  const source = document.getElementById('example-code').textContent;
  const lines = source.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n');
  const indent = Math.min(...lines.filter(line => line.trim())
    .map(line => line.match(/^\s*/)[0].length));
  const chart = document.querySelector('.chart-pane');
  const placeholder = chart.querySelector('svg');
  const status = document.getElementById('code-status');
  const config = {
    viewBox: placeholder.getAttribute('viewBox'),
    label: placeholder.getAttribute('aria-label'),
    draggable: chart.classList.contains('draggable')
  };
  const editor = CodeMirror(document.getElementById('code-editor'), {
    value: lines.map(line => line.slice(indent)).join('\n'),
    mode: 'javascript',
    theme: 'teaching',
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    tabSize: 2,
    screenReaderLabel: 'JavaScript source code. Changes automatically update the chart.',
    extraKeys: {
      Tab: 'insertSoftTab',
      'Shift-Tab': 'indentLess',
      'Ctrl-Enter': run,
      'Cmd-Enter': run
    }
  });
  let active = null;
  let pending = null;
  let revision = 0;
  let timer;
  let composing = false;

  function showStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state;
  }

  function removePreview(preview) {
    if (!preview) return;
    clearTimeout(preview.timeout);
    preview.frame.remove(); // Destroy this document, including its D3 timers.
  }

  function invalidatePending() {
    revision++;
    clearTimeout(timer);
    removePreview(pending);
    pending = null;
  }

  function scheduleRun() {
    invalidatePending();
    showStatus('Editing…', 'editing');
    if (!composing) timer = setTimeout(run, 450);
  }

  function run() {
    invalidatePending();
    const code = editor.getValue();
    try {
      // Parse first, so incomplete input never replaces a working preview.
      new Function(code);
    } catch (error) {
      showStatus(`${error.name}: ${error.message}`, 'error');
      return;
    }
    showStatus('Updating…', 'running');
    const frame = document.createElement('iframe');
    frame.className = 'preview-frame pending';
    frame.title = config.label;
    frame.src = 'teaching-preview.html';
    const candidate = {frame, token: revision};
    pending = candidate;
    frame.addEventListener('load', () => {
      if (pending !== candidate) return;
      frame.contentWindow.postMessage({
        channel: 'teaching-preview', action: 'run', token: candidate.token,
        code, ...config
      }, '*');
    }, {once: true});
    candidate.timeout = setTimeout(() => {
      if (pending !== candidate) return;
      removePreview(candidate);
      pending = null;
      showStatus('Preview could not load. Check the local example files.', 'error');
    }, 10000);
    chart.append(frame);
  }

  window.addEventListener('message', event => {
    const message = event.data;
    if (!message || message.channel !== 'teaching-preview') return;
    const candidate = [pending, active].find(preview => preview
      && event.source === preview.frame.contentWindow && message.token === preview.token);
    if (!candidate || candidate.token !== revision) return;
    if (message.action === 'error') {
      if (candidate === pending) {
        removePreview(candidate);
        pending = null;
      }
      showStatus(message.error, 'error');
    } else if (message.action === 'ready' && candidate === pending) {
      clearTimeout(candidate.timeout);
      removePreview(active);
      placeholder.remove();
      candidate.frame.classList.remove('pending');
      active = candidate;
      pending = null;
      showStatus('Updated · edits stay in this tab · Ctrl/⌘ + Enter to run', 'ready');
    }
  });

  editor.on('change', scheduleRun);
  editor.getInputField().addEventListener('compositionstart', () => {
    composing = true;
    invalidatePending();
  });
  editor.getInputField().addEventListener('compositionend', () => {
    composing = false;
    scheduleRun();
  });
  window.addEventListener('pagehide', () => {
    invalidatePending();
    removePreview(active);
    active = null;
  });
  window.addEventListener('pageshow', event => { if (event.persisted) run(); });
  run();
})();
