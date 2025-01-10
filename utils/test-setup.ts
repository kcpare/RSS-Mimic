import { test as baseTest } from '@playwright/test';

// Load environment variables from .env file
require('dotenv').config();

interface SetupInfo {
    username : string | undefined;
    password : string | undefined;
}

// Create a new function testSetup which extends the base test function and has access to new fixtures necessary for test setup
export const testSetup = baseTest.extend<{setupInfo : SetupInfo}>({
    setupInfo : 
    {
        username : process.env.BLUESKY_USERNAME,
        password : process.env.BLUESKY_PASSWORD
    }
});
export { expect } from '@playwright/test';