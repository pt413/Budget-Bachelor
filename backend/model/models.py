import numpy as np
import joblib
import os

# Load the trained model
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "recommendation_model.pkl")
model = joblib.load(model_path)

def get_prediction(user_input):
    try:
        input_array = np.array([[
            user_input["income"],
            user_input["age"],
            user_input["dependents"],
            user_input["occupation"],
            user_input["cityTier"],
            user_input["interest_travel"],
            user_input["interest_food"],
            user_input["interest_tech"],
            user_input["interest_fitness"]
        ]])
        prediction = model.predict(input_array)
        return {
            "Rent": prediction[0][0],
            "Groceries": prediction[0][1],
            "Transport": prediction[0][2],
            "Eating_Out": prediction[0][3],
            "Savings": prediction[0][4]
        }
    except Exception as e:
        return {"error": str(e)}
