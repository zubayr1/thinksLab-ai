import React from 'react'

import { Grid, Image, Divider } from 'semantic-ui-react'

import normal_chat from '../assets/normal-chat.png';
import intent_recognition from '../assets/intent-recognition.png';
import expense_chat from '../assets/expense-chat.png';
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
    <div style={{marginTop: '4%', marginLeft: '6%', marginRight: '6%'}}>

        <Grid centered>
            <Grid.Row only='computer'>
                <p style={{fontFamily: 'Montserrat', fontSize: '52px'}}>What we do</p>
            </Grid.Row>
        
            <Grid.Row verticalAlign='middle' only='computer'>
                <Grid.Column width={7}>

                    <div style={{border:'solid', borderColor: '#1b4aee'}}>
                        <Image src={normal_chat}/>

                    </div>

                </Grid.Column>

                <Grid.Column width={6}>
                    <div>
                        <p style={headingStyle}>Achieve your academic aspirations</p>
                        <p style={paragraphStyle}>✓ Receive instant, personalized career guidance designed for your unique profile.</p>
                        <p style={paragraphStyle}>✓ Elevate your application through expert support in creating impactful personal statement and CV.</p>
                        <p style={paragraphStyle}>✓ Boost your chances of acceptance into your dream university.</p>
                    </div>
                    
                </Grid.Column>


            </Grid.Row>


            <Grid.Row style={{marginTop: '3%'}} verticalAlign='middle' only='computer'>
                <Grid.Column width={6}>
                    <div>
                        <p style={headingStyle}>Seamless Conversations with Intent Detection</p>
                        <p style={paragraphStyle}>✓ Our AI powered chatbot detects user intent and conversation context to generate precise and relevant responses.</p>
                        <p style={paragraphStyle}>✓ No need to initiate the conversation - Our AI powered chatbot takes the lead.</p>
                        <p style={paragraphStyle}>✓ It is immune to unintentional responses ensuring consistent and seamless interactions. </p>
                    </div>
                </Grid.Column>
                
                <Grid.Column width={7}>
                    <div style={{border:'solid', borderColor: '#1b4aee'}}>
                        <Image src={intent_recognition}/>

                    </div>
                </Grid.Column>

            </Grid.Row>


            <Grid.Row style={{marginTop: '3%'}} verticalAlign='middle' only='computer'>
                <Grid.Column width={7}>
                    <div style={{border:'solid', borderColor: '#1b4aee'}}>
                        <Image src={expense_chat}/>

                    </div>

                </Grid.Column>

                <Grid.Column width={6}>
                    <div >
                        <p style={headingStyle}>Student finance management</p>
                        <p style={paragraphStyle}>✓ Get support with tuition fees, scholarship, financial aid, living expenses insights.</p>
                        <p style={paragraphStyle}>✓ Manage expenses by creating personalized budget plan.</p>
                        <p style={paragraphStyle}>✓ Gain insights on university life and opportunities for part-time jobs.</p>
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
                    <p style={headingStyle_tablet}>Achieve your academic aspirations</p>
                    <p style={paragraphStyle_tablet}>✓ Receive instant, personalized career guidance designed for your unique profile.</p>
                    <p style={paragraphStyle_tablet}>✓ Elevate your application through expert support in creating impactful personal statement and CV.</p>
                    <p style={paragraphStyle_tablet}>✓ Boost your chances of acceptance into your dream university.</p>
                </div>

            </Grid.Row>

            <Grid.Row only='mobile'>
                <div>
                    <p style={headingStyle_mobile}>Achieve your academic aspirations</p>
                    <p style={paragraphStyle_mobile}>✓ Receive instant, personalized career guidance designed for your unique profile.</p>
                    <p style={paragraphStyle_mobile}>✓ Elevate your application through expert support in creating impactful personal statement and CV.</p>
                    <p style={paragraphStyle_mobile}>✓ Boost your chances of acceptance into your dream university.</p>
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
                    <p style={headingStyle_tablet}>Seamless Conversations with Intent Detection</p>
                    <p style={paragraphStyle_tablet}>✓ Our AI powered chatbot detects user intent and conversation context to generate precise and relevant responses.</p>
                    <p style={paragraphStyle_tablet}>✓ No need to initiate the conversation - Our AI powered chatbot takes the lead.</p>
                    <p style={paragraphStyle_tablet}>✓ It is immune to unintentional responses ensuring consistent and seamless interactions. </p>
                </div>

            </Grid.Row>

            <Grid.Row only='mobile'>
                <div>
                    <p style={headingStyle_mobile}>Seamless Conversations with Intent Detection</p>
                    <p style={paragraphStyle_mobile}>✓ Our AI powered chatbot detects user intent and conversation context to generate precise and relevant responses.</p>
                    <p style={paragraphStyle_mobile}>✓ No need to initiate the conversation - Our AI powered chatbot takes the lead.</p>
                    <p style={paragraphStyle_mobile}>✓ It is immune to unintentional responses ensuring consistent and seamless interactions. </p>
                </div>

            </Grid.Row>

            <Divider />

            <Grid.Row only='tablet mobile' centered>
                <div style={{border:'solid', borderColor: '#1b4aee', marginTop:'5%'}}>
                    <Image src={expense_chat}/>

                </div>
            </Grid.Row>

            <Grid.Row only='tablet'>
                <div >
                    <p style={headingStyle_tablet}>Student finance management</p>
                    <p style={paragraphStyle_tablet}>✓ Get support with tuition fees, scholarship, financial aid, living expenses insights.</p>
                    <p style={paragraphStyle_tablet}>✓ Manage expenses by creating personalized budget plan.</p>
                    <p style={paragraphStyle_tablet}>✓ Gain insights on university life and opportunities for part-time jobs.</p>
                </div>

            </Grid.Row>

            <Grid.Row only='mobile'>
                <div >
                    <p style={headingStyle_mobile}>Student finance management</p>
                    <p style={paragraphStyle_mobile}>✓ Get support with tuition fees, scholarship, financial aid, living expenses insights.</p>
                    <p style={paragraphStyle_mobile}>✓ Manage expenses by creating personalized budget plan.</p>
                    <p style={paragraphStyle_mobile}>✓ Gain insights on university life and opportunities for part-time jobs.</p>
                </div>

            </Grid.Row>

        </Grid>

    </div>
  )
}

export default LandingDo