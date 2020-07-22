/* Script description */

// [JSDoc TYPE DEFINITION]
/**
 * Object contains selectors and classes of form components.
 * @typedef {Object} initialFormData
 * @property {string} formSelector - Form profileUserPic selector.
 * @property {string} inputSelector - Input profileUserPic selector.
 * @property {string} submitButtonSelector - Button profileUserPic selector.
 * @property {string} inputErrorClass - Input profileUserPic 'error' class.
 * @property {string} inactiveButtonClass - Button profileUserPic 'error' class.
 * @property {string} errorClass - Span-error profileUserPic 'error' class.
 */

/**
 * Object contains card caption and card link.
 * @typedef {Object} photoCardInfo
 * @property {string} name - Card caption.
 * @property {string} link - Card link.
 * @property {string} _id - Card identifier.
 * @property {Array<Object>} likes - Array of users which like a card.
 * @property {Object} owner - Object contains user info which created a card.
 * @property {string} owner._id - User identifier which created a card.
 * @property {boolean} isOwner - Boolean value indicating whether the user owns the element.
 */

// [MODULES]
import './index.css';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {initialFormData, apiData} from '../utils/constants.js';

// [FUNCTIONS]
/**
 * Open popup.
 * @param {PopupWithForm} popup - Node representing a popup.
 * @param {Element} form - Node representing a form.
 * @param {Element} firstInput - Node representing a first input field of form.
 */
function openPopup(popup, form, firstInput) {
  const formValidator = new FormValidator(initialFormData, form);

  formValidator.reset();
  popup.open();
  firstInput.focus();
}

/**
 * Return node is fitted card element.
 * @param {photoCardInfo} cardInfo - Object contains card info.
 * @param {Object} eventHandler - Object contains handlers for child elements of card.
 * @param {Function} eventHandler.onImage - Image "click" event handler.
 * @param {Function} eventHandler.onRemoveButton - Remove button "click" event handler.
 * @param {Function} eventHandler.onLikeButton - Like button "click" event handler.
 * @returns {Node} Node is fitted card element.
 */
function getCardElement(cardInfo, eventHandler) {
  return new Card(cardInfo, '#photo-card-template', eventHandler).getElement();
}

// [VARIABLES]
// 1. Nodes:
// "profile" bem-block and its components.
const profile = document.querySelector('.profile');
const profileBtnEditInfo = profile.querySelector('.profile__btn_feat_edit-info');
const profileBtnAddCard = profile.querySelector('.profile__btn_feat_add-card');
const profileUserPicContainer = profile.querySelector('.profile__user-pic-container');
const profileUserPic = profileUserPicContainer.querySelector('.profile__user-pic');

// forms and their components.
const popupUserPicForm = document
  .querySelector('.popup_type_user-pic')
  .querySelector('.popup__form');
const popupUserPicInput = popupUserPicForm.querySelector('.popup__input');

const popupUserInfoForm = document
  .querySelector('.popup_type_user-info')
  .querySelector('.popup__form');
const popupUserInfoInputName = popupUserInfoForm.elements.userName;
const popupUserInfoInputDetail = popupUserInfoForm.elements.userDetail;

const popupCardInfoForm = document
  .querySelector('.popup_type_card-info')
  .querySelector('.popup__form');
const popupCardInfoInput = popupCardInfoForm.querySelector('.popup__input');

// array of forms for validation.
const forms = Array.from(document.querySelectorAll(initialFormData.formSelector));

// 2. Instances of classes:
const api = new Api(apiData);

// instance of the UserInfo class based on the components of "profile" bem-block.
const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  detailSelector: '.profile__subtitle'
});

// add user info to the page.
api.setUserInfo(({avatar, name, about}) => {
  profileUserPic.src = avatar;
  userInfo.setUserInfo({name, detail: about});
});

// popups and additional items.
// note: all instance of popups based on "popup" bem-block.
const popupUserPic = new PopupWithForm(
  '.popup_type_user-pic',
  (inputValues) => {
    api.changeUserPic(inputValues.userPicLink, ({avatar}) => {
      profileUserPic.src = avatar;
    });
  }
);

const popupUserInfo = new PopupWithForm(
  '.popup_type_user-info',
  (inputValues) => {
    const {userName: name, userDetail: about} = inputValues;
    api.changeUserInfo({name, about}, ({name, about}) => {
      userInfo.setUserInfo({name, detail: about});
    });
  }
);

const popupCardImage = new PopupWithImage({
  popupSelector: '.popup_type_card-image',
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption'
});

const popupRemoveCard = new PopupWithConfirmation(
  '.popup_type_confirmation-remove-card',
  (cardId, cardElement) => {
    api.removeCard(cardId, cardElement);
  }
);

// object contains handlers for the child elements of the "photo-card" bem-block.
const cardEventHandler = {
  onImage: ({name, link}) => {
    popupCardImage.open({name, link});
  },
  onRemoveButton: (cardElement, cardId) => {
    popupRemoveCard.open(cardElement, cardId);
  },
  onLikeButton: (cardId, methodName, likeComponent) => {
    const resolveHandler = ({likeButton, likeCounter}, likeTotal) => {
      likeButton.classList.toggle('photo-card__btn-like_on');
      likeCounter.textContent = likeTotal;
    };
    api.toggleCardLike(cardId, methodName, likeComponent, resolveHandler);
  }
};

// container for photo cards based on "cards__list" bem-element.
let cardContainer;

// add initial cards to the page.
api.addInitialCards((initialCards) => {
  cardContainer = new Section({
    items: initialCards,
    renderer: (cardInfo) => {
      cardContainer.addItem(getCardElement(cardInfo, cardEventHandler));
    }
  }, '.cards__list');
  cardContainer.renderContent();
});

const popupCardInfo = new PopupWithForm(
  '.popup_type_card-info',
  (inputValues) => {
    const {cardName: name, cardDetail: link} = inputValues;
    api.addNewCard({name, link}, (cardInfo) => {
      cardContainer.addItem(getCardElement(cardInfo, cardEventHandler));
    });
  }
);

/* Script body */
// listen to the components of "profile" bem-block.
profileUserPicContainer.addEventListener('click', () => {
  openPopup(popupUserPic, popupUserPicForm, popupUserPicInput);
});

profileBtnEditInfo.addEventListener('click', () => {
  const {name, detail} = userInfo.getUserInfo();
  popupUserInfoInputName.value = name;
  popupUserInfoInputDetail.value = detail;
  openPopup(popupUserInfo, popupUserInfoForm, popupUserInfoInputName);
});

profileBtnAddCard.addEventListener('click', () => {
  openPopup(popupCardInfo, popupCardInfoForm, popupCardInfoInput);
});

// listen to the popups.
popupUserPic.setEventListeners();
popupUserInfo.setEventListeners();
popupCardInfo.setEventListeners();
popupRemoveCard.setEventListeners();
popupCardImage.setEventListeners();

// run forms validation.
forms.forEach((form) => {
  const formValidator = new FormValidator(initialFormData, form);
  formValidator.enableValidation();
});
