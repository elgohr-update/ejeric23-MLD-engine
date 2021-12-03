from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import User
from rest_framework.response import Response
from rest_framework import status

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'


# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # @APIView('GET')
    # def current_user(request):
    #     user = request.user
    #     return Response({
    #         'username': user.username,
    # })

    def get(self, request, *args, **kwargs):
        walletAddress = request.query_params['walletAddress']
        # find the user
        user = User.objects.get(walletAddress=walletAddress)

        

        return UserView.objects.get(walletAddress=user.walletAddress)

    def api_update_user(request, slug):

        try:
            user = UserView.objects.get(slug=slug)
        except UserView.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'OPTIONS':
            serializer = UserSerializer(user, data=request.data)
            print(request.data, ",,,")
            data = {}
            if serializer.is_valid():
                serializer.save()
                data[SUCCESS] = UPDATE_SUCCESS
                return Response(data=data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
