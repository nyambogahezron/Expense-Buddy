from django.urls import path
from .views import (
    RegisterUserView,
    LoginUserView,
    LogoutUserView,
    SendPasswordResetEmailView,
    ResetPasswordView,
    SendVerficationTokenView,
    VerifyEmailView,
    EmailSendTest,
)

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
    path(
        "password-reset-email/",
        SendPasswordResetEmailView.as_view(),
        name="password_reset_email",
    ),
    path("password-reset/", ResetPasswordView.as_view(), name="password_reset"),
    path(
        "send-verification/",
        SendVerficationTokenView.as_view(),
        name="send_verification",
    ),
    path("verify-email/", VerifyEmailView.as_view(), name="verify_email"),
    path("test-email/", EmailSendTest.as_view(), name="test_email"),
]
