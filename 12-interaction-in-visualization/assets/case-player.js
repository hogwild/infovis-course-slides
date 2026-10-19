/* Load a public case only when the teacher requests it. */
(() => {
  const timers = new WeakMap();
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-case-start], [data-case-stop]');
    if (!button) return;
    event.stopPropagation();
    const player = button.closest('.i12-case-player');
    const screen = player.querySelector('.i12-case-screen');
    const snapshot = screen.querySelector('img');
    const start = player.querySelector('[data-case-start]');
    const stop = player.querySelector('[data-case-stop]');
    const status = player.querySelector('.i12-case-status');
    clearTimeout(timers.get(player));

    if (button === stop) {
      screen.querySelector('iframe')?.remove();
      snapshot.hidden = false;
      start.disabled = false;
      stop.disabled = true;
      status.textContent = 'Screenshot';
      start.focus();
      return;
    }

    if (!navigator.onLine) {
      status.textContent = 'Offline · screenshot available';
      return;
    }

    const frame = document.createElement('iframe');
    frame.title = player.dataset.caseTitle;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allow = 'fullscreen';
    frame.hidden = true;
    start.disabled = true;
    stop.disabled = false;
    status.textContent = 'Loading online demo…';
    frame.addEventListener('load', () => {
      if (!frame.isConnected) return;
      clearTimeout(timers.get(player));
      snapshot.hidden = true;
      frame.hidden = false;
      status.textContent = 'Live view';
    }, { once: true });
    frame.src = player.dataset.caseUrl;
    screen.append(frame);
    stop.focus();
    timers.set(player, setTimeout(() => {
      if (!frame.isConnected || !frame.hidden) return;
      frame.remove();
      snapshot.hidden = false;
      start.disabled = false;
      stop.disabled = true;
      status.textContent = 'Use screenshot or open website';
      start.focus();
    }, 25000));
  });

  document.addEventListener('keydown', event => {
    if (event.target.closest('.i12-case-toolbar') && ['Enter', ' '].includes(event.key)) {
      event.stopPropagation();
    }
  });
})();
