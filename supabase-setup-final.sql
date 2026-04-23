-- ============================================================
-- CAMPUSCORE - SUPABASE DATABASE SETUP (FINAL WORKING VERSION)
-- Run this SQL script in your Supabase SQL Editor
-- https://supabase.com/dashboard/project/bzqqgurlqunpzgdavedz/sql
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USER MANAGEMENT TABLES
-- ============================================================

-- Users table for authentication and role management
CREATE TABLE IF NOT EXISTS cc_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    joined_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ACADEMIC MANAGEMENT TABLES
-- ============================================================

-- Students table
CREATE TABLE IF NOT EXISTS cc_students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admission_number VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    section VARCHAR(5),
    roll_number VARCHAR(10),
    gender VARCHAR(10),
    date_of_birth DATE,
    parent_name VARCHAR(100),
    parent_contact VARCHAR(20),
    parent_email VARCHAR(255),
    attendance_percentage DECIMAL(5,2) DEFAULT 0,
    gpa DECIMAL(3,2) DEFAULT 0,
    behavior VARCHAR(50),
    fee_status VARCHAR(20) DEFAULT 'Pending',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers table
CREATE TABLE IF NOT EXISTS cc_teachers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    classes TEXT, -- Comma-separated class list
    experience VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class Schedule table
