import * as BunnyStorageSDK from "@bunny.net/storage-sdk";

export const storageZone = BunnyStorageSDK.zone.connect_with_accesskey(
  BunnyStorageSDK.regions.StorageRegion.Falkenstein,
  process.env.BUNNT_NET_STORAGE_NAME,
  process.env.BUNNT_NET_STORAGE_KEY,
);