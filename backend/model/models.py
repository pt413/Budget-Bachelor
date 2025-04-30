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

        # Main categories
        rent = prediction[0][0]
        groceries = prediction[0][1]
        transport = prediction[0][2]
        eating_out = prediction[0][3]
        savings = prediction[0][4]

        # Calculate leftover amount
        total_income = user_input["income"]
        fixed_expenses = rent + groceries + transport + savings
        remaining = total_income - fixed_expenses

        if remaining < 0:
            remaining = 0  # No negative

        # Based on interests selected
        interests = {}
        selected_interests = []
        if user_input["interest_travel"]:
            selected_interests.append("Travel")
        if user_input["interest_food"]:
            selected_interests.append("Food")  # Eating_Out already mapped
        if user_input["interest_tech"]:
            selected_interests.append("Tech")
        if user_input["interest_fitness"]:
            selected_interests.append("Fitness")

        # Divide remaining money equally into selected interests
        if selected_interests:
            per_interest = remaining / len(selected_interests)
            for interest in selected_interests:
                interests[interest] = per_interest

        # Build response
        response = {
            "Rent": rent,
            "Groceries": groceries,
            "Transport": transport,
            "Savings": savings,
        }
        
        # Add eating_out separately under "Food"
        response["Food"] = eating_out

        # Add divided interests
        response.update(interests)

        return response

    except Exception as e:
        return {"error": str(e)}
