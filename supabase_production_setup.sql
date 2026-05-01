-- ============================================================
-- CAMPUSCORE PRODUCTION SETUP SCRIPT
-- ============================================================
-- This script will initialize the entire database from scratch.
-- Execute this in the Supabase SQL Editor.
-- WARNING: This will drop existing tables to ensure a clean state.

-- 1. CLEANUP
DROP TABLE IF EXISTS cc_student_requests CASCADE;
DROP TABLE IF EXISTS cc_helpdesk_tickets CASCADE;
DROP TABLE IF EXISTS cc_documents CASCADE;
DROP TABLE IF EXISTS cc_announcements CASCADE;
DROP TABLE IF EXISTS cc_marks CASCADE;
DROP TABLE IF EXISTS cc_attendance CASCADE;
DROP TABLE IF EXISTS cc_students CASCADE;
DROP TABLE IF EXISTS cc_teachers CASCADE;
DROP TABLE IF EXISTS cc_users CASCADE;

-- 2. CORE TABLES
CREATE TABLE cc_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    role_label TEXT,
    department TEXT,
    phone TEXT,
    email TEXT,
    avatar_color TEXT DEFAULT '#1976d2',
    child_id TEXT, -- For parents
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cc_students (
    id TEXT PRIMARY KEY,
    adm_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class TEXT NOT NULL,
    roll_no TEXT,
    gender TEXT,
    dob TEXT,
    attendance_pct NUMERIC DEFAULT 85,
    behavior TEXT DEFAULT 'Good',
    fee_status TEXT DEFAULT 'Paid',
    gpa NUMERIC DEFAULT 0,
    parent_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE cc_teachers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subject TEXT,
    assigned_classes TEXT,
    experience TEXT,
    phone TEXT,
    status TEXT DEFAULT 'Active'
);

CREATE TABLE cc_announcements (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    priority TEXT DEFAULT 'medium',
    content TEXT
);

-- 3. SEEDING CANONICAL DATA

