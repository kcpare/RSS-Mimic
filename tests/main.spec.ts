import { testExtended, expect } from '../utils/test-extended';
import { POManagerFactory } from '../page-objects/POManager';

testExtended.only('Search latest posts from followed accounts', async ({ page, testData }) => 
{
    // Confirm authentication details are present as environment varaibles
    if (!testData.userHandle || !testData.appName)
    {
        throw new Error('Missing required environment variable userHandle');
    }
    
    // Grab first page
    const poManager = POManagerFactory(page, testData.appName);
    const homePage = poManager.getHomePage();

    // Grab the list of accounts to check
    const userHandle = testData.userHandle;
    await homePage.searchAndGoTo(userHandle);
    const followList = await poManager.getProfilePage(userHandle).getFollowList();

    // Check the latest posts of each account
    let profilePage;
    for (let i = 0; i < followList.length; i++)
    {
        await homePage.searchAndGoTo(followList[i]);
        profilePage = poManager.getProfilePage(followList[i]);
        await profilePage.getPinnedPost();
        await profilePage.getPastWeekPosts();
    }
});