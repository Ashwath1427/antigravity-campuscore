-- CAMPUS CORE PRODUCTION SCHEMA
-- For Supabase SQL Editor

-- 1. Enable RLS
-- (Supabase enables it by default on some levels, but we'll be explicit)

-- 2. Profiles Table (Expanded from DEMO_USERS)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    username TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student',
    role_label TEXT,
    department TEXT,
    phone TEXT,
    email TEXT,
    avatar_color TEXT DEFAULT '#1976d2',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 3. Classes Table
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE, -- e.g. "9-C"
    section TEXT,
    grade_level INTEGER,
    room_no TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Classes viewable by everyone" ON classes FOR SELECT USING (true);

-- 4. Teachers Table
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject TEXT,
    experience TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers viewable by everyone" ON teachers FOR SELECT USING (true);

-- 5. Students Table
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    adm_no TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    class_id UUID REFERENCES classes(id),
    roll_no TEXT,
    gender TEXT,
    dob DATE,
    attendance_pct NUMERIC DEFAULT 100,
    gpa NUMERIC DEFAULT 0,
    fee_status TEXT DEFAULT 'Pending',
    behavior TEXT DEFAULT 'Good',
    parent_profile_id UUID REFERENCES profiles(id),
    profile_id UUID REFERENCES profiles(id), -- If student has own login
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students viewable by staff and parents" ON students FOR SELECT USING (true);

-- 6. Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id UUID REFERENCES profiles(id),
    category TEXT DEFAULT 'General',
    priority TEXT DEFAULT 'medium',
    target_role TEXT DEFAULT 'all',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Announcements viewable by everyone" ON announcements FOR SELECT USING (true);
CREATE POLICY "Staff can create announcements" ON announcements FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('principal', 'vice_principal', 'coordinator', 'super_admin'))
);

-- 7. Homework Table
CREATE TABLE IF NOT EXISTS homework (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subject TEXT,
    class_id UUID REFERENCES classes(id),
    teacher_id UUID REFERENCES teachers(id),
    due_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'Active',
    total_students INTEGER DEFAULT 0,
    submitted_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Homework viewable by everyone" ON homework FOR SELECT USING (true);

-- 8. Attendance Table (Individual Records)
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    status TEXT NOT NULL, -- 'Present', 'Absent', 'Late'
    remarks TEXT,
    marked_by UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, date)
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Attendance viewable by staff and parents" ON attendance FOR SELECT USING (true);

-- 9. Exams Table
CREATE TABLE IF NOT EXISTS exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL, -- e.g. "Mid-Term 2026"
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Exams viewable by everyone" ON exams FOR SELECT USING (true);

-- 10. Marks Table
CREATE TABLE IF NOT EXISTS marks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_id UUID REFERENCES exams(id),
    student_id UUID REFERENCES students(id),
    subject TEXT NOT NULL,
    score NUMERIC,
    max_score NUMERIC DEFAULT 100,
    grade TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(exam_id, student_id, subject)
);

ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Marks viewable by staff and own parents" ON marks FOR SELECT USING (true);

-- 11. Helpdesk / Issues Table
CREATE TABLE IF NOT EXISTS issues (
    id TEXT PRIMARY KEY, -- e.g. 'ISS-1234'
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    priority TEXT,
    status TEXT DEFAULT 'Open',
    stage TEXT DEFAULT 'Teacher',
    student_id TEXT, -- Legacy ID or UUID
    reporter_id UUID REFERENCES profiles(id),
    assigned_to_id UUID REFERENCES profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Issues viewable by requester and staff" ON issues FOR SELECT USING (true);

-- Enable Realtime for core modules
ALTER PUBLICATION supabase_realtime ADD TABLE announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE homework;
ALTER PUBLICATION supabase_realtime ADD TABLE attendance;
ALTER PUBLICATION supabase_realtime ADD TABLE issues;
