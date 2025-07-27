from models.event import Event
from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult
from models.touch import Touch
from models.player import Player

class Set:
    def __init__(self, match_id, set_number: int, players: list[Player]):
        self.match_id = match_id
        self.set_number = set_number
        self.players = players
        self.touches = [Touch]
        self.events = [Event]
        self.home_score = 0
        self.guest_score = 0
        self.rotation = []  #da definire

    def register_touch(self, touch: Touch, player: Player):# da aggiungere ancora il tocco nell'elenco dei tocchi del giocatore
        self.touches.append(touch)
        if touch.outcome == TouchResult.POSITIVA:
            self.home_score += 1
        elif touch.outcome == TouchResult.NEGATIVA:
            self.guest_score += 1

           # e altre casistiche 


    def delete_last_action(self): # deletes all the registrations till the last serve
        while self.touches:
            last_touch = self.touches.pop()
            if last_touch.fundamental == FundamentalType.SERVE:
                break


    def register_event(self, event: Event):
        # modifica i contatori dei cartellini, punti generici ecc

        if event == Event.DOUBLE_FAULT:
            self.delete_last_action()

    
    #def do_rotation(self) #animazione rotazione