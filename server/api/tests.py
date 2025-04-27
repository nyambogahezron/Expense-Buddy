from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import (
    Category,
    Transaction,
    Budget,
    UserCategory,
    ReportPreference,
    Notification,
)
from apiAuth.models import User
from datetime import datetime, timedelta
from decimal import Decimal


class ModelTests(TestCase):
    """Tests for the API models"""

    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create a test category
        self.category = Category.objects.create(
            user=self.user,
            name="Test Category",
            description="Test Description",
            color="#FF5733",
            icon="test-icon",
        )

    def test_category_creation(self):
        """Test that a category can be created correctly"""
        self.assertEqual(self.category.name, "Test Category")
        self.assertEqual(self.category.description, "Test Description")
        self.assertEqual(self.category.color, "#FF5733")
        self.assertEqual(self.category.icon, "test-icon")
        self.assertEqual(self.category.user, self.user)

    def test_transaction_creation(self):
        """Test that a transaction can be created correctly"""
        transaction = Transaction.objects.create(
            user=self.user,
            title="Test Transaction",
            description="Test Description",
            transaction_fee=Decimal("1.50"),
            category=self.category,
            type="expense",
            amount=Decimal("100.00"),
            color="#FF5733",
        )

        self.assertEqual(transaction.user, self.user)
        self.assertEqual(transaction.title, "Test Transaction")
        self.assertEqual(transaction.description, "Test Description")
        self.assertEqual(transaction.transaction_fee, Decimal("1.50"))
        self.assertEqual(transaction.category, self.category)
        self.assertEqual(transaction.type, "expense")
        self.assertEqual(transaction.amount, Decimal("100.00"))
        self.assertEqual(transaction.color, "#FF5733")

    def test_budget_creation(self):
        """Test that a budget can be created correctly"""
        budget = Budget.objects.create(
            user=self.user,
            title="Monthly Budget",
            amount=Decimal("1000.00"),
            category=self.category,
            period="monthly",
            start_date=datetime.now().date(),
            end_date=(datetime.now() + timedelta(days=30)).date(),
            is_active=True,
        )

        self.assertEqual(budget.user, self.user)
        self.assertEqual(budget.title, "Monthly Budget")
        self.assertEqual(budget.amount, Decimal("1000.00"))
        self.assertEqual(budget.category, self.category)
        self.assertEqual(budget.period, "monthly")
        self.assertTrue(budget.is_active)

    def test_user_category_creation(self):
        """Test that a user-category relationship can be created"""
        # Create a second user
        second_user = User.objects.create_user(
            username="seconduser",
            email="second@example.com",
            password="securepassword123",
        )

        # Create a user category relationship
        user_category = UserCategory.objects.create(
            user=second_user, category=self.category
        )

        self.assertEqual(user_category.user, second_user)
        self.assertEqual(user_category.category, self.category)

    def test_report_preference_creation(self):
        """Test that report preferences can be created"""
        report_pref = ReportPreference.objects.create(
            user=self.user,
            frequency=1,
            is_enabled=True,
            include_insights=True,
            include_category_distribution=True,
            include_spending_trends=True,
            include_monthly_summary=True,
        )

        self.assertEqual(report_pref.user, self.user)
        self.assertEqual(report_pref.frequency, 1)
        self.assertTrue(report_pref.is_enabled)
        self.assertTrue(report_pref.include_insights)
        self.assertTrue(report_pref.include_category_distribution)
        self.assertTrue(report_pref.include_spending_trends)
        self.assertTrue(report_pref.include_monthly_summary)

    def test_notification_creation(self):
        """Test that notifications can be created"""
        notification = Notification.objects.create(
            user=self.user,
            title="Test Notification",
            message="This is a test notification",
            notification_type="system",
            status="unread",
        )

        self.assertEqual(notification.user, self.user)
        self.assertEqual(notification.title, "Test Notification")
        self.assertEqual(notification.message, "This is a test notification")
        self.assertEqual(notification.notification_type, "system")
        self.assertEqual(notification.status, "unread")
        self.assertFalse(notification.is_email_sent)


