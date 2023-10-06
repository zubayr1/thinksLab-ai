export function returnSet(min, max) {
    const random = Math.random(); 

    const range = max - min + 1;

    const randomNumber = Math.floor(random * range) + min;

    if (randomNumber===1)
    {
        let string = `1. Are you an international student planning to study in the UK, or are you a domestic student (UK resident)? \n
        2. What level of education are you aiming for: undergraduate, postgraduate, or a specific type of program? \n
        3. Could you please share your preferred field of study or major? \n
        4. Do you have a specific location or city in the UK where you'd like to study? \n
        5. Are there any universities or colleges you have in mind, or are you open to exploring a variety of institutions?`

        return string;
    }
    if (randomNumber===2)
    {
        let string = `1. Are you an international student or a domestic student within the UK?\n
        2. What is your current academic background, and are you looking for undergraduate or postgraduate programs?\n
        3. Could you please specify your areas of academic interest or potential majors?\n
        4. Are there any particular start dates or academic intakes you prefer for your studies?\n
        5. Are you considering applying for scholarships or financial aid to support your education in the UK?`

        return string;
    }
    if (randomNumber===3)
    {
        let string = `1. Will you be studying in the UK as an international student, or are you a domestic student?\n
        2. What level of study are you interested in: undergraduate, postgraduate, or a specialized program?\n
        3. Can you share your preferred field of study or major?\n
        4. Are you looking for programs with internship or work placement opportunities?\n
        5. Do you have any specific accommodation preferences for your stay in the UK?`

        return string;
    }
    if (randomNumber===4)
    {
        let string = `1. Are you planning to come to the UK as an international student, or are you a domestic student?\n
        2. What level of education are you aiming for: undergraduate, postgraduate, or a specific type of program?\n
        3. Are there any specific career goals or objectives you hope to achieve through your studies in the UK?\n
        4. Do you have a particular timeline in mind for starting your studies?\n
        5. Are there any medical or accessibility requirements we should be aware of to ensure your comfort and well-being during your studies?`

        return string;
    }
    if (randomNumber===5)
    {
        let string = `1. Are you an international student or a domestic student within the UK?
        2. What level of study are you interested in: undergraduate, postgraduate, or a specialized program?
        3. Could you please specify your preferred field of study or major?
        4. Are you interested in programs with opportunities for extracurricular activities, sports, or hobbies?
        5. Do you have any dietary or lifestyle preferences we should consider when discussing your accommodation options?
        `

        return string;
    }
    if (randomNumber===6)
    {
        let string = `1. Are you an international student intending to study in the UK, or are you a domestic student (UK resident)?
        2. What is your current academic level, and are you interested in pursuing undergraduate, postgraduate, or specialized programs?
        3. Could you please specify your academic interests or the major you'd like to pursue?
        4. Do you have any preferences regarding the size of the university or college you'd like to attend (e.g., large, medium, small)?
        5. Are you looking for programs that offer opportunities for research or practical experience?        
        `

        return string;
    }
    if (randomNumber===7)
    {
        let string = `1. Will you be coming to the UK as an international student, or are you a domestic student?
        2. What level of study are you considering: undergraduate, postgraduate, or a different type of program?
        3. Are there any specific academic or career goals you hope to achieve through your studies in the UK?
        4. Do you have any preferences regarding the duration of your program (e.g., standard duration or accelerated)?
        5. Are you interested in programs that offer flexible study options, such as online or part-time courses?                
        `

        return string;
    }
    if (randomNumber===8)
    {
        let string = `1. Are you planning to study in the UK as an international student, or are you a domestic student?
        2. What level of education are you interested in: undergraduate, postgraduate, or a specialized program?
        3. Can you share your primary areas of academic interest or potential majors?
        4. Are you looking for programs with opportunities for cultural immersion or language learning alongside your studies?
        5. Are you interested in universities or colleges with a strong focus on specific extracurricular activities, such as sports or arts?                       
        `

        return string;
    }
    if (randomNumber===9)
    {
        let string = `1. Will you be studying in the UK as an international student, or are you a domestic student?
        2. What is your preferred level of study: undergraduate, postgraduate, or a specific type of program?
        3. Could you please specify your career aspirations or the industry you'd like to work in after completing your studies?
        4. Do you have any preferences regarding the academic calendar, such as starting in September or January?
        5. Are there any specific support services you'd like to have access to during your time in the UK, such as career counseling or mental health resources?                               
        `

        return string;
    }
    if (randomNumber===10)
    {
        let string = `1. Are you an international student planning to study in the UK, or are you a domestic student (UK resident)?
        2. What level of education are you aiming for: undergraduate, postgraduate, or a specialized program?
        3. Can you share your preferred field of study or major, as well as any specific research interests?
        4. Are you interested in universities or colleges that offer opportunities for community involvement or volunteer work?
        5. Do you have any dietary restrictions or lifestyle preferences that we should consider when discussing accommodation options?                                       
        `

        return string;
    }
    if (randomNumber===11)
    {
        let string = `1. Are you an international student interested in studying in the UK, or are you a domestic student (UK resident)?
        2. What level of study are you considering: undergraduate, postgraduate, or a specific type of program?
        3. Could you please specify your academic interests or the field you'd like to specialize in?
        4. Are you looking for universities or colleges with a strong emphasis on research and innovation?
        5. Do you have any preferences regarding the proximity of your chosen institution to major cities or rural areas?                                               
        `

        return string;
    }
    if (randomNumber===12)
    {
        let string = `1. Will you be coming to the UK as an international student, or are you a domestic student?
        2. What are your long-term career goals, and how do you envision your studies in the UK contributing to them?
        3. Do you have a preference for universities or colleges that offer industry connections or placement opportunities?
        4. Are you interested in programs with options for joint degrees or interdisciplinary studies?
        5. Are there any specific cultural or social activities you'd like to engage in while studying in the UK?                                                       
        `

        return string;
    }
    if (randomNumber===13)
    {
        let string = `1. Are you planning to study in the UK as an international student, or are you a domestic student?
        2. What level of education are you interested in: undergraduate, postgraduate, or a specialized program?
        3. Could you please specify any academic or extracurricular achievements or awards that may impact your application?
        4. Do you have a preferred mode of study, such as in-person, blended, or fully online?
        5. Are you seeking programs that offer networking opportunities or access to alumni networks for career development?                                                               
        `

        return string;
    }
    if (randomNumber===14)
    {
        let string = `1. Will you be studying in the UK as an international student, or are you a domestic student?
        2. What are your expectations for campus life and student culture at your chosen institution?
        3. Are you interested in universities or colleges with a strong focus on sustainability and environmental initiatives?
        4. Do you have any preferred program duration, including options for accelerated or extended programs?
        5. Are there any specific hobbies or interests you'd like to explore or continue while studying in the UK?                                                                       
        `

        return string;
    }
    if (randomNumber===15)
    {
        let string = `1. Are you an international student intending to study in the UK, or are you a domestic student (UK resident)?
        2. What level of study are you aiming for: undergraduate, postgraduate, or a specialized program?
        3. Can you share your preferred field of study or major, along with any specific research areas you're passionate about?
        4. Are you looking for universities or colleges that offer opportunities for international student exchange programs?
        5. Do you have any dietary restrictions or lifestyle preferences that we should consider when discussing accommodation options?                                                                               
        `

        return string;
    }
    if (randomNumber===16)
    {
        let string = `1. Will you be coming to the UK as an international student, or are you a domestic student?
        2. What level of education are you interested in: undergraduate, postgraduate, or a specific type of program?
        3. Could you please specify your career goals and how studying in the UK fits into your professional plans?
        4. Are you interested in universities or colleges with strong alumni networks and career services?
        5. Do you have any concerns or questions about the visa application process for studying in the UK?                                                                                       
        `

        return string;
    }
    if (randomNumber===17)
    {
        let string = `1. Are you planning to study in the UK as an international student, or are you a domestic student?
        2. What level of study are you considering: undergraduate, postgraduate, or a specialized program?
        3. Can you share any prior study abroad experiences or language proficiency that might be relevant?
        4. Are you seeking programs that offer opportunities for hands-on research or laboratory work?
        5. Are there any specific academic support services you'd like to have access to while studying in the UK?                                                                                               
        `

        return string;
    }
    if (randomNumber===18)
    {
        let string = `1. Will you be studying in the UK as an international student, or are you a domestic student?
        2. What are your preferences regarding the size and atmosphere of the university or college you'd like to attend?
        3. Do you have any specific hobbies or interests that you'd like to continue pursuing while in the UK?
        4. Are you interested in universities or colleges that offer joint programs with industry partners or other institutions?
        5. Are there any specific cultural or community activities you'd like to engage in during your time in the UK?                                                                                                       
        `

        return string;
    }
    if (randomNumber===19)
    {
        let string = `1. Are you an international student interested in studying in the UK, or are you a domestic student (UK resident)?
        2. What level of education are you aiming for: undergraduate, postgraduate, or a specialized program?
        3. Can you share any academic achievements or projects that demonstrate your passion for your chosen field?
        4. Are you looking for universities or colleges that offer support for international students, such as orientation programs?
        5. Do you have any questions or concerns about the admission process for studying in the UK?                                                                                                               
        `

        return string;
    }
    if (randomNumber===20)
    {
        let string = `1. Will you be coming to the UK as an international student, or are you a domestic student?
        2. What level of study are you interested in: undergraduate, postgraduate, or a specific type of program?
        3. Could you please specify any unique talents or skills that you'd like to incorporate into your studies?
        4. Are you interested in universities or colleges that have a strong focus on community engagement and social responsibility?
        5. Do you have any specific accommodation preferences, such as shared housing, private apartments, or on-campus residences?                                                                                                                       
        `

        return string;
    }


    
  }
  