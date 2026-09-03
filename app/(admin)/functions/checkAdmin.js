import { createClient } from '../../../lib/supabase/supabaseServer';

export async function CheckAdmin(){
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();
    if(!user){
        throw new Error("Access Denied")
    }
    const {data,error} = await supabase
        .from("user_roles")
        .select("role")
        .eq("id_user",user.id)
        .single();
    if(!data || error){
        throw new Error("Access Denied")
    }
    if(data.role !== 'admin'){
        throw new Error("Access Denied")
    }
}