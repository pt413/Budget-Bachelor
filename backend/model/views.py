from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import pickle
import os
import numpy as np

# Load the trained ML model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models.pkl")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"❌ models.pkl not found at {MODEL_PATH}")

with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

@csrf_exempt
def predict_expense(request):
    month = int(request.GET.get("month", 6))  # Default to next month
    prediction = model.predict(np.array([[month]]))
    return JsonResponse({"predicted_expense": prediction[0]})

def ml_home(request):
    return HttpResponse("Machine Learning API is running!")

def homepage(request):
    return HttpResponse("Welcome to the Budget Bachelor API!")