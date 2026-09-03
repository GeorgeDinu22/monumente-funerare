"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { UploadImage } from "../../../lib/bunnyNet/uploadImage";

export async function AdaugaAnunt(poster) {
    try{
        await CheckAdmin();

        if(!poster){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();
        const path = await UploadImage(poster,"anunturi");

        if(!path){
            return{
                ok:false,
                error:"A aparut o eroare la incarcarea imaginii!"
            }
        }

        const {data,error} = await supabase
            .from("anunturi")
            .insert({
                url:path,
                is_active:false
            })
            .select("id,created_at,url,is_active")
            .single();

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la salvarea anuntului!"
            }
        }

        updateTag("anunturi");

        return{
            ok:true,
            data,
            message:"Anuntul a fost salvat cu success!"
        }
    }catch(err){
        console.error("Eroare AdaugaAnunt: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
