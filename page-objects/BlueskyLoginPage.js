const path = require('path');

class BlueskyLoginPage
{
    constructor(page)
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
        await this.page.goto(this.loginPage);
    }

    // Given a user's username (or email) and password, sign in
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