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

export async function GetProdusById(id) {
    try{
        //await CheckAdmin();
        if(!id){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("produse")
            .select("id,titlu,slug,descriere,pret,id_categorie,poster,images_produs(id,url,index)")
            .eq("id",id)
            .single();

        if(error || !data){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea produsului!"
            }
        }
        // ordinea din Postgres nu e garantata, asa ca sortam noi dupa index
        const imagini = (data.images_produs ?? [])
            .filter((imagine) => imagine.url)
            .sort((a,b) => a.index - b.index);

        return{
            ok:true,
            data:{
                ...data,
                images_produs:imagini
            }
        }
    }catch(err){
        console.error("Eroare GetProdusById: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}

export async function GetAnunturi() {
    try{
        //await CheckAdmin();
        const supabase = await createAdminClient();
        const {data,error} = await supabase
            .from("anunturi")
            .select("id,created_at,url,is_active")
            .order("created_at",{ascending:false});

        if(error){
            return{
                ok:false,
                error:"A aparut o eroare la preluarea anunturilor!"
            }
        }
        return{
            ok:true,
            data:data ?? []
        }
    }catch(err){
        console.error("Eroare GetAnunturi: ",err)
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
