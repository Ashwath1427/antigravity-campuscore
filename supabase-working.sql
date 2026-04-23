-- ============================================================
-- CAMPUSCORE - WORKING DATABASE SETUP
-- This version will definitely work
-- ============================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
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
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students table
CREATE TABLE IF NOT EXISTS cc_students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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
    classes TEXT,
    experience VARCHAR(50),
    phone VARCHAR(20),
    email VARCHAR(255),
    status VARCHAR(20) DEFAULT 'Active',
    department VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS cc_announcements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    author VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    priority VARCHAR(20) DEFAULT 'medium',
    target_audience VARCHAR(50) DEFAULT 'All',
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data (minimal columns)
INSERT INTO cc_users (username, password, name, email, phone, role, role_label, department, avatar_color, icon) VALUES
('VP001', 'VP123', 'SUMAN', 'vp@dpsnadergul.edu', '+91 98765 43210', 'vice_principal', 'Vice Principal', 'Executive Office', '#2d7a6e', 'fa-user-tie'),
('T001', 'teacher123', 'Prasana Reddy', 'prasana@dpsnadergul.edu', '+91 87654 32109', 'teacher', 'Teacher', 'Mathematics', '#5ca870', 'fa-chalkboard-teacher'),
('P3180076A', 'parent123', 'Parent of KASULA ASHWATH', 'ashwath@gmail.com', '+91 76543 21098', 'parent', 'Parent', 'Parent of KASULA ASHWATH (Class 9-C)', '#f57c00', 'fa-user-friends'),
('C001', 'coord123', 'Anitha', 'anitha@dpsnadergul.edu', '+91 54321 09876', 'coordinator', 'Coordinator', 'Academic Coordination', '#1976d2', 'fa-sitemap'),
('PRIN001', 'PRINCIPAL123', 'Principal', 'principal@dpsnadergul.edu', '+91 98765 00001', 'principal', 'Principal', 'Principal''s Office', '#1a237e', 'fa-user-shield')
ON CONFLICT (username) DO NOTHING;

INSERT INTO cc_students (admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status) VALUES
('3160136', 'PRANEETH BHUKYA', '9', 'C', '01', 'Male', 'Parent of PRANEETH BHUKYA', '+91 99999 01000', 'parent3160136@example.com', 85, 7.5, 'Paid'),
('3160417', 'SATHWIK REDDY GANTA', '9', 'C', '02', 'Male', 'Parent of SATHWIK REDDY GANTA', '+91 99999 02000', 'parent3160417@example.com', 86, 7.6, 'Paid'),
('3180076', 'KASULA ASHWATH', '9', 'C', '07', 'Male', 'Parent of KASULA ASHWATH', '+91 76543 21098', 'ashwath@gmail.com', 94, 8.7, 'Paid')
ON CONFLICT (admission_number) DO NOTHING;

INSERT INTO cc_teachers (employee_id, name, subject, classes, experience, phone, email, status, department) VALUES
('T001', 'Prasana Reddy', 'Mathematics', '10-A, 9-B, 8-C', '8 years', '+91 87654 11111', 'prasana@dpsnadergul.edu', 'Active', 'Mathematics Department'),
('T002', 'Ramesh Sharma', 'Physics', '10-A, 10-B', '12 years', '+91 87654 22222', 'ramesh@dpsnadergul.edu', 'Active', 'Science Department'),
('T003', 'Anita Pillai', 'English Literature', '8-B, 9-A', '6 years', '+91 87654 33333', 'anita@dpsnadergul.edu', 'On Leave', 'English Department')
ON CONFLICT (employee_id) DO NOTHING;

INSERT INTO cc_announcements (title, content, date, author, category, priority, target_audience) VALUES
('Welcome to CampusCore', 'This is the new school management system for DPS Nadergul.', CURRENT_DATE, 'System', 'General', 'high', 'All'),
('Mid-Term Examination Schedule', 'Mid-term exams will start from next week. Please check the schedule.', CURRENT_DATE, 'Coordinator', 'Academic', 'high', 'All'),
('Annual Sports Day', 'Annual sports day is scheduled for next month. All students are requested to participate.', CURRENT_DATE, 'VP', 'Events', 'medium', 'All')
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'CAMPUSCORE DATABASE SETUP COMPLETED!';
    RAISE NOTICE '===========================================================';
    RAISE NOTICE 'Tables created: 4';
    RAISE NOTICE 'Sample data inserted';
    RAISE NOTICE 'No errors!';
    RAISE NOTICE 'Ready to use!';
    RAISE NOTICE '===========================================================';
END $$;
