from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import User
from django.utils import timezone


class UserModelTest(TestCase):
    def setUp(self):
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "securepassword123",
            "name": "Test User",
        }
        self.user = User.objects.create_user(
            username=self.user_data["username"],
            email=self.user_data["email"],
            password=self.user_data["password"],
            name=self.user_data["name"],
        )

    def test_user_creation(self):
        """Test that a user can be created"""
        self.assertEqual(self.user.username, self.user_data["username"])
        self.assertEqual(self.user.email, self.user_data["email"])
        self.assertEqual(self.user.name, self.user_data["name"])
        self.assertTrue(self.user.check_password(self.user_data["password"]))

    def test_user_verification_token(self):
        """Test that verification tokens can be set and validated"""
        token = "123456"
        self.user.verification_token = token
        self.user.verification_token_created_at = timezone.now()
        self.user.save()

        self.assertEqual(self.user.verification_token, token)
        self.assertIsNotNone(self.user.verification_token_created_at)

    def test_reset_password_token(self):
        """Test that password reset tokens can be set"""
        token = "123456"
        self.user.reset_password_token = token
        self.user.reset_password_token_created_at = timezone.now()
        self.user.save()

        self.assertEqual(self.user.reset_password_token, token)
        self.assertIsNotNone(self.user.reset_password_token_created_at)


class AuthAPITest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.login_url = reverse("login")
        self.logout_url = reverse("logout")

        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "securepassword123",
            "name": "Test User",
        }

        # Create a verified user for login tests
        self.verified_user = User.objects.create_user(
            username="verifieduser",
            email="verified@example.com",
            password="securepassword123",
            name="Verified User",
        )
        self.verified_user.is_email_verified = True
        self.verified_user.save()

    def test_user_registration(self):
        """Test user registration endpoint"""
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)  # Including our verified_user
        self.assertEqual(User.objects.get(username="testuser").is_email_verified, False)

    def test_duplicate_registration(self):
        """Test that duplicate registrations are prevented"""
        # Register first user
        self.client.post(self.register_url, self.user_data, format="json")

        # Try to register with same username
        duplicate_data = self.user_data.copy()
        duplicate_data["email"] = "another@example.com"
        response = self.client.post(self.register_url, duplicate_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

        # Try to register with same email
        duplicate_data = self.user_data.copy()
        duplicate_data["username"] = "anotheruser"
        response = self.client.post(self.register_url, duplicate_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_login_success(self):
        """Test successful login"""
        login_data = {"username": "verifieduser", "password": "securepassword123"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)

    def test_login_unverified_user(self):
        """Test that unverified users cannot login"""
        # Create unverified user
        User.objects.create_user(
            username="unverified",
            email="unverified@example.com",
            password="securepassword123",
        )

        login_data = {"username": "unverified", "password": "securepassword123"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertIn("needsVerification", response.data)

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        login_data = {"username": "verifieduser", "password": "wrongpassword"}
        response = self.client.post(self.login_url, login_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout(self):
        """Test logout functionality"""
        # First login
        login_data = {"username": "verifieduser", "password": "securepassword123"}
        login_response = self.client.post(self.login_url, login_data, format="json")

        # Then logout
        response = self.client.delete(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "User logged out successfully!")


class VerificationTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.verify_email_url = reverse("verify_email")
        self.send_verification_url = reverse("send_verification")

        # Create test user
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="securepassword123",
            name="Test User",
        )
        self.token = "123456"
        self.user.verification_token = self.token
        self.user.verification_token_created_at = timezone.now()
        self.user.save()

    def test_verify_email_success(self):
        """Test successful email verification"""
        verify_data = {"email": "test@example.com", "token": self.token}
        response = self.client.post(self.verify_email_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Reload user from database
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_email_verified)
        self.assertIsNone(self.user.verification_token)

    def test_verify_email_invalid_token(self):
        """Test verification with invalid token"""
        verify_data = {"email": "test@example.com", "token": "wrongtoken"}
        response = self.client.post(self.verify_email_url, verify_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Reload user from database
        self.user.refresh_from_db()
        self.assertFalse(self.user.is_email_verified)

    def test_send_verification_token(self):
        """Test sending verification token"""
        data = {"email": "test@example.com"}
        response = self.client.post(self.send_verification_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class PasswordResetTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.reset_password_email_url = reverse("password_reset_email")
        self.reset_password_url = reverse("password_reset")

        # Create test user
        self.user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="oldpassword123",
            name="Test User",
        )

    def test_send_password_reset_email(self):
        """Test sending password reset email"""
        data = {"email": "test@example.com"}
        response = self.client.post(self.reset_password_email_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify token was set
        self.user.refresh_from_db()
        self.assertIsNotNone(self.user.reset_password_token)
        self.assertIsNotNone(self.user.reset_password_token_created_at)

    def test_reset_password(self):
        """Test password reset"""
        # Set reset token
        token = "123456"
        self.user.reset_password_token = token
        self.user.reset_password_token_created_at = timezone.now()
        self.user.save()

        # Reset password
        reset_data = {
            "email": "test@example.com",
            "token": token,
            "password": "newpassword123",
        }
        response = self.client.post(self.reset_password_url, reset_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify password was changed
        self.user.refresh_from_db()
        self.assertIsNone(self.user.reset_password_token)
        self.assertTrue(self.user.check_password("newpassword123"))

    def test_reset_password_invalid_token(self):
        """Test password reset with invalid token"""
        # Set reset token
        self.user.reset_password_token = "123456"
        self.user.reset_password_token_created_at = timezone.now()
        self.user.save()

        # Try to reset with wrong token
        reset_data = {
            "email": "test@example.com",
            "token": "wrongtoken",
            "password": "newpassword123",
        }
        response = self.client.post(self.reset_password_url, reset_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # Verify password was not changed
        self.user.refresh_from_db()
        self.assertFalse(self.user.check_password("newpassword123"))
