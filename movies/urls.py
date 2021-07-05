from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),
    path('logout_view', views.logout_view, name='logout'),
    path('register/', views.register, name="register"),
    path('index/', views.index, name='index'),
    path('movie/<str:movieName>', views.moviePage, name="moviePage"),
    path('book_tickets/<str:movieName>', views.bookTicket, name="book_seat"),
    path('search/', views.search, name='search'),
    path('results/<str:query>', views.results, name='results'),
    path('error/', views.error, name="error"),
    path('shows/<str:movie>/<str:city>/<str:day>/<str:hall>', views.shows, name="shows"),
    path('seats/<int:show>', views.seats, name="seats"),
    path('ticket', views.ticket, name="ticket"),
    path('tickets', views.allTickets, name="allTickets"),
    path('movies', views.allMovies, name="allMovies")
]