import React from 'react';

import { Grid, Button, Image } from 'semantic-ui-react'
import "@fontsource/montserrat";
import lowerlandingbackground from "../assets/lowerlandingbackground.svg";
import lowerlandingrobo from "../assets/lowerlandingrobo.svg";


import { useNavigate } from 'react-router-dom';

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase.js';

function LowerLandingPage() {

const navigate = useNavigate();

const handlebutton = async () =>
{
    const storedEmail = localStorage.getItem("storedEmail");
    const storedPassword = localStorage.getItem("storedPassword");

    if (storedEmail !== "" && storedPassword !== "" && storedEmail !== null && storedPassword !== null) 
    {
        const userCredential = await signInWithEmailAndPassword(auth, storedEmail, storedPassword);
        const user = userCredential.user;
  
        // Check if the user's email is verified
        if (user.emailVerified) {
          // User's email is verified          
          navigate("/chatbot");
        } 
        else 
        {
            navigate("/login");
          
        }
    }
    else
    {
        navigate("/login");
    }
    
}

  return (
    <div style={{backgroundImage:`url(${lowerlandingbackground})`, overflowX:'hidden', 
        height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center'}}>

        <div style={{paddingTop:'3%', paddingBottom:'3%',}}>
            <Grid centered stretched>

                <Grid.Row only='computer tablet'>

                    <Grid.Column width={7}>
                        <Grid>
                            <Grid.Column width={16}>
                                <p style={{fontFamily: 'Montserrat', fontSize:'5rem', color:'#ffffff', fontWeight: 'bold'}}>
                                    Navigating Careers with GenAI
                                </p>
                            </Grid.Column>

                            <Grid.Column width={16}>
                                <p style={{fontFamily: 'Montserrat', fontSize:'1.6rem', color:'#ffffff'}}>
                                    Introducing GenAI career mate to enhance your academic journey and career opportunities.
                                    We are using NLP and LLMs to generate higher-accuracy chat responses with user intent detection technology.</p>
                            </Grid.Column>

                            <Grid.Column width={16}>
                                <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                                    paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                                    onClick={handlebutton} size='huge' >Get Started</Button>
                            </Grid.Column>
                        </Grid>

                    </Grid.Column>


                    <Grid.Column width={6}>
                        <Image src={lowerlandingrobo} size='big'/>
                    </Grid.Column>

                </Grid.Row>


                <Grid.Row only='mobile'>
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
                                    onClick={handlebutton} size='huge' >Get Started</Button>
                            </Grid.Column>
                        </Grid>

                    </Grid.Column>


                    <Grid.Column width={6}>
                        <Image src={lowerlandingrobo} size='big'/>
                    </Grid.Column>


                </Grid.Row>

            </Grid>
        </div>
        
    </div>
  )
}

export default LowerLandingPage