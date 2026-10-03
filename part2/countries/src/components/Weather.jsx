import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({country}) => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY 
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capitalInfo?.latlng) {
      const [lat,lon] = country.capitalInfo.latlng
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
    }
  }, [api_key, country.capitalInfo?.latlng])

  return (
    <div>
      {country.capitalInfo?.latlng ? (
      <div>
        <h2>Weather in {country.capital?.[0]}</h2>
        {weather ? (
          <div>
            <p>Temperature {weather.main.temp} Celsius</p>
            <img 
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>) 
      : <h2>Weather data is not available for this territory</h2>
      }
    </div>
  )
}

export default Weather