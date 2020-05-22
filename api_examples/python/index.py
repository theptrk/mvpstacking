import requests
import time
import json

def get_cb_price():
    r = requests.get(url='https://api.coinbase.com/v2/prices/BTC-USD/spot')
    data = r.json()
    return data["data"]["amount"]


# kraken
def get_kraken_price():
    headers = {"User-Agent": "Kraken REST API"}
    kraken_url = "https://api.kraken.com/0/public/Ticker?pair=xbtusd"
    r = requests.get(url=kraken_url, headers=headers)
    price = r.json()["result"]["XXBTZUSD"]['c'][0]
    return price


counter = {
    "kraken": 0,
    "cb": 0,
}
biggest_diff = 0


from datetime import date
today = date.today()
f = open(f"demofile2-{today}.txt", "a")
f.write(f"cb,kraken,diff\n")
f.close()
while True:
    f = open(f"demofile2-{today}.txt", "a")
    cb = get_cb_price()
    kraken = get_kraken_price()
    diff = float(cb)-float(kraken)

    if (abs(diff) > biggest_diff):
        biggest_diff = abs(diff)

    if (diff > 0):
        buy_at = "kraken"
        sell_at = "cb"
    else :
        buy_at = "cb"
        sell_at = "kraken"

    counter[buy_at] += 1

    print(f"diff: ${diff} : price at cb ${cb} AND price at kraken ${kraken}")
    print(f"buy_at: {buy_at} AND sell_at: {sell_at}")
    print(f"counter: {json.dumps(counter)}")
    print(f"================================================")
    f.write(f"{cb},{kraken},{diff}\n")
    f.close()
    time.sleep(5)