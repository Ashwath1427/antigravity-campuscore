import os
import re

js_files = [f for f in os.listdir('js') if f.endswith('.js')]
files = js_files + ['../index.html']

functions_called = set()
for f in files:
    path = f if f.startswith('.') else os.path.join('js', f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            # find all onclick="someFunc(" or onclick='someFunc('
            matches = re.findall(r'onclick=[\"\']([a-zA-Z0-9_]+)\(', content)
            for m in matches:
                functions_called.add(m)
            # also find onchange="" and onsubmit=""
            matches = re.findall(r'onchange=[\"\']([a-zA-Z0-9_]+)\(', content)
            for m in matches:
                functions_called.add(m)
            matches = re.findall(r'onsubmit=[\"\']([a-zA-Z0-9_]+)\(', content)
            for m in matches:
                functions_called.add(m)

defined_funcs = set()
for f in files:
    path = f if f.startswith('.') else os.path.join('js', f)
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            # function myFunc(
            matches = re.findall(r'function ([a-zA-Z0-9_]+)\s*\(', content)
            # window.myFunc = function
            matches2 = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=\s*(?:function|async function|\()', content)
            # const myFunc = function
            matches3 = re.findall(r'const ([a-zA-Z0-9_]+)\s*=\s*(?:function|async function|\()', content)
            for m in matches + matches2 + matches3:
                defined_funcs.add(m)

missing = functions_called - defined_funcs
print('Total unique onclick functions called:', len(functions_called))
print('Total defined functions found:', len(defined_funcs))
print('Potentially missing functions:', sorted(missing))
