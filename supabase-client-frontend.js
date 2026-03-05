/**
 * Supabase Frontend Client Initialization
 * Replace the placeholder values with your actual Supabase credentials
 */

// These would normally come from a config or env if using a bundler
// For plain HTML/JS, we can set them here or pass them in
const SUPABASE_CONFIG = {
    url: 'https://placeholder.supabase.co', // Replace with your project URL
    anonKey: 'placeholder-key' // Replace with your anon key
};

let supabaseClient = null;

function initSupabase() {
    if (typeof supabase === 'undefined') {
        console.error('Supabase library not loaded. Make sure to include the CDN script.');
        return null;
    }

    // Check if we have real credentials
    if (SUPABASE_CONFIG.url.includes('placeholder')) {
        console.warn('⚠️ Supabase placeholders detected. Please update SUPABASE_CONFIG in supabase-client-frontend.js');
    }

    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Supabase Frontend Client Initialized');
    return supabaseClient;
}

// Export for use in other scripts
window.supabaseApp = {
    get client() {
        if (!supabaseClient) return initSupabase();
        return supabaseClient;
    }
};
