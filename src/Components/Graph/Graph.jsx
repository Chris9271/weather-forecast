import React, {useContext, useEffect} from 'react';
import Chart from 'chart.js';
import {WeatherContext} from '../ProvideContext/WeatherContext';
import './Graph.css';

const Graph = () => {
    const chartData = useContext(WeatherContext);
    const {futureWeather, isConvert, celsiusTofahrenheit} = chartData;

    useEffect(()=>{
    let ctx = document.getElementById('chart').getContext('2d')
    let myChart = new Chart(ctx,{
        type: "line",
        data:{
            labels:[futureWeather.h_dt1, futureWeather.h_dt2, futureWeather.h_dt3,
                    futureWeather.h_dt4, futureWeather.h_dt5, futureWeather.h_dt6,
                    futureWeather.h_dt7, futureWeather.h_dt8],
            datasets:[{
                backgroundColor:"rgba(117, 117, 117, 0.8)",
                borderColor:"white",
                data: !isConvert ? 
                    [futureWeather.h_temp1, futureWeather.h_temp2, futureWeather.h_temp3,
                    futureWeather.h_temp4, futureWeather.h_temp5, futureWeather.h_temp6,
                    futureWeather.h_temp7, futureWeather.h_temp8]
                    :
                    [celsiusTofahrenheit(futureWeather.h_temp1), celsiusTofahrenheit(futureWeather.h_temp2), 
                    celsiusTofahrenheit(futureWeather.h_temp3), celsiusTofahrenheit(futureWeather.h_temp4), 
                    celsiusTofahrenheit(futureWeather.h_temp5), celsiusTofahrenheit(futureWeather.h_temp6),
                    celsiusTofahrenheit(futureWeather.h_temp7), celsiusTofahrenheit(futureWeather.h_temp8)]
                }]
            },
        options:{
            maintainAspectRatio: false,
            responsive: true,
            legend:{
                display: false
            },
            scales:{
                xAxes:[{
                    gridLines:{
                        lineWidth: 0
                    },
                    ticks:{
                        fontColor: "white"
                    }
                }],
                yAxes:[{
                    gridLines:{
                        lineWidth: 0
                    },
                    ticks:{
                        fontColor: "white",
                        maxTicksLimit: 5
                    }
                }]
            }
        }
        })
            return () => myChart.destroy();
    }, [futureWeather, isConvert]);

    return (
        <div className="temp-chart">
            <canvas id="chart" width="800" height="200"></canvas>
        </div>
    )
}

export default Graph;
