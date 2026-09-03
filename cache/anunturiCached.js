import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "../lib/supabase/supabaseAdmin";

export async function AnunturiCached(){
    "use cache"
    cacheTag("anunturi");
    cacheLife("saptamana");

    try{
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("anunturi")
            .select("id,url")
            .eq("is_active",true)
            .order("created_at",{ascending:false});
        if(error){
            throw new Error(error)
        }
        return data;
    }catch(err){
        console.error("[ERROR] AnunturiCached: ",err);
    }
}
