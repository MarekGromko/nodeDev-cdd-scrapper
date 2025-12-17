import logging
import os
import requests
import pandas as pd
from datetime import datetime, timedelta
from utils.db import collection
from utils.profiles import load_profile, save_profile

API_URL        = "https://api.exchangeratesapi.io/latest"
API_ACCESS_KEY = os.getenv("EXCHANGE_RATES_API_ACCESS_KEY")
PROFILE_NAME   = "exchangeratesapi"

def make_params():
    return {
        "access_key": API_ACCESS_KEY,
        "base": "USD"
    }

def raise_for_bad_data(data):
    if not data["success"]:
        raise Exception(f"({data['error']['type']}) {data['error']['info']}")

def parse_rates(data):
    df = pd.DataFrame.from_dict(data["rates"], orient="index", columns=["valeur"])
    df = df.reset_index().rename(columns={"index": "code"})
    df["date"] = datetime.fromtimestamp(data["timestamp"]).isoformat()
    return df

def get_latest():
    return collection.find_one(sort=[("date", -1)])

def get_oldest():
    return collection.find_one(sort=[("date", 1)])

def fetch_specific(date: str, allow_dups: bool = False):
    profile = load_profile(PROFILE_NAME)
    
    res = requests.get(f"https://api.exchangeratesapi.io/{date}", params=make_params())
    res.raise_for_status()

    data = res.json()
    raise_for_bad_data(data)
    if collection.find_one({"date": datetime.fromtimestamp(data["timestamp"]).isoformat()}) is not None:
        if(not allow_dups):
            logging.info("Data for this date already exists. Aborting")
            return None
        else:
            logging.info("Data for this date already exists. Inserting duplicate as allow_dups=True")
        
    profile["timestamp"] = data["timestamp"]
    profile["data"]      = data
    df = parse_rates(data)
    print(df)
    collection.insert_many(df.to_dict("records"))
    logging.info(f"Inserted rates for {date}")
    save_profile(PROFILE_NAME, profile)

choices = {
    "1": "Get latest rates saved",
    "2": "Get oldest rates saved",
    "3": "Fetch specific date rates",
    "h": "Show this menu again",
    "Any": "Quit"
}