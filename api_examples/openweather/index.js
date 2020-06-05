const path = require('path')
const express = require('express')
const app = express()
const port = 3000

const getWeather = require('./requestWeather').getWeather;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/weather', async function (req, res) {
 try {
    let city = req.query['city']
    if (city === undefined) {
      return res.send("no city provided")
    }
    res.send(await getWeather(city));
  } catch (err) {
    res.send("error occurred")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})