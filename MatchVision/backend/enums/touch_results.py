from enum import Enum

class TouchResult(Enum):
    POSITIVA = "++"
    BUONA = "+"
    NEUTRA = "/"
    NEGATIVA = "-"
    ERRORE = "--"
