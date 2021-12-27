import os
import numpy as np
import tensorflow as tf
from flask import Flask, jsonify, request
from flask_cors import CORS
from tensorflow import keras
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

MODEL_PATH = 'Review_prediction__trained_model.h5'

# Load your own trained model
model = load_model(MODEL_PATH)
# model = model.compile(optimizer='adam',
#           loss='sparse_categorical_crossentropy',
#           metrics=['accuracy'])
# model._make_predict_function()          # Necessary
print('Model loaded. Start serving...')

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
# Document Categories
# Categories = [1, 2, 3, 4, 5]

#max sequence size for padding
max_size = 100

app = Flask(__name__)
CORS(app)
# @app.route("/validate",methods=['POST'])
# def return_price():
#   date = request.args.get('nic')
#   month = request.

#   price = my_bitcoin_predictor.predict(date, month, year)
#   price_dict = {
#                 'model':'mlp',
#                 'price': price,
#                 }
#   return jsonify(price_dict)


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        data = request.get_json()
        sample_txt = data['review']
        seq = tokenizer.texts_to_sequences(sample_txt)
        padded = pad_sequences(seq, maxlen=max_size,padding='post', truncating='post')
        pred = model.predict(padded)
        labels = ['1.0', '2.0', '3.0', '4.0', '5.0']
        print(np.argmax(pred))
        # print(pred, labels[np.argmax(pred)])

        return jsonify(prediction=labels[np.argmax(pred)])

    return None


@app.route("/", methods=['GET'])
def default():
    return "<h1> Rating Predication Server Running <h1>"


if __name__ == "__main__":
    app.run()
