from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.permissions import AuthenticateUser


class UpdateUserView(APIView):
    permission_classes = [AuthenticateUser]

    def post(self, request, *args, **kwargs):
        return Response("User updated successfully", status=status.HTTP_200_OK)


class DeleteAccountView(APIView):
    permission_classes = [AuthenticateUser]

    def post(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response("Account deleted successfully", status=status.HTTP_200_OK)


class GetCurrentUserView(APIView):
    permission_classes = [AuthenticateUser]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "name": user.name,
        }
        return Response(user_data, status=status.HTTP_200_OK)


class UploadAvatarView(APIView):
    permission_classes = [AuthenticateUser]

    def post(self, request, *args, **kwargs):
        user = request.user
        if "avatar" in request.FILES:
            user.avatar = request.FILES["avatar"]
            user.save()
            return Response("Avatar uploaded successfully", status=status.HTTP_200_OK)
        else:
            return Response(
                "No avatar file provided", status=status.HTTP_400_BAD_REQUEST
            )
