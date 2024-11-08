import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const apiKey = "d294496f97df43b3939194323240811";
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      if (!res.ok) {
        setData(null);
        setIsLoading(false);
        alert("Failed to fetch weather data");
      } else {
        const data = await res.json();
        setData(data);
        console.log(data);
        setIsLoading(false);
      }
    } catch (error) {}
  };
  return (
    <div
      className="App"
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          fontFamily: "sans-serif",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(event) => setCity(event.target.value)}
        ></input>
        <button>Search</button>
      </form>
      {isLoading && <p>Loading data…</p>}

      {data && (
        <div className="weather-cards">
          <div className="weather-card">
            <b>
              <p>Temperature</p>
            </b>
            <p>{data.current.temp_c}°C</p>
          </div>

          <div className="weather-card">
            <b>
              <p>Humidity</p>
            </b>
            <p>{data.current.humidity}%</p>
          </div>

          <div className="weather-card">
            <b>
              <p>Condition</p>
            </b>
            <p>{data.current.condition.text}</p>
          </div>

          <div className="weather-card">
            <b>
              <p>Wind Speed</p>
            </b>
            <p>{data.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
