from flask import Flask, render_template, request
import pickle

app = Flask(__name__)

with open('models/model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.form.to_dict()
    input_data = [data['age'], data['gender'], data['symptom1'], data['symptom2'], data['symptom3']]
    prediction = model.predict([input_data])
    return render_template('result.html', prediction=prediction[0])