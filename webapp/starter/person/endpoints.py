from django.core.serializers import json

from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, renderer_classes, authentication_classes
from rest_framework.renderers import JSONRenderer, BaseRenderer
from rest_framework.response import Response

from .models import Person
from .serializers import PersonListSerializer


@api_view(['GET', 'POST'])
@renderer_classes((JSONRenderer,))
@authentication_classes((TokenAuthentication,))
def people_list(request, format=json):
    """
        List all people, or create a new person.
            /api/v1/people
            :param request: http request
    """
    # filter campaign by account
    #if request.user and not request.user.is_anonymous():
    people = Person.objects.all().order_by('-last_name')
    print("------------------ HELLO -------------------")
    if request.method == 'GET':
        print("------------------ GET -------------------")
        serializer = PersonListSerializer(people, many=True)
        print("------------------ SERIALIZE -------------------")
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PersonListSerializer(data=request.data)
        if serializer.validate(data=request.data) and serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #else:
    #    return Response(status=status.HTTP_401_UNAUTHORIZED)