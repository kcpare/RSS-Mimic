const { BlueskyLoginPage } = require('./BlueskyLoginPage');
const { BlueskyAppPage } = require('./BlueskyAppPage');
const { BlueskyProfilePage } = require('./BlueskyProfilePage');

class POManager
{
    constructor(page)
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
    getBlueskyProfilePage(userHandle)
    {
        return new BlueskyProfilePage(this.page, userHandle);
    }
}

module.exports = {POManager};