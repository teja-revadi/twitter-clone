from django.urls import path, include
from rest_framework.routers import DefaultRouter
from twitter.views import TweetViewSet, InteractionViewSet, UserViewSet, UserProfileViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'tweets', TweetViewSet)
router.register(r'Interactions', InteractionViewSet)
router.register(r'users', UserViewSet)
router.register(r'user-profiles', UserProfileViewSet)
router.register(r'change_password', TweetViewSet)
# router.register(r'profiles', ProfileViewSet)


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
