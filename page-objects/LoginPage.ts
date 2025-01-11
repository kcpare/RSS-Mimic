export interface LoginPageInterface
{
    signIn(user_usernameOrEmail : string, user_password : string) : void; // Given a user's username or email and password, sign in
}