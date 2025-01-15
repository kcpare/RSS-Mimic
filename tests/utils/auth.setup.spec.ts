import { testSetup, expect } from '../../utils/test-setup';
import { authSettings } from '../../test-data/AuthSettings';
import { POManagerFactory } from '../../page-objects/POManager';

testSetup('Login and store authenticated state', async ({ page, appName, username, password }) => {

    // Confirm authentication details are present as environment varaibles
    if (!appName || !username || !password)
    {
        throw new Error('Missing required environment variables for setup');
    }
    
    // Create required pages
    const poManager = POManagerFactory(page, appName);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    
    // Sign in
    await loginPage.signIn(username, password);

    // Confirm page has loaded
    await expect(homePage.homeButton).toBeVisible();

    //Save storage state
    await page.context().storageState({ path: authSettings.authFilepath });
});