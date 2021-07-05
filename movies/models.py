from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import JSONField
from django.utils.timezone import localtime
from django.db import models
from django.db.models.signals import post_save, post_delete
from datetime import date
import datetime as dt

class City(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"[{self.name}]"

class User(AbstractUser):
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True)
    pass

class Theatre(models.Model):
    name = models.CharField(max_length=30)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    def __str__(self):
        return f"[{self.name}] - {self.city}"

class Hall(models.Model):

    HALL_TYPES = [
    ('2D', '2D'),
    ('3D', '3D'),
    ('4DX', '4DX'),
    ('IMAX', 'IMAX'),
    ]

    name = models.CharField(max_length=30)
    hall_type = models.CharField(max_length=4, choices=HALL_TYPES)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)


    def __str__(self):
        return f"[{self.name} |{self.hall_type}] - {self.theatre}"

class Movie(models.Model):
    name = models.CharField(max_length=30)
    poster = models.URLField(max_length=500)
    about = models.CharField(max_length=500)

    def __str__(self):
        return f"{self.name}"


def emptyAllSeats():
    seat_rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    seatDict = {}
    number = {}
    seat_rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

    for row in seat_rows:
        for seatNumber in range(1, 9):
            number[seatNumber] = 'Vacant'

        seatDict[row] = number

    return seatDict

class Show(models.Model):

    HOUR_CHOICES = [(dt.time(hour=x), f'{y}') for x,y in [ (9, '9:00 AM'), (12, '12:00 PM'), (15, '3:00 PM'), (18, '6:00 PM'), (21, '9:00 PM')]]

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    seats = models.JSONField(default=emptyAllSeats())
    date = models.DateField()
    time = models.TimeField(choices=HOUR_CHOICES)
    rate = models.IntegerField()

    def serialize(self):
        return {
            "id": self.id,
            "theatre": self.hall.theatre.name,
            "seats": self.seats,
            "hall_type": self.hall.hall_type,
            "date": self.date,
            "date_display": self.date.strftime('%d %b, %Y'),
            "today": date.today(),
            "time": self.time,
            "time_display": self.get_time_display(),
            "current_time": localtime().time(),
            "rate": self.rate
        }
    
    def __str__(self):
        return f"[{self.movie}] - [ {self.get_time_display()} | {self.date.strftime('%d %B, %Y')} ]"

    class Meta:
        unique_together = ['hall', 'date', 'time']

    def is_past_due(self):
        return date.today() > self.date

    def is_same_day(self):
        return date.today() == self.date

    def is_days_ahead(self):
        return date.today() < self.date

def createTheater(sender, instance, **kwargs):
    hall_types = [{'2D':'Hall 1'}, {'3D':'Hall 2'}, {'4DX':'Hall 3'}, {'IMAX':'Hall 4'}]

    for entry in hall_types:
        for (key,value) in entry.items():
            Hall.objects.create(name=value, hall_type=key, theatre=instance)

post_save.connect(createTheater, sender=Theatre)

class Ticket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    seat = models.JSONField()
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    cost = models.IntegerField()

    def __str__(self):
        return f"[{self.user}] - {self.seat} - {self.show}"

def deleteTicket(sender, instance, **kwargs):
    currentShow = Show.objects.get(pk=instance.show.id)
    currentShow.seats = emptyAllSeats()
    currentShow.save()

post_delete.connect(deleteTicket, sender=Ticket)