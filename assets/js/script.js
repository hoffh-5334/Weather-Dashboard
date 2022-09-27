var APIKey = "10b527a0a31e5eed6f5912affbfd722e";
const weatherDays = [];
let currentDay = null;
let todaysDate = moment().format("M/DD/YYYY");

let forecastDisplay = "";
let currentDisplay = "";



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




// Event listener for click on search button 

$("#primary").on("click", function citySearch(){
  console.log("button clicked");
  var citySearch = $("#enterCity").val();
  console.log(citySearch)
  
})