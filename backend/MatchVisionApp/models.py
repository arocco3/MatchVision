from django.utils import timezone
from django.db import models


# ROLE_CHOICES = [
#     ("SETTER", "Alzatore"),
#     ("OUTSIDE_HITTER", "Lato"),
#     ("MIDDLE_BLOCKER", "Centrale"),
#     ("OPPOSITE_HITTER", "Opposto"),
#     ("LIBERO", "Libero"),
# ]


class Player(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True, verbose_name="Nome")
    surname = models.CharField(max_length=100, null=True, blank=True, verbose_name="Cognome")
    number = models.PositiveIntegerField(null=True, blank=True, db_index=True, verbose_name="Numero")
    role = models.CharField(max_length=20, null=True, blank=True, verbose_name="Ruolo")

    class Meta:
        ordering = ["surname", "name"]
        verbose_name = "Giocatore"
        verbose_name_plural = "Giocatori"

    def __str__(self):
        full_name = f"{self.name or ''} {self.surname or ''}".strip()
        return f"{full_name})"


# EVENT_TYPE_CHOICES = [
#     ("TECHNICAL_TIMEOUT", "TimeOut tecnico"),
#     ("CHANGE", "Cambio"),
#     ("DOUBLE_CHANGE", "Doppio cambio"),
#     ("MEDICAL_CHANGE", "Cambio medico"),
#     ("YELLOW_CARD", "Cartellino giallo"),
#     ("RED_CARD", "Cartellino rosso"),
#     ("SCORED_POINT", "Punto generico eseguito"),
#     ("CONCEDED_POINT", "Punto generico subito"),
#     ("DOUBLE_FAULT", "Palla contesa")
# ]


class Event(models.Model):
    event_type = models.CharField(max_length=30, verbose_name="Tipo evento")

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventi"

    def __str__(self):
        return f"Evento: {self.get_event_type_display()}"


class Set(models.Model):
    match = models.ForeignKey('Match', related_name='sets', on_delete=models.CASCADE)
    number = models.PositiveIntegerField(verbose_name="Numero set")
    players = models.ManyToManyField(Player, related_name='sets', blank=True)
    home_score = models.PositiveIntegerField(default=0, verbose_name="Punteggio casa")
    guest_score = models.PositiveIntegerField(default=0, verbose_name="Punteggio ospite")

    class Meta:
        ordering = ["match", "number"]
        verbose_name = "Set"
        verbose_name_plural = "Set"

    def __str__(self):
        return f"Set {self.number} ({self.match.name})"


class Match(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome partita")
    timestamp = models.DateTimeField(default=timezone.now)
    teams = models.ManyToManyField('Team', related_name='matches')
    results = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ["-timestamp"]
        verbose_name = "Partita"
        verbose_name_plural = "Partite"

    def __str__(self):
        return f"Match: {self.name}"


class Team(models.Model):
    name = models.CharField(max_length=100, verbose_name="Nome squadra")
    playersList = models.ManyToManyField(Player, related_name='teams', blank=True)

    class Meta:
        verbose_name = "Squadra"
        verbose_name_plural = "Squadre"

    def __str__(self):
        return f"Team: {self.name}"


# FUNDAMENTAL_TYPE_CHOICES = [
#    ( "SERVE", "Servizio"),
#     ("SERVE_RECEIVE", "Ricezione"),
#     ("SET", "Alzata"),
#     ("ATTACK", "Attacco"),
#     ("BLOCK", "Muro"),
#     ("DEFENSE", "Difesa")
# ]

# TOUCH_RESULT_CHOICES = [
#     ("POSITIVA", "++"),
#     ("BUONA", "+"),
#     ("NEUTRA", "/"),
#     ("NEGATIVA", "-"),
#     ("ERRORE", "--")
# ]


class Touch(models.Model):
    set = models.ForeignKey('Set', on_delete=models.CASCADE, related_name='touches')
    player = models.ForeignKey('Player', on_delete=models.CASCADE, null=True, blank=True, related_name='touches')
    fundamental = models.CharField(max_length=15, verbose_name="Fondamentale")
    outcome = models.CharField(max_length=8, verbose_name="Esito")

    class Meta:
        verbose_name = "Tocco"
        verbose_name_plural = "Tocchi"

    def __str__(self):
        player_name = f"{self.player}" if self.player else "Sconosciuto"
        return f"{player_name} - {self.get_fundamental_display()} ({self.get_outcome_display()})"


class User(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=100)    
    surname = models.CharField(max_length=100)
    matches = models.ManyToManyField(Match, related_name='users')
    players = models.ManyToManyField(Player, related_name='users')
    teams = models.ManyToManyField(Team, related_name='users')