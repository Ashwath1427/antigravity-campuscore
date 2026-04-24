/**
 * CAMPUS CORE – SUPABASE CONFIG
 * Browser-safe configuration for Supabase client.
 * 
 * IMPORTANT: Replace the placeholders below with your actual Supabase credentials.
 * You can find these in your Supabase Dashboard under:
 * Project Settings -> API
 */

const SUPABASE_CONFIG = {
    // 1. PROJECT URL
    // Production Supabase project for CampusCore
    URL: "https://bzqqgurlqunpzgdavedz.supabase.co",

    // 2. ANON / PUBLISHABLE KEY
    // Production anonymous key
    ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cXFxdXJscXF1bnB6Z2RhdmVkeiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE0NDI5NjcwLCJleHAiOjIwMzAwMDU2NzB9.9hJ6K5m_XqPfGvLz8JxQ5sYfVhQh2aL8J9m9qF2pW7k"
};

/**
 * Checks if Supabase is properly configured.
 * @returns {boolean}
 */
function isSupabaseConfigured() {
    return SUPABASE_CONFIG.URL && 
           SUPABASE_CONFIG.URL !== "https://demo.supabase.co" &&
           SUPABASE_CONFIG.ANON_KEY && 
           SUPABASE_CONFIG.ANON_KEY !== "demo-key-for-testing-purposes-only";
}

// Note: Supabase client initialization is handled by supabase-client.js to avoid conflicts
