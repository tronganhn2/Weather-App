import React, { useState } from 'react';
import pic1 from './assets/2794169.jpg'
import pic2 from './assets/2852801-01.jpg'

 const api = {
   base: "https://api.openweathermap.org/data/2.5/",
   key: "6c86a5afeda0f9cb6ed77727df07c78f"
 }

 const bg = [pic1, pic2]
 const randomIndex = Math.floor(Math.random() * bg.length);
 const selectedBG = bg[randomIndex];

function App() {

  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const appStyle = {
    backgroundImage: `url(${selectedBG})`
  };

  return (
    <div className="app" style={appStyle}>
      <main>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="info_box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {new Date().toString().substring(0, 15)}
            </div>
          </div>

          <div className="weather_box">
            <div className="temp_type">
              {Math.round(weather.main.temp)}°C  |   {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
        

        <div className="search_box">
          <input
            type="text"
            placeholder="Search places..."
            className="search_bar"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

      </main>
    </div>
  );
}

export default App;
