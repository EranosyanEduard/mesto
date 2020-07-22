/** @module ../components/Api.js */

/** Class representing a api. */
export default class Api {
  /**
   *
   * @param {Object} requestInfo - Object contains request info.
   * @param {string} requestInfo.baseUrl - Main url for executing a request.
   * @param {Object} requestInfo.headers - Object contains additional info for executing a request.
   */
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getUserInfo() {
    return fetch(`${this._url}users/me`, {headers: this._headers});
  }

  _getInitialCards() {
    return fetch(`${this._url}cards`, {headers: this._headers});
  }

  _patchUserInfo({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    });
  }

  _postNewCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    });
  }

  _deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  _fetchCardLike(cardId, methodName) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: methodName,
      headers: this._headers
    });
  }

  _patchUserPic(userPicLink) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userPicLink
      })
    });
  }

  _handleBaseResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`${response.status} ${response.statusText}`);
  }

  setUserInfo(resolveHandler) {
    this._getUserInfo()
      .then(this._handleBaseResponse)
      .then((userInfo) => {
        this._userId = userInfo._id;
        resolveHandler(userInfo);
      })
      .catch((responseMessage) => {
        console.error(`Api.setUserInfo response status: ${responseMessage}`);
      });
  }

  addInitialCards(resolveHandler) {
    this._getInitialCards()
      .then(this._handleBaseResponse)
      .then((initialCards) => {
        return initialCards.map((initialCard) => {
          initialCard.isOwner = (this._userId === initialCard.owner._id);
          return initialCard;
        });
      })
      .then(resolveHandler)
      .catch((responseMessage) => {
        console.error(`Api.addInitialCards response status: ${responseMessage}`);
      });
  }

  changeUserInfo({name, about}, resolveHandler) {
    this._patchUserInfo({name, about})
      .then(this._handleBaseResponse)
      .then(resolveHandler)
      .catch((responseMessage) => {
        console.error(`Api.changeUserInfo response status: ${responseMessage}`);
      });
  }

  addNewCard({name, link}, resolveHandler) {
    this._postNewCard({name, link})
      .then(this._handleBaseResponse)
      .then((newCard) => {
        newCard.isOwner = true;
        resolveHandler(newCard);
      })
      .catch((responseMessage) => {
        console.error(`Api.addNewCard response status: ${responseMessage}`);
      });
  }

  removeCard(cardId, cardElement) {
    this._deleteCard(cardId)
      .then(this._handleBaseResponse)
      .then(() => {
        cardElement.remove();
      })
      .catch((responseMessage) => {
        console.error(`Api.removeCard response status: ${responseMessage}`);
      });
  }

  toggleCardLike(cardId, methodName, likeComponent, resolveHandler) {
    this._fetchCardLike(cardId, methodName)
      .then(this._handleBaseResponse)
      .then(({likes}) => {
        resolveHandler(likeComponent, likes.length);
      })
      .catch((responseMessage) => {
        console.error(`Api.toggleCardLike response status: ${responseMessage}`);
      });
  }

  changeUserPic(userPicLink, resolveHandler) {
    this._patchUserPic(userPicLink)
      .then(this._handleBaseResponse)
      .then(resolveHandler)
      .catch((responseMessage) => {
        console.error(`Api.changeUserPic response status: ${responseMessage}`);
      });
  }
}
