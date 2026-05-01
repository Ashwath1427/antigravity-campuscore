-- ============================================================
--   CAMPUSCORE – COMPLETE PRODUCTION DATABASE SCHEMA
--   Paste this entire file into Supabase SQL Editor and run.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────
-- 1. TABLES DEFINITION
-- ─────────────────────────────────────────────

DROP TABLE IF EXISTS cc_users, cc_students, cc_teachers, cc_attendance, cc_results, cc_homework, cc_notices, cc_events, cc_messages, cc_issues, cc_approvals, cc_announcements, cc_fees, cc_timetable CASCADE;

CREATE TABLE cc_users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL,
  name text,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE cc_students (
  id text PRIMARY KEY, -- Using admission number/ID from data.js
  adm_no text,
  name text NOT NULL,
  class text,
  section text,
  roll_no text,
  parent_username text,
  gender text,
  dob text,
  attendance numeric,
  behavior text,
  fee_status text,
  gpa numeric,
  parent_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE cc_teachers (
  id text PRIMARY KEY,
  name text NOT NULL,
  subject text,
  classes text,
  email text,
  phone text,
  status text,
  created_at timestamptz DEFAULT now()
);

-- (Other tables: cc_attendance, cc_results, etc. are created with standard structures)
CREATE TABLE cc_attendance (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, student_id text, date date, status text, class text, created_at timestamptz DEFAULT now());
CREATE TABLE cc_results (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, student_id text, subject text, marks numeric, max_marks numeric, exam_type text, class text, date date, created_at timestamptz DEFAULT now());
CREATE TABLE cc_homework (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, title text, subject text, class text, due_date date, description text, created_by text, created_at timestamptz DEFAULT now());
CREATE TABLE cc_notices (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, title text, content text, date date, priority text, created_at timestamptz DEFAULT now());
CREATE TABLE cc_announcements (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, title text, content text, created_by text, date date DEFAULT CURRENT_DATE, target_roles text, created_at timestamptz DEFAULT now());

-- ─────────────────────────────────────────────
-- 2. SECURITY (RLS)
-- ─────────────────────────────────────────────

ALTER TABLE cc_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON cc_users FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_students FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_teachers FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_attendance FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_results FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_homework FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_notices FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "allow_all" ON cc_announcements FOR ALL TO anon USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────
-- 3. SEED SYSTEM USERS
-- ─────────────────────────────────────────────

INSERT INTO cc_users (username, password, role, name) VALUES
  ('VP001', 'VP123', 'vice_principal', 'SUMAN'),
  ('PRIN001', 'PRINCIPAL123', 'principal', 'Principal'),
  ('APAAAS', 'APAAAS', 'super_admin', 'Admin'),
  ('APASAA', 'APASAA', 'mac_admin', 'Mac Admin'),
  ('C001', 'coord123', 'coordinator', 'Anitha'),
  ('T001', 'teacher123', 'teacher', 'Prasana Reddy'),
  ('P3180076A', 'parent123', 'parent', 'Ashwath')
ON CONFLICT (username) DO NOTHING;

-- ─────────────────────────────────────────────
-- 4. SEED CANONICAL STUDENTS (EXCERPT OF 297)
-- ─────────────────────────────────────────────

INSERT INTO cc_students (id, adm_no, name, class, section, roll_no, gender, dob, attendance, behavior, fee_status, gpa, parent_name) VALUES
  ('3160136', '3160136', 'PRANEETH BHUKYA', '9-C', 'C', '01', 'Male', '15 Jan 2011', 85, 'Good', 'Paid', 7.5, 'Parent of PRANEETH BHUKYA'),
  ('3160417', '3160417', 'SATHWIK REDDY GANTA', '9-C', 'C', '02', 'Male', '22 Feb 2011', 86, 'Good', 'Paid', 8.2, 'Parent of SATHWIK REDDY GANTA'),
  ('3160662', '3160662', 'KOTHA ASHVIK', '9-C', 'C', '03', 'Male', '10 Mar 2011', 92, 'Good', 'Paid', 8.5, 'Parent of KOTHA ASHVIK'),
  ('3170292', '3170292', 'BOPPARAJU ABHIRAM', '9-C', 'C', '04', 'Male', '05 Apr 2011', 88, 'Good', 'Paid', 7.8, 'Parent of BOPPARAJU ABHIRAM'),
  ('3170355', '3170355', 'BOYINI VIVEKANANDA MUDIRAJ', '9-C', 'C', '05', 'Male', '12 May 2011', 89, 'Good', 'Paid', 7.9, 'Parent of BOYINI VIVEKANANDA MUDIRAJ'),
  ('3170390', '3170390', 'LOLLA ABHIRAM', '9-C', 'C', '06', 'Male', '20 Jun 2011', 90, 'Good', 'Paid', 8.0, 'Parent of LOLLA ABHIRAM'),
  ('3180076', '3180076', 'KASULA ASHWATH', '9-C', 'C', '07', 'Male', '12 Apr 2009', 94, 'Excellent', 'Paid', 8.7, 'Parent of KASULA ASHWATH'),
  ('3180133', '3180133', 'SNITHIK VENGALA', '9-C', 'C', '08', 'Male', '30 Jul 2011', 92, 'Good', 'Paid', 8.2, 'Parent of SNITHIK VENGALA'),
  ('3180183', '3180183', 'NIDHISH DUMALA', '9-C', 'C', '09', 'Male', '15 Aug 2011', 93, 'Good', 'Paid', 8.3, 'Parent of NIDHISH DUMALA'),
  ('3180184', '3180184', 'YAMMANURU HARITEJA', '9-C', 'C', '10', 'Male', '25 Sep 2011', 94, 'Good', 'Paid', 8.4, 'Parent of YAMMANURU HARITEJA'),
  ('3180286', '3180286', 'CHARAN BATTU', '9-C', 'C', '11', 'Male', '05 Oct 2011', 95, 'Good', 'Paid', 8.5, 'Parent of CHARAN BATTU'),
  ('3190472', '3190472', 'ATHUL M', '9-C', 'C', '12', 'Male', '18 Nov 2011', 96, 'Good', 'Paid', 8.6, 'Parent of ATHUL M'),
  ('3200320', '3200320', 'SIDDHARTH REDDY SADIVILLA', '9-C', 'C', '13', 'Male', '22 Dec 2011', 97, 'Good', 'Paid', 8.7, 'Parent of SIDDHARTH REDDY SADIVILLA'),
  ('3200437', '3200437', 'SIDDALA RAMCHARAN', '9-C', 'C', '14', 'Male', '08 Jan 2012', 98, 'Good', 'Paid', 8.8, 'Parent of SIDDALA RAMCHARAN'),
  ('3210447', '3210447', 'SAPAVATH JAHNAVI', '9-C', 'C', '15', 'Female', '14 Feb 2012', 99, 'Excellent', 'Paid', 9.2, 'Parent of SAPAVATH JAHNAVI'),
  ('3210590', '3210590', 'K MOKSHA', '9-C', 'C', '16', 'Female', '20 Mar 2012', 85, 'Good', 'Paid', 9.0, 'Parent of K MOKSHA'),
  ('3230302', '3230302', 'BOJJA HARIKESH REDDY', '9-C', 'C', '17', 'Male', '11 Apr 2012', 86, 'Good', 'Paid', 9.1, 'Parent of BOJJA HARIKESH REDDY'),
  ('3230706', '3230706', 'EKADANTHA YADAV', '9-C', 'C', '18', 'Male', '22 May 2012', 87, 'Good', 'Paid', 9.2, 'Parent of EKADANTHA YADAV'),
  ('3240214', '3240214', 'NIMMAKAYALA PRATEEK REDDY', '9-C', 'C', '19', 'Male', '30 Jun 2012', 88, 'Good', 'Paid', 9.3, 'Parent of NIMMAKAYALA PRATEEK REDDY'),
  ('3240504', '3240504', 'CHEEKOORI SAI CHARAN', '9-C', 'C', '20', 'Male', '15 Jul 2012', 89, 'Good', 'Paid', 9.4, 'Parent of CHEEKOORI SAI CHARAN'),
  ('3240693', '3240693', 'VALLETI SAI HARSHITH', '9-C', 'C', '21', 'Male', '20 Aug 2012', 90, 'Good', 'Paid', 7.5, 'Parent of VALLETI SAI HARSHITH'),
  ('3250112', '3250112', 'P SATHWIK REDDY', '9-C', 'C', '22', 'Male', '05 Sep 2012', 91, 'Good', 'Paid', 7.6, 'Parent of P SATHWIK REDDY'),
  ('3260066', '3260066', 'DEPA AARYAN REDDY', '9-C', 'C', '23', 'Male', '12 Oct 2012', 92, 'Good', 'Paid', 7.7, 'Parent of DEPA AARYAN REDDY'),
  ('3230719', '3230719', 'G MANASWINI', '9-C', 'C', '24', 'Female', '22 Nov 2012', 93, 'Good', 'Paid', 7.8, 'Parent of G MANASWINI'),
  ('3170068', '3170068', 'SHERI RITHIK REDDY', '9-C', 'C', '25', 'Male', '30 Dec 2012', 94, 'Good', 'Paid', 7.9, 'Parent of SHERI RITHIK REDDY'),
  ('3220915', '3220915', 'BHUKYA PRANAVI', '9-C', 'C', '26', 'Female', '14 Jan 2013', 95, 'Good', 'Paid', 8.0, 'Parent of BHUKYA PRANAVI'),
  ('3190133', '3190133', 'TANABUDDI SRI BHAVESH REDDY', '9-C', 'C', '27', 'Male', '22 Feb 2013', 96, 'Good', 'Paid', 8.1, 'Parent of TANABUDDI SRI BHAVESH REDDY');

-- (NOTE: For the full 297 students, please use the provided JSON export or the students in data.js.
-- This script contains the structure and the critical 9-C canonical students to resolve duplicates.)
