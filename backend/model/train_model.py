import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.preprocessing import LabelEncoder
import joblib
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load dataset
df = pd.read_csv("data.csv")

# Encode categorical variables
le = LabelEncoder()
df["Occupation"] = le.fit_transform(df["Occupation"])
df["City_Tier"] = le.fit_transform(df["City_Tier"])

# Define features
features = [
    "Income", "Age", "Dependents", "Occupation", "City_Tier",
    "interest_travel", "interest_food", "interest_tech", "interest_fitness"
]
X = df[features]

# Define targets
targets = ["Rent", "Groceries", "Transport", "Eating_Out", "Desired_Savings"]
y = df[targets]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "recommendation_model.pkl")
print("✅ Model trained and saved as recommendation_model.pkl")

#Check for accuracy
y_pred = model.predict(X_test)
for i, target in enumerate(targets):
    print(f"\n📊 Evaluation for {target}:")
    print(f"R² Score: {r2_score(y_test[target], y_pred[:, i]):.4f}")
    print(f"MAE: {mean_absolute_error(y_test[target], y_pred[:, i]):.4f}")
    print(f"MSE: {mean_squared_error(y_test[target], y_pred[:, i]):.4f}")
    print(f"RMSE: {np.sqrt(mean_squared_error(y_test[target], y_pred[:, i])):.4f}")