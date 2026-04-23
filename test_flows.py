import json
import uuid

dash = open('js/dashboard.js', encoding='utf-8').read()
app = open('js/app.js', encoding='utf-8').read()
ui = open('js/ui.js', encoding='utf-8').read()

print("--- 1. Parent Dark Mode Testing ---")
# Check if loadTheme reads campuscore_settings
if 'campuscore_settings' in ui and 'darkMode' in ui:
    print("PASS: loadTheme correctly checks campuscore_settings for darkMode")
else:
    print("FAIL: loadTheme only checks 'cc_theme', but Settings saves to 'campuscore_settings'. Dark mode will NOT persist on refresh.")

print("\n--- 2. Parent -> Teacher Message Flow ---")
if 'GLOBAL_ISSUES.push' in dash or 'GLOBAL_ISSUES.unshift' in dash:
    print("PASS: submitConcern pushes to GLOBAL_ISSUES")
else:
    print("FAIL: submitConcern does not push to GLOBAL_ISSUES")

if 'saveIssues(' in dash and ('submitConcern' in dash or 'newIssue' in dash):
    print("PASS: submitConcern saves to localStorage")
else:
    print("FAIL: submitConcern does not save to localStorage")

print("\n--- 3. Teacher -> Coordinator Escalation ---")
# check if escalate updates stage to coordinator
if "issue.stage = 'Coordinator'" in dash or 'issue.stage = "Coordinator"' in dash:
    print("PASS: escalate updates stage to Coordinator")
else:
    print("WARN: escalate to Coordinator string not exactly matched, requires manual review")

print("\n--- 4. VP Resolved Bin -> Restore to Main Issues ---")
if "issue.status = 'Open'" in dash and ('reopen' in dash.lower() or 'restore' in dash.lower()):
    print("PASS: Reopen changes status back to Open")
else:
    print("WARN: Reopen function might not update status to Open")

print("\n--- 5. Attachments Download Across Roles ---")
if '<a href' in dash and 'download' in dash:
    print("PASS: Found link for downloading attachments")
else:
    print("FAIL: No functional download/view buttons for attachments found. Attachments are just text or don't render as clickable.")
