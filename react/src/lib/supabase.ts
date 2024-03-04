import {createClient} from "@supabase/supabase-js";

const supaClient = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);
export function getSupabaseClient(){
    return supaClient;
}

export async function getSession() {
    try {
        const { data: { session } } = await supaClient.auth.getSession();
        return session;
    } catch (error) {
        console.error(error);
        return null;
    }
}
