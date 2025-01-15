import { test } from '@playwright/test';
import { authSettings } from '../../test-data/AuthSettings';

// The location of all app plugins
import path from 'path';
    const appDir = path.join(__dirname, '../../apps');

test('Setting up chosen app', async ({ }) => {

    // TODO: If no apps are specified, run all apps. If multiple apps are specified, run all of them
    if (authSettings.app.length === 0 || authSettings.app.length > 1)
    {
        throw new Error("Support for multiple apps is not yet implemented.");
    }

    // Load environment varaibles specific to the current app
    const envFile = appDir + "/" + authSettings.app[0] + "/.env";
    require('@dotenvx/dotenvx').config({ path: [envFile], overload: true });
});