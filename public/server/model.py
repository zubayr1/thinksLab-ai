from config import Config
import openai

#openai.api_key = Config.OPENAI_API
openai.api_key = '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'

def model(prompt):
    completions = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": prompt}]
    )
    return completions
