# Open Weather

## The postgres database and tables must be created for saving
```bash
$ createdb infoapis
$ psql < createtables.sql
```

## How to start the server
```bash
$ npm install
$ npm start
```

- How to psql your database
```bash
$ psql infoapis
```

- Common commands in psql
```sql
-- Inspect all table relations
infoapis=# \d

-- Inspect table "api_responses"
infoapis=# \d api_responses

-- Get all "api_responses"
infoapis=# select * from api_responses;

-- Get all "api_responses" where the json in the "request_payload" column called "city" 
-- has a field that is a case insentive match to "San Francisco"
infoapis=# select * from api_responses where request_payload->>'city' ilike 'San Francisco';
```
- How to test in a node repl
```javascript
var requestWeather = require("./requestWeather");

// get the weather and print to console
requestWeather.test();

// write an example request/response to the database; read the database
requestWeather.testSaveWeather();
requestWeather.getSavedWeather();
```