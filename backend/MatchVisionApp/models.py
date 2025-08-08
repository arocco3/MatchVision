from django.utils import timezone
from django.db import models

class Role(models.TextChoices):
    SETTER = "Alzatore"
    OUTSIDE_HITTER = "Lato"
    MIDDLE_BLOCKER = "Centrale"
    OPPOSITE_HITTER = "Opposto"
    LIBERO = "Libero"


class Player(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True, verbose_name="Nome")
    surname = models.CharField(max_length=100, null=True, blank=True, verbose_name="Cognome")
    number = models.PositiveIntegerField(null=True, blank=True, db_index=True, verbose_name="Numero")
    role = models.CharField(max_length=20, choices=Role.choices, null=True, blank=True, verbose_name="Ruolo")

    class Meta:
        ordering = ["surname", "name"]
        verbose_name = "Giocatore"
        verbose_name_plural = "Giocatori"

    def __str__(self):
        full_name = f"{self.name or ''} {self.surname or ''}".strip()
        role_display = self.get_role_display() if self.role else "Senza ruolo"
        return f"{full_name} ({role_display})"


class EventType(models.TextChoices):
    TECHNICAL_TIMEOUT = "TimeOut tecnico", "Time-out tecnico"
    CHANGE = "Cambio", "Cambio"
    DOUBLE_CHANGE = "Doppio cambio", "Doppio cambio"
    MEDICAL_CHANGE = "Cambio medico", "Cambio medico"
    YELLOW_CARD = "Cartellino giallo", "Cartellino giallo"
    RED_CARD = "Cartellino rosso", "Cartellino rosso"
    SCORED_POINT = "Punto generico eseguito", "Punto eseguito"
    CONCEDED_POINT = "Punto generico subito", "Punto subito"
    DOUBLE_FAULT = "Palla contesa", "Palla contesa"


class Event(models.Model):
    event_type = models.CharField(
        max_length=30,
        choices=EventType.choices,
        verbose_name="Tipo evento"
    )

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventi"

    def __str__(self):
        return f"Evento: {self.get_event_type_display()}"


class Match(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome partita")
    ts = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-ts"]
        verbose_name = "Partita"
        verbose_name_plural = "Partite"

    def __str__(self):
        return f"Match: {self.name}"


class Set(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="sets")
    number = models.PositiveIntegerField(verbose_name="Numero set")
    home_score = models.PositiveIntegerField(default=0, verbose_name="Punteggio casa")
    guest_score = models.PositiveIntegerField(default=0, verbose_name="Punteggio ospite")

    class Meta:
        ordering = ["match", "number"]
        verbose_name = "Set"
        verbose_name_plural = "Set"

    def __str__(self):
        return f"Set {self.number} ({self.match.name})"


class Team(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome squadra")
    players = models.ManyToManyField('Player', related_name='teams', blank=True)

    class Meta:
        verbose_name = "Squadra"
        verbose_name_plural = "Squadre"

    def __str__(self):
        return f"Team: {self.name}"


class FundamentalType(models.TextChoices):
    SERVE = "Servizio"
    SERVE_RECEIVE = "Ricezione"
    SET = "Alzata"
    ATTACK = "Attacco"
    BLOCK = "Muro"
    DEFENSE = "Difesa"


class TouchResult(models.TextChoices):
    POSITIVA = "++"
    BUONA = "+"
    NEUTRA = "/"
    NEGATIVA = "-"
    ERRORE = "--"


class Touch(models.Model):
    set = models.ForeignKey('Set', on_delete=models.CASCADE, related_name='touches')
    player = models.ForeignKey('Player', on_delete=models.CASCADE, null=True, blank=True, related_name='touches')
    fundamental = models.CharField(max_length=15, choices=FundamentalType.choices, verbose_name="Fondamentale")
    outcome = models.CharField(max_length=5, choices=TouchResult.choices, verbose_name="Esito")

    class Meta:
        verbose_name = "Tocco"
        verbose_name_plural = "Tocchi"

    def __str__(self):
        player_name = f"{self.player}" if self.player else "Sconosciuto"
        return f"{player_name} - {self.get_fundamental_display()} ({self.get_outcome_display()})"
