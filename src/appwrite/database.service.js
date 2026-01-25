import config from '../config/config.js'
import {Client, ID, TablesDB, Query} from 'appwrite'

export class DatabaseService {
    client = new Client;
    tablesDB;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.tablesDB.createRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            })
        } catch (error) {
            console.log("Appwrite createPost failed: ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug, 
                data: {
                    title,
                    content,
                    featuredImage,
                    status
                }
            })
        } catch (error) {
            console.log("Appwrite updatePost failed: ", error)
        }
    }

    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug
            })
        } catch (error) {
            console.log("Appwrite getPost failed: ", error)
        }
    }

    async getPosts(queries = [ Query.equal("status", "active")]){
        try {
            return await this.tablesDB.listRows({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                queries
            })
        } catch (error) {
            console.log("Appwrite getPosts failed: ", error)
        }
    }

    async deletePost(slug){
        try {
            await this.tablesDB.deleteRow({
                databaseId: config.appwriteDatabaseId,
                tableId: config.appwriteTableId,
                rowId: slug
            })
            return true;
        } catch (error) {
            console.log("Appwrite deletePost failed: ", error)
            return false;
        }
    }
}

export const databaseService = new DatabaseService()
export default databaseService;