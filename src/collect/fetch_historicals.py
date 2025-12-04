from api.exchangeratesapi import fetch_historical, load_profile
from db.client import get_collection
from datetime import datetime, timedelta
import time
import logging

def fetch_historicals():
    profile = load_profile()

    date   = datetime.fromtimestamp(profile.get("timestamp") if profile.get("timestamp") else time.time())
    offset = timedelta(days=1)
    collection = get_collection()

    while True:
        date -= offset
        date_str = date.strftime("%Y-%m-%d")
        try :
            df = fetch_historical(date_str)
        except Exception as e:
            logging.error(f"Error fetching historical rates for {date_str}: {e}")
            break
        if df is not None:
            records = df.to_dict("records")
            collection.insert_many(records)
            logging.info(f"Inserted historical rates for {date_str}")
        else:
            logging.info(f"Rates for {date_str} already up to date, stopping.")
            break
        time.sleep(1)

