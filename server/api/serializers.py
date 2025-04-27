from rest_framework import serializers
from .models import (
    Transaction,
    Category,
    UserCategory,
    ReportPreference,
    RequestLog,
    AdminSettings,
    AdminBulkEmail,
    Budget,
    Notification,
    ShoppingList,
    ShoppingItem,
    PaymentSchedule,
    ScheduledPaymentHistory,
    Reminder,
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


class BudgetSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)
    period_display = serializers.CharField(source="get_period_display", read_only=True)

    class Meta:
        model = Budget
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        return representation

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)


class TransactionSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)
    budget_detail = BudgetSerializer(source="budget", read_only=True)

    class Meta:
        model = Transaction
        fields = "__all__"
        read_only_fields = ["user"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        if "budget_detail" in representation:
            representation["budget_data"] = representation.pop("budget_detail")
        return representation

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)


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


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = [
            "id",
            "user",
            "title",
            "message",
            "notification_type",
            "status",
            "related_object_id",
            "related_object_type",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "user",
            "title",
            "message",
            "notification_type",
            "created_at",
            "related_object_id",
            "related_object_type",
        ]


class ShoppingItemSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = ShoppingItem
        fields = "__all__"
        read_only_fields = ["created_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        return representation


class ShoppingListSerializer(serializers.ModelSerializer):
    items = ShoppingItemSerializer(many=True, read_only=True)
    item_count = serializers.SerializerMethodField()
    purchased_count = serializers.SerializerMethodField()
    total_estimated_cost = serializers.SerializerMethodField()

    class Meta:
        model = ShoppingList
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def get_item_count(self, obj):
        return obj.items.count()

    def get_purchased_count(self, obj):
        return obj.items.filter(is_purchased=True).count()

    def get_total_estimated_cost(self, obj):
        # Sum of all items with prices
        items_with_price = obj.items.filter(price__isnull=False)
        if not items_with_price.exists():
            return None

        total = sum(item.price * item.quantity for item in items_with_price)
        return total

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)


class ScheduledPaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledPaymentHistory
        fields = "__all__"
        read_only_fields = ["created_at"]


class PaymentScheduleSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)
    frequency_display = serializers.CharField(
        source="get_frequency_display", read_only=True
    )
    payment_history = ScheduledPaymentHistorySerializer(many=True, read_only=True)
    upcoming_payments = serializers.SerializerMethodField()

    class Meta:
        model = PaymentSchedule
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def get_upcoming_payments(self, obj):
        # Return the next 3 upcoming payments from payment history that aren't paid yet
        upcoming = obj.payment_history.filter(is_paid=False).order_by("payment_date")[
            :3
        ]
        return ScheduledPaymentHistorySerializer(upcoming, many=True).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        return representation

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)


class ReminderSerializer(serializers.ModelSerializer):
    category_detail = CategorySerializer(source="category", read_only=True)
    priority_display = serializers.CharField(
        source="get_priority_display", read_only=True
    )
    repeat_display = serializers.CharField(source="get_repeat_display", read_only=True)

    class Meta:
        model = Reminder
        fields = "__all__"
        read_only_fields = ["user", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if "category_detail" in representation:
            representation["category_data"] = representation.pop("category_detail")
        return representation

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)
