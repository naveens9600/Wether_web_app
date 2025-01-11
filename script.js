const apiKey = "13583c4be354be58c56b9e8bf0379b55";

const weatherIcons = {
  "01d": "./assets/clear.png",
  "01n": "./assets/clear.png",
  "02d": "./assets/cloud.png",
  "02n": "./assets/cloud.png",
  "03d": "./assets/drizzle.png",
  "03n": "./assets/drizzle.png",
  "04d": "./assets/drizzle.png",
  "04n": "./assets/drizzle.png",
  "09d": "./assets/rain.png",
  "09n": "./assets/rain.png",
  "10d": "./assets/rain.png",
  "10n": "./assets/rain.png",
  "13d": "./assets/snow.png",
  "13n": "./assets/snow.png",
};

async function searchWeather() {
  const cityInput = document.getElementById("cityInput").value || "Salem";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found!");
      return;
    }

    document.getElementById("temp").textContent = `${Math.floor(data.main.temp)}°C`;
    document.getElementById("city").textContent = data.name;
    document.getElementById("country").textContent = data.sys.country;
    document.getElementById("lat").textContent = data.coord.lat;
    document.getElementById("lon").textContent = data.coord.lon;
    document.getElementById("humidity").textContent = `${data.main.humidity}%`;
    document.getElementById("wind").textContent = `${data.wind.speed} Km/h`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = weatherIcons[iconCode] || "./assets/clear.png";

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Trigger search when Enter key is pressed
document.getElementById("cityInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchWeather();
  }
});

// Initial search for default city
searchWeather();
