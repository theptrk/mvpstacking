Steps
- create a python dir (use venv for virtual environment)
- import requets, make requests to API
- create a loop
- perform logic for requests
    - get two prices
    - compare prices
    - append to file
- flask
    - expose endpoint

Ecosytem
1: bot: scripts to download from an API, perform logic

2: persistence: bot writes to file
 -> why? files are cheap, alt is write to a db

3: api: flask server reads from persistence and shows data
 -> why? dashboard to see important stats

4: event driven log: 
 [ ] bitcoin arbitrage - when passed a threshold, make a trade


Deployment Heroku
1: create an app
2: upload code
3: build commands and run commands will run your app
4: create and write to a postgresdb