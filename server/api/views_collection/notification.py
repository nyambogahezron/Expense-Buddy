from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from app.permissions import AuthenticateUser
from ..models import Notification
from ..serializers import NotificationSerializer
from django.db.models import Q
from django.core.paginator import Paginator


class NotificationView(APIView):
    """
    API endpoint for managing user notifications
    """

    permission_classes = [AuthenticateUser]

    def get(self, request):
        """Get all notifications for the current user"""
        user = request.user

        # Get pagination parameters
        page = request.query_params.get("page", 1)
        limit = request.query_params.get("limit", 20)

        try:
            page = int(page)
            limit = min(int(limit), 100)  # Capping at 100 for performance
        except ValueError:
            page = 1
            limit = 20

        # Get filter parameters
        notification_type = request.query_params.get("type")
        notification_status = request.query_params.get("status", "unread")

        # Base queryset
        notifications = Notification.objects.filter(user=user)

        # Apply filters
        if notification_type:
            notifications = notifications.filter(notification_type=notification_type)

        if notification_status:
            notifications = notifications.filter(status=notification_status)

        # Count unread notifications for the header
        unread_count = Notification.objects.filter(user=user, status="unread").count()

        # Paginate results
        paginator = Paginator(notifications.order_by("-created_at"), limit)
        paginated_notifications = paginator.get_page(page)

        # Serialize the notifications
        serializer = NotificationSerializer(paginated_notifications, many=True)

        response_data = {
            "count": paginator.count,
            "total_pages": paginator.num_pages,
            "current_page": page,
            "has_next": paginated_notifications.has_next(),
            "has_previous": paginated_notifications.has_previous(),
            "unread_count": unread_count,
            "notifications": serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def put(self, request, notification_id=None):
        """Update a notification's status"""
        user = request.user

        # Check if we're updating a single notification or bulk updating
        if notification_id:
            try:
                notification = Notification.objects.get(id=notification_id, user=user)

                # Update status
                new_status = request.data.get("status")
                if new_status and new_status in ("read", "unread", "archived"):
                    notification.status = new_status
                    notification.save()

                    serializer = NotificationSerializer(notification)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            "error": 'Invalid status value. Must be "read", "unread", or "archived".'
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            except Notification.DoesNotExist:
                return Response(
                    {
                        "error": "Notification not found or you do not have permission to update it."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            # Bulk update
            action = request.data.get("action")
            notification_ids = request.data.get("notification_ids", [])

            if not action or not notification_ids:
                return Response(
                    {"error": 'Both "action" and "notification_ids" are required.'},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Validate action type
            if action not in ("mark_read", "mark_unread", "archive"):
                return Response(
                    {
                        "error": 'Invalid action. Must be "mark_read", "mark_unread", or "archive".'
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Map action to status
            status_mapping = {
                "mark_read": "read",
                "mark_unread": "unread",
                "archive": "archived",
            }

            # Update all notifications that belong to the user
            updated_count = Notification.objects.filter(
                id__in=notification_ids, user=user
            ).update(status=status_mapping[action])

            return Response(
                {
                    "message": f"Successfully updated {updated_count} notifications.",
                    "updated_count": updated_count,
                },
                status=status.HTTP_200_OK,
            )

    def delete(self, request, notification_id=None):
        """Delete a notification or bulk delete notifications"""
        user = request.user

        if notification_id:
            # Delete single notification
            try:
                notification = Notification.objects.get(id=notification_id, user=user)
                notification.delete()
                return Response(
                    {"message": "Notification successfully deleted."},
                    status=status.HTTP_204_NO_CONTENT,
                )
            except Notification.DoesNotExist:
                return Response(
                    {
                        "error": "Notification not found or you do not have permission to delete it."
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        else:
            # Bulk delete
            notification_ids = request.data.get("notification_ids", [])

            if not notification_ids:
                return Response(
                    {
                        "error": 'The "notification_ids" field is required for bulk deletion.'
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Delete all notifications that belong to the user
            deleted_count, _ = Notification.objects.filter(
                id__in=notification_ids, user=user
            ).delete()

            return Response(
                {
                    "message": f"Successfully deleted {deleted_count} notifications.",
                    "deleted_count": deleted_count,
                },
                status=status.HTTP_200_OK,
            )


class NotificationCountView(APIView):
    """
    API endpoint to get just the notification counts
    """

    permission_classes = [AuthenticateUser]

    def get(self, request):
        user = request.user

        # Count notifications by status
        unread_count = Notification.objects.filter(user=user, status="unread").count()
        total_count = Notification.objects.filter(user=user).count()

        # Get counts by type for unread notifications
        by_type = {}
        notification_types = Notification.NOTIFICATION_TYPES

        for type_code, type_name in notification_types:
            by_type[type_code] = Notification.objects.filter(
                user=user, status="unread", notification_type=type_code
            ).count()

        return Response(
            {
                "unread_count": unread_count,
                "total_count": total_count,
                "by_type": by_type,
            },
            status=status.HTTP_200_OK,
        )
