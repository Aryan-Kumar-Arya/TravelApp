import re

with open('/Users/aryankumararya/Documents/Antigravity Workspace/TravelApp/src/data/recommendations.js', 'r') as f:
    text = f.read()

parts = text.split('  },')

tokyo_recs = []
for p in parts:
    if "city: 'Tokyo'" in p:
        uid_match = re.search(r"uniqueId:\s*'([^']+)'", p)
        if practically_match := uid_match:
            uid = uid_match.group(1)
            tag = re.search(r"tag:\s*'([^']+)'", p).group(1)
            src = re.search(r"source:\s*'([^']+)'", p).group(1)
            title = re.search(r"title:\s*'([^']+)'", p).group(1)
            desc = re.search(r"description:\s*'([^']+)'", p).group(1)
            lat = re.search(r"lat:\s*([0-9.]+)", p).group(1)
            lng = re.search(r"lng:\s*([0-9.]+)", p).group(1)
            
            tokyo_recs.append(f"| `{uid}` | **{tag.capitalize()}** | `{src}` | **{title}**<br>_{desc}._ | `{lat},{lng}` |")

print('| Unique ID | Category | Source | Title / Description | Coordinates |')
print('|-----------|----------|--------|---------------------|-------------|')
for r in tokyo_recs:
    print(r)
