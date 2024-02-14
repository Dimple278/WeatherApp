import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function SearchBox() {
  let [city, setCity] = useState("");
  let getWeatherInfo = async () => {
    let response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    let jsonResponse = await response.json();

    let result = {
      city: city.toLocaleUpperCase(),
      feelsLike: jsonResponse.main.feels_like,
      humidity: jsonResponse.main.humidity,
      temp: jsonResponse.main.temp,
      tempMax: jsonResponse.main.temp_max,
      tempMin: jsonResponse.main.temp_min,
      weather: jsonResponse.weather[0].description,
    };
    console.log(result);
  };

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(city);
    setCity("");
    getWeatherInfo();
  };

  return (
    <div className="SearchBox">
      <h1>Search for the weather</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br /> <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
}
