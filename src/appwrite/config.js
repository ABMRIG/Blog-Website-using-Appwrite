import conf from "../conf/conf";
import { Client, ID, Storage, Databases, Query } from "appwrite";


export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost ({title,slug,content,featuredImage,status,userId})
    {
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        }
        catch(err){
            console.log("Appwrite Service:: create post:: error",err)
        }
    }

    async updatePost (slug,{title,content,featuredImage,status}){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )  
        }
        catch(err){
            console.log("AppwriteService :: updatePost :: error: ",err);
        }
    }

    async deletePost (slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }
        catch (err){
            console.log("Appwrite Service :: deletePost :: error: ",err);
            return false
        }
    }

    async getPost (slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log("Appwrite Service :: getPost :: error",error)
            return false
        }
    }

    async getPosts (queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                // we may add limit to the number 
                // of posts displayed using pagination

                //by default Appwrite sets pagination to 25 
                // Query.limit(25)
            )
        }
        catch(err){
            console.log("Appwrite Service :: getPosts :: error: ",err);
        }
    }

    //file upload service 
    async uploadFile (file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(err){
            console.log("Appwrite service :: uploadFile :: error: ",err);
            return false
        }
    }

    async deleteFile (fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;

        }
        catch(error){
            console.log("Appwrite Service :: deleteFile :: error: ",error);
            return false;
        }
    }

    getFilePreview (fileId){
        // console.log(fileId)
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;

