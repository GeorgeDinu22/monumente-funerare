import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const RUTA_REFUZ = "/login";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export const config = {
    matcher: ["/admin-service", "/admin-service/:path*"],
};

export async function proxy(request){
    let raspuns = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll(){
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet){
                    cookiesToSet.forEach(({ name, value }) => {
                        request.cookies.set(name, value);
                    });

                    raspuns = NextResponse.next({ request });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        const esteStergere = options?.maxAge === 0 || value === "";

                        raspuns.cookies.set(name, value, {
                            ...options,
                            ...(esteStergere ? {} : { maxAge: SESSION_MAX_AGE }),
                            httpOnly: true,
                            secure: process.env.NODE_ENV === "production",
                            sameSite: "lax",
                            path: "/",
                        });
                    });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
        return refuza(request);
    }

    const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id_user", user.id)
        .single();

    if(error){
        return refuza(request);
    }
    if(data.role !== 'admin'){
        return refuza(request);
    }

    return raspuns;
}

function refuza(request){
    return NextResponse.redirect(new URL(RUTA_REFUZ, request.url));
}
