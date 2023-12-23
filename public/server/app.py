from flask import Flask, request, redirect, session, url_for, render_template, flash, Response, jsonify
from helper import *
from users_auth import *
from config import Config
import json
import pyrebase
import sqlite3
import io

with open('sandboxecConfig.json', 'r') as f:
    firebaseConfig = json.load(f)



firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()


app = Flask(__name__)
app.secret_key = Config.SECRET_KEY

# Create the database table
conn = sqlite3.connect("users.sql")
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, usage INTEGER, blocked INTEGER, blockedSoFar INTEGER)")
conn.commit()
conn.close()


lang = "English UK"
change = False

@app.route('/get_initial_values', methods=['GET'])
def get_initial_values():
    return jsonify({'lang': lang, 'bottype': bottype})


# Sign up route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        output = check_if_already(request)
        if output == 0:
            # next authentications
            email = request.form['email']
            message = 'Successfully created user. Welcome ' + email
            return render_template('signup.html', message=message)

        elif output == 1:
            message = "EmailID already exists."
            return render_template('signup.html', message=message)
    return render_template('signup.html')




# Login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        selected_option = request.form.get('student_type')
        
        conn = sqlite3.connect("users.sql")
        c = conn.cursor()
        c.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
        result = c.fetchone()
        if result:
            conn.close()
            session['loggedin'] = True
            session['email'] = email
            session['chats'] = []
            session['wordsCount'] = 0
            session['selected_option'] = selected_option
            return redirect(url_for('bot'))
        else:
            conn.close()
            message = "Email or password is incorrect."
            return render_template('login.html', message=message)
    return render_template('login.html')



# Index route
@app.route('/')
def index():
    if 'loggedin' in session:
        return redirect(url_for('bot'))
    else:
        return redirect(url_for('login'))
    #return redirect(url_for('login'))



@app.route('/faq')
def faq():
    if 'loggedin' in session:
        return render_template('faq.html')
    else:
        return redirect(url_for('login'))

    


# Logout route
@app.route('/logout')
def logout():
    if not 'loggedin' in session:
        return redirect(url_for('login'))

    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('previous', None)
    session.pop('now_second_set_of_questions', None)
    session.pop('chats', None)
    session.pop('wordsCount', None)
    session.pop('selected_option', None)
    session.pop('secondQuestionResponseByStudent', None)
    session.pop('thirdQuestionResponseByStudent', None)
    session.pop('now_fifth_set_of_questions', None)
    return redirect(url_for('login'))






