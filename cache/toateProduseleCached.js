import { cacheLife, cacheTag } from "next/cache";
import { createAdminClient } from "../lib/supabase/supabaseAdmin";

export async function ToateProduseleCached(){
    "use cache";
    cacheTag("produse");
    cacheLife("saptamana");

    try{
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("produse")
            .select("slug,created_at,categorii!inner(slug)")
            .order("created_at",{ascending:false});

        if(error){
            throw new Error(error.message)
        }
        return data;
    }catch(err){
        console.error("[ERROR] ToateProduseleCached: ",err);
        return [];
    }
}
