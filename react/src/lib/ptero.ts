import * as supabase from "@/lib/supabase.ts";

const baseURL = import.meta.env.VITE_BASE_API_URL;
export async function getUserServers() {
    const session = await supabase.getSession();
    
    const url = baseURL;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            session: JSON.stringify(session)
        }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getSystemAllocation() {

    const url = baseURL + '/system/allocation';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch(url, options);
    return await response.json();
}
