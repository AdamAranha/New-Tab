import React, { useEffect, useState } from 'react';

export default function Clock() {

    const [time, setTime] = useState(null);

    useEffect(() => {

        function tick() {
            setTime((new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })));
        }

        let clock = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(clock)
        };

    })

    return (
        <div className='clock'>
            <p className='time'>
                {time}
            </p>
        </div>
    )
}