import React from 'react'
import { Grid, Image, } from 'semantic-ui-react'

import landinginfoimg1 from "../../assets/landinginfo_img1.svg";
import landinginfoimg2 from "../../assets/landinginfo_img2.svg";
import landinginfoimg3 from "../../assets/landinginfo_img3.svg";

function AdminLandingInformation() {
  return (
    <div style={{marginTop:'5%', marginLeft:'2%', marginRight:'3%'}}>
        <Grid centered>
            <Grid.Row centered only='computer'>
                <Grid.Column width={10} textAlign='middle'>
                    <p style={{fontFamily: 'Inter', fontSize:'3rem', fontWeight:'bold'}}>
                    Your personal career companion at your fingertips</p>
                </Grid.Column>
                
            </Grid.Row>

            <Grid.Row only='tablet'>
                <p style={{fontFamily: 'Inter', fontSize:'3rem', fontWeight:'bold'}}>
                    Your personal career companion at your fingertips</p>
            </Grid.Row>

            <Grid.Row only='mobile'>
                <p style={{fontFamily: 'Inter', fontSize:'2rem', fontWeight:'bold', paddingLeft:'1%', paddingRight:'1%'}}>
                    Your personal career companion at your fingertips</p>
            </Grid.Row>

            <Grid.Row only='computer'>
                <Grid.Column width={4} floated='left'>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg1} size='tiny'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                Achieve Career Goals 
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.2rem', paddingLeft:'1%', paddingRight:'1%',}}>
                                Get instant guidance to build a successful career. Talk as long as 
                                you want and get unbiased support tailored to your needs. 
                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>



                <Grid.Column width={5}>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg2} size='tiny'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                Experience Seamless Conversations
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.2rem', paddingLeft:'1%', paddingRight:'1%'}}>
                            Not sure how to start your career search? Our career mate will initiate 
                            the conversation to understand your needs and generate responses accordingly.  
                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>



                <Grid.Column width={4} floated='right'>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg3} size='tiny'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                Intent Detection Technology
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Inter', fontSize:'1.2rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                It's okay not to be precise in your responses. Our chatbot comprehends 
                                your intent and emotions to deliver highly accurate and tailored responses.

                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>

            </Grid.Row>
           
        </Grid>


        
        <div style={{overflow:'hidden', }}>
        <Grid centered>
            <Grid.Row only='mobile tablet' style={{paddingTop:'10%', paddingBottom: '10%'}} >
                <Grid centered>
                        
                    <Grid.Row >
                        <Grid centered>
                            
                            <Grid.Row>
                                <Image src={landinginfoimg1} size='small'/>
                            </Grid.Row>

                            <Grid.Row>
                                <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                    Achieve Career Goals 
                                </p>                            
                                
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={14} verticalAlign='middle'>
                                    <p style={{fontFamily: 'Inter', fontSize:'1.2rem', }}>
                                        Get instant guidance to build a successful career. Talk as long as 
                                        you want and get unbiased support tailored to your needs. 
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid centered>
                            <Grid.Row>
                                <Image src={landinginfoimg2} size='small'/>
                            </Grid.Row>

                            <Grid.Row>
                                <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                    Experience Seamless Conversations 
                                </p>                            
                                
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={14} verticalAlign='middle'>
                                    <p style={{fontFamily: 'Inter', fontSize:'1.2rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                    Not sure how to start your career search? Our career mate will initiate 
                                    the conversation to understand your needs and generate responses accordingly.  
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>



                    <Grid.Row>
                        <Grid centered>
                            <Grid.Row>
                                <Image src={landinginfoimg3} size='small'/>
                            </Grid.Row>

                            <Grid.Row>
                                <p style={{fontFamily: 'Inter', fontSize:'1.4rem', fontWeight:'bold'}}>
                                    Intent Detection Technology
                                </p>                            
                                
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={14} verticalAlign='middle'>
                                    <p style={{fontFamily: 'Inter', fontSize:'1.2rem', paddingLeft:'2%', paddingRight:'2%'}}>
                                        It's okay not to be precise in your responses. Our chatbot comprehends 
                                        your intent and emotions to deliver highly accurate and tailored responses.
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Row>

                </Grid>
            </Grid.Row>
        </Grid>
        </div>
    </div>
  )
}

export default AdminLandingInformation