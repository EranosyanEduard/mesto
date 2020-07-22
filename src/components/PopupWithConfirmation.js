/** @module ../components/PopupWithConfirmation.js */

import Popup from './Popup';

/** Class representing a popup with action confirmation */
export default class PopupWithConfirmation extends Popup {
  /**
   * Create a popup with action confirmation.
   * @param {string} popupSelector - Popup selector.
   * @param handleSubmitForm
   */
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  /**
   * Open popup.
   * @param {Element} item - Element which must be removed.
   * @param {string} itemId - Element identifier.
   */
  open(item, itemId) {
    this._item = item;
    this._itemId = itemId;
    super.open();
  }

  /** Close popup */
  close() {
    super.close();
    this._item = null;
    this._itemId = null;
  }

  /** Add event listeners for popup and its components. */
  setEventListeners() {
    const form = this._element.querySelector('.popup__form');

    super.setEventListeners();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._itemId, this._item);
      this.close();
    });
  }
}
