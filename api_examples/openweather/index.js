const express = require('express')
const app = express()
const port = 3000

const requestWeather = require('./requestWeather').requestWeather;

app.get('/', async function handleRequest(req, res) {
 try {
    let city = req.query['city']
    if (city === undefined) {
      return res.send("no city provided")
    }
    res.send(await requestWeather(city));
  } catch (err) {
    res.send("error occurred")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})