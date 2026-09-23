import urllib.request, re
html = urllib.request.urlopen('https://solar-resolve-24.vercel.app').read().decode('utf-8')
js_match = re.search(r'assets/index-.*?.js', html)
js_url = 'https://solar-resolve-24.vercel.app/' + js_match.group(0)
js = urllib.request.urlopen(js_url).read().decode('utf-8')
print([u for u in set(re.findall(r'https?://[a-zA-Z0-9.\-/_]+', js)) if 'localhost' not in u and 'w3' not in u])

