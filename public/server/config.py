import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    OPENAI_API = os.getenv("OPENAI_API")

