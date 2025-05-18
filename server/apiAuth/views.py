from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from django.db.models import Q
from .serializers import UserSerializer
from django.utils import timezone
from .utils import (
    send_verification_email,
    send_password_reset_email,
    send_welcome_email,
)
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings


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

        # Send verification email
        try:
            send_verification_email(user)
        except Exception as e:
            # Log the error but don't prevent registration
            print(f"Error sending verification email: {str(e)}")

        user_data = UserSerializer(user).data

        return Response(
            {
                "message": "User registered successfully! Please check your email to verify your account.",
                "data": user_data,
            },
            status=201,
        )


class SendPasswordResetEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if not user:
            # Don't reveal if user exists for security
            return Response(
                {
                    "message": "If an account with this email exists, a password reset link has been sent."
                },
                status=status.HTTP_200_OK,
            )

        try:
            send_password_reset_email(user)
        except Exception as e:
            # Log the error
            print(f"Error sending password reset email: {str(e)}")
            return Response(
                {"error": "Failed to send password reset email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Password reset email sent!"}, status=status.HTTP_200_OK
        )


class ResetPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        token = request.data.get("token")
        new_password = request.data.get("password")
        if not email or not token or not new_password:
            return Response(
                {"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )
        if user.reset_password_token != token:
            return Response(
                {"error": "Invalid password reset token"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if user.reset_password_token_created_at:
            token_expiry_time = (
                user.reset_password_token_created_at + timezone.timedelta(hours=24)
            )
            if timezone.now() > token_expiry_time:
                return Response(
                    {"error": "Password reset token has expired"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        user.set_password(new_password)
        user.reset_password_token = None
        user.reset_password_token_created_at = None
        user.account_status = "active"
        user.is_email_verified = True
        user.verification_token = None
        user.verification_token_created_at = None
        user.loginAttempts = 0
        user.save()

        return Response({"message": "Password reset successfully!"}, status=200)


class SendVerficationTokenView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            send_verification_email(user)
        except Exception as e:
            print(f"Error sending verification email: {str(e)}")
            return Response(
                {"error": "Failed to send verification email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Verification email sent!"}, status=status.HTTP_200_OK
        )


class VerifyEmailView(APIView):
    def post(self, request):
        email = request.data.get("email")
        token = request.data.get("token")

        if not email or not token:
            return Response(
                {"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if user.is_email_verified:
            return Response(
                {"error": "Email is already verified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Verify the email
        if user.verification_token != token:
            return Response(
                {"error": "Invalid verification token"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the token is expired
        if user.verification_token_created_at:
            token_expiry_time = user.verification_token_created_at + timezone.timedelta(
                hours=24
            )
            if timezone.now() > token_expiry_time:
                return Response(
                    {"error": "Verification token has expired"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        user.is_email_verified = True
        user.verification_token = None
        user.verification_token_created_at = None
        user.save()

        # Send welcome email to user after successful verification
        try:
            send_welcome_email(user)
        except Exception as e:
            # Log the error but continue with the verification process
            print(f"Error sending welcome email: {str(e)}")

        return Response({"message": "Email verified successfully!"}, status=200)


class LoginUserView(APIView):
    def post(self, request):

        # Check if the request is authenticated
        if request.user.is_authenticated:
            return Response(
                {"message": "User is already logged in"}, status=status.HTTP_200_OK
            )

        # Get credentials from request
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        email_username = username if username else email
        if not email_username:
            return Response(
                {"error": "Username or email is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if user exists
        try:
            # Allow login with username or email
            user = User.objects.get(
                Q(username__iexact=email_username) | Q(email__iexact=email_username)
            )
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        # Check account status
        if user.account_status != "active":
            return Response(
                {
                    "error": f"Your account is {user.account_status}. Please restore your account to log in."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Check if user email is verified
        if not user.is_email_verified:
            return Response(
                {
                    "error": "Please verify your email before logging in",
                    "needsVerification": True,
                    "email": user.email,
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Check login attempts
        if user.loginAttempts >= 5:  # Limit to 5 attempts
            user.account_status = "inactive"
            user.save()
            return Response(
                {
                    "error": "Too many failed login attempts. Please reset your password."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        # Authenticate user
        auth_user = authenticate(username=user.username, password=password)
        if not auth_user:
            # Increment login attempts
            user.loginAttempts += 1
            user.save()
            return Response(
                {
                    "error": f"Invalid credentials. {5 - user.loginAttempts} attempts remaining."
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Reset login attempts on successful login
        user.loginAttempts = 0
        user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)

        response = Response(
            {
                "message": "Login successful",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "name": user.name,
                    "avatar": user.avatar.url if user.avatar else None,
                },
            },
            status=status.HTTP_200_OK,
        )

        # Set JWT cookie according to settings
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=str(refresh.access_token),
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        return response


class LogoutUserView(APIView):
    def delete(self, request):
        response = Response({"message": "User logged out successfully!"}, status=200)
        response.delete_cookie(settings.SIMPLE_JWT["AUTH_COOKIE"])
        return response


class EmailSendTest(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response(
                {"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.filter(email=email).first()
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            send_verification_email(user)
        except Exception as e:
            print(f"Error sending verification email: {str(e)}")
            return Response(
                {"error": "Failed to send verification email"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Verification email sent!"}, status=status.HTTP_200_OK
        )


class ShowCurrentUser(APIView):
    def get(self, request):
        token = request.COOKIES.get("access_token")
        if not token:
            return Response(
                {"error": "Unauthorized access, no token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            # Verify the token and get the payload
            payload = UntypedToken(token)
            user_id = payload.get("user_id")
            if not user_id:
                return Response(
                    {"error": "Unauthorized access,invalid token"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # Get the user from the database
            user = User.objects.get(id=user_id)
            return Response(UserSerializer(user).data, status=status.HTTP_200_OK)

        except (InvalidToken, TokenError) as e:
            return Response(
                {"error": "Invalid Token"}, status=status.HTTP_401_UNAUTHORIZED
            )
