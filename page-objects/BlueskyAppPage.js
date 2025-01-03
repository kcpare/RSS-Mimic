class BlueskyAppPage
{
    constructor(page)
    {
        this.page = page;
    }

    get homeButton()
    {
        return this.page.locator("a[aria-label='Home']");
    }

    get searchButton()
    {
        return this.page.locator("a[aria-label='Search']");
    }

    async goTo()
    {
        await this.page.goto("https://bsky.app/");
    }

    async goToSearch(searchString)
    {
        await this.goTo();
        await this.searchButton.click();
        await this.page.locator("input[aria-label='Search']").fill(searchString);
    }
}

module.exports = {BlueskyAppPage};