class TransactionAPITest(APITestCase):
    """Tests for the Transaction API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create a test category
        self.category = Category.objects.create(
            user=self.user,
            name="Test Category",
            description="Test Description",
            color="#FF5733",
            icon="test-icon",
        )

        # Create some test transactions
        self.expense = Transaction.objects.create(
            user=self.user,
            title="Test Expense",
            description="Test Description",
            transaction_fee=Decimal("1.50"),
            category=self.category,
            type="expense",
            amount=Decimal("100.00"),
            color="#FF5733",
        )

        self.income = Transaction.objects.create(
            user=self.user,
            title="Test Income",
            description="Test Income Description",
            transaction_fee=Decimal("0.00"),
            category=self.category,
            type="income",
            amount=Decimal("500.00"),
            color="#33FF57",
        )

        # URLs for API endpoints
        self.transaction_list_url = reverse("v1:transaction-list")
        self.transaction_detail_url = reverse(
            "v1:transaction-detail", args=[self.expense.id]
        )

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_get_transaction_list(self):
        """Test fetching all transactions"""
        response = self.client.get(self.transaction_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # We have 2 transactions

    def test_get_transaction_detail(self):
        """Test fetching a single transaction"""
        response = self.client.get(self.transaction_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Test Expense")
        self.assertEqual(response.data["amount"], "100.00")
        self.assertEqual(response.data["type"], "expense")

    def test_create_transaction(self):
        """Test creating a new transaction"""
        data = {
            "title": "New Transaction",
            "description": "New Description",
            "transaction_fee": "2.50",
            "category": self.category.id,
            "type": "expense",
            "amount": "150.00",
            "color": "#3366FF",
        }

        response = self.client.post(self.transaction_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the transaction was created
        self.assertEqual(Transaction.objects.count(), 3)
        new_transaction = Transaction.objects.get(title="New Transaction")
        self.assertEqual(new_transaction.amount, Decimal("150.00"))
        self.assertEqual(new_transaction.user, self.user)

    def test_update_transaction(self):
        """Test updating a transaction"""
        data = {
            "title": "Updated Expense",
            "description": "Updated Description",
            "transaction_fee": "1.50",
            "category": self.category.id,
            "type": "expense",
            "amount": "120.00",
            "color": "#FF5733",
        }

        response = self.client.put(self.transaction_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the transaction was updated
        self.expense.refresh_from_db()
        self.assertEqual(self.expense.title, "Updated Expense")
        self.assertEqual(self.expense.amount, Decimal("120.00"))

    def test_delete_transaction(self):
        """Test deleting a transaction"""
        response = self.client.delete(self.transaction_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Check that the transaction was deleted
        with self.assertRaises(Transaction.DoesNotExist):
            Transaction.objects.get(id=self.expense.id)

    def test_filter_by_type(self):
        """Test filtering transactions by type"""
        response = self.client.get(f"{self.transaction_list_url}?type=expense")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Expense")

        response = self.client.get(f"{self.transaction_list_url}?type=income")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Income")


class CategoryAPITest(APITestCase):
    """Tests for the Category API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create a test category
        self.category = Category.objects.create(
            user=self.user,
            name="Test Category",
            description="Test Description",
            color="#FF5733",
            icon="test-icon",
        )

        # URLs for API endpoints
        self.category_list_url = reverse("v1:category-list")
        self.category_detail_url = reverse(
            "v1:category-detail", args=[self.category.id]
        )

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_get_category_list(self):
        """Test fetching all categories"""
        response = self.client.get(self.category_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_category_detail(self):
        """Test fetching a single category"""
        response = self.client.get(self.category_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Test Category")
        self.assertEqual(response.data["color"], "#FF5733")

    def test_create_category(self):
        """Test creating a new category"""
        data = {
            "name": "New Category",
            "description": "New Description",
            "color": "#3366FF",
            "icon": "new-icon",
        }

        response = self.client.post(self.category_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the category was created
        self.assertEqual(Category.objects.count(), 2)
        new_category = Category.objects.get(name="New Category")
        self.assertEqual(new_category.color, "#3366FF")
        self.assertEqual(new_category.user, self.user)

    def test_update_category(self):
        """Test updating a category"""
        data = {
            "name": "Updated Category",
            "description": "Updated Description",
            "color": "#33FF57",
            "icon": "updated-icon",
        }

        response = self.client.put(self.category_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the category was updated
        self.category.refresh_from_db()
        self.assertEqual(self.category.name, "Updated Category")
        self.assertEqual(self.category.color, "#33FF57")

    def test_delete_category(self):
        """Test deleting a category"""
        response = self.client.delete(self.category_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Check that the category was deleted
        with self.assertRaises(Category.DoesNotExist):
            Category.objects.get(id=self.category.id)


class BudgetAPITest(APITestCase):
    """Tests for the Budget API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create a test category
        self.category = Category.objects.create(
            user=self.user,
            name="Test Category",
            description="Test Description",
            color="#FF5733",
            icon="test-icon",
        )

        # Create a test budget
        self.budget = Budget.objects.create(
            user=self.user,
            title="Monthly Budget",
            amount=Decimal("1000.00"),
            category=self.category,
            period="monthly",
            start_date=datetime.now().date(),
            end_date=(datetime.now() + timedelta(days=30)).date(),
            is_active=True,
        )

        # Create a transaction linked to the budget
        self.transaction = Transaction.objects.create(
            user=self.user,
            title="Test Expense",
            description="Test Description",
            transaction_fee=Decimal("1.50"),
            category=self.category,
            budget=self.budget,
            type="expense",
            amount=Decimal("100.00"),
            color="#FF5733",
        )

        # URLs for API endpoints
        self.budget_list_url = reverse("v1:budget-list")
        self.budget_detail_url = reverse("v1:budget-detail", args=[self.budget.id])
        self.budget_transactions_url = reverse(
            "v1:budget-transactions", args=[self.budget.id]
        )

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_get_budget_list(self):
        """Test fetching all budgets"""
        response = self.client.get(self.budget_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_budget_detail(self):
        """Test fetching a single budget"""
        response = self.client.get(self.budget_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Monthly Budget")
        self.assertEqual(response.data["amount"], "1000.00")

    def test_create_budget(self):
        """Test creating a new budget"""
        data = {
            "title": "New Budget",
            "amount": "1500.00",
            "category": self.category.id,
            "period": "weekly",
            "start_date": datetime.now().date().isoformat(),
            "end_date": (datetime.now() + timedelta(days=7)).date().isoformat(),
            "is_active": True,
        }

        response = self.client.post(self.budget_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check that the budget was created
        self.assertEqual(Budget.objects.count(), 2)
        new_budget = Budget.objects.get(title="New Budget")
        self.assertEqual(new_budget.amount, Decimal("1500.00"))
        self.assertEqual(new_budget.period, "weekly")
        self.assertEqual(new_budget.user, self.user)

    def test_update_budget(self):
        """Test updating a budget"""
        data = {
            "title": "Updated Budget",
            "amount": "1200.00",
            "category": self.category.id,
            "period": "monthly",
            "start_date": datetime.now().date().isoformat(),
            "end_date": (datetime.now() + timedelta(days=30)).date().isoformat(),
            "is_active": True,
        }

        response = self.client.put(self.budget_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the budget was updated
        self.budget.refresh_from_db()
        self.assertEqual(self.budget.title, "Updated Budget")
        self.assertEqual(self.budget.amount, Decimal("1200.00"))

    def test_delete_budget(self):
        """Test deleting a budget"""
        response = self.client.delete(self.budget_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        # Check that the budget was deleted
        with self.assertRaises(Budget.DoesNotExist):
            Budget.objects.get(id=self.budget.id)

    def test_get_budget_transactions(self):
        """Test getting transactions associated with a budget"""
        response = self.client.get(self.budget_transactions_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Test Expense")
        self.assertEqual(response.data[0]["amount"], "100.00")


class NotificationAPITest(APITestCase):
    """Tests for the Notification API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create some test notifications
        self.notification1 = Notification.objects.create(
            user=self.user,
            title="Test Notification 1",
            message="This is test notification 1",
            notification_type="system",
            status="unread",
        )

        self.notification2 = Notification.objects.create(
            user=self.user,
            title="Test Notification 2",
            message="This is test notification 2",
            notification_type="budget_alert",
            status="unread",
        )

        # URLs for API endpoints
        self.notification_url = reverse("notifications")
        self.notification_detail_url = reverse(
            "notification-detail", kwargs={"notification_id": self.notification1.id}
        )
        self.notification_count_url = reverse("notification-count")

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_get_notifications(self):
        """Test fetching all notifications"""
        response = self.client.get(self.notification_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_mark_notification_as_read(self):
        """Test marking a notification as read"""
        data = {"status": "read"}
        response = self.client.patch(self.notification_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the notification was updated
        self.notification1.refresh_from_db()
        self.assertEqual(self.notification1.status, "read")

    def test_get_notification_count(self):
        """Test getting the count of unread notifications"""
        response = self.client.get(self.notification_count_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["count"], 2)

        # Mark one notification as read
        self.notification1.status = "read"
        self.notification1.save()

        # Check count again
        response = self.client.get(self.notification_count_url)
        self.assertEqual(response.data["count"], 1)


class ReportAPITest(APITestCase):
    """Tests for the Report API endpoints"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )

        # Create report preferences
        self.report_pref = ReportPreference.objects.create(
            user=self.user,
            frequency=1,  # Monthly
            is_enabled=True,
            include_insights=True,
            include_category_distribution=True,
            include_spending_trends=True,
            include_monthly_summary=True,
        )

        # URLs for API endpoints
        self.report_preferences_url = reverse("report-preferences")
        self.generate_report_url = reverse("generate-report")

        # Authenticate the user
        self.client.force_authenticate(user=self.user)

    def test_get_report_preferences(self):
        """Test fetching report preferences"""
        response = self.client.get(self.report_preferences_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["frequency"], 1)
        self.assertTrue(response.data["is_enabled"])

    def test_update_report_preferences(self):
        """Test updating report preferences"""
        data = {
            "frequency": 3,  # Quarterly
            "is_enabled": True,
            "include_insights": False,
            "include_category_distribution": True,
            "include_spending_trends": True,
            "include_monthly_summary": False,
        }

        response = self.client.put(self.report_preferences_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the preferences were updated
        self.report_pref.refresh_from_db()
        self.assertEqual(self.report_pref.frequency, 3)
        self.assertFalse(self.report_pref.include_insights)
        self.assertFalse(self.report_pref.include_monthly_summary)
