from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult

# one of the players touches the ball
class Touch:
    def __init__(self, set_number, fundamental: FundamentalType, outcome: TouchResult):
        self.set_number = set_number
        self.match_id = None
        self.player_id = None
        self.fundamental = fundamental
        self.outcome = outcome