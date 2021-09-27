var APIKey = "1c2d55e5ab4bd47916f6287ef9d3e643";
var city;
var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=" + APIKey;

fetch(queryURL);
