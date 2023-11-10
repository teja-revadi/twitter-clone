from django.contrib import admin

# Register your models here.
from twitter.models import Tweet, Interaction, UserProfile, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    pass


@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    pass

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass