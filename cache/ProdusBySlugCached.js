import { createAdminClient } from "../lib/supabase/supabaseAdmin";

export async function ProdusBySlugCached(slug){
    "use server";
    try{
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("produse")
            .select(`
                id,slug,titlu,poster,descriere,pret,
                images_produs(id,url,index)
            `)
            .eq("slug",slug)
            .single();

        if(error){
            throw new Error(error.message)
        }
        return data;
    }catch(err){
        console.error("[ERROR] ProduseCached: ",err);
        return null;
    }
}