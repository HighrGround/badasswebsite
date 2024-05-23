from django.urls import path
from . import views

urlpatterns = [
    path('generate', views.GenerateResponse, name='generate_response'),  
    path('test/', views.TestView, name='test_view'),  
    path('test/',views.test,name='test'),
    path('search/',views.search,name='search'),
]
