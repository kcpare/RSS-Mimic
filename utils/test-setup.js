const base = require('@playwright/test');

// Load environment variables from .env file
require('dotenv').config();

// Create a new function testSetup which extends the base test function and has access to new fixtures necessary for test setup
exports.testSetup = base.test.extend(
    {
        setupInfo : 
        {
            username : process.env.BLUESKY_USERNAME,
            password : process.env.BLUESKY_PASSWORD
        }
    }
);
export { expect } from '@playwright/test';