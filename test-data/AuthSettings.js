import path from 'path';

// Declare path to save authentication state
const authFile = path.join(__dirname, '../playwright/.auth/user.json'); 

// Export authentication settings
// (except those that must be secure, which get saved in .env as environment variables instead)
export const authSettings = {
    authFilepath : authFile // File to store authentication state
}