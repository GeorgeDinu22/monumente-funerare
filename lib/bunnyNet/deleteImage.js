import * as BunnyStorageSDK from "@bunny.net/storage-sdk";
import { storageZone } from "./bunnyNet";

export async function DeleteImage(url) {
    try {
        if (!url || typeof url !== "string") {
            throw new Error("Nu s-a trimis un URL valid");
        }

        // in DB salvam URL-ul absolut, iar SDK-ul cere path-ul relativ la storage zone
        const path = url
            .replace(`https://${process.env.BUNNT_NET_PULL_ZONE}/`, "")
            .replace(/^\/+/, "");

        if (!path || path === url) {
            throw new Error(`URL-ul nu apartine pull zone-ului: ${url}`);
        }

        await BunnyStorageSDK.file.remove(storageZone, path);

        return true;
    } catch (err) {
        console.error("Error DeleteImage: ", err);
        return false;
    }
}
