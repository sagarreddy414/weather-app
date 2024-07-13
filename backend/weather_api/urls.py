from django.urls import path
from .views import WeatherView, AirQualityView

urlpatterns = [
    path('weather/', WeatherView.as_view(), name='weather'),
    path('air-quality/', AirQualityView.as_view(), name='air-quality'),
]