from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.utils import timezone
from django.db.models import Count, Sum, Avg, F, Q, Max
from django.db.models.functions import TruncDate, TruncHour, TruncDay, TruncMonth
from dateutil.relativedelta import relativedelta
from django.core.mail import send_mass_mail, EmailMessage
from django.conf import settings
import datetime
import json
import csv
from io import StringIO

from app.permissions import AuthenticateUser
from ..models import Transaction, Category, RequestLog, AdminSettings, AdminBulkEmail
from apiAuth.models import User
from ..serializers import (
    UserAdminSerializer,
    RequestLogSerializer,
    AdminSettingsSerializer,
    AdminBulkEmailSerializer,
)


class IsAdminUser(object):
    """
    Permission to only allow admin users to access this view.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class AdminDashboardView(APIView):
    """
    Main admin dashboard statistics endpoint.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        # Calculate statistics
        total_users = User.objects.count()
        active_users = User.objects.filter(is_active=True).count()
        superusers = User.objects.filter(is_superuser=True).count()

        # New users in last 30 days
        thirty_days_ago = timezone.now() - timezone.timedelta(days=30)
        new_users_month = User.objects.filter(date_joined__gte=thirty_days_ago).count()

        # Transactions statistics
        total_transactions = Transaction.objects.count()
        total_income = (
            Transaction.objects.filter(type="income").aggregate(Sum("amount"))[
                "amount__sum"
            ]
            or 0
        )
        total_expense = (
            Transaction.objects.filter(type="expense").aggregate(Sum("amount"))[
                "amount__sum"
            ]
            or 0
        )

        # Request statistics
        total_requests = RequestLog.objects.count()
        avg_request_time = (
            RequestLog.objects.aggregate(Avg("duration"))["duration__avg"] or 0
        )

        # Most used endpoints
        top_endpoints = (
            RequestLog.objects.values("path")
            .annotate(count=Count("id"))
            .order_by("-count")[:5]
        )

        # Slowest endpoints
        slowest_endpoints = (
            RequestLog.objects.values("path", "method")
            .annotate(avg_duration=Avg("duration"))
            .order_by("-avg_duration")[:5]
        )

        # Recent errors
        recent_errors = RequestLog.objects.filter(status_code__gte=400).order_by(
            "-date"
        )[:5]

        # App health
        error_rate = (
            RequestLog.objects.filter(status_code__gte=500).count() / total_requests
            if total_requests > 0
            else 0
        )

        return Response(
            {
                "user_stats": {
                    "total_users": total_users,
                    "active_users": active_users,
                    "superusers": superusers,
                    "new_users_month": new_users_month,
                },
                "transaction_stats": {
                    "total_transactions": total_transactions,
                    "total_income": total_income,
                    "total_expense": total_expense,
                    "net": total_income - total_expense,
                },
                "request_stats": {
                    "total_requests": total_requests,
                    "avg_request_time": avg_request_time,
                    "error_rate": error_rate,
                },
                "top_endpoints": top_endpoints,
                "slowest_endpoints": slowest_endpoints,
                "recent_errors": RequestLogSerializer(recent_errors, many=True).data,
                "app_health": {
                    "status": (
                        "Healthy"
                        if error_rate < 0.05
                        else "Degraded" if error_rate < 0.1 else "Unhealthy"
                    ),
                    "error_rate": error_rate,
                    "avg_response_time": avg_request_time,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminUserListView(APIView):
    """
    List and filter users for admin purposes.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        users = User.objects.all()

        # Filtering options
        account_status = request.query_params.get("account_status")
        is_active = request.query_params.get("is_active")
        is_verified = request.query_params.get("is_verified")
        search = request.query_params.get("search")

        if account_status:
            users = users.filter(account_status=account_status)

        if is_active is not None:
            is_active = is_active.lower() == "true"
            users = users.filter(is_active=is_active)

        if is_verified is not None:
            is_verified = is_verified.lower() == "true"
            users = users.filter(is_email_verified=is_verified)

        if search:
            users = users.filter(
                Q(username__icontains=search)
                | Q(email__icontains=search)
                | Q(name__icontains=search)
            )

        # Pagination
        page_size = int(request.query_params.get("page_size", 20))
        page = int(request.query_params.get("page", 1))

        start = (page - 1) * page_size
        end = page * page_size

        total_users = users.count()
        users = users[start:end]

        serializer = UserAdminSerializer(users, many=True)

        return Response(
            {
                "users": serializer.data,
                "total": total_users,
                "page": page,
                "page_size": page_size,
                "pages": (total_users + page_size - 1) // page_size,
            },
            status=status.HTTP_200_OK,
        )


class AdminUserDetailView(APIView):
    """
    Get detailed information about a specific user for admins.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, user_id, *args, **kwargs):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Get user serializer data
        user_data = UserAdminSerializer(user).data

        # Get user's transactions
        transactions = Transaction.objects.filter(user=user)
        transaction_count = transactions.count()

        # Transaction summary
        income = (
            transactions.filter(type="income").aggregate(Sum("amount"))["amount__sum"]
            or 0
        )
        expense = (
            transactions.filter(type="expense").aggregate(Sum("amount"))["amount__sum"]
            or 0
        )

        # Recent activity
        recent_transactions = transactions.order_by("-date")[:5]
        recent_logins = RequestLog.objects.filter(
            user_id=user.id, path__contains="/api/v1/auth/login/"
        ).order_by("-date")[:5]

        # Combine the data
        response_data = {
            "user": user_data,
            "transaction_stats": {
                "count": transaction_count,
                "total_income": income,
                "total_expense": expense,
                "net": income - expense,
            },
            "recent_activity": {
                "logins": [
                    {"date": log.date, "ip_address": log.ip_address}
                    for log in recent_logins
                ],
                "transactions": [
                    {
                        "id": t.id,
                        "title": t.title,
                        "amount": t.amount,
                        "type": t.type,
                        "date": t.date,
                    }
                    for t in recent_transactions
                ],
            },
        }

        return Response(response_data, status=status.HTTP_200_OK)

    def put(self, request, user_id, *args, **kwargs):
        """
        Update user details - admin can update more fields than the user themselves
        """
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        # Fields that admin can update
        allowed_fields = [
            "name",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "account_status",
            "is_email_verified",
            "loginAttempts",
        ]

        # Update allowed fields
        for field in allowed_fields:
            if field in request.data:
                setattr(user, field, request.data[field])

        user.save()

        return Response(UserAdminSerializer(user).data, status=status.HTTP_200_OK)


class AdminUserBulkEmailView(APIView):
    """
    Send emails to multiple users.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def post(self, request, *args, **kwargs):
        subject = request.data.get("subject")
        message = request.data.get("message")

        if not subject or not message:
            return Response(
                {"error": "Subject and message are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get users based on filters
        users = User.objects.all()

        # Apply filters if provided
        filters = request.data.get("filters", {})

        if filters:
            if "account_status" in filters:
                users = users.filter(account_status=filters["account_status"])

            if "is_active" in filters:
                users = users.filter(is_active=filters["is_active"])

            if "is_verified" in filters:
                users = users.filter(is_email_verified=filters["is_verified"])

            if "joined_after" in filters:
                users = users.filter(date_joined__gte=filters["joined_after"])

            if "joined_before" in filters:
                users = users.filter(date_joined__lte=filters["joined_before"])

        # Get email addresses
        emails = users.values_list("email", flat=True)
        recipient_count = len(emails)

        if recipient_count == 0:
            return Response(
                {"error": "No users match the selected filters"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get admin settings for email footer
        try:
            admin_settings = AdminSettings.objects.first()
            if admin_settings and admin_settings.email_footer:
                message += "\n\n" + admin_settings.email_footer
        except:
            pass

        # Prepare email for sending
        from_email = settings.DEFAULT_FROM_EMAIL
        email_messages = []

        for email in emails:
            email_messages.append((subject, message, from_email, [email]))

        # Try to send emails
        try:
            send_mass_mail(email_messages, fail_silently=False)

            # Log this bulk email
            bulk_email = AdminBulkEmail.objects.create(
                subject=subject,
                message=message,
                recipient_count=recipient_count,
                sent_by=request.user,
                user_filter=filters,
            )

            return Response(
                {
                    "message": f"Successfully sent emails to {recipient_count} users",
                    "email": AdminBulkEmailSerializer(bulk_email).data,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": f"Failed to send emails: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class AdminPerformanceView(APIView):
    """
    Request performance metrics for admins.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        # Get date range parameters
        days = request.query_params.get("days", 7)
        try:
            days = int(days)
        except ValueError:
            days = 7

        start_date = timezone.now() - timezone.timedelta(days=days)

        # Get logs for the period
        logs = RequestLog.objects.filter(date__gte=start_date)

        # Daily request volume
        daily_volume = (
            logs.annotate(day=TruncDay("date"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        # Hourly distribution
        hourly_distribution = (
            logs.annotate(hour=TruncHour("date"))
            .values("hour")
            .annotate(count=Count("id"))
            .order_by("hour")
        )

        # Average response time trend
        response_time_trend = (
            logs.annotate(day=TruncDay("date"))
            .values("day")
            .annotate(avg_time=Avg("duration"))
            .order_by("day")
        )

        # Top slowest endpoints
        slowest_endpoints = (
            logs.values("path")
            .annotate(avg_time=Avg("duration"), count=Count("id"))
            .filter(count__gte=5)
            .order_by("-avg_time")[:10]
        )

        # Most used endpoints
        most_used_endpoints = (
            logs.values("path").annotate(count=Count("id")).order_by("-count")[:10]
        )

        # Error rates by endpoint
        error_rates = (
            logs.values("path")
            .annotate(
                total=Count("id"),
                errors=Count("id", filter=Q(status_code__gte=400)),
                error_rate=F("errors") * 100.0 / F("total"),
            )
            .filter(total__gte=5)
            .order_by("-error_rate")[:10]
        )

        # Query performance
        query_performance = (
            logs.values("path")
            .annotate(avg_queries=Avg("query_count"), avg_query_time=Avg("query_time"))
            .filter(avg_queries__gt=0)
            .order_by("-avg_query_time")[:10]
        )

        return Response(
            {
                "period": {
                    "days": days,
                    "start_date": start_date,
                    "end_date": timezone.now(),
                },
                "request_volume": {
                    "total": logs.count(),
                    "daily": list(daily_volume),
                    "hourly": list(hourly_distribution),
                },
                "performance": {
                    "avg_response_time": logs.aggregate(Avg("duration"))[
                        "duration__avg"
                    ]
                    or 0,
                    "response_time_trend": list(response_time_trend),
                    "slowest_endpoints": list(slowest_endpoints),
                    "most_used_endpoints": list(most_used_endpoints),
                    "error_rates": list(error_rates),
                    "query_performance": list(query_performance),
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminUserActivityView(APIView):
    """
    Track user activity for admins.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        # Get date range parameters
        days = request.query_params.get("days", 30)
        try:
            days = int(days)
        except ValueError:
            days = 30

        start_date = timezone.now() - timezone.timedelta(days=days)

        # Active users by day
        active_users_by_day = (
            RequestLog.objects.filter(date__gte=start_date, user_id__isnull=False)
            .annotate(day=TruncDay("date"))
            .values("day")
            .annotate(unique_users=Count("user_id", distinct=True))
            .order_by("day")
        )

        # New user signups
        new_signups = (
            User.objects.filter(date_joined__gte=start_date)
            .annotate(day=TruncDay("date_joined"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        # Most active users
        most_active_users = (
            RequestLog.objects.filter(date__gte=start_date, user_id__isnull=False)
            .values("user_id")
            .annotate(request_count=Count("id"))
            .order_by("-request_count")[:10]
        )

        # Enrich with user details
        active_users = []
        for entry in most_active_users:
            try:
                user = User.objects.get(id=entry["user_id"])
                active_users.append(
                    {
                        "user_id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "request_count": entry["request_count"],
                    }
                )
            except User.DoesNotExist:
                pass

        # User retention
        retention_data = []
        for month_offset in range(6, 0, -1):
            month_start = timezone.now() - relativedelta(months=month_offset)
            month_end = month_start + relativedelta(months=1)

            new_users = User.objects.filter(
                date_joined__gte=month_start, date_joined__lt=month_end
            ).count()

            active_next_month = (
                RequestLog.objects.filter(
                    user_id__in=User.objects.filter(
                        date_joined__gte=month_start, date_joined__lt=month_end
                    ).values_list("id", flat=True),
                    date__gte=month_end,
                    date__lt=month_end + relativedelta(months=1),
                )
                .values("user_id")
                .distinct()
                .count()
            )

            retention = active_next_month / new_users if new_users > 0 else 0

            retention_data.append(
                {
                    "month": month_start.strftime("%Y-%m"),
                    "new_users": new_users,
                    "retained_users": active_next_month,
                    "retention_rate": retention,
                }
            )

        return Response(
            {
                "period": {
                    "days": days,
                    "start_date": start_date,
                    "end_date": timezone.now(),
                },
                "daily_active_users": list(active_users_by_day),
                "new_signups": list(new_signups),
                "most_active_users": active_users,
                "retention": retention_data,
                "summary": {
                    "total_active_users": RequestLog.objects.filter(
                        date__gte=start_date, user_id__isnull=False
                    )
                    .values("user_id")
                    .distinct()
                    .count(),
                    "new_users": User.objects.filter(
                        date_joined__gte=start_date
                    ).count(),
                    "avg_daily_active": (
                        sum(day["unique_users"] for day in active_users_by_day)
                        / len(active_users_by_day)
                        if active_users_by_day
                        else 0
                    ),
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminSettingsView(APIView):
    """
    Manage admin analytics settings.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        # Get or create settings
        settings, created = AdminSettings.objects.get_or_create(
            id=1,
            defaults={
                "log_retention_days": 30,
                "slow_request_threshold": 1.0,
                "analytics_enabled": True,
                "email_footer": "This is an automated message from ExpenseBuddy. Please do not reply to this email.",
            },
        )

        serializer = AdminSettingsSerializer(settings)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        # Get or create settings
        settings, created = AdminSettings.objects.get_or_create(
            id=1,
            defaults={
                "log_retention_days": 30,
                "slow_request_threshold": 1.0,
                "analytics_enabled": True,
                "email_footer": "This is an automated message from ExpenseBuddy. Please do not reply to this email.",
            },
        )

        # Update settings
        serializer = AdminSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminExportDataView(APIView):
    """
    Export data in CSV format.
    """

    permission_classes = [AuthenticateUser, IsAdminUser]

    def get(self, request, *args, **kwargs):
        export_type = request.query_params.get("type", "users")

        if export_type == "users":
            return self._export_users(request)
        elif export_type == "transactions":
            return self._export_transactions(request)
        elif export_type == "requests":
            return self._export_requests(request)
        else:
            return Response(
                {
                    "error": "Invalid export type. Choose from: users, transactions, requests"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def _export_users(self, request):
        # Build CSV data for users
        csv_buffer = StringIO()
        writer = csv.writer(csv_buffer)

        # Headers
        writer.writerow(
            [
                "ID",
                "Username",
                "Email",
                "Name",
                "Date Joined",
                "Last Login",
                "Active",
                "Superuser",
                "Account Status",
                "Email Verified",
            ]
        )

        # Data
        users = User.objects.all()
        for user in users:
            writer.writerow(
                [
                    user.id,
                    user.username,
                    user.email,
                    user.name,
                    user.date_joined,
                    user.last_login,
                    "Yes" if user.is_active else "No",
                    "Yes" if user.is_superuser else "No",
                    user.account_status,
                    "Yes" if user.is_email_verified else "No",
                ]
            )

        # Create response
        response = Response(csv_buffer.getvalue(), status=status.HTTP_200_OK)
        response["Content-Type"] = "text/csv"
        response["Content-Disposition"] = (
            f'attachment; filename="users_{timezone.now().strftime("%Y%m%d")}.csv"'
        )

        return response

    def _export_transactions(self, request):
        # Build CSV data for transactions
        csv_buffer = StringIO()
        writer = csv.writer(csv_buffer)

        # Headers
        writer.writerow(
            [
                "ID",
                "User ID",
                "Username",
                "Title",
                "Amount",
                "Type",
                "Category",
                "Date",
                "Description",
            ]
        )

        # Data
        transactions = Transaction.objects.all().select_related("user", "category")
        for trx in transactions:
            writer.writerow(
                [
                    trx.id,
                    trx.user.id,
                    trx.user.username,
                    trx.title,
                    trx.amount,
                    trx.type,
                    trx.category.name,
                    trx.date,
                    trx.description,
                ]
            )

        # Create response
        response = Response(csv_buffer.getvalue(), status=status.HTTP_200_OK)
        response["Content-Type"] = "text/csv"
        response["Content-Disposition"] = (
            f'attachment; filename="transactions_{timezone.now().strftime("%Y%m%d")}.csv"'
        )

        return response

    def _export_requests(self, request):
        # Build CSV data for request logs
        csv_buffer = StringIO()
        writer = csv.writer(csv_buffer)

        # Headers
        writer.writerow(
            [
                "ID",
                "Path",
                "Method",
                "Status",
                "User ID",
                "IP Address",
                "Duration",
                "Query Count",
                "Query Time",
                "Date",
            ]
        )

        # Get date range
        days = request.query_params.get("days", 30)
        try:
            days = int(days)
        except ValueError:
            days = 30

        start_date = timezone.now() - timezone.timedelta(days=days)

        # Data
        logs = RequestLog.objects.filter(date__gte=start_date)
        for log in logs:
            writer.writerow(
                [
                    log.id,
                    log.path,
                    log.method,
                    log.status_code,
                    log.user_id,
                    log.ip_address,
                    log.duration,
                    log.query_count,
                    log.query_time,
                    log.date,
                ]
            )

        # Create response
        response = Response(csv_buffer.getvalue(), status=status.HTTP_200_OK)
        response["Content-Type"] = "text/csv"
        response["Content-Disposition"] = (
            f'attachment; filename="request_logs_{timezone.now().strftime("%Y%m%d")}.csv"'
        )

        return response
