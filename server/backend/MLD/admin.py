from django.contrib import admin
from .models import User

class MLDAdmin(admin.ModelAdmin):
    list_display = ('username', 'walletAddress', 'gamesWon')

admin.site.register(User, MLDAdmin)
