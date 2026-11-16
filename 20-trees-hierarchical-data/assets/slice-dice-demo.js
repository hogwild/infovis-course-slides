(() => {
  const titles = ["Start with one rectangle", "Split vertically into 9 and 6", "Split the 6-unit region horizontally", "Split the 9-unit region horizontally"];
  document.querySelectorAll('[data-slice-dice]').forEach(demo => {
    const image = demo.querySelector('[data-diagram]');
    const status = demo.querySelector('[data-status]');
    const previous = demo.querySelector('[data-action="previous"]');
    const next = demo.querySelector('[data-action="next"]');
    const render = step => {
      demo.dataset.step = String(step);
      image.src = `assets/slice-dice-step-${step + 1}.svg`;
      image.alt = titles[step];
      status.textContent = `${step + 1} / 4 · ${titles[step]}`;
      previous.disabled = step === 0;
      next.disabled = step === 3;
    };
    demo.querySelectorAll('button[data-action]').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const action = button.dataset.action;
        const current = Number(demo.dataset.step);
        render(action === 'restart' ? 0 : Math.max(0, Math.min(3, current + (action === 'next' ? 1 : -1))));
      });
      button.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') event.stopPropagation(); });
    });
    render(0);
  });
})();
