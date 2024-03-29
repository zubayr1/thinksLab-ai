from config import Config
import openai

openai.api_key = Config.OPENAI_API

def model(prompt):
    completions = openai.ChatCompletion.create(
    model="gpt-4-0125-preview", 
    messages=[{"role": "user", "content": prompt}]
    )
    return completions
