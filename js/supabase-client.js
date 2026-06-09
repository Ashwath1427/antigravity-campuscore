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
        
        // Fetch public data first
        const [announcementsRes, eventsRes] = await Promise.all([
            supabase.from('cc_announcements').select('*'),
            supabase.from('cc_events').select('*')
        ]);
        
        if (announcementsRes.data) window.ANNOUNCEMENTS = announcementsRes.data;
        if (eventsRes.data) window.EVENTS = eventsRes.data;

        // Check auth session
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (sessionData && sessionData.session) {
            console.log("[Supabase] Valid session found, fetching protected data...");
            const [studentsRes, homeworkRes] = await Promise.all([
                supabase.from('cc_students').select('*'),
                supabase.from('cc_homework').select('*')
            ]);
            
            if (studentsRes.data) {
                window.STUDENTS = studentsRes.data.map(s => ({
                    ...s,
                    admNo: s.adm_no || s.admNo,
                    parentName: s.parent || s.parent_name || s.parentName
                }));
                console.log(`[Supabase] Loaded ${window.STUDENTS.length} students`);
            }
            if (homeworkRes.data) {
                window.HOMEWORK = homeworkRes.data;
            }
        } else {
            console.log("[Supabase] No active session, skipping protected data fetch.");
        }

        console.log("[Supabase] Data sync complete");
        if (typeof triggerLiveReRender === 'function') triggerLiveReRender();
    } catch (e) {
        console.error("[Supabase] Error during data sync:", e);
    }
}

async function supabaseLogin(username, password) {
    if (!supabase) return { success: false, fallback: true };

    try {
        console.log(`[Supabase Auth] Attempting login for username: ${username}`);
        
        // 1. Map username to email (Since cc_users is public or allows anon reads)
        const { data: userMapping, error: mapError } = await supabase
            .from('cc_users')
            .select('email')
            .eq('username', username.toUpperCase())
            .single();
            
        if (mapError || !userMapping || !userMapping.email) {
            console.error("[Supabase Auth] Username mapping failed:", mapError);
            return { success: false, message: "Invalid username or user not found in database" };
        }

        const userEmail = userMapping.email;
        console.log(`[Supabase Auth] Mapped to email: ${userEmail}`);

        // 2. Perform Real Supabase Auth Login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: userEmail,
            password: password
        });

        if (authError) {
            console.error("[Supabase Auth] Authentication failed:", authError);
            return { success: false, message: "Invalid credentials" };
        }

        console.log("[Supabase Auth] Auth successful, fetching profile...");

        // 3. Fetch full profile using authenticated session
        const { data: profileData, error: profileError } = await supabase
            .from('cc_users')
            .select('*')
            .eq('email', userEmail)
            .single();

        if (profileError || !profileData) {
            console.error("[Supabase Auth] Profile fetch failed:", profileError);
            return { success: false, message: "Could not fetch user profile" };
        }

        const mappedUser = {
            ...profileData,
            roleLabel: profileData.role_label || profileData.roleLabel
        };

        return { success: true, user: mappedUser };
    } catch (e) {
        console.error("[Supabase] Unexpected Login error:", e);
        return { success: false, fallback: true };
    }
}

// Auto-init on script load
window.initSupabaseData = initSupabaseData;
window.supabaseLogin = supabaseLogin;


window.checkSupabaseAuthStatus = async function() {
    console.log('====== SUPABASE AUTH DEBUG ======');
    console.log('Client initialized:', !!supabase);
    
    if (!supabase) return;
    
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    console.log('Session Data:', sessionData);
    if (sessionError) console.error('Session Error:', sessionError);
    
    const { data: userData, error: userError } = await supabase.auth.getUser();
    console.log('User Data:', userData);
    if (userError) console.error('User Error:', userError);
    
    console.log('Current App Role Loaded:', window.currentUser ? window.currentUser.role : 'None');
    
    if (userData && userData.user) {
        // Protected query
        console.log('Attempting protected query (cc_users)...');
        const { data: users, error: usersErr } = await supabase.from('cc_users').select('*').limit(1);
        if (usersErr) console.error('Protected query failed (expected if RLS blocks, but should succeed if authenticated properly):', usersErr);
        else console.log('Protected query SUCCESS:', users);
        
        // Unauthorized query (let us try to insert into cc_notices which might be blocked for student)
        if (window.currentUser && window.currentUser.role === 'student') {
            console.log('Attempting unauthorized query (insert cc_notices)...');
            const { error: insertErr } = await supabase.from('cc_notices').insert([{ title: 'Hack', content: 'Hack' }]);
            if (insertErr) console.log('Unauthorized query successfully blocked:', insertErr);
            else console.error('SECURITY WARNING: Unauthorized query succeeded!');
        }
    }
    console.log('=================================');
};
