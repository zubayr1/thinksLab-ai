from config import Config
import openai

openai.api_key = Config.OPENAI_API

def model(prompt):
    completions = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": prompt}]
    )
    return completions
