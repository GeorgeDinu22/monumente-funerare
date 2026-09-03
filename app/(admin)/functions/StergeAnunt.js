"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { DeleteImage } from "../../../lib/bunnyNet/deleteImage";

export async function StergeAnunt(id) {
    try{
        await CheckAdmin();

        if(!id){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();

        // citim url-ul inainte de stergere, altfel pierdem path-ul din Bunny
        const {data:anunt} = await supabase
            .from("anunturi")
            .select("url")
            .eq("id",id)
            .single();

        const {error} = await supabase
            .from("anunturi")
            .delete()
            .eq("id",id);

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la stergerea anuntului!"
            }
        }

        // randul e deja sters, asa ca un esec pe Bunny nu opreste actiunea
        if(anunt?.url){
            await DeleteImage(anunt.url);
        }

        updateTag("anunturi");

        return{
            ok:true,
            message:"Anuntul a fost sters cu success!"
        }
    }catch(err){
        console.error("Eroare StergeAnunt: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
