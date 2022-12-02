/**
 * Definition of a class to interact with the login page.
 *
 * @author diegomera84
 * @date   2022-12-02
 */


/**
 * Declaration of class for login page actions.
 *
 * @param {object} page The browser page context.
 */
 class Login {
    /**
     *
     * @param {object} page The browser page context.
     */
    constructor(page) {
      this.page = page;
    }

    /**
   * Login a user.
   *
   * @param {string} user The user name.
   *
   * @param {string} password The user password.
   *
   * @returns {void}
   */
  async loginUser(user, password) {
    await this.page.locator('#username').fill(user);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#button-login').click();
  }
}

module.exports = Login;