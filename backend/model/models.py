from django.db import models

# Create your models here.
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle
import os

# here 1
data = pd.DataFrame({
    'Month': [1, 2, 3, 4, 5],
    'Expenses': [500, 600, 700, 800, 900]
})

X = data[['Month']]
y = data['Expenses']

model = LinearRegression()
model.fit(X, y)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "models.pkl")
with open(MODEL_PATH, "wb") as f:
    pickle.dump(model, f)