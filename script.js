var userInput;
var lat;
var lon;
var API_key = "27f94a0115a71ea04286aba6778a18ad";
var city = "New York";
var temp;
var UV;
var humidity;
var forecast = [];
var searchedcity = document.getElementById("searched-city")
var currentIcon = document.getElementById("current-icon")
var currentTemp = document.getElementById("current-temp")
var currentWind = document.getElementById("current-wind")
var currentHumidity = document.getElementById("current-humidity")
var currentUvi = document.getElementById("current-uvi")
var Listofcity=[]
var history = document.getElementById("past-search-buttons")


var search = document.getElementById("city-search")
var searchBar = document.getElementById("city")
search.addEventListener("submit", (e)=>{
    e.preventDefault()
    userInput = searchBar.value
    city = userInput;
    getData()
})




var getData = async() => {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`)
    .then(response => response.json())
    .then(data => {
        if (!Listofcity.includes(city)){
            Listofcity.push(city) 
            var para = document.createElement("BUTTON");                      
            var t = document.createTextNode(city);     
            para.appendChild(t);
            para.className="past-cities"
            para.addEventListener("click",(e)=>{
            city = e.target.innerHTML    
            getData();
            console.log(e.target.innerHTML)
        })                                         
        document.getElementById("past-search-buttons").appendChild(para);           
        }
        
        forecast = data.list
        lat = data.city.coord.lat
        lon = data.city.coord.lon
        city = data.city.name
        console.log(data)
        searchedcity.innerHTML=city+ moment().format(" (MMMM Do YYYY)")
    })

    await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_key}&units=imperial`)
        .then(response => response.json())
        .then(data => {
           temp = data.current.temp;
           UV = data.current.uvi;
           humidity = data.current.humidity;
           console.log(data)
           console.log(temp)
           currentIcon.src=`http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
           currentTemp.innerText=`Temp: ${data.current.temp}°`
           currentWind.innerText=`Wind: ${data.current.wind_speed} MPH`
           currentHumidity.innerText=`Humidity: ${data.current.humidity}%`
           currentUvi.innerText=`UV Index: ${data.current.uvi}`
           if (data.current.uvi < 2) currentUvi.style.color= "green"
           else if (data.current.uvi < 5) currentUvi.style.color= "#FFDC73"
           else if (data.current.uvi < 7) currentUvi.style.color= "orange"
           else if (data.current.uvi < 10) currentUvi.style.color= "red"
           else currentUvi.style.color= "violet"
        })
}

getData();