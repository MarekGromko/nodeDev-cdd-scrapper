import utils.init_log
from dotenv import load_dotenv
load_dotenv()

import sys
import logging
logging.basicConfig(level=logging.INFO, filename='logs/app.log', filemode='a+',
                    format='%(asctime)s - %(levelname)s - %(message)s')
logging.getLogger().addHandler(logging.StreamHandler(sys.stdout))
