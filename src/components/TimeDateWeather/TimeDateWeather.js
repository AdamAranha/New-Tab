import React, { useEffect, useState } from 'react';

import Cloud from '../../assets/cloud.svg';

export default function TimeDateWeather() {

    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    const [weather, setWeather] = useState(null);

    const dayArray = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    const monthArray = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'September',
        'Oct',
        'Nov',
        'Dec'
    ];

    useEffect(() => {
        getTime();
        getDay();
        checkWeatherValue();

        let clock = setInterval(() => getTime(), 1000); //Occurs every second
        let calendar = setInterval(() => getDay(), 60000); //Occurs every minute
        let checkWeather = setInterval(() => checkWeatherValue(), 1800000); //Occurs every 30 minutes

        return function cleanup() {
            clearInterval(clock);
            clearInterval(calendar);
            clearInterval(checkWeather);
        };


    }, [])

    function getTime() {
        let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // if (time[0] === '0') {
        //     time = time.split('');
        //     time.splice(0, 1)    //Removes 0 at the front if the hour is a single digit
        //     time = time.join('')
        // }
        setTime(time);
    }

    function getDay() {
        const dateObj = new Date();
        setDate(`${dayArray[dateObj.getDay()]}, ${monthArray[dateObj.getMonth()]} ${dateObj.getDate()}.`);
    }

    function checkWeatherValue() {
        let date = new Date();
        const storedValue = JSON.parse(window.localStorage.getItem('newPageData'));
        const weatherValue = {
            timestamp: date.getTime(),
            temp: null
        }

        if (storedValue === null || ((date.getTime() - storedValue.timestamp) / 60000) >= 30) {
            someWeather()
                .then(result => {
                    weatherValue.temp = result;
                    setWeather(Math.round(result));
                    window.localStorage.setItem('newPageData', JSON.stringify({ weather: weatherValue }));
                });
        } else { setWeather(Math.floor(storedValue.weather.temp)) }

        async function someWeather() {
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=c017c4d551f1c62d18088f7e1024cd1f');
            const weather = await response.json();
            return weather.main.temp;
        }
    }

    return (
        <section className='timedateweather'>
            <p className='time'>{time}</p>
            <div className='dateWeather'>
                <p className='date'>{date}</p>
                <div className='weather-container'>
                    <img className='weather-img' src={Cloud} alt='cloud' />
                    <p className='weather'>{weather}°C</p>
                </div>
            </div>
        </section>
    )
}