from config import Config
import openai
openai_API = Config.OPENAI_API
openai.api_key = openai_API

def model(prompt):
    '''model = "text-davinci-003"
    completions = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )'''
    completions = openai.ChatCompletion.create(
    model="gpt-3.5-turbo", 
    messages=[{"role": "user", "content": prompt}]
    )
    return completions