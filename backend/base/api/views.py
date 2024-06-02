from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import NoteSerializer
from base.models import Note


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        
    ]

    return Response(routes)





@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)





@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate(request):
    try:
        # Extract text from POST request body
        request_data = json.loads(request.body)
        input_text = request_data.get('text', '')

        if not input_text:
            return JsonResponse({'error': 'No text provided'}, status=400)

        # Initialize the language model and prompt template
        llm = ChatOllama(model="mistral")
        prompt = ChatPromptTemplate.from_template(" {options}")

        chain = prompt | llm | StrOutputParser()

        # Generate response using the provided input text
        response_data = chain.invoke({"options": input_text})

        return JsonResponse({'response': response_data})
    except Exception as e:
        # Log the error message
        print(f"Error occurred: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)


    #serializer = NoteSerializer(notes, many=True)
    return Response()




