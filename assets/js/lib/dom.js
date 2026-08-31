/** Small DOM helpers shared by the UI modules. */

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes text before it goes into an `innerHTML` template.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}

/**
 * Queries a required element and fails loudly when the markup drifts.
 *
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {HTMLElement}
 */
export function requireElement(selector, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) {
    throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
  }
  return element;
}

/**
 * Runs a callback on click and on Enter/Space, so a non-button element stays
 * reachable by keyboard.
 *
 * @param {HTMLElement} element
 * @param {() => void} handler
 */
export function bindActivation(element, handler) {
  element.addEventListener('click', handler);
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  });
}
