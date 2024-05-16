from django.db import models
from  django.contrib.auth.models import User

#author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
#this is for adding notes models.cascade will remove all notes and note values relating to the user
    

