/**
 * Definition of automated test to validate the user profile interface.
 *
 * @author diegomera84
 * @date   2022-11-25
 *
 * @description
 *
 * Feature: Validate the user profile update interface
 * Given a new user in the Wappi home page
 * When the user go to the profile page
 * Then The Image should be a required field
 * And The Name should be a required field
 * And The Last Name should be a required field
 * And The Date of Birth should be a required field
 * And The Country should be a required field
 */

 const { test, 'test': { describe, beforeAll, afterAll }, expect } = require('@playwright/test');

 const url = 'https://automation-wappi.vercel.app/login';
 const menuBar = 'a.nav-bar-link';
 const profileMenu = 3;
 const assertionStrings = [
    { 'locator': '#e-name', 'name': 'Nombre' },
    { 'locator': '#e-lastName', 'name': 'Apellido' },
    { 'locator': '#e-bornDate', 'name': 'Fecha de Nacimiento' },
    { 'locator': '#e-name', 'name': 'País' },
    { 'locator': '#e-image', 'name': 'Imagen' }
 ];

 test('All the input fields in the profile page should be mandatory', async ({ page }) => {
     await page.goto(url);
     await page.locator('#username').fill('DiegoMera');
     await page.locator('#password').fill('DiegoMera');
     await page.locator('#button-login').click();
 
     const menuOptions = await page.$$(menuBar);
     await menuOptions[profileMenu].click();
 
     await page.locator('#name').fill('');
     await page.locator('#lastName').fill('');
     await page.locator('#bornDate').fill('');
     await page.locator('#country').selectOption('');
     await page.locator('#save-profile').click();
 
     for(let assertion = 0; assertion < 4; assertion+=1){
        const locator = await page.locator(assertionStrings[assertion].locator);
    
        await expect(locator, `The ${assertionStrings[assertion].name} field should be required`).toBeVisible();
     }
 });