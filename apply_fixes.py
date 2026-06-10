import os
import re

ROOT = r"c:\Users\Kasula Santhosh\OneDrive\Desktop\REVISED ANTIGRAVITY CAMPUSCORE            1.0"

def replace_in_file(rel_path, replacements):
    path = os.path.join(ROOT, rel_path)
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. Update UI.js for strict APASAA no-sidebar-mode
replace_in_file("js/ui.js", [
    (
        "const isCurrentViewAdmin = ['super_admin', 'mac_admin', 'apaaas', 'superadmin'].includes(roleKey);",
        "const isCurrentViewAPASAA = (roleKey === 'mac_admin') || (String(currentUser?.username || '').toUpperCase() === 'APASAA');"
    ),
    (
        "if (isCurrentViewAdmin) {",
        "if (isCurrentViewAPASAA) {"
    )
])

# 2. Update dashboard.js (root and nested) to only show dock for APASAA, and include labels
dock_render_old = """  const dockHtml = items.map(item => {
    const action = item.customAction || `navigateTo('${item.id}')`;
    return `
      <button class="cc-admin-dock__item cc-mac-dock-item" data-dock-action="${item.id}" title="${item.label}" onclick="${action}">
        <i class="fas ${item.icon}"></i>
      </button>
    `;
  }).join('');"""

dock_render_new = """  const dockHtml = items.map(item => {
    const action = item.customAction || `navigateTo('${item.id}')`;
    return `
      <button class="cc-mac-dock-item" data-dock-action="${item.id}" onclick="${action}">
        <i class="fas ${item.icon}"></i>
        <span class="cc-mac-dock-label">${item.label}</span>
      </button>
    `;
  }).join('');"""

dashboard_replacements = [
    (
        "const isCurrentViewAdmin = ['apaaas', 'super_admin', 'mac_admin', 'superadmin'].includes(roleKey);",
        "const isCurrentViewAPASAA = (roleKey === 'mac_admin') || (String(user.username || '').toUpperCase() === 'APASAA');"
    ),
    (
        "c.innerHTML = exitBar + ghostContent + (isCurrentViewAdmin ? buildMacAdminDock(user) : '');",
        "c.innerHTML = exitBar + ghostContent + (isCurrentViewAPASAA ? buildMacAdminDock(user) : '');"
    ),
    (
        dock_render_old,
        dock_render_new
    )
]

replace_in_file("js/dashboard.js", dashboard_replacements)
replace_in_file("antigravity-campuscore/js/dashboard.js", dashboard_replacements)

# 3. Update CSS Sidebar Widths to 260px
def update_sidebar_width(rel_path):
    path = os.path.join(ROOT, rel_path)
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = re.sub(r'--sidebar-width:\s*310px;', '--sidebar-width: 260px;', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

update_sidebar_width("css/dashboard.css")
update_sidebar_width("css/style.css")
update_sidebar_width("antigravity-campuscore/css/dashboard.css")
update_sidebar_width("antigravity-campuscore/css/style.css")

# 4. Overwrite mac-dock.css with the requested premium design without gimmicky animations
new_mac_dock_css = '''/* ============================================================
   CAMPUS CORE MAC DOCK CSS
   Premium glassmorphic dock for APASAA role
   ============================================================ */

.cc-mac-dock-wrapper {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  display: flex;
  justify-content: center;
  pointer-events: none; /* Let clicks pass through if not on dock */
}

.cc-mac-admin-dock {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  padding: 12px 16px;
  border-radius: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.4);
  max-width: 90vw;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.cc-mac-admin-dock::-webkit-scrollbar {
  display: none; /* Safari/Chrome */
}

[data-theme="dark"] .cc-mac-admin-dock {
  background: rgba(30, 36, 40, 0.7);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cc-mac-dock-item {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 16px;
  cursor: pointer;
  color: var(--color-text-muted);
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-width: 68px;
}

.cc-mac-dock-item:hover, .cc-mac-dock-item:focus {
  background: rgba(255, 255, 255, 0.5);
  color: var(--color-primary);
  transform: translateY(-4px); /* Smooth subtle float, not excessive scaling */
}

[data-theme="dark"] .cc-mac-dock-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cc-mac-dock-item.active {
  color: var(--color-primary);
  background: rgba(var(--color-primary-rgb, 25, 118, 210), 0.1);
}

.cc-mac-dock-item i {
  font-size: 20px;
  transition: transform 0.2s ease;
}

.cc-mac-dock-item:hover i {
  transform: scale(1.05); /* Very subtle icon scale */
}

.cc-mac-dock-label {
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.2px;
}

/* Sidebar removal & padding adjustment for APASAA (no-sidebar-mode) */
body.no-sidebar-mode #sidebar,
body.no-sidebar-mode .sidebar-overlay,
body.no-sidebar-mode .sidebar {
    display: none !important;
}

body.no-sidebar-mode .main-content {
    margin-left: 0 !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-bottom: 110px !important; /* Ensure content isn't hidden behind the dock */
}

body.no-sidebar-mode .sticky-top-banner {
    left: 0 !important;
    width: 100% !important;
}
'''

with open(os.path.join(ROOT, "css/mac-dock.css"), 'w', encoding='utf-8') as f:
    f.write(new_mac_dock_css)
with open(os.path.join(ROOT, "antigravity-campuscore/css/mac-dock.css"), 'w', encoding='utf-8') as f:
    f.write(new_mac_dock_css)

print("Updates applied successfully.")
