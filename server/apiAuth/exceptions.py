from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom exception handler to format all errors as JSON responses.
    """
    # Call DRF's default exception handler first
    response = exception_handler(exc, context)

    if response is not None:
        # Customize the response data
        response.data = {
            "error": True,
            "message": (
                response.data.get("detail", str(exc))
                if "detail" in response.data
                else response.data
            ),
        }

    # Handle non-DRF exceptions (fallback)
    else:
        response = Response(
            {
                "error": True,
                "message": "An unexpected error occurred. Please try again later.",
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return response
