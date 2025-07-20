# Train-model.py

import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

# Load data
# Correct path
df = pd.read_excel('../data/Ticket_Data.xlsx')

# Feature engineering
df['desc_length'] = df['Ticket short desc'].apply(lambda x: len(str(x)))
df['category_encoded'] = df['Ticket category'].astype('category').cat.codes
df['priority_encoded'] = df['Priority'].astype('category').cat.codes
df['employee_encoded'] = df['Employee Name'].astype('category').cat.codes

# Define X and y
X = df[['category_encoded', 'priority_encoded', 'employee_encoded', 'desc_length']]
y = df['Hours Worked']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f'Mean Absolute Error on test set: {mae:.2f} hours')

# Save model
joblib.dump(model, 'resolution_time_model.pkl')

# Save encoders (for prediction API to use later)
joblib.dump({
    'category': dict(enumerate(df['Ticket category'].astype('category').cat.categories)),
    'priority': dict(enumerate(df['Priority'].astype('category').cat.categories)),
    'employee': dict(enumerate(df['Employee Name'].astype('category').cat.categories)),
}, 'encoders.pkl')
