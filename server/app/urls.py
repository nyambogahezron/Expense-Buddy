from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TransactionViewSet, CategoryViewSet
from django.http import JsonResponse


def custom_404_handler(request, exception):
    return JsonResponse(
        {"error": True, "message": "The requested resource was not found."}, status=404
    )


router = DefaultRouter()
router.register(r"transaction", TransactionViewSet, basename="transaction")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("api/v1/", include((router.urls, "api"), namespace="v1")),
    path("api/v1/auth/", include("apiAuth.urls")),
    path("admin/", admin.site.urls),
]

handler404 = "app.urls.custom_404_handler"
