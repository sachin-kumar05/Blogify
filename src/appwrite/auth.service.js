import config from '../config/config.js'
import {Client, Account, ID} from 'appwrite'

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name
            })

            if(userAccount) {
                this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error('Appwrite signup failed:', error)
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession({
            email,
            password
            })
        } catch (error) {
            console.log("Appwrite login failed:", error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite getCurrentUser failed:", error)
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite logout failed:", error)
        }
    }

}

// Here we have made the object of class Authservice and exported it so that we don't have to make the object where ever we import appwrite services. And also we can know write directly authService.login etc.
const authService = new AuthService();
export default authService