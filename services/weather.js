const axios = require("axios");

async function fetchWeather(city, apiKey) {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric"
        },
      }
    );

    return response.data.weather[0].main;

  } catch (error) {
    if (error.response?.data?.message === "city not found") {
      console.log(`⚠️ Invalid city: ${city}`);
    } else {
      console.log("Error:", error.message);
    }
    return null;
  }
}

module.exports = { fetchWeather };