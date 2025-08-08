from rest_framework import serializers
from MatchVisionApp.models import Player, Match, Event, Set, Team, Touch

class PlayerSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source="get_role_display", read_only=True)

    class Meta:
        model = Player
        fields = ["id", "name", "surname", "number", "role", "role_display"]


class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ["id", "name", "players"]


class EventSerializer(serializers.ModelSerializer):
    event_type_display = serializers.CharField(source="get_event_type_display", read_only=True)

    class Meta:
        model = Event
        fields = ["id", "event_type", "event_type_display"]


class TouchSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    fundamental_display = serializers.CharField(source="get_fundamental_display", read_only=True)
    outcome_display = serializers.CharField(source="get_outcome_display", read_only=True)

    class Meta:
        model = Touch
        fields = [
            "id", "set", "player", "fundamental", "fundamental_display", "outcome", "outcome_display"]


class SetSerializer(serializers.ModelSerializer):
    touches = TouchSerializer(many=True, read_only=True)

    class Meta:
        model = Set
        fields = ["id", "match", "number", "home_score", "guest_score", "touches"]


class MatchSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = ["id", "name", "created_at", "sets"]
