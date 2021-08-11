import React, {useState, useEffect} from 'react'
import axios from 'axios';

// create new context object, let other component can subscribe by using useContext
const WeatherContext = React.createContext();

const WeatherProvider = (props) => {
    const [currentCity, setCurrentCity] = useState("");
    const [cityPictures, setCityPictures] = useState([]);
    const [dataStorage, setDataStorage] = useState([]);
    const [futureWeather, setFutureWeather] = useState([]);
    const [newCity, setNewCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isConvert, setIsConvert] = useState(false);

    const cityWeather = async() => {
        try{
            const ip_Key = process.env.REACT_APP_IP_KEY
            const currentPlace = await axios.get(
                `https://api.ipgeolocation.io/ipgeo?apiKey=${ip_Key}`
            )
                setCurrentCity(currentPlace.data.city)
                setDataStorage({
                    country: currentPlace.data.country_code2
                })

            const bg_Key = process.env.REACT_APP_BG_KEY
            const backGroundPics = await axios.get(
                `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${currentPlace.data.city}&client_id=${bg_Key}`
            )
                setCityPictures(backGroundPics.data.results[Math.floor(Math.random()*10)].urls.regular)
            
            const api_Key = process.env.REACT_APP_API_KEY
            const weatherInfo = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${currentPlace.data.city}&units=metric&appid=${api_Key}`
            )
                setDataStorage({
                    dt: weatherInfo.data.dt,
                    city: weatherInfo.data.name,
                    bodyTemp: Math.round(weatherInfo.data.main.feels_like),
                    humidity: weatherInfo.data.main.humidity + ' %',
                    temp: Math.round(weatherInfo.data.main.temp),
                    tempMax: Math.round(weatherInfo.data.main.temp_max),
                    tempMin: Math.round(weatherInfo.data.main.temp_min),
                    country: weatherInfo.data.sys.country,
                    sunrise: timeConverter(weatherInfo.data.sys.sunrise, weatherInfo.data.timezone),
                    sunset: timeConverter(weatherInfo.data.sys.sunset, weatherInfo.data.timezone),
                    timezone: weatherInfo.data.timezone,
                    icon: weatherInfo.data.weather[0].icon,
                    description: weatherInfo.data.weather[0].main
                })

            const futureWeather = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherInfo.data.coord.lat}&lon=${weatherInfo.data.coord.lon}&exclude=minutely&units=metric&appid=${api_Key}`
            )
                setFutureWeather({
                    // Hourly
                    h_dt1: timeConverter(futureWeather.data.hourly[3].dt, weatherInfo.data.timezone),
                    h_dt2: timeConverter(futureWeather.data.hourly[6].dt, weatherInfo.data.timezone),
                    h_dt3: timeConverter(futureWeather.data.hourly[9].dt, weatherInfo.data.timezone),
                    h_dt4: timeConverter(futureWeather.data.hourly[12].dt, weatherInfo.data.timezone),
                    h_dt5: timeConverter(futureWeather.data.hourly[15].dt, weatherInfo.data.timezone),
                    h_dt6: timeConverter(futureWeather.data.hourly[18].dt, weatherInfo.data.timezone),
                    h_dt7: timeConverter(futureWeather.data.hourly[21].dt, weatherInfo.data.timezone),
                    h_dt8: timeConverter(futureWeather.data.hourly[24].dt, weatherInfo.data.timezone),

                    h_temp1: Math.round(futureWeather.data.hourly[3].temp),
                    h_temp2: Math.round(futureWeather.data.hourly[6].temp),
                    h_temp3: Math.round(futureWeather.data.hourly[9].temp),
                    h_temp4: Math.round(futureWeather.data.hourly[12].temp),
                    h_temp5: Math.round(futureWeather.data.hourly[15].temp),
                    h_temp6: Math.round(futureWeather.data.hourly[18].temp),
                    h_temp7: Math.round(futureWeather.data.hourly[21].temp),
                    h_temp8: Math.round(futureWeather.data.hourly[24].temp),

                    // Daily
                    d_dt0: todayConverter(futureWeather.data.daily[0].dt, weatherInfo.data.timezone),
                    d_dt1: dayConverter(futureWeather.data.daily[1].dt, weatherInfo.data.timezone),
                    d_dt2: dayConverter(futureWeather.data.daily[2].dt, weatherInfo.data.timezone),
                    d_dt3: dayConverter(futureWeather.data.daily[3].dt, weatherInfo.data.timezone),
                    d_dt4: dayConverter(futureWeather.data.daily[4].dt, weatherInfo.data.timezone),
                    d_dt5: dayConverter(futureWeather.data.daily[5].dt, weatherInfo.data.timezone),
                    d_dt6: dayConverter(futureWeather.data.daily[6].dt, weatherInfo.data.timezone),
                    d_dt7: dayConverter(futureWeather.data.daily[7].dt, weatherInfo.data.timezone),

                    // d_temp0: Math.round(futureWeather.data.daily[0].temp.day) + ' °C',
                    d_temp1: Math.round(futureWeather.data.daily[1].temp.day),
                    d_temp2: Math.round(futureWeather.data.daily[2].temp.day),
                    d_temp3: Math.round(futureWeather.data.daily[3].temp.day),
                    d_temp4: Math.round(futureWeather.data.daily[4].temp.day),
                    d_temp5: Math.round(futureWeather.data.daily[5].temp.day),
                    d_temp6: Math.round(futureWeather.data.daily[6].temp.day),
                    d_temp7: Math.round(futureWeather.data.daily[7].temp.day),

                    d_icon0: futureWeather.data.daily[0].weather[0].icon,
                    d_icon1: futureWeather.data.daily[1].weather[0].icon,
                    d_icon2: futureWeather.data.daily[2].weather[0].icon,
                    d_icon3: futureWeather.data.daily[3].weather[0].icon,
                    d_icon4: futureWeather.data.daily[4].weather[0].icon,
                    d_icon5: futureWeather.data.daily[5].weather[0].icon,
                    d_icon6: futureWeather.data.daily[6].weather[0].icon,
                    d_icon7: futureWeather.data.daily[7].weather[0].icon,

                })
            setIsLoading(true);
            setIsError(false);
        }
        catch(err){
            console.log(err);
            setIsLoading(true);
            setIsError(true);
        }
    }

    // Another City
    const nextCityWeather = async() => {
        try{
            const bg_Key = process.env.REACT_APP_BG_KEY
            const backGroundPics = await axios.get(
                `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${newCity}&client_id=${bg_Key}`
            )
                setCityPictures(backGroundPics.data.results[Math.floor(Math.random()*10)].urls.regular)
            
            const api_Key = process.env.REACT_APP_API_KEY
            const weatherInfo = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${api_Key}`
            )
                setDataStorage({
                    dt: weatherInfo.data.dt,
                    city: weatherInfo.data.name,
                    bodyTemp: Math.round(weatherInfo.data.main.feels_like),
                    humidity: weatherInfo.data.main.humidity + ' %',
                    temp: Math.round(weatherInfo.data.main.temp),
                    tempMax: Math.round(weatherInfo.data.main.temp_max),
                    tempMin: Math.round(weatherInfo.data.main.temp_min),
                    country: weatherInfo.data.sys.country,
                    sunrise: timeConverter(weatherInfo.data.sys.sunrise, weatherInfo.data.timezone),
                    sunset: timeConverter(weatherInfo.data.sys.sunset, weatherInfo.data.timezone),
                    timezone: weatherInfo.data.timezone,
                    icon: weatherInfo.data.weather[0].icon,
                    description: weatherInfo.data.weather[0].main
                })

            const futureWeather = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${weatherInfo.data.coord.lat}&lon=${weatherInfo.data.coord.lon}&exclude=minutely&units=metric&appid=${api_Key}`
            )
                setFutureWeather({
                    // Hourly
                    h_dt1: timeConverter(futureWeather.data.hourly[3].dt, weatherInfo.data.timezone),
                    h_dt2: timeConverter(futureWeather.data.hourly[6].dt, weatherInfo.data.timezone),
                    h_dt3: timeConverter(futureWeather.data.hourly[9].dt, weatherInfo.data.timezone),
                    h_dt4: timeConverter(futureWeather.data.hourly[12].dt, weatherInfo.data.timezone),
                    h_dt5: timeConverter(futureWeather.data.hourly[15].dt, weatherInfo.data.timezone),
                    h_dt6: timeConverter(futureWeather.data.hourly[18].dt, weatherInfo.data.timezone),
                    h_dt7: timeConverter(futureWeather.data.hourly[21].dt, weatherInfo.data.timezone),
                    h_dt8: timeConverter(futureWeather.data.hourly[24].dt, weatherInfo.data.timezone),

                    h_temp1: Math.round(futureWeather.data.hourly[3].temp),
                    h_temp2: Math.round(futureWeather.data.hourly[6].temp),
                    h_temp3: Math.round(futureWeather.data.hourly[9].temp),
                    h_temp4: Math.round(futureWeather.data.hourly[12].temp),
                    h_temp5: Math.round(futureWeather.data.hourly[15].temp),
                    h_temp6: Math.round(futureWeather.data.hourly[18].temp),
                    h_temp7: Math.round(futureWeather.data.hourly[21].temp),
                    h_temp8: Math.round(futureWeather.data.hourly[24].temp),

                    // Daily
                    d_dt0: todayConverter(futureWeather.data.daily[0].dt, weatherInfo.data.timezone),
                    d_dt1: dayConverter(futureWeather.data.daily[1].dt, weatherInfo.data.timezone),
                    d_dt2: dayConverter(futureWeather.data.daily[2].dt, weatherInfo.data.timezone),
                    d_dt3: dayConverter(futureWeather.data.daily[3].dt, weatherInfo.data.timezone),
                    d_dt4: dayConverter(futureWeather.data.daily[4].dt, weatherInfo.data.timezone),
                    d_dt5: dayConverter(futureWeather.data.daily[5].dt, weatherInfo.data.timezone),
                    d_dt6: dayConverter(futureWeather.data.daily[6].dt, weatherInfo.data.timezone),
                    d_dt7: dayConverter(futureWeather.data.daily[7].dt, weatherInfo.data.timezone),

                    // d_temp0: Math.round(futureWeather.data.daily[0].temp.day) + ' °C',
                    d_temp1: Math.round(futureWeather.data.daily[1].temp.day),
                    d_temp2: Math.round(futureWeather.data.daily[2].temp.day),
                    d_temp3: Math.round(futureWeather.data.daily[3].temp.day),
                    d_temp4: Math.round(futureWeather.data.daily[4].temp.day),
                    d_temp5: Math.round(futureWeather.data.daily[5].temp.day),
                    d_temp6: Math.round(futureWeather.data.daily[6].temp.day),
                    d_temp7: Math.round(futureWeather.data.daily[7].temp.day),

                    d_icon0: futureWeather.data.daily[0].weather[0].icon,
                    d_icon1: futureWeather.data.daily[1].weather[0].icon,
                    d_icon2: futureWeather.data.daily[2].weather[0].icon,
                    d_icon3: futureWeather.data.daily[3].weather[0].icon,
                    d_icon4: futureWeather.data.daily[4].weather[0].icon,
                    d_icon5: futureWeather.data.daily[5].weather[0].icon,
                    d_icon6: futureWeather.data.daily[6].weather[0].icon,
                    d_icon7: futureWeather.data.daily[7].weather[0].icon,

                })
                setIsLoading(true);
                setIsError(false);
        }
        catch(err){
            console.log(err);
            setIsLoading(true);
            setIsError(true);
        }
    }

    const timeConverter = (dt, timezone) => {
        let adjustTime = dt * 1000 + timezone * 1000; //get milliseconds
        let convertTime = new Date (adjustTime); // convert milliseconds to date
        let hour = `${(convertTime.getUTCHours() < 10) ? `0${convertTime.getUTCHours()}` : convertTime.getUTCHours()}`;
        let minute = `0${convertTime.getUTCMinutes()}`;
        let displayTime = `${hour}:${minute.substr(-2)}` 
        return displayTime;
    }

    const dayConverter = (dt, timezone) => {
        let adjustTime = dt * 1000 + timezone * 1000;
        let convertTime = new Date (adjustTime);
        let day = convertTime.getUTCDay();
        switch(day){
            case 0 :
                return "Sun";
            case 1 :
                return "Mon";
            case 2 :
                return "Tue";
            case 3 :
                return "Wed";
            case 4 :
                return "Thu";
            case 5 :
                return "Fri";
            case 6 :
                return "Sat";
            default:
        }
        return day;
    }

    const todayConverter = (dt, timezone) => {
        let adjustTime = dt * 1000 + timezone * 1000;
        let convertTime = new Date(adjustTime);
        let year = convertTime.getUTCFullYear();
        let month = monthConvert(convertTime.getUTCMonth() + 1);
        let date = convertTime.getUTCDate();
        let day = convertDay(convertTime.getUTCDay());
        let displayTime = `${day} ${date} ${month}, ${year}`
        return displayTime
    }

    const monthConvert = (month) => {
        switch(month){
            case 1:
                return "January";
            case 2: 
                return "Feburary";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
        }
    }

    const convertDay = (day) => {
        switch(day){
            case 0 :
                return "Sunday";
            case 1 :
                return "Monday";
            case 2 :
                return "Tuesday";
            case 3 :
                return "Wednesday";
            case 4 :
                return "Thursday";
            case 5 :
                return "Friday";
            case 6 :
                return "Saturday";
            default:
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        nextCityWeather();
        setIsLoading(false);
    }

    const handleChange = (e) => {
        setNewCity(e.target.value)
    }

    const celsiusTofahrenheit = (temp) => {
        const fahrenheit = (temp * 1.8) + 32;
        return fahrenheit
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsConvert(!isConvert)
    }

    useEffect(() => {
        cityWeather();
    },[])

    return (
        // provide values to decendant consumer that using useContext
        <WeatherContext.Provider value={{cityPictures, dataStorage, futureWeather, handleSubmit, handleChange, currentCity, newCity, isLoading, isError, handleClick, isConvert, celsiusTofahrenheit}}>
            {props.children}
        </WeatherContext.Provider>
    )
}

export {WeatherProvider, WeatherContext}
