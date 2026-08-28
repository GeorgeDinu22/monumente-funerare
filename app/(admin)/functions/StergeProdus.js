"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { DeleteImage } from "../../../lib/bunnyNet/deleteImage";

export async function StergeProdus(id) {
    try{
        await CheckAdmin();

        if(!id){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();

        // citim posterul si galeria inainte de stergere, altfel pierdem path-urile din Bunny
        const {data:produs} = await supabase
            .from("produse")
            .select(`poster,images_produs(url)`)
            .eq("id",id)
            .single();

        // imaginile din galerie se sterg prin cascade la nivel de DB
        const {error} = await supabase
            .from("produse")
            .delete()
            .eq("id",id);

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la stergerea produsului!"
            }
        }

        // randul e deja sters, asa ca un esec pe Bunny nu opreste actiunea
        const imagini = [
            produs?.poster,
            ...(produs?.images_produs || []).map((imagine) => imagine.url)
        ].filter(Boolean);

        await Promise.all(imagini.map((url) => DeleteImage(url)));

        updateTag("produse");

        return{
            ok:true,
            message:"Produsul a fost sters cu success!"
        }
    }catch(err){
        console.error("Eroare StergeProdus: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
