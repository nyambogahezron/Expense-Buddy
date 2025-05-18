from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from ..models import Reminder, Notification
from ..serializers import ReminderSerializer
from app.permissions import AuthenticateUser
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from datetime import timedelta


class ReminderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling user reminders
    """

    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user
        queryset = Reminder.objects.filter(user=user)

        # Filter by completion status
        status_filter = self.request.query_params.get("status")
        if status_filter:
            if status_filter.lower() == "completed":
                queryset = queryset.filter(is_completed=True)
            elif status_filter.lower() == "active":
                queryset = queryset.filter(is_completed=False)

        # Filter by priority
        priority = self.request.query_params.get("priority")
        if priority:
            queryset = queryset.filter(priority=priority.lower())

        # Filter by category
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)

        # Filter by date range
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date:
            queryset = queryset.filter(due_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(due_date__lte=end_date)

        # Filter for upcoming reminders
        upcoming = self.request.query_params.get("upcoming")
        if upcoming:
            days = int(upcoming)
            future_date = timezone.now() + timedelta(days=days)
            queryset = queryset.filter(
                due_date__gte=timezone.now(),
                due_date__lte=future_date,
                is_completed=False,
            )

        # Search by title or description
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        # Default ordering
        return queryset.order_by("due_date")

    def perform_create(self, serializer):
        reminder = serializer.save(user=self.request.user)

        # Create a notification for this reminder if it's due within the next 7 days
        now = timezone.now()
        if reminder.due_date <= now + timedelta(days=7) and not reminder.is_completed:
            self._create_reminder_notification(reminder)

    def perform_update(self, serializer):
        original_reminder = self.get_object()
        updated_reminder = serializer.save()

        # If reminder was marked as completed, update any related notifications
        if updated_reminder.is_completed and not original_reminder.is_completed:
            Notification.objects.filter(
                user=self.request.user,
                notification_type="reminder",
                related_object_id=updated_reminder.id,
                related_object_type="reminder",
            ).update(status="archived")

        # If due date changed, update notifications
        elif original_reminder.due_date != updated_reminder.due_date:
            # Delete existing notifications
            Notification.objects.filter(
                user=self.request.user,
                notification_type="reminder",
                related_object_id=updated_reminder.id,
                related_object_type="reminder",
            ).delete()

            # Create new notification if needed
            now = timezone.now()
            if (
                updated_reminder.due_date <= now + timedelta(days=7)
                and not updated_reminder.is_completed
            ):
                self._create_reminder_notification(updated_reminder)

    def _create_reminder_notification(self, reminder):
        """Create a notification for a reminder"""
        time_diff = reminder.due_date - timezone.now()
        days_diff = time_diff.days

        if days_diff < 0:
            message = f"OVERDUE: {reminder.title}"
        elif days_diff == 0:
            message = f"DUE TODAY: {reminder.title}"
        else:
            message = f"Due in {days_diff} days: {reminder.title}"

        Notification.objects.create(
            user=reminder.user,
            title=f"Reminder: {reminder.title}",
            message=message,
            notification_type="reminder",
            related_object_id=reminder.id,
            related_object_type="reminder",
        )

    @action(detail=True, methods=["post"])
    def mark_completed(self, request, pk=None):
        reminder = self.get_object()
        reminder.is_completed = True
        reminder.save()

        # Archive related notifications
        Notification.objects.filter(
            user=self.request.user,
            notification_type="reminder",
            related_object_id=reminder.id,
            related_object_type="reminder",
        ).update(status="archived")

        return Response(
            {"status": "success", "message": "Reminder marked as completed"}
        )

    @action(detail=True, methods=["post"])
    def mark_active(self, request, pk=None):
        reminder = self.get_object()

        # Only toggle if currently completed
        if reminder.is_completed:
            reminder.is_completed = False
            reminder.save()

            # Create new notification if due soon
            now = timezone.now()
            if reminder.due_date <= now + timedelta(days=7):
                self._create_reminder_notification(reminder)

            return Response(
                {"status": "success", "message": "Reminder marked as active"}
            )
        else:
            return Response(
                {"status": "error", "message": "Reminder is already active"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=False, methods=["get"])
    def today(self, request):
        """Get reminders due today"""
        now = timezone.now()
        start_of_day = now.replace(hour=0, minute=0, second=0, microsecond=0)
        end_of_day = start_of_day + timedelta(days=1, microseconds=-1)

        reminders = Reminder.objects.filter(
            user=request.user,
            due_date__range=(start_of_day, end_of_day),
            is_completed=False,
        ).order_by("due_date")

        serializer = self.get_serializer(reminders, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def overdue(self, request):
        """Get overdue reminders"""
        now = timezone.now()

        reminders = Reminder.objects.filter(
            user=request.user, due_date__lt=now, is_completed=False
        ).order_by("due_date")

        serializer = self.get_serializer(reminders, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def snooze(self, request, pk=None):
        """Snooze a reminder by extending its due date"""
        reminder = self.get_object()

        # Get snooze duration in minutes from request, default to 30 minutes
        snooze_minutes = request.data.get("minutes", 30)

        # Update the due date
        reminder.due_date = reminder.due_date + timedelta(minutes=snooze_minutes)
        reminder.save()

        # Update notifications
        Notification.objects.filter(
            user=self.request.user,
            notification_type="reminder",
            related_object_id=reminder.id,
            related_object_type="reminder",
        ).delete()

        # Create new notification
        self._create_reminder_notification(reminder)

        return Response(
            {
                "status": "success",
                "message": f"Reminder snoozed for {snooze_minutes} minutes",
                "new_due_date": reminder.due_date,
            }
        )
