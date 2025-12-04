from dotenv import load_dotenv
load_dotenv()

import sys
import logging
logging.basicConfig(level=logging.INFO, filename='logs/app.log', filemode='a+',
                    format='%(asctime)s - %(levelname)s - %(message)s')
logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))

from fetch_historicals import fetch_historicals

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO, filename='logs/app.log', filemode='a+',
                    format='%(asctime)s - %(levelname)s - %(message)s')
    logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))
    fetch_historicals()