import re
with open('js/supabase-client.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_init = '''async function initSupabaseData() {
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
}'''

js = re.sub(r'async function initSupabaseData\(\) \{.*?(?=async function supabaseLogin)', new_init + '\n\n', js, flags=re.DOTALL)

with open('js/supabase-client.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Fixed initSupabaseData')
