"use server";

import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { CheckAdmin } from './checkAdmin';

export async function GetCategorii() {
    try{
        //await CheckAdmin();
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("categorii")
            .select("id,created_at,titlu,slug,poster")
            .order("created_at",{ascending:false});

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea categoriilor!"
            }
        }
        return{
            ok:true,
            data:data ?? []
        }
    }catch(err){
        console.error("Eroare GetCategorii: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}

export async function GetCategoriiById() {
    try{
        //await CheckAdmin();
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("categorii")
            .select("id,titlu")
            .order("created_at",{ascending:false});

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea categoriilor!"
            }
        }
        return{
            ok:true,
            data:data ?? []
        }
    }catch(err){
        console.error("Eroare GetCategorii: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}

export async function GetProduse() {
    try{
        //await CheckAdmin();
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("produse")
            .select("id,created_at,id_categorie,titlu,descriere,pret,poster,slug,categorii(titlu)")
            .order("created_at",{ascending:false});

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea produselor!"
            }
        }
        const produse = (data ?? []).map(({categorii,...produs}) => ({
            ...produs,
            categorie:categorii?.titlu ?? null
        }));
        return{
            ok:true,
            data:produse
        }
    }catch(err){
        console.error("Eroare GetProduse: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