# App Bot route
@app.route("/bot", methods=["GET", "POST"])
def bot():
    if not 'loggedin' in session:
        return redirect(url_for('login'))
    
    selected_option = session.get('selected_option', '')

    email = session.get('email', '')
    try:
        isBlocked = check_blocked(email)
    except:
        return redirect(url_for('login'))
    if isBlocked:
        return redirect(url_for('blocked'))

    prev = session.get('previous', '')

    # Initialize the 'chats' session variable if it doesn't exist
    if 'chats' not in session:
        session['chats'] = []


    language = "English UK"
    change = False
    

    if change:
        session['chats'] = []

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


    nextLinePrompt = " Please add <br> before every '1.', '2.', '3.', etc. so that they go to next line when viewed in HTML safe mode. "

    if prev == '':
        if selected_option == 'international':
            prompt = "You are a study advisor. You are helpful and can understand different intents \
                    and respond with emotions and support. An international student has come to you \
                    for some help. He wants to come to the UK to study.  \
                    Write 1 question to find suitable courses for the student. \
                    where the question is " + question1 + questionY1 + \
                    " Directly ask the questions without any sentences before it. " \
                    + "Speak in " + language
        else:
            prompt = "You are a study advisor. You are helpful and can understand different intents \
                    and respond with emotions and support. A UK domstic student has come to you \
                    for some help. He wants to come to the UK to study.  \
                    Write 1 question to find suitable courses for the student. \
                    where the question is " + question1 + \
                    " Directly ask the questions without any sentences before it. " \
                    + "Speak in " + language
        
        
        response, tokens = generate_response(email, prompt, prompt)
        #response = addBr(response)
        print(response)

        update_user_table(email, tokens)

        session['previous'] = response
        session['visited'] = True
        session['now_second_set_of_questions'] = True
        session['now_third_set_of_questions'] = False
        session['now_forth_set_of_questions'] = False
        session['now_fifth_set_of_questions'] = False

        intro_msg = 'Hello there, I hope you are having a good day! I am happy to help you. \
            Please answer these questions:<br>'
        session['chats'].append(intro_msg + response)

        #read number of words
        wordsCount = session.get('wordsCount') + count_words(intro_msg + response)
        session['wordsCount'] =  wordsCount

        return render_template("bot.html", response=intro_msg + response, wordsCount=wordsCount)
    

    # Handle form submission
    if request.method == "POST":
        # Handle second set of questions
        if session.get('now_second_set_of_questions', True):
            prev = session.get('previous', '')
            prompt = request.form["prompt"]
            prompt_current = prompt
            session['secondQuestionResponseByStudent'] = prompt


            if selected_option == 'international':
                prompt = "Write  the next question to specify the needs for the international student who wants to come to the UK for study \
                    where question is " +  questionNY1 + \
                    " Directly ask the questions without any sentences before it." \
                    + "Speak in " + language
                

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    prompt = "Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionY1 + \
                        " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
                else:
                    prompt = "Write  the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionN1 + \
                        " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
                    
                     
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            print(response)
            update_user_table(email, tokens)

            session['previous'] = 'Your user is a student who wants to come to the UK to study and needs your help. Your previous questions were: ' + \
                    prev + 'Answers from him to those questions were: ' + prompt_current + '. Now you asked more questions to him: ' + response
            

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = True
            session['now_forth_set_of_questions'] = False
            session['now_fifth_set_of_questions'] = False

        elif session.get('now_third_set_of_questions', True):
            prompt = request.form["prompt"]
            prompt_current = prompt
            session['thirdQuestionResponseByStudent'] = prompt
            prev = session.get('previous', '')
            secondQuestionResponseByStudent = session.get('secondQuestionResponseByStudent', '')

            if selected_option == 'international':
                prompt = prev + ". Answers from the international student to those questions: " + prompt + \
                    ". Now write 1 more question to specify the needs for the international student who wants to come to the UK for study. \
                        the question is " + internationalG1 + ". Speak in " + language
               

            else:
                if checkUserResponseTrueOrFalse(promptUser=secondQuestionResponseByStudent) == 'True':
                    prompt = prev + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionY2 + ". Speak in " + language
                else:
                    prompt = prev + ". Answers from the UK domestic student to those questions: " + prompt + \
                        ". Now write 1 more question to specify the needs for the UK domestic student who wants to come to the UK for study. \
                         the question is " + questionNY1 + ". Speak in " + language
            
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            print(response)
            update_user_table(email, tokens)

            session['previous'] = prompt + '. And your response was: ' + response

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = True
            session['now_fifth_set_of_questions'] = False

        elif session.get('now_forth_set_of_questions', True):
            #print('now_forth_set_of_questions')
            prompt = request.form["prompt"]
            prompt_current = prompt
            prev = session.get('previous', '')

            thirdQuestionResponseByStudent = session.get('thirdQuestionResponseByStudent', '')


            if selected_option == 'international':
                prompt = prev + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
                
                session['now_fifth_set_of_questions'] = True

            else:
                if checkUserResponseTrueOrFalse(promptUser=prompt_current) == 'True':
                    if checkUserResponseTrueOrFalse(promptUser=thirdQuestionResponseByStudent) == 'True':
                        prompt = prev + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYY2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
                    
                    else:
                        prompt = prev + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  questionYN2 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language

                    session['now_fifth_set_of_questions'] = True
                
                else:
                    prompt = prev + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                        where question is " +  homeG1 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
                    
                    session['now_fifth_set_of_questions'] = False
                    

            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            print(response)
            update_user_table(email, tokens)

            session['previous'] = prompt + '. And your response was: ' + response

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = False

        elif session.get('now_fifth_set_of_questions', True):
            prompt = request.form["prompt"]
            prompt_current = prompt
            prev = session.get('previous', '')

            if selected_option == 'international':
                prompt = prev + ". Answers from the student to those questions: " + prompt + \
                        "Write the next question to specify the needs for the international student who wants to come to the UK for study \
                        where question is " +  internationalG3 + " Directly ask the questions without any sentences before it." \
                        + "Speak in " + language
            
            else:
                prompt = prev + ". Answers from the student to those questions: " + prompt + \
                    "Write the next question to specify the needs for the UK domestic student who wants to come to the UK for study \
                    where question is " +  homeG1 + " Directly ask the questions without any sentences before it." \
                    + "Speak in " + language
                

            response, tokens = generate_response(email, prompt, prompt_current)
            update_user_table(email, tokens)

            session['now_second_set_of_questions'] = False
            session['now_third_set_of_questions'] = False
            session['now_forth_set_of_questions'] = False
            session['now_fifth_set_of_questions'] = False


        else:
            prompt = request.form["prompt"]
            prompt_current = prompt
            prev = session.get('previous', '')

            prompt = prev + ". The user asks: " + prompt + ". Now help the user with their possible study in the UK. " \
                     + "Speak in " + language + nextLinePrompt
                
            response, tokens = generate_response(email, prompt, prompt_current)
            #response = addBr(response)
            print(response)
            update_user_table(email, tokens)
            session['previous'] = prompt + '. Your response: ' + response

        # Append the user's response and the bot's response to the 'chats' session variable
        session['chats'].append(prompt_current)
        session['chats'].append(response)


        #read number of words
        wordsCount = session.get('wordsCount') + count_words(prompt_current + ' ' +  response)
        session['wordsCount'] =  wordsCount

        return render_template("bot.html", response=response, wordsCount=wordsCount)

    # If this is not the first visit and no prompt was submitted, render the page with an empty response
    defaultSTR = "As an AI language model, I am here to help you in a professional and engaging manner. What else would you like to know or discuss?"
    wordsCount = count_words(defaultSTR)
    return render_template("bot.html", response=defaultSTR, wordsCount=wordsCount)




