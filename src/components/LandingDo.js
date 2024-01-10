import React from 'react'

import { Grid, Image, Divider } from 'semantic-ui-react'

import normal_chat from '../assets/normal-chat.png';
import intent_recognition from '../assets/intent-recognition.png';
import "@fontsource/montserrat";


function LandingDo() {

    const headingStyle = {
        textAlign: 'left',
        fontSize: '2vw',
        fontWeight: 600,
        fontFamily: 'Montserrat',
        color: '#091747',
        marginBottom: '2%', 
        marginTop: '0',
        wordSpacing: '-0.4',
        letterSpacing: '-0.5',
        lineHeight: '1.3',
      };
    
      const paragraphStyle = {
        textAlign: 'left',
        fontSize: '1vw',
        fontWeight: 300,
        fontFamily: 'Montserrat',
        color: '#091747',
        marginTop: '1%',
        letterSpacing: '-0.5',
        lineHeight: '2.0'
      };


      const headingStyle_tablet = {
        textAlign: 'left',
        fontSize: '3vw',
        fontWeight: 600,
        fontFamily: 'Montserrat',
        color: '#091747',
        marginBottom: '2%', 
        marginTop: '0',
        wordSpacing: '-0.4',
        letterSpacing: '-0.7',
        lineHeight: '1.3',
      };
    
      const paragraphStyle_tablet = {
        textAlign: 'left',
        fontSize: '2vw',
        fontWeight: 300,
        fontFamily: 'Montserrat',
        color: '#091747',
        marginTop: '1%',
      };


      const headingStyle_mobile = {
        textAlign: 'left',
        fontSize: '4vw',
        fontWeight: 'normal',
        fontFamily: 'Montserrat',
        color: '#091747',
        marginBottom: '2%', 
        marginTop: '0',
        wordSpacing: '-0.4',
        letterSpacing: '-0.7',
        lineHeight: '1.3',
      };
    
      const paragraphStyle_mobile = {
        textAlign: 'left',
        fontSize: '3vw',
        fontWeight: 300,
        fontFamily: 'Montserrat',
        color: '#091747',
        marginTop: '1%',
      };

  return (
    <div style={{marginTop: '4%', marginLeft: '5%', marginRight: '5%'}}>

        <Grid centered>
            <Grid.Row only='computer'>
                <p style={{fontFamily: 'Montserrat', fontSize: '52px'}}>What we do</p>
            </Grid.Row>
        
            <Grid.Row verticalAlign='middle' only='computer'>
                <Grid.Column width={7} floated='left'>

                    <div style={{border:'solid', borderColor: '#1b4aee'}}>
                        <Image src={normal_chat}/>

                    </div>

                </Grid.Column>

                <Grid.Column width={6}>
                    <div>
                        <p style={headingStyle}>Enhance your chances to launch your dream career</p>
                        <p style={paragraphStyle}>1. Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                        <p style={paragraphStyle}>2. Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                        <p style={paragraphStyle}>3. Explore career opportunities and unlock your maximum potential.</p>
                    </div>
                    
                </Grid.Column>


            </Grid.Row>


            <Grid.Row style={{marginTop: '3%'}} verticalAlign='middle' only='computer'>
                <Grid.Column width={6} floated='left'>
                    <div>
                        <p style={headingStyle}>Seamless User Engagement with Immunity Technology</p>
                        <p style={paragraphStyle}>1. Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                        <p style={paragraphStyle}>2. Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                        <p style={paragraphStyle}>3. Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                    </div>
                </Grid.Column>
                
                <Grid.Column width={7}>
                    <div style={{border:'solid', borderColor: '#1b4aee'}}>
                        <Image src={intent_recognition}/>

                    </div>
                </Grid.Column>

            </Grid.Row>

            
        </Grid>




        <Grid>

            <Grid.Row only='tablet' centered>
                <p style={{fontFamily: 'Montserrat, sans-serif', fontSize: '52px'}}>What we do</p>
            </Grid.Row>

            <Grid.Row only='mobile' centered>
                <p style={{fontFamily: 'Montserrat, sans-serif', fontSize: '20px'}}>What we do</p>
            </Grid.Row>



            <Grid.Row only='tablet mobile' centered>
                <div style={{border:'solid', borderColor: '#1b4aee'}}>
                    <Image src={normal_chat}/>
                </div>
            </Grid.Row>

            <Grid.Row only='tablet'>
                <div>
                    <p style={headingStyle_tablet}>Enhance your chances to launch your dream career</p>
                    <p style={paragraphStyle_tablet}>1. Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                    <p style={paragraphStyle_tablet}>2. Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                    <p style={paragraphStyle_tablet}>3. Explore career opportunities and unlock your maximum potential.</p>
                </div>

            </Grid.Row>

            <Grid.Row only='mobile'>
                <div>
                    <p style={headingStyle_mobile}>Enhance your chances to launch your dream career</p>
                    <p style={paragraphStyle_mobile}>1. Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                    <p style={paragraphStyle_mobile}>2. Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                    <p style={paragraphStyle_mobile}>3. Explore career opportunities and unlock your maximum potential.</p>
                </div>

            </Grid.Row>

            <Divider />



            <Grid.Row only='tablet mobile' centered>
                <div style={{border:'solid', borderColor: '#1b4aee', marginTop:'5%'}}>
                    <Image src={intent_recognition}/>

                </div>

            </Grid.Row>

            <Grid.Row only='tablet'>
                <div>
                    <p style={headingStyle_tablet}>Seamless User Engagement with Immunity Technology</p>
                    <p style={paragraphStyle_tablet}>1. Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                    <p style={paragraphStyle_tablet}>2. Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                    <p style={paragraphStyle_tablet}>3. Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                </div>

            </Grid.Row>

            <Grid.Row only='mobile'>
                <div>
                    <p style={headingStyle_mobile}>Seamless User Engagement with Immunity Technology</p>
                    <p style={paragraphStyle_mobile}>1. Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                    <p style={paragraphStyle_mobile}>2. Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                    <p style={paragraphStyle_mobile}>3. Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                </div>

            </Grid.Row>

            <Divider />

            

        </Grid>

    </div>
  )
}

export default LandingDo