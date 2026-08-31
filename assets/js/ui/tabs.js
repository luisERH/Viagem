/**
 * Section tabs at the top of the page.
 *
 * Keeps the URL hash in sync so a section can be linked to directly.
 */

const TAB_ID_PREFIX = 't-';

export class Tabs {
  /**
   * @param {HTMLElement} root Container with `role="tablist"`.
   * @param {(panelId: string) => void} [onChange] Called after each switch.
   */
  constructor(root, onChange = () => {}) {
    this.tabs = /** @type {HTMLButtonElement[]} */ ([...root.querySelectorAll('[role="tab"]')]);
    this.onChange = onChange;

    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.select(tab));
      tab.addEventListener('keydown', (event) => this.#handleArrowKeys(event, index));
    });
  }

  /** Opens the tab named by the current URL hash, if there is one. */
  selectFromHash() {
    const section = window.location.hash.replace('#', '');
    const tab = section && document.getElementById(TAB_ID_PREFIX + section);
    if (tab && this.tabs.includes(/** @type {HTMLButtonElement} */ (tab))) {
      this.select(/** @type {HTMLButtonElement} */ (tab), { scrollToTop: false });
    }
  }

  /**
   * @param {HTMLButtonElement} selected
   * @param {{ focus?: boolean, scrollToTop?: boolean }} [options]
   */
  select(selected, { focus = false, scrollToTop = true } = {}) {
    for (const tab of this.tabs) {
      const isSelected = tab === selected;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !isSelected;
    }

    if (focus) {
      selected.focus();
    }

    this.#updateHash(selected);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    this.onChange(selected.getAttribute('aria-controls'));
  }

  /** @param {HTMLButtonElement} tab */
  #updateHash(tab) {
    const section = tab.id.slice(TAB_ID_PREFIX.length);
    // Fails on `file://`, where the page still works fine without deep links.
    try {
      history.replaceState(null, '', `#${section}`);
    } catch {
      /* ignore */
    }
  }

  /**
   * @param {KeyboardEvent} event
   * @param {number} index
   */
  #handleArrowKeys(event, index) {
    const lastIndex = this.tabs.length - 1;
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
    this.select(this.tabs[target], { focus: true, scrollToTop: false });
  }
}
