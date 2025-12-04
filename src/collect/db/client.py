from pymongo import MongoClient
import os

MONGODB_URI    = os.getenv("MONGODB_URI")
MONGODB_DBNAME = os.getenv("MONGODB_DBNAME")

client     = MongoClient(MONGODB_URI)
db         = client[MONGODB_DBNAME]
collection = db["rates"]
collection.create_index("date")

def get_collection():
    return collection

def close_connection():
    client.close()