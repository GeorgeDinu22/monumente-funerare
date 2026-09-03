import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "../lib/supabase/supabaseAdmin";

export async function CategoriiCached(){
    "use cache"
    cacheTag("categorii");
    cacheLife("saptamana");

    try{
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("categorii")
            .select("id,slug,titlu,poster")
            .order("created_at",{ascending:false});
        if(error){
            throw new Error(error)
        }
        return data;
    }catch(err){
        console.error("[ERROR] CategoriiCached: ",err);
    }
}