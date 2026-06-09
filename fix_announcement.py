import re

with open('CAMPUSCORE_MASTER_SETUP.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# Add target_audience to cc_announcements
old_announcement = """CREATE TABLE public.cc_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    priority TEXT,
    content TEXT,"""

new_announcement = """CREATE TABLE public.cc_announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date TEXT,
    author TEXT,
    category TEXT,
    priority TEXT,
    content TEXT,
    target_audience TEXT,"""

sql = sql.replace(old_announcement, new_announcement)

with open('CAMPUSCORE_MASTER_SETUP.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

with open('final_mastersql.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

print('Fixed missing target_audience column!')
