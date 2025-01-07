import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async uploadTicket({slug, from_station, to_station, date, pnr, featuredImage, seller_id}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    from_station,
                    to_station,
                    date,
                    pnr,
                    featuredImage,
                    seller_id
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadTicket :: error", error);
        }
    }
    async deleteTicket(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteTicket :: error", error);
            return false
        }
    }

    async getTicket(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getTicket :: error", error);
            return false
        }
    }

    async getTickets({ from_station, to_station, date }) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('from_station', from_station), // match from station
                    Query.equal('to_station', to_station),     // match to station
                    Query.equal('date', date)                  // match date
                ]
            );
            console.log(response.documents)
            return response.documents; // Return the matching tickets
        } catch (error) {
            console.error('Error fetching tickets:', error);
            return [];
        }
    }

    // file service (Ticket PDF)

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
}


const service = new Service()
export default service