"use server";

import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { UploadImage } from "../../../lib/bunnyNet/uploadImage";
import { toSlug } from "../../../lib/utils/toSlug";

export async function AdaugaProdus(titlu,descriere,pret,idCategorie,imagini) {
    try{
        await CheckAdmin();

        if(!titlu || !imagini || imagini.length === 0){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();
        const slug = toSlug(titlu);
        const poster = await UploadImage(imagini[0],"produse");

        if(!poster){
            return{
                ok:false,
                error:"A aparut o eroare la incarcarea imaginilor!"
            }
        }

        const {data,error} = await supabase
            .from("produse")
            .insert({
                titlu,
                slug,
                descriere:descriere || null,
                pret:pret ?? null,
                id_categorie:idCategorie ?? null,
                poster
            })
            .select("id")
            .single();

        if(error || !data){
            return{
                ok:false,
                error:"A aparut o eroare la salvarea produsului!"
            }
        }

        const restul = imagini.slice(1);
        const urls = await Promise.all(restul.map((imagine) => UploadImage(imagine,"produse")));
        const galerie = urls
            .map((url,pozitie) => ({
                id_produs:data.id,
                url,
                index:pozitie + 1
            }))
            .filter((imagine) => imagine.url);

        if(galerie.length){
            const {error:errorImagini} = await supabase
                .from("images_produs")
                .insert(galerie);

            if(errorImagini){
                return{
                    ok:false,
                    error:"Produsul a fost salvat, dar imaginile nu au putut fi adaugate!"
                }
            }
        }

        return{
            ok:true,
            message:"Produsul a fost salvat cu success!"
        }
    }catch(err){
        console.error("Eroare AdaugaProdus: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
