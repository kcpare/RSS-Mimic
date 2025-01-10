import { type Page, type Locator } from '@playwright/test';

export class BlueskyAppPage
{
    page : Page;

    constructor(page : Page)
    {
        this.page = page;
    }

    // Getter method for home button
    get homeButton()
    {
        return this.page.locator("a[aria-label='Home']");
    }

    // Getter method for search button
    get searchButton()
    {
        return this.page.locator("a[aria-label='Search']");
    }

    // Go to default page
    async goTo()
    {
        await this.page.goto("https://bsky.app/");
    }

    // Given a user handle
    // Search for that user and go to their page
    async searchAndGoTo(userHandle : string)
    {
        await this.goTo();
        await this.searchButton.click();
        await this.page.locator("input[aria-label='Search']").fill(userHandle);
        await this.page.locator("a[href='/profile/" + userHandle + "']").first().click();
    }
}

module.exports = {BlueskyAppPage};