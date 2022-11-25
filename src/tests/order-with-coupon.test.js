/**
 * Definition of automated test to validate a new order flow wit coupon.
 *
 * @author diegomera84
 * @date   2022-11-25
 *
 * @description
 *
 * Feature: Validate a new order flow with coupon
 *
 * Scenario: The user uses a valid coupon
 * Given a user in the Wappi home page
 * When the user makes a new order with coupon
 * Then The order should be visible in the orders summary
 *
 * Scenario: The user uses a invalid coupon
 * Given a user in the Wappi home page
 * When the user makes a new order with a invalid coupon
 * Then The system show a warning of invalid coupon
 *
 * Scenario: The user uses a coupon more than twice
 * Given a user in the Wappi home page
 * When the user makes a new order with a invalid coupon
 * And the user makes a second order with a same coupon
 * And the user makes a third order with a same coupon
 * Then The system show a warning of invalid coupon
 */

 const { test, 'test': { describe, beforeAll, afterAll }, expect } = require('@playwright/test');

 const url = 'https://automation-wappi.vercel.app/login';
 const menuBar = 'a.nav-bar-link';
 const ordersMenu = 2;
 const homeMenu = 'xpath=/html/body/app-root/app-coupons/app-nav-bar/nav/ul[1]/li[1]/a';

 test('The user could made a order with a valid coupon', async ({ page }) => {
     await page.goto(url);
     await page.locator('#username').fill('DiegoMera');
     await page.locator('#password').fill('DiegoMera');
     await page.locator('#button-login').click();
     
     await page.locator('#welcome-coupon').click();
     const couponCode = await page.$eval('#coupon-code', (el) => el.textContent);
     await page.locator('xpath=/html/body/app-root/app-coupon-modal/div/div/span[1]').click();
     await page.locator(homeMenu).click();

     const orderButtons = await page.$$('button.button.success.offers-table-block-button');
     await orderButtons[0].click();
     const orderName = await page.$eval('span.offer-description', (el) => el.textContent);

     await page.locator('#coupon').fill(couponCode);
     await page.locator('#order-confirm').click();
     await page.locator('xpath=/html/body/app-root/app-home/app-confirmation-modal/div/div/span').click();
 
     const menuOptions = await page.$$(menuBar);
     await menuOptions[ordersMenu].click();

     const locator = page.locator('#order-0');
     await expect(locator, `The order should be in the summary`).toContainText(orderName);
     
 });

 test('The user could not made a order with a invalid coupon', async ({ page }) => {
    await page.goto(url);
    await page.locator('#username').fill('DiegoMera');
    await page.locator('#password').fill('DiegoMera');
    await page.locator('#button-login').click();
    const couponCode = 'invalidCoupon'

    const orderButtons = await page.$$('button.button.success.offers-table-block-button');
    await orderButtons[0].click();

    await page.locator('#coupon').fill(couponCode);
    await page.locator('#order-confirm').click();
    const locator = page.locator('#e-coupon');
    await expect(locator, `A warning massage for invalid coupon should be visible`).toBeVisible();

});

test('The user could be made a order with a same coupon more than twice', async ({ page }) => {
   await page.goto(url);
   await page.locator('#username').fill('DiegoMera');
   await page.locator('#password').fill('DiegoMera');
   await page.locator('#button-login').click();

   await page.locator('#welcome-coupon').click();
   const couponCode = await page.$eval('#coupon-code', (el) => el.textContent);
   await page.locator('xpath=/html/body/app-root/app-coupon-modal/div/div/span[1]').click();
   await page.locator(homeMenu).click();

   const orderButtons = await page.$$('button.button.success.offers-table-block-button');
   await orderButtons[0].click();
   await page.locator('#coupon').fill(couponCode);
   await page.locator('#order-confirm').click();
   await page.locator('xpath=/html/body/app-root/app-home/app-confirmation-modal/div/div/span').click();

   await orderButtons[1].click();
   await page.locator('#coupon').fill(couponCode);
   await page.locator('#order-confirm').click();
   await page.locator('xpath=/html/body/app-root/app-home/app-confirmation-modal/div/div/span').click();

   await orderButtons[2].click();
   await page.locator('#coupon').fill(couponCode);
   await page.locator('#order-confirm').click();

   const locator = page.locator('#e-coupon');
   await expect(locator, `A warning massage for invalid coupon should be visible`).toBeVisible();

});