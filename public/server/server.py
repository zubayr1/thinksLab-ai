from flask import Flask, jsonify, request

from flask_cors import CORS

from helper import *
from config import Config

app = Flask(__name__)
app.secret_key = 'SarahTheWarriorPrincess'



cors = CORS(app, resources={r"/*": {"origins": [
    "http://www.thinklabsai.co.uk:3000",
    "https://www.thinklabsai.co.uk",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://3.121.239.181:5002",
    "http://3.121.239.181:5002"
]}})



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

@app.route('/')
def index():
    return jsonify(message='/')

@app.route('/test')

def hello_world():
    return jsonify(message='Hello, World!')

# App Bot route
@app.route("/bot", methods=["GET", "POST"])
def bot():
    data = request.json
        
    selected_option = data.get('selected_option', '')

    email = data.get('email', '')

    messagetype = data.get('messagetype', '')

    questions_set = data.get('questions_set', '')

    prev= data.get('prev', '')
    initial = 'You are a Study Advisor and a student came to you for help. Your first question is: '

    wordsCount = data.get('tokens', '0')

    question = data.get('question', '')

    if selected_option==None:
        selected_option='home'

    question1 = "What level of study are you interested in pursuing (e.g., undergraduate, postgraduate, doctorate)?"
        
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
    instruction = " Always talk to the user in first person basis, that is use 'You' instead of a third person pronoun. "

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
                        + "Speak in " + language + constraint + instruction
            else:
                prompt = "You are a study advisor. You are helpful and can understand different intents \
                        and respond with emotions and support. A UK domstic student has come to you \
                        for some help. He wants to come to the UK to study.  \
                        Write 1 question to find suitable courses for the student. \
                        where the question is " + question1 + \
                        " Directly ask the questions without any sentences before it. " \
                        + "Speak in " + language + constraint + instruction
            
            response, tokens = generate_response(email, prompt, prompt)
            #response = addBr(response)
            #print(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            
            intro_msg = 'Hello there, I hope you are having a good day! I am happy to help you. \
                Please answer these questions:\n'
            
            

            wordsCount = count_words(intro_msg + response)

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

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the international student to those questions: " + prompt + \
                    ". Write  the next question to specify the needs for the international student who wants to come to the UK for study \
                    where question is: " +  questionNY1 + \
                    " . Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint + instruction
                

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    prompt = prevConv + ". Answers from the UK national student to those questions: " + prompt + \
                        ". Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionY1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                else:
                    prompt = prevConv + ". Answers from the UK national student to those questions: " + prompt + \
                        ". Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionN1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
            #print('initial questions 2: ', prompt)
            #print()
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            # session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help. Your previous questions were: ' + \
            #         prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
            

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

        elif int(questions_set)==3:
            prompt = question
            prompt_current = prompt

            secondQuestionResponseByStudent = prev[len(prev)-2]

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the international student to those questions: " + prompt + \
                    ". Now write 1 more question to specify the needs for the international student who wants to come to the UK for study. \
                        the question is " + internationalG1 + ". Speak in " + language + constraint + instruction
               

            else:
                if checkUserResponseTrueOrFalse(promptUser=secondQuestionResponseByStudent) == 'True':
                    prompt = prevConv + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionY2 + ". Speak in " + language + constraint + instruction
                else:
                    prompt = prevConv + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionNY1 + ". Speak in " + language + constraint + instruction
            
            #print('initial questions 3: ', prompt)
            #print()  
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

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

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                
                session['now_fifth_set_of_questions'] = True

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    if checkUserResponseTrueOrFalse(promptUser=thirdQuestionResponseByStudent) == 'True':
                        prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYY2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
                    else:
                        prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYN2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction

                    session['now_fifth_set_of_questions'] = True
                
                else:
                    prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  homeG1 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
                    session['now_fifth_set_of_questions'] = False
                    
            #print('initial questions 4: ', prompt)
            #print()
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

            
        elif int(questions_set)==5:
            prompt = question
            prompt_current = prompt

            prevConv = prevConvGeneration(prev, initial)
            if selected_option == 'international':
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
            
            else:
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                    "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                    where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint + instruction
                

            response, tokens = generate_response(email, prompt, prompt_current)
            #print('initial questions 5 : ', prompt)
            #print()
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })


        else:
            prevConv = prevConvGeneration(prev, initial)
            prompt_current = question
            prompt = question

            prompt = prevConv + ". Now the user asked: " + prompt_current + '. Now help the student with all that he or she answered/asked based on the questions for his/her application in UK universities. '\
                    + "Speak in " + language + constraint + instruction
            
            #print('initial questions 5 and so on : ', prompt)
            #print()
            
            # prompt = prev + ". The user asks: " + prompt + ". Now help the user with their possible study in the UK. " \
            #          + "Speak in " + language + nextLinePrompt
                
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###
            wordsCount = count_words(prompt_current + ' ' + response)

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

    



