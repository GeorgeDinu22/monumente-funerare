import { cacheTag } from "next/cache";
import { createAdminClient } from "../lib/supabase/supabaseAdmin";

export async function ProduseCached(slug){
    "use cache";
    cacheTag("produse");
    try{
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("produse")
            .select(`
                id,slug,titlu,poster,descriere,pret,
                categorii!inner(slug,titlu)`
            )
            .eq("categorii.slug",slug)
            .order("created_at",{ascending:false});
        if(error){
            throw new Error(error)
        }
        // console.log("data: ",data)
        return data;
    }catch(err){
        console.error("[ERROR] ProduseCached: ",err);
    }
}