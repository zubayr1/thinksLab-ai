from Levenshtein import distance
import random
from model import model
import openai



def is_levdist_small(wordlist, prompt):
    for word in wordlist:
        levdist = distance(word, prompt)
        if levdist < 3:
            return True
    return False


def generate_response(email, prompt, promptCurrent):
    if promptCurrent:
        
        greetings = ["hi", "hello", "hey"]
        farewells = ["bye", "goodbye", "see you later"]
        
        response_dict = {"greeting": ["Hello there!", "Hi there!", "Hey!"],
                         "farewell": ["Goodbye!", "Bye!", "See you later!"]}

        if is_levdist_small(greetings, promptCurrent):
            message = random.choice(response_dict["greeting"])
            return message, 0
        elif is_levdist_small(farewells, promptCurrent):
            message = random.choice(response_dict["farewell"])
            return message, 0

        try:
            completions = model(prompt)
            message = completions['choices'][0]['message']['content'] #for gpt turbo
            #print('total tokens: ', completions['usage']['total_tokens'])
            # with open('totalTokens.csv','a') as fd:
            #     fd.write(email + ': ' + str(completions['usage']['total_tokens']))
            #     fd.write('\n')
            #print('messaage: ', message)
            return message, completions['usage']['total_tokens']
        except openai.error.RateLimitError:
            return "Sorry, but due to overload of usage, we are currently out of service. Please try again later.", 0
    else:
        return 'Please write your question or answer to my previous question.', 0
