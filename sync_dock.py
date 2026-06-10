import os
import re

ROOT = r"c:\Users\Kasula Santhosh\OneDrive\Desktop\REVISED ANTIGRAVITY CAMPUSCORE            1.0"
dashboard_path = os.path.join(ROOT, "js/dashboard.js")
nested_dashboard_path = os.path.join(ROOT, "antigravity-campuscore/js/dashboard.js")

with open(dashboard_path, 'r', encoding='utf-8') as f:
    dashboard_content = f.read()

# Extract the dynamic buildMacAdminDock from root dashboard.js
match = re.search(r'(function buildMacAdminDock\(user\) \{.*?\n\})', dashboard_content, re.DOTALL)
if match:
    dynamic_func = match.group(1)
    
    with open(nested_dashboard_path, 'r', encoding='utf-8') as f:
        nested_content = f.read()
        
    # Replace the hardcoded buildMacAdminDock with the dynamic one
    nested_content = re.sub(r'function buildMacAdminDock\(user\) \{.*?\n\}', dynamic_func, nested_content, flags=re.DOTALL)
    
    with open(nested_dashboard_path, 'w', encoding='utf-8') as f:
        f.write(nested_content)
    print("Successfully synchronized buildMacAdminDock to nested dashboard.")
else:
    print("Could not find dynamic buildMacAdminDock in root dashboard.")
