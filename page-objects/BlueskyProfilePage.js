class BlueskyProfilePage
{
    constructor(page, userHandle)
    {
        this.page = page;
        this.userHandle = userHandle;
    }

    // Getter method for the array of posts currently visible on the profile page
    get posts()
    {
        const flatlist = this.page.locator("div[data-testid='postsFeed-flatlist']").first();
        const postFeed = flatlist.locator("div[data-testid*='feedItem-by']");
        return postFeed;
    }

    // Returns the list of accounts this user follows
    async getFollowList()
    {
        // Move to follow list
        await this.page.locator("a[href='/profile/" + this.userHandle + "/follows']").click();

        // Wait for the list to load
        const theList = await this.page.locator("div[data-testid='profileFollowsScreen']").locator("a[href*='/profile/']").filter({ hasNotText : '@'}); 
        await theList.first().waitFor(); 

        // Populate the array 'following' with the handle of every account they follow
        const following = new Array(await theList.count());
        for(let i = 0; i < await theList.count(); i++)
        {
            const link = await theList.nth(i).getAttribute('href');
            console.log(link);
            following[i] = await link.split("/profile/")[1];
        }

        return following;
        
    }

    // Returns the latest post of this user
    async getLatestPost()
    {
        const latestPost = await this.posts.nth(1);

        // Grab the time of the post
        let timePosted = await latestPost.locator("a[aria-label*='AM']").first();
        await latestPost.waitFor(timePosted);
        if (await timePosted.count() === 0)
        {
            timePosted = await latestPost.locator("a[aria-label*='PM']").first();
        }
        console.log("time posted = " + await timePosted.getAttribute("aria-label"));

        // Grab any text in the post, if possible
        const postText = await latestPost.locator("div[data-testid='postText']");
        await latestPost.waitFor(postText);
        if (await postText.count() === 0)
        {
            console.log("This post has no post text");
        }
        else
        {
            console.log("post text = " + await postText.textContent());
        }

        // If the post has images, grab its alt text, if possible
        const image = await latestPost.locator("div[data-expoimage='true']").locator("img");
        if (await image.count() === 0)
        {
            console.log("This post has no image");
        }
        else
        {
            for(let i = 0; i < await image.count(); i++)
            {
                if (await image.nth(i).getAttribute('alt') === "")
                {
                    console.log("This image has no alt text");
                }
                else
                {
                    console.log("alt = " + await image.nth(i).getAttribute('alt'));
                }
            }
        }
    }
}

module.exports = {BlueskyProfilePage};