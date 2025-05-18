import io
from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
)
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
import matplotlib.pyplot as plt
import matplotlib

matplotlib.use("Agg")  # Use non-interactive backend
import numpy as np
from io import BytesIO
from django.db.models import Sum, Count
from .models import Transaction, Category, ReportPreference


def generate_monthly_summary_chart(user, start_date, end_date):
    """Generate a chart showing income vs expenses for the period"""
    months = []
    incomes = []
    expenses = []

    current_date = start_date
    while current_date <= end_date:
        # Get month name
        month_name = current_date.strftime("%b")
        months.append(month_name)

        # Get income for this month
        income = (
            Transaction.objects.filter(
                user=user,
                type="income",
                date__year=current_date.year,
                date__month=current_date.month,
            ).aggregate(total=Sum("amount"))["total"]
            or 0
        )
        incomes.append(float(income))

        # Get expenses for this month
        expense = (
            Transaction.objects.filter(
                user=user,
                type="expense",
                date__year=current_date.year,
                date__month=current_date.month,
            ).aggregate(total=Sum("amount"))["total"]
            or 0
        )
        expenses.append(float(expense))

        # Move to next month
        if current_date.month == 12:
            current_date = datetime(current_date.year + 1, 1, 1)
        else:
            current_date = datetime(current_date.year, current_date.month + 1, 1)

    # Create the plot
    plt.figure(figsize=(8, 4))
    x = np.arange(len(months))
    width = 0.35

    plt.bar(x - width / 2, incomes, width, label="Income", color="#4CAF50")
    plt.bar(x + width / 2, expenses, width, label="Expenses", color="#F44336")

    plt.xlabel("Month")
    plt.ylabel("Amount")
    plt.title("Income vs Expenses")
    plt.xticks(x, months)
    plt.legend()

    # Save plot to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    plt.close()

    return buffer


def generate_category_pie_chart(user, start_date, end_date):
    """Generate a pie chart showing expense distribution by category"""
    # Get all expense transactions for the user in the date range
    transactions = Transaction.objects.filter(
        user=user, type="expense", date__gte=start_date, date__lte=end_date
    )

    # Group by category and calculate totals
    category_totals = {}
    for transaction in transactions:
        category_name = transaction.category.name
        if category_name not in category_totals:
            category_totals[category_name] = 0
        category_totals[category_name] += float(transaction.amount)

    # Prepare data for pie chart
    categories = list(category_totals.keys())
    amounts = list(category_totals.values())

    # Only include top 8 categories, group the rest as "Other"
    if len(categories) > 8:
        sorted_indices = sorted(
            range(len(amounts)), key=lambda i: amounts[i], reverse=True
        )
        top_categories = [categories[i] for i in sorted_indices[:7]]
        top_amounts = [amounts[i] for i in sorted_indices[:7]]

        other_amount = sum(amounts[i] for i in sorted_indices[7:])
        if other_amount > 0:
            top_categories.append("Other")
            top_amounts.append(other_amount)

        categories = top_categories
        amounts = top_amounts

    # Create the plot
    plt.figure(figsize=(7, 7))
    plt.pie(amounts, labels=categories, autopct="%1.1f%%", startangle=90, shadow=True)
    plt.axis("equal")  # Equal aspect ratio ensures that pie is drawn as a circle
    plt.title("Expense Distribution by Category")

    # Save plot to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    plt.close()

    return buffer


