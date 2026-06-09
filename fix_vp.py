with open('supabase-complete.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# Replace the specific value in the insert
sql = sql.replace("'vice_principal'", "'vp'")

# Also, just to be extremely safe, add 'vice_principal' to the CHECK constraint
sql = sql.replace("'vp')", "'vp', 'vice_principal')")

with open('supabase-complete.sql', 'w', encoding='utf-8') as f:
    f.write(sql)
print('Fixed vp role check!')
