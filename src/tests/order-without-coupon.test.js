/**
 * Definition of automated test to validate a new order flow without coupon.
 *
 * @author diegomera84
 * @date   2022-11-25
 *
 * @description
 *
 * Feature: Validate a new order flow without coupon
 * Given a user in the Wappi home page
 * When the user makes a new order without coupon
 * Then The order should be visible in the orders summary
 */

 const { test, 'test': { describe, beforeAll, afterAll }, expect } = require('@playwright/test');

 const url = 'https://automation-wappi.vercel.app/login';
 const menuBar = 'a.nav-bar-link';
 const ordersMenu = 2;

 test('All the input fields in the profile page should be mandatory', async ({ page }) => {
     await page.goto(url);
     await page.locator('#username').fill('DiegoMera');
     await page.locator('#password').fill('DiegoMera');
     await page.locator('#button-login').click();

     const orderButtons = await page.$$('button.button.success.offers-table-block-button');
     await orderButtons[0].click();
     const orderName = await page.$eval('span.offer-description', (el) => el.textContent);
     await page.locator('#order-confirm').click();
     await page.locator('xpath=/html/body/app-root/app-home/app-confirmation-modal/div/div/span').click();
 
     const menuOptions = await page.$$(menuBar);
     await menuOptions[ordersMenu].click();

     const locator = page.locator('#order-0');
     await expect(locator, `The order should be in the summary`).toContainText(orderName);
     
 });