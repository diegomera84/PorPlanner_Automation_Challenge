/**
 * Definition of a class to interact with the home page.
 *
 * @author diegomera84
 * @date   2022-12-02
 */

 const menuBar = 'a.nav-bar-link';

/**
 * Declaration of class for home page actions.
 *
 * @param {object} page The browser page context.
 */
 class Home {
    /**
     *
     * @param {object} page The browser page context.
     */
    constructor(page) {
      this.page = page;
    }

    /**
   * Select a menu option.
   *
   * @param {number} optionNumber The menu option number.
   *
   * @returns {void}
   */
  async selectMenu(optionNumber) {
    const menuOptions = await this.page.$$(menuBar);
     await menuOptions[optionNumber].click();
  }
}

module.exports = Home;