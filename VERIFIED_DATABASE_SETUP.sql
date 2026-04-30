-- ============================================================
-- CAMPUSCORE - VERIFIED DATABASE SETUP (2026-04-30)
-- This script aligns perfectly with the current frontend logic.
-- ============================================================

-- 1. CLEAN UP
DROP TABLE IF EXISTS cc_users CASCADE;
DROP TABLE IF EXISTS cc_students CASCADE;
DROP TABLE IF EXISTS cc_announcements CASCADE;
DROP TABLE IF EXISTS cc_homework CASCADE;
DROP TABLE IF EXISTS cc_events CASCADE;
DROP TABLE IF EXISTS cc_issues CASCADE;
DROP TABLE IF EXISTS cc_issue_timeline CASCADE;

-- 2. CREATE TABLES

-- Users Table (Matches DEMO_USERS in data.js)
CREATE TABLE cc_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    role_label VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    joined VARCHAR(50),
    avatar_color VARCHAR(7),
    icon VARCHAR(50),
    child_name VARCHAR(100),
    child_class VARCHAR(20),
    child_roll VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table (Matches STUDENTS objects in data.js)
CREATE TABLE cc_students (
    id VARCHAR(20) PRIMARY KEY, -- Using adm_no as ID to match JS
    adm_no VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(20) NOT NULL,
    roll VARCHAR(10),
    gender VARCHAR(10),
    dob VARCHAR(20),
    attendance DECIMAL(5,2),
    behavior VARCHAR(50),
    fee_status VARCHAR(20),
    gpa DECIMAL(3,2),
    parent VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements Table
CREATE TABLE cc_announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date VARCHAR(20),
    author VARCHAR(100),
    category VARCHAR(50),
    priority VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homework Table
CREATE TABLE cc_homework (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    subject VARCHAR(100),
    class VARCHAR(20),
    teacher VARCHAR(100),
    due VARCHAR(20),
    submitted INTEGER DEFAULT 0,
    total INTEGER DEFAULT 0,
    status VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events Table
CREATE TABLE cc_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    date VARCHAR(20),
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. INSERT USERS (APAAAS and Core Staff)
INSERT INTO cc_users (username, password, name, role, role_label, department, phone, email, avatar_color, icon) VALUES
('VP001', 'VP123', 'SUMAN', 'vice_principal', 'Vice Principal', 'Executive Office', '+91 98765 43210', 'vp@dpsnadergul.edu', '#2d7a6e', 'fa-user-tie'),
('T001', 'teacher123', 'Prasana Reddy', 'teacher', 'Teacher', 'Mathematics', '+91 87654 32109', 'prasana@dpsnadergul.edu', '#5ca870', 'fa-chalkboard-teacher'),
('C001', 'coord123', 'Anitha', 'coordinator', 'Coordinator', 'Academic Coordination', '+91 54321 09876', 'anitha@dpsnadergul.edu', '#1976d2', 'fa-sitemap'),
('APAAAS', 'APAAAS', 'Admin', 'super_admin', 'Super Admin', 'System Administration', NULL, 'admin@campuscore.com', '#1b5e20', 'fa-user-cog'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal', 'Principal', 'Principal''s Office', NULL, 'principal@dpsnadergul.edu', '#1a237e', 'fa-user-shield');

-- Parent User for KASULA ASHWATH
INSERT INTO cc_users (username, password, name, role, role_label, department, child_name, child_class, child_roll, avatar_color, icon) VALUES
('P3180076A', 'parent123', 'Parent of KASULA ASHWATH', 'parent', 'Parent', 'Parent of KASULA ASHWATH (Class 9-C)', 'KASULA ASHWATH', '9-C', '07', '#f57c00', 'fa-user-friends');

-- 4. INSERT STUDENTS (Seeding 9-C and sample others)
-- (Note: In production, all 297 would be here. For this verification script, we seed the core ones)
INSERT INTO cc_students (id, adm_no, name, class, roll, gender, dob, attendance, behavior, fee_status, gpa, parent) VALUES
('3180076', '3180076', 'KASULA ASHWATH', '9-C', '07', 'Male', '15 Jan 2011', 94, 'Good', 'Paid', 8.7, 'Parent of KASULA ASHWATH'),
('3160136', '3160136', 'PRANEETH BHUKYA', '9-C', '01', 'Male', '15 Jan 2011', 86, 'Good', 'Paid', 7.6, 'Parent of PRANEETH BHUKYA'),
('3160417', '3160417', 'SATHWIK REDDY GANTA', '9-C', '02', 'Male', '15 Jan 2011', 87, 'Good', 'Paid', 7.7, 'Parent of SATHWIK REDDY GANTA');

-- 5. INSERT ANNOUNCEMENTS
INSERT INTO cc_announcements (title, date, author, category, priority) VALUES
('Welcome to CampusCore', '28 Mar 2026', 'Vice Principal', 'General', 'high'),
('Mid-Term Examination Schedule', '26 Mar 2026', 'Coordinator', 'Academic', 'high'),
('Fee Payment Deadline - March 31', '22 Mar 2026', 'Accounts Dept', 'Finance', 'high');

-- 6. INSERT HOMEWORK
INSERT INTO cc_homework (title, subject, class, teacher, due, submitted, total, status) VALUES
('Quadratic Equations - Practice Set A', 'Mathematics', '10-A', 'Prasana Reddy', '31 Mar 2026', 28, 35, 'Active'),
('Newton''s Laws - Lab Report', 'Physics', '10-A', 'Ramesh Sharma', '2 Apr 2026', 20, 35, 'Active');

-- 7. INSERT EVENTS
INSERT INTO cc_events (title, date, description, color) VALUES
('Annual Sports Day', 'Apr 12, 2026', 'Inter-class athletics, team sports, prize ceremony', '#5ca870'),
('Science Exhibition', 'Apr 18, 2026', 'Students showcase science projects', '#1976d2');

-- 8. PERMISSIONS
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
