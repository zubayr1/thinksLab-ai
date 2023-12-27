from Levenshtein import distance
import random
from model import model
import openai
import sqlite3
import time
from flask import Flask, request, redirect, session, url_for, render_template, flash




def is_levdist_small(wordlist, prompt):
    for word in wordlist:
        levdist = distance(word, prompt)
        if levdist < 3:
            return True
    return False


def generate_response(email, prompt, promptCurrent):
    if promptCurrent:
        #print('prompt: ', prompt)
        #print('promptCurrent', promptCurrent)
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

    

def checkUserResponseTrueOrFalse(promptUser):
    promptDefault = "I will give you a prompt. If it is something like 'I dont know' or 'I am not sure', etc. then just give 'False' \
          as your response. Else, just give 'True' as your response. The prompt is here: "
    
    prompt = promptDefault + promptUser
    completions = model(prompt)
    message = completions['choices'][0]['message']['content']
    return message
    

def trim_questionaire_responses1(response):
    if '1.' in response:
        idxStart = response.index('1.')
        response = response[idxStart:]
    else:
        response = '1. What are your educational goals? 2. What is your current level of knowledge in the field? 3. What courses have you taken in the past that were related to the field? 4. What specific skills do you want to learn or improve in the field? 5. What type of learning environment do you prefer (online, in-person, etc.)? 6. Are you looking for a certificate, diploma, or degree program? 7. What is your budget for tuition and other related costs? 8. Are there any specific topics or specializations you are interested in?'
    
    if '9.' in response:
        idxFinish = response.index('9.')
        response = response[:idxFinish]
    elif '7.' in response:
        idxFinish = response.index('7.')
        response = response[:idxFinish]
    elif '6.' in response:
        idxFinish = response.index('6.')
        response = response[:idxFinish]
    elif '5.' in response:
        idxFinish = response.index('5.')
        response = response[:idxFinish]
    else:
        response = '1. What are your educational goals? 2. What is your current level of knowledge in the field? 3. What courses have you taken in the past that were related to the field? 4. What specific skills do you want to learn or improve in the field? 5. What type of learning environment do you prefer (online, in-person, etc.)? 6. Are you looking for a certificate, diploma, or degree program? 7. What is your budget for tuition and other related costs? 8. Are there any specific topics or specializations you are interested in?'

    return response





def trim_questionaire_responses(response):
    if ':' in response:
        idx = response.index(':')
        response = response[idx+1:]
    return response


def addBr(response):
    for i in range(1, 10):  
        num_str = str(i) + '.' 
        if num_str in response:
            idx = response.index(num_str) 
            response = response[:idx-1] + '<br>' + response[idx-1:] 
    return response



def update_user_table(email, tokens):
    # connect to the database and select the row with the specified email
    conn = sqlite3.connect('users.sql')
    c = conn.cursor()
    print(email)
    c.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    
    print(user)
    # update the usage value and check if it exceeds the threshold
    usage = user[4] + tokens
    if usage > 5000:
        # if the usage exceeds the threshold, set the blocked column to the current time
        blocked_time = int(time.time())
        c.execute("UPDATE users SET usage = ?, blocked = ? WHERE email = ?", (usage, blocked_time, email))
    else:
        # if the usage does not exceed the threshold, just update the usage value
        c.execute("UPDATE users SET usage = ? WHERE email = ?", (usage, email))
    
    # commit the changes and close the connection
    conn.commit()
    conn.close()


def check_blocked(email):
    # connect to the database and select the row with the specified email
    conn = sqlite3.connect('users.sql')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = c.fetchone()
    #print(email, user)

    blocked = user[4]
    blockedSoFar = user[5]
    #check if not blocked:
    if blocked==0:
        return False
    
    #check if blocked and if it is time to unblock
    current_time = int(time.time())
    opening_time = blocked + 86400
    if current_time>opening_time:
        blocked = 0
        usage = 0
        c.execute("UPDATE users SET blocked = ?, usage = ? WHERE email = ?", (blocked, usage,  email))
        conn.commit()
        return False
    c.execute("UPDATE users SET blockedSoFar = ? WHERE email = ?", (blockedSoFar+1, email))
    conn.commit()
    return True



def count_words(input_string):
    words = input_string.split()
    return len(words)    