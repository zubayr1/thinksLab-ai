from flask import Flask, jsonify, request

from flask_cors import CORS

from helper import *
from config import Config

app = Flask(__name__)

CORS(app)

email_id = ""
questions = []

tokens = 0

language = "English"

@app.route('/save_email', methods=['POST'])
def save_email():
    global email_id
    data = request.get_json()
    email_id = data.get('email', '')  # Get the email ID from the request data
    print('Received email from frontend:', email_id)
    return jsonify({'message': email_id})


@app.route('/add_question', methods=['POST'])
def add_question():
    global question
    data = request.get_json()
    question = data.get('question', '')
    questions.append(question)
    print(questions)
    return jsonify({'message': 'Question added successfully'})


# App Bot route
@app.route("/bot", methods=["GET"])
def bot():    
    global email_id
    global question
    global tokens

    prompt = "You are a study advisor created by ThinkLabsAI. You are helpful and can understand different intents \
                and respond with emotions and support. A student has come to you \
                for some help. He wants to come to the UK to study.  \
                Write 5 questions to find suitable courses for the student. \
                Separate each line with <br> like HTML format. Directly start with the questions like 1. 2. 3. ... without any introduction. " \
                    + "Speak in " + language
    
    response = "" 
    
    
    if len(questions)==0:
        response, tokens = generate_response(email_id, prompt, prompt)
        
    else:
        response, tokens = generate_response(email_id, questions[len(questions)-1], prompt)

    return jsonify({"prompt": response, "tokens": tokens})
    




#     if prev == '':
#         if botType=='Career Guidance':
#             prompt = "You are a study advisor. You are helpful and can understand different intents \
#                 and respond with emotions and support. A student has come to you \
#                 for some help. He wants to come to the UK to study.  \
#                 Write 5 questions to find suitable courses for the student. \
#                 Separate each line with <br> like HTML format. Directly start with the questions like 1. 2. 3. ... without any introduction. " \
#                     + "Speak in " + language
#         elif botType=='Finance':
#             prompt = "You are a study advisor specialized in the financial side of coming to UK to study. \
#                 You are helpful and can understand different intents \
#                 and respond with emotions and support. A student has come to you \
#                 for some help. He wants to come to the UK to study and needs your help to understand the financial \
#                 side of coming to UK for study. \
#                 Write 5 questions to find what finance related help the student needs. \
#                 Separate each line with <br> like HTML format.Directly start with the questions like 1. 2. 3. ... without any introduction. " \
#                     + "Speak in " + language
#         else:
#             prompt = "You are a study advisor specialized in the lifestyle of students studying in the UK. \
#                 You are helpful and can understand different intents \
#                 and respond with emotions and support. A student has come to you \
#                 for some help. He wants to come to the UK to study and needs your help to understand the lifestyle,  \
#                 cost of living, etc. in UK for study. \
#                 Write 5 questions to find what help the student needs. \
#                 Separate each line with <br> like HTML format. Directly start with the questions like 1. 2. 3. ... without any introduction. " \
#                     + "Speak in " + language
            
#         response, tokens = generate_response(email, prompt, prompt)
#         update_user_table(email, tokens)

#         #response = trim_questionaire_responses1(response)
#         session['previous'] = response
#         session['visited'] = True
#         session['now_second_set_of_questions'] = True
#         session['now_third_set_of_questions'] = False

#         intro_msg = 'Hello there, I hope you are having a good day! I am happy to help you. \
#             Please answer these questions:<br>'
#         session['chats'].append(intro_msg + response)

        
#         #read number of words
#         wordsCount = session.get('wordsCount') + count_words(intro_msg + response)
#         session['wordsCount'] =  wordsCount
#         print(wordsCount)
#         print(session.get('wordsCount'))

#         return render_template("bot.html", response=intro_msg + response, wordsCount=wordsCount)
    

