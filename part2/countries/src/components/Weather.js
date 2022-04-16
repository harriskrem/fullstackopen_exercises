import axios from "axios";
import { useEffect } from "react";

const Weather = ({element, weather, setWeather}) => {

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${element.capital[0]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data);
            }
            );

    }, [setWeather]);

    if(weather.length === 0) {
        return(
            <div>Loading...</div>
        );
    };
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} />
            <p>wind {weather.wind.speed} m/s </p>
        </div>
    );
};

export default Weather;