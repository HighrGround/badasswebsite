from django.urls import path
from . import views
from django.views.generic import TemplateView



urlpatterns = [
    path('test/', views.TestView.as_view(), name='test'),
    path('generate/', views.GenerateResponse.as_view(), name='generate_response'),
]