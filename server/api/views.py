from .userViews import *
from rest_framework.viewsets import ModelViewSet
from .models import Transaction, Category
from .serializers import TransactionSerializer, CategorySerializer
from app.permissions import AuthenticateUser, IsOwnTransaction


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
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        # Automatically associate the category with the authenticated user
        serializer.save(user=self.request.user)
