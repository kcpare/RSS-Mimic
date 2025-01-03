const { test, expect } = require('@playwright/test');
const { POManager } = require('../page-objects/POManager');

test.only('test', async ({ page }) => 
{
    // Create required pages
    const poManager = new POManager(page);
    const blueskyAppPage = poManager.getBlueskyAppPage();
    const searchString = "hello world";

    await blueskyAppPage.goToSearch(searchString);
});