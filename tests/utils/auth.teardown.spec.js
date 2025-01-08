import { test as teardown } from '@playwright/test';

let fs = require('fs'); // Module for file manipulation

// Path to stored authentication state
import path from 'path';
const authFile = path.join(__dirname, '../../playwright/.auth/user.json'); 

teardown('Delete stored authenticated state', async ({ }) => 
{
    // Delete file with stored authentication state
    fs.rm(authFile, { recursive: false }, (err) =>
    {
        if (err) // Could not delete file
        {
            console.error("Teardown error - Please see error:\n" + err.message);
            return;
        }
    });
});