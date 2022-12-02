/**
 * Definition of a class to interact with the profile page.
 *
 * @author diegomera84
 * @date   2022-12-02
 */


/**
 * Declaration of class for profile page actions.
 *
 * @param {object} page The browser page context.
 */
 class Profile {
    /**
     *
     * @param {object} page The browser page context.
     */
    constructor(page) {
      this.page = page;
    }

    /**
   * Fills all fields with empty string.
   *
   * @returns {void}
   */
  async clearAllFields() {
    await this.page.locator('#name').fill('');
    await this.page.locator('#lastName').fill('');
    await this.page.locator('#bornDate').fill('');
    await this.page.locator('#country').selectOption('');
  }

   /**
   * Saves profile.
   *
   * @returns {void}
   */
    async saveProfile() {
        await this.page.locator('#save-profile').click();
      }
}

module.exports = Profile;