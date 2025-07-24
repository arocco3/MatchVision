from models import Player

class Team:
    def __init__(self, name, players: list[Player]):
        self.name = name
        self.players = players
        self.captain = None

    def  set_captain(self, k: Player):  #k stands for captain
        self.k = k