@app.route("/botAdmin", methods=["GET", "POST"])
def botAdmin():
    data = request.json
        
    selected_option = data.get('selected_option', '')

    email = data.get('email', '')

    messagetype = data.get('messagetype', '')

    questions_set = data.get('questions_set', '')

    prev= data.get('prev', '')
    initial = 'You are a Study Advisor and a student came to you for help. Your first question is: '

    wordsCount = data.get('tokens', '0')

    question = data.get('question', '')

    if selected_option==None:
        selected_option='home'

    question1 = "What level of study are you interested in pursuing (e.g., undergraduate, postgraduate, doctorate)?"
        
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
    instruction = " Always talk to the user in first person basis, that is use 'You' instead of a third person pronoun. "

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
                        + "Speak in " + language + constraint + instruction
            else:
                prompt = "You are a study advisor. You are helpful and can understand different intents \
                        and respond with emotions and support. A UK domstic student has come to you \
                        for some help. He wants to come to the UK to study.  \
                        Write 1 question to find suitable courses for the student. \
                        where the question is " + question1 + \
                        " Directly ask the questions without any sentences before it. " \
                        + "Speak in " + language + constraint + instruction
            
            response, tokens = generate_response_admin(email, prompt, prompt)
            #response = addBr(response)
            #print(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            
            intro_msg = 'Hello there, I hope you are having a good day! I am happy to help you. \
                Please answer these questions:\n'
            
            

            wordsCount = count_words(intro_msg + response)

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

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the international student to those questions: " + prompt + \
                    ". Write  the next question to specify the needs for the international student who wants to come to the UK for study \
                    where question is: " +  questionNY1 + \
                    " . Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint + instruction
                

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    prompt = prevConv + ". Answers from the UK national student to those questions: " + prompt + \
                        ". Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionY1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                else:
                    prompt = prevConv + ". Answers from the UK national student to those questions: " + prompt + \
                        ". Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is: " +  questionN1 + \
                        " . Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
            #print('initial questions 2: ', prompt)
            #print()
            response, tokens = generate_response_admin(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            # session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help. Your previous questions were: ' + \
            #         prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
            

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

        elif int(questions_set)==3:
            prompt = question
            prompt_current = prompt

            secondQuestionResponseByStudent = prev[len(prev)-2]

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the international student to those questions: " + prompt + \
                    ". Now write 1 more question to specify the needs for the international student who wants to come to the UK for study. \
                        the question is " + internationalG1 + ". Speak in " + language + constraint + instruction
               

            else:
                if checkUserResponseTrueOrFalse(promptUser=secondQuestionResponseByStudent) == 'True':
                    prompt = prevConv + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionY2 + ". Speak in " + language + constraint + instruction
                else:
                    prompt = prevConv + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionNY1 + ". Speak in " + language + constraint + instruction
            
            #print('initial questions 3: ', prompt)
            #print()  
            response, tokens = generate_response_admin(email, prompt, prompt_current)
            #response = addBr(response)

            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

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

            prevConv = prevConvGeneration(prev, initial)

            if selected_option == 'international':
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                
                session['now_fifth_set_of_questions'] = True

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    if checkUserResponseTrueOrFalse(promptUser=thirdQuestionResponseByStudent) == 'True':
                        prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYY2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
                    else:
                        prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYN2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction

                    session['now_fifth_set_of_questions'] = True
                
                else:
                    prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  homeG1 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
                    
                    session['now_fifth_set_of_questions'] = False
                    
            #print('initial questions 4: ', prompt)
            #print()
            response, tokens = generate_response_admin(email, prompt, prompt_current)
            #response = addBr(response)
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })

            
        elif int(questions_set)==5:
            prompt = question
            prompt_current = prompt

            prevConv = prevConvGeneration(prev, initial)
            if selected_option == 'international':
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language + constraint + instruction
            
            else:
                prompt = prevConv + ". Answers from the student to those questions: " + prompt + \
                    "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                    where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                    + "Speak in " + language + constraint + instruction
                

            response, tokens = generate_response_admin(email, prompt, prompt_current)
            #print('initial questions 5 : ', prompt)
            #print()
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###

            wordsCount = count_words(prompt_current + ' ' + response)

            chatresponse = response

            return jsonify({
            'chatresponse': chatresponse,
            'wordsCount': wordsCount
            })


        else:
            prevConv = prevConvGeneration(prev, initial)
            prompt_current = question
            prompt = question

            prompt = prevConv + ". Now the user asked: " + prompt_current + '. Now help the student with all that he or she answered/asked based on the questions for his/her application in UK universities. '\
                    + "Speak in " + language + constraint + instruction
            
            #print('initial questions 5 and so on : ', prompt)
            #print()
            
            # prompt = prev + ". The user asks: " + prompt + ". Now help the user with their possible study in the UK. " \
            #          + "Speak in " + language + nextLinePrompt
                
            response, tokens = generate_response_admin(email, prompt, prompt_current)
            #response = addBr(response)
            
            
            ### Need to find alternate way
            #update_user_table(email, tokens)
            ###
            wordsCount = count_words(prompt_current + ' ' + response)

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


