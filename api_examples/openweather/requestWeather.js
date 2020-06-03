var axios = require('axios');

async function requestWeather(city) {
  const API_KEY = "9e3f9ebc8da776c7cc6f8f06b80a9203";
  const url = "http://api.openweathermap.org/data/2.5/weather?" +
    "&q=" + city +
    "&appid=" + API_KEY +
    "&units=imperial";

  var response = await axios.get(url)
  return response.data
}

async function test() {
  var weather = await requestWeather("San Francisco")
  console.log(weather)
  return weather;
}

module.exports = { requestWeather, test }