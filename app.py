from flask import Flask, render_template, request
import flask
import pickle
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open('models/model.pkl', 'rb') as f:
    model = pickle.load(f)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route('/users', methods=["GET", "POST"])
def users():
    print("users endpoint reached...")
    if request.method == "GET":
        with open("users.json", "r") as f:
            data = json.load(f)
            data.append({
                "username": "user4",
                "pets": ["hamster"]
            })
            return flask.jsonify(data)
        
    if request.method == "POST":
        received_data = request.get_json()
        print(f"received data: {received_data}")
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received: {message}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)

@app.route('/predict', methods=['POST'])
def predict():
    print("Prediction endpoint reached...")
    if request.method == "POST":
        received_data = request.get_json()
        print(f"received data: {received_data}")
        message = received_data['data']
        return_data = {
            "status": "success",
            "message": f"received: {message}"
        }
        return flask.Response(response=json.dumps(return_data), status=201)
    # input_data = [data['symptom1'], data['symptom2'], data['symptom3']]
    # prediction = model.predict([input_data])
    # return render_template('results.html', prediction=prediction[0])

if __name__ == "__main__":
    app.run("localhost", 6969)