#     # Handle form submission
#     if request.method == "POST":
#         # Handle second set of questions
#         if session.get('now_second_set_of_questions', True):
#             prev = session.get('previous', '')
#             prompt = request.form["prompt"]
#             prompt_current = prompt
#             if botType=='Career Guidance':
#                 prompt = 'Write 5 more questions to specify the needs for the student who wants to come to the UK for study. ' \
#                         'Your previous questions were: ' + prev + ' and previous answers were: ' + prompt + ' Separate each question with <br> like HTML format to make line breaks.' \
#                         + "Speak in " + language
#             elif botType=='Finance':
#                 prompt = 'Write 3 more questions to specify the needs related to the finance side of coming to UK to study \
#                         for the student who wants to come to the UK for study. ' \
#                         'Your previous questions were: ' + prev + ' and previous answers were: ' + prompt + ' Separate each question with <br> like HTML format to make line breaks.' \
#                         + "Speak in " + language
#             else:
#                 prompt = 'Write 2 more questions to specify the needs related to the lifestyle of students studying in the UK ' \
#                         'Your previous questions were: ' + prev + ' and previous answers were: ' + prompt + ' Separate each question with <br> like HTML format to make line breaks.' \
#                         + "Speak in " + language
                     
#             response, tokens = generate_response(email, prompt, prompt_current)
#             update_user_table(email, tokens)

#             #response = trim_questionaire_responses1(response)
#             if botType=='Career Guidance':
#                 session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help. Your previous questions were: ' + \
#                     prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
#             elif botType=='Finance':
#                 session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help regarding the financial side of coming to UK to study. \
#                     You are specialized in this domain and you know about these financial aspects. Your previous questions were: ' + \
#                     prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
#             else:
#                 session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help regarding the lifestyle of students studying in UK. \
#                     You are specialized in this domain and you know about these aspects. Your previous questions were: ' + \
#                     prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response

#             session['now_second_set_of_questions'] = False
#             session['now_third_set_of_questions'] = True

#         elif session.get('now_third_set_of_questions', True):
#             prompt = request.form["prompt"]
#             prompt_current = prompt
#             prev = session.get('previous', '')
#             if botType=='Career Guidance':
#                 prompt = prev + '. Answers from him to those questions: ' + prompt + '. Now write 1 more question to specify the needs for the student who wants to come to the UK for study.' \
#                 + "Speak in " + language
#             elif botType=='Finance':
#                 prompt = prev + '. Answers from him to those questions: ' + prompt + '. Now write 1 more question to specify the needs for the student who wants to come to the UK for study and \
#                 needs your help to understand the financial side of coming to UK to study. ' + "Speak in " + language
#             else:
#                 prompt = prev + '. Answers from him to those questions: ' + prompt + '. Now write 1 more question to specify the needs for the student who wants to come to the UK for study and \
#                 needs your help to understand the lifestyle of students studying in UK. ' + "Speak in " + language
                

#             response, tokens = generate_response(email, prompt, prompt_current)
#             update_user_table(email, tokens)

#             session['now_third_set_of_questions'] = False
#             session['previous'] = prompt + '. And your response was: ' + response

#         else:
#             prompt = request.form["prompt"]
#             prompt_current = prompt
#             prev = session.get('previous', '')
#             if botType=='Career Guidance':
#                 prompt = prev + '. The user asks: ' + prompt + '. Now help the user with their possible study in the UK. ' \
#                         'Separate each line with <br> like HTML format.' + "Speak in " + language
#             elif botType=='Finance':
#                 prompt = prev + '. The user asks: ' + prompt + '. Now help the user with their questions on financial side of coming to UK to study. ' \
#                         'Separate each line with <br> like HTML format.' + "Speak in " + language
#             else:
#                 prompt = prev + '. The user asks: ' + prompt + '. Now help the user with their questions on lifestyle of students studying in UK. ' \
#                         'Separate each line with <br> like HTML format.' + "Speak in " + language
                
#             response, tokens = generate_response(email, prompt, prompt_current)
#             update_user_table(email, tokens)

#             response = trim_questionaire_responses2(response)
#             session['previous'] = prompt + '. Your response: ' + response

#         # Append the user's response and the bot's response to the 'chats' session variable
#         session['chats'].append(prompt_current)
#         session['chats'].append(response)


#         #read number of words
#         wordsCount = session.get('wordsCount') + count_words(prompt_current + ' ' +  response)
#         session['wordsCount'] =  wordsCount

#         return render_template("bot.html", response=response, wordsCount=wordsCount)

#     # If this is not the first visit and no prompt was submitted, render the page with an empty response
#     defaultSTR = "As an AI language model, I am here to help you in a professional and engaging manner. What else would you like to know or discuss?"
#     wordsCount = count_words(defaultSTR)
#     return render_template("bot.html", response=defaultSTR, wordsCount=wordsCount)




if __name__=="__main__":
    app.run(debug=True)