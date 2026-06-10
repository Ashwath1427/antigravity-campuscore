// js/supabase-client.js

var SUPABASE_URL = 'https://bzqqgurlqunpzgdavedz.supabase.co';
var SUPABASE_KEY = 'sb_publishable_c4FB7TUyjfrO-_g4WwV0wQ_7ALx5e27';

var { createClient } = supabase; // from CDN script tag
if (!window.supabaseClient) {
  window.supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
}

console.log('[Supabase] Client initialized:', !!window.supabaseClient);

window.checkSupabaseAuthStatus = async function() {
  const supabase = window.supabaseClient;
  console.log('====== SUPABASE AUTH DEBUG ======');
  console.log('Client initialized:', !!supabase);

  if (!supabase) {
    console.error('supabase client is undefined. Check script load order in index.html');
    return;
  }

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  console.log('Session:', sessionData, sessionError);

  const { data: userData, error: userError } = await supabase.auth.getUser();
  console.log('User:', userData, userError);

  console.log('window.currentUser:', window.currentUser);

  if (sessionData?.session) {
    const { data: testQuery, error: testError } = await supabase
      .from('cc_users')
      .select('username, role')
      .limit(3);
    console.log('Protected query result:', testQuery, testError);
  } else {
    console.warn('No session — cannot run protected queries');
  }
  console.log('=================================');
};

const supabase = window.supabaseClient;

async function initSupabaseData() {
    if (!supabase) return;
    try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData && sessionData.session) {
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
            }
            if (homeworkRes.data) window.HOMEWORK = homeworkRes.data;
        }
        
        const [announcementsRes, eventsRes] = await Promise.all([
            supabase.from('cc_announcements').select('*'),
            supabase.from('cc_events').select('*')
        ]);
        if (announcementsRes.data) window.ANNOUNCEMENTS = announcementsRes.data;
        if (eventsRes.data) window.EVENTS = eventsRes.data;
        if (typeof triggerLiveReRender === 'function') triggerLiveReRender();
    } catch (e) {
        console.error(e);
    }
}
window.initSupabaseData = initSupabaseData;
