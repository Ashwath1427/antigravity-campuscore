import sys
import re

with open("js/dashboard.js", "r", encoding="utf-8") as f:
    content = f.read()

# Replace strings and comments with spaces to preserve length and line numbers
def replacer(m):
    return ' ' * len(m.group(0))

content = re.sub(r'//.*', replacer, content)
content = re.sub(r'/\*.*?\*/', replacer, content, flags=re.DOTALL)
content = re.sub(r'"(?:\\"|[^"])*"', replacer, content)
content = re.sub(r"'(?:\\'|[^'])*'", replacer, content)
content = re.sub(r'`(?:\\`|[^`])*`', replacer, content, flags=re.DOTALL)

stack = []
pairs = {')': '(', '}': '{', ']': '['}
for i, char in enumerate(content):
    if char in "({[":
        line = content[:i].count('\n') + 1
        stack.append((char, line))
    elif char in ")}]":
        if not stack:
            line = content[:i].count('\n') + 1
            print(f"Unmatched closing bracket {char} at line {line}")
            sys.exit(1)
        top, top_line = stack.pop()
        if top != pairs[char]:
            line = content[:i].count('\n') + 1
            print(f"Mismatched closing bracket {char} at line {line}. Expected {pairs[char]}, but top is {top} from line {top_line}")
            sys.exit(1)

if stack:
    print(f"Unmatched opening brackets: {stack}")
    sys.exit(1)

print("Brackets are balanced!")
