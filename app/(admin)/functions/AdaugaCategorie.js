"use server";

import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { UploadImage } from "../../../lib/bunnyNet/uploadImage";
import { toSlug } from "../../../lib/utils/toSlug";

export async function AdaugaCategorie(titlu,poster) {
    try{
        await CheckAdmin();

        if(!titlu || !poster){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();
        const slug = toSlug(titlu);
        const path = await UploadImage(poster,"categorii");
        const {error} = await supabase
            .from("categorii")
            .insert({
                titlu,
                slug,
                poster:path
            });
            
        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la salvarea categoriei!"
            }
        }
        return{
            ok:true,
            message:"Categoria a fost salvata cu success!"
        }
    }catch(err){
        console.error("Eroare AdaugaCategorie: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}