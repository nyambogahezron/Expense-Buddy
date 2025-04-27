from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from ..models import ShoppingList, ShoppingItem
from ..serializers import ShoppingListSerializer, ShoppingItemSerializer
from app.permissions import AuthenticateUser
from django.db.models import Sum, F, Q, Count
from django.shortcuts import get_object_or_404
from decimal import Decimal


class ShoppingListViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling shopping list operations
    """

    serializer_class = ShoppingListSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user
        queryset = ShoppingList.objects.filter(user=user)

        # Filter by status (completed/active)
        status_filter = self.request.query_params.get("status")
        if status_filter:
            if status_filter.lower() == "completed":
                queryset = queryset.filter(is_completed=True)
            elif status_filter.lower() == "active":
                queryset = queryset.filter(is_completed=False)

        # Filter by due date
        due_date_filter = self.request.query_params.get("due_date")
        if due_date_filter:
            queryset = queryset.filter(due_date=due_date_filter)

        # Search by title
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def mark_completed(self, request, pk=None):
        shopping_list = self.get_object()
        shopping_list.is_completed = True
        shopping_list.save()
        return Response(
            {"status": "success", "message": "Shopping list marked as completed"}
        )

    @action(detail=True, methods=["post"])
    def mark_active(self, request, pk=None):
        shopping_list = self.get_object()
        shopping_list.is_completed = False
        shopping_list.save()
        return Response(
            {"status": "success", "message": "Shopping list marked as active"}
        )


class ShoppingItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling shopping item operations
    """

    serializer_class = ShoppingItemSerializer
    permission_classes = [IsAuthenticated, AuthenticateUser]

    def get_queryset(self):
        user = self.request.user

        # Filter by shopping list if provided
        shopping_list_id = self.request.query_params.get("shopping_list")
        if shopping_list_id:
            return ShoppingItem.objects.filter(
                shopping_list_id=shopping_list_id, shopping_list__user=user
            )

        # Filter by purchased status if provided
        purchased_filter = self.request.query_params.get("purchased")
        queryset = ShoppingItem.objects.filter(shopping_list__user=user)

        if purchased_filter is not None:
            is_purchased = purchased_filter.lower() == "true"
            queryset = queryset.filter(is_purchased=is_purchased)

        # Search by name
        search = self.request.query_params.get("search")
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) | Q(notes__icontains=search)
            )

        return queryset

    def perform_create(self, serializer):
        # Verify that the shopping list belongs to the current user
        shopping_list_id = self.request.data.get("shopping_list")
        shopping_list = get_object_or_404(
            ShoppingList, id=shopping_list_id, user=self.request.user
        )
        serializer.save()

    @action(detail=True, methods=["post"])
    def toggle_purchased(self, request, pk=None):
        item = self.get_object()
        item.is_purchased = not item.is_purchased
        item.save()

        status_message = "purchased" if item.is_purchased else "unpurchased"
        return Response(
            {
                "status": "success",
                "message": f"Item marked as {status_message}",
                "is_purchased": item.is_purchased,
            }
        )

    @action(detail=False, methods=["post"])
    def bulk_toggle(self, request):
        item_ids = request.data.get("item_ids", [])
        purchased = request.data.get("purchased", True)

        # Verify all items belong to the user's shopping lists
        items = ShoppingItem.objects.filter(
            id__in=item_ids, shopping_list__user=request.user
        )

        # Update the items
        updated_count = items.update(is_purchased=purchased)

        status_message = "purchased" if purchased else "unpurchased"
        return Response(
            {
                "status": "success",
                "message": f"{updated_count} items marked as {status_message}",
            }
        )
