"use server";

import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { CheckAdmin } from './checkAdmin';

const ZILE_PERMISE = [1,7,31];
const LIMITA_PRODUSE = 10;

export async function GetSumar() {
    try{
        await CheckAdmin();

        const supabase = await createAdminClient();

        const [categorii,produse,apeluri,whatsapp] = await Promise.all([
            supabase
                .from("categorii")
                .select("id",{count:"estimated",head:true}),
            supabase
                .from("produse")
                .select("id",{count:"estimated",head:true}),
            supabase
                .from("statistici")
                .select("id",{count:"estimated",head:true})
                .eq("action_type","apel"),
            supabase
                .from("statistici")
                .select("id",{count:"estimated",head:true})
                .eq("action_type","whatsapp"),
        ]);

        if(categorii.error || produse.error || apeluri.error || whatsapp.error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea sumarului!"
            }
        }

        return{
            ok:true,
            data:{
                numarCategorii:categorii.count ?? 0,
                numarProduse:produse.count ?? 0,
                numarApeluri:apeluri.count ?? 0,
                numarWhatsApp:whatsapp.count ?? 0
            }
        }
    }catch(err){
        console.error("Eroare GetSumar: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}

export async function GetTopProduse(zile) {
    try{
        await CheckAdmin();

        const perioada = ZILE_PERMISE.includes(zile) ? zile : 7;

        const supabase = await createAdminClient();
        const de = new Date(Date.now() - perioada * 24 * 60 * 60 * 1000).toISOString();

        const {data,error} = await supabase
            .from("statistici")
            .select("id_produs,action_type,produse(titlu)")
            .gte("created_at",de);

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea statisticilor!"
            }
        }

        // grupam pe produs ca sa obtinem cate apeluri si cate mesaje are fiecare
        const peProdus = new Map();

        for(const rand of data ?? []){
            if(!rand.id_produs) continue;

            const existent = peProdus.get(rand.id_produs) ?? {
                id:rand.id_produs,
                titlu:rand.produse?.titlu ?? "Produs sters",
                apel:0,
                whatsapp:0,
                total:0
            };

            if(rand.action_type === "apel") existent.apel += 1;
            if(rand.action_type === "whatsapp") existent.whatsapp += 1;
            existent.total = existent.apel + existent.whatsapp;

            peProdus.set(rand.id_produs,existent);
        }

        const topProduse = [...peProdus.values()]
            .sort((a,b) => b.total - a.total)
            .slice(0,LIMITA_PRODUSE);

        return{
            ok:true,
            data:{
                perioada,
                topProduse
            }
        }
    }catch(err){
        console.error("Eroare GetTopProduse: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
