import React from 'react'

import { Grid } from 'semantic-ui-react'


import instant_support from '../assets/instant-support.png';
import cost_effective from '../assets/cost-effective.png';
import intent_detection from '../assets/intent-detection.png';
import enhanced_efficiency from '../assets/enhanced-efficiency.png';
import multilingual_chat from '../assets/multilingual-chat.png';
import "@fontsource/montserrat";

function Landing_Capabilities() {


    

  return (
    <div style={{marginTop: '3%', marginLeft: '4%', marginRight: '4%'}}>
        <Grid centered>

            <Grid.Row only='computer tablet'>
                <p style={{fontSize: '52px', fontFamily: 'Montserrat', marginBottom:'2%'}}>Peerless Capabilities</p>
            </Grid.Row>

            <Grid.Row only='mobile'>
                <p style={{fontSize: '20px', fontFamily: 'Montserrat', marginBottom:'2%'}}>Peerless Capabilities</p>
            </Grid.Row>



            <Grid.Row columns={5} only='computer'>                
                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>

                                <Grid centered>
                                    <Grid.Row>
                                        <img alt='instant_support_com' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <p style={{color:'#ffffff', fontSize:'1.3rem', fontFamily: 'Montserrat'}}>Instant Support</p>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div style={{paddingLeft:'6%', paddingRight:'6%', }}>
                                            <p style={{color:'#ffffff', fontSize: '1rem', fontFamily: 'Montserrat'}}>
                                                Receive 24x7 instant support tailored to your preferences
                                            </p>
                                        </div>                                
                                    </Grid.Row>
                                </Grid>

                            </div>
                        
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={3}>

                <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_com' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize:'1.3rem', fontFamily: 'Montserrat'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize:'1rem', fontFamily: 'Montserrat'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>

                </div>

                </Grid.Column>



                <Grid.Column width={3}>

                <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_com' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize:'1.3rem', fontFamily: 'Montserrat'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize:'1rem', fontFamily: 'Montserrat'}}>
                                    Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>

                </div>

                </Grid.Column>

               

                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_com' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize:'1.3rem', fontFamily: 'Montserrat'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize:'1rem', fontFamily: 'Montserrat'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>


                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_com' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize:'1.3rem', fontFamily: 'Montserrat'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize:'1rem', fontFamily: 'Montserrat'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>

            </Grid.Row>



            <Grid.Row only='tablet'>
                
                <Grid.Column width={5}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_support_tab' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.3rem', fontFamily: 'Montserrat'}}>Instant Support</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.9rem', fontFamily: 'Montserrat'}}>
                                        Receive 24x7 instant support tailored to your preferences
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={5}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_tab' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.3rem', fontFamily: 'Montserrat'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.9rem', fontFamily: 'Montserrat'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div> 
                    </div>                  

                </Grid.Column>


                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_detection_alt' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.3rem', fontFamily: 'Montserrat'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.9rem', fontFamily: 'Montserrat'}}>
                                        Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>
            </Grid.Row>
        

            <Grid.Row only='tablet'>
                
                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_tab' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.3rem', fontFamily: 'Montserrat'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.9rem', fontFamily: 'Montserrat'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>


                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_tab' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.3rem', fontFamily: 'Montserrat'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.9rem', fontFamily: 'Montserrat'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>

            </Grid.Row>

            


            <Grid.Row only='mobile'>
                
                <Grid.Column width={8}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='instant_support_mob' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.2rem', fontFamily: 'Montserrat'}}>Instant Support</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.8rem', fontFamily: 'Montserrat'}}>
                                        Receive 24x7 instant support tailored to your preferences
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={8}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_mob' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.2rem', fontFamily: 'Montserrat'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.8rem', fontFamily: 'Montserrat'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>  
                    </div>                 

                </Grid.Column>
            </Grid.Row>
        

            <Grid.Row only='mobile'>
                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_detection_mob' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.2rem', fontFamily: 'Montserrat'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.8rem', fontFamily: 'Montserrat'}}>
                                        Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>


                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_mob' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.2rem', fontFamily: 'Montserrat'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.8rem', fontFamily: 'Montserrat'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>

            </Grid.Row>

            

            <Grid.Row only='mobile'>
                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', justifyContent:'center', borderRadius: '5px', width: '100%', height:'0%', 
                        paddingTop:'100%', position:'relative' }}>

                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)', width: '95%', 
                                height: '95%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_mob' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '1.2rem', fontFamily: 'Montserrat'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '.8rem', fontFamily: 'Montserrat'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    </div>
                </Grid.Column>

            </Grid.Row>

        </Grid>
    </div>
  )
}

export default Landing_Capabilities