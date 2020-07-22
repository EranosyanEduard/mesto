/** @module ../components/PopupWithImage.js */

import Popup from './Popup.js';

/** Class representing a popup with image. */
export default class PopupWithImage extends Popup {
  /**
   * Create a popup with image.
   * @param {Object} initialPopupData - Object including selectors of popup components.
   * @param {string} initialPopupData.popupSelector - Popup element selector.
   * @param {string} initialPopupData.imageSelector - Image element selector.
   * @param {string} initialPopupData.captionSelector - Caption element selector.
   */
  constructor({popupSelector, imageSelector, captionSelector}) {
    super(popupSelector);
    this._imageElement = this._element.querySelector(imageSelector);
    this._captionElement = this._element.querySelector(captionSelector);
  }

  /**
   * Open popup with image.
   * @param {import('../pages/index.js').photoCardInfo} cardInfo - Name and link of card.
   */
  open({name, link}) {
    this._imageElement.src = link;
    this._imageElement.alt = `Фотография: ${name}, Россия`;
    this._captionElement.textContent = name;
    super.open();
  }
}
