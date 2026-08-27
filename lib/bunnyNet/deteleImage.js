import * as BunnyStorageSDK from "@bunny.net/storage-sdk";
import { storageZone } from "./bunnyNet";

export async function UploadImage(file,folder) {
    try{
        const res = await BunnyStorageSDK.file.remove(storageZone, "/path/to/file.jpg");
        
    }catch(err){
        console.error("Error UploadImage: ",err)
    }
}
