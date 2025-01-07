const base = require('@playwright/test');

// Load environment variables from .env file
require('dotenv').config();

// Add test data as a fixture
exports.test = base.test.extend(
    {
        testData : 
        {
            userHandle : process.env.BLUESKY_HANDLE,
        }
    }
);
export { expect } from '@playwright/test';