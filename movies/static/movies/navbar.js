document.addEventListener('DOMContentLoaded', ()=> {
    let mainNav = document.getElementById('js-menu');
    let navBarToggle = document.getElementById('js-navbar-toggle');
    let searchBtn = document.querySelector('.searchButton')
    
    navBarToggle.addEventListener('click', function () {
      mainNav.classList.toggle('active');
      document.querySelector('.searchBox').classList.toggle('responsive')
    });

    searchBtn.addEventListener('click', e=> { 
        if (document.querySelector('.searchText').value === ''){
            return false;
        }
        else {
            e.target.closest('form').submit();
        }
    });

});
