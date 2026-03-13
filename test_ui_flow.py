import requests

base = 'http://127.0.0.1:5000'
with requests.Session() as s:
    payload = {'energy': '1.5', 'device': 'AC', 'horizon': 'hour'}
    r = s.post(base + '/predict', json=payload)
    print('POST /predict status:', r.status_code)
    try:
        print('Response JSON:', r.json())
    except Exception as e:
        print('JSON parse error:', e)

    r2 = s.get(base + '/visualize')
    print('\nGET /visualize status:', r2.status_code)
    html = r2.text
    print('HTML length:', len(html))
    # print first 400 chars
    print(html[:400])
    with open('visualize_snapshot.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print('Saved visualize_snapshot.html')
