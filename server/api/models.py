from sqlite3 import Date
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=255, unique=True)
    avatar = models.ImageField(
        upload_to="avatars/", null=True, blank=True, default="avatars/default.png"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    groups = models.ManyToManyField("Group", related_name="users", blank=True)

    user_permissions = models.ManyToManyField(
        "Permission", related_name="users", blank=True
    )

    def __str__(self):
        return self.username


class Transactions(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    title = models.CharField(max_length=255)
    date = models.DateField(default=Date.Now)
    icon_color = models.CharField(max_length=7, default="#FFA500")
    type = models.CharField(
        max_length=50, choices=[("income", "Income"), ("expense", "Expense")]
    )
    category = models.JSONField()
    transaction_fee = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(null=True, blank=True)
    receipt = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(type__in=["income", "expense"]),
                name="transactions_type_check",
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    title = models.CharField(max_length=255)
    date = models.DateField(default=Date.Now)
    icon_color = models.CharField(max_length=7, default="#FFA500")
    category = models.JSONField()
    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount}"


class Group(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    icon = models.ImageField(
        upload_to="group_icons/",
        null=True,
        blank=True,
        default="group_icons/default.png",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Permission(models.Model):
    name = models.CharField(max_length=255)
    codename = models.CharField(max_length=100, unique=True)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
