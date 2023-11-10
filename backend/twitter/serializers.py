from rest_framework import serializers
from twitter.models import Tweet, Interaction, User
from .models import UserProfile

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
# class ProfileSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Profile
    #     fields = '__all__'


class TweetSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    profile_image = serializers.CharField(source="user.profile_image", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    interactions = serializers.SerializerMethodField(read_only=True)

    def get_interactions(self, obj):
        user = self.context["request"].user
        all_interactions = Interaction.objects.filter(tweet=obj)
        res = {"liked": None, "retweeted": None}
        res["likes"] = all_interactions.filter(type="like").count()
        res["retweets"] = all_interactions.filter(type="retweet").count()
        liked_interaction = all_interactions.filter(type="like", user=user).first()
        retweet_interaction = all_interactions.filter(type="retweet", user=user).first()
        if liked_interaction:
            res["liked"] = liked_interaction.id
        if retweet_interaction:
            res["retweeted"] = retweet_interaction.id

        return res

    class Meta:
        model = Tweet
        fields = '__all__'

class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = '__all__'
        validators = []



class UserProfileSerializer(serializers.ModelSerializer):
    following_username = serializers.CharField(source="following.username", read_only=True)
    follower_username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'  # You can specify specific fields if needed

