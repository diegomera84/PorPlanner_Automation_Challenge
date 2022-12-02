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
 const Home = require('../pages/home');
 const Login = require('../pages/login');
 const Profile = require('../pages/profile')

 const url = 'https://automation-wappi.vercel.app/login';
 const profileMenu = 3;
 const user = 'DiegoMera';
 const password = 'DiegoMera';
 const assertionStrings = [
    { 'locator': '#e-name', 'name': 'Nombre' },
    { 'locator': '#e-lastName', 'name': 'Apellido' },
    { 'locator': '#e-bornDate', 'name': 'Fecha de Nacimiento' },
    { 'locator': '#e-name', 'name': 'País' },
    { 'locator': '#e-image', 'name': 'Imagen' }
 ];

 test('All the input fields in the profile page should be mandatory', async ({ page }) => {
     const homePage = new Home(page);
     const loginPage = new Login(page);
     const profilePage = new Profile(page);
     await page.goto(url);
     await loginPage.loginUser(user, password);
 
     await homePage.selectMenu(profileMenu);
 
     await profilePage.clearAllFields();
     await profilePage.saveProfile();
 
     for(let assertion = 0; assertion < 4; assertion+=1){
        const locator = await page.locator(assertionStrings[assertion].locator);
    
        await expect(locator, `The ${assertionStrings[assertion].name} field should be required`).toBeVisible();
     }
 });