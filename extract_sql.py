import os, re

def find_sql_tables():
    sql_files = [f for f in os.listdir('.') if f.endswith('.sql')]
    tables_in_sql = {}
    
    for f in sql_files:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
            matches = re.findall(r'CREATE TABLE (?:IF NOT EXISTS )?(?:public\.)?\"?([a-zA-Z0-9_]+)\"?', content, re.IGNORECASE)
            for t in matches:
                tables_in_sql[t.lower()] = tables_in_sql.get(t.lower(), []) + [f]
                
    print('Tables defined in SQL files:')
    for t in sorted(tables_in_sql):
        print(f'{t}: {len(tables_in_sql[t])} files')

if __name__ == '__main__':
    find_sql_tables()
