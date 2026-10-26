'use strict';
// This Part 1 example updates prepared elements with native browser APIs.
// There is no D3 dependency, data join, scroll listener, or scroll observer.
const state = { activeChapter: 'overview' };
let daily = [];
let summary = null;
const buttons = [...document.querySelectorAll('button[data-chapter]')];
const title = document.querySelector('#chapter-title');
const status = document.querySelector('#data-status');
const permittedChapters = ['overview', 'daily-calendar'];

function setActiveChapter(id) {
  if (!permittedChapters.includes(id)) throw new Error(`Unknown chapter: ${id}`);
  state.activeChapter = id;
  render();
}

function render() {
  const calendarIsActive = state.activeChapter === 'daily-calendar';
  document.querySelector('#overview-graphic').hidden = calendarIsActive;
  document.querySelector('#calendar-graphic').hidden = !calendarIsActive;
  title.textContent = calendarIsActive ? 'Daily calendar · same trip population' : 'Overview · published trip records';
  buttons.forEach(button => {
    const isActive = button.dataset.chapter === state.activeChapter;
    button.setAttribute('aria-pressed', String(isActive));
    button.classList.toggle('active', isActive);
  });
  document.querySelector('#chapter-caption').textContent = calendarIsActive ? 'One date per cell · fill and number show rides.' : 'Each source row represents one published trip.';
  document.querySelectorAll('.narrative section').forEach(section => {
    section.dataset.active = String(section.id === state.activeChapter);
  });
  // Both narrative sections stay in document flow. This setter does not scroll.
}

async function loadData() {
  try {
    const [dailyResponse, summaryResponse] = await Promise.all([
      fetch('data/daily.json'), fetch('data/summary.json')
    ]);
    if (!dailyResponse.ok || !summaryResponse.ok) throw new Error('A local data file could not be loaded.');
    [daily, summary] = await Promise.all([dailyResponse.json(), summaryResponse.json()]);
    const dates = new Set(daily.map(day => day.date));
    const total = daily.reduce((sum, day) => sum + day.rides, 0);
    if (daily.length !== 30 || dates.size !== 30 || total !== summary.acceptedTrips || !daily.every(day => /^2020-04-\d{2}$/.test(day.date) && Number.isInteger(day.rides) && day.rides >= 0 && typeof day.isWeekend === 'boolean')) {
      throw new Error('Daily data failed the documented coverage, type, or total check.');
    }
    document.querySelector('#ride-total').textContent = total.toLocaleString('en-US');
    document.querySelector('#weekday-mean').textContent = summary.weekdayMean.toLocaleString('en-US', {maximumFractionDigits:2});
    document.querySelector('#weekend-mean').textContent = summary.weekendMean.toLocaleString('en-US', {maximumFractionDigits:2});
    // Inspect and update existing SVG titles, rather than create data-driven marks.
    daily.forEach(day => {
      const cell = document.querySelector(`rect.day[data-date="${day.date}"]`);
      if (!cell) throw new Error(`Prepared SVG is missing ${day.date}.`);
      const printedCount = Number(cell.closest('.day-group').querySelector('.count-label').textContent);
      if (printedCount !== day.rides) throw new Error(`Prepared SVG and daily data disagree for ${day.date}; rerun prepare.py.`);
      cell.setAttribute('aria-label', `${day.date}: ${day.rides} rides`);
      cell.querySelector('title').textContent = `${day.date}: ${day.rides} rides`;
    });
    status.textContent = `${total.toLocaleString('en-US')} trips · ${daily.length} dates · daily counts reconcile with overview`;
    buttons.forEach(button => { button.disabled = false; });
    render();
  } catch (error) {
    status.textContent = error.message + (location.protocol === 'file:' ? ' Open the supplied local-server URL; local-file mode cannot fetch JSON.' : '');
    status.classList.add('error');
  }
}

buttons.forEach(button => button.addEventListener('click', () => setActiveChapter(button.dataset.chapter)));
window.setActiveChapter = setActiveChapter;
window.citiBikeDemo = { state, render, setActiveChapter, get daily() { return daily; }, get summary() { return summary; } };
render();
loadData();
