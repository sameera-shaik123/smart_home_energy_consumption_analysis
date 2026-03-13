import requests
import time

base = 'http://127.0.0.1:5000'

s = requests.Session()

# Give server a moment
print('Waiting briefly for server...')
time.sleep(2)

# Predict
payload = {'energy': 1.5, 'device': 'AC', 'horizon': 'day'}
print('Sending predict...')
r = s.post(base + '/predict', json=payload)
print('Status', r.status_code)
print(r.text[:500])

# Fetch visualize page
print('Fetching visualize page...')
r2 = s.get(base + '/visualize')
print('Visualize status', r2.status_code)
print('Visualize page snippet:', r2.text[:200])

# Download PDF
print('Downloading PDF...')
r3 = s.get(base + '/download-report')
print('PDF status', r3.status_code)
if r3.status_code == 200:
    with open('forecast_report_test.pdf', 'wb') as f:
        f.write(r3.content)
    print('Saved forecast_report_test.pdf')
else:
    print('Failed to download PDF')
