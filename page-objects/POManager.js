const { BlueskyLoginPage } = require('./BlueskyLoginPage');
const { BlueskyAppPage } = require('./BlueskyAppPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
    }

    getBlueskyLoginPage()
    {
        this.blueskyLoginPage = new BlueskyLoginPage(this.page);
        return this.blueskyLoginPage;
    }

    getBlueskyAppPage()
    {
        this.blueskyAppPage = new BlueskyAppPage(this.page);
        return this.blueskyAppPage;
    }
}

module.exports = {POManager};