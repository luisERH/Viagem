/**
 * Line icons used by the schedule and the map markers.
 *
 * Each entry holds only the inner geometry of a 24x24 stroked SVG, so the
 * wrapper can decide size and colour at render time.
 */

const PATHS = {
  plane:
    '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.4-.2c.5-.2.7-.6.6-1.2Z"/>',
  bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 16h20M6 10V6h12v4"/>',
  bus: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M4 11h16"/><circle cx="8" cy="19" r="1.6"/><circle cx="16" cy="19" r="1.6"/>',
  sunrise:
    '<path d="M12 2v6M4.9 10.9l1.4 1.4M2 18h2M20 18h2M17.7 12.3l1.4-1.4M22 22H2M8 6l4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
  fort: '<path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-5h6v5M5 9h14"/>',
  wave: '<path d="M2 18a4 4 0 0 0 4-2 4 4 0 0 1 8 0 4 4 0 0 0 8 0"/><path d="M2 12a4 4 0 0 0 4-2 4 4 0 0 1 8 0 4 4 0 0 0 8 0"/>',
  fork: '<path d="M6 3v7a3 3 0 0 0 6 0V3M9 13v8M18 3c-1.5 2-2 4-2 6v4h4V9c0-2-.5-4-2-6ZM18 13v8"/>',
  boat: '<path d="M3 18h18l-2-6H5l-2 6Z"/><path d="M12 12V4M12 4l6 3"/>',
  view: '<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  house: '<path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-7h6v7"/>',
  market: '<path d="M2 20h20M4 20V10M20 20V10"/><path d="M2 10h20L12 3 2 10Z"/>',
  falls:
    '<path d="M4 3v11M9 3v11M14 3v11M19 3v11"/><path d="M2 17a4 4 0 0 0 4-1 4 4 0 0 1 6 0 4 4 0 0 0 6 0 4 4 0 0 1 4 1"/><path d="M2 21a4 4 0 0 0 4-1 4 4 0 0 1 6 0 4 4 0 0 0 6 0 4 4 0 0 1 4 1"/>',
  bird: '<path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.3-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3M14 17.8V21"/>',
  temple: '<path d="M12 3v18M8 7h8M6 21h12"/><circle cx="12" cy="3" r="1"/>',
  flag: '<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
  spa: '<path d="M12 21c0-5 3-8 8-8 0 5-3 8-8 8Z"/><path d="M12 21c0-5-3-8-8-8 0 5 3 8 8 8Z"/><path d="M12 21c0-4 1-8 4-11"/>',
  coffee: '<path d="M4 8h13v6a5 5 0 0 1-10 0V8Z"/><path d="M17 9h2a2 2 0 0 1 0 5h-2M4 21h14"/>',
  bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2"/>',
  trail: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
};

/**
 * Builds the markup for one icon.
 *
 * @param {string} name Key from `PATHS`; unknown names render an empty frame.
 * @param {number} size Width and height in pixels.
 * @returns {string} SVG markup, safe to inject.
 */
export function renderIcon(name, size) {
  return (
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" ` +
    'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    `${PATHS[name] ?? ''}</svg>`
  );
}