def generate_pdf_report(user, period_start, period_end):
    """Generate a PDF report with transaction analytics for the user"""
    buffer = io.BytesIO()

    # Create the PDF object using ReportLab
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    elements = []

    # Title
    title_style = styles["Heading1"]
    title_style.alignment = 1  # Center alignment
    title = Paragraph(f"Financial Report", title_style)
    elements.append(title)

    # Period subtitle
    period_text = f"Period: {period_start.strftime('%B %d, %Y')} - {period_end.strftime('%B %d, %Y')}"
    subtitle = Paragraph(period_text, styles["Heading2"])
    subtitle.alignment = 1
    elements.append(subtitle)
    elements.append(Spacer(1, 0.25 * inch))

    # User information
    elements.append(
        Paragraph(f"Generated for: {user.name or user.username}", styles["Normal"])
    )
    elements.append(Paragraph(f"Email: {user.email}", styles["Normal"]))
    elements.append(
        Paragraph(
            f"Generation Date: {datetime.now().strftime('%B %d, %Y')}", styles["Normal"]
        )
    )
    elements.append(Spacer(1, 0.25 * inch))

    # Get user's report preferences
    try:
        report_pref = ReportPreference.objects.get(user=user)
    except ReportPreference.DoesNotExist:
        report_pref = ReportPreference(user=user)

    # 1. Monthly Summary (if included)
    if report_pref.include_monthly_summary:
        elements.append(Paragraph("Monthly Summary", styles["Heading2"]))

        # Add monthly chart
        monthly_chart_buffer = generate_monthly_summary_chart(
            user, period_start, period_end
        )
        img = Image(monthly_chart_buffer, width=6 * inch, height=3 * inch)
        elements.append(img)
        elements.append(Spacer(1, 0.25 * inch))

        # Add monthly summary table
        current_date = period_start
        table_data = [["Month", "Income", "Expenses", "Net"]]

        total_income = 0
        total_expenses = 0

        while current_date <= period_end:
            month_name = current_date.strftime("%B %Y")

            # Get income and expenses for this month
            income = (
                Transaction.objects.filter(
                    user=user,
                    type="income",
                    date__year=current_date.year,
                    date__month=current_date.month,
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            expenses = (
                Transaction.objects.filter(
                    user=user,
                    type="expense",
                    date__year=current_date.year,
                    date__month=current_date.month,
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            net = income - expenses

            table_data.append(
                [month_name, f"${income:.2f}", f"${expenses:.2f}", f"${net:.2f}"]
            )

            total_income += income
            total_expenses += expenses

            # Move to next month
            if current_date.month == 12:
                current_date = datetime(current_date.year + 1, 1, 1)
            else:
                current_date = datetime(current_date.year, current_date.month + 1, 1)

        # Add totals row
        table_data.append(
            [
                "Total",
                f"${total_income:.2f}",
                f"${total_expenses:.2f}",
                f"${total_income - total_expenses:.2f}",
            ]
        )

        # Create the table
        table = Table(
            table_data, colWidths=[2 * inch, 1.5 * inch, 1.5 * inch, 1.5 * inch]
        )
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, 0), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, 0), 12),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                    ("BACKGROUND", (0, -1), (-1, -1), colors.lightgrey),
                    ("FONTNAME", (0, -1), (-1, -1), "Helvetica-Bold"),
                    ("GRID", (0, 0), (-1, -1), 1, colors.black),
                    ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
                ]
            )
        )
        elements.append(table)
        elements.append(Spacer(1, 0.5 * inch))

    # 2. Category Distribution (if included)
    if report_pref.include_category_distribution:
        elements.append(
            Paragraph("Expense Distribution by Category", styles["Heading2"])
        )

        # Add pie chart for category distribution
        pie_chart_buffer = generate_category_pie_chart(user, period_start, period_end)
        img = Image(pie_chart_buffer, width=5 * inch, height=5 * inch)
        elements.append(img)

        # Add category distribution table
        transactions = Transaction.objects.filter(
            user=user, type="expense", date__gte=period_start, date__lte=period_end
        )

        category_totals = {}
        for transaction in transactions:
            category_name = transaction.category.name
            if category_name not in category_totals:
                category_totals[category_name] = 0
            category_totals[category_name] += float(transaction.amount)

        total_expenses = sum(category_totals.values())

        # Sort categories by amount spent (descending)
        sorted_categories = sorted(
            category_totals.items(), key=lambda x: x[1], reverse=True
        )

        table_data = [["Category", "Amount", "Percentage"]]
        for category, amount in sorted_categories:
            percentage = (amount / total_expenses * 100) if total_expenses > 0 else 0
            table_data.append([category, f"${amount:.2f}", f"{percentage:.2f}%"])

        # Create the table
        table = Table(table_data, colWidths=[3 * inch, 2 * inch, 1.5 * inch])
        table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                    ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                    ("ALIGN", (0, 0), (-1, 0), "CENTER"),
                    ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                    ("FONTSIZE", (0, 0), (-1, 0), 12),
                    ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
                    ("GRID", (0, 0), (-1, -1), 1, colors.black),
                    ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
                ]
            )
        )
        elements.append(Spacer(1, 0.25 * inch))
        elements.append(table)
        elements.append(Spacer(1, 0.5 * inch))

    # 3. Spending Trends (if included)
    if report_pref.include_spending_trends:
        elements.append(Paragraph("Spending Trends", styles["Heading2"]))
        elements.append(
            Paragraph("Monthly spending over the report period:", styles["Normal"])
        )
        elements.append(Spacer(1, 0.25 * inch))

        # Create a spending trends table
        current_date = period_start
        spending_data = []

        while current_date <= period_end:
            month_name = current_date.strftime("%B %Y")

            # Get expenses for this month
            expense = (
                Transaction.objects.filter(
                    user=user,
                    type="expense",
                    date__year=current_date.year,
                    date__month=current_date.month,
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )

            spending_data.append((month_name, float(expense)))

            # Move to next month
            if current_date.month == 12:
                current_date = datetime(current_date.year + 1, 1, 1)
            else:
                current_date = datetime(current_date.year, current_date.month + 1, 1)

        # Analyze trends
        if len(spending_data) >= 2:
            first_month = spending_data[0][1]
            last_month = spending_data[-1][1]

            if last_month > first_month:
                change_pct = (
                    ((last_month - first_month) / first_month * 100)
                    if first_month > 0
                    else 0
                )
                trend_text = f"Your spending has increased by {change_pct:.2f}% over this period."
            elif last_month < first_month:
                change_pct = (
                    ((first_month - last_month) / first_month * 100)
                    if first_month > 0
                    else 0
                )
                trend_text = f"Your spending has decreased by {change_pct:.2f}% over this period."
            else:
                trend_text = "Your spending has remained stable over this period."

            elements.append(Paragraph(trend_text, styles["Normal"]))
            elements.append(Spacer(1, 0.25 * inch))

        # Create a bar chart for spending trends
        months = [data[0] for data in spending_data]
        amounts = [data[1] for data in spending_data]

        plt.figure(figsize=(8, 4))
        plt.bar(months, amounts, color="#2196F3")
        plt.xlabel("Month")
        plt.ylabel("Expenses")
        plt.title("Monthly Spending Trends")
        plt.xticks(rotation=45)
        plt.tight_layout()

        # Save plot to a BytesIO object
        trend_buffer = BytesIO()
        plt.savefig(trend_buffer, format="png")
        trend_buffer.seek(0)
        plt.close()

        img = Image(trend_buffer, width=6 * inch, height=3 * inch)
        elements.append(img)
        elements.append(Spacer(1, 0.5 * inch))

    # 4. Financial Insights (if included)
    if report_pref.include_insights:
        elements.append(Paragraph("Financial Insights", styles["Heading2"]))

        # Get all transactions for the user
        transactions = Transaction.objects.filter(
            user=user, date__gte=period_start, date__lte=period_end
        )

        # Generate some basic insights
        total_income = (
            transactions.filter(type="income").aggregate(total=Sum("amount"))["total"]
            or 0
        )
        total_expenses = (
            transactions.filter(type="expense").aggregate(total=Sum("amount"))["total"]
            or 0
        )

        # Savings rate
        if total_income > 0:
            savings_rate = ((total_income - total_expenses) / total_income) * 100
            elements.append(
                Paragraph(
                    f"• Your savings rate for this period is {savings_rate:.2f}%.",
                    styles["Normal"],
                )
            )

            if savings_rate < 0:
                elements.append(
                    Paragraph(
                        "• You spent more than you earned during this period. Consider reviewing your expenses.",
                        styles["Normal"],
                    )
                )
            elif savings_rate < 10:
                elements.append(
                    Paragraph(
                        "• Your savings rate is below 10%. Consider finding ways to increase your savings rate.",
                        styles["Normal"],
                    )
                )
            elif savings_rate >= 20:
                elements.append(
                    Paragraph(
                        "• Great job! Your savings rate is above 20%.", styles["Normal"]
                    )
                )

        # Top spending categories
        top_expenses = (
            transactions.filter(type="expense")
            .values("category")
            .annotate(total=Sum("amount"))
            .order_by("-total")[:3]
        )

        if top_expenses:
            elements.append(Spacer(1, 0.1 * inch))
            elements.append(
                Paragraph("• Your top spending categories were:", styles["Normal"])
            )

            for expense in top_expenses:
                try:
                    category = Category.objects.get(id=expense["category"])
                    elements.append(
                        Paragraph(
                            f"  - {category.name}: ${expense['total']:.2f}",
                            styles["Normal"],
                        )
                    )
                except Category.DoesNotExist:
                    pass

        # Unusual spending
        avg_expense = (
            transactions.filter(type="expense").aggregate(
                avg=Sum("amount") / Count("id")
            )["avg"]
            or 0
        )

        unusual_transactions = transactions.filter(
            type="expense", amount__gt=avg_expense * 2
        ).order_by("-amount")[:3]

        if unusual_transactions:
            elements.append(Spacer(1, 0.1 * inch))
            elements.append(
                Paragraph(
                    "• Notable large transactions during this period:", styles["Normal"]
                )
            )

            for t in unusual_transactions:
                date_str = t.date.strftime("%B %d, %Y")
                elements.append(
                    Paragraph(
                        f"  - {t.title} (${t.amount:.2f}) on {date_str}",
                        styles["Normal"],
                    )
                )

    # Build the PDF document
    doc.build(elements)

    pdf = buffer.getvalue()
    buffer.close()

    return pdf


def schedule_and_send_reports():
    """Check for reports that need to be sent and send them"""
    today = datetime.now().date()

    # Find all enabled report preferences
    report_prefs = ReportPreference.objects.filter(
        is_enabled=True, next_report_date__date=today
    )

    for pref in report_prefs:
        # Calculate period start and end based on frequency
        period_end = datetime.now()

        if pref.frequency == 1:  # Monthly
            # Last month
            if period_end.month == 1:
                period_start = datetime(period_end.year - 1, 12, 1)
            else:
                period_start = datetime(period_end.year, period_end.month - 1, 1)
        else:
            # Multiple months back based on frequency
            months_back = pref.frequency
            year = period_end.year
            month = period_end.month - months_back

            while month <= 0:
                month += 12
                year -= 1

            period_start = datetime(year, month, 1)

        # Generate the PDF report
        pdf_data = generate_pdf_report(pref.user, period_start, period_end)

        # Get client URL from settings or use default
        client_url = getattr(settings, "CLIENT_URL", "http://localhost:5000")

        # Prepare financial highlights
        highlights = []

        # Get all transactions for the user
        transactions = Transaction.objects.filter(
            user=pref.user, date__gte=period_start, date__lte=period_end
        )

        # Calculate totals
        total_income = (
            transactions.filter(type="income").aggregate(total=Sum("amount"))["total"]
            or 0
        )
        total_expenses = (
            transactions.filter(type="expense").aggregate(total=Sum("amount"))["total"]
            or 0
        )

        # Add savings rate highlight
        if total_income > 0:
            savings_rate = ((total_income - total_expenses) / total_income) * 100
            highlights.append(
                {
                    "title": "Savings Rate",
                    "description": f"{savings_rate:.2f}% of your income was saved",
                }
            )

        # Add spending trend highlight
        spending_data = []
        current_date = period_start

        while current_date <= period_end:
            expense = (
                Transaction.objects.filter(
                    user=pref.user,
                    type="expense",
                    date__year=current_date.year,
                    date__month=current_date.month,
                ).aggregate(total=Sum("amount"))["total"]
                or 0
            )
            spending_data.append((current_date.strftime("%B %Y"), float(expense)))

            # Move to next month
            if current_date.month == 12:
                current_date = datetime(current_date.year + 1, 1, 1)
            else:
                current_date = datetime(current_date.year, current_date.month + 1, 1)

        if len(spending_data) >= 2:
            first_month = spending_data[0][1]
            last_month = spending_data[-1][1]

            if first_month > 0:
                change_pct = (last_month - first_month) / first_month * 100

                if last_month > first_month:
                    highlights.append(
                        {
                            "title": "Spending Trend",
                            "description": f"Your spending increased by {abs(change_pct):.1f}% compared to the start of this period",
                        }
                    )
                elif last_month < first_month:
                    highlights.append(
                        {
                            "title": "Spending Trend",
                            "description": f"Your spending decreased by {abs(change_pct):.1f}% compared to the start of this period",
                        }
                    )

        # Create context for email template
        context = {
            "username": pref.user.name or pref.user.username,
            "report_frequency": pref.get_frequency_display(),
            "period_start": period_start.strftime("%B %d, %Y"),
            "period_end": period_end.strftime("%B %d, %Y"),
            "generation_date": datetime.now().strftime("%B %d, %Y"),
            "highlights": highlights,
            "include_monthly_summary": pref.include_monthly_summary,
            "include_category_distribution": pref.include_category_distribution,
            "include_spending_trends": pref.include_spending_trends,
            "include_insights": pref.include_insights,
            "app_url": client_url,
            "current_year": datetime.now().year,
        }

        # Render HTML email from template
        html_message = render_to_string("report_email.html", context)

        # Create plain text version for clients that don't support HTML
        plain_message = f"""Hello {pref.user.name or pref.user.username},
        
Attached is your {pref.get_frequency_display().lower()} financial report from ExpenseBuddy.

This report covers the period from {period_start.strftime('%B %d, %Y')} to {period_end.strftime('%B %d, %Y')}.

We hope this helps you track your financial progress and make informed decisions.

Best regards,
The ExpenseBuddy Team"""

        # Send email with both HTML and plain text versions
        email_subject = f"Your {pref.get_frequency_display()} Financial Report"
        email = EmailMultiAlternatives(
            subject=email_subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[pref.user.email],
        )
        email.attach_alternative(html_message, "text/html")

        # Attach PDF
        filename = f"Financial_Report_{period_start.strftime('%Y%m%d')}_{period_end.strftime('%Y%m%d')}.pdf"
        email.attach(filename, pdf_data, "application/pdf")

        # Send the email
        email.send()

        # Update last report date and calculate next report date
        pref.last_report_date = datetime.now()

        # Set next report date based on frequency
        next_date = datetime.now()
        month = next_date.month + pref.frequency
        year = next_date.year

        while month > 12:
            month -= 12
            year += 1

        pref.next_report_date = datetime(year, month, 1)  # First day of the month
        pref.save()


def send_single_report(user, frequency=None):
    """Generate and send a one-time report for a user"""
    today = datetime.now()

    # Calculate period based on frequency or default to monthly
    if not frequency:
        # Try to get user's preferred frequency
        try:
            report_pref = ReportPreference.objects.get(user=user)
            frequency = report_pref.frequency
        except ReportPreference.DoesNotExist:
            frequency = 1  # Default to monthly

    # Calculate period start date
    if frequency == 1:  # Monthly
        # Last month
        if today.month == 1:
            period_start = datetime(today.year - 1, 12, 1)
        else:
            period_start = datetime(today.year, today.month - 1, 1)
    else:
        # Multiple months back based on frequency
        months_back = frequency
        year = today.year
        month = today.month - months_back

        while month <= 0:
            month += 12
            year -= 1

        period_start = datetime(year, month, 1)

    # Generate the PDF report
    pdf_data = generate_pdf_report(user, period_start, today)

    # Map frequency to text
    frequency_text = {
        1: "Monthly",
        2: "Bi-Monthly",
        3: "Quarterly",
        4: "Third-Yearly",
        6: "Semi-Annual",
        12: "Annual",
    }.get(frequency, "Custom")

    # Get client URL from settings or use default
    client_url = getattr(settings, "CLIENT_URL", "http://localhost:5000")

    # Prepare financial highlights
    highlights = []

    # Get all transactions for the user
    transactions = Transaction.objects.filter(
        user=user, date__gte=period_start, date__lte=today
    )

    # Calculate totals
    total_income = (
        transactions.filter(type="income").aggregate(total=Sum("amount"))["total"] or 0
    )
    total_expenses = (
        transactions.filter(type="expense").aggregate(total=Sum("amount"))["total"] or 0
    )

    # Add savings rate highlight
    if total_income > 0:
        savings_rate = ((total_income - total_expenses) / total_income) * 100
        highlights.append(
            {
                "title": "Savings Rate",
                "description": f"{savings_rate:.2f}% of your income was saved",
            }
        )

    # Add spending trend highlight
    spending_data = []
    current_date = period_start

    while current_date <= today:
        expense = (
            Transaction.objects.filter(
                user=user,
                type="expense",
                date__year=current_date.year,
                date__month=current_date.month,
            ).aggregate(total=Sum("amount"))["total"]
            or 0
        )
        spending_data.append((current_date.strftime("%B %Y"), float(expense)))

        # Move to next month
        if current_date.month == 12:
            current_date = datetime(current_date.year + 1, 1, 1)
        else:
            current_date = datetime(current_date.year, current_date.month + 1, 1)

    if len(spending_data) >= 2:
        first_month = spending_data[0][1]
        last_month = spending_data[-1][1]

        if first_month > 0:
            change_pct = (last_month - first_month) / first_month * 100

            if last_month > first_month:
                highlights.append(
                    {
                        "title": "Spending Trend",
                        "description": f"Your spending increased by {abs(change_pct):.1f}% compared to the start of this period",
                    }
                )
            elif last_month < first_month:
                highlights.append(
                    {
                        "title": "Spending Trend",
                        "description": f"Your spending decreased by {abs(change_pct):.1f}% compared to the start of this period",
                    }
                )

    # Check if user has report preferences
    try:
        report_pref = ReportPreference.objects.get(user=user)
        include_monthly_summary = report_pref.include_monthly_summary
        include_category_distribution = report_pref.include_category_distribution
        include_spending_trends = report_pref.include_spending_trends
        include_insights = report_pref.include_insights
    except ReportPreference.DoesNotExist:
        include_monthly_summary = True
        include_category_distribution = True
        include_spending_trends = True
        include_insights = True

    # Create context for email template
    context = {
        "username": user.name or user.username,
        "report_frequency": frequency_text,
        "period_start": period_start.strftime("%B %d, %Y"),
        "period_end": today.strftime("%B %d, %Y"),
        "generation_date": today.strftime("%B %d, %Y"),
        "highlights": highlights,
        "include_monthly_summary": include_monthly_summary,
        "include_category_distribution": include_category_distribution,
        "include_spending_trends": include_spending_trends,
        "include_insights": include_insights,
        "app_url": client_url,
        "current_year": datetime.now().year,
    }

    # Render HTML email from template
    html_message = render_to_string("report_email.html", context)

    # Create plain text version for clients that don't support HTML
    plain_message = f"""Hello {user.name or user.username},
    
Attached is your {frequency_text.lower()} financial report from ExpenseBuddy.

This report covers the period from {period_start.strftime('%B %d, %Y')} to {today.strftime('%B %d, %Y')}.

We hope this helps you track your financial progress and make informed decisions.

Best regards,
The ExpenseBuddy Team"""

    # Send email with both HTML and plain text versions
    email_subject = f"Your {frequency_text} Financial Report"
    email = EmailMultiAlternatives(
        subject=email_subject,
        body=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[user.email],
    )
    email.attach_alternative(html_message, "text/html")

    # Attach PDF
    filename = f"Financial_Report_{period_start.strftime('%Y%m%d')}_{today.strftime('%Y%m%d')}.pdf"
    email.attach(filename, pdf_data, "application/pdf")

    # Send the email
    email.send()

    return True
