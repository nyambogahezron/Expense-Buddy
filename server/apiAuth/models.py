from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=150, null=True, blank=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    password = models.CharField(max_length=128)
    verification_token = models.CharField(max_length=100, null=True, blank=True)
    is_email_verified = models.BooleanField(default=False)
    reset_password_token = models.CharField(max_length=100, null=True, blank=True)
    reset_password_token_created_at = models.DateTimeField(null=True, blank=True)
    verification_token_created_at = models.DateTimeField(null=True, blank=True)
    account_status = models.CharField(
        max_length=20,
        choices=[
            ("active", "Active"),
            ("inactive", "Inactive"),
            ("inactive", "Suspended"),
        ],
        default="active",
    )
    loginAttempts = models.IntegerField(default=0)

    USERNAME_FIELD = "username"

    REQUIRED_FIELDS = ["email"]

    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name="groups",
        blank=True,
        related_name="user_groups",
        help_text="The groups this user belongs to. A user will get all permissions "
        "granted to each of their group.",
    )

    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name="user permissions",
        blank=True,
        related_name="user_permissions",
        help_text="Specific permissions for this user.",
    )

    def __str__(self):
        return self.username
