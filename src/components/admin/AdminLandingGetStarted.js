import React from 'react'
import { Grid, Button } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../firebase.js';

function AdminLandingGetStarted() {

    const navigate = useNavigate();


    const handlebutton = async () =>
    {
        const storedEmail = localStorage.getItem("storedEmail");
        const storedPassword = localStorage.getItem("storedPassword");
        const loggedIn = localStorage.getItem('loggedIn');

        if (storedEmail !== "" && storedPassword !== "" && storedEmail !== null && storedPassword !== null && loggedIn===true) 
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
    <div style={{backgroundImage:'linear-gradient(to bottom, #267BFB, #0A34BF)', overflow: 'hidden'}}>
        <div style={{padding: '5%'}}>
            <Grid centered>

                <Grid.Row only='computer'>
                    <p style={{fontSize:'3rem', color:'white', fontWeight:'bold', fontFamily: 'Inter'}}>
                        Start Talking to Our AI Career Mate</p>
                </Grid.Row>

                <Grid.Row only='tablet'>
                    <p style={{fontSize:'3rem', color:'white', fontWeight:'bold', fontFamily: 'Inter'}}>
                        Start Talking to Our AI Career Mate</p>
                </Grid.Row>

                <Grid.Row only='mobile'>
                    <p style={{fontSize:'2rem', color:'white', fontWeight:'bold', fontFamily: 'Inter'}}>
                        Start Talking to Our AI Career Mate</p>
                </Grid.Row>

                <Grid.Row only='computer'>
                    <div style={{width: '40%'}}>
                        <p style={{fontSize:'1.2rem', color:'white', fontFamily: 'Inter'}}>
                        Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                    </div>
                </Grid.Row>

                <Grid.Row only='tablet'>
                    <div style={{width: '70%'}}>
                        <p style={{fontSize:'1.2rem', color:'white', fontFamily: 'Inter'}}>
                        Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                    </div>
                </Grid.Row>

                <Grid.Row only='mobile'>
                    <div style={{width: '80%'}}>
                        <p style={{fontSize:'1.2rem', color:'white', fontFamily: 'Inter'}}>
                        Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                    </div>
                </Grid.Row>

                <Grid.Row>
                    <Button size='large' style={{color:'#0A34BF'}} onClick={()=>handlebutton()}>Get Started</Button>
                </Grid.Row>

            </Grid>
        </div>
    </div>
  )
}

export default AdminLandingGetStarted