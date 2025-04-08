from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.db.models import Q
from .serializers import UserSerializer


class RegisterUserView(APIView):
    def post(self, request):
        user = User.objects.filter(
            Q(email=request.data.get("email"))
            | Q(username=request.data.get("username"))
        )

        if user.exists():
            return Response(
                {"error": "User with this email or username already exists!"},
                status=status.HTTP_404_NOT_FOUND,
            )

        serialized_user = UserSerializer(data=request.data)

        if not serialized_user.is_valid():
            errors = [error[0] for error in serialized_user.errors.values()]
            return Response(
                {"error": " ".join(errors)}, status=status.HTTP_400_BAD_REQUEST
            )

        user = serialized_user.save()
        user.username = user.username.lower()
        user.save()
        # Send verification email logic here
        # send_verification_email(user)

        user_data = UserSerializer(user).data

        return Response(
            {"message": "User registered successfully!", "data": user_data}, status=201
        )


class SendPasswordResetEmailView(APIView):
    def post(self, request):
        # Logic for sending password reset email
        return Response({"message": "Password reset email sent!"}, status=200)


class ResetPasswordView(APIView):
    def post(self, request):
        # Logic for resetting password
        return Response({"message": "Password reset successfully!"}, status=200)


class SendVerficationTokenView(APIView):
    def post(self, request):
        # Logic for sending verification token
        return Response({"message": "Verification token sent!"}, status=200)


class VerifyEmailView(APIView):
    def post(self, request):
        # Logic for verifying email
        return Response({"message": "Email verified successfully!"}, status=200)


class LoginUserView(APIView):
    def post(self, request):
        # Logic for user login
        return Response({"message": "User logged in successfully!"}, status=200)


class LogoutUserView(APIView):
    def delete(self, request):
        # Logic for user logout
        return Response({"message": "User logged out successfully!"}, status=200)
