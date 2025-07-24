from enums.event_types import EventType
from enums.fundamentals import FundamentalType
from enums.touch_results import TouchResult
from models.touch import Touch

class Set:
    def __init__(self, number: int):
        self.number = number
        self.touches = []
        self.events = []
        self.home_score = 0
        self.guest_score = 0
        self.rotation = []

    def register_action(self, touch: Touch):# da aggiungere ancora il tocco nell'elenco dei tocchi del giocatore
        self.touches.append(touch)
        if touch.outcome == TouchResult.POSITIVA:
            self.home_score += 1
        elif touch.outcome == TouchResult.NEGATIVA:
            self.guest_score += 1


    def delete_entire_action(self): # deletes all the registrations till the last serve
        while True:
            last_touch = self.touches.pop()
            if last_touch.fundamental == FundamentalType.SERVE:
                break


    def register_event(self, event: EventType):
        # modifica i contatori dei cartellini ecc

        if event == EventType.DOUBLE_FAULT:
            delete_entire_action(self)

    
    def do_rotation(self) #animazione rotazione