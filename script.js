var APIKey = "1c2d55e5ab4bd47916f6287ef9d3e643";
var currentTemp = $('#temp');
var currentWind = $('#wind');
var currentHumid = $('#humid');
var lon;
var lat;
var currentUv = $('#uv');
var currentCity = $('#currentCity');
var searchedCity = $("#searchedCity");
var searchButton = $('#searchButton');
searchButton.on('click',function(){
    
    var city= $("#searchedCity").val();
    if(city !== null){
        localStorage.setItem("city", city)
    }
    currentWeather();
});


function displayWeather(event){
    event.preventDefault();
    if(searchedCity.val().trim()!==""){
        city= searchedCity.val().trim();
        currentWeather(city);
    }
}

function currentWeather(){
    var city = localStorage.getItem("city");
    var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);

        var weathericon= response.weather[0].icon;
        var iconURL= "http://openweathermap.org/img/wn/" + weathericon + "2x.png";
        var currentDate =new Date(response.dt*1000).toLocaleDateString();
        currentCity.html(response.name +"("+currentDate+")"+ "<img src="+iconURL+">");
        currentTemp.html(response.main.temp+" F");
        currentWind.html(response.wind.speed+" MPH");
        currentHumid.html(response.main.humidity+" %");
        getUV(response.coord.lat,response.coord.lon);

    });
}

function getUV(lon,lat) {
    var uvURL="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon+ "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: uvURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        currentUv.html(response.daily[0].uvi)
    })
}