import os, re

def find_supabase_calls():
    js_dir = 'js'
    js_files = [f for f in os.listdir(js_dir) if f.endswith('.js')]
    
    tables = set()
    rpcs = set()
    
    for f in js_files:
        path = os.path.join(js_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            
            # Find from('table')
            from_matches = re.findall(r"from\(['\"`]([^'\"`]+)['\"`]\)", content)
            for m in from_matches:
                tables.add(m)
                
            # Find rpc('func')
            rpc_matches = re.findall(r"rpc\(['\"`]([^'\"`]+)['\"`]\)", content)
            for m in rpc_matches:
                rpcs.add(m)

    print("--- TABLES ---")
    for t in sorted(tables): print(t)
    
    print("\n--- RPCS ---")
    for r in sorted(rpcs): print(r)

if __name__ == '__main__':
    find_supabase_calls()
