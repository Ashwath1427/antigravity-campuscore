import re, json

def extract_keys():
    with open('js/data.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find assignments like window.STUDENTS = [ { ... } ]
    assignments = re.finditer(r'window\.([A-Z_]+)\s*=\s*\[\s*({.*?})\s*[,\]]', content, re.DOTALL)
    
    schema = {}
    for m in assignments:
        var_name = m.group(1)
        obj_str = m.group(2)
        
        # Extract keys from the object string
        keys = re.findall(r'([a-zA-Z0-9_]+)\s*:', obj_str)
        if var_name not in schema:
            schema[var_name] = set()
        schema[var_name].update(keys)

    with open('scratchpad_data_keys.txt', 'w', encoding='utf-8') as out:
        for k in sorted(schema.keys()):
            out.write(f"{k}: {', '.join(sorted(schema[k]))}\n")
            
if __name__ == '__main__':
    extract_keys()
