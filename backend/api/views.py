from django.http import JsonResponse, HttpResponse
from django.views import View
from django.shortcuts import render
import json
from langchain.embeddings import SentenceTransformerEmbeddings
from langchain.vectorstores import FAISS

class TestView(View):
    def get(self, request):
        return HttpResponse("This is a test view.")

class GenerateResponse(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            model = data.get('model')
            prompt = data.get('prompt')
            
            # Mock the response for demonstration purposes
            response_data = {
                'response': 'ok',
                'success': True
            }
            
            return JsonResponse(response_data)
        except Exception as e:
            # Log the error message
            print(f"Error occurred: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

def test(request):
    """This function is used for testing the pages"""
    data = [{'heading': f'This is heading_{ind}', 'content': f'This is content_{ind}'} for ind in range(4)]
    context = {
        'data': data,
    }
    return render(request, 'search.html', context)

def search(request):
    query = request.GET.get('query', '')

    if query:
        print(query)

        embedding = SentenceTransformerEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        db = FAISS.load_local("/home/kamal/gitfolders/website/vector/vector_db/", embedding)

        docs = db.similarity_search(query, k=7)
        result_docs = [{'source': x.metadata['source'], 'content': x.page_content} for x in docs]

        ctx = {
            'results': result_docs
        }

        return render(request, 'search.html', ctx)
    else:
        return JsonResponse({'error': 'No query provided'}, status=400)
