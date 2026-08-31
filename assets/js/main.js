/**
 * Entry point: wires the day rail, the schedule card and the map together.
 *
 * The three views share one piece of state — the selected day, plus optionally
 * a selected step inside it — and the planner below is the only thing that
 * writes to it.
 */

import { DAYS } from './data/itinerary.js';
import { longLabel } from './lib/dates.js';
import { requireElement } from './lib/dom.js';
import { DayRail } from './ui/day-rail.js';
import { Schedule } from './ui/schedule.js';
import { Tabs } from './ui/tabs.js';
import { TripMap } from './ui/trip-map.js';

/** Leaflet needs a beat after a hidden container is revealed before it remeasures. */
const REFRESH_DELAY_MS = 200;

const MAP_PANEL_ID = 'p-mapa';

class TripPlanner {
  constructor() {
    this.dayIndex = 0;

    this.mapSubtitle = requireElement('#map-subtitle');
    this.previousButton = requireElement('#prev-day');
    this.nextButton = requireElement('#next-day');

    this.map = new TripMap({
      canvas: requireElement('#map-canvas'),
      caption: requireElement('#map-caption'),
      zoomLabel: requireElement('#map-zoom'),
      onPlaceSelect: (placeId) => this.#selectStepAtPlace(placeId),
    });

    this.rail = new DayRail(requireElement('#day-rail'), DAYS, (index) => this.selectDay(index));
    this.schedule = new Schedule(requireElement('#schedule'), (index) => this.selectStep(index));

    this.previousButton.addEventListener('click', () => this.selectDay(this.dayIndex - 1, true));
    this.nextButton.addEventListener('click', () => this.selectDay(this.dayIndex + 1, true));
  }

  start() {
    if (!this.map.mount()) {
      requireElement('#map-canvas').hidden = true;
      requireElement('#map-fallback').hidden = false;
    }

    this.selectDay(0);
    window.addEventListener('resize', () => this.map.refresh());
    this.refreshMap();
  }

  /**
   * Leaflet mismeasures a container that was hidden or has just changed size,
   * so remeasure it a beat after the layout settles.
   */
  refreshMap() {
    window.setTimeout(() => {
      this.map.refresh();
      this.map.showDay(DAYS[this.dayIndex]);
    }, REFRESH_DELAY_MS);
  }

  /**
   * @param {number} index
   * @param {boolean} [scrollRail] Whether to bring the chip into view.
   */
  selectDay(index, scrollRail = false) {
    if (index < 0 || index >= DAYS.length) {
      return;
    }

    this.dayIndex = index;
    const day = DAYS[index];

    this.rail.select(index, scrollRail);
    this.schedule.render(day, this.rail.chipId(index));
    this.map.showDay(day);

    this.mapSubtitle.textContent = longLabel(day.date);
    this.previousButton.disabled = index === 0;
    this.nextButton.disabled = index === DAYS.length - 1;
  }

  /** @param {number} stepIndex */
  selectStep(stepIndex) {
    const step = DAYS[this.dayIndex].steps[stepIndex];
    this.schedule.select(stepIndex);
    this.map.focusPlace(step ? step.placeId : null);
  }

  /**
   * Clicking a marker selects the matching step, so both views stay in sync.
   *
   * @param {string} placeId
   */
  #selectStepAtPlace(placeId) {
    const stepIndex = DAYS[this.dayIndex].steps.findIndex((step) => step.placeId === placeId);
    if (stepIndex < 0) {
      return;
    }

    this.selectStep(stepIndex);
    this.schedule.scrollTo(stepIndex);
  }
}

const planner = new TripPlanner();
planner.start();

const tabs = new Tabs(requireElement('.tabs__inner'), (panelId) => {
  if (panelId === MAP_PANEL_ID) {
    planner.refreshMap();
  }
});
tabs.selectFromHash();
