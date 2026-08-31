/**
 * Horizontal rail of day chips.
 *
 * The rail is a tablist whose single panel is the schedule card, so the arrow
 * keys behave the way a screen-reader user expects.
 */

import { ACCENT } from '../data/places.js';
import { accessibleLabel, dayOfMonth, weekday } from '../lib/dates.js';
import { escapeHtml } from '../lib/dom.js';

export class DayRail {
  /**
   * @param {HTMLElement} root      Container with `role="tablist"`.
   * @param {import('../data/itinerary.js').Day[]} days
   * @param {(index: number) => void} onSelect
   */
  constructor(root, days, onSelect) {
    this.root = root;
    this.days = days;
    this.onSelect = onSelect;
    this.#render();
  }

  /** @returns {HTMLButtonElement[]} */
  get chips() {
    return /** @type {HTMLButtonElement[]} */ ([...this.root.children]);
  }

  /**
   * Marks one chip as current and scrolls it into view.
   *
   * @param {number} index
   * @param {boolean} [scrollIntoView]
   */
  select(index, scrollIntoView = false) {
    this.chips.forEach((chip, position) => {
      chip.setAttribute('aria-selected', String(position === index));
      chip.tabIndex = position === index ? 0 : -1;
    });

    if (scrollIntoView) {
      this.chips[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  /** @param {number} index */
  chipId(index) {
    return `day-chip-${index}`;
  }

  #render() {
    this.root.innerHTML = this.days.map((day, index) => this.#chipMarkup(day, index)).join('');
    this.chips.forEach((chip, index) => {
      chip.addEventListener('click', () => this.onSelect(index));
      chip.addEventListener('keydown', (event) => this.#handleArrowKeys(event, index));
    });
  }

  /**
   * @param {import('../data/itinerary.js').Day} day
   * @param {number} index
   */
  #chipMarkup(day, index) {
    const classes = [
      'day-chip',
      day.accent === ACCENT.CLAY ? 'is-warm' : '',
      day.isTravelDay ? 'day-chip--travel' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const label = `${accessibleLabel(day.date)}, ${day.shortLabel}`;

    return `
      <button class="${classes}" type="button" role="tab" id="${this.chipId(index)}"
              aria-controls="schedule" aria-selected="false" tabindex="-1"
              aria-label="${escapeHtml(label)}">
        <span class="day-chip__weekday">${escapeHtml(weekday(day.date))}</span>
        <time class="day-chip__date" datetime="${day.date}">${escapeHtml(dayOfMonth(day.date))}</time>
        <span class="day-chip__label">${escapeHtml(day.shortLabel)}</span>
      </button>`;
  }

  /**
   * @param {KeyboardEvent} event
   * @param {number} index
   */
  #handleArrowKeys(event, index) {
    const lastIndex = this.days.length - 1;
    const target = {
      ArrowRight: index === lastIndex ? 0 : index + 1,
      ArrowLeft: index === 0 ? lastIndex : index - 1,
      Home: 0,
      End: lastIndex,
    }[event.key];

    if (target === undefined) {
      return;
    }

    event.preventDefault();
    this.onSelect(target);
    this.chips[target].focus();
  }
}
