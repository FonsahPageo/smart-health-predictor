# Import the necessary libraries
from statistics import mode
from flask import Flask, request, render_template
import numpy as np
import pandas as pd
import os
from scipy.stats import mode
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
import joblib
import pickle
import warnings
from sklearn.exceptions import DataConversionWarning
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# load the training and testing dataset
train_data = pd.read_csv("models/Training.csv").dropna(axis=1)
test_data = pd.read_csv("models/Testing.csv").dropna(axis=1)

encoder = LabelEncoder()
train_data["prognosis"] = encoder.fit_transform(train_data["prognosis"])

X = train_data.iloc[:, :-1]
y = train_data.iloc[:, -1]
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=24)


def cv_scoring(estimator, X, y):
    return accuracy_score(y, estimator.predict(X))


models = {
    "SVC": SVC(),
    "Gaussian NB": GaussianNB(),
    "Random Forest": RandomForestClassifier(random_state=18)
}
# producing cross validation score for models

for model_name in models:
    model = models[model_name]
    scores = cross_val_score(model, X, y, cv=10, n_jobs=-1, scoring=cv_scoring)

svm_model = SVC()
svm_model.fit(X_train, y_train)
preds = svm_model.predict(X_test)

nb_model = GaussianNB()
nb_model.fit(X_train, y_train)
preds = nb_model.predict(X_test)

rf_model = RandomForestClassifier(random_state=18)
rf_model.fit(X_train, y_train)
preds = rf_model.predict(X_test)

# Training the models on whole data
final_svm_model = SVC()
final_nb_model = GaussianNB()
final_rf_model = RandomForestClassifier(random_state=18)
final_svm_model.fit(X, y)
final_nb_model.fit(X, y)
final_rf_model.fit(X, y)

test_X = test_data.iloc[:, :-1]
test_Y = encoder.transform(test_data.iloc[:, -1])

svm_preds = final_svm_model.predict(test_X)
nb_preds = final_nb_model.predict(test_X)
rf_preds = final_rf_model.predict(test_X)

final_preds = [mode([i, j, k])
               for i, j, k in zip(svm_preds, nb_preds, rf_preds)]

# Disable the warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=DataConversionWarning)
warnings.filterwarnings("ignore", category=UserWarning)

# Initializing Models
models = {
    "SVC": SVC(),
    "Gaussian NB": GaussianNB(),
    "Random Forest": RandomForestClassifier(random_state=18)
}

symptoms = X.columns.values
# Creating a symptom index dictionary to encode the
# input symptoms into numerical form
symptom_index = {}
for index, value in enumerate(symptoms):
    symptom = " ".join([i.capitalize() for i in value.split("_")])
    symptom_index[symptom] = index

data_dict = {
    "symptom_index": symptom_index,
    "predictions_classes": encoder.classes_
}

# Defining the Function
# Input: string containing symptoms separated by commas
# Output: Generated predictions by models


def predictDisease(symptoms):
    symptoms = symptoms.split(",")

    # creating input data for the models
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        if symptom in data_dict["symptom_index"]:
            index = data_dict["symptom_index"][symptom]
            input_data[index] = 1

    # reshaping the input data and converting it
    # into suitable format for model predictions
    input_data = np.array(input_data).reshape(1, -1)

    # generating individual outputs
    rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[
        0]]
    nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[
        0]]
    svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[
        0]]

    # making final prediction by taking mode of all predictions
    final_prediction = mode([rf_prediction, nb_prediction, svm_prediction])
    predictions = {
        "RF model prediction": rf_prediction,
        "Naive Bayes prediction": nb_prediction,
        "SVM model prediction": svm_prediction,
        "final prediction": final_prediction
    }
    return predictions


app = Flask(__name__)


@app.route('/registration')
def registration():
    return render_template('patient-registration.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/consultation')
def consultation():
    return render_template('consultation.html')


@app.route('/news')
def news():
    return render_template('news.html')


@app.route('/patient')
def patient():
    return render_template('patient.html')


@app.route('/predictor')
def predictor():
    return render_template('predictor.html')


@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'POST':
        # Get the input data from the form
        symptom_list = request.form.getlist('symptoms')
        symptoms = ', '.join(symptom_list)
        # Make a prediction using the machine learning model
        prediction = predictDisease(symptoms)
        # Render a template with the prediction results
        return render_template('result.html', prediction=prediction)
    else:
        return render_template('predictor.html')


if __name__ == '__main__':
    app.run(debug=True)