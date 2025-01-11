import { testSetup, expect } from '../../utils/test-setup';
import { authSettings } from '../../test-data/AuthSettings';
import { POManagerFactory } from '../../page-objects/POManager';

testSetup('Login and store authenticated state', async ({ page, setupInfo }) => {

    // Confirm authentication details are present as environment varaibles
    if (!setupInfo.username || !setupInfo.password || !setupInfo.appName)
    {
        throw new Error('Missing required environment variables for setup');
    }
    
    // Create required pages
    const poManager = POManagerFactory(page, setupInfo.appName);
    const loginPage = poManager.getLoginPage();
    const homePage = poManager.getHomePage();
    
    // Sign in
    await loginPage.signIn(setupInfo.username, setupInfo.password);

    // Confirm page has loaded
    await expect(homePage.homeButton).toBeVisible();

    //Save storage state
    await page.context().storageState({ path: authSettings.authFilepath });
});