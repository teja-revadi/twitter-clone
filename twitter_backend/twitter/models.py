from django.db import models

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    profile_image = models.ImageField(default="default.png", upload_to='profile_pics', null=True, blank=True)


# class Profile(models.Model):
#     user = models.OneToOneField(User,on_delete=models.CASCADE)
#     image = models.ImageField(default="default.png", upload_to='profile_pics')
#
#     def __str__(self):
#         return f'{self.user.username} Profile'


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")

    def __str__(self):
        return self.user.username

    class Meta:
        unique_together = ('user', 'following')


class Tweet(models.Model):
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content


class Interaction(models.Model):
    TYPE_CHOICES = [
        ('like', 'Like'),
        ('retweet', 'Retweet'),
    ]

    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(choices=TYPE_CHOICES, max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.tweet} - {self.type}"

    class Meta:
        unique_together = ('user', 'tweet', "type")

