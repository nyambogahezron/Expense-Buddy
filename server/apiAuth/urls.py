from .views import (
    RegisterUserView,
    SendPasswordResetEmailView,
    ResetPasswordView,
    SendVerficationTokenView,
    VerifyEmailView,
    LoginUserView,
    LogoutUserView,
)


from django.urls import path


urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path(
        "send-password-reset-email/",
        SendPasswordResetEmailView.as_view(),
        name="send_password_reset_email",
    ),
    path("reset-password/", ResetPasswordView.as_view(), name="reset_password"),
    path(
        "send-verification-token/",
        SendVerficationTokenView.as_view(),
        name="send_verification_token",
    ),
    path("verify-email/", VerifyEmailView.as_view(), name="verify_email"),
    path("login/", LoginUserView.as_view(), name="login"),
    path("logout/", LogoutUserView.as_view(), name="logout"),
]
