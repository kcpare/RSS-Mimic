import { testSetup, expect } from '../../utils/test-setup';
import { authSettings } from '../../test-data/AuthSettings';
import { POManager } from '../../page-objects/POManager';

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
    await page.context().storageState({ path: authSettings.authFilepath });
});