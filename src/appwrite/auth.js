import conf from "../conf/conf";
import { Client, Account, ID, Databases } from "appwrite";


export class AuthService {
    client = new Client ();
    account;
    databases

    constructor (){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            
        this.account = new Account (this.client)
        this.databases = new Databases(this.client);
    }

    async createAccount ({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount){
            //     await this.databases.createDocument(
            //     conf.appwriteDatabaseId,
            //     conf.appwriteCollectionIdUserInfo,
            //     {
            //         userId,
            //         fullName
            //     }
            // )
                
                // if userAccount created succesfully then 
                // login directly
                return this.login({email, password})
            }
            else{
                return userAccount
            }

        }
        catch(err){
            throw err;
        }
    }

    async login ({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(err){
            throw err;
        }
    }

    async getCurrentUser (){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error: ",error);
            return null;
        }
        // return null;
    }

    async logout (){
        try{
            await this.account.deleteSessions()
        }
        catch (error){
            console.log("Appwriteservice :: Logout :: error: ",error);
        }
    }

    async addUserToDatabase(userId, fullName, email){
        try{
            // console.log("auth.js userId: ",userId)
            // console.log("auth.js fullName: ",fullName)

            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionIdUserInfo,
                userId,
                {
                    userId,
                    fullName,
                    email
                }
            )
        }
        catch(error){
            console.log("Appwriteservice :: addUserToDatabase :: error: ",error)
        }
    }
}


const authService = new AuthService();

export default authService;