from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=10)
    walletAddress = models.TextField()
    gamesWon = models.IntegerField()

    def _str_(self):
        return self.username

    class Meta:
        unique_together = ('walletAddress', 'username',)
