import React from 'react';
import './LeftDetail.css';

const LeftDetail = ({data, date, convertTemp, celToFah}) => {
    return (
        <div className="left">
            <h1 className="city-name">{data.city}, {data.country}</h1>
            <h5 className="date">{date.d_dt0}</h5>
            <div className="icons">
                <img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="weather-icon" className="iconWeather"/>
            </div>
            {!convertTemp ?
            <h3 className="city-temp">{data.temp} °C</h3>
            :
            <h3 className="city-temp">{Math.round(celToFah(data.temp))} °F</h3>
            }
        </div>
    )
}

export default LeftDetail;
