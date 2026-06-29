// Alaa Ahmad
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("btn");
  const weatherInfoDiv = document.getElementById("weather-info");

  const apiKey = "6e04cf488029486ffa5d0750c2955c90";

  const getWeather = async (city) => {
    const apiUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.error.info);
      }

      displayWeather(data); // Call the function to display the data
    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError(error.message);
    }
  };

  const displayWeather = (data) => {
    weatherInfoDiv.innerHTML = "";

    const cityName = data.location.name;
    const temperature = data.current.temperature;
    const description = data.current.weather_descriptions[0];
    const humidity = data.current.humidity; //الرطوبة
    const location = data.location.localtime;
    const timezone = data.location.timezone_id;
    const weatherIconUrl = data.current.weather_icons[0]; //link for icons it is in url

    const weatherIcon = document.createElement("img");
    weatherIcon.src = weatherIconUrl;

    const cityElement = document.createElement("h2");
    cityElement.textContent = `Weather in ${cityName}`;

    const tempElement = document.createElement("p");
    tempElement.textContent = `Temperature: ${temperature}°C`;

    const descElement = document.createElement("p");
    descElement.textContent = `Description: ${description}`;

    const timezoneElement = document.createElement("p");
    timezoneElement.textContent = `Time Zone ID: ${timezone}`;

    const locationElement = document.createElement("p");
    locationElement.textContent = `local time: ${location}`;

    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${humidity}%`;

    weatherInfoDiv.append(weatherIcon);
    weatherInfoDiv.append(cityElement);
    weatherInfoDiv.append(tempElement);
    weatherInfoDiv.append(descElement);
    weatherInfoDiv.append(timezoneElement);
    weatherInfoDiv.append(locationElement);
    weatherInfoDiv.append(humidityElement);
  };

  const displayError = (message) => {
    weatherInfoDiv.innerHTML = `<p class="error">${message}</p>`;
  };

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city);
    } else {
      alert("Please enter a city name.");
    }
  });
});
