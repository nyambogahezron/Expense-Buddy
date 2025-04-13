from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from apiAuth.models import User


class AuthenticateUser(BasePermission):
    def has_permission(self, request, view):
        try:
            token = request.COOKIES.get("access_token")

            if not token:
                return False

            payload = UntypedToken(token)
            user_id = payload.get("user_id")

            if not user_id:
                return False

            user = User.objects.get(id=user_id)
            if not user:
                return False

            request.user = user  # Attach the user to the request
            return True

        except (InvalidToken, TokenError, User.DoesNotExist):
            return False


class IsOwnTransaction(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        return obj.user == user
