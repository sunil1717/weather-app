import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();

    if (!location.trim()) return;

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: location,
            appid:"a6d37483f1226fe96379506c0fb54829", // Replace with your actual API key
            units:"metric",
          },
        }
      );
      
      
      const data = response.data;
      setWeather({
        city: data.name,
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setWeather({ error: "Location not found or API error!" });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-indigo-500 flex flex-col items-center justify-center px-4">
       <h1 className="text-4xl font-semibold">Check your Weather </h1>
      <div className="w-full max-w-md border-gray-600 border-1 shadow-amber-200 bg-gray-300 rounded-2xl shadow-lg p-6 mt-6">
        {/* Weather Display */}
        {weather && (
          <div className="text-center mb-6">
            {weather.error ? (
              <p className="text-red-500 font-semibold">{weather.error}</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800">{weather.city}</h2>
                <p className="text-xl text-gray-600">{weather.temp}°C</p>
                <p className="capitalize text-gray-500">{weather.desc}</p>
                <img
                  className="mx-auto mt-2"
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.desc}
                />
              </>
            )}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={fetchWeather} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Your location"
            className="w-full sm:flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-br from-pink-400 to-indigo-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium transition"
          >
            Get Weather
          </button>
        </form>
      </div>
    </div>
  )
}

export default App