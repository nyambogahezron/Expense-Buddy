from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterUserView(APIView):
    def post(self, request):
        # Logic for user registration
        return Response({"message": "User registered successfully!"}, status=201)


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
