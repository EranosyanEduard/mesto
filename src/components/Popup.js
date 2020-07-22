/** @module ../components/Popup.js */

/** Class representing a popup. */
export default class Popup {
  /**
   * Create a popup.
   * @param {string} popupSelector - Popup selector.
   */
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  /** Open popup. */
  open() {
    this._element.classList.add('popup_opened');
    this._element.focus();
  }

  /** Close popup. */
  close() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('keydown', this._handleEscClose);
  }

  /**
   * Handle 'keydown' event on escape key.
   * @param {Event} event - Event object.
   */
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  /** Add event listeners for popup and its components. */
  setEventListeners() {
    const container = this._element.firstElementChild;
    const closeButton = this._element.querySelector('.popup__btn-close');

    this._element.addEventListener('keydown', (event) => {
      this._handleEscClose(event);
    });

    this._element.addEventListener('click', () => { this.close(); });

    container.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    closeButton.addEventListener('click', () => { this.close(); });
  }
}
