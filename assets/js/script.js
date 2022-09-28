var APIKey = "10b527a0a31e5eed6f5912affbfd722e";
const weatherDays = [];
let currentDay = null;
let todaysDate = moment().format("M/DD/YYYY");

let fiveDayForecast = "";
let curWeatherDisplay = "";
let recentCities = "";



// initiates API call
function getAPI(city) {

  const queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  fetch(queryURL)
  
  .then(function(data){
    return data.json();
  })

  .then(function(data) {
    console.log(data);
    forecast(data.list)
    currentWeather(data.list)
     
    
  })
}

// displays the current weather for city searched
function currentWeather(data) {
  curWeatherDisplay = `
    <div id="forecast-icon">
      <img src="https://openweathermap.org/img/w/${data[0].weather[0].icon}.png">
    </div>
    <div>
      <p> Temperature: ${data[0].main.temp} F </p>
      <p> Humidity: ${data[0].main.humidity}% </p>
      <p> Wind Speed: ${data[0].wind.speed} MPH </p>
    </div>`

    $("#weatherForecast").append(curWeatherDisplay);

} 
//displays 5 day forecast for the city searched
    function forecast(data) {
  
      for (let i = 1; i < data.length; i += 8) {
    
        fiveDayForecast += `
        <div class="col-2">
        <h5> ${data[i].dt_txt} </h5>
          <div id="forecast-icon">
          <img src="https://openweathermap.org/img/w/${data[i].weather[0].icon}.png">
          </div>
            <p> Temperature: ${data[i].main.temp} F </p>
            <p> Humidity: ${data[i].main.humidity}% </p>
            <p> Wind Speed: ${data[i].wind.speed} MPH </p>
        </div>`
      }
      $(".forecast5day").append(fiveDayForecast);

      console.log(data)
    }

// Store searched city in local storage and add to secondary button 
// there is is a bug here that stores the data to the screen as well - need to fix
function storeCity(location) {
  localStorage.setItem("City Name", location)

  recentCities = `
    <button type="button" class="btn btn-secondary" id="store1">${location}</button>
  `
  $("#storeCity").append(recentCities);
  
  
}    


// Event listener for click on search button 

$("#mainSearch").on("click", function citySearched(){
  console.log("button clicked");
  var citySearched = $("#enterLoc").val();
  console.log(citySearched)

  var cityName = $("<h1>");
  cityName.text(citySearched + " " + "(" + todaysDate + ")")
  $("#date").prepend(cityName)

  getAPI(citySearched)
  storeCity(citySearched)
  
})