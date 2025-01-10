import { type Page } from '@playwright/test';
import { BlueskyLoginPage } from './BlueskyLoginPage';
import { BlueskyAppPage } from './BlueskyAppPage';
import { BlueskyProfilePage } from './BlueskyProfilePage';

export class POManager
{
    page : Page;

    constructor(page : Page)
    {
        this.page = page;
    }

    // Returns a new login page
    getBlueskyLoginPage()
    {
        return new BlueskyLoginPage(this.page);
    }

    // Returns a new (home) app page
    getBlueskyAppPage()
    {
        return new BlueskyAppPage(this.page);
    }

    // Given the handle of a user
    // Returns a new profile page
    getBlueskyProfilePage(userHandle : string)
    {
        return new BlueskyProfilePage(this.page, userHandle);
    }
}

module.exports = {POManager};