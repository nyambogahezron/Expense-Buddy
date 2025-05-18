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


class Budget(models.Model):
    """
    Stores budget information for a user with category association and period specifications.
    """

    PERIOD_CHOICES = [
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    ]

    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="budgets"
    )
    period = models.CharField(max_length=20, choices=PERIOD_CHOICES, default="monthly")
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.get_period_display()} (${self.amount})"

    class Meta:
        verbose_name = "Budget"
        verbose_name_plural = "Budgets"
        ordering = ["-created_at"]


class Transaction(models.Model):
    user = models.ForeignKey("apiAuth.User", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="transactions"
    )
    budget = models.ForeignKey(
        Budget,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="transactions",
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


class Notification(models.Model):
    """
    Stores notifications for users, such as budget alerts, system messages, etc.
    """

    NOTIFICATION_TYPES = [
        ("budget_alert", "Budget Alert"),
        ("system", "System Notification"),
        ("report", "Report Available"),
        ("transaction", "Transaction Alert"),
        ("reminder", "Reminder"),
        ("payment", "Payment Due"),
        ("shopping", "Shopping List"),
    ]

    NOTIFICATION_STATUS = [
        ("unread", "Unread"),
        ("read", "Read"),
        ("archived", "Archived"),
    ]

    user = models.ForeignKey(
        "apiAuth.User", on_delete=models.CASCADE, related_name="notifications"
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    status = models.CharField(
        max_length=10, choices=NOTIFICATION_STATUS, default="unread"
    )
    related_object_id = models.IntegerField(
        null=True, blank=True, help_text="ID of the related object (e.g., budget_id)"
    )
    related_object_type = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="Type of related object (e.g., 'budget')",
    )
    is_email_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["user", "status"]),
            models.Index(fields=["notification_type"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.title} ({self.notification_type})"


class ShoppingList(models.Model):
    """
    Stores shopping lists created by users
    """

    user = models.ForeignKey(
        "apiAuth.User", on_delete=models.CASCADE, related_name="shopping_lists"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Shopping List"
        verbose_name_plural = "Shopping Lists"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username}'s List: {self.title}"


class ShoppingItem(models.Model):
    """
    Individual items in a shopping list
    """

    shopping_list = models.ForeignKey(
        ShoppingList, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=255)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_purchased = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Shopping Item"
        verbose_name_plural = "Shopping Items"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.quantity}) - {self.shopping_list.title}"


class PaymentSchedule(models.Model):
    """
    Schedules for recurring payments
    """

    FREQUENCY_CHOICES = [
        ("one_time", "One Time"),
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("biweekly", "Biweekly"),
        ("monthly", "Monthly"),
        ("quarterly", "Quarterly"),
        ("biannual", "Biannual"),
        ("annual", "Annual"),
    ]

    user = models.ForeignKey(
        "apiAuth.User", on_delete=models.CASCADE, related_name="payment_schedules"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    frequency = models.CharField(
        max_length=20, choices=FREQUENCY_CHOICES, default="monthly"
    )
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    next_payment_date = models.DateField()
    notification_days = models.IntegerField(
        default=3, help_text="Days before payment to send notification"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Payment Schedule"
        verbose_name_plural = "Payment Schedules"
        ordering = ["next_payment_date"]

    def __str__(self):
        return f"{self.title} - ${self.amount} ({self.get_frequency_display()})"


class ScheduledPaymentHistory(models.Model):
    """
    History of payments made from scheduled payments
    """

    payment_schedule = models.ForeignKey(
        PaymentSchedule, on_delete=models.CASCADE, related_name="payment_history"
    )
    payment_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction = models.ForeignKey(
        Transaction, on_delete=models.SET_NULL, null=True, blank=True
    )
    is_paid = models.BooleanField(default=False)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Payment History"
        verbose_name_plural = "Payment History"
        ordering = ["-payment_date"]

    def __str__(self):
        status = "Paid" if self.is_paid else "Unpaid"
        return f"{self.payment_schedule.title} - {self.payment_date} - {status}"


class Reminder(models.Model):
    """
    Custom reminders for users
    """

    PRIORITY_CHOICES = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]

    REPEAT_CHOICES = [
        ("none", "Do not repeat"),
        ("daily", "Daily"),
        ("weekly", "Weekly"),
        ("monthly", "Monthly"),
        ("yearly", "Yearly"),
    ]

    user = models.ForeignKey(
        "apiAuth.User", on_delete=models.CASCADE, related_name="reminders"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    due_date = models.DateTimeField()
    priority = models.CharField(
        max_length=10, choices=PRIORITY_CHOICES, default="medium"
    )
    repeat = models.CharField(max_length=10, choices=REPEAT_CHOICES, default="none")
    is_completed = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    notify_before = models.IntegerField(
        default=60, help_text="Minutes before to send notification"
    )
    related_object_id = models.IntegerField(null=True, blank=True)
    related_object_type = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Reminder"
        verbose_name_plural = "Reminders"
        ordering = ["due_date"]

    def __str__(self):
        return f"{self.title} - {self.due_date.strftime('%Y-%m-%d %H:%M')}"
