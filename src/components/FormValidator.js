/** @module ../components/FormValidator.js */

/** Class contains form validation interface. */
export default class FormValidator {
  /**
   * Create a validator.
   * @param {import("../pages").initialFormData} formData - Selectors/classes of form components.
   * @param {HTMLFormElement} formElement - Form object.
   */
  constructor(formData, formElement) {
    this._data = formData;
    this._element = formElement;
  }

  /**
   * Check input field validity.
   * @param {HTMLInputElement} input - Input field object.
   * @returns {boolean} Validity value of input field.
   */
  _isValidInput(input) {
    return input.validity.valid;
  }

  /**
   * Hide error message.
   * @param {HTMLInputElement} input - Input field object.
   */
  _hideError(input) {
    const error = this._element.querySelector(`#${input.id}-error`);
    input.classList.remove(this._data.inputErrorClass);
    error.classList.remove(this._data.errorClass);
    error.textContent = '';
  }

  /**
   * Show error message.
   * @param {HTMLInputElement} input - Input field object.
   */
  _showError(input) {
    const error = this._element.querySelector(`#${input.id}-error`);
    input.classList.add(this._data.inputErrorClass);
    error.classList.add(this._data.errorClass);
    error.textContent = input.validationMessage;
  }

  /**
   * Check form validity.
   * @param {Array<HTMLInputElement>} inputs - Array of input field objects.
   * @returns {boolean} Validity value of form.
   */
  _isValidForm(inputs) {
    return !inputs.some((input) => !this._isValidInput(input));
  }

  /**
   * Control state a submit button.
   * @param {Array<HTMLInputElement} inputs - Array of input field objects.
   */
  _toggleButtonState(inputs) {
    const submitButton =
      this._element.querySelector(this._data.submitButtonSelector);
    if (this._isValidForm(inputs)) {
      submitButton.disabled = false;
      submitButton.classList.remove(this._data.inactiveButtonClass);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(this._data.inactiveButtonClass);
    }
  }

  /** Add event listeners for form components. */
  _setEventListeners() {
    const inputs = Array.from(
      this._element.querySelectorAll(this._data.inputSelector)
    );

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (this._isValidInput(input)) {
          this._hideError(input);
        } else {
          this._showError(input);
        }
        this._toggleButtonState(inputs);
      });
    });
  }

  /** Reset form to initial state. */
  reset() {
    const inputs = Array.from(
      this._element.querySelectorAll(this._data.inputSelector)
    );

    inputs.forEach((input) => { this._hideError(input); });
    this._toggleButtonState(inputs);
  }

  /** Run form validation. */
  enableValidation() {
    this._setEventListeners();
  }
}
