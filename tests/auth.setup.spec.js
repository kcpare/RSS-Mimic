const { testSetup, expect } = require('../utils/test-setup');
const { POManager } = require('../page-objects/POManager');

// Declare path to save authentication state
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json'); 

testSetup('Login and store authenticated state', async ({ page, setupInfo }) => {

    // Confirm authentication details are present as environment varaibles
    if (!setupInfo.username || !setupInfo.password)
    {
        throw new Error('Missing required environment variables for setup');
    }
    
    // Create required pages
    const poManager = new POManager(page);
    const blueskyLoginPage = poManager.getBlueskyLoginPage();
    const blueskyAppPage = poManager.getBlueskyAppPage();
    
    // Sign in
    await blueskyLoginPage.goTo();
    await blueskyLoginPage.signIn(setupInfo.username, setupInfo.password);

    // Confirm page has loaded
    await expect(blueskyAppPage.homeButton).toBeVisible();

    //Save storage state
    await page.context().storageState({ path: authFile });
    
});