from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from app.permissions import AuthenticateUser
from ..models import ReportPreference
from ..serializers import ReportPreferenceSerializer
from ..reports import send_single_report


class ReportPreferenceView(APIView):
    """
    Manage user preferences for periodic financial reports.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        """Get user's report preferences"""
        try:
            # Try to get existing preferences
            report_pref = ReportPreference.objects.get(user=request.user)
            serializer = ReportPreferenceSerializer(report_pref)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ReportPreference.DoesNotExist:
            # Return default preferences
            return Response(
                {
                    "message": "No report preferences set. Using defaults.",
                    "defaults": {
                        "frequency": 1,
                        "frequency_display": "Monthly",
                        "is_enabled": False,
                        "include_insights": True,
                        "include_category_distribution": True,
                        "include_spending_trends": True,
                        "include_monthly_summary": True,
                    },
                },
                status=status.HTTP_200_OK,
            )

    def post(self, request, *args, **kwargs):
        """Create or update report preferences"""
        try:
            # Try to get existing preferences
            report_pref = ReportPreference.objects.get(user=request.user)
            serializer = ReportPreferenceSerializer(
                report_pref, data=request.data, partial=True
            )
        except ReportPreference.DoesNotExist:
            # Create new preferences
            serializer = ReportPreferenceSerializer(data=request.data)

        if serializer.is_valid():
            # Save preferences
            preferences = serializer.save(user=request.user)

            # If reports are enabled, set next report date if not already set
            if preferences.is_enabled and not preferences.next_report_date:
                # Calculate next report date based on frequency
                today = datetime.now()
                month = today.month + preferences.frequency
                year = today.year

                while month > 12:
                    month -= 12
                    year += 1

                preferences.next_report_date = datetime(
                    year, month, 1
                )  # First day of the month
                preferences.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GenerateReportView(APIView):
    """
    Generate and send a report on demand.
    """

    permission_classes = [AuthenticateUser]

    def post(self, request, *args, **kwargs):
        """Generate and send a report immediately"""
        frequency = request.data.get("frequency", None)
        if frequency:
            try:
                frequency = int(frequency)
                if frequency not in [1, 2, 3, 4, 6, 12]:
                    return Response(
                        {
                            "error": "Invalid frequency. Must be 1, 2, 3, 4, 6, or 12 months."
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except ValueError:
                return Response(
                    {"error": "Frequency must be a number."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        try:
            # Send the report
            send_single_report(request.user, frequency)

            return Response(
                {
                    "message": "Report generated and sent successfully!",
                    "email": request.user.email,
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": "Failed to generate or send report.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
