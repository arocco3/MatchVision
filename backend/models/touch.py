from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult

# one of the players touches the ball
class Touch:
    def __init__(self, id_player, fundamental: FundamentalType, outcome: TouchResult):
        self.id_player = id_player
        self.fundamental = fundamental
        self.outcome = outcome