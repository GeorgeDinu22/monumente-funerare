"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { UploadImage } from "../../../lib/bunnyNet/uploadImage";
import { DeleteImage } from "../../../lib/bunnyNet/deleteImage";
import { toSlug } from "../../../lib/utils/toSlug";

export async function EditeazaCategorie(id, titlu, poster, posterHasChanged) {
    try{
        await CheckAdmin();

        if(!id || !titlu){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }

        if(posterHasChanged && !poster){
            return{
                ok:false,
                error:"Imaginea categoriei este obligatorie!"
            }
        }

        const supabase = await createAdminClient();
        const slug = toSlug(titlu);

        // citim posterul vechi inainte de update, altfel pierdem path-ul din Bunny
        const {data:categorie} = await supabase
            .from("categorii")
            .select("poster")
            .eq("id",id)
            .single();

        const posterVechi = categorie?.poster || null;

        const date = { titlu, slug };

        if(posterHasChanged){
            const path = await UploadImage(poster,"categorii");

            if(!path){
                return{
                    ok:false,
                    error:"A aparut o eroare la incarcarea imaginii!"
                }
            }

            date.poster = path;
        }

        const {error} = await supabase
            .from("categorii")
            .update(date)
            .eq("id",id);

        if(error){
            // update-ul a esuat, asa ca stergem imaginea noua ramasa orfana in Bunny
            if(date.poster){
                await DeleteImage(date.poster);
            }

            return{
                ok:false,
                error:"A aparut o eroare la editarea categoriei!"
            }
        }

        // randul e deja actualizat, asa ca un esec pe Bunny nu opreste actiunea
        if(posterHasChanged && posterVechi && posterVechi !== date.poster){
            await DeleteImage(posterVechi);
        }

        updateTag("categorii");
        updateTag("produse");

        return{
            ok:true,
            message:"Categoria a fost editata cu success!",
            data:{
                id,
                titlu,
                slug,
                poster: date.poster || posterVechi
            }
        }
    }catch(err){
        console.error("Eroare EditeazaCategorie: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
