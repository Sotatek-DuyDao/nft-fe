import Router from "next/router";

export const TOKEN_STORAGE_KEY = "myApp.authToken";
export class AuthToken {
    // ...  
    static async storeToken(token: string) {
        await Router.push("/");
    }
}