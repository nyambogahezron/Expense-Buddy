from tokenize import TokenError
from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from apiAuth.models import User


class AuthenticateUser(BasePermission):
    """
    Decorator to check if the user is authenticated.
    """

    def is_authenticated(self, request):
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
            return user

        except Exception(InvalidToken, TokenError, User.DoesNotExist):
            return False


class IsOwnTransaction(BasePermission):
    def can_access_transaction(self, request, obj):

        if request.method in ["GET", "POST", "PUT", "DELETE"]:
            return True

        user = AuthenticateUser().is_authenticated(request)
        if not user:
            return False

        return obj.user == user.get("id")
