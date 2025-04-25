from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from ..models import PaymentSchedule, ScheduledPaymentHistory, Transaction, Notification
from ..serializers import (
    PaymentScheduleSerializer,
    ScheduledPaymentHistorySerializer,
    TransactionSerializer,
)
from app.permissions import AuthenticateUser
from django.db.models import Sum, F, Q
from django.shortcuts import get_object_or_404
from decimal import Decimal
from datetime import datetime, timedelta
import calendar
from django.utils import timezone


class PaymentScheduleViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling payment schedules
    """

    serializer_class = PaymentScheduleSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user
        queryset = PaymentSchedule.objects.filter(user=user)

        # Filter by active status
        status_filter = self.request.query_params.get("status")
        if status_filter:
            if status_filter.lower() == "active":
                queryset = queryset.filter(is_active=True)
            elif status_filter.lower() == "inactive":
                queryset = queryset.filter(is_active=False)

        # Filter by category
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)

        # Filter by payment date range
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date:
            queryset = queryset.filter(next_payment_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(next_payment_date__lte=end_date)

        # Search by title or description
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        schedule = serializer.save(user=self.request.user)
        # Create initial payment history entries when a schedule is created
        self._generate_upcoming_payments(schedule)

    def perform_update(self, serializer):
        # Store the old next_payment_date before saving
        if self.get_object().frequency != serializer.validated_data.get(
            "frequency", self.get_object().frequency
        ):
            # If frequency changed, regenerate payment history
            schedule = serializer.save()
            self._regenerate_payment_history(schedule)
        else:
            # Otherwise just save normally
            serializer.save()

    def _generate_upcoming_payments(self, payment_schedule, count=5):
        """Generate the next payment dates based on frequency"""

        next_date = payment_schedule.next_payment_date

        for i in range(count):
            # Create the payment history entry
            ScheduledPaymentHistory.objects.create(
                payment_schedule=payment_schedule,
                payment_date=next_date,
                amount=payment_schedule.amount,
                is_paid=False,
            )

            # Calculate the next payment date based on frequency
            if payment_schedule.frequency == "one_time":
                break  # Only one payment for one-time schedules
            elif payment_schedule.frequency == "daily":
                next_date = next_date + timedelta(days=1)
            elif payment_schedule.frequency == "weekly":
                next_date = next_date + timedelta(weeks=1)
            elif payment_schedule.frequency == "biweekly":
                next_date = next_date + timedelta(weeks=2)
            elif payment_schedule.frequency == "monthly":
                month = next_date.month + 1
                year = next_date.year + (month > 12)
                month = month % 12 or 12  # Convert month 0 to 12
                day = min(next_date.day, calendar.monthrange(year, month)[1])
                next_date = next_date.replace(year=year, month=month, day=day)
            elif payment_schedule.frequency == "quarterly":
                month = next_date.month + 3
                year = next_date.year + (month > 12)
                month = ((month - 1) % 12) + 1
                day = min(next_date.day, calendar.monthrange(year, month)[1])
                next_date = next_date.replace(year=year, month=month, day=day)
            elif payment_schedule.frequency == "biannual":
                month = next_date.month + 6
                year = next_date.year + (month > 12)
                month = ((month - 1) % 12) + 1
                day = min(next_date.day, calendar.monthrange(year, month)[1])
                next_date = next_date.replace(year=year, month=month, day=day)
            elif payment_schedule.frequency == "annual":
                next_date = next_date.replace(year=next_date.year + 1)

            # Check if we've reached or passed the end date
            if payment_schedule.end_date and next_date > payment_schedule.end_date:
                break

    def _regenerate_payment_history(self, payment_schedule):
        """Regenerate payment history after a frequency change"""
        # Delete future unpaid payments
        now = timezone.now().date()
        ScheduledPaymentHistory.objects.filter(
            payment_schedule=payment_schedule, payment_date__gt=now, is_paid=False
        ).delete()

        # Generate new payment schedule
        self._generate_upcoming_payments(payment_schedule)

    @action(detail=True, methods=["post"])
    def record_payment(self, request, pk=None):
        payment_schedule = self.get_object()
        payment_history_id = request.data.get("payment_history_id")
        amount = request.data.get("amount", payment_schedule.amount)
        notes = request.data.get("notes", "")

        # Get the payment history entry
        try:
            payment_history = ScheduledPaymentHistory.objects.get(
                id=payment_history_id, payment_schedule=payment_schedule
            )
        except ScheduledPaymentHistory.DoesNotExist:
            return Response(
                {"status": "error", "message": "Payment history entry not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Create a transaction for this payment
        transaction_data = {
            "title": f"Payment: {payment_schedule.title}",
            "description": (
                notes if notes else f"Scheduled payment for {payment_schedule.title}"
            ),
            "amount": Decimal(amount),
            "transaction_fee": Decimal("0.00"),
            "category": (
                payment_schedule.category.id if payment_schedule.category else None
            ),
            "type": "expense",
            "color": "#FF5733",  # Default color
        }

        transaction_serializer = TransactionSerializer(
            data=transaction_data, context={"request": request}
        )

        if transaction_serializer.is_valid():
            # Save the transaction
            transaction = transaction_serializer.save()

            # Update the payment history
            payment_history.is_paid = True
            payment_history.transaction = transaction
            payment_history.amount = Decimal(amount)
            payment_history.notes = notes
            payment_history.save()

            # Update next payment date for the schedule if this was the next payment
            if payment_history.payment_date == payment_schedule.next_payment_date:
                next_payment = (
                    ScheduledPaymentHistory.objects.filter(
                        payment_schedule=payment_schedule, is_paid=False
                    )
                    .order_by("payment_date")
                    .first()
                )

                if next_payment:
                    payment_schedule.next_payment_date = next_payment.payment_date
                    payment_schedule.save()

            # Add a new future payment if needed to maintain 5 upcoming payments
            unpaid_count = payment_schedule.payment_history.filter(
                is_paid=False
            ).count()
            if unpaid_count < 3 and payment_schedule.frequency != "one_time":
                self._generate_upcoming_payments(payment_schedule, count=1)

            return Response(
                {
                    "status": "success",
                    "message": "Payment recorded successfully",
                    "transaction_id": transaction.id,
                }
            )
        else:
            return Response(
                {
                    "status": "error",
                    "message": "Invalid transaction data",
                    "errors": transaction_serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    @action(detail=True, methods=["post"])
    def generate_upcoming_payments(self, request, pk=None):
        payment_schedule = self.get_object()
        count = request.data.get("count", 5)

        self._generate_upcoming_payments(payment_schedule, count=count)

        return Response(
            {"status": "success", "message": f"Generated {count} upcoming payments"}
        )


class PaymentHistoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling payment history entries
    """

    serializer_class = ScheduledPaymentHistorySerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user

        # Filter by payment schedule if provided
        schedule_id = self.request.query_params.get("payment_schedule")
        if schedule_id:
            return ScheduledPaymentHistory.objects.filter(
                payment_schedule_id=schedule_id, payment_schedule__user=user
            )

        # Filter by payment status
        paid_filter = self.request.query_params.get("paid")
        queryset = ScheduledPaymentHistory.objects.filter(payment_schedule__user=user)

        if paid_filter is not None:
            is_paid = paid_filter.lower() == "true"
            queryset = queryset.filter(is_paid=is_paid)

        # Filter by date range
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")

        if start_date:
            queryset = queryset.filter(payment_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(payment_date__lte=end_date)

        return queryset.order_by("payment_date")

    def perform_create(self, serializer):
        # Verify the payment schedule belongs to the current user
        payment_schedule_id = self.request.data.get("payment_schedule")
        payment_schedule = get_object_or_404(
            PaymentSchedule, id=payment_schedule_id, user=self.request.user
        )
        serializer.save()
