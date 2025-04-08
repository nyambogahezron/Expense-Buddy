from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = ("id", "name", "username", "email", "password", "avatar")
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True},
            "username": {"required": True},
            "avatar": {"required": False},
        }

    def validate(self, attrs):
        """
        Validate the user data.
        """
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError("Email already exists.")
        if User.objects.filter(username=attrs["username"]).exists():
            raise serializers.ValidationError("Username already exists.")
        return attrs

    def create(self, validated_data):
        """
        Create a new user instance.
        """
        user = User(
            name=validated_data["name"],
            username=validated_data["username"],
            email=validated_data["email"],
            avatar=validated_data.get("avatar", None),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
