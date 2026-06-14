with open("js/dashboard.js", "r", encoding="utf-8") as f:
    text = f.read()

backticks = text.count("`")
print(f"Total backticks: {backticks}")
