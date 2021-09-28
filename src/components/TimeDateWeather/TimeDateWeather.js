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
        getWeather();

        function getTime() {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        function getDay() {
            const dateObj = new Date();
            setDate(`${dayArray[dateObj.getDay()]}, ${monthArray[dateObj.getMonth()]} ${dateObj.getDate()}.`);
        }
        function getWeather() {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=c017c4d551f1c62d18088f7e1024cd1f')
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    setWeather(Math.round(result.main.temp) + '°C');
                });
        }

        let clock = setInterval(() => getTime(), 1000);
        let calendar = setInterval(() => getDay(), 60000);
        let weather = setInterval(() => getWeather(), 300000);

        return function cleanup() {
            clearInterval(clock);
            clearInterval(calendar);
            // clearInterval(weather);
        };
    })

    return (
        <section className='timedateweather'>
            <p className='time'>
                {time}
            </p>
            <div className='dateWeather'>
                <p className='date'>
                    {date}
                </p>
                <div className='weather-container'>
                    <img className='weather-img' src={Cloud} alt='cloud' />
                    <p className='weather'>24°C</p>
                </div>
            </div>

        </section>
    )
}