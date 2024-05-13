from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from django.http import JsonResponse
import subprocess
import json


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



# views.py

def generate_response(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            model = data.get('model')
            prompt = data.get('prompt')
            result = subprocess.check_output(['curl', 'http://localhost:11434/api/generate', '-d', json.dumps(data)])
            response_data = json.loads(result)

            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
