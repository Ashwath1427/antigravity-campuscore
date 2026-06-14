import urllib.request
import json

try:
    req = urllib.request.Request("https://api.github.com/repos/Ashwath1427/antigravity-campuscore/actions/runs?per_page=1", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        run = data['workflow_runs'][0]
        print(f"Status: {run['status']}")
        print(f"Conclusion: {run['conclusion']}")
        print(f"Created at: {run['created_at']}")
        print(f"Updated at: {run['updated_at']}")
except Exception as e:
    print(f"Error: {e}")
