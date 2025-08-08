from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from django.http.multipartparser import JSONParser

from .models import Player, Team, Match, Set, Touch, Event
from .serializers import (PlayerSerializer, TeamSerializer, MatchSerializer, SetSerializer, TouchSerializer, EventSerializer)

@csrf_exempt
def playerAPI(request, id):
    if request.method == 'GET':
        players = Player.objects.all()
        players_serializer = PlayerSerializer(players, many = True)
        return JsonResponse(players_serializer.data, safe = False)
    
    elif request.method == 'POST':
        player_data = JSONParser().parse(request)
        players_serializer = PlayerSerializer(data = player_data, )
        if players_serializer.is_valid():
            players_serializer.save()
            return JsonResponse("Added successfully", safe = False)
        return JsonResponse("Failed to add", safe = False)
    
    elif request.method == 'PUT':
        player_data = JSONParser().parse(request)
        player = Player.objects.get(playerID = player_data['id'])
        players_serializer = PlayerSerializer(player, data = player_data)
        if players_serializer.is_valid():
            players_serializer.save()
            return JsonResponse("Update successfully", safe = False)
        return JsonResponse("Failed to update")
    
    elif request.method == "DELETE":
        Player.objects.get(playerID = id).delete()
        return JsonResponse("Deleted successfully", safe = False)