from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult

# one of the players touches the ball
class Touch:
    def __init__(self, player: int, fundamental: FundamentalType, outcome: TouchResult):
        self.player = player
        self.fundamental = fundamental
        self.outcome = outcome