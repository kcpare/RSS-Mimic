import { type Page, type Locator } from '@playwright/test';

export class BlueskyProfilePage
{
    page : Page;
    userHandle : string;

    constructor(page : Page, userHandle : string)
    {
        this.page = page;
        this.userHandle = userHandle;
    }

    // Returns the user handle for this profile page
    getUserHandle()
    {
        return this.userHandle;
    }

    // Return the list of accounts this user follows
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
            if (!link)
            {
                throw new Error("Missing profile link.");
            }
            else
            {
                following[i] = await link.split("/profile/")[1];
            }
        }

        return following;
        
    }

    // Given a Javascript Date object, returns an array of posts created since that date
    async getPosts(date : Date)
    {
        await this.#posts.last().waitFor();
        const numPosts = await this.#posts.count();
        for (let i = 1; i < numPosts; i++)
        {
            const currPost = await this.#posts.nth(i);
            const postDate = await this.getPostTimestamp(currPost);

            if (!postDate) { throw new Error("Date posted is null.") };
            if (postDate.getTime() < date.getTime()) // if postDate is older than our given date
            {
                break;
            }
            
            await this.getPost(currPost);
        }
    }

    // Given a post
    // Return the content of the post
    async getPost(post : Locator)
    {
        console.log("Post for : " + this.userHandle + "\n");

        // Grab the time of the post
        const timePosted = await this.getPostTimestamp(post);
        if (!timePosted) { throw new Error("Time posted is null.") };
        console.log("Time posted : " + timePosted.toDateString() + "\n");
        
        // Grab any text in the post, if possible
        const postText = await this.getPostText(post);
        if (!postText)
        {
            console.log("Post Text : This post has no post text\n");
        }
        else 
        {
            console.log("Post Text : " + postText + "\n");
        }

        // If the post has images, grab its alt text, if possible
        const altText = await this.getPostImageAltText(post);
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

    // Grab the pinned post
    async getPinnedPost()
    {
        await this.getPost(this.#posts.nth(0));
    }

    // Grab the posts from the last seven days for this user
    async getPastWeekPosts()
    {
        const today = new Date(Date.now());
        const weekMS = 7 * 24 * 60 * 60 * 1000; // The number of milliseconds in a week
        const sevenDaysAgo = new Date(today.getTime() - weekMS);
        await this.getPosts(sevenDaysAgo);
    }

    // Given a post,
    // Returns a Javascript Date object for the time it was posted
    async getPostTimestamp(post : Locator)
    {
        await post.waitFor();
        let timePosted = await post.locator("a[aria-label*='AM']").first();
        if (await timePosted.count() === 0)
        {
            timePosted = await post.locator("a[aria-label*='PM']").first();
        }
        
        const timestamp : string = (await timePosted.getAttribute("aria-label")) || '';
        return await this.#getDate(timestamp);
    }
 
    // Given a post
    // Returns a string of its post text
    async getPostText(post : Locator)
    {
        await post.waitFor();
        const postText = await post.locator("div[data-testid='postText']");
        if (await postText.count() === 0)
        {
            return '';
        }
        else
        {
            return await postText.textContent();
        }
    }

    // Given a post
    // Returns a string of the alt text for any images in the post
    async getPostImageAltText(post : Locator)
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

    // ----- ----- ----- ----- ----- Private Helper Methods ----- ----- ----- ----- ----- //
    // Getter method for the posts currently visible on the profile page
    get #posts()
    {
        const flatlist = this.page.locator("div[data-testid='postsFeed-flatlist']").first();
        const postFeed = flatlist.locator("div[data-testid*='feedItem-by']");
        return postFeed;
    }
    
    // Given a datestring in format: January 2, 2025 at 4:05 PM
    // Return the Javascript Date object for 'January 2, 2025' 
    async #getDate(timestamp : string)
    {
        if (timestamp === '') { return null; }
        const datestring = timestamp.split(" at ")[0]; // remove any text including and after " at ", leaving just: month date, year
        const parsedDate = Date.parse(datestring);
        return new Date(parsedDate);
    }
}

module.exports = {BlueskyProfilePage};