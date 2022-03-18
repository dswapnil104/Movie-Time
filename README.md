# Movie Time

Movie Time is a responsive movie booking website written in Python and Javascript.
___

## Login/Register Page:
- Page for logging in.

![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/1.jpg)


- Register Page has a similar layout. 
- The **city select** input field options are generated from exsting cities inside the database.

![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/2.jpg)

## Index Page:

- Home page of the applicaton. 
- Top of the page has navbar which is available across the pages once logged in. 
- Bottom of the page has a section which displays 3 random movies from the database.

![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/3.jpg)

## Movies Page:

- Lists all the movie posters in the database in a Masonry Layout.
- Same page acts as a search results page for the search bar in the navbar above.
![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/4.jpg)

## Bookings Page:
- Lists all the bookings made by the user in a ticket styled layout. 
- The above section lists upcoming bookings while the bottom section books past bookings.
- Upcoming booking automatically gets shifted to past booking section once the show time has arrived.
![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/5.jpg)

## Movie Entry Page:
- Page belonging to each movie in the database.
- Displays the poster and the synopsis for the movie.
- Button below synopsis is used to make a booking.
![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/6.jpg)

## Movie Book/Seat Selection Page:
- Books seat for the movie whose page user visited.
- Consists of 3 select tabs on top.
- City tab selects the user's home city as default. Date default is current date and hall default is 'Any'.
- Changing any select tab automatically adds the list show entry to the table below (if any).
- Clicking on time link opens a modal where the user may select the seats.
- Upon selection the user is then taken to the Bookings Page where the details of the ticket are mentioned.
- Upon subsequent visits, the particular seat booked by the user becomes unclickable.
- Once the show reaches it's time, it automatically gets unlisted from future searches.

![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/7.jpg)
![image](https://github.com/AakashSehrawat95/MovieTime/blob/master/documents/8.jpg)

## Admin Responsibilities:
- Admins are responsible for creation of objects of type Cities, Theatres and Movies using the Django Admin Interface. 
- Creation of a theatre automatically creates 4 objects (2d, 3d, 4dx, imax) in Hall class having that theatre as forein key.
- Shows are what the user sees while booking a movie. Each show has its own set of seats in the form of a JSONField which are automatically generated during object creation.
