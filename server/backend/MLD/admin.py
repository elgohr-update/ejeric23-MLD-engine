from django.contrib import admin
from .models import User

class MLDAdmin(admin.ModelAdmin):
    list_display = ('username', 'walletAddress')

admin.site.register(User, MLDAdmin)
