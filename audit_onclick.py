import os
import re

def get_js_files():
    files = [f for f in os.listdir('js') if f.endswith('.js')]
    files.append('../index.html')
    return files

def find_onclicks():
    onclicks = set()
    for f in get_js_files():
        path = f if f.startswith('.') else os.path.join('js', f)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                # Find onclick="myFunc(...)" or onclick='myFunc(...)'
                matches = re.findall(r'onclick=[\"\']([a-zA-Z0-9_]+)\s*\(', content)
                onclicks.update(matches)
                # Also find window.myFunc = ... assignments directly?
    return onclicks

def find_defined_functions():
    funcs = set()
    for f in get_js_files():
        path = f if f.startswith('.') else os.path.join('js', f)
        if os.path.exists(path):
            with open(path, 'r', encoding='utf-8') as file:
                content = file.read()
                # function myFunc
                funcs.update(re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', content))
                # window.myFunc = function
                funcs.update(re.findall(r'window\.([a-zA-Z0-9_]+)\s*=\s*', content))
                # const/let/var myFunc = 
                funcs.update(re.findall(r'(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:function|\([^)]*\)\s*=>)', content))
    return funcs

if __name__ == '__main__':
    called = find_onclicks()
    defined = find_defined_functions()
    
    missing = called - defined
    # ignore false positives like "if" or JS keywords
    missing = {m for m in missing if m not in ['if', 'alert', 'console', 'window', 'document', 'setTimeout']}
    
    print("Potentially Missing Functions:", sorted(list(missing)))
