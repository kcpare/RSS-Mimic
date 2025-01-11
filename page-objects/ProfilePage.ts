import { Locator } from "@playwright/test";

export interface ProfilePageInterface
{
    getUserHandle() : string; // Returns the user handle for this profile page
    getFollowList() : Promise<string[]>; // Return the list of accounts this user follows
    getPosts(date : Date) : Promise<Locator[]>; // Given a Javascript Date object, returns an array of posts created since that date
    getTimestamp(post : Locator) : Promise<Date>; // Given a post, returns a Javascript date object for the time it was posted
    getText(post : Locator) : Promise<string>; // Given a post, returns a string of its post text
    getImageAltText(post : Locator) : Promise<string>; // Given a post, returns a string of alt text for any images in the post
}