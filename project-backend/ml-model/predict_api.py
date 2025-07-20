# predict_api.py

from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model and encoders
model = joblib.load('resolution_time_model.pkl')
encoders = joblib.load('encoders.pkl')

# Reverse encoders to match input values to codes
category_map = {v: k for k, v in encoders['category'].items()}
priority_map = {v: k for k, v in encoders['priority'].items()}
employee_map = {v: k for k, v in encoders['employee'].items()}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        category_code = category_map.get(data['category'], 0)
        priority_code = priority_map.get(data['priority'], 0)
        employee_code = employee_map.get(data['employee'], 0)
        desc_length = len(data.get('description', ''))

        features = np.array([[category_code, priority_code, employee_code, desc_length]])

        prediction = model.predict(features)
        estimated_hours = float(np.round(prediction[0], 2))

        return jsonify({'estimated_hours': estimated_hours})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
