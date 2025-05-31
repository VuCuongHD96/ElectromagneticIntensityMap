from flask import Flask, send_from_directory
from pyngrok import ngrok
import os

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('UI', 'index.html')

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