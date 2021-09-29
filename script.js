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

function currentWeather(){
    var city = localStorage.getItem("city");
    var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);

        var weathericon= response.weather[0].icon;
        var iconURL= "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var currentDate =new Date(response.dt*1000).toLocaleDateString();
        currentCity.html(response.name +"("+currentDate+")"+ "<img src="+iconURL+">");
        currentTemp.html(response.main.temp+" F");
        currentWind.html(response.wind.speed+" MPH");
        currentHumid.html(response.main.humidity+" %");
        console.log(response.coord.lat);
        getUV(response.coord.lon,response.coord.lat);

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
        fiveDay(response);
    });
 function fiveDay(response){
     for (i=1;i<6;i++){
         
         var fDate= moment.unix(response.daily[i].dt);
         $('#futureDate'+i).html(fDate.format("M/DD/YYYY"));
         $('#futureTemp'+i).html(response.daily[i].temp.day +" F");
         $('#futureWind'+i).html(response.daily[i].wind_speed + " MPH");
         $('#futureHumid'+i).html(response.daily[i].humidity+" %");
         var weathericon= response.daily[i].weather[0].icon;
         var iconURL= "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
         $('#futureImage'+i).html("<img src="+iconURL+">");
    }
 }
}