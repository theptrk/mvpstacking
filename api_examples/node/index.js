const axios = require('axios');
const secrets = require('./secrets')

getData()

async function getData() {
  try {
    let stock_data = await getStockData()    
    let weather_data = await getWeatherData()    
    let data = { stock_data, weather_data }
    console.log(JSON.stringify(data, null, 2))
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
  }
}

async function getStockData(tickers="AAPL") {
  try {
    var url = `https://data.alpaca.markets/v1/bars/day?symbols=${tickers}`
    let response = await axios.get(url, {
      params: {
        "limit": 7
      },
      headers: {
        "APCA-API-SECRET-KEY": secrets["APCA-API-SECRET-KEY"],
        "APCA-API-KEY-ID": secrets["APCA-API-KEY-ID"]
      }
    })
    return translateSymbols(response.data);
  } catch (err) {
    console.log(err)
  }
}

const translateSymbols = (symbols) => {
  return translateObjValues(symbols, (symbol) => translateObjKeysList(symbol))
}

const translateObjKeysList = (list) => {
  const alpacaDict = {
    't': "beginning_of_bar",
    'o':"open_price",
    'h':"high_price",
    'l':"low_price",
    'c':"close_price",
    'v':"volume",
  }
  return list.map(obj => translateObjKeys(obj, alpacaDict))
}


async function getWeatherData() {
  var lat = 37.783533;
  var lon = -122.493334;
  var exclude = "daily,hourly";
  var API_KEY = "9e3f9ebc8da776c7cc6f8f06b80a9203";
  var base = "http://api.openweathermap.org/data/2.5/weather?"
  var weather_url = base + "lat=" + lat
    + "&lon=" + lon
    + "&appid=" + API_KEY
    + "&units=imperial";
  try {
    let weather_response = await axios.get(weather_url)
    return weather_response.data;
  } catch (err) {
    console.log(err)
  }
}

// ===== UTILITIES ====
function translateObjValues(obj, fn) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = fn(obj[key])
    return acc
  }, {});
}
function translateObjKeys(obj, dict) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[dict[key]] = obj[key]
    return acc
  }, {});
}
