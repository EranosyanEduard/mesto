/** @module ../utils/constants.js */

// object contains selectors/classes of form components.
export const initialFormData = {
  formSelector: `.popup__form`,
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-submit',
  inputErrorClass: 'popup__input_invalid',
  inactiveButtonClass: 'popup__btn-submit_disable',
  errorClass: 'popup__error_visible'
};

// object contains request info.
export const apiData = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/',
  headers: {
    authorization: '2209a41b-072f-4997-82e0-004301b435a4',
    'content-type': 'application/json'
  }
};
