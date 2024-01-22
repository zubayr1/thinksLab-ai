import React, { useState, useEffect} from 'react';

import { Grid, } from 'semantic-ui-react'

import LandingHeader from './LandingHeader.js';

import { useNavigate } from 'react-router-dom';


function Terms() {

    const navigate = useNavigate();


    const redirectToForm = () => {
        window.location.href = 'https://forms.office.com/e/ydSj3ZQ7k5';
    };
    

    const [selectedHeader, setSelectedHeader] = useState(null);


    const handleonValueChange = (selectedText) => {
    setSelectedHeader(selectedText);
    };


    useEffect(() => 
    {
        if(selectedHeader==="Home")
        {
            navigate('/');
        }
        if(selectedHeader==='Contact')
        {
            redirectToForm();
        }
    
    }, [selectedHeader, navigate]);

  

  return (
    <div >

        <div style={{marginLeft: '3%'}}>
            <LandingHeader onValueChange={handleonValueChange}/>
        </div>


        <div style={{marginTop: '3%', marginLeft: '5%', marginRight:'5%'}}>
            <Grid>
                <Grid.Row>
                    <h1>Terms of Service</h1>                    
                </Grid.Row>

                <Grid.Row>
                    <h2>1. Usage:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                        Our chatbot is designed to provide academic and career-related information to higher education students. It is not a substitute for professional advice and should be used for informational purposes only.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>2. User Responsibilities:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    Users are responsible for the accuracy and completeness of the information they provide to the chatbot.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>3. Privacy and Security:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    Users' personal data and interactions are encrypted and protected according to industry standards and privacy laws. Users are encouraged to refrain from sharing sensitive personal information in the chatbot.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>4. Limitations:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    While we strive for accuracy, our chatbot may have limitations in its responses. Users should verify information through other trusted sources.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>5. Changes to the Service:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    We reserve the right to modify, suspend, or discontinue the chatbot service at any time without prior notice.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>6. Legal Disclaimer:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    While our chatbot offers information and guidance, it does not provide legal, financial, or professional advice. Users are encouraged to consult qualified professionals for crucial decisions related to legal, financial, or other specialized matters. The information provided by the chatbot is for general informational purposes only and should not be construed as a substitute for expert advice.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>7. Indemnification:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    You agree to indemnify, defend, and hold harmless ThinkLabsAI, its directors, employees, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses, including reasonable attorneys' fees, arising out of or in connection with your use of the Service, your interactions with the chatbot, or any violation of these Terms of Service. This indemnification shall survive the termination of your use of the Service.
                    </p>
                </Grid.Row>


                <Grid.Row>
                    <h2>8. Third-Party Services:</h2>
                </Grid.Row>

                <Grid.Row>
                    <p>
                    ThinkLabsAI may, at times, provide links or integrate with third-party services, websites, or platforms. These are offered for your convenience and do not imply endorsement or responsibility on our part. We shall not be liable for any damages, losses, or consequences incurred as a result of your interactions with third-party services accessed through or connected to our chatbot. Your use of such third-party services is subject to their respective terms and policies.
                    </p>
                </Grid.Row>
            </Grid>

        </div>

        
    </div>
  )
}

export default Terms