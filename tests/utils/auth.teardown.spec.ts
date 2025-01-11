import { test as teardown } from '@playwright/test';
import { authSettings } from '../../test-data/AuthSettings';
import fs from 'fs'; 

teardown('Delete stored authenticated state', async ({ }) => 
{
    // Delete file with stored authentication state
    fs.unlink(authSettings.authFilepath, (err) =>
    {
        if (err) console.error("Teardown error - Please see error:\n" + err.message);
    });
});