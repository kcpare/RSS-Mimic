import { Locator } from "@playwright/test";

export interface HomePageInterface
{
    homeButton : Locator; // Getter method for home button
    searchAndGoTo(userHandle : string) : void; // Given a user handle, search for that user and go to their profile page
}