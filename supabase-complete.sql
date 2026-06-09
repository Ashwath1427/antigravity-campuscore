-- ============================================================
-- CAMPUS CORE - FINAL SUPABASE DEPLOYMENT SCRIPT (SCHEMA + DATA)
-- Generated automatically
-- ============================================================

-- ============================================================
-- CAMPUSCORE MASTER SCHEMA — SINGLE SOURCE OF TRUTH
-- Generated from full codebase audit
-- ============================================================

BEGIN;

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS public.cc_system_logs CASCADE;
DROP TABLE IF EXISTS public.cc_approvals CASCADE;
DROP TABLE IF EXISTS public.cc_issues CASCADE;
DROP TABLE IF EXISTS public.cc_helpdesk_tickets CASCADE;
DROP TABLE IF EXISTS public.cc_fees CASCADE;
DROP TABLE IF EXISTS public.cc_messages CASCADE;
DROP TABLE IF EXISTS public.cc_marks CASCADE;
DROP TABLE IF EXISTS public.cc_results CASCADE;
DROP TABLE IF EXISTS public.cc_exams CASCADE;
DROP TABLE IF EXISTS public.cc_attendance CASCADE;
DROP TABLE IF EXISTS public.cc_homework CASCADE;
DROP TABLE IF EXISTS public.cc_events CASCADE;
DROP TABLE IF EXISTS public.cc_notices CASCADE;
DROP TABLE IF EXISTS public.cc_announcements CASCADE;
DROP TABLE IF EXISTS public.cc_students CASCADE;
DROP TABLE IF EXISTS public.cc_teachers CASCADE;
DROP TABLE IF EXISTS public.cc_users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.classes CASCADE;
DROP TABLE IF EXISTS public.students CASCADE;
DROP TABLE IF EXISTS public.teachers CASCADE;
DROP TABLE IF EXISTS public.homework CASCADE;
DROP TABLE IF EXISTS public.exams CASCADE;
DROP TABLE IF EXISTS public.marks CASCADE;
DROP TABLE IF EXISTS public.issues CASCADE;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Profiles (linked to auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'coordinator', 'parent', 'student', 'vp')),
    role_label TEXT,
    department TEXT,
    phone TEXT,
    email TEXT,
    joined TEXT,
    avatar_color TEXT,
    icon TEXT,
    child_name TEXT,
    child_class TEXT,
    child_roll TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: we keep cc_users because JS currently heavily queries supabase.from('cc_users')
CREATE TABLE public.cc_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'coordinator', 'parent', 'student', 'vp')),
    role_label TEXT,
    department TEXT,
    phone TEXT,
    email TEXT,
    joined TEXT,
    avatar_color TEXT,
    icon TEXT,
    child_name TEXT,
    child_class TEXT,
    child_roll TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Teachers
CREATE TABLE public.cc_teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    classes JSONB,
    experience TEXT,
    phone TEXT,
    email TEXT,
    status TEXT DEFAULT 'Active',
    department TEXT,
    is_active BOOLEAN DEFAULT true,
    avatar_color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Students
CREATE TABLE public.cc_students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    adm_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
  section TEXT,
    roll TEXT,
    gender TEXT,
    dob TEXT,
    attendance NUMERIC(5,2) DEFAULT 0,
    behavior TEXT,
    fee_status TEXT DEFAULT 'Paid',
    gpa NUMERIC(3,2) DEFAULT 0,
    parent TEXT,
    parent_contact TEXT,
  parent_email TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Announcements / Notices
CREATE TABLE public.cc_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    priority TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.cc_notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    priority TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Events
CREATE TABLE public.cc_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    description TEXT,
    color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Homework
CREATE TABLE public.cc_homework (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT,
    class TEXT,
    teacher TEXT,
    due TEXT,
    submitted INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    status TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Attendance
CREATE TABLE public.cc_attendance (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.cc_students(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Exams
CREATE TABLE public.cc_exams (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    date TEXT,
    class TEXT,
    subject TEXT,
    duration TEXT,
    room TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Marks/Results
CREATE TABLE public.cc_marks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.cc_students(id) ON DELETE CASCADE,
    exam_id UUID REFERENCES public.cc_exams(id) ON DELETE CASCADE,
    subject TEXT,
    marks_obtained NUMERIC,
    total_marks NUMERIC,
    grade TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Messages
CREATE TABLE public.cc_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender TEXT NOT NULL,
    sender_role TEXT,
    recipient TEXT NOT NULL,
    recipient_role TEXT,
    subject TEXT,
    date TEXT,
    preview TEXT,
    unread BOOLEAN DEFAULT true,
    thread JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Fees
CREATE TABLE public.cc_fees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.cc_students(id) ON DELETE CASCADE,
    amount NUMERIC,
    due_date TEXT,
    status TEXT,
    term TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Issues / Helpdesk
CREATE TABLE public.cc_issues (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject TEXT,
    status TEXT,
    student_name TEXT,
    assigned_to TEXT,
    priority TEXT,
    last_update TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_cc_users_username ON public.cc_users(username);
CREATE INDEX idx_cc_students_class ON public.cc_students(class);
CREATE INDEX idx_cc_attendance_student ON public.cc_attendance(student_id);
CREATE INDEX idx_cc_marks_student ON public.cc_marks(student_id);
CREATE INDEX idx_cc_marks_exam ON public.cc_marks(exam_id);
CREATE INDEX idx_cc_fees_student ON public.cc_fees(student_id);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cc_issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for all users" ON public.profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_teachers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_notices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_events FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_homework FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_attendance FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_exams FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_marks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_fees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for all users" ON public.cc_issues FOR ALL USING (true) WITH CHECK (true);

-- TRIGGERS
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_users_modtime BEFORE UPDATE ON public.cc_users FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_teachers_modtime BEFORE UPDATE ON public.cc_teachers FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_students_modtime BEFORE UPDATE ON public.cc_students FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_announcements_modtime BEFORE UPDATE ON public.cc_announcements FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_notices_modtime BEFORE UPDATE ON public.cc_notices FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_events_modtime BEFORE UPDATE ON public.cc_events FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_homework_modtime BEFORE UPDATE ON public.cc_homework FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_attendance_modtime BEFORE UPDATE ON public.cc_attendance FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_exams_modtime BEFORE UPDATE ON public.cc_exams FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_marks_modtime BEFORE UPDATE ON public.cc_marks FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_messages_modtime BEFORE UPDATE ON public.cc_messages FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_fees_modtime BEFORE UPDATE ON public.cc_fees FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_cc_issues_modtime BEFORE UPDATE ON public.cc_issues FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

COMMIT;


-- ============================================================
-- SAMPLE DATA INSERTS
-- ============================================================

INSERT INTO cc_users (username, password, name, email, phone, role, role_label, department, avatar_color, icon) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_students (adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status) VALUES
INSERT INTO cc_teachers (employee_id, name, subject, classes, experience, phone, email, status, department) VALUES
INSERT INTO cc_announcements (title, content, date, author, category, priority, target_audience) VALUES
