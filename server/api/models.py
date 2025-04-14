from django.db import models


class Category(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    color = models.CharField(max_length=7, default="#FFFFFF")
    icon = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ["name"]


# pivotal table to manage many-to-many relationships between users and categories
class UserCategory(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["user", "category"]
        verbose_name = "User Category"
        verbose_name_plural = "User Categories"


class Transaction(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="transactions"
    )
    type = models.CharField(
        max_length=50, choices=[("income", "Income"), ("expense", "Expense")]
    )
    color = models.CharField(max_length=7, default="#FFFFFF")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    receipt = models.FileField(upload_to="receipts/", blank=True, null=True)

    def __str__(self):
        return f"Transaction {self.id} - Amount: {self.amount}"

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"
        ordering = ["-date"]


class ReportPreference(models.Model):
    """
    Stores user preferences for periodic transaction reports.
    """

    user = models.OneToOneField(
        "apiAuth.User", on_delete=models.CASCADE, related_name="report_preference"
    )

    # Report frequency in months
    FREQUENCY_CHOICES = [
        (1, "Monthly"),
        (2, "Bi-Monthly"),
        (3, "Quarterly"),
        (4, "Third-Yearly"),
        (6, "Semi-Annually"),
        (12, "Annually"),
    ]

    frequency = models.IntegerField(choices=FREQUENCY_CHOICES, default=1)
    is_enabled = models.BooleanField(default=False)
    include_insights = models.BooleanField(default=True)
    include_category_distribution = models.BooleanField(default=True)
    include_spending_trends = models.BooleanField(default=True)
    include_monthly_summary = models.BooleanField(default=True)

    # Track when reports were last sent
    last_report_date = models.DateTimeField(null=True, blank=True)
    next_report_date = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (
            f"{self.user.username}'s Report Preference ({self.get_frequency_display()})"
        )


class RequestLog(models.Model):
    """
    Logs API requests for analytics and performance monitoring.
    This model stores information about each request made to the API.
    """

    path = models.CharField(max_length=255)
    method = models.CharField(max_length=10)
    status_code = models.IntegerField()
    user_id = models.IntegerField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    duration = models.FloatField(help_text="Request duration in seconds")
    query_count = models.IntegerField(default=0)
    query_time = models.FloatField(default=0)
    date = models.DateTimeField()

    class Meta:
        verbose_name = "Request Log"
        verbose_name_plural = "Request Logs"
        ordering = ["-date"]
        indexes = [
            models.Index(fields=["path"]),
            models.Index(fields=["date"]),
            models.Index(fields=["user_id"]),
        ]

    def __str__(self):
        return f"{self.method} {self.path} - {self.status_code}"


class AdminSettings(models.Model):
    """
    Settings for admin analytics dashboard.
    """

    log_retention_days = models.IntegerField(
        default=30, help_text="Number of days to retain request logs"
    )
    slow_request_threshold = models.FloatField(
        default=1.0, help_text="Threshold in seconds to mark a request as slow"
    )
    analytics_enabled = models.BooleanField(default=True)
    email_footer = models.TextField(
        blank=True, help_text="Footer text to include in all admin emails"
    )

    class Meta:
        verbose_name = "Admin Settings"
        verbose_name_plural = "Admin Settings"

    def __str__(self):
        return "Admin Analytics Settings"


class AdminBulkEmail(models.Model):
    """
    Track emails sent by administrators to users.
    """

    subject = models.CharField(max_length=255)
    message = models.TextField()
    recipient_count = models.IntegerField()
    sent_by = models.ForeignKey("apiAuth.User", on_delete=models.SET_NULL, null=True)
    sent_at = models.DateTimeField(auto_now_add=True)

    # Optional filters used
    user_filter = models.JSONField(
        null=True, blank=True, help_text="Filters used to select recipients"
    )

    class Meta:
        verbose_name = "Admin Bulk Email"
        verbose_name_plural = "Admin Bulk Emails"
        ordering = ["-sent_at"]

    def __str__(self):
        return f"Email: {self.subject} ({self.recipient_count} recipients)"