@app.route('/store_data', methods=['POST'])
def store_data():
    data = request.form.get('data')  # Access the sent data
    parsed_data = json.loads(data)  # Parse the JSON data

    key = parsed_data['key']

    global lang, bottype, change  # Declared the variables as global


    if key == 'English US' or key == 'English UK' or key == 'German' or key == 'Hindi' or key == 'Mandarin' or key == 'Arabic':
        lang = key
    
    elif key == 'Career Guidance' or key == 'Cost of Studying' or key == 'University Life' or key == 'Visa & Immigration':
        bottype = key
    
    change = True

    #print("Received data:", data)  # Print the received data
    #print("Stored variables: lang =", lang, ", bottype =", bottype)  # Print the stored variables
    # Process the data or store it in the database
    return "Data received and processed"



@app.route('/download_conversation', methods=['GET'])
def download_conversation():
    # Retrieve the chat data from the session
    chats = session.get('chats', [])
    chats2 = []
    for idx, val in enumerate(chats):
        if idx%2 == 0:
            chats2.append('ThinklabsAI: ' + val + '\n')
        else:
            chats2.append('You: ' + val + '\n')
            
    # Convert the chat data to a string (customize as needed)
    chat_text = "\n".join(chats2)
    chat_text = chat_text.replace("<br>", "\n")

    # Create an in-memory file
    file_data = io.BytesIO(chat_text.encode('utf-8'))

    # Create a Flask Response with the file data as an attachment
    response = Response(
        file_data,
        content_type='text/plain',  # Set the appropriate content type
        headers={'Content-Disposition': 'attachment; filename=conversation.txt'}
    )

    return response



# Blocked route
@app.route('/blocked')
def blocked():
    if not 'loggedin' in session:
        return redirect(url_for('login'))

    return render_template('blocked.html')


if __name__ == '__main__':
    app.run(debug=True, port=5050)
