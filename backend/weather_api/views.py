from django.shortcuts import render

# Create your views here.
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

OPENWEATHERMAP_API_KEY = 'd906093fd3bbd9f8048733d4eba1d76b'
AQICN_API_KEY = '72c1bfaaa13738faa5ee9407998e6396f8912be5'

class WeatherView(APIView):
    def get(self, request):
        lat = request.GET.get('lat')
        lon = request.GET.get('lon')
        
        url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHERMAP_API_KEY}&units=metric"
        response = requests.get(url)
        return Response(response.json())

class AirQualityView(APIView):
    def get(self, request):
        lat = request.GET.get('lat')
        lon = request.GET.get('lon')
        
        url = f"http://api.waqi.info/feed/geo:{lat};{lon}/?token={AQICN_API_KEY}"
        response = requests.get(url)
        return Response(response.json())