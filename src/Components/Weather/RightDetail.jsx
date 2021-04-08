import React from 'react';
import './RightDetail.css';

const RightDetail = ({detail, futureDetail, tempUnit, convertTemp, celToFah}) => {
    const toggleUnit = convertTemp ? "fahrenheit" : "celsius";
    return (
        <div className="Side-Info">
            <div className="toggle-wrapper">
                <div className="toggle-switch">
                    <div className="convert-btn" onClick={tempUnit}>
                        <p className="unit">°F</p>
                        <p className="unit">°C</p>
                        <span className={toggleUnit}></span>
                    </div>
                </div>
            </div>
            <div className="up-info">
                <p className="title">Weather Details</p>
                <table>
                    <tbody>
                        <tr>
                            <td className="data-font">High</td>
                            <td className="data-font">:</td>
                            {!convertTemp ?
                            <td className="data-font">{detail.tempMax} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(detail.tempMax))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">Low</td>
                            <td className="data-font">:</td>
                            {!convertTemp ?
                            <td className="data-font">{detail.tempMin} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(detail.tempMin))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">Sunrise</td>
                            <td className="data-font">:</td>
                            <td className="data-font">{detail.sunrise}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">Sunset</td>
                            <td className="data-font">:</td>
                            <td className="data-font">{detail.sunset}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">Humidity</td>
                            <td className="data-font">:</td>
                            <td className="data-font">{detail.humidity}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">Feels like</td>
                            <td className="data-font">:</td>
                            {!convertTemp ?
                            <td className="data-font">{detail.bodyTemp} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(detail.bodyTemp))} °F</td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="down-info">
                <p className="title">Next Days</p>
                <table>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt1}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon1}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp1} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp1))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt2}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon2}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp2} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp2))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt3}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon3}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp3} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp3))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt4}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon4}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp4} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp4))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt5}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon5}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp5} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp5))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt6}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon6}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp6} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp6))} °F</td>
                            }
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="data-font">{futureDetail.d_dt7}</td>
                            <td className="data-font"><img src={`http://openweathermap.org/img/wn/${futureDetail.d_icon7}@2x.png`} alt=""   className="future-icon"/></td>
                            {!convertTemp ?
                            <td className="data-font">{futureDetail.d_temp7} °C</td>
                            :
                            <td className="data-font">{Math.round(celToFah(futureDetail.d_temp7))} °F</td>
                            }
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RightDetail;
