from pymongo import MongoClient
import os

MONGODB_URI         = os.getenv("MONGODB_URI")
MONGODB_DBNAME      = os.getenv("MONGODB_DBNAME")
MONGODB_COLLECTION  = os.getenv("MONGODB_COLLECTION")

client     = MongoClient(MONGODB_URI)
db         = client[MONGODB_DBNAME]
collection = db[MONGODB_COLLECTION]
collection.create_index("date")
collection.create_index("code")

def close_connection():
    client.close()