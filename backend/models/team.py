from models.player import Player

class Team:
    def __init__(self, name, players: list[Player]):
        self.name = name
        self.players = players