console.log("Hello World")
const APIkey = '70de7438bece3fbd05ab1962e1f82bfc'

main();

async function main() {
    const {dateString, timestamp, timeString} = getDateAndTime();

    setDate(dateString);
    setTime(timeString);
    // Checks whether an API call needs to be sent and the newTab object in localStorage needs to be updated
    // TRUE means newTab object in localStorage needs to be updated, FALSE
    if(needWeatherUpdate(timestamp)) {
        let {temp, weather, sunrise, sunset} = await getWeather();
        setWeather({temp, weather, sunrise, sunset, timestamp})
        // Updates timestamp in localStorage
        localStorage.setItem('newTab', JSON.stringify({temp, weather, sunrise, sunset, timestamp}))
    } else {
        const newTab = JSON.parse(localStorage.getItem('newTab'));
        let {temp, weather, sunrise, sunset, timestamp} = newTab
        setWeather({temp, weather, sunrise, sunset, timestamp})
    }
    setTimeout(() => {
        main();
    }, 1000)
}
function getDateAndTime() {
    const dateObj = new Date()
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = dateObj.getDate()
    const dayOfWeek = dateObj.getDay()
    let hours = dateObj.getHours()
    let minutes = dateObj.getMinutes()
    const month = dateObj.getMonth();
    const period = hours < 12 ? 'AM' : 'PM'
    const militaryClock = false
    if(!militaryClock && hours === 0) hours = 12 /*Turns 00:00 into 12 AM if Military Clock === false*/
    if (!militaryClock && hours > 12) hours -= 12 /* Adjusts time if Military Clock === false*/
    if (hours < 10) hours = '0' + hours.toLocaleString()
    if (minutes < 10) minutes = '0' + minutes.toLocaleString()

    const timeString = `${hours}:${minutes} ${period}`
    const dateString = `${days[dayOfWeek]}, ${months[month]} ${date}`
    // Converting time from date object in a UNIX Timestamp 
    const timestamp = Math.floor(dateObj.getTime() / 1000)

    return {dateString, timestamp, timeString}
}
async function getWeather() {
    try {
        const {latitude, longitude} = (await getLocation()).coords;
        const weatherObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`).then(r=>r.json())
        console.log(weatherObj)
        const {temp} = weatherObj.main;
        const weather = weatherObj.weather[0];
        console.log(weather)
        const {sunrise, sunset} = weatherObj.sys
        return({temp, weather, sunrise, sunset})
    } catch(err) {
        console.log(err)
    }
}
function getLocation() {
    // Checks to see if geoLocation is available in browser
    if (navigator.geolocation) {
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    } 
    console.log('Geolocation unavailable in browser')
}
function setDate(dateString) {
    const dateHTML = document.querySelector('.date');
    dateHTML.innerHTML = dateString;
}
function setTime(timeString) {
    const timeHTML = document.querySelector('.time');
    timeHTML.innerHTML = timeString;
}
function needWeatherUpdate(timestamp) {
    // if there is savedTimestamp available in localStorage, it is saved. If not null is saved instead.
    let savedTimestamp = localStorage.getItem('newTab') ? JSON.parse(localStorage.getItem('newTab')).timestamp : null;
    // Returns true if savedTimestamp is null or 1 hour had elapsed since last timestamp. Else returns false
    return !savedTimestamp ||  timestamp - savedTimestamp >= 3600 ? true : false;
}
function setWeather({temp, weather, sunrise, sunset, timestamp}) {
    const weatherHTML = document.querySelector('.weather');
    weatherHTML.innerHTML = ` ${Math.round(temp)}°C`;

    const weatherIconHTML = document.querySelector('#weather-icon');
    const {icon} = weather;
    weatherIconHTML.src = `./assets/${icon}.svg`
}