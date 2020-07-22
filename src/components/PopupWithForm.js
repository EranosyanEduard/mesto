/** @module ../components/PopupWithForm.js */

import Popup from './Popup.js';

/** Class representing a popup with form. */
export default class PopupWithForm extends Popup {
  /**
   * Create a popup with form.
   * @param {string} popupSelector - Popup selector.
   * @param {Function} handleSubmitForm - Handle form 'submit' event.
   */
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
  }

  /**
   * Get input field values.
   * @returns {Object} formData - Object including input field values.
   */
  _getInputValues() {
    const inputs = Array.from(this._element.querySelectorAll('.popup__input'));

    return inputs.reduce((formData, input) => {
      formData[input.name] = input.value;
      return formData;
    }, {});
  }

  open() {
    const submitButton = this._element.querySelector('.popup__btn-submit');
    submitButton.textContent = 'Сохранить';
    super.open();
  }

  /** Close popup with form. */
  close() {
    const form = this._element.querySelector('.popup__form');
    super.close();
    form.reset();
  }

  /** Add event listeners for popup and its components. */
  setEventListeners() {
    const form = this._element.querySelector('.popup__form');
    const submitButton = this._element.querySelector('.popup__btn-submit');

    super.setEventListeners();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      submitButton.textContent = 'Сохранение...';
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }
}
