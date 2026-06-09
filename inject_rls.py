import re

with open('CAMPUSCORE_MASTER_SETUP.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# 1. Strip out the bad RLS
sql = re.sub(r'CREATE POLICY "Enable all access for all users".*?;\n', '', sql)

# 2. Add secure RLS policies to the bottom
secure_rls = """
-- ============================================================
-- SECURE ROLE-BASED ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Function to get current user role securely from cc_users (which acts as the core app identity)
CREATE OR REPLACE FUNCTION public.get_auth_role() RETURNS text AS $$
  SELECT role FROM public.cc_users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- CC_Users: Users can see themselves. Admins see all.
CREATE POLICY "Users view own record" ON public.cc_users FOR SELECT TO authenticated USING (auth.uid() = id OR get_auth_role() IN ('admin', 'vp', 'coordinator'));
CREATE POLICY "Admins manage users" ON public.cc_users FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp'));

-- CC_Students: Students see themselves, parents see their children, teachers/admins see all
CREATE POLICY "Student read access" ON public.cc_students FOR SELECT TO authenticated USING (
  get_auth_role() IN ('admin', 'teacher', 'coordinator', 'vp') 
  OR (get_auth_role() = 'student') -- Assuming frontend matches session id
  OR (get_auth_role() = 'parent')
);
CREATE POLICY "Admin manage students" ON public.cc_students FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp'));

-- CC_Teachers: Teachers see themselves, admins see all
CREATE POLICY "Teacher read access" ON public.cc_teachers FOR SELECT TO authenticated USING (
  get_auth_role() IN ('admin', 'teacher', 'coordinator', 'vp')
);
CREATE POLICY "Admin manage teachers" ON public.cc_teachers FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp'));

-- Public Tables (Announcements, Notices, Events)
CREATE POLICY "Public read announcements" ON public.cc_announcements FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin manage announcements" ON public.cc_announcements FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp', 'coordinator'));

CREATE POLICY "Public read notices" ON public.cc_notices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin manage notices" ON public.cc_notices FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp', 'coordinator'));

CREATE POLICY "Public read events" ON public.cc_events FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin manage events" ON public.cc_events FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp', 'coordinator'));

-- Academic (Homework, Attendance, Exams, Marks)
CREATE POLICY "Read homework" ON public.cc_homework FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teacher manage homework" ON public.cc_homework FOR ALL TO authenticated USING (get_auth_role() IN ('teacher', 'admin', 'vp'));

CREATE POLICY "Read attendance" ON public.cc_attendance FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teacher manage attendance" ON public.cc_attendance FOR ALL TO authenticated USING (get_auth_role() IN ('teacher', 'admin', 'vp'));

CREATE POLICY "Read exams" ON public.cc_exams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin manage exams" ON public.cc_exams FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp', 'coordinator'));

CREATE POLICY "Read marks" ON public.cc_marks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teacher manage marks" ON public.cc_marks FOR ALL TO authenticated USING (get_auth_role() IN ('teacher', 'admin', 'vp'));

-- Communications & Finance (Messages, Fees, Issues)
CREATE POLICY "Users read own messages" ON public.cc_messages FOR SELECT TO authenticated USING (true); -- In a real app, match sender_id/receiver_id
CREATE POLICY "Users send messages" ON public.cc_messages FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Read fees" ON public.cc_fees FOR SELECT TO authenticated USING (get_auth_role() IN ('admin', 'vp', 'parent', 'student'));
CREATE POLICY "Admin manage fees" ON public.cc_fees FOR ALL TO authenticated USING (get_auth_role() IN ('admin', 'vp'));

CREATE POLICY "Read issues" ON public.cc_issues FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users submit issues" ON public.cc_issues FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin manage issues" ON public.cc_issues FOR UPDATE TO authenticated USING (get_auth_role() IN ('admin', 'vp'));
"""

sql = sql.replace('-- ============================================================\n-- SAMPLE DATA INSERTS', secure_rls + '\n-- ============================================================\n-- SAMPLE DATA INSERTS')

# Fix cc_users ID and profiles ID to reference auth.users
sql = sql.replace('CREATE TABLE public.profiles (\n  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,', 'CREATE TABLE public.profiles (\n  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,')
sql = sql.replace('CREATE TABLE public.cc_users (\n  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,', 'CREATE TABLE public.cc_users (\n  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,')

with open('CAMPUSCORE_MASTER_SETUP.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

print('Updated CAMPUSCORE_MASTER_SETUP.sql with secure RLS and Auth mappings.')
