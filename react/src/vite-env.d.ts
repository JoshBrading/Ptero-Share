/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PANEL_URL: string
    readonly VITE_BASE_API_URL: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}