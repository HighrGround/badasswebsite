from django.urls import path
from . import views
from .models import vanslist






def get_data(request):
    data = vanslist.objects.all()  
    return render(request, 'data.json', {'data': data})  # 






urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name= "note-list"),
    path("vanslist/", views.VansListCreate.as_view(), name= "vanslist"),
    path("/modelCall", views.as_view(), name="modelCall"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),


]