import { type Page } from '@playwright/test';
import { LoginPageInterface } from './LoginPage';
import { HomePageInterface } from './HomePage';
import { ProfilePageInterface } from './ProfilePage';

export interface POManagerInterface 
{
    page : Page;
    getLoginPage() : LoginPageInterface;
    getHomePage() : HomePageInterface;
    getProfilePage(userHandle : string) : ProfilePageInterface;
}

interface POConstructable {
    new(page : Page) : POManagerInterface;
}

// Initialize poManager and check:
    // That a PO manager exists for appName
    // That the PO manager implements the interfaces: POManagerInterface, POConstructable
export const POManagerFactory = (page : Page, appName : string) =>
{
    // Import the PO manager that corresponds to appName
    const poManagerFilepath : string = "../apps/" + appName + "/page-objects/POManager";
    const { POManager } = require(poManagerFilepath); 
    if (!POManager) { throw new Error("POManager for " + appName + " not found.") }

    // Initialize the PO Manager and enforce its adherence to POManagerInterface and POConstructable
    function makePOManager(theConstructor : POConstructable)
    {
        return new theConstructor(page);
    }
    const poManager : POManagerInterface = makePOManager(POManager);
    if(!poManager) { throw new Error ("PO Manager could not be initialized.") }

    return poManager;
};