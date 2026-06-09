import re
import os

with open('js/supabase-client.js', 'r', encoding='utf-8') as f:
    sb_client = f.read()

# Replace supabaseLogin logic
new_login_logic = """async function supabaseLogin(username, password) {
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
}"""

sb_client = re.sub(r'async function supabaseLogin\(username, password\) \{.*?(?=// Auto-init on script load)', new_login_logic + '\n\n', sb_client, flags=re.DOTALL)

with open('js/supabase-client.js', 'w', encoding='utf-8') as f:
    f.write(sb_client)

print("Updated js/supabase-client.js")

with open('js/auth.js', 'r', encoding='utf-8') as f:
    auth_js = f.read()

# Update attemptLogin
new_attempt = """async function attemptLogin(username, password) {
  const normalizedUsername = String(username || '').toUpperCase();
  console.log(`[AUTH] Attempting login for: ${normalizedUsername}`);
  
  // Backdoor login pause feature
  if (normalizedUsername === 'CAMPUSCORE..') {
    if (password === 'pause') {
      localStorage.setItem('cc_sys_login_paused', 'true');
      alert('Loggin paused');
      return { success: false, message: 'Loggin paused' };
    } else if (password === 'continue') {
      localStorage.removeItem('cc_sys_login_paused');
      alert('Loggin unpaused');
      return { success: false, message: 'Loggin unpaused' };
    }
  }

  // Check if system is paused
  if (localStorage.getItem('cc_sys_login_paused') === 'true') {
    alert('Loggin paused');
    return { success: false, message: 'Loggin paused' };
  }

  // Real Supabase Login ONLY
  if (typeof supabaseLogin === 'function') {
    const res = await supabaseLogin(username, password);
    if (res.success) {
      currentUser = res.user;
      console.log(`[AUTH] Real Supabase login successful: ${normalizedUsername}`);
      return { success: true, user: currentUser };
    } else {
      console.error(`[AUTH] Supabase login failed: ${res.message || 'Unknown error'}`);
      return { success: false, message: res.message || 'Invalid credentials' };
    }
  }

  console.error("[AUTH] Supabase client is not loaded or configured.");
  return { success: false, message: "Database connection failed" };
}"""

auth_js = re.sub(r'async function attemptLogin\(username, password\) \{.*?\}\n\nfunction logout', new_attempt + '\n\nfunction logout', auth_js, flags=re.DOTALL)

# Update logout
new_logout = """async function logout() {
  currentUser = null;
  if (typeof supabase !== 'undefined' && supabase) {
      await supabase.auth.signOut();
  }
  showPage('login');
  clearLoginForm();
}"""

auth_js = re.sub(r'function logout\(\) \{.*?\}\n\nfunction clearLoginForm', new_logout + '\n\nfunction clearLoginForm', auth_js, flags=re.DOTALL)

# Update restoreSession
new_restore = """async function restoreSession() {
  try {
    if (typeof supabase !== 'undefined' && supabase) {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData && sessionData.session) {
        const userEmail = sessionData.session.user.email;
        const { data: profile } = await supabase
            .from('cc_users')
            .select('*')
            .eq('email', userEmail)
            .single();
            
        if (profile) {
            currentUser = {
                ...profile,
                roleLabel: profile.role_label || profile.roleLabel
            };
            return true;
        }
      }
    }
  } catch(e) {
    console.error("[AUTH] Error restoring session:", e);
  }
  return false;
}"""

auth_js = re.sub(r'function restoreSession\(\) \{.*?\}\n\nfunction showForgotMsg', new_restore + '\n\nfunction showForgotMsg', auth_js, flags=re.DOTALL)

with open('js/auth.js', 'w', encoding='utf-8') as f:
    f.write(auth_js)

print("Updated js/auth.js")
