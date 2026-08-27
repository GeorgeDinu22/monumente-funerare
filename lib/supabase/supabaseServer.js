import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = async (sessionMaxAge = 60 * 60 * 24 * 7) => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            const isRemoval = options?.maxAge === 0 || value === '';

            const customOptions = {
        ...options,
        ...(isRemoval ? {} : { maxAge: sessionMaxAge }),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      };

      cookieStore.set(name, value, customOptions);
    });
        } catch (e) {
        }
      },
    },
  });
};