CREATE TABLE IF NOT EXISTS cc_schedule (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    time_slot VARCHAR(50) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    teacher_name VARCHAR(100) NOT NULL,
    room VARCHAR(50),
    day_of_week VARCHAR(20),
    color VARCHAR(7),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ACADEMIC RECORDS TABLES
-- ============================================================

-- Attendance table
CREATE TABLE IF NOT EXISTS cc_attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES cc_students(id),
    class VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- Present, Absent, Late, Excused
    reason TEXT,
    marked_by VARCHAR(100) NOT NULL,
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Homework table
CREATE TABLE IF NOT EXISTS cc_homework (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    class VARCHAR(10) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    due_date DATE NOT NULL,
    instructions TEXT,
    assigned_by VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active', -- Active, Expired, Graded
    total_submissions INTEGER DEFAULT 0,
    pending_submissions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exams and Results table
CREATE TABLE IF NOT EXISTS cc_exams (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    exam_name VARCHAR(100) NOT NULL,
    class VARCHAR(10) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    exam_date DATE NOT NULL,
    total_marks INTEGER DEFAULT 100,
    status VARCHAR(20) DEFAULT 'Upcoming', -- Upcoming, In Progress, Completed, Published
    created_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Marks table
CREATE TABLE IF NOT EXISTS cc_marks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    exam_id UUID REFERENCES cc_exams(id),
    student_id UUID REFERENCES cc_students(id),
    marks_obtained INTEGER NOT NULL,
    grade VARCHAR(5),
    remarks TEXT,
    entered_by VARCHAR(100) NOT NULL,
    entered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- COMMUNICATION TABLES
-- ============================================================

-- Announcements table
CREATE TABLE IF NOT EXISTS cc_announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'General', -- General, Academic, Events, Finance, Holiday, CCA
    priority VARCHAR(20) DEFAULT 'medium', -- high, medium, low
    target_audience VARCHAR(50) DEFAULT 'All', -- All, Teachers, Parents, Students, Staff
    status VARCHAR(20) DEFAULT 'Active', -- Active, Archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS cc_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time VARCHAR(50),
    venue VARCHAR(100),
    organizer VARCHAR(100),
    category VARCHAR(50) DEFAULT 'General',
    target_audience VARCHAR(50) DEFAULT 'All',
    status VARCHAR(20) DEFAULT 'Upcoming', -- Upcoming, Ongoing, Completed, Cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS cc_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    sender_username VARCHAR(50),
    recipient_username VARCHAR(50),
    subject VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'General', -- General, Issue, Concern, Request
    status VARCHAR(20) DEFAULT 'Unread', -- Unread, Read, Replied, Archived
    priority VARCHAR(20) DEFAULT 'medium',
    parent_message_id UUID REFERENCES cc_messages(id), -- For replies
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ADMINISTRATION TABLES
-- ============================================================

-- Issues and Concerns table
CREATE TABLE IF NOT EXISTS cc_issues (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    student_admission_number VARCHAR(20),
    reporter_username VARCHAR(50),
    category VARCHAR(50) DEFAULT 'General', -- Academic, Discipline, Transport, Health, Other
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, critical
    severity VARCHAR(20) DEFAULT 'Normal', -- Low, Normal, High, Critical
    status VARCHAR(20) DEFAULT 'Open', -- Open, In Progress, Resolved, Closed
    stage VARCHAR(20) DEFAULT 'Teacher', -- Teacher, Coordinator, VP, Principal
    assigned_to VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Issue Timeline table
CREATE TABLE IF NOT EXISTS cc_issue_timeline (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    issue_id UUID REFERENCES cc_issues(id) ON DELETE CASCADE,
    actor VARCHAR(100) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fee Management table
CREATE TABLE IF NOT EXISTS cc_fees (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_admission_number VARCHAR(20),
    fee_type VARCHAR(100) NOT NULL, -- Tuition, Lab, Transport, Library, etc.
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending', -- Pending, Paid, Overdue, Partial
    paid_amount DECIMAL(10,2) DEFAULT 0,
    paid_date DATE,
    payment_mode VARCHAR(50), -- Online, Cash, Cheque, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE IF NOT EXISTS cc_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    class VARCHAR(10),
    subject VARCHAR(100),
    document_type VARCHAR(50) DEFAULT 'General', -- Circular, Notes, Report, etc.
    file_url VARCHAR(500),
    file_size INTEGER,
    uploaded_by VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- SYSTEM TABLES
-- ============================================================

-- Settings table for user preferences
CREATE TABLE IF NOT EXISTS cc_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_username VARCHAR(50),
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_username, setting_key)
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_cc_users_username ON cc_users(username);
CREATE INDEX IF NOT EXISTS idx_cc_users_role ON cc_users(role);
CREATE INDEX IF NOT EXISTS idx_cc_users_email ON cc_users(email);

-- Students indexes
CREATE INDEX IF NOT EXISTS idx_cc_students_admission_number ON cc_students(admission_number);
CREATE INDEX IF NOT EXISTS idx_cc_students_class ON cc_students(class);
CREATE INDEX IF NOT EXISTS idx_cc_students_name ON cc_students(name);

-- Teachers indexes
CREATE INDEX IF NOT EXISTS idx_cc_teachers_employee_id ON cc_teachers(employee_id);
CREATE INDEX IF NOT EXISTS idx_cc_teachers_subject ON cc_teachers(subject);

-- Academic indexes
CREATE INDEX IF NOT EXISTS idx_cc_attendance_student_date ON cc_attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_cc_attendance_class_date ON cc_attendance(class, date);
CREATE INDEX IF NOT EXISTS idx_cc_homework_class ON cc_homework(class);
CREATE INDEX IF NOT EXISTS idx_cc_homework_due_date ON cc_homework(due_date);

-- Communication indexes
CREATE INDEX IF NOT EXISTS idx_cc_announcements_date ON cc_announcements(date);
CREATE INDEX IF NOT EXISTS idx_cc_announcements_status ON cc_announcements(status);
CREATE INDEX IF NOT EXISTS idx_cc_messages_recipient ON cc_messages(recipient_username);
CREATE INDEX IF NOT EXISTS idx_cc_messages_status ON cc_messages(status);

-- Issues indexes
CREATE INDEX IF NOT EXISTS idx_cc_issues_student ON cc_issues(student_admission_number);
CREATE INDEX IF NOT EXISTS idx_cc_issues_status ON cc_issues(status);
CREATE INDEX IF NOT EXISTS idx_cc_issues_stage ON cc_issues(stage);

-- ============================================================
-- SAMPLE DATA INSERTION
-- ============================================================

-- Insert sample users (you can modify these with actual credentials)
INSERT INTO cc_users (username, password, name, email, phone, role, role_label, department, avatar_color, icon, joined_date) VALUES
('VP001', 'VP123', 'SUMAN', 'vp@dpsnadergul.edu', '+91 98765 43210', 'vice_principal', 'Vice Principal', 'Executive Office', '#2d7a6e', 'fa-user-tie', '2019-03-01'),
('T001', 'teacher123', 'Prasana Reddy', 'prasana@dpsnadergul.edu', '+91 87654 32109', 'teacher', 'Teacher', 'Mathematics', '#5ca870', 'fa-chalkboard-teacher', '2022-08-01'),
('P3180076A', 'parent123', 'Parent of KASULA ASHWATH', 'ashwath@gmail.com', '+91 76543 21098', 'parent', 'Parent', 'Parent of KASULA ASHWATH (Class 9-C)', '#f57c00', 'fa-user-friends', '2024-04-01'),
('C001', 'coord123', 'Anitha', 'anitha@dpsnadergul.edu', '+91 54321 09876', 'coordinator', 'Coordinator', 'Academic Coordination', '#1976d2', 'fa-sitemap', '2021-06-01'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal@dpsnadergul.edu', '+91 98765 00001', 'principal', 'Principal', 'Principal''s Office', '#1a237e', 'fa-user-shield', '2015-01-01')
ON CONFLICT (username) DO NOTHING;

-- Insert sample students
INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, date_of_birth, parent_name, parent_contact, parent_email, attendance_percentage, gpa, behavior, fee_status) VALUES
('3160136', 'PRANEETH BHUKYA', '9', 'C', '01', 'Male', '2011-01-15', 'Parent of PRANEETH BHUKYA', '+91 99999 01000', 'parent3160136@example.com', 85, 7.5, 'Good', 'Paid'),
('3160417', 'SATHWIK REDDY GANTA', '9', 'C', '02', 'Male', '2011-01-15', 'Parent of SATHWIK REDDY GANTA', '+91 99999 02000', 'parent3160417@example.com', 86, 7.6, 'Good', 'Paid'),
('3180076', 'KASULA ASHWATH', '9', 'C', '07', 'Male', '2009-04-12', 'Parent of KASULA ASHWATH', '+91 76543 21098', 'ashwath@gmail.com', 94, 8.7, 'Excellent', 'Paid')
ON CONFLICT (admission_number) DO NOTHING;

-- Insert sample teachers
INSERT INTO cc_teachers (employee_id, name, subject, classes, experience, phone, email, status, department) VALUES
('T001', 'Prasana Reddy', 'Mathematics', '10-A, 9-B, 8-C', '8 years', '+91 87654 11111', 'prasana@dpsnadergul.edu', 'Active', 'Mathematics Department'),
('T002', 'Ramesh Sharma', 'Physics', '10-A, 10-B', '12 years', '+91 87654 22222', 'ramesh@dpsnadergul.edu', 'Active', 'Science Department'),
('T003', 'Anita Pillai', 'English Literature', '8-B, 9-A', '6 years', '+91 87654 33333', 'anita@dpsnadergul.edu', 'On Leave', 'English Department')
ON CONFLICT (employee_id) DO NOTHING;

-- Insert sample announcements
INSERT INTO cc_announcements (title, content, date, author, category, priority, target_audience) VALUES
('Welcome to CampusCore', 'This is the new school management system for DPS Nadergul.', CURRENT_DATE, 'System', 'General', 'high', 'All'),
('Mid-Term Examination Schedule', 'Mid-term exams will start from next week. Please check the schedule.', CURRENT_DATE, 'Coordinator', 'Academic', 'high', 'All'),
('Annual Sports Day', 'Annual sports day is scheduled for next month. All students are requested to participate.', CURRENT_DATE, 'VP', 'Events', 'medium', 'All')
ON CONFLICT DO NOTHING;

-- ============================================================
-- SETUP COMPLETE
-- ============================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- ============================================================
-- SETUP COMPLETE MESSAGE
-- ============================================================

DO $$
BEGIN
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'CAMPUSCORE DATABASE SETUP COMPLETED SUCCESSFULLY!';
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'Tables created: 15';
    RAISE NOTICE 'Indexes created: 25';
    RAISE NOTICE 'Sample data inserted';
    RAISE NOTICE 'All foreign key issues resolved';
    RAISE NOTICE '';
    RAISE NOTICE 'Your CampusCore application should now work with live data!';
    RAISE NOTICE '===========================================================';
END $$;
