// js/supabase-client.js
const SUPABASE_URL = 'https://bzqqgurlqunpzgdavedz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('[Supabase] Client initialized:', !!window.supabaseClient);

window.checkSupabaseAuthStatus = async function () {
  console.log('====== SUPABASE AUTH DEBUG ======');
  console.log('Client initialized:', !!window.supabaseClient);

  if (!window.supabaseClient) {
    console.error('Supabase client not initialized');
    return;
  }

  const { data: sessionData, error: sessionError } = await window.supabaseClient.auth.getSession();
  console.log('Session:', sessionData, sessionError);

  const { data: userData, error: userError } = await window.supabaseClient.auth.getUser();
  console.log('User:', userData, userError);

  console.log('window.currentUser:', window.currentUser);
  console.log('=================================');
};

async function initSupabaseData() {
    const db = window.supabaseClient;
    if (!db) return;
    try {
        const { data: sessionData } = await db.auth.getSession();
        if (sessionData && sessionData.session) {
            const [studentsRes, homeworkRes] = await Promise.all([
                db.from('cc_students').select('*'),
                db.from('cc_homework').select('*')
            ]);
            if (studentsRes.data) {
                window.STUDENTS = studentsRes.data.map(s => ({
                    ...s,
                    admNo: s.adm_no || s.admNo,
                    parentName: s.parent || s.parent_name || s.parentName
                }));
            }
            if (homeworkRes.data) window.HOMEWORK = homeworkRes.data;
        }
        
        const [announcementsRes, eventsRes] = await Promise.all([
            db.from('cc_announcements').select('*'),
            db.from('cc_events').select('*')
        ]);
        if (announcementsRes.data) window.ANNOUNCEMENTS = announcementsRes.data;
        if (eventsRes.data) window.EVENTS = eventsRes.data;
        if (typeof triggerLiveReRender === 'function') triggerLiveReRender();
    } catch (e) {
        console.error(e);
    }
}
window.initSupabaseData = initSupabaseData;
