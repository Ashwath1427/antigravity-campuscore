import urllib.request
with urllib.request.urlopen("https://ashwath1427.github.io/antigravity-campuscore/js/dashboard.js") as response:
    with open("live_dash.js", "wb") as f:
        f.write(response.read())
