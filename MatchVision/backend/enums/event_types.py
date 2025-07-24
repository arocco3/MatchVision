from enum import Enum

class EventType(Enum):  #event types that can occur during a match
    TECHNICAL_TIMEOUT = "TimeOut tecnico"
    CHANGE = "Cambio"
    DOUBLE_CHANGE = "Doppio cambio"
    MEDICAL_CHANGE = "Cambio medico"
    YELLOW_CARD = "Cartellino giallo"
    RED_CARD = "Cartellino rosso"
    SCORED_POINT = "Punto generico eseguito"
    CONCEDED_POINT = "Punto generico subito"
    DOUBLE_FAULT = "Palla contesa"
