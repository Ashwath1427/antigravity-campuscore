-- ============================================================
-- CAMPUSCORE - VERIFIED SUPABASE SCHEMA (v1.0)
-- ============================================================

-- STEP 1: DROP OLD TABLES (Use with caution!)
DROP TABLE IF EXISTS cc_users CASCADE;
DROP TABLE IF EXISTS cc_students CASCADE;
DROP TABLE IF EXISTS cc_teachers CASCADE;
DROP TABLE IF EXISTS cc_announcements CASCADE;

-- STEP 2: CREATE TABLES

-- 1. Users Table
CREATE TABLE cc_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL,
    role_label VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    avatar_color VARCHAR(7),
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Students Table
CREATE TABLE cc_students (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admission_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    section VARCHAR(5),
    roll_number VARCHAR(10),
    gender VARCHAR(10),
    parent_name VARCHAR(100),
    parent_contact VARCHAR(20),
    parent_email VARCHAR(255),
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    gpa DECIMAL(3,2) DEFAULT 0,
    fee_status VARCHAR(20) DEFAULT 'Paid',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Teachers Table
CREATE TABLE cc_teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    classes TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Announcements Table
CREATE TABLE cc_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    author VARCHAR(100),
    category VARCHAR(50) DEFAULT 'General',
    priority VARCHAR(20) DEFAULT 'medium',
    target_audience VARCHAR(50) DEFAULT 'All'
);

-- STEP 3: INSERT SEED DATA

-- Core Admin Users
INSERT INTO cc_users (username, password, name, role, role_label, department, avatar_color, icon) VALUES
('VP001', 'VP123', 'SUMAN', 'vice_principal', 'Vice Principal', 'Executive Office', '#2d7a6e', 'fa-user-tie'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal', 'Principal', 'Principal''s Office', '#1a237e', 'fa-user-shield'),
('APAAAS', 'APAAAS123', 'SuperAdmin', 'apaaas', 'SuperAdmin', 'Systems', '#d32f2f', 'fa-user-cog'),
('T001', 'teacher123', 'Prasana Reddy', 'teacher', 'Teacher', 'Mathematics', '#5ca870', 'fa-chalkboard-teacher');

-- Primary Student Data (9-C)
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, attendance_percentage, gpa, fee_status) VALUES
('3180076', 'KASULA ASHWATH', '9', 'C', '01', 'Male', 'Parent of KASULA ASHWATH', 94, 8.7, 'Paid'),
('3240214', 'NIMMAKAYALA PRATEEK REDDY', '9', 'C', '02', 'Male', 'Parent of NIMMAKAYALA PRATEEK REDDY', 88, 7.2, 'Paid');

-- Sample Announcements
INSERT INTO cc_announcements (title, content, author, category, priority) VALUES
('Welcome to CampusCore', 'System is now live. Please log in with your provided credentials.', 'Admin', 'General', 'high'),
('Mid-Term Exam Schedule', 'Exams starting from next week. Check your portal for dates.', 'Coordinator', 'Academic', 'high');

-- STEP 4: PERMISSIONS
ALTER TABLE cc_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON cc_users FOR SELECT USING (true);
CREATE POLICY "Enable read access for all students" ON cc_students FOR SELECT USING (true);
CREATE POLICY "Enable read access for all teachers" ON cc_teachers FOR SELECT USING (true);
CREATE POLICY "Enable read access for all announcements" ON cc_announcements FOR SELECT USING (true);

-- Realtime Support
ALTER PUBLICATION supabase_realtime ADD TABLE cc_announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE cc_students;
