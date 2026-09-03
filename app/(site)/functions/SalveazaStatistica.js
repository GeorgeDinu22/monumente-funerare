"use server";

import { headers } from "next/headers";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { VerificaRateLimit } from '../../../lib/upstash/rateLimit';

const TIPURI = ["whatsapp","apel"];

async function getIp() {
    const lista = await headers();

    const forwarded = lista.get("x-forwarded-for");
    if(forwarded) return forwarded.split(",")[0].trim();

    return lista.get("x-real-ip") ?? "necunoscut";
}

export async function SalveazaStatistica(idProdus,actionType) {
    try{
        if(!idProdus || !TIPURI.includes(actionType)){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }

        const ip = await getIp();
        const permis = await VerificaRateLimit(`statistica:${ip}`);

        if(!permis){
            return{
                ok:false,
                error:"Prea multe cereri. Incearca din nou peste putin timp!"
            }
        }

        const supabase = await createAdminClient();
        const {error} = await supabase
            .from("statistici")
            .insert({
                id_produs:idProdus,
                action_type:actionType
            });

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la salvarea statisticii!"
            }
        }
        return{
            ok:true
        }
    }catch(err){
        console.error("Eroare SalveazaStatistica: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
