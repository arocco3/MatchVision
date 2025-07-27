from enums.event_types import EventType

#cartellini, timeout,....
class Event:
    def __init__(self, event_type: EventType):
        self.event_type = event_type