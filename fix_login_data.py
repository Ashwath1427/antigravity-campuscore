import json
import re

dash_path = "C:/Users/Kasula Santhosh/OneDrive/Desktop/ANTIGRAVATI CAMPUSCORE/js/data.js"
with open(dash_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix original Meera Sharma's parent to avoid conflict with child 20 (CHEEKOORI SAI CHARAN) who is 3240504
content = content.replace('P3240504A', 'P3240505A', 1)  # replace only the first occurrence

# Fix all generated parents' passwords to be lowercase 'parent123' to match the original
content = content.replace('password: "PARENT123"', 'password: "parent123"')

# Update STUDENTS array to be 'let' instead of 'const' so we can overwrite it from localStorage
content = re.sub(r"const STUDENTS =", "let STUDENTS =", content)

with open(dash_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed data.js login issues.")

