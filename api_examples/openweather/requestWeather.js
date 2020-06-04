const axios = require('axios');
const Pool = require('pg').Pool

async function getWeather(city) {
  try {
    var weather = await requestWeather(city);
    var rows = await saveWeather({ city }, weather);
    return rows;
  } catch (err) {
    throw Error("error: api is down or db is down")
  }
}

async function checkDB(city) {
}

async function requestWeather(city) {
  try {
    const API_KEY = "9e3f9ebc8da776c7cc6f8f06b80a9203";
    const url = "http://api.openweathermap.org/data/2.5/weather?" +
      "&q=" + city +
      "&appid=" + API_KEY +
      "&units=imperial";

    var response = await axios.get(url)
    return response.data
  } catch (err) {
    throw Error("error occurred on api call: maybe you are offline or api is down")
  }
}

async function test() {
  var weather = await requestWeather("San Francisco")
  console.log(weather)
  return weather;
}

const pool = new Pool({
  user: null,
  host: 'localhost',
  database: 'infoapis',
  password: null,
  port: 5432,
})

async function saveWeather(request_payload, response_payload) {
  const queryText = `
    INSERT INTO api_responses 
      (name, request_payload, response_payload) 
    VALUES($1, $2, $3) 
    RETURNING *`;
  const queryValues = [
    'openweather', 
    JSON.stringify(request_payload), 
    JSON.stringify(response_payload)
  ];
  try {
    let results = await pool.query(queryText, queryValues);
    let rows = results.rows
    return rows;
  } catch (err) {
    throw Error("Oh no; db down")
  }
}

async function testSaveWeather(city, temperature, humidity) {
  try {
    var city = city || "San Francisco"
    var temperature = temperature || Math.floor(Math.random() * 100)
    var humidity = humidity || Math.floor(Math.random() * 100)
    const queryText = `
      INSERT INTO api_responses 
        (name, request_payload, response_payload) 
      VALUES($1, $2, $3) 
      RETURNING *`
    const queryValues = [
      'testing_openweather', 
      `{"city": "${city}"}`, 
      `{"temperature": "${temperature}", "humidity": ${humidity}}`
    ]
    let results = await pool.query(queryText, queryValues);
    let rows = results.rows
    console.log(rows)
  } catch (err) {
    console.log(err)
  }
}

async function getSavedWeather(city, recent=false) {
    var queryParts = ['SELECT * FROM api_responses'];
    if (city) {
      queryParts.push(`WHERE request_payload->>'city' ILIKE '${city}'`)
    }
    if (recent) {
      queryParts.push(`AND timestamp BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()`)
    }
    var query = queryParts.join(' ');
    var results = await pool.query(query);
    var rows = results.rows
    return rows
}

// This is a helper function for printing in the repl
async function print(promise) {
  promise.then(x => console.log(x))
}


module.exports = { 
  requestWeather, 
  test, 
  saveWeather, 
  testSaveWeather, 
  getSavedWeather,
  getWeather,
  print
}