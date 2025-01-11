import { type Page } from '@playwright/test';
import { HomePageInterface } from '../../../page-objects/HomePage';

export class HomePage implements HomePageInterface
{
    page : Page;
    homePage : string;

    constructor(page : Page)
    {
        this.page = page;
        this.homePage = "https://bsky.app/";
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
        await this.page.goto(this.homePage, { waitUntil: 'domcontentloaded' } );
    }

    // Given a user handle
    // Search for that user and go to their page
    async searchAndGoTo(userHandle : string)
    {
        await this.goTo();
        await this.searchButton.click();
        await this.page.locator("input[aria-label='Search']").fill(userHandle);
        await this.page.locator("a[data-testid='searchAutoCompleteResult-" + userHandle + "']").click();
    }
}