from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
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
        return response

    # Handle non-DRF exceptions (fallback)
    else:
        data = {
            "error": True,
            "message": "An unexpected error occurred. Please try again later.",
        }
        return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
