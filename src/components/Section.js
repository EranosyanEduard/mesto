/** @module ../components/Section.js */

/** Class representing a container. */
export default class Section {
  /**
   * Create a section.
   * @param {Object} contentPack - Object including initial data of items and their handler.
   * @param {Array<Object>} contentPack.items - Array of objects including initial data of items.
   * @param {Function} contentPack.renderer - Handler a data of item.
   * @param {string} sectionSelector - Section selector.
   */
  constructor({items, renderer}, sectionSelector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(sectionSelector);
  }

  /**
   * Add html element to container.
   * @param {Node} item - Any html element.
   */
  addItem(item) {
    this._element.append(item);
  }

  /** Add content to container. */
  renderContent() {
    this._items.forEach(this._renderer);
  }
}
