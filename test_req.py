import urllib.request, json
url = 'https://solarresolve-24-production.up.railway.app/api/v1/assessments/inline/generate'
data = {
    'evidence': {
        'original_description': 'battery dying fast',
        'change_pattern': 'sudden',
        'reaches_full_charge': 'no',
        'previous_runtime': '12 hours',
        'current_runtime': '2 hours'
    }
}
req = urllib.request.Request(url, method='POST', headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, data=json.dumps(data).encode('utf-8')) as response:
        print(response.read().decode())
except urllib.error.HTTPError as e:
    print('HTTPError:', e.code, e.read().decode())
except Exception as e:
    print(e)

