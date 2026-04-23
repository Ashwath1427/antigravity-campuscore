-- FINAL STEP: ALLOW PUBLIC READ ACCESS
-- Run this in your Supabase SQL Editor (https://bzqqgurlqunpzgdavedz.supabase.co)

-- Enable Row Level Security if not already enabled
ALTER TABLE cc_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_users ENABLE ROW LEVEL SECURITY;

-- Grant SELECT access to the 'anon' role (public)
CREATE POLICY "Allow public read" ON cc_students FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cc_announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cc_homework FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cc_events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON cc_users FOR SELECT USING (true);
