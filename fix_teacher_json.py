import re
import json

with open('CAMPUSCORE_MASTER_SETUP.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

def convert_to_json_array(match):
    # e.g. "10-A, 9-B, 8-C" -> '["10-A", "9-B", "8-C"]'
    classes_str = match.group(1)
    classes_list = [c.strip() for c in classes_str.split(',')]
    json_str = json.dumps(classes_list)
    return f"'{json_str}'"

# Let's find the INSERT INTO cc_teachers block
teacher_block_match = re.search(r'(INSERT INTO cc_teachers.*?VALUES\n)(.*?)(;)', sql, re.DOTALL)
if teacher_block_match:
    prefix = teacher_block_match.group(1)
    rows = teacher_block_match.group(2)
    suffix = teacher_block_match.group(3)
    
    # In each row, the 4th item is the classes string.
    # We can match it easily because it's the only one with pattern like '10-A, 9-B, 8-C' or '8-B, 9-A'
    new_rows = re.sub(r"'([\d]+-[A-Z](?:,\s*[\d]+-[A-Z])*)'", convert_to_json_array, rows)
    
    sql = sql[:teacher_block_match.start()] + prefix + new_rows + suffix + sql[teacher_block_match.end():]

with open('CAMPUSCORE_MASTER_SETUP.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

print('Fixed cc_teachers JSON inserts!')
