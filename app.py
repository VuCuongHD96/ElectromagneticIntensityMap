from flask import Flask, send_from_directory, jsonify
from pyngrok import ngrok
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = Flask(__name__)

# Google Sheets API setup
SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
SPREADSHEET_ID = '1Mm_xxrdwJq-dEHoFBSdrRzBV2BU7BKHCWpmZmhbmxIE'
RANGE_NAME = 'Sheet1'

def get_google_sheets_data():
    try:
        credentials = service_account.Credentials.from_service_account_file(
            'js/credentials.json', scopes=SCOPES)
        service = build('sheets', 'v4', credentials=credentials)
        sheet = service.spreadsheets()
        result = sheet.values().get(
            spreadsheetId=SPREADSHEET_ID,
            range=RANGE_NAME
        ).execute()
        return result.get('values', [])
    except Exception as e:
        print(f"Error fetching Google Sheets data: {e}")
        return None

@app.route('/')
def home():
    return send_from_directory('UI', 'index.html')

@app.route('/api/data')
def get_data():
    data = get_google_sheets_data()
    if data is not None:
        return jsonify(data)
    return jsonify({"error": "Failed to fetch data"}), 500

@app.route('/<path:path>')
def serve_static(path):
    if path.startswith('css/'):
        return send_from_directory('.', path)
    elif path.startswith('js/'):
        return send_from_directory('.', path)
    return send_from_directory('UI', path)

if __name__ == "__main__":
    # Set up ngrok
    public_url = ngrok.connect(3000)
    print(f"Ngrok URL: {public_url}")
    
    # Run Flask app
    app.run(port=3000) 