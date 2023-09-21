from django.contrib import admin

# Register your models here.
from twitter.models import Tweet, Interaction, UserProfile

# admin.site.register(Profile)

@admin.register(Tweet)
class TweetAdmin(admin.ModelAdmin):
    pass


@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    pass

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass