import logging
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from api.models import Notification
from apiAuth.models import User

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Sends notification emails for unsent notifications (like budget alerts)"

    def handle(self, *args, **kwargs):
        # Get all notifications that have not been emailed yet
        unsent_notifications = Notification.objects.filter(
            is_email_sent=False
        ).select_related("user")

        if not unsent_notifications.exists():
            self.stdout.write(self.style.SUCCESS("No new notifications to send."))
            return

        # Group notifications by user for better email experience
        user_notifications = {}
        for notification in unsent_notifications:
            if notification.user_id not in user_notifications:
                user_notifications[notification.user_id] = []

            user_notifications[notification.user_id].append(notification)

        email_count = 0
        for user_id, notifications in user_notifications.items():
            try:
                user = User.objects.get(id=user_id)

                # Only send if email is verified
                if not user.is_email_verified or not user.email:
                    continue

                # Prepare email content
                subject = (
                    f"ExpenseBuddy: You have {len(notifications)} new notification(s)"
                )

                # Create context for email template
                context = {
                    "username": user.name or user.username,
                    "notifications": notifications,
                    "count": len(notifications),
                    "app_name": "ExpenseBuddy",
                    "current_date": timezone.now().strftime("%B %d, %Y"),
                }

                # Render HTML email
                html_message = render_to_string("notification_email.html", context)

                # Create plain text version
                plain_message = f"Hello {user.name or user.username},\n\n"
                plain_message += (
                    f"You have {len(notifications)} new notification(s):\n\n"
                )

                for notification in notifications:
                    plain_message += f"- {notification.title}\n"
                    plain_message += f"  {notification.message}\n\n"

                plain_message += (
                    "Log in to your ExpenseBuddy account to view details.\n\n"
                )
                plain_message += "Regards,\nExpenseBuddy Team"

                # Send email
                send_mail(
                    subject,
                    plain_message,
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    html_message=html_message,
                    fail_silently=False,
                )

                # Mark these notifications as sent
                notification_ids = [n.id for n in notifications]
                Notification.objects.filter(id__in=notification_ids).update(
                    is_email_sent=True
                )

                email_count += 1
                self.stdout.write(
                    f"Sent email with {len(notifications)} notifications to {user.email}"
                )

            except User.DoesNotExist:
                logger.error(
                    f"User with ID {user_id} not found while sending notification emails"
                )
            except Exception as e:
                logger.error(
                    f"Error sending notification email to user {user_id}: {str(e)}"
                )

        self.stdout.write(
            self.style.SUCCESS(f"Successfully sent {email_count} notification emails")
        )
