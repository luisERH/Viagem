/**
 * Tiny pt-BR date formatter.
 *
 * Written by hand instead of `Intl` so the output is deterministic: the rail
 * needs the short weekday ("segunda"), not the full form ("segunda-feira").
 */

const WEEKDAYS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
const SHORT_MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/**
 * Parses `YYYY-MM-DD` as a local date, avoiding the UTC shift that
 * `new Date('2026-08-31')` would introduce.
 *
 * @param {string} isoDate
 * @returns {Date}
 */
function parseIsoDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * @param {string} isoDate
 * @returns {string} Two-digit day of the month, e.g. `"31"`.
 */
export function dayOfMonth(isoDate) {
  return String(parseIsoDate(isoDate).getDate()).padStart(2, '0');
}

/**
 * @param {string} isoDate
 * @returns {string} Three-letter month, e.g. `"ago"`.
 */
export function shortMonth(isoDate) {
  return SHORT_MONTHS[parseIsoDate(isoDate).getMonth()];
}

/**
 * @param {string} isoDate
 * @returns {string} Weekday without the `-feira` suffix, e.g. `"segunda"`.
 */
export function weekday(isoDate) {
  return WEEKDAYS[parseIsoDate(isoDate).getDay()];
}

/**
 * @param {string} isoDate
 * @returns {string} Human label used in the map caption, e.g. `"segunda 31 ago"`.
 */
export function longLabel(isoDate) {
  return `${weekday(isoDate)} ${dayOfMonth(isoDate)} ${shortMonth(isoDate)}`;
}

/**
 * @param {string} isoDate
 * @returns {string} Spelled-out label for screen readers, e.g.
 *   `"segunda, 31 de agosto"`.
 */
export function accessibleLabel(isoDate) {
  const date = parseIsoDate(isoDate);
  return `${weekday(isoDate)}, ${date.getDate()} de ${MONTHS[date.getMonth()]}`;
}
