from .views import *
from .models import *
from .serializers import *
from rest_framework.viewsets import ModelViewSet
from app.permissions import AuthenticateUser, IsOwnTransaction
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Q


class TransactionViewSet(ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser, IsOwnTransaction]

    def get_queryset(self):
        user = self.request.user
        queryset = Transaction.objects.filter(user=user)

        # Implement search
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        # Implement filtering by type (income/expense)
        transaction_type = self.request.query_params.get("type")
        if transaction_type:
            queryset = queryset.filter(type=transaction_type)

        # Implement filtering by date range
        start_date = self.request.query_params.get("start_date")
        end_date = self.request.query_params.get("end_date")
        if start_date:
            queryset = queryset.filter(date__gte=start_date)
        if end_date:
            queryset = queryset.filter(date__lte=end_date)

        # Implement filtering by category
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)

        # Implement sorting
        sort = self.request.query_params.get("sort")
        direction = self.request.query_params.get("direction", "desc")
        if sort:
            if direction == "desc":
                queryset = queryset.order_by(f"-{sort}")
            else:
                queryset = queryset.order_by(sort)

        return queryset


class CategoryViewSet(ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)


class BudgetViewSet(ModelViewSet):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user
        queryset = Budget.objects.filter(user=user)

        # Filter by status (active/inactive)
        status_filter = self.request.query_params.get("status")
        if status_filter:
            if status_filter.lower() == "active":
                queryset = queryset.filter(is_active=True)
            elif status_filter.lower() == "inactive":
                queryset = queryset.filter(is_active=False)

        # Filter by category
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category_id=category)

        # Filter by period
        period = self.request.query_params.get("period")
        if period:
            queryset = queryset.filter(period=period)

        # Search by title
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(title__icontains=search)

        return queryset

    @action(detail=True, methods=["get"])
    def transactions(self, request, pk=None):
        """
        Get all transactions related to a specific budget
        """
        budget = self.get_object()
        transactions = Transaction.objects.filter(budget=budget)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)


class UserCategoryViewSet(ModelViewSet):
    serializer_class = UserCategorySerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        return UserCategory.objects.filter(user=self.request.user)
