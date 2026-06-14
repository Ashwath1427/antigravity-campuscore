import sys
import re

with open("live_dash.js", "r", encoding="utf-8") as f:
    original = f.read()

content = original
content = re.sub(r'//.*', lambda m: ' ' * len(m.group(0)), content)
content = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), content, flags=re.DOTALL)
content = re.sub(r'"(?:\\"|[^"])*"', lambda m: ' ' * len(m.group(0)), content)
content = re.sub(r"'(?:\\'|[^'])*'", lambda m: ' ' * len(m.group(0)), content)
content = re.sub(r'`(?:\\`|[^`])*`', lambda m: ' ' * len(m.group(0)), content, flags=re.DOTALL)

stack = []
pairs = {')': '(', '}': '{', ']': '['}
for i, char in enumerate(content):
    if char in "({[":
        stack.append((char, i))
    elif char in ")}]":
        if not stack:
            print(f"Unmatched closing bracket {char} at index {i}")
            break
        top, _ = stack.pop()
        if top != pairs[char]:
            print(f"Mismatched closing bracket {char} at index {i}. Expected {pairs[char]}")
            line_no = original.count('\n', 0, i) + 1
            print(f"Line number: {line_no}")
            start = max(0, i - 100)
            end = min(len(original), i + 100)
            print("Context:")
            print(original[start:end])
            break
