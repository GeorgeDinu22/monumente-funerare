"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { DeleteImage } from "../../../lib/bunnyNet/deleteImage";

export async function StergeCategorie(id) {
    try{
        await CheckAdmin();

        if(!id){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();

        // citim posterul inainte de stergere, altfel pierdem path-ul din Bunny
        const {data:categorie} = await supabase
            .from("categorii")
            .select("poster")
            .eq("id",id)
            .single();

        // produsele din categorie se sterg prin cascade la nivel de DB
        const {error} = await supabase
            .from("categorii")
            .delete()
            .eq("id",id);

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la stergerea categoriei!"
            }
        }

        // randul e deja sters, asa ca un esec pe Bunny nu opreste actiunea
        if(categorie?.poster){
            await DeleteImage(categorie.poster);
        }

        updateTag("categorii");
        updateTag("produse");

        return{
            ok:true,
            message:"Categoria a fost stearsa cu success!"
        }
    }catch(err){
        console.error("Eroare StergeCategorie: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
