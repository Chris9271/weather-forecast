import React, {useContext, useEffect} from 'react';
import Chart from 'chart.js';
import {WeatherContext} from '../ProvideContext/WeatherContext';
import './Graph.css';

const Graph = () => {
    const chartData = useContext(WeatherContext);
    const {futureWeather, isConvert, celsiusTofahrenheit} = chartData;

    useEffect(()=>{
        // get the reference context from id is chart this document
        // var name must be ctx
    let ctx = document.getElementById('chart').getContext('2d')
    let myChart = new Chart(ctx,{
        // chart type
        type: "line",
        data:{
            // x axis label name
            labels:[futureWeather.h_dt1, futureWeather.h_dt2, futureWeather.h_dt3,
                    futureWeather.h_dt4, futureWeather.h_dt5, futureWeather.h_dt6,
                    futureWeather.h_dt7, futureWeather.h_dt8],
            datasets:[{
                backgroundColor:"rgba(117, 117, 117, 0.8)",
                // chart's line color
                borderColor:"white",
                // x axis 相對應的數據
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
            // 維持長寬比例？
            maintainAspectRatio: false,
            // Re-size？
            responsive: true,
            // At the top of the chart's label
            legend:{
                display: false
            },
            scales:{
                xAxes:[{
                    // 網格線
                    gridLines:{
                        lineWidth: 0
                    },
                    // 刻度線
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
                        // also will set y axis label (refer x axis data)
                        maxTicksLimit: 5
                    }
                }]
            }
        }
        })
        // before starting new chart should destroy
            return () => myChart.destroy();
    }, [futureWeather, isConvert]);

    return (
        <div className="temp-chart">
            {/* draw a new canvas with specify width and height */}
            <canvas id="chart" width="800" height="200"></canvas>
        </div>
    )
}

export default Graph;
