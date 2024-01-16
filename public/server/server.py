from flask import Flask, jsonify, request

from flask_cors import CORS

from helper import *
from config import Config

app = Flask(__name__)
app.secret_key = 'SarahTheWarriorPrincess'


CORS(app, resources={r"/bot/*": {"origins": "*"}})



# Create the database table
'''conn = sqlite3.connect("users.sql")
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, usage INTEGER, blocked INTEGER, blockedSoFar INTEGER)")
conn.commit()
conn.close()
'''


email_id = ""
questions = []

tokens = 0

language = "English"



# App Bot route
@app.route("/bot", methods=["GET", "POST"])
def bot():
    data = request.json
        
    selected_option = data.get('selected_option', '')

    email = data.get('email', '')

    messagetype = data.get('messagetype', '')

    questions_set = data.get('questions_set', '')

    prev= data.get('prev', '')

    wordsCount = data.get('tokens', '0')

    question = data.get('question', '')

    if selected_option==None:
        selected_option='home'

    question1 = "What level of study are you interested in pursuing (e.g., undergraduate, postgraduate, professional certifications such as GSEC)?"
        
    questionY1 = "Are there specific topics or fields you are particularly passionate about, or do you have a preference for any specific universities or courses?"
    questionN1 = "What is your current qualification? Are there any academic areas or careers you find interesting?"

    questionY2 = "Have you identified any specific career goals or industries you would like to pursue after completing your education?"
    
    questionYY2 = "What are your key skills and strengths, encompassing both academic and personal attributes?"
    questionYN2 = "Tell me more about your passions or any part-time jobs you've undertaken, extra courses you've pursued, or skills you've gained."
    
    questionNY1 = "Could you share details about your last qualification, such as grades or relevant skills acquired? Additionally, please mention any personal attributes you believe would be relevant to your career."

    homeG1 = "Considering both your financial plans and preferred location, do you have any specific budget constraints or preferences for studying in a particular city or region?"

    internationalG1 = "Are you familiar with the application process for international students wanting to study in the UK? Additionally, are you aware of the necessary documents and requirements?"
    internationalG2 = "Do you have any particular financial budget for the tuition fees and living expenses?"
    internationalG3 = "Are you interested in any part-time jobs, internships etc. during your studies?"


    nextLinePrompt = " Please add \n before every '1.', '2.', '3.', etc. so that they go to next line when viewed in HTML safe mode. "

    language = "English UK"

    constraint = " If the student talks about anything other than application in UK, humbly deny to answer and request to stick to the context of applications in UK. "

    if messagetype == "initial":
                 
        #print('initial')
        # Initialize the 'chats' session variable if it doesn't exist

        if prev == '':
            if selected_option == 'international':
                prompt = "You are a study advisor. You are helpful and can understand different intents \
                        and respond with emotions and support. An international student has come to you \
                        for some help. He wants to come to the UK to study.  \
                        Write 1 question to find suitable courses for the student. \
                        where the question is " + question1 + questionY1 + \
                        " Directly ask the questions without any sentences before it. " \
                        + "Speak in " + language + constraint
            else:
                prompt = "You are a study advisor. You are helpful and can understand different intents \
                        and respond with emotions and support. A UK domstic student has come to you \
                        for some help. He wants to come to the UK to study.  \
                        Write 1 question to find suitable courses for the student. \
                        where the question is " + question1 + \
                        " Directly ask the questions without any sentences before it. " \
                        + "Speak in " + language + constraint
            
            response, tokens = generate_response(email, prompt, prompt)
            #response = addBr(response)
            #print(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            
            intro_msg = 'Hello there, I hope you are having a good day! I am happy to help you. \
                Please answer these questions:\n'
            
            if wordsCount==None:
                wordsCount=0

            wordsCount = int(wordsCount) + count_words(intro_msg + response)

            chatresponse = intro_msg + response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
        })
    

    # Handle form submission
    if messagetype == "next":
        #print('next', questions_set)
        # Handle second set of questions
        if int(questions_set)==2:
            prompt = question
            prompt_current = prompt

            if selected_option == 'international':
                prompt = "Write  the next question to specify the needs for the international student who wants to come to the UK for study \
                    where question is: " +  questionNY1 + \
                    " . Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint
                

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    prompt = "Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionY1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
                else:
                    prompt = "Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionN1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
                    
            print(prompt)         
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            # session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help. Your previous questions were: ' + \
            #         prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
            

            wordsCount = int(wordsCount) + count_words(response)

            chatresponse = response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

        elif int(questions_set)==3:
            prompt = question
            prompt_current = prompt

            secondQuestionResponseByStudent = prev[len(prev)-2]

            if selected_option == 'international':
                prompt = '. '.join(map(str, prev)) + ". Answers from the international student to those questions: " + prompt + \
                    ". Now write 1 more question to specify the needs for the international student who wants to come to the UK for study. \
                        the question is " + internationalG1 + ". Speak in " + language + constraint
               

            else:
                if checkUserResponseTrueOrFalse(promptUser=secondQuestionResponseByStudent) == 'True':
                    prompt = '. '.join(map(str, prev)) + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionY2 + ". Speak in " + language + constraint
                else:
                    prompt = '. '.join(map(str, prev)) + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionNY1 + ". Speak in " + language + constraint
            
            print(prompt)  
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = int(wordsCount) + count_words(response)

            chatresponse = response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

            

        elif int(questions_set)==4:
            #print('now_forth_set_of_questions')
            prompt = question
            prompt_current = prompt

            thirdQuestionResponseByStudent = prev[len(prev)-2]


            if selected_option == 'international':
                prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
                
                session['now_fifth_set_of_questions'] = True

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    if checkUserResponseTrueOrFalse(promptUser=thirdQuestionResponseByStudent) == 'True':
                        prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYY2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
                    
                    else:
                        prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYN2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint

                    session['now_fifth_set_of_questions'] = True
                
                else:
                    prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  homeG1 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
                    
                    session['now_fifth_set_of_questions'] = False
                    
            print(prompt)  
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = int(wordsCount) + count_words(response)

            chatresponse = response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

            
        elif int(questions_set)==5:
            prompt = question
            prompt_current = prompt

            if selected_option == 'international':
                prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint
            
            else:
                prompt = '. '.join(map(str, prev)) + ". Answers from the student to those questions: " + prompt + \
                    "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                    where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint
                

            response, tokens = generate_response(email, prompt, prompt_current)
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = int(wordsCount) + count_words(response)

            chatresponse = response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })


        else:
            prompt = question
            prompt_current = prompt
            
            # prompt = prev + ". The user asks: " + prompt + ". Now help the user with their possible study in the UK. " \
            #          + "Speak in " + language + nextLinePrompt
                
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###
            wordsCount = int(wordsCount) + count_words(response)

            chatresponse = response
            
            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

    

    # If this is not the first visit and no prompt was submitted, render the page with an empty response
    defaultSTR = "As an AI language model, I am here to help you in a professional and engaging manner. What else would you like to know or discuss?"
    wordsCount = count_words(defaultSTR)
    return jsonify({
        'chatresponse': defaultSTR,
        'wordsCount': wordsCount
    })

    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=False)

