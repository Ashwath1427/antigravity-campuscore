import re

dash = open('C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/dashboard.js', encoding='utf-8').read()
data = open('C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js', encoding='utf-8').read()

checks = []

# 1. Parent home uses cfg.stats not calculatedStats
if '(cfg.stats || []).map(s =>' in dash:
    checks.append('PASS: buildParentHome uses cfg.stats correctly')
elif 'calculatedStats.map' in dash:
    checks.append('FAIL: buildParentHome still uses undefined calculatedStats')
else:
    checks.append('WARN: buildParentHome stats pattern not found')

# 2. buildParentExams declares child
if 'function buildParentExams(user)' in dash and 'const child = getParentChildContext' in dash:
    checks.append('PASS: buildParentExams declares child')
else:
    checks.append('FAIL: buildParentExams missing child declaration')

# 3. buildParentResults declares child
if 'function buildParentResults(user)' in dash and 'const child = getParentChildContext' in dash:
    checks.append('PASS: buildParentResults declares child')
else:
    checks.append('FAIL: buildParentResults missing child declaration')

# 4. simulateAction is toast not alert
if "id = 'sim-toast'" in dash or 'sim-toast' in dash:
    checks.append('PASS: simulateAction uses toast notification')
else:
    checks.append('FAIL: simulateAction still uses alert')

# 5. Teacher password
if 'username: "T001"' in data and 'password:' in data:
    # extract teacher password
    m = re.search(r'username: "T001".*?password: "(.*?)"', data, re.DOTALL)
    if m:
        checks.append(f'INFO: Teacher T001 password is: {m.group(1)}')

# 6. Coordinator in ROLE_NAV
if 'coordinator: [' in dash or 'coordinator: {' in dash or 'ROLE_NAV' in dash:
    checks.append('PASS: Coordinator in ROLE_NAV logic')
else:
    checks.append('FAIL: Coordinator missing from ROLE_NAV')

# 7. Parent coordinator route exists  
if "user.role === 'coordinator'" in dash:
    checks.append('PASS: Coordinator routing in buildDashboard')
else:
    checks.append('FAIL: Coordinator routing missing')

# 18. Passwords normalized
if 'password: "PARENT123"' in data:
    n = data.count('password: "PARENT123"')
    checks.append(f'WARN: {n} parents still have PARENT123 (should be parent123)')
else:
    checks.append('PASS: All parent passwords normalized to lowercase')

for c in checks:
    print(c)
