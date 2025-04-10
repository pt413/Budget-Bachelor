from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_expense, name='predict_expense'),
    path('', views.ml_home, name='ml_home'),
]
