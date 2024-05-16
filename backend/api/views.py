from django.http import JsonResponse
from django.views import View
import json
import subprocess
from django.http import HttpResponse
from django.views import View

class TestView(View):
    def get(self, request):
        return HttpResponse("This is a test view.")

class GenerateResponse(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            model = data.get('model')
            prompt = data.get('prompt')
            result = subprocess.check_output(['curl', 'http://localhost:11434/api/generate', '-d', json.dumps(data)])
            response_data = json.loads(result)
            return JsonResponse(response_data)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
