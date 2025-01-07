const { test, expect } = require('../utils/test-extended');
const { POManager } = require('../page-objects/POManager');

test.only('Search latest posts from followed accounts', async ({ page, testData }) => 
{
    // Grab first page
    const poManager = new POManager(page);
    const blueskyAppPage = poManager.getBlueskyAppPage();

    // Grab the list of accounts to check
    const userHandle = testData.userHandle;
    await blueskyAppPage.searchAndGoTo(userHandle);
    const followList = await poManager.getBlueskyProfilePage(userHandle).getFollowList();

    // Check the latest posts of each account
    let blueskyProfilePage;
    for (let i = 0; i < followList.length; i++)
    {
        await blueskyAppPage.searchAndGoTo(followList[i]);
        blueskyProfilePage = poManager.getBlueskyProfilePage(followList[i]);
        await blueskyProfilePage.getLatestPost();
    }    
});