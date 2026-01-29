import config from '../config/config.js'
import {ID, Client, Storage} from 'appwrite'

export class StorageService {
    client = new Client();
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.storage = new Storage(this.client)
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile({
                bucketId: config.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite uploadFile failed: ", error)
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile({
                bucketId: config.appwriteBucketId,
                fileId
            })
            return true
        } catch (error) {
            console.log("Appwrite deleteFile failed: ", error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview({
            bucketId: config.appwriteBucketId,
            fileId
        })
    }
}

const storageService = new StorageService();
export default storageService;