-- 3.1 DEMO USERS (Admin, Staff, etc.)
INSERT INTO cc_users (username, password, name, role, role_label, department, phone, email, avatar_color) VALUES
('VP001', 'VP123', 'SUMAN', 'vice_principal', 'Vice Principal', 'Executive Office', '+91 98765 43210', 'vp@dpsnadergul.edu', '#2d7a6e'),
('T001', 'teacher123', 'Prasana Reddy', 'teacher', 'Teacher', 'Mathematics', '+91 87654 32109', 'sneha@dpsnadergul.edu', '#5ca870'),
('C001', 'coord123', 'Anitha', 'coordinator', 'Coordinator', 'Academic Coordination', '+91 54321 09876', 'anitha@dpsnadergul.edu', '#1976d2'),
('CT8B', 'CLASS123', 'Anita Pillai', 'class_teacher', 'Class Teacher', 'Class Teacher – 8B', '+91 43210 98765', 'anita@dpsnadergul.edu', '#8b5cf6'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal', 'Principal', 'Principal Office', '+91 98765 00001', 'principal@dpsnadergul.edu', '#1a237e'),
('APAAAS', 'APAAAS', 'Admin', 'super_admin', 'Super Admin', 'Administration', '+91 99999 99999', 'admin@dpsnadergul.edu', '#333333'),
('APASAA', 'APASAA', 'Mac Admin', 'mac_admin', 'Mac Administrator', 'System Administration', '+91 99999 88888', 'macadmin@dpsnadergul.edu', '#007AFF');

-- 3.2 CANONICAL STUDENTS (Class 9-C - 27 Students)
INSERT INTO cc_students (id, adm_no, name, class, roll_no, gender, dob, attendance_pct, behavior, fee_status, gpa, parent_name) VALUES
('3160136', '3160136', 'PRANEETH BHUKYA', '9-C', '01', 'Male', '15 Jan 2011', 85, 'Good', 'Paid', 7.5, 'Parent of PRANEETH BHUKYA'),
('3160417', '3160417', 'SATHWIK REDDY GANTA', '9-C', '02', 'Male', '22 Feb 2011', 86, 'Good', 'Paid', 8.2, 'Parent of SATHWIK REDDY GANTA'),
('3160662', '3160662', 'KOTHA ASHVIK', '9-C', '03', 'Male', '10 Mar 2011', 92, 'Good', 'Paid', 8.5, 'Parent of KOTHA ASHVIK'),
('3170292', '3170292', 'BOPPARAJU ABHIRAM', '9-C', '04', 'Male', '05 Apr 2011', 88, 'Good', 'Paid', 7.8, 'Parent of BOPPARAJU ABHIRAM'),
('3170355', '3170355', 'BOYINI VIVEKANANDA MUDIRAJ', '9-C', '05', 'Male', '12 May 2011', 89, 'Good', 'Paid', 7.9, 'Parent of BOYINI VIVEKANANDA MUDIRAJ'),
('3170390', '3170390', 'LOLLA ABHIRAM', '9-C', '06', 'Male', '20 Jun 2011', 90, 'Good', 'Paid', 8.0, 'Parent of LOLLA ABHIRAM'),
('3180076', '3180076', 'KASULA ASHWATH', '9-C', '07', 'Male', '12 Apr 2009', 94, 'Excellent', 'Paid', 8.7, 'Parent of KASULA ASHWATH'),
('3180133', '3180133', 'SNITHIK VENGALA', '9-C', '08', 'Male', '30 Jul 2011', 92, 'Good', 'Paid', 8.2, 'Parent of SNITHIK VENGALA'),
('3180183', '3180183', 'NIDHISH DUMALA', '9-C', '09', 'Male', '15 Aug 2011', 93, 'Good', 'Paid', 8.3, 'Parent of NIDHISH DUMALA'),
('3180184', '3180184', 'YAMMANURU HARITEJA', '9-C', '10', 'Male', '25 Sep 2011', 94, 'Good', 'Paid', 8.4, 'Parent of YAMMANURU HARITEJA'),
('3180286', '3180286', 'CHARAN BATTU', '9-C', '11', 'Male', '05 Oct 2011', 95, 'Good', 'Paid', 8.5, 'Parent of CHARAN BATTU'),
('3190472', '3190472', 'ATHUL M', '9-C', '12', 'Male', '18 Nov 2011', 96, 'Good', 'Paid', 8.6, 'Parent of ATHUL M'),
('3200320', '3200320', 'SIDDHARTH REDDY SADIVILLA', '9-C', '13', 'Male', '22 Dec 2011', 97, 'Good', 'Paid', 8.7, 'Parent of SIDDHARTH REDDY SADIVILLA'),
('3200437', '3200437', 'SIDDALA RAMCHARAN', '9-C', '14', 'Male', '08 Jan 2012', 98, 'Good', 'Paid', 8.8, 'Parent of SIDDALA RAMCHARAN'),
('3210447', '3210447', 'SAPAVATH JAHNAVI', '9-C', '15', 'Female', '14 Feb 2012', 99, 'Excellent', 'Paid', 9.2, 'Parent of SAPAVATH JAHNAVI'),
('3210590', '3210590', 'K MOKSHA', '9-C', '16', 'Female', '20 Mar 2012', 85, 'Good', 'Paid', 9.0, 'Parent of K MOKSHA'),
('3230302', '3230302', 'BOJJA HARIKESH REDDY', '9-C', '17', 'Male', '11 Apr 2012', 86, 'Good', 'Paid', 9.1, 'Parent of BOJJA HARIKESH REDDY'),
('3230706', '3230706', 'EKADANTHA YADAV', '9-C', '18', 'Male', '22 May 2012', 87, 'Good', 'Paid', 9.2, 'Parent of EKADANTHA YADAV'),
('3240214', '3240214', 'NIMMAKAYALA PRATEEK REDDY', '9-C', '19', 'Male', '30 Jun 2012', 88, 'Good', 'Paid', 9.3, 'Parent of NIMMAKAYALA PRATEEK REDDY'),
('3240504', '3240504', 'CHEEKOORI SAI CHARAN', '9-C', '20', 'Male', '15 Jul 2012', 89, 'Good', 'Paid', 9.4, 'Parent of CHEEKOORI SAI CHARAN'),
('3240693', '3240693', 'VALLETI SAI HARSHITH', '9-C', '21', 'Male', '20 Aug 2012', 90, 'Good', 'Paid', 7.5, 'Parent of VALLETI SAI HARSHITH'),
('3250112', '3250112', 'P SATHWIK REDDY', '9-C', '22', 'Male', '05 Sep 2012', 91, 'Good', 'Paid', 7.6, 'Parent of P SATHWIK REDDY'),
('3260066', '3260066', 'DEPA AARYAN REDDY', '9-C', '23', 'Male', '12 Oct 2012', 92, 'Good', 'Paid', 7.7, 'Parent of DEPA AARYAN REDDY'),
('3230719', '3230719', 'G MANASWINI', '9-C', '24', 'Female', '22 Nov 2012', 93, 'Good', 'Paid', 7.8, 'Parent of G MANASWINI'),
('3170068', '3170068', 'SHERI RITHIK REDDY', '9-C', '25', 'Male', '30 Dec 2012', 94, 'Good', 'Paid', 7.9, 'Parent of SHERI RITHIK REDDY'),
('3220915', '3220915', 'BHUKYA PRANAVI', '9-C', '26', 'Female', '14 Jan 2013', 95, 'Good', 'Paid', 8.0, 'Parent of BHUKYA PRANAVI'),
('3190133', '3190133', 'TANABUDDI SRI BHAVESH REDDY', '9-C', '27', 'Male', '22 Feb 2013', 96, 'Good', 'Paid', 8.1, 'Parent of TANABUDDI SRI BHAVESH REDDY');

-- 3.3 ADDITIONAL 270 STUDENTS (Distributed across other sections)
-- Using a loop for mass insertion to reach 297 total
DO $$
DECLARE
    i INTEGER;
    adm_no TEXT;
    sections TEXT[] := ARRAY['6-A','6-B','6-C','6-D','7-A','7-B','7-C','7-D','8-A','8-B','8-C','8-D','9-A','9-B','9-D','10-A','10-B','10-C','10-D'];
    section TEXT;
BEGIN
    FOR i IN 1..270 LOOP
        adm_no := (3160000 + i)::text;
        section := sections[((i-1) % 19) + 1];
        INSERT INTO cc_students (id, adm_no, name, class, roll_no, gender, dob, attendance_pct, behavior, fee_status, gpa, parent_name)
        VALUES (
            adm_no, 
            adm_no, 
            'Student ' || adm_no, 
            section, 
            LPAD(((i-1)/19 + 1)::text, 2, '0'), 
            CASE WHEN i % 2 = 0 THEN 'Male' ELSE 'Female' END,
            '01 Jan 2012',
            85,
            'Good',
            'Paid',
            7.5,
            'Parent of Student ' || adm_no
        );
    END LOOP;
END $$;

-- 3.4 PARENT USERS (Mapped to 9-C Students)
INSERT INTO cc_users (username, password, name, role, role_label, department, child_id)
SELECT 
    'P' || id || 'A', 
    'parent123', 
    'Parent of ' || name, 
    'parent', 
    'Parent', 
    'Parent of ' || name || ' (Class 9-C)', 
    id
FROM cc_students WHERE class = '9-C';

-- 3.5 TEACHERS
INSERT INTO cc_teachers (id, name, subject, assigned_classes, experience, phone, status) VALUES
('T001', 'Prasana Reddy', 'Mathematics', '10-A, 9-B, 8-C', '8 years', '+91 87654 11111', 'Active'),
('T002', 'Ramesh Sharma', 'Physics', '10-A, 10-B', '12 years', '+91 87654 22222', 'Active'),
('T003', 'Anita Pillai', 'English Literature', '8-B, 9-A', '6 years', '+91 87654 33333', 'Active'),
('T004', 'Mohan Das', 'Chemistry', '9-C, 10-C', '10 years', '+91 87654 44444', 'Active'),
('T005', 'Sunita Verma', 'Social Studies', '8-A, 9-D', '7 years', '+91 87654 55555', 'Active');

-- 3.6 ANNOUNCEMENTS
INSERT INTO cc_announcements (title, date, author, category, priority) VALUES
('Annual Sports Day – April 12, 2026', '28 Mar 2026', 'Vice Principal', 'Events', 'high'),
('Mid-Term Examination Schedule Released', '26 Mar 2026', 'Coordinator', 'Academic', 'high'),
('Parent-Teacher Meeting – April 5', '24 Mar 2026', 'Vice Principal', 'Meeting', 'medium'),
('Fee Payment Deadline – March 31', '22 Mar 2026', 'Accounts Dept', 'Finance', 'high');

-- 4. REALTIME ENABLEMENT
ALTER PUBLICATION supabase_realtime ADD TABLE cc_announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE cc_students;
ALTER PUBLICATION supabase_realtime ADD TABLE cc_users;
