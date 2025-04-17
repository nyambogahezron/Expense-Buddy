from rest_framework import serializers
from .models import (
    Transaction,
    Category,
    UserCategory,
    ReportPreference,
    RequestLog,
    AdminSettings,
    AdminBulkEmail,
)
from apiAuth.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        # Create the category instance
        return super().create(validated_data)


class UserCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategory
        fields = "__all__"


class TransactionSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = ["user"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        return representation


class ReportPreferenceSerializer(serializers.ModelSerializer):
    frequency_display = serializers.CharField(
        source="get_frequency_display", read_only=True
    )

    class Meta:
        model = ReportPreference
        fields = [
            "id",
            "frequency",
            "frequency_display",
            "is_enabled",
            "include_insights",
            "include_category_distribution",
            "include_spending_trends",
            "include_monthly_summary",
            "last_report_date",
            "next_report_date",
        ]
        read_only_fields = ["last_report_date", "next_report_date"]


# Serializers for Admin Analytics
class UserAdminSerializer(serializers.ModelSerializer):
    """Serializer for user data in admin context with extra fields"""

    last_login_date = serializers.DateTimeField(source="last_login", read_only=True)
    account_status_display = serializers.CharField(
        source="get_account_status_display", read_only=True
    )
    transaction_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "name",
            "is_active",
            "is_staff",
            "is_superuser",
            "date_joined",
            "last_login_date",
            "account_status",
            "account_status_display",
            "is_email_verified",
            "transaction_count",
        ]

    def get_transaction_count(self, obj):
        return Transaction.objects.filter(user=obj.id).count()


class RequestLogSerializer(serializers.ModelSerializer):
    """Serializer for request logs"""

    username = serializers.SerializerMethodField()

    class Meta:
        model = RequestLog
        fields = [
            "id",
            "path",
            "method",
            "status_code",
            "user_id",
            "username",
            "ip_address",
            "duration",
            "query_count",
            "query_time",
            "date",
        ]

    def get_username(self, obj):
        if obj.user_id:
            try:
                user = User.objects.get(id=obj.user_id)
                return user.username
            except User.DoesNotExist:
                return None
        return None


class AdminSettingsSerializer(serializers.ModelSerializer):
    """Serializer for admin settings"""

    class Meta:
        model = AdminSettings
        fields = "__all__"


class AdminBulkEmailSerializer(serializers.ModelSerializer):
    """Serializer for admin bulk emails"""

    sent_by_username = serializers.SerializerMethodField()

    class Meta:
        model = AdminBulkEmail
        fields = [
            "id",
            "subject",
            "message",
            "recipient_count",
            "sent_by",
            "sent_by_username",
            "sent_at",
            "user_filter",
        ]
        read_only_fields = ["sent_at", "sent_by_username"]

    def get_sent_by_username(self, obj):
        if obj.sent_by:
            return obj.sent_by.username
        return None
