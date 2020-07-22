/** @module ../components/Card.js */

/** Class representing a card. */
export default class Card {
  /**
   * Create a card.
   * @param {import("../pages").photoCardInfo} cardInfo - Name and link of card.
   * @param {string} cardTemplateSelector - Card template selector.
   * @param {Function} handleCardClick - Handler 'click' event on card image.
   */
  constructor(cardInfo, cardTemplateSelector, {onImage, onRemoveButton, onLikeButton}) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._id = cardInfo._id;
    this._likeCounter = cardInfo.likes.length;
    this._isOwner = cardInfo.isOwner;
    this._templateSelector = cardTemplateSelector;
    this._handleImageClick = onImage;
    this._handleRemoveButtonClick = onRemoveButton;
    this._handleLikeButtonClick = onLikeButton;
  }

  /**
   * Get clone of card element.
   * @returns {Node} Clone of card element.
   */
  _getClone() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);
  }

  /** Add event listeners for card components. */
  _setEventListeners() {
    const removeButton = this._element.querySelector('.photo-card__btn-remove');
    const likeButton = this._element.querySelector('.photo-card__btn-like');
    const likeCounter = this._element.querySelector('.photo-card__like-counter');
    const image = this._element.querySelector('.photo-card__image');

    removeButton.addEventListener('click', () => {
      this._handleRemoveButtonClick(this._element, this._id);
    });

    likeButton.addEventListener('click', () => {
      const methodName = likeButton.classList.contains('photo-card__btn-like_on')
        ? 'DELETE'
        : 'PUT';

      this._handleLikeButtonClick(this._id, methodName, {likeButton, likeCounter});
    });

    image.addEventListener('click', () => {
      this._handleImageClick({
        name: this._name,
        link: this._link
      });
    });
  }

  /**
   * Get fitted card element.
   * @returns {Node} Fitted card element.
   */
  getElement() {
    this._element = this._getClone();
    const image = this._element.querySelector('.photo-card__image');
    const title = this._element.querySelector('.photo-card__title');
    const counter = this._element.querySelector('.photo-card__like-counter');

    if (!this._isOwner) {
      const removeButton = this._element.querySelector('.photo-card__btn-remove');
      removeButton.classList.add('photo-card__btn-remove_hidden');
    }

    this._setEventListeners();
    image.src = this._link;
    image.alt = `Фотография: ${this._name}, Россия`;
    title.title = this._name;
    title.textContent = this._name;
    counter.textContent = this._likeCounter;

    return this._element;
  }
}
