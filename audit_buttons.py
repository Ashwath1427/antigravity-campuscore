import os
import re

js_files = [f for f in os.listdir('js') if f.endswith('.js')]
files = js_files + ['../index.html']

buttons = []
for f in files:
    path = f if f.startswith('.') else os.path.join('js', f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            matches = re.findall(r'<button\s+[^>]*>', content)
            for m in matches:
                buttons.append((path, m))

print("Buttons missing id, onclick, or type=submit:")
for path, b in buttons:
    if 'onclick' not in b and 'id=' not in b and 'type="submit"' not in b and 'type=\'submit\'' not in b:
        # Ignore close buttons in modals that use generic class or data-dismiss if any, wait, let's just print them all
        if 'class="close-btn"' not in b and 'class=\'close-btn\'' not in b:
            print(f"{path} : {b}")
