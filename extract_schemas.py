import os, re

def extract_schemas():
    sql_files = ['CAMPUSCORE_MASTER_SETUP.sql', 'supabase-complete.sql']
    schemas = {}
    
    for f in sql_files:
        if os.path.exists(f):
            with open(f, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                matches = re.finditer(r'CREATE TABLE (?:IF NOT EXISTS )?(?:public\.)?\"?([a-zA-Z0-9_]+)\"?\s*\((.*?)\);', content, re.IGNORECASE | re.DOTALL)
                for m in matches:
                    table_name = m.group(1).lower()
                    if table_name not in schemas:
                        schemas[table_name] = m.group(0)
                        
    with open('scratchpad_schema.txt', 'w', encoding='utf-8') as out:
        for t in sorted(schemas):
            out.write(schemas[t] + "\n\n")
    print("Schema extraction complete")

if __name__ == '__main__':
    extract_schemas()
