from rest_framework import serializers
from MatchVisionApp.models import Player, Match, Event, Set, Team, Touch, User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    role_display = serializers.CharField(source="get_role_display", read_only=True)

    class Meta:
        model = Player
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    playersList = serializers.PrimaryKeyRelatedField(
        queryset=Player.objects.all(), many=True, write_only=True
    )
    players = PlayerSerializer(many=True, read_only=True, source='playersList')

    class Meta:
        model = Team
        fields = ['id', 'name', 'playersList', 'players']




class EventSerializer(serializers.ModelSerializer):
    event_type_display = serializers.CharField(source="get_event_type_display", read_only=True)

    class Meta:
        model = Event
        fields = '__all__'


class TouchSerializer(serializers.ModelSerializer):
    player = PlayerSerializer(read_only=True)
    fundamental_display = serializers.CharField(source="get_fundamental_display", read_only=True)
    outcome_display = serializers.CharField(source="get_outcome_display", read_only=True)

    class Meta:
        model = Touch
        fields = '__all__'


class SetSerializer(serializers.ModelSerializer):
    touches = TouchSerializer(many=True, read_only=True)

    class Meta:
        model = Set
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True, read_only=True)

    class Meta:
        model = Match
        fields = '__all__'
