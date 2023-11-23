import React from 'react'

import { Grid } from 'semantic-ui-react'


import instant_support from '../assets/instant-support.png';
import cost_effective from '../assets/cost-effective.png';
import intent_detection from '../assets/intent-detection.png';
import enhanced_efficiency from '../assets/enhanced-efficiency.png';
import multilingual_chat from '../assets/multilingual-chat.png';


function Landing_Capabilities() {
    

  return (
    <div style={{marginTop: '3%', marginLeft: '4%', marginRight: '4%'}}>
        <Grid centered>

            <Grid.Row only='computer tablet'>
                <p style={{fontSize: '52px', marginBottom:'2%'}}>Peerless Capabilities</p>
            </Grid.Row>

            <Grid.Row only='mobile'>
                <p style={{fontSize: '20px', marginBottom:'2%'}}>Peerless Capabilities</p>
            </Grid.Row>

            <Grid.Row only='computer'>
                
                <Grid.Column width={3}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                        display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='instant_support_com' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Instant Support</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Receive 24x7 instant support tailored to your preferences
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={3}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_com' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>

                    

                </Grid.Column>


                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_detection_com' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>


                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_com' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>


                <Grid.Column width={3}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_com' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>

            </Grid.Row>



            <Grid.Row only='tablet'>
                
                <Grid.Column width={5}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_support_tab' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Instant Support</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Receive 24x7 instant support tailored to your preferences
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={5}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_tab' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>                   

                </Grid.Column>


                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_detection_alt' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>
            </Grid.Row>
        

            <Grid.Row only='tablet'>
                
                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_tab' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>


                <Grid.Column width={5}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_tab' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>

            </Grid.Row>

            


            <Grid.Row only='mobile'>
                
                <Grid.Column width={8}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='instant_support_mob' style={{filter: 'invert(100%)', width: '40px'}} src={instant_support}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Instant Support</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Receive 24x7 instant support tailored to your preferences
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                    
                </Grid.Column>


                <Grid.Column width={8}>

                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='cost_effective_mob' style={{filter: 'invert(100%)', width: '40px'}} src={cost_effective}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Cost Effective</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Experience high quality personalized support at an affordable price
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>                   

                </Grid.Column>
            </Grid.Row>
        

            <Grid.Row only='mobile'>
                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='intent_detection_mob' style={{filter: 'invert(100%)', width: '40px'}} src={intent_detection}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Intent Detection</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Understand your emotion and intent and generate response accordingly
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>


                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='enhanced_efficiency_mob' style={{filter: 'invert(100%)', width: '40px'}} src={enhanced_efficiency}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Enhanced Efficiency</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Converse with a fine-tuned chatbot for seamless, accurate responses
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>

            </Grid.Row>

            

            <Grid.Row only='mobile'>
                <Grid.Column width={8}>
                    <div style={{background: 'linear-gradient(to right, #2971ea, #1b4aee)', 
                    display: 'flex', alignItems: 'center', borderRadius: '5px', height:'250px'}}>
                        <Grid centered>
                            <Grid.Row>
                                <img alt='multilingual_chat_mob' style={{filter: 'invert(100%)', width: '40px'}} src={multilingual_chat}/>
                            </Grid.Row>
                            <Grid.Row>
                                <p style={{color:'#ffffff', fontSize: '20px'}}>Multilingual Chat</p>
                            </Grid.Row>
                            <Grid.Row>
                                <div style={{marginLeft: '10%', marginRight:'10%'}}>
                                    <p style={{color:'#ffffff', fontSize: '16px'}}>
                                        Chat in different languages through an intuitive interface
                                    </p>
                                </div>                                
                            </Grid.Row>
                        </Grid>
                    </div>
                </Grid.Column>

            </Grid.Row>

        </Grid>
    </div>
  )
}

export default Landing_Capabilities