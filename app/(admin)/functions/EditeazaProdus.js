"use server";

import { updateTag } from "next/cache";
import { CheckAdmin } from "./checkAdmin";
import { createAdminClient } from '../../../lib/supabase/supabaseAdmin';
import { UploadImage } from "../../../lib/bunnyNet/uploadImage";
import { DeleteImage } from "../../../lib/bunnyNet/deleteImage";
import { toSlug } from "../../../lib/utils/toSlug";

export async function EditeazaProdus(id,titlu,descriere,pret,idCategorie,imagini) {
    try{
        await CheckAdmin();

        if(!id || !titlu || !imagini || imagini.length === 0){
            return{
                ok:false,
                error:"Nu ai trimis toate datele!"
            }
        }
        const supabase = await createAdminClient();

        // citim starea curenta ca sa stim ce imagini raman si ce trebuie sters din Bunny
        const {data:produs} = await supabase
            .from("produse")
            .select("poster,images_produs(url)")
            .eq("id",id)
            .single();

        if(!produs){
            return{
                ok:false,
                error:"Produsul nu a fost gasit!"
            }
        }

        const urlsVechi = [
            produs.poster,
            ...(produs.images_produs || []).map((imagine) => imagine.url)
        ].filter(Boolean);

        // clientul poate trimite doar URL-uri care apartineau deja produsului
        const vechiInvalid = imagini.some(
            (imagine) => imagine?.tip === "veche" && !urlsVechi.includes(imagine.url)
        );

        if(vechiInvalid){
            return{
                ok:false,
                error:"Imaginile trimise nu sunt valide!"
            }
        }

        // urcam doar fisierele noi, pastrand ordinea primita din modal
        const uploaduriNoi = [];
        const urlsFinale = [];

        for(const imagine of imagini){
            if(imagine?.tip === "veche"){
                urlsFinale.push(imagine.url);
                continue;
            }

            const url = await UploadImage(imagine.file,"produse");

            if(!url){
                // nu atingem DB-ul, doar curatam ce am apucat sa urcam
                await Promise.all(uploaduriNoi.map((orfan) => DeleteImage(orfan)));

                return{
                    ok:false,
                    error:"A aparut o eroare la incarcarea imaginilor!"
                }
            }

            uploaduriNoi.push(url);
            urlsFinale.push(url);
        }

        const curataOrfanii = () => Promise.all(uploaduriNoi.map((orfan) => DeleteImage(orfan)));

        const {error} = await supabase
            .from("produse")
            .update({
                titlu,
                slug:toSlug(titlu),
                descriere:descriere || null,
                pret:pret ?? null,
                id_categorie:idCategorie ?? null,
                poster:urlsFinale[0]
            })
            .eq("id",id);

        if(error){
            await curataOrfanii();

            return{
                ok:false,
                error:"A aparut o eroare la editarea produsului!"
            }
        }

        // rescriem galeria din zero, altfel reordonarea ar cere oricum reindexarea aproape tuturor randurilor
        const {error:errorStergere} = await supabase
            .from("images_produs")
            .delete()
            .eq("id_produs",id);

        if(errorStergere){
            await curataOrfanii();

            return{
                ok:false,
                error:"A aparut o eroare la actualizarea imaginilor!"
            }
        }

        const galerie = urlsFinale.slice(1).map((url,pozitie) => ({
            id_produs:id,
            url,
            index:pozitie + 1
        }));

        if(galerie.length){
            const {error:errorImagini} = await supabase
                .from("images_produs")
                .insert(galerie);

            if(errorImagini){
                await curataOrfanii();

                return{
                    ok:false,
                    error:"A aparut o eroare la actualizarea imaginilor!"
                }
            }
        }

        // o imagine mutata din galerie in poster e in ambele liste, asa ca filtrul o pastreaza
        const deSters = urlsVechi.filter((url) => !urlsFinale.includes(url));
        await Promise.all(deSters.map((url) => DeleteImage(url)));

        updateTag("produse");

        return{
            ok:true,
            message:"Produsul a fost editat cu success!",
            data:{
                id,
                titlu,
                slug:toSlug(titlu),
                descriere:descriere || null,
                pret:pret ?? null,
                id_categorie:idCategorie ?? null,
                poster:urlsFinale[0]
            }
        }
    }catch(err){
        console.error("Eroare EditeazaProdus: ",err)
        return{
            ok:false,
            error:"A aparut o eroare neasteptata!"
        }
    }
}
