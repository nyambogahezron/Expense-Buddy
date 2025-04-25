from encodings.punycode import T
from django.conf import settings
import secrets
import string
from django.utils import timezone
from datetime import datetime
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


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

    # Create context for email template
    context = {
        "username": user.name or user.username,
        "token": token,
        "current_year": datetime.now().year,
    }

    # Render HTML email from template
    html_message = render_to_string("verification_email.html", context)

    # Create plain text version for clients that don't support HTML
    plain_message = f"""Hi {user.username},
    
Please use the following 6-digit code to verify your email address:
{token}

This code will expire in 24 hours.

Best regards,
The ExpenseBuddy Team"""

    # Send email with both HTML and plain text versions
    email = EmailMultiAlternatives(
        subject, plain_message, settings.DEFAULT_FROM_EMAIL, [user.email]
    )
    email.attach_alternative(html_message, "text/html")
    return email.send()


def send_password_reset_email(user):
    """Send password reset email to user"""
    # For password resets, keep using secure tokens
    token = generate_token(length=6, numeric_only=True)
    # Save token to user model with timestamp
    user.reset_password_token = token
    user.reset_password_token_created_at = timezone.now()
    user.save()

    subject = "Reset your ExpenseBuddy password"

    # Get client URL from settings or use default
    client_url = getattr(settings, "CLIENT_URL", "http://localhost:5000")
    reset_url = f"{client_url}/reset-password?token={token}&email={user.email}"

    # Create context for email template
    context = {
        "username": user.name or user.username,
        "token": token,
        "reset_url": reset_url,
        "current_year": datetime.now().year,
    }

    # Render HTML email from template
    html_message = render_to_string("password_reset_email.html", context)

    # Create plain text version for clients that don't support HTML
    plain_message = f"""Hi {user.username},
    
We received a request to reset your password. Please use the following code to reset it:
{token}

Or visit this link to reset your password:
{reset_url}

This code and link will expire in 24 hours.

If you didn't request this, please ignore this email.

Best regards,
The ExpenseBuddy Team"""

    # Send email with both HTML and plain text versions
    email = EmailMultiAlternatives(
        subject, plain_message, settings.DEFAULT_FROM_EMAIL, [user.email]
    )
    email.attach_alternative(html_message, "text/html")
    return email.send()


def send_welcome_email(user):
    """Send welcome email to newly registered users after they verify their email address"""
    subject = "Welcome to ExpenseBuddy!"

    # Get client URL from settings or use default
    client_url = getattr(settings, "CLIENT_URL", "http://localhost:5000")

    # Create context for email template
    context = {
        "username": user.name or user.username,
        "email": user.email,
        "app_url": client_url,
        "current_year": datetime.now().year,
    }

    # Render HTML email from template
    html_message = render_to_string("welcome_email.html", context)

    # Create plain text version for clients that don't support HTML
    plain_message = f"""Hi {user.username},

Thank you for joining ExpenseBuddy! Your account has been successfully created and we're excited to help you take control of your finances.

Get Started in 3 Easy Steps:
1. Track your spending - Add your income and expenses to start monitoring your cash flow
2. Create budgets - Set up budgets for different categories to help manage your spending
3. View reports - Generate insights and reports to better understand your financial habits

If you have any questions or need assistance, please don't hesitate to contact our support team.

Best regards,
The ExpenseBuddy Team"""

    # Send email with both HTML and plain text versions
    email = EmailMultiAlternatives(
        subject, plain_message, settings.DEFAULT_FROM_EMAIL, [user.email]
    )
    email.attach_alternative(html_message, "text/html")
    return email.send()
