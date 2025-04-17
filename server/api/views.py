from .userViews import *
from rest_framework.viewsets import ModelViewSet
from .models import Transaction, Category, UserCategory
from .serializers import (
    TransactionSerializer,
    CategorySerializer,
    UserCategorySerializer,
)
from app.permissions import AuthenticateUser, IsOwnTransaction
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q


class TransactionViewSet(ModelViewSet):
    permission_classes = [AuthenticateUser, IsOwnTransaction]

    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryViewSet(ModelViewSet):
    permission_classes = [AuthenticateUser]

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        user = self.request.user
        user_categories = UserCategory.objects.filter(user=user).values_list(
            "category_id", flat=True
        )
        return self.queryset.filter(Q(id__in=user_categories) | Q(user=user)).distinct()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def perform_create(self, serializer):
        category = serializer.save()
        UserCategory.objects.create(user=self.request.user, category=category)

    @action(detail=True, methods=["post"])
    def share_with_user(self, request, pk=None):
        """Share a category with another user by username or email"""
        try:
            category = self.get_object()
            username_or_email = request.data.get("username_or_email")

            if not username_or_email:
                return Response(
                    {"error": "Username or email is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Find the user by username or email
            from django.db.models import Q
            from apiAuth.models import User

            try:
                target_user = User.objects.get(
                    Q(username__iexact=username_or_email)
                    | Q(email__iexact=username_or_email)
                )
            except User.DoesNotExist:
                return Response(
                    {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )

            # Check if already shared
            if UserCategory.objects.filter(
                user=target_user, category=category
            ).exists():
                return Response(
                    {"message": "Category already shared with this user"},
                    status=status.HTTP_200_OK,
                )

            # Create the association
            UserCategory.objects.create(user=target_user, category=category)

            return Response(
                {
                    "message": f"Category shared with {target_user.username} successfully"
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UserCategoryViewSet(ModelViewSet):
    permission_classes = [AuthenticateUser]
    serializer_class = UserCategorySerializer
    queryset = UserCategory.objects.all()

    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
