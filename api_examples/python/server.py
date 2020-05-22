from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    f = open(f"demofile2-2020-05-22.txt", "r")
    read = f.read()
    f.close()
    return read