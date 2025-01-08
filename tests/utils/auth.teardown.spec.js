import { test as teardown } from '@playwright/test';
const { authSettings } = require('../../test-data/AuthSettings');
let fs = require('fs'); 

teardown('Delete stored authenticated state', async ({ }) => 
{
    // Delete file with stored authentication state
    fs.rm(authSettings.authFilepath, { recursive: false }, (err) =>
    {
        if (err) // Could not delete file
        {
            console.error("Teardown error - Please see error:\n" + err.message);
            return;
        }
    });
});