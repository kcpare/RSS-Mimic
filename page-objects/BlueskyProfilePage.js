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

    // Returns the latest post of this user as a string
    async getLatestPost()
    {
        const latestPost = await this.posts.nth(1);

        console.log("Latest post for : " + this.userHandle + "\n");

        // Grab the time of the post
        const timePosted = await this.getPostTimestamp(latestPost);
        console.log("Time posted : " + timePosted + "\n");
        
        // Grab any text in the post, if possible
        const postText = await this.getPostText(latestPost);
        if (!postText)
        {
            console.log("Post Text : This post has no post text\n");
        }
        else 
        {
            console.log("Post Text : " + postText + "\n");
        }

        // If the post has images, grab its alt text, if possible
        const altText = await this.getPostImageAltText(latestPost);
        if (!altText)
        {
            console.log("Alt Text : This post has no image alt text\n");
        }
        else
        {
            console.log("Alt Text : \n" + altText + "\n");
        }

        console.log("\n");
    }

    async getPostTimestamp(post)
    {
        let timePosted = await post.locator("a[aria-label*='AM']").first();
        await post.waitFor(timePosted);
        if (await timePosted.count() === 0)
        {
            timePosted = await post.locator("a[aria-label*='PM']").first();
        }
        return await timePosted.getAttribute("aria-label");
    }
 
    async getPostText(post)
    {
        const postText = await post.locator("div[data-testid='postText']");
        await post.waitFor(postText);
        if (await postText.count() === 0)
        {
            return '';
        }
        else
        {
            return await postText.textContent();
        }
    }

    async getPostImageAltText(post)
    {
        const images = await post.locator("div[data-expoimage='true']").locator("img");
        let altText = '';
        if (await images.count() != 0)
        {
            for(let i = 0; i < await images.count(); i++)
            {
                if (await images.nth(i).getAttribute('alt') != "")
                {
                    altText = altText.concat("Image " + (i+1) + " : " + await images.nth(i).getAttribute('alt') + "\n");
                }
            }
        }
        return altText;
    }

}

module.exports = {BlueskyProfilePage};