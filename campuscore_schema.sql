-- ============================================================
--   CAMPUSCORE – COMPLETE DATABASE SCHEMA
--   Paste this entire file into Supabase SQL Editor and run.
--   All tables use uuid PKs, created_at timestamps, and RLS.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- TABLES
-- ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS cc_users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL,
  name text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_students (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  class text,
  section text,
  roll_no text,
  parent_username text,
  username text UNIQUE,
  password text,
  gender text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_teachers (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  subject text,
  email text,
  phone text,
  username text UNIQUE,
  password text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_attendance (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id text,
  date date,
  status text,
  class text,
  section text,
  marked_by text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_results (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id text,
  subject text,
  marks numeric,
  max_marks numeric,
  exam_type text,
  class text,
  section text,
  date date,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_homework (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  subject text,
  class text,
  section text,
  due_date date,
  description text,
  created_by text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_notices (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  content text,
  created_by text,
  role_target text,
  date date,
  priority text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_events (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  description text,
  date date,
  location text,
  created_by text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id text,
  receiver_id text,
  content text,
  timestamp timestamptz DEFAULT now(),
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_issues (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  description text,
  raised_by text,
  assigned_to text,
  status text DEFAULT 'open',
  priority text DEFAULT 'medium',
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_approvals (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  type text,
  requested_by text,
  status text DEFAULT 'pending',
  date date DEFAULT CURRENT_DATE,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_announcements (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text,
  content text,
  created_by text,
  date date DEFAULT CURRENT_DATE,
  target_roles text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_fees (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id text,
  amount numeric,
  due_date date,
  paid_date date,
  status text DEFAULT 'pending',
  type text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cc_timetable (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  class text,
  section text,
  day text,
  period integer,
  subject text,
  teacher_id text,
  created_at timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- ENABLE ROW LEVEL SECURITY
-- ─────────────────────────────────────────────

ALTER TABLE cc_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_timetable ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────
-- RLS POLICIES – Allow public (anon) full access
-- ─────────────────────────────────────────────

CREATE POLICY "allow_all" ON cc_users         FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_students      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_teachers      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_attendance    FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_results       FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_homework      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_notices       FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_events        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_messages      FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_issues        FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_approvals     FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_announcements FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_fees          FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_timetable     FOR ALL TO anon USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────
-- SEED DEMO USERS
-- ─────────────────────────────────────────────

INSERT INTO cc_users (username, password, role, name) VALUES
  ('VP001',      'VP123',         'vice_principal', 'SUMAN'),
  ('PRIN001',    'PRINCIPAL123',  'principal',      'Principal'),
  ('APAAAS',     'APAAAS',        'super_admin',    'Admin'),
  ('APASAA',     'APASAA',        'mac_admin',      'MAC Admin'),
  ('C001',       'coord123',      'coordinator',    'Coordinator'),
  ('T001',       'teacher123',    'teacher',        'Teacher One'),
  ('P3180076A',  'parent123',     'parent',         'KASULA ASHWATH')
ON CONFLICT (username) DO NOTHING;
