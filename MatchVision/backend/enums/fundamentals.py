from enum import Enum

class FundamentalType(Enum):
    SERVE = "Servizio"
    SERVE_RECEIVE = "Ricezione"
    SET = "Alzata"
    ATTACK = "Attacco"
    BLOCK = "Muro"
    DEFENSE = "Difesa"