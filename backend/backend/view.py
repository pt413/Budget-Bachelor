from django.http import JsonResponse
from model.models import get_prediction
import json
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def budget_recommendation(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = get_prediction(data)
            return JsonResponse(result)
        except Exception as e:
            return JsonResponse({"error": str(e)})
    else:
        return JsonResponse({"error": "Only POST method allowed"})
