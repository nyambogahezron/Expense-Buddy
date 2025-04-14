from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TransactionViewSet, CategoryViewSet, UserCategoryViewSet
from api.analyticsViews import (
    TransactionAnalyticsView,
    MonthlySummaryView,
    CategoryDistributionView,
    SpendingTrendsView,
    BudgetAnalysisView,
    TransactionInsightsView,
)
from api.adminViews import (
    AdminDashboardView,
    AdminUserListView,
    AdminUserDetailView,
    AdminUserBulkEmailView,
    AdminPerformanceView,
    AdminUserActivityView,
    AdminSettingsView,
    AdminExportDataView,
)
from api.reportViews import ReportPreferenceView, GenerateReportView
from django.http import JsonResponse


def custom_404_handler(request, exception):
    return JsonResponse(
        {"error": True, "message": "The requested resource was not found."}, status=404
    )


router = DefaultRouter()
router.register(r"transaction", TransactionViewSet, basename="transaction")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"user-categories", UserCategoryViewSet, basename="user-category")

urlpatterns = [
    path("api/v1/", include((router.urls, "api"), namespace="v1")),
    path("api/v1/auth/", include("apiAuth.urls")),
    # Analytics endpoints
    path("api/v1/analytics/", TransactionAnalyticsView.as_view(), name="analytics"),
    path(
        "api/v1/analytics/monthly-summary/",
        MonthlySummaryView.as_view(),
        name="monthly-summary",
    ),
    path(
        "api/v1/analytics/category-distribution/",
        CategoryDistributionView.as_view(),
        name="category-distribution",
    ),
    path(
        "api/v1/analytics/spending-trends/",
        SpendingTrendsView.as_view(),
        name="spending-trends",
    ),
    path(
        "api/v1/analytics/budget-analysis/",
        BudgetAnalysisView.as_view(),
        name="budget-analysis",
    ),
    path(
        "api/v1/analytics/transaction-insights/",
        TransactionInsightsView.as_view(),
        name="transaction-insights",
    ),
    # Report endpoints
    path(
        "api/v1/reports/preferences/",
        ReportPreferenceView.as_view(),
        name="report-preferences",
    ),
    path(
        "api/v1/reports/generate/",
        GenerateReportView.as_view(),
        name="generate-report",
    ),
    # Admin endpoints
    path(
        "api/v1/admin/dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard",
    ),
    path(
        "api/v1/admin/users/",
        AdminUserListView.as_view(),
        name="admin-users",
    ),
    path(
        "api/v1/admin/users/<int:user_id>/",
        AdminUserDetailView.as_view(),
        name="admin-user-detail",
    ),
    path(
        "api/v1/admin/email/",
        AdminUserBulkEmailView.as_view(),
        name="admin-bulk-email",
    ),
    path(
        "api/v1/admin/performance/",
        AdminPerformanceView.as_view(),
        name="admin-performance",
    ),
    path(
        "api/v1/admin/user-activity/",
        AdminUserActivityView.as_view(),
        name="admin-user-activity",
    ),
    path(
        "api/v1/admin/settings/",
        AdminSettingsView.as_view(),
        name="admin-settings",
    ),
    path(
        "api/v1/admin/export/",
        AdminExportDataView.as_view(),
        name="admin-export",
    ),
    path("admin/", admin.site.urls),
]

handler404 = "app.urls.custom_404_handler"
