"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';

const MAX_ACTIVE = 3;

export async function ToggleAnunt(id,isActive) {
    try{
        await CheckAdmin();

        if(!id || typeof isActive !== "boolean"){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();

        // limita se verifica pe server, altfel doua taburi deschise o pot depasi
        if(isActive){
            // excludem randul curent ca reactivarea unui anunt deja activ sa nu se blocheze singura
            const {count,error:countError} = await supabase
                .from("anunturi")
                .select("id",{count:"exact",head:true})
                .eq("is_active",true)
                .neq("id",id);

            if(countError){
                return{
                    ok:false,
                    error:"A aparut o eroare la verificarea anunturilor active!"
                }
            }

            if((count ?? 0) >= MAX_ACTIVE){
                return{
                    ok:false,
                    error:`Poti avea maxim ${MAX_ACTIVE} anunturi active in acelasi timp!`
                }
            }
        }

        const {error} = await supabase
            .from("anunturi")
            .update({is_active:isActive})
            .eq("id",id);

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la actualizarea anuntului!"
            }
        }

        updateTag("anunturi");

        return{
            ok:true,
            message:isActive
                ? "Anuntul a fost activat cu success!"
                : "Anuntul a fost dezactivat cu success!"
        }
    }catch(err){
        console.error("Eroare ToggleAnunt: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
