from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    """

    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "username",
            "email",
            "password",
            "avatar",
            "verification_token",
            "is_email_verified",
            "reset_password_token",
            "reset_password_token_created_at",
            "account_status",
            "loginAttempts",
        )
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": True},
            "username": {"required": True},
            "avatar": {"required": False},
            "verification_token": {"write_only": True, "required": False},
            "is_email_verified": {"write_only": True, "required": False},
            "reset_password_token": {"write_only": True, "required": False},
            "reset_password_token_created_at": {"write_only": True, "required": False},
            "account_status": {"write_only": True, "required": False},
            "loginAttempts": {"write_only": True, "required": False},
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
            verification_token=validated_data.get("verification_token", None),
            is_email_verified=validated_data.get("is_email_verified", False),
            reset_password_token=validated_data.get("reset_password_token", None),
            reset_password_token_created_at=validated_data.get(
                "reset_password_token_created_at", None
            ),
            account_status=validated_data.get("account_status", "active"),
            loginAttempts=validated_data.get("loginAttempts", 0),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
