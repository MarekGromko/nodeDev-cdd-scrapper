import os
import json
import requests
from datetime import datetime
import pandas as pd

API_URL        = "https://api.exchangeratesapi.io/latest"
API_ACCESS_KEY = os.getenv("EXCHANGE_RATES_API_ACCESS_KEY")
profile_name   = "exchangeratesapi"
# {
#   "success":true,
#   "timestamp":1764729244,
#   "base":"EUR",
#   "date":"2025-12-03",
#   "rates":{
#     "USD":1.163735,
#     "AUD":1.770774,
#     "CAD":1.625569,
#     "PLN":4.230514,
#     "MXN":21.269645
#   }
# }

def load_profile():
    with open(f"profiles/{profile_name}.json", "r+") as f:
        try:
            raw = f.read()
            return json.loads(raw)
        except json.JSONDecodeError as e:
            print(f"Error loading profile: {e}")
            f.write("{}")
            return {}

def save_profile(profile: dict):
    with open(f"profiles/{profile_name}.json", "w+") as f:
        f.write(json.dumps(profile, indent=2))
    

def parse_data(data):
    df = pd.DataFrame.from_dict(data["rates"], orient="index", columns=["rate"])
    df = df.reset_index().rename(columns={"index": "currency"})
    df["date"] = datetime.fromtimestamp(data["timestamp"]).isoformat()
    return df

def fetch_latest():
    profile = load_profile()
    response = requests.get(API_URL, params={"access_key": API_ACCESS_KEY, "base": "USD"})
    response.raise_for_status()
    data = response.json()
    if not data["success"]:
        raise Exception(f"({data['error']['type']}) {data['error']['info']}")
    
    if data["timestamp"] != profile.get("timestamp"):
        profile["timestamp"] = data["timestamp"]
        profile["data"] = data
        save_profile(profile)
    else:
        return None
    
    return parse_data(data)

def fetch_historical(date_str):
    profile = load_profile()
    response = requests.get(f"https://api.exchangeratesapi.io/{date_str}", params={"access_key": API_ACCESS_KEY, "base": "USD"})
    response.raise_for_status()
    data = response.json()
    
    if not data["success"]:
        raise Exception(f"({data['error']['type']}) {data['error']['info']}")
    
    if data["timestamp"] != profile.get("timestamp"):
        profile["timestamp"] = data["timestamp"]
        profile["data"] = data
        save_profile(profile)
    else:
        return None
    return parse_data(data)
    