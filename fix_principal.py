with open('CAMPUSCORE_MASTER_SETUP.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# Replace the check constraint to include 'principal'
sql = sql.replace("'vp', 'vice_principal'))", "'vp', 'vice_principal', 'principal'))")

with open('CAMPUSCORE_MASTER_SETUP.sql', 'w', encoding='utf-8') as f:
    f.write(sql)
print('Fixed principal role check!')
