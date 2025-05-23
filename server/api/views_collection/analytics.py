from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from app.permissions import AuthenticateUser
from ..models import Transaction, Category, Budget
from django.db.models import Sum, Count, Avg, F, Q
from django.db.models.functions import (
    TruncMonth,
    TruncWeek,
    TruncDay,
    ExtractMonth,
    ExtractYear,
)
from datetime import datetime, timedelta
import calendar
from collections import defaultdict
from django.utils import timezone


class TransactionAnalyticsView(APIView):
    """
    Provides analytics endpoints for user transactions.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        """
        Default endpoint providing a summary of transaction analytics options
        """
        analytics_endpoints = {
            "available_endpoints": [
                {
                    "name": "Monthly Summary",
                    "endpoint": "/api/v1/analytics/monthly-summary/",
                    "description": "Summary of income and expenses by month",
                },
                {
                    "name": "Category Distribution",
                    "endpoint": "/api/v1/analytics/category-distribution/",
                    "description": "Distribution of expenses across categories",
                },
                {
                    "name": "Spending Trends",
                    "endpoint": "/api/v1/analytics/spending-trends/",
                    "description": "Monthly spending trends over time",
                },
                {
                    "name": "Budget Analysis",
                    "endpoint": "/api/v1/analytics/budget-analysis/",
                    "description": "Analysis of spending against budget goals",
                },
                {
                    "name": "Transaction Insights",
                    "endpoint": "/api/v1/analytics/transaction-insights/",
                    "description": "AI-powered insights based on transaction patterns",
                },
            ]
        }
        return Response(analytics_endpoints, status=status.HTTP_200_OK)


class MonthlySummaryView(APIView):
    """
    Provides monthly summary of transactions.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = request.user

        # Get query parameters
        year = request.query_params.get("year", datetime.now().year)
        try:
            year = int(year)
        except ValueError:
            return Response(
                {"error": "Invalid year format"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Get all transactions for the user for the specified year
        transactions = Transaction.objects.filter(user=user, date__year=year)

        # Prepare monthly summary
        monthly_summary = []

        for month in range(1, 13):
            month_name = calendar.month_name[month]

            # Get income and expenses for the month
            income = (
                transactions.filter(date__month=month, type="income").aggregate(
                    total=Sum("amount")
                )["total"]
                or 0
            )

            expenses = (
                transactions.filter(date__month=month, type="expense").aggregate(
                    total=Sum("amount")
                )["total"]
                or 0
            )

            # Calculate net
            net = income - expenses

            monthly_summary.append(
                {
                    "month": month_name,
                    "income": income,
                    "expenses": expenses,
                    "net": net,
                }
            )

        return Response(
            {
                "year": year,
                "monthly_summary": monthly_summary,
                "annual_summary": {
                    "total_income": sum(month["income"] for month in monthly_summary),
                    "total_expenses": sum(
                        month["expenses"] for month in monthly_summary
                    ),
                    "net_savings": sum(month["net"] for month in monthly_summary),
                },
            },
            status=status.HTTP_200_OK,
        )


class CategoryDistributionView(APIView):
    """
    Provides distribution of expenses across categories.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = request.user

        # Get query parameters
        period = request.query_params.get("period", "month")  # 'month', 'year', 'all'

        # Calculate date range based on period
        today = datetime.now()
        if period == "month":
            start_date = datetime(today.year, today.month, 1)
        elif period == "year":
            start_date = datetime(today.year, 1, 1)
        else:  # 'all'
            start_date = datetime(1900, 1, 1)  # A very old date to get all transactions

        # Get all expense transactions for the user in the date range
        transactions = Transaction.objects.filter(
            user=user, type="expense", date__gte=start_date
        )

        # Group by category and calculate totals
        category_totals = (
            transactions.values("category")
            .annotate(total=Sum("amount"), count=Count("id"))
            .order_by("-total")
        )

        # Get category details
        category_distribution = []
        for cat in category_totals:
            try:
                category = Category.objects.get(id=cat["category"])
                category_distribution.append(
                    {
                        "category_id": category.id,
                        "category_name": category.name,
                        "category_icon": category.icon,
                        "category_color": category.color,
                        "total_amount": cat["total"],
                        "transaction_count": cat["count"],
                    }
                )
            except Category.DoesNotExist:
                pass

        # Calculate total expenses to compute percentages
        total_expenses = sum(cat["total_amount"] for cat in category_distribution)

        # Add percentage to each category
        for cat in category_distribution:
            if total_expenses > 0:
                cat["percentage"] = round(
                    (cat["total_amount"] / total_expenses) * 100, 2
                )
            else:
                cat["percentage"] = 0

        return Response(
            {
                "period": period,
                "total_expenses": total_expenses,
                "category_distribution": category_distribution,
            },
            status=status.HTTP_200_OK,
        )


class SpendingTrendsView(APIView):
    """
    Provides spending trends over time.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = request.user

        # Get query parameters
        period = request.query_params.get(
            "period", "yearly"
        )  # 'yearly', 'monthly', 'weekly', 'daily'
        months = request.query_params.get("months", 12)  # Number of months to look back

        try:
            months = int(months)
            if months <= 0:
                months = 12
        except ValueError:
            months = 12

        # Calculate start date based on months
        end_date = datetime.now()
        start_date = end_date - timedelta(days=30 * months)

        # Get all expense transactions for the user in the date range
        transactions = Transaction.objects.filter(
            user=user, date__gte=start_date, date__lte=end_date
        )

        # Group transactions based on period
        if period == "yearly":
            trends_data = (
                transactions.annotate(period=ExtractYear("date"))
                .values("period", "type")
                .annotate(total=Sum("amount"))
                .order_by("period")
            )
        elif period == "monthly":
            trends_data = (
                transactions.annotate(period=TruncMonth("date"))
                .values("period", "type")
                .annotate(total=Sum("amount"))
                .order_by("period")
            )
        elif period == "weekly":
            trends_data = (
                transactions.annotate(period=TruncWeek("date"))
                .values("period", "type")
                .annotate(total=Sum("amount"))
                .order_by("period")
            )
        else:  # 'daily'
            trends_data = (
                transactions.annotate(period=TruncDay("date"))
                .values("period", "type")
                .annotate(total=Sum("amount"))
                .order_by("period")
            )

        # Organize data for response
        trend_points = []
        for point in trends_data:
            trend_points.append(
                {
                    "period": point["period"],
                    "period_label": (
                        point["period"].strftime("%Y-%m-%d")
                        if hasattr(point["period"], "strftime")
                        else str(point["period"])
                    ),
                    "type": point["type"],
                    "amount": point["total"],
                }
            )

        return Response(
            {
                "period_type": period,
                "months_analyzed": months,
                "start_date": start_date,
                "end_date": end_date,
                "trends": trend_points,
            },
            status=status.HTTP_200_OK,
        )


class BudgetAnalysisView(APIView):
    """
    Provides analysis of spending against budget goals.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = self.request.user

        # Get query parameters for filtering
        period = request.query_params.get("period", "monthly")  # default to monthly
        category_id = request.query_params.get("category_id", None)

        # Get today's date and calculate month/year based periods
        today = timezone.now()
        start_date = None
        end_date = today

        # Determine period range based on user's selected period
        if period == "weekly":
            # Start from beginning of the week
            start_date = today - timedelta(days=today.weekday())

        elif period == "monthly":
            # Start from beginning of the month
            start_date = datetime(today.year, today.month, 1)

        elif period == "yearly":
            # Start from beginning of the year
            start_date = datetime(today.year, 1, 1)

        if not start_date:
            start_date = datetime(today.year, today.month, 1)  # Default to monthly

        # Get active budgets for the user within the period
        filters = {"user": user, "is_active": True, "period": period}

        if category_id:
            filters["category_id"] = category_id

        budgets = Budget.objects.filter(**filters)

        # Get all expense transactions for the user in the current period
        transactions = Transaction.objects.filter(
            user=user, type="expense", date__gte=start_date, date__lte=end_date
        )

        # Group transactions by category
        category_expenses = {}
        for transaction in transactions:
            category_id = transaction.category_id
            if category_id not in category_expenses:
                category_expenses[category_id] = 0
            category_expenses[category_id] += float(transaction.amount)

        # Prepare budget analysis
        budget_analysis = []
        total_budget = 0
        total_spent = 0
        total_remaining = 0

        # Track newly created notifications for response
        new_notifications = []

        # Analyze each budget
        for budget in budgets:
            category_id = budget.category_id
            category = budget.category
            budget_amount = float(budget.amount)
            spending = category_expenses.get(category_id, 0)

            # Calculate remaining and percentage
            remaining = budget_amount - spending
            percentage_used = (
                (spending / budget_amount) * 100 if budget_amount > 0 else 0
            )

            # Determine status
            if remaining < 0:
                status = "over_budget"

                # Check if we need to create a notification for this budget
                # Look for existing notifications for this budget in the current period
                from ..models import Notification

                existing_notification = Notification.objects.filter(
                    user=user,
                    notification_type="budget_alert",
                    related_object_type="budget",
                    related_object_id=budget.id,
                    created_at__gte=start_date,
                ).first()

                # If no notification exists for this budget in this period, create one
                if not existing_notification:
                    # Create budget alert notification
                    notification_title = f"Budget Alert: {budget.title}"
                    notification_message = (
                        f"You've exceeded your {budget.get_period_display().lower()} budget for "
                        f"{category.name} by ${abs(remaining):.2f}. "
                        f"Budget: ${budget_amount:.2f}, Spent: ${spending:.2f}"
                    )

                    notification = Notification.objects.create(
                        user=user,
                        title=notification_title,
                        message=notification_message,
                        notification_type="budget_alert",
                        related_object_type="budget",
                        related_object_id=budget.id,
                        is_email_sent=False,  # Will be sent by background task
                    )
                    new_notifications.append(
                        {"id": notification.id, "title": notification.title}
                    )

                    # This notification will be picked up by a background task to send email

            elif percentage_used > 80:
                status = "warning"
            else:
                status = "good"

            budget_analysis.append(
                {
                    "budget_id": budget.id,
                    "budget_title": budget.title,
                    "category_id": category_id,
                    "category_name": category.name,
                    "category_icon": category.icon,
                    "category_color": category.color,
                    "budget_amount": budget_amount,
                    "amount_spent": spending,
                    "amount_remaining": remaining,
                    "percentage_used": round(percentage_used, 2),
                    "period": period,
                    "status": status,
                }
            )

            total_budget += budget_amount
            total_spent += spending
            total_remaining += remaining

        # Add categories with expenses but no budgets
        for category_id, spending in category_expenses.items():
            if not any(
                analysis["category_id"] == category_id for analysis in budget_analysis
            ):
                try:
                    category = Category.objects.get(id=category_id)
                    budget_analysis.append(
                        {
                            "budget_id": None,
                            "budget_title": None,
                            "category_id": category_id,
                            "category_name": category.name,
                            "category_icon": category.icon,
                            "category_color": category.color,
                            "budget_amount": 0,
                            "amount_spent": spending,
                            "amount_remaining": -spending,  # Over budget by definition
                            "percentage_used": 100 if spending > 0 else 0,
                            "period": period,
                            "status": "no_budget",
                        }
                    )

                    total_spent += spending
                    total_remaining -= spending
                except Category.DoesNotExist:
                    pass

        response_data = {
            "period": period,
            "period_start": start_date,
            "period_end": end_date,
            "budget_analysis": budget_analysis,
            "summary": {
                "total_budget": total_budget,
                "total_spent": total_spent,
                "total_remaining": total_remaining,
                "categories_over_budget": sum(
                    1 for item in budget_analysis if item["status"] == "over_budget"
                ),
                "categories_warning": sum(
                    1 for item in budget_analysis if item["status"] == "warning"
                ),
                "categories_no_budget": sum(
                    1 for item in budget_analysis if item["status"] == "no_budget"
                ),
            },
        }

        # Include new notifications in response if any were created
        if new_notifications:
            response_data["new_notifications"] = new_notifications

        return Response(response_data, status=status.HTTP_200_OK)


class TransactionInsightsView(APIView):
    """
    Provides AI-powered insights based on transaction patterns.
    """

    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = request.user

        # Get all transactions for the user
        transactions = Transaction.objects.filter(user=user).order_by("-date")

        # 1. Calculate highest expense categories
        expense_categories = (
            transactions.filter(type="expense")
            .values("category")
            .annotate(total=Sum("amount"))
            .order_by("-total")[:3]
        )

        # 2. Find month with highest spending
        monthly_expenses = (
            transactions.filter(type="expense")
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("-total")
        )

        highest_spending_month = None
        if monthly_expenses:
            highest_spending_month = monthly_expenses[0]

        # 3. Spending pattern trends (increasing/decreasing)
        # Get last 3 months of spending
        today = datetime.now()
        three_months_ago = today - timedelta(days=90)

        last_three_months = (
            transactions.filter(type="expense", date__gte=three_months_ago)
            .annotate(month=TruncMonth("date"))
            .values("month")
            .annotate(total=Sum("amount"))
            .order_by("month")
        )

        spending_trend = "stable"
        if len(last_three_months) >= 2:
            first_month = last_three_months[0]["total"]
            last_month = last_three_months[len(last_three_months) - 1]["total"]

            if last_month > first_month * 1.1:  # 10% increase
                spending_trend = "increasing"
            elif last_month < first_month * 0.9:  # 10% decrease
                spending_trend = "decreasing"

        # 4. Unusual transactions
        # Get average expense amount
        avg_expense = (
            transactions.filter(type="expense").aggregate(avg=Avg("amount"))["avg"] or 0
        )

        # Find transactions significantly higher than average
        unusual_transactions = transactions.filter(
            type="expense",
            amount__gt=avg_expense * 2,  # Transactions over twice the average
        ).order_by("-date")[:5]

        # 5. Savings analysis
        monthly_savings = []

        for i in range(6):  # Last 6 months
            month_date = today - timedelta(days=30 * i)
            month_start = datetime(month_date.year, month_date.month, 1)
            if month_date.month == 12:
                next_month = datetime(month_date.year + 1, 1, 1)
            else:
                next_month = datetime(month_date.year, month_date.month + 1, 1)

            month_income = (
                transactions.filter(
                    type="income", date__gte=month_start, date__lt=next_month
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            month_expenses = (
                transactions.filter(
                    type="expense", date__gte=month_start, date__lt=next_month
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            month_savings = month_income - month_expenses

            monthly_savings.append(
                {
                    "month": month_start.strftime("%B %Y"),
                    "income": month_income,
                    "expenses": month_expenses,
                    "savings": month_savings,
                    "savings_rate": round(
                        (month_savings / month_income * 100) if month_income > 0 else 0,
                        2,
                    ),
                }
            )

        # Generate insights based on the data
        insights = []

        # Top spending categories
        top_categories = []
        for cat in expense_categories:
            try:
                category = Category.objects.get(id=cat["category"])
                top_categories.append({"name": category.name, "total": cat["total"]})
            except Category.DoesNotExist:
                pass

        if top_categories:
            insights.append(
                {
                    "type": "top_spending",
                    "title": "Top Spending Categories",
                    "description": f"Your highest spending is in {top_categories[0]['name']} (${top_categories[0]['total']})",
                }
            )

        # Spending trend
        if spending_trend != "stable":
            insights.append(
                {
                    "type": "spending_trend",
                    "title": "Spending Trend",
                    "description": f"Your spending has been {spending_trend} over the last 3 months",
                }
            )

        # Highest spending month
        if highest_spending_month:
            month_name = highest_spending_month["month"].strftime("%B %Y")
            insights.append(
                {
                    "type": "highest_month",
                    "title": "Highest Spending Month",
                    "description": f"Your highest spending month was {month_name} (${highest_spending_month['total']})",
                }
            )

        # Unusual transactions
        if unusual_transactions:
            insights.append(
                {
                    "type": "unusual_spending",
                    "title": "Unusual Spending",
                    "description": f"You have {unusual_transactions.count()} transactions that are significantly higher than your average spending",
                }
            )

        # Savings rate
        if monthly_savings:
            avg_savings_rate = sum(
                month["savings_rate"] for month in monthly_savings
            ) / len(monthly_savings)
            savings_insight = {
                "type": "savings_rate",
                "title": "Savings Rate",
                "description": f"Your average savings rate is {round(avg_savings_rate, 2)}% of your income",
            }

            if avg_savings_rate < 10:
                savings_insight[
                    "description"
                ] += ". Consider ways to increase your savings rate to at least 20%."
            elif avg_savings_rate >= 20:
                savings_insight[
                    "description"
                ] += ". Great job! You're saving a healthy portion of your income."

            insights.append(savings_insight)

        return Response(
            {
                "insights": insights,
                "top_expense_categories": top_categories,
                "monthly_savings": monthly_savings,
                "spending_trend": spending_trend,
                "unusual_transactions": [
                    {
                        "id": t.id,
                        "title": t.title,
                        "amount": t.amount,
                        "date": t.date,
                        "category": (
                            Category.objects.get(id=t.category_id).name
                            if Category.objects.filter(id=t.category_id).exists()
                            else "Unknown"
                        ),
                    }
                    for t in unusual_transactions
                ],
            },
            status=status.HTTP_200_OK,
        )
