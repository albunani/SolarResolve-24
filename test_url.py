import urllib.request, re
url = 'https://solar-resolve-24.vercel.app/assets/index-C7dXEQa8.js'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
    urls = re.findall(r'http[s]?://[^\s\"\'\\]+', content)
    for u in set(urls):
        if 'localhost' not in u and 'w3.org' not in u:
            print('Found URL in JS:', u)
except Exception as e:
    print(e)
