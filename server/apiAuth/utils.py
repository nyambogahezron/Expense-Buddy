from encodings.punycode import T
from django.core.mail import send_mail
from django.conf import settings
import secrets
import string
from django.utils import timezone


def generate_token(length=20, numeric_only=False):
    """
    Generate a random token for email verification or password reset
    """
    if numeric_only:
        # Generate a numeric-only code for human readability
        return "".join(secrets.choice(string.digits) for i in range(length))
    else:
        # Generate alphanumeric token (more secure for password resets)
        alphabet = string.ascii_letters + string.digits
        return "".join(secrets.choice(alphabet) for i in range(length))


def send_verification_email(user):
    """Send verification email to user"""
    # Generate a 6-digit verification code for easier human use
    token = generate_token(length=6, numeric_only=True)
    # Save token to user model
    user.verification_token = token
    user.verification_token_created_at = timezone.now()
    user.save()

    subject = "Verify your ExpenseBuddy account"
    message = f"""Hi {user.username},
    
Please use the following 6-digit code to verify your email address:
{token}

This code will expire in 24 hours.

Best regards,
The ExpenseBuddy Team"""

    return send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )


def send_password_reset_email(user):
    """Send password reset email to user"""
    # For password resets, keep using secure tokens
    token = generate_token(length=6, numeric_only=True)
    # Save token to user model with timestamp
    user.reset_password_token = token
    user.reset_password_token_created_at = timezone.now()
    user.save()

    subject = "Reset your ExpenseBuddy password"
    message = f"""Hi {user.username},
    
We received a request to reset your password. Please use the following link to reset it:
http://yourfrontend.com/reset-password/{token}

or 

Use the following code to reset your password:
{token}


This link will expire in 1 hour.

If you didn't request this, please ignore this email.

Best regards,
The ExpenseBuddy Team"""

    return send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )
