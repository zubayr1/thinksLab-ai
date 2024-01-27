import React, {useState} from 'react';

import { Grid, Button, Image } from 'semantic-ui-react'
import "@fontsource/montserrat";
import lowerlandingbackground from "../assets/lowerlandingbackground.svg";
import lowerlandingrobo from "../assets/lowerlandingrobo.svg";


// import { useNavigate } from 'react-router-dom';

// import {  signInWithEmailAndPassword   } from 'firebase/auth';
// import { auth } from '../firebase.js';

function LowerLandingPage() {

// const navigate = useNavigate();

const [buttonStyle, setButtonStyle] = useState({
    background: 'linear-gradient(to right, #2971ea, #1b4aee)',
    color: 'white',
    paddingLeft: '7%',
    paddingRight: '7%',
    fontFamily: 'Montserrat',
    transition: 'background 0.3s ease',
  });

  const buttonHoverStyle = {
    background: 'linear-gradient(to right, #518ef5, #4d73f7)',
    color: 'white',
    paddingLeft: '7%',
    paddingRight: '7%',
    fontFamily: 'Montserrat',
    transition: 'background 0.3s ease',
  };

const handlebutton = async () =>
{
    window.location.href = 'https://forms.office.com/e/Grb6JcSQB5';

    // const storedEmail = localStorage.getItem("storedEmail");
    // const storedPassword = localStorage.getItem("storedPassword");

    // if (storedEmail !== "" && storedPassword !== "" && storedEmail !== null && storedPassword !== null) 
    // {
    //     const userCredential = await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
    //     const user = userCredential.user;
  
    //     // Check if the user's email is verified
    //     if (user.emailVerified) {
    //       // User's email is verified          
    //       navigate("/chatbot");
    //     } 
    //     else 
    //     {
    //         navigate("/login");
          
    //     }
    // }
    // else
    // {
    //     navigate("/login");
    // }
    
}

  return (
    <div style={{overflow:'hidden'}}>

        <Grid centered stretched>

            <Grid.Row only='computer tablet' style={{backgroundImage:`url(${lowerlandingbackground})`, 
                    height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop:'5%', paddingBottom: '5%'}}>

            
                <Grid.Column width={7}>
                    <Grid>
                        <Grid.Column width={16} only='computer'>
                            <p style={{fontFamily: 'Montserrat', fontSize:'4rem', color:'#ffffff', fontWeight: 'bold'}}>
                                Navigating Careers with GenAI
                            </p>
                        </Grid.Column>
        
                        <Grid.Column width={16} only='tablet'>
                            <p style={{fontFamily: 'Montserrat', fontSize:'3rem', color:'#ffffff', fontWeight: 'bold'}}>
                                Navigating Careers with GenAI
                            </p>
                        </Grid.Column>

                        <Grid.Column width={16} only='computer'>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1.3rem', color:'#ffffff'}}>
                                Introducing GenAI Career Mate to enhance your academic journey and career opportunities.
                                We are using NLP and LLMs to generate higher-accuracy chat responses with user intent detection technology.</p>
                        </Grid.Column>

                        <Grid.Column width={16} only='tablet'>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#ffffff'}}>
                                Introducing GenAI Career Mate to enhance your academic journey and career opportunities.
                                We are using NLP and LLMs to generate higher-accuracy chat responses with user intent detection technology.</p>
                        </Grid.Column>

                        <Grid.Column width={16}>
                            <Button style={buttonStyle} onMouseOver={() => setButtonStyle(buttonHoverStyle)}
                                onClick={handlebutton} size='huge' 
                                onMouseOut={() => setButtonStyle({
                                    background: 'linear-gradient(to right, #2971ea, #1b4aee)',
                                    color: 'white',
                                    paddingLeft: '7%',
                                    paddingRight: '7%',
                                    fontFamily: 'Montserrat',
                                    transition: 'background 0.3s ease',
                                  })}
                                
                                >Join Waitlist</Button>
                        </Grid.Column>
                    </Grid>

                </Grid.Column>


                <Grid.Column width={5}>
                    <Image src={lowerlandingrobo} size='big'/>
                </Grid.Column>

            </Grid.Row>

            
            <Grid.Row only='mobile' style={{backgroundImage:`url(${lowerlandingbackground})`, 
                    height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop:'10%', paddingBottom: '10%'}}>
                    <Grid.Column width={7}>
                        <Grid>
                            <Grid.Column width={16}>
                                <p style={{fontFamily: 'Montserrat', fontSize:'2rem', color:'#ffffff', fontWeight: 'bold'}}>
                                    Navigating Careers with GenAI
                                </p>
                            </Grid.Column>

                            <Grid.Column width={16}>
                                <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#ffffff'}}>
                                    Introducing GenAI career mate to enhance your academic journey and career opportunities.
                                    We are using NLP and LLMs to generate higher-accuracy chat responses with user intent detection technology.</p>
                            </Grid.Column>

                            <Grid.Column width={16}>
                                <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                                    paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                                    onClick={handlebutton} size='huge' >Join Waitlist</Button>
                            </Grid.Column>
                        </Grid>

                    </Grid.Column>


                    <Grid.Column width={6}>
                        <Image src={lowerlandingrobo} size='big'/>
                    </Grid.Column>


            </Grid.Row>

        </Grid>
        
    </div>
  )
}

export default LowerLandingPage