import { test as setup, expect } from '@playwright/test';
const { POManager } = require('../page-objects/POManager');

// Load environemnt variables from .env file
require('dotenv').config();
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json'); // Path to save authentication state

setup('Login and store authenticated state', async ({ page }) => {
    
    // Confirm authentication details are present as environment varaibles
    if (!process.env.BLUESKY_USERNAME || !process.env.BLUESKY_PASSWORD)
    {
        throw new Error('Missing required environment variables for login');
    }
    
    // Create required pages
    const poManager = new POManager(page);
    const blueskyLoginPage = poManager.getBlueskyLoginPage();
    const blueskyAppPage = poManager.getBlueskyAppPage();
    
    // Sign in
    await blueskyLoginPage.goTo();
    await blueskyLoginPage.signIn(process.env.BLUESKY_USERNAME, process.env.BLUESKY_PASSWORD);

    // Confirm page has loaded
    await expect(blueskyAppPage.homeButton).toBeVisible();

    //Save storage state
    await page.context().storageState({ path: authFile });
    
});