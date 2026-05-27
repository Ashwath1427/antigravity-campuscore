/**
 * CAMPUS CORE – SUPABASE CLIENT
 * Live integration for production-style dashboard data.
 * Mapping to 'cc_' prefixed tables.
 */

// --- CONFIGURATION ---
const SUPABASE_URL = (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.URL) ? SUPABASE_CONFIG.URL : null;
const SUPABASE_ANON_KEY = (typeof SUPABASE_CONFIG !== 'undefined' && SUPABASE_CONFIG.ANON_KEY) ? SUPABASE_CONFIG.ANON_KEY : null;

let supabase = null;

/**
 * Initializes the Supabase client.
 */
function initSupabase() {
    if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 50) {
        try {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log("[Supabase] Client initialized");
            return true;
        } catch (e) {
            console.error("[Supabase] Initialization error:", e);
        }
    } else {
        console.warn("[Supabase] Config missing or library not loaded. Running in Fallback Mode.");
    }
    return false;
}

/**
 * Fetches core data from Supabase and syncs to global state.
 */
async function initSupabaseData() {
    if (!supabase) {
        if (!initSupabase()) return;
    }

    try {
        console.log("[Supabase] Fetching live data...");

        // Parallel fetch for better performance
        const [studentsRes, announcementsRes, homeworkRes, eventsRes] = await Promise.all([
            supabase.from('cc_students').select('*'),
            supabase.from('cc_announcements').select('*'),
            supabase.from('cc_homework').select('*'),
            supabase.from('cc_events').select('*')
        ]);

        // 1. Sync Students
        if (studentsRes.data) {
            // Map snake_case database columns to camelCase JS properties
            window.STUDENTS = studentsRes.data.map(s => ({
                ...s,
                admNo: s.adm_no || s.admNo,
                parentName: s.parent || s.parent_name || s.parentName
            }));
            console.log(`[Supabase] Loaded ${window.STUDENTS.length} students`);
        }


        // 2. Sync Announcements
        if (announcementsRes.data) {
            window.ANNOUNCEMENTS = announcementsRes.data;
        }

        // 3. Sync Homework
        if (homeworkRes.data) {
            window.HOMEWORK = homeworkRes.data;
        }

        // 4. Sync Events
        if (eventsRes.data) {
            window.EVENTS = eventsRes.data;
        }

        console.log("[Supabase] Data sync complete");
        
        // Trigger UI re-render if needed
        if (typeof triggerLiveReRender === 'function') triggerLiveReRender();

    } catch (e) {
        console.error("[Supabase] Error during data sync:", e);
    }
}

/**
 * Handles login via Supabase 'cc_users' table.
 */
async function supabaseLogin(username, password) {
    if (!supabase) return { success: false, fallback: true };

    try {
        const { data, error } = await supabase
            .from('cc_users')
            .select('*')
            .eq('username', username.toUpperCase())
            .single();

        if (error || !data) {
            return { success: false, fallback: true };
        }

        // Simple password check (matching seed pattern)
        if (data.password === password) {
            const mappedUser = {
                ...data,
                roleLabel: data.role_label || data.roleLabel
            };
            return { success: true, user: mappedUser };
        } else {

            return { success: false, message: "Invalid credentials" };
        }
    } catch (e) {
        console.error("[Supabase] Login error:", e);
        return { success: false, fallback: true };
    }
}

// Auto-init on script load
window.initSupabaseData = initSupabaseData;
window.supabaseLogin = supabaseLogin;
