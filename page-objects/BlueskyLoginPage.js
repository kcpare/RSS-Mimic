const path = require('path');

class BlueskyLoginPage
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = "https://bsky.app/settings";
    }

    // Getter method to locate Sign In button
    get signInButton()
    {
        return this.page.locator("button[aria-label='Sign in']");
    }

    // Getter method to locate the username or email input field using its aria-label
    get usernameOrEmail()
    {
        return this.page.locator("input[aria-label='Username or email address']");
    }

    // Getter method to locate the password input field using its aria-label
    get password()
    {
        return this.page.locator("input[aria-label='Password']");
    }

    get nextButton()
    {
        return this.page.locator("button[aria-label='Next']");
    }

    async goTo()
    {
        await this.page.goto(this.loginPage);
    }

    // Method to sign in the user, given their username and password
    async signIn(user_usernameOrEmail, user_password)
    {
        await this.signInButton.click()
        await this.usernameOrEmail.click()
        await this.usernameOrEmail.fill(user_usernameOrEmail);
        await this.password.fill(user_password);
        await this.nextButton.click();
    }
}

module.exports = {BlueskyLoginPage};