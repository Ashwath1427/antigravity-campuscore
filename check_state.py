import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

print('--- USERS CHECK ---')
t_match = re.search(r'username:\s*[\'"]T001[\'"][^}]*password:\s*[\'"]([^\'"]+)[\'"]', data_content)
print('T001 password:', t_match.group(1) if t_match else 'NOT FOUND')

c_match = re.search(r'username:\s*[\'"]C001[\'"][^}]*password:\s*[\'"]([^\'"]+)[\'"]', data_content)
print('C001 password:', c_match.group(1) if c_match else 'NOT FOUND')

p_match = re.search(r'username:\s*[\'"]P3180076A[\'"][^}]*password:\s*[\'"]([^\'"]+)[\'"]', data_content)
print('P3180076A password:', p_match.group(1) if p_match else 'NOT FOUND')

# Let's count parents
parents = re.findall(r'username:\s*[\'"](P\d+A)[\'"]', data_content)
print('Total matching parent accounts format P<ID>A:', len(parents))

with open('js/dashboard.js', 'r', encoding='utf-8') as f:
    dash = f.read()

print('--- DASHBOARD BUTTONS ---')
buttons = [
    'Meet Parent', 'Open Case', 'Forward to Coordinator',
    'Assign Substitute', 'Adjust Allocation', 'Edit Timetable',
    'Create Notice', 'View Event Master Plan', 'Change Password', 'Edit Profile'
]

for b in buttons:
    print(f'{b}: {dash.count(b)} times')
    
# Let's see if buildVPStudentIssues is defined
print('buildVPStudentIssues defined?', 'buildVPStudentIssues' in dash)
print('buildVPApprovals defined?', 'buildVPApprovals' in dash)
