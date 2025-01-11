import { test as baseTest } from '@playwright/test';

// Load environment variables from .env file
require('dotenv').config();

// Define setup info structure
interface SetupInfo {
    appName : string | undefined;
    username : string | undefined;
    password : string | undefined;
}

// Add setup info as a fixture
export const testSetup = baseTest.extend<{setupInfo : SetupInfo}>({
    setupInfo : 
    {
        appName : process.env.APP_NAME,
        username : process.env.APP_USERNAME,
        password : process.env.APP_PASSWORD
    }
});
export { expect } from '@playwright/test';