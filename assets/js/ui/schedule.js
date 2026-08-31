/** Schedule card: the hour-by-hour list for the selected day. */

import { ACCENT } from '../data/places.js';
import { bindActivation, escapeHtml } from '../lib/dom.js';
import { renderIcon } from './icons.js';

export class Schedule {
  /**
   * @param {HTMLElement} root
   * @param {(stepIndex: number) => void} onStepSelect
   */
  constructor(root, onStepSelect) {
    this.root = root;
    this.onStepSelect = onStepSelect;
  }

  /**
   * Replaces the card with a new day and clears the step selection.
   *
   * @param {import('../data/itinerary.js').Day} day
   * @param {string} labelledBy Id of the day chip that opened this panel.
   */
  render(day, labelledBy) {
    this.root.className = `schedule${day.accent === ACCENT.CLAY ? ' is-warm' : ''}`;
    this.root.setAttribute('aria-labelledby', labelledBy);
    this.root.innerHTML = `
      <div class="schedule__top">
        <p class="schedule__zone">${escapeHtml(day.zone)}</p>
        <h3>${escapeHtml(day.title)}</h3>
        <p>${escapeHtml(day.intro)}</p>
      </div>
      <ol class="schedule__steps">${day.steps.map(stepMarkup).join('')}</ol>
      <p class="schedule__foot">${day.footnoteHtml}</p>`;

    this.#steps.forEach((step, index) => {
      bindActivation(step, () => this.onStepSelect(index));
    });
  }

  /**
   * Highlights one step. Any index outside the list clears the highlight.
   *
   * @param {number} index
   */
  select(index) {
    this.#steps.forEach((step, position) => {
      step.setAttribute('aria-current', String(position === index));
    });
  }

  /**
   * Brings a step into view without yanking the whole page around.
   *
   * @param {number} index
   */
  scrollTo(index) {
    this.#steps[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /** @returns {HTMLElement[]} */
  get #steps() {
    return [...this.root.querySelectorAll('.step')];
  }
}

/**
 * @param {import('../data/itinerary.js').Step} step
 * @returns {string}
 */
function stepMarkup(step) {
  const priceClass = step.price === 'grátis' ? 'step__price step__price--free' : 'step__price';

  return `
    <li class="step" tabindex="0" aria-current="false">
      <span class="step__time">${escapeHtml(step.time)}</span>
      <span class="step__icon">${renderIcon(step.icon, 19)}</span>
      <span class="step__text">
        <b>${escapeHtml(step.title)}</b>
        <em class="step__detail">${escapeHtml(step.detail)}</em>
      </span>
      <span class="${priceClass}">${escapeHtml(step.price)}</span>
    </li>`;
}
