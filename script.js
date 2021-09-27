var APIKey = "1c2d55e5ab4bd47916f6287ef9d3e643";
var city="";
var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + APIKey;
var searchedCity = document.getElementById('searchedCity');
var searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click',currentWeather);


/*function displayWeather(event){
    event.preventDefault();
    if(searchedCity.val().trim()!==""){
        city= searchedCity.val().trim();
        currentWeather(city);
    }
}*/

function currentWeather(city){
    $.ajax({
        url: queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);

    });
}

