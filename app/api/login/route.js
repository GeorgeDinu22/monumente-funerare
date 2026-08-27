import { createClient } from "../../../lib/supabase/supabaseServer";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LUNGIME_MINIMA_PAROLA = 6;
const EROARE_CREDENTIALE = "Email sau parolă incorecte.";

export async function POST(request){
    let corp;

    try{
        corp = await request.json();
    }catch{
        return Response.json(
            { ok: false, error: "Cerere invalidă." },
            { status: 400 }
        );
    }

    const email = typeof corp?.email === "string" ? corp.email.trim() : "";
    const parola = typeof corp?.parola === "string" ? corp.parola : "";

    if(!REGEX_EMAIL.test(email) || parola.length < LUNGIME_MINIMA_PAROLA){
        return Response.json(
            { ok: false, error: EROARE_CREDENTIALE },
            { status: 400 }
        );
    }

    try{
        const supabase = await createClient();

        const { data: dateAuth, error: eroareAuth } = await supabase.auth
            .signInWithPassword({ email, password: parola });

        if(eroareAuth || !dateAuth?.user){
            return Response.json(
                { ok: false, error: EROARE_CREDENTIALE },
                { status: 401 }
            );
        }

        const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("id_user", dateAuth.user.id)
            .single();

        if(error || data?.role !== "admin"){
            // Fără signOut ar rămâne un cookie de sesiune valid pentru un cont fără drepturi.
            await supabase.auth.signOut();

            return Response.json(
                { ok: false, error: "Contul nu are acces la panoul de administrare." },
                { status: 403 }
            );
        }

        return Response.json({ ok: true, redirect: "/admin-service" });
    }catch(err){
        console.error("Eroare login: ", err);

        return Response.json(
            { ok: false, error: "A aparut o eroare neasteptata!" },
            { status: 500 }
        );
    }
}
