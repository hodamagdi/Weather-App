// decleration 
const searchLocationInput = document.getElementById('searchLocation');
let dayToday = document.getElementById('dayToday');
let dateToday = document.getElementById('dateToday');
let cityToday = document.getElementById('cityToday');
let degreeToday = document.getElementById('degreeToday');
let conditionToday = document.getElementById('conditionToday');
let imgToday = document.getElementById('imgToday');
let humidityToday = document.getElementById('humidityToday');
let winSpeedToday = document.getElementById('winSpeedToday');
let windDirectionToday = document.getElementById('windDirectionToday');

// get current position 
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        console.log(lat);
        console.log(long);
        getWeatherData(`${lat},${long}`);

    })
} else {
    console.log('not allowed');
}

// get data 
async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=d3463149b54b4d81b77170217242506`);
    let data = await res.json()
    console.log(data);
    dispalyTodayWeather(data);
    displayTom(data);
    displayAfterTom(data);
}

// get data by search 
searchLocationInput.addEventListener('input', function (e) {
    getWeatherData(e.target.value)
})

// dispaly today weather 
function dispalyTodayWeather(data) {
    console.log("displayed data", data);
    console.log(data.current.last_updated);
    const todayDate = data.current.last_updated;
    let date = new Date(todayDate);
    const todayWeekDay = date.toLocaleString('en-us', { weekday: 'long' });
    const todayDay = date.getDate();
    const todayMonth = date.toLocaleString('en-us', { month: 'long' });
    const cityName = data.location.name;
    const todayDegree = data.current.temp_c;
    const todayCondition = data.current.condition.text;
    const todayImg = data.current.condition.icon;
    const todayHumidity = data.current.humidity;
    const todayWindSpeed = data.current.wind_kph;
    const todayWindDirection = data.current.wind_dir;

    windDirectionToday.innerHTML = todayWindDirection;
    winSpeedToday.innerHTML = todayWindSpeed;
    humidityToday.innerHTML = todayHumidity;
    conditionToday.innerHTML = todayCondition;
    degreeToday.innerHTML = todayDegree;
    cityToday.innerHTML = cityName;
    dayToday.innerHTML = todayWeekDay;
    dateToday.innerHTML = `${todayDay} ${todayMonth}`;
    imgToday.setAttribute('src', data.current.condition.icon);
}

//display tomorrow weather 
function displayTom({forecast}){
    console.log(forecast, 'forecast from displaytom');
    tomorrowDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'});
    tomorrowImg.setAttribute ('src',forecast.forecastday[1].day.condition.icon);
    maxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c;
    minTemp.innerHTML = forecast.forecastday[1].day.mintemp_c;
    conditionTomorrow.innerHTML = forecast.forecastday[1].day.condition.text; 
}

//display after tomorrow weather 
function displayAfterTom({forecast}){
    console.log(forecast, 'forecast from displaytom');
    afterTomorrowDay.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString('en-us',{weekday:'long'});
    afterTomorrowImg.setAttribute ('src',forecast.forecastday[2].day.condition.icon);
    afterTomMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c;
    afterTomMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c;
    conditionAfterTomorrow.innerHTML = forecast.forecastday[2].day.condition.text; 
}

