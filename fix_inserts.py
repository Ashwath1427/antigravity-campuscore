import re

# 1. Read the old SQL file which contains the valid multi-line INSERT statements
with open('old_sql.sql', 'r', encoding='utf-8') as f:
    old_sql = f.read()

# 2. Extract the INSERT statements. They start with "INSERT INTO" and end with ";"
# We use re.DOTALL to match across newlines
inserts = re.findall(r'(INSERT INTO\s+.*?;)', old_sql, re.DOTALL | re.IGNORECASE)

fixed_inserts = []
for i in inserts:
    # We replace the old columns with the new columns
    i = i.replace('(admission_number, name, class, section, roll_number, gender, parent_name, parent_contact, parent_email, attendance_percentage, gpa, fee_status)',
                  '(adm_no, name, class, section, roll, gender, parent, parent_contact, parent_email, attendance, gpa, fee_status)')
    fixed_inserts.append(i)

# 3. Read the master schema we pushed recently
# Wait, the current supabase-complete.sql HAS the master schema at the top!
with open('supabase-complete.sql', 'r', encoding='utf-8') as f:
    current_sql = f.read()

# The current_sql has broken single-line inserts at the bottom. We should strip them.
# The inserts start below the line "-- SAMPLE DATA INSERTS"
split_marker = '-- SAMPLE DATA INSERTS'
if split_marker in current_sql:
    schema_part = current_sql.split(split_marker)[0]
else:
    schema_part = current_sql  # Fallback

# 4. Combine into final SQL
final_sql = f'''{schema_part}
{split_marker}
-- ============================================================

{chr(10).join(fixed_inserts)}
'''

with open('supabase-complete.sql', 'w', encoding='utf-8') as f:
    f.write(final_sql)

print(f'Successfully rebuilt supabase-complete.sql with {len(fixed_inserts)} insert blocks!')
