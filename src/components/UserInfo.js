/** @module ../components/UserInfo.js */

/**
 * Object including user name and user detail.
 * @typedef {Object} userProfileInfo
 * @property {string} name - User name.
 * @property {string} detail - User detail.
 */

/** Class representing a user info. */
export default class UserInfo {
  /**
   * Create a user info.
   * @param {Object} initialProfileData - Object including selectors of profile components.
   * @param {string} initialProfileData.nameSelector - Selector of element containing user name.
   * @param {string} initialProfileData.detailSelector - Selector of element containing user detail.
   */
  constructor({ nameSelector, detailSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._detailElement = document.querySelector(detailSelector);
  }

  /**
   * Get user info.
   * @returns {userProfileInfo} Object including user name and user detail.
   */
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      detail: this._detailElement.textContent
    };
  }

  /**
   * Display user info on page.
   * @param {userProfileInfo} profileInfo - Object including user name and user detail.
   */
  setUserInfo({ name, detail }) {
    this._nameElement.textContent = name;
    this._detailElement.textContent = detail;
  }
}
