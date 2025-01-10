import { test as baseTest } from '@playwright/test';

// Load environment variables from .env file
require('dotenv').config();

interface TestData {
    userHandle : string | undefined;
}

// Add test data as a fixture
export const testExtended = baseTest.extend<{testData : TestData}>({
    testData : 
    {
        userHandle : process.env.BLUESKY_HANDLE,
    }
});
export { expect } from '@playwright/test';