const axios = require('axios');
const Pool = require('pg').Pool

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

const pool = new Pool({
  user: null,
  host: 'localhost',
  database: 'infoapis',
  password: null,
  port: 5432,
})

async function saveWeather() {
  // save to pg
  // return
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
      'openweather', 
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

async function getSavedWeather(city) {
  try {
    var results;
    if (city) {
      let query = `
      SELECT * FROM api_responses 
      WHERE lower(request_payload->>'city') = lower('${city}')`
      results = await pool.query(query)
    } else {
      results = await pool.query('SELECT * FROM api_responses')
    }
    let rows = results.rows
    return rows
  } catch (err) {
    console.log(err)
  }
}


module.exports = { 
  requestWeather, 
  test, 
  saveWeather, 
  testSaveWeather, 
  getSavedWeather 
}