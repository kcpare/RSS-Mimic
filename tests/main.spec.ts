import { testExtended, expect } from '../utils/test-extended';
import { POManager } from '../page-objects/POManager';

testExtended.only('Search latest posts from followed accounts', async ({ page, testData }) => 
{
    // Confirm authentication details are present as environment varaibles
    if (!testData.userHandle)
    {
        throw new Error('Missing required environment variable userHandle');
    }
    
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
        await blueskyProfilePage.getPinnedPost();
        await blueskyProfilePage.getPastWeekPosts();
    }
});