@app.route("/coverletterbot", methods=["GET", "POST"])
def coverletterbot():
    info1 = ' whether he/she needs a Cover Letter for study application or job application, '
    info2 = ' for name about the university/school/company he/she applying for, '
    info3 = ' for information about the specific course/job he/she is applying for and ask to feel free to copy paste the entire course/job description, '
    info4 = ' for information of the user himself/herself and tell to feel free to copy paste the users entire CV '
    info5 = ' for whether there is a back story on why the user wants to study in the university or work in the company. Try to find his/her passion. Proceed anyay if there is nothing. '

    try:
        prev = session.get('previous', '')
    except:
        prev = ''

    if prev=='':
        prompt = "You are a study advisor. A student has come to you \
        for some help to write a Cover Letter. First, write with a welcoming message \
            that you want to help the user with writing his/her Cover Letter. \
                Then ask " + info1
        
        response, tokens = generate_response(prompt, prompt)
        #response = trim_questionaire_responses1(response)
        session['previous'] = response
        session['visited'] = True
        session['now_second_set_of_questions'] = True
        session['now_third_set_of_questions'] = False
        session['now_forth_set_of_questions'] = False
        session['now_fifth_set_of_questions'] = False

        introMsg = 'Hello there, I hope you are having a good day!'
        return render_template("bot.html", response=introMsg + response)

    # Handle form submission
    if request.method == "POST":
        # Handle second set of questions
        if session.get('now_second_set_of_questions', True):
            prev = session.get('previous', '')
            prompt = request.form["prompt"]
            promptCurrent = prompt

            prompt = \
            'Now ask ' + info2  + ' where previous question from you to him were: ' \
                + prev + ' and previous Answers from him/her to that question is: ' + prompt

            response, tokens = generate_response(prompt, promptCurrent)

            session['previous'] = "You are a study advisor. A student has come to you \
                for some help to write a Cover Letter. First, you asked: " \
                    + info1 + " the user answered: " + promptCurrent + '. Now you asked more Questions to him: ' + response
            
            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = True
            session['now_forth_set_of_questions'] = False
            session['now_fifth_set_of_questions'] = False
            return render_template("bot.html", response=response)              
                

        elif session.get('now_third_set_of_questions', True):
            prompt = request.form["prompt"]
            promptCurrent = prompt
            session['uniOrcompanyDesc'] = promptCurrent

            prev = session.get('previous', '')

            prompt = prev + '. Answer from the user to that question: ' + prompt + '. Now ask: ' + info3
            response, tokens = generate_response(prompt, promptCurrent)

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = True
            session['now_fifth_set_of_questions'] = False

            session['previous'] = prompt + '. And you asked: ' + response
            return render_template("bot.html", response=response)

        
        elif session.get('now_forth_set_of_questions', True):
            prompt = request.form["prompt"]

            prompt = 'write the main requirements in gist in 10 sentences of the job description below along with the job role name if provided:' + \
                        prompt
            completions = model(prompt)
            prompt = completions['choices'][0]['message']['content']

            promptCurrent = prompt
            session['applicationDescription'] = promptCurrent

            prev = session.get('previous', '')

            prompt = prev + '. Answer from the user to that question: ' + prompt + '. Now ask: ' + info4
            response, tokens = generate_response(prompt, promptCurrent)

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = False
            session['now_fifth_set_of_questions'] = True

            session['previous'] = prompt + '. And you asked: ' + response
            return render_template("bot.html", response=response)

        elif session.get('now_fifth_set_of_questions', True):
            prompt = request.form["prompt"]
            prompt = 'write the main achievements in gist in 10 sentences of the users CV' + prompt
            completions = model(prompt)
            prompt = completions['choices'][0]['message']['content']

            promptCurrent = prompt
            session['userInformation'] = promptCurrent

            prev = session.get('previous', '')

            prompt = prev + '. Answer from the user to that question: ' + prompt + '. Now ask: ' + info5
            response, tokens = generate_response(prompt, promptCurrent)

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = False
            session['now_fifth_set_of_questions'] = False

            #session['previous'] = prompt + '. And you asked: ' + response
            return render_template("bot.html", response=response)
            
        else:
            prompt = request.form["prompt"]
            prompt = 'write the main points in gist in 5 sentences of the users backstory' + prompt
            completions = model(prompt)
            prompt = completions['choices'][0]['message']['content']

            promptCurrent = prompt
            backstory = promptCurrent

            prev = session.get('previous', '')
            uniOrcompanyDesc = session.get('uniOrcompanyDesc', '')
            applicationDescription = session.get('applicationDescription', '')
            userInformation = session.get('userInformation', '')


            prompt = 'Write a Cover Letter for this univeristy/company: ' + \
                    uniOrcompanyDesc + ' where the course/job description is: ' + applicationDescription + \
                    ' and description about me is: ' + userInformation + \
                    ' and some backstory about me on why I am fit for this role is: '+ backstory
            response, tokens = generate_response(prompt, promptCurrent)

            #response = trim_questionaire_responses2(response)
            session['previous'] = prompt + '. Your response: ' + response
            return render_template("bot.html", response=response)

    # If this is not the first visit and no prompt was submitted, render the page with an empty response
    session['previous'] = session.get('previous', '')
    return render_template("bot.html", response="As an AI language model, I am here to help you in a professional and engaging manner. What else would you like to know or discuss?")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True)

