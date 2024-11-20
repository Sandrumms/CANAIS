import json
from flask import Flask, render_template

app = Flask(__name__)

# Garantir que o JSON seja lido como UTF-8
with open('channels.json', 'r', encoding='utf-8') as file:
    channels = json.load(file)

@app.route('/')
def home():
    return render_template('index.html', channels=channels)

if __name__ == "__main__":
    app.run(debug=True)
