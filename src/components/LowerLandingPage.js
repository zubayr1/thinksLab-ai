import React from 'react';

import { Grid, Button } from 'semantic-ui-react'
import "@fontsource/montserrat";

import { useNavigate } from 'react-router-dom';


function LowerLandingPage() {

const navigate = useNavigate();

const handlebutton = () =>
{
    navigate("/chatbot");
}

  return (
    <div style={{margin:'2%', overflow:'hidden'}}>

        <Grid centered>

            <Grid.Row only='computer tablet'>
                <div style={{marginLeft: '10%', marginRight: '10%'}}>
                <p style={{color: '#003366', fontFamily: 'Montserrat', fontSize:'22px', letterSpacing: '-0.8px', fontWeight: 'normal'}}>
                    Introducing AI-powered conversational chatbot that offers affordable personalized support to
                enhance the academic journey and career opportunities in higher education.</p>

                </div>
            </Grid.Row>

            <Grid.Row only='mobile'>
                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                <p style={{fontFamily: 'Montserrat', fontSize:'18px', letterSpacing: '-0.8px', fontWeight: 'normal', color: '#003366'}}>
                    Introducing AI-powered conversational chatbot that offers affordable personalized support to
                enhance the academic journey and career opportunities in higher education.</p>

                </div>
            </Grid.Row>


            <Grid.Row only='computer tablet'>
                <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', fontFamily: 'Montserrat',
                color:'white', paddingLeft: '3%', paddingRight: '3%'}} 
                    onClick={handlebutton} size='huge' >Try Now</Button>
                
            </Grid.Row>

            <Grid.Row only='mobile'>
                <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                    onClick={handlebutton} size='huge' >Try Now</Button>
                
            </Grid.Row>



            <Grid.Row only='computer tablet'>
                <div style={{marginLeft: '10%', marginRight: '10%'}}>
                <p style={{fontFamily: 'Montserrat', fontSize:'22px', 
                letterSpacing: '-0.8px', fontWeight: 'normal', color: '#003366'}}>
                    Try our chatbot for free and get a chance to win £10 Amazon gift voucher by sharing your feedback. </p>

                </div>
            </Grid.Row>

            <Grid.Row only='mobile'>
                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                <p style={{fontFamily: 'Montserrat', fontSize:'18px', 
                letterSpacing: '-0.8px', fontWeight: 'normal', color: '#003366'}}>
                    Try our chatbot for free and get a chance to win £10 Amazon gift voucher by sharing your feedback.</p>

                </div>
            </Grid.Row>

           
        </Grid>
        
    </div>
  )
}

export default LowerLandingPage