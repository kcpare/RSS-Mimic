import { type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { ProfilePage } from './ProfilePage';
import { POManagerInterface } from '../../../page-objects/POManager';

export class POManager implements POManagerInterface
{
    page : Page;

    constructor(page : Page)
    {
        this.page = page;
    }

    // Returns a login page
    getLoginPage()
    {
        return new LoginPage(this.page);
    }

    // Returns a home page
    getHomePage()
    {
        return new HomePage(this.page);
    }

    // Given the handle of a user
    // Returns a new profile page
    getProfilePage(userHandle : string)
    {
        return new ProfilePage(this.page, userHandle);
    }
}