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
var fiveDay = document.getElementById("fiveday-container").children


var search = document.getElementById("city-search")
var searchBar = document.getElementById("city")
search.addEventListener("submit", (e)=>{
    e.preventDefault()
    userInput = searchBar.value
    city = userInput;
    getData()
})

var reloadSearches = () => {
    Object.keys(localStorage).forEach((keys) => {
        var para = document.createElement("BUTTON");                      
        var t = document.createTextNode(keys);     
        para.appendChild(t);
        para.className = "btn btn-primary btn-sm"
        para.addEventListener("click",(e)=>{
        city = e.target.innerHTML    
        getData();
        console.log(e.target.innerHTML)
    })                                         
    document.getElementById("past-search-buttons").appendChild(para);   
    })
}
var pastSearhes = () => {
    if (!JSON.parse(localStorage.getItem(city))){ 
        localStorage.setItem(city,true)
        console.log(localStorage.getItem(city))
        var para = document.createElement("BUTTON");                      
        var t = document.createTextNode(city);     
        para.appendChild(t);
        para.className = "btn btn-primary btn-sm"
        para.addEventListener("click",(e)=>{
        city = e.target.innerHTML    
        getData();
        console.log(e.target.innerHTML)
    })                                         
    document.getElementById("past-search-buttons").appendChild(para);           
    }
}

var getData = async() => {
    await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`)
    .then(response => response.json())
    .then(data => {
        
        pastSearhes()
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
           currentTemp.innerText=`Temp: ${data.current.temp}°F`
           currentWind.innerText=`Wind: ${data.current.wind_speed} MPH`
           currentHumidity.innerText=`Humidity: ${data.current.humidity}%`
           currentUvi.innerText=`UV Index: ${data.current.uvi}`
           if (data.current.uvi < 2) currentUvi.style.color= "green"
           else if (data.current.uvi < 5) currentUvi.style.color= "#FFDC73"
           else if (data.current.uvi < 7) currentUvi.style.color= "orange"
           else if (data.current.uvi < 10) currentUvi.style.color= "red"
           else currentUvi.style.color= "violet"

           for (var i = 0; i < fiveDay.length; i++){
               console.log(fiveDay[i])
               fiveDay[i].children[0].innerHTML = moment().add(i + 1, 'days').format("MMMM Do YYYY");
               fiveDay[i].children[1].src = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
               fiveDay[i].children[2].innerHTML = `Temp: ${data.daily[i].temp.day}°F`;
               fiveDay[i].children[3].innerHTML = `Wind: ${data.daily[i].wind_speed} MPH`;
               fiveDay[i].children[4].innerHTML = `Humidity ${data.daily[i].humidity} %`;
           }
        })
}
reloadSearches();

getData();