
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer
from base.models import Note


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
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





import json
import logging as logger
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import JsonResponse 
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


class GenerateResponse(APIView):
    @permission_classes([IsAuthenticated])

    def post(self, request):
        try:
            request_data = json.loads(request.body)
            input_text = request_data.get('text', '')

            if not input_text:
                return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            llm = ChatOllama(model="mistral")
            prompt = ChatPromptTemplate.from_template("is this working")

            chain = prompt | llm | StrOutputParser()


            response_data = chain.invoke({"options": input_text})

            return Response({'response': response_data}, status=status.HTTP_200_OK)
        except Exception as e:

            logger.error(f"Error occurred: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @permission_classes([IsAuthenticated])
    def get(self, request):
        try:
            # Here you can define what should happen for a GET request.
            # For example, you might return a message or some default data.
            return Response({'message': 'This is a GET request response'}, status=status.HTTP_200_OK)
        except Exception as e:
            # Log the error message
            logger.error(f"Error occurred: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)