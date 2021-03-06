//declared variables
var APIKey = "1c2d55e5ab4bd47916f6287ef9d3e643";
var currentTemp = $('#temp');
var currentWind = $('#wind');
var currentHumid = $('#humid');
var savedCity=[];
var lon;
var lat;
var city;
var storage = JSON.parse(localStorage.getItem(savedCity));
var currentUv = $('#uv');
var currentCity = $('#currentCity');
var searchedCity = $("#searchedCity");
var searchButton = $('#searchButton');
//search button that stores searched city
searchButton.on('click',function(){
    
    var city= $("#searchedCity").val();
    if(city !== null){
        localStorage.setItem("city", city)
    }
    currentWeather(city);
});
//function to pull current weather data from API and stores it
function currentWeather(x){
    // x = localStorage.getItem("city");
    var queryURL= "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method:"GET",
    }).then(function(response){
        console.log(response);
        displayWeather(response);
        
    }); 
    //function to display current weather city, temp, wind, and humidity
    } function displayWeather(response){
        var weathericon= response.weather[0].icon;
        var iconURL= "http://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var currentDate =new Date(response.dt*1000).toLocaleDateString();
        currentCity.html(response.name +"("+currentDate+")"+ "<img src="+iconURL+">");
        currentTemp.html(response.main.temp+" F");
        currentWind.html(response.wind.speed+" MPH");
        currentHumid.html(response.main.humidity+" %");
        console.log(response.coord.lat);
        //pulls UV index from second api and stores it
        getUV(response.coord.lon,response.coord.lat);
        if(response.cod==200){
            savedCity=JSON.parse(localStorage.getItem('cityname'));
            city=response.name;
            console.log(city);
            if(savedCity==null){
                savedCity=[];
                savedCity.push(city);
                localStorage.setItem("cityname",JSON.stringify(savedCity));
                addToList(city);
            }
            else {
                if(find(city)>0){
                    var sandwich = savedCity.indexOf(city)
                    if(sandwich == -1){
                        savedCity.push(city);
                    localStorage.setItem("cityname",JSON.stringify(savedCity));
                    addToList(city);
                    }
                }
            }
        } 
    }

//function using api to get the uv index based off longitude and latitude
function getUV(lon,lat) {
    var uvURL="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" +lon+ "&units=imperial&appid=" + APIKey;
    $.ajax({
        url: uvURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        var todayUV=response.current.uvi;
        currentUv.html(todayUV);
        //function to change uv background color based on rating number
        function uviColor(){
            if(todayUV<=3){
                $('#uv').css('background-color', 'green');
            }   else if (todayUV>3&&todayUV<=6){
                $('#uv').css('background-color', 'orange');
            } else {
                $('#uv').css('background-color', 'red');
            }
            console.log(todayUV)
        } uviColor();
        fiveDay(response);
    });
    //function to display the 5 day forcescast from API
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
//function to add the searched city to a list and display it under search bar.
function addToList(city){
    var searchEl= $("<li>"+city.toUpperCase()+"</li>");
    $(searchEl).attr("class","list-group-item");
    $(searchEl).attr("data-value",city.toUpperCase());
    $(".list-group").append(searchEl);
    
}
//function to display past searches
function pastSearch(event){
    var liEl=event.target;
    var y=liEl.value;
    console.log("pastSearch"+y);
    if(event.target.matches('li')){
        city=liEl.textContent;
        currentWeather(city);
    }
}
function init(){
    if (storage != null){
        currentWeather(storage[0])

    } else{
        city = 'Marietta'
        currentWeather(city)
    }
}
init()

$(document).on('click',pastSearch);

