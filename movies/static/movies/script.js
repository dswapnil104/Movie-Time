document.addEventListener('DOMContentLoaded', ()=>{

  var movie = document.getElementById('movieName').innerHTML;
  var city = document.getElementById('cities').value;
  var day = document.getElementById('daySelect').value;
  var hall = document.getElementById('hallSelect').value;
  cost = 0;
 
  fetch(`/shows/${movie}/${city}/${day}/${hall}`)
  .then(response => response.json())
  .then(shows => {
    var i = 0;
    shows.forEach(function(show) {
        if (show.date > show.today) {
          document.querySelectorAll('.book')[i].href = `javascript:openModal(${show.id}, ${show.rate})`;
          i++;
          }
        else if (show.date == show.today && show.time > show.current_time) {
          document.querySelectorAll('.book')[i].href = `javascript:openModal(${show.id}, ${show.rate})`;
          i++;
        }
        else {
        }
      });
    });


  document.querySelectorAll('.changeIsGood').forEach(item => {
    item.addEventListener('change', event => {
      
      var movie = document.getElementById('movieName').innerHTML;
      var city = document.getElementById('cities').value;
      var day = document.getElementById('daySelect').value;
      var hall = document.getElementById('hallSelect').value;

      fetch(`/shows/${movie}/${city}/${day}/${hall}`)
      .then(response => response.json())
      .then(shows => {
        var table = document.getElementById("showList");
        document.querySelectorAll('.showData').forEach(function(a){
          a.remove()
          });
        shows.forEach(function(show) {

          if (show.date > show.today) {

            var row = table.insertRow();
            row.className = 'showData'
        
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            var a = document.createElement('a');
            var link = document.createTextNode(show.time_display);  
            a.appendChild(link);  
            a.title = show.time_display;
            a.className = 'book'
            a.href = `javascript:openModal(${show.id}, ${show.rate})`;

            cell1.innerHTML = show.theatre;
            cell2.innerHTML = `${show.rate} Rs/-`;
            cell3.innerHTML = show.hall_type;
            cell4.appendChild(a)
            cell5.innerHTML = show.date_display;
          }

          else if (show.date == show.today && show.time > show.current_time) {
            var row = table.insertRow();
            row.className = 'showData'
        
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            var a = document.createElement('a');
            var link = document.createTextNode(show.time_display);  
            a.appendChild(link);  
            a.title = show.time_display;
            a.className = 'book'
            a.href = `javascript:openModal(${show.id}, ${show.rate})`;

            cell1.innerHTML = show.theatre;
            cell2.innerHTML = `${show.rate} Rs/-`;
            cell3.innerHTML = show.hall_type;
            cell4.appendChild(a)
            cell5.innerHTML = show.date_display;
          }
        });
      });
    });
  });

  window.addEventListener('click', clickOutside);
    
  function clickOutside(e) {
    if(e.target == document.getElementById('simpleModal')) {
      document.getElementById('simpleModal').style.display = 'none';
      document.getElementById('total_seats').innerHTML = `Seats Selected: 0`
      document.getElementById('total_cost').innerHTML = `Total Cost: 0`
      
    }
  }

  document.querySelector('.container').addEventListener('click', e => {
    if ( e.target.classList.contains('seat') && !e.target.classList.contains('occupied') ) {
      e.target.classList.toggle('selected');
      var seatNumber = document.querySelectorAll('.container > .row > .selected');

      var totalSeatCost = seatNumber.length * cost;
      document.getElementById('total_seats').innerHTML = `Seats Selected: ${seatNumber.length}`
      document.getElementById('total_cost').innerHTML = `Total Cost: ${totalSeatCost} Rs/-`
      if (seatNumber.length > 0){
        document.getElementById('processRequest').disabled = false
      }

      else{
        document.getElementById('processRequest').disabled = true
      }
    }
  });
});

function openModal(show, rate){
  cost = rate;
  document.getElementById('simpleModal').style.display = 'flex';

  fetch(`/seats/${show}`)
    .then(response => response.json())
    .then(seats => {

      document.querySelectorAll('.container > .row').forEach(function(a){
        a.remove();
        });

      for ([seatRow, seatsList] of Object.entries(seats)) {
        var row = document.createElement("div");
        row.classList.add("row");
        row.classList.add(`${seatRow}`);

        var container = document.querySelector(".container");
        container.appendChild(row);

        for ([number, vacancy] of Object.entries(seatsList)) {
          var seat = document.createElement("div");
          seat.classList.add("seat");
          seat.classList.add(`${number}`);
          if (`${vacancy}` == 'Occupied') {
            seat.classList.add('occupied');
          }

          row.appendChild(seat);
        }
      }
    });
      
    document.getElementById('bookTicketDiv').addEventListener('submit', ()=>{
      var seatList = new Array();
      document.querySelectorAll('.container > .row > .selected').forEach(function(a){
        seatList.push(`${a.parentElement.classList.item(1)}${a.classList.item(1)}`);
        });
    
      fetch(`/ticket`, {
        method: 'POST',
        body: JSON.stringify({
            show: show,
            seatList: seatList
        })
      })
    });
  }