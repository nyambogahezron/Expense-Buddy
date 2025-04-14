import time
import json
from django.utils import timezone
from django.db import connection
from django.conf import settings


class APIRequestLogMiddleware:
    """
    Middleware to log API requests, response status, and performance metrics.
    This helps in monitoring the app's performance and tracking endpoint usage.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith("/api/"):
            # Only track API requests
            return self.get_response(request)

        # Record request start time
        start_time = time.time()

        # Get the user if authenticated
        user_id = None
        if hasattr(request, "user") and request.user.is_authenticated:
            user_id = request.user.id

        # Process the request
        response = self.get_response(request)

        # Calculate request duration
        duration = time.time() - start_time

        # Get query count and time
        query_count = len(connection.queries)
        query_time = sum(float(q.get("time", 0)) for q in connection.queries)

        # Log the request to our RequestLog model
        from api.models import RequestLog

        # Extract relevant data
        path = request.path
        method = request.method
        status_code = response.status_code

        # Try to extract client IP
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")

        # Create request log
        RequestLog.objects.create(
            path=path,
            method=method,
            status_code=status_code,
            user_id=user_id,
            ip_address=ip,
            duration=duration,
            query_count=query_count,
            query_time=query_time,
            date=timezone.now(),
        )

        return response
