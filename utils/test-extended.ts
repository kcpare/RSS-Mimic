import { test as baseTest } from '@playwright/test';

// Load environment variables from .env file
require('dotenv').config();

// Define test data structure
interface TestData 
{
    appName : string | undefined;
    userHandle : string | undefined;
}

// Add test data as a fixture
export const testExtended = baseTest.extend<{testData : TestData}>({
    testData : 
    {
        appName : process.env.APP_NAME,
        userHandle : process.env.APP_USER_HANDLE,
    }
});
export { expect } from '@playwright/test';