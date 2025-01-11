import { type Page } from '@playwright/test';
import { LoginPageInterface } from '../../../page-objects/LoginPage';

export class LoginPage implements LoginPageInterface
{
    page : Page;
    loginPage : string;

    constructor(page : Page)
    {
        this.page = page;
        this.loginPage = "https://bsky.app/settings";
    }

    // Getter method for the sign in button
    get signInButton()
    {
        return this.page.locator("button[aria-label='Sign in']");
    }

    // Getter method for the username or email input field 
    get usernameOrEmail()
    {
        return this.page.locator("input[aria-label='Username or email address']");
    }

    // Getter method for the password input field
    get password()
    {
        return this.page.locator("input[aria-label='Password']");
    }

    // Getter method for the next button
    get nextButton()
    {
        return this.page.locator("button[aria-label='Next']");
    }

    // Go to the login page
    async goTo()
    {
        await this.page.goto(this.loginPage, { waitUntil: 'domcontentloaded' });
    }

    // Given a user's username or email and password, sign in
    async signIn(user_usernameOrEmail : string, user_password : string)
    {
        await this.goTo();
        await this.signInButton.click()
        await this.usernameOrEmail.click()
        await this.usernameOrEmail.fill(user_usernameOrEmail);
        await this.password.fill(user_password);
        await this.nextButton.click();
    }
}