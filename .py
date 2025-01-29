from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spin', methods=['POST'])
def spin():
    import random
    wheel = ["red"] * 7 + ["black"] * 7 + ["green"] * 1
    result = random.choice(wheel)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
