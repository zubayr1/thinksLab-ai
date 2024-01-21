import React from 'react'

import { Grid, Image, Divider, Button } from 'semantic-ui-react'

import normal_chat from '../assets/empty_chat.svg';
import intent_recognition from '../assets/empty_chat2.svg';
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
        fontSize: '1.2vw',
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


      
const handlebutton = async () =>
{
    
    
}

  return (
    <div style={{marginTop: '4%', backgroundColor:'#F4F5F7', paddingBottom:'2%'}}>

        <div style={{paddingTop: '8%',marginLeft:'8%', marginRight:'8%'}}>

            <Grid centered>
                            
                <Grid.Row verticalAlign='middle' only='computer'>
                    <Grid.Column width={7} floated='left'>

                        <div>
                            <Image src={normal_chat}/>

                        </div>

                    </Grid.Column>

                    <Grid.Column width={7}>
                        <div>
                            <p style={headingStyle}>Enhance your chances to launch your dream career</p>
                            <p style={paragraphStyle}>✔ Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                            <p style={paragraphStyle}>✔ Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                            <p style={paragraphStyle}>✔ Explore career opportunities and unlock your maximum potential.</p>
                        </div>

                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'1%'}}>
                            <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                                paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                                onClick={handlebutton} size='huge' >Join Waitlist</Button>
                        </div>
                    </Grid.Column>


                    


                </Grid.Row>


                <Grid.Row style={{marginTop: '3%'}} verticalAlign='middle' only='computer'>
                    <Grid.Column width={7} floated='left'>
                        <div>
                            <p style={headingStyle}>Seamless User Engagement with Immunity Technology</p>
                            <p style={paragraphStyle}>✔ Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                            <p style={paragraphStyle}>✔ Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                            <p style={paragraphStyle}>✔ Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                        </div>

                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'2%'}}>
                            <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                                paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                                onClick={handlebutton} size='huge' >Join Waitlist</Button>
                        </div>
                    </Grid.Column>
                    
                    <Grid.Column width={7}>
                        <div>
                            <Image src={intent_recognition}/>

                        </div>
                    </Grid.Column>

                </Grid.Row>

                
            </Grid>




            <Grid>
               
                <Grid.Row only='tablet mobile' centered>
                    <div>
                        <Image src={normal_chat}/>
                    </div>
                </Grid.Row>

                <Grid.Row only='tablet' centered>
                    <div>
                        <p style={headingStyle_tablet}>Enhance your chances to launch your dream career</p>
                        <p style={paragraphStyle_tablet}>✔ Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                        <p style={paragraphStyle_tablet}>✔ Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                        <p style={paragraphStyle_tablet}>✔ Explore career opportunities and unlock your maximum potential.</p>
                    </div>

                    <div style={{ marginTop:'2%', width:'50%'}}>
                        <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                            paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                            onClick={handlebutton} size='huge' >Join Waitlist</Button>
                    </div>

                </Grid.Row>

                <Grid.Row only='mobile' centered>
                    <div>
                        <p style={headingStyle_mobile}>Enhance your chances to launch your dream career</p>
                        <p style={paragraphStyle_mobile}>✔ Receive guidance in choosing the ideal course, university, or job tailored to your unique profile.</p>
                        <p style={paragraphStyle_mobile}>✔ Enhance your applications with expert assistance in crafting compelling personal statements and CVs.</p>
                        <p style={paragraphStyle_mobile}>✔ Explore career opportunities and unlock your maximum potential.</p>
                    </div>

                    <div style={{ marginTop:'2%', width:'50%'}}>
                        <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                            paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                            onClick={handlebutton} size='huge' >Join Waitlist</Button>
                    </div>

                </Grid.Row>

                <Divider />



                <Grid.Row only='tablet mobile' centered>
                    <div style={{marginTop:'5%'}}>
                        <Image src={intent_recognition}/>

                    </div>

                </Grid.Row>

                <Grid.Row only='tablet' centered>
                    <div>
                        <p style={headingStyle_tablet}>Seamless User Engagement with Immunity Technology</p>
                        <p style={paragraphStyle_tablet}>✔ Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                        <p style={paragraphStyle_tablet}>✔ Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                        <p style={paragraphStyle_tablet}>✔ Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                    </div>

                    <div style={{ marginTop:'2%', width:'50%'}}>
                        <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                            paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                            onClick={handlebutton} size='huge' >Join Waitlist</Button>
                    </div>

                </Grid.Row>

                <Grid.Row only='mobile' centered>
                    <div>
                        <p style={headingStyle_mobile}>Seamless User Engagement with Immunity Technology</p>
                        <p style={paragraphStyle_mobile}>✔ Enjoy consistent and seamless interactions with our platform's immunity to unintentional responses.</p>
                        <p style={paragraphStyle_mobile}>✔ Receive valuable information on scholarships, financial aid, and part-time jobs.</p>
                        <p style={paragraphStyle_mobile}>✔ Gain insights into skill development, internships, and job opportunities for a well-rounded journey. </p>
                    </div>

                    <div style={{ marginTop:'2%', width:'50%'}}>
                        <Button style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', color:'white', 
                            paddingLeft: '7%', paddingRight: '7%', fontFamily: 'Montserrat'}} 
                            onClick={handlebutton} size='huge' >Join Waitlist</Button>
                    </div>

                </Grid.Row>


            </Grid>

        </div>

    </div>
  )
}

export default LandingDo