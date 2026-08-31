/**
 * Leaflet map with one marker per place.
 *
 * Leaflet is loaded from a CDN as a global. If that request fails the page has
 * to keep working, so every entry point checks `isReady` first and the caller
 * shows a fallback message instead.
 */

import { ACCENT, PLACES, REGION_LABEL } from '../data/places.js';
import { longLabel } from '../lib/dates.js';
import { escapeHtml } from '../lib/dom.js';
import { renderIcon } from './icons.js';

const MARKER_SIZE = 28;
const MAX_FIT_ZOOM = 14;
const SINGLE_PLACE_ZOOM = 13;
const NARROW_VIEWPORT = '(max-width: 960px)';

/** Route colours, kept in sync with `--color-sea` and `--color-clay`. */
const ROUTE_COLOR = {
  [ACCENT.SEA]: '#17605c',
  [ACCENT.CLAY]: '#9c3d22',
};

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; OpenStreetMap &copy; CARTO';

export class TripMap {
  /**
   * @param {object} options
   * @param {HTMLElement} options.canvas   Element Leaflet mounts into.
   * @param {HTMLElement} options.caption  Shows the region name.
   * @param {HTMLElement} options.zoomLabel Shows the current zoom level.
   * @param {(placeId: string) => void} options.onPlaceSelect
   */
  constructor({ canvas, caption, zoomLabel, onPlaceSelect }) {
    this.canvas = canvas;
    this.caption = caption;
    this.zoomLabel = zoomLabel;
    this.onPlaceSelect = onPlaceSelect;

    /** @type {Record<string, L.Marker>} */
    this.markers = {};
    this.route = null;
    this.isReady = false;
  }

  /**
   * Builds the map. Returns `false` when Leaflet is unavailable.
   *
   * @returns {boolean}
   */
  mount() {
    if (typeof L === 'undefined') {
      return false;
    }

    this.map = L.map(this.canvas, { scrollWheelZoom: false });
    L.tileLayer(TILE_URL, { maxZoom: 19, subdomains: 'abcd', attribution: TILE_ATTRIBUTION }).addTo(this.map);

    for (const [placeId, place] of Object.entries(PLACES)) {
      this.markers[placeId] = this.#createMarker(placeId, place);
    }

    this.map.on('zoomend', () => {
      this.zoomLabel.textContent = `zoom ${this.map.getZoom()}`;
    });

    this.isReady = true;
    return true;
  }

  /**
   * Frames the day: dims everything outside it, numbers the stops in order and
   * draws the route between them.
   *
   * @param {import('../data/itinerary.js').Day} day
   */
  showDay(day) {
    if (!this.isReady) {
      return;
    }

    const stopOrder = firstVisitOrder(day.steps);

    for (const [placeId, marker] of Object.entries(this.markers)) {
      const element = markerElement(marker);
      if (!element) {
        continue;
      }

      const position = stopOrder.get(placeId);
      element.classList.toggle('marker--dimmed', position === undefined);
      element.classList.remove('marker--active');

      const badge = element.querySelector('.marker__sequence');
      const showBadge = position !== undefined && day.steps.length > 1;
      badge.hidden = !showBadge;
      if (showBadge) {
        badge.textContent = String(position);
      }

      marker.setPopupContent(popupMarkup(placeId, day));
    }

    this.#drawRoute(day);
    this.caption.textContent = REGION_LABEL[day.region] ?? 'Mapa';
  }

  /**
   * Pops one place open and pans to it.
   *
   * @param {string | null} placeId Pass `null` to clear the highlight.
   */
  focusPlace(placeId) {
    if (!this.isReady) {
      return;
    }

    for (const marker of Object.values(this.markers)) {
      markerElement(marker)?.classList.remove('marker--active');
    }

    const marker = placeId ? this.markers[placeId] : null;
    if (!marker) {
      return;
    }

    markerElement(marker)?.classList.add('marker--active');
    marker.openPopup();
    this.map.panTo(PLACES[placeId].coords, { animate: true });
  }

  /** Recomputes the map size after the container changed shape. */
  refresh() {
    if (this.isReady) {
      this.map.invalidateSize();
    }
  }

  /**
   * @param {string} placeId
   * @param {import('../data/places.js').Place} place
   */
  #createMarker(placeId, place) {
    const classes = ['marker', place.accent === ACCENT.CLAY ? 'is-warm' : '', place.isAnchor ? 'marker--anchor' : '']
      .filter(Boolean)
      .join(' ');

    const icon = L.divIcon({
      className: '',
      html: `<div class="${classes}">${renderIcon(place.icon, 15)}<span class="marker__sequence" hidden></span></div>`,
      iconSize: [MARKER_SIZE, MARKER_SIZE],
      iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
      popupAnchor: [0, -MARKER_SIZE / 2],
    });

    return L.marker(place.coords, { icon, title: place.name, keyboard: true, riseOnHover: true })
      .addTo(this.map)
      .bindPopup(`<b>${escapeHtml(place.name)}</b><i>no roteiro</i>`)
      .on('click', () => this.onPlaceSelect(placeId));
  }

  /** @param {import('../data/itinerary.js').Day} day */
  #drawRoute(day) {
    if (this.route) {
      this.map.removeLayer(this.route);
      this.route = null;
    }

    const points = day.steps.map((step) => PLACES[step.placeId]?.coords).filter(Boolean);
    if (points.length === 0) {
      return;
    }

    if (points.length === 1) {
      this.map.setView(points[0], SINGLE_PLACE_ZOOM);
      return;
    }

    this.route = L.polyline(points, {
      color: ROUTE_COLOR[day.accent],
      weight: 2,
      opacity: 0.55,
      dashArray: '5 6',
    }).addTo(this.map);

    const padding = window.matchMedia(NARROW_VIEWPORT).matches ? [34, 34] : [56, 56];
    this.map.fitBounds(L.latLngBounds(points), { padding, maxZoom: MAX_FIT_ZOOM });
  }
}

/**
 * Maps each place to its 1-based position on the day, keeping the first visit
 * when a place is used twice.
 *
 * @param {import('../data/itinerary.js').Step[]} steps
 * @returns {Map<string, number>}
 */
function firstVisitOrder(steps) {
  const order = new Map();
  steps.forEach((step, index) => {
    if (!order.has(step.placeId)) {
      order.set(step.placeId, index + 1);
    }
  });
  return order;
}

/**
 * @param {string} placeId
 * @param {import('../data/itinerary.js').Day} day
 * @returns {string}
 */
function popupMarkup(placeId, day) {
  const times = day.steps.filter((step) => step.placeId === placeId).map((step) => step.time);
  const when = times.length > 0 ? `${times.join(' e ')}, ${longLabel(day.date)}` : 'fora do dia selecionado';
  return `<b>${escapeHtml(PLACES[placeId].name)}</b><i>${escapeHtml(when)}</i>`;
}

/**
 * @param {L.Marker} marker
 * @returns {HTMLElement | null} The styled div inside Leaflet's icon wrapper.
 */
function markerElement(marker) {
  return marker.getElement()?.querySelector('.marker') ?? null;
}
