import * as BunnyStorageSDK from "@bunny.net/storage-sdk";
import { storageZone } from "./bunnyNet";

export async function UploadImage(file, folder) {
    try {
        if (!file || typeof file.stream !== "function") {
            throw new Error("Fisierul trimis nu este un File/Blob valid");
        }

        const extension = file.name?.split(".").pop()?.toLowerCase() || "bin";
        const path = `/${folder}/${crypto.randomUUID()}.${extension}`.replace(/\/{2,}/g, "/");

        const uploaded = await BunnyStorageSDK.file.upload(
            storageZone,
            path,
            file.stream(),
            {
                contentType: file.type || "application/octet-stream",
            },
        );

        if (!uploaded) return null;

        return `https://${process.env.BUNNT_NET_PULL_ZONE}/${path}`;
    } catch (err) {
        console.error("Error UploadImage: ", err);
        return null;
    }
}
