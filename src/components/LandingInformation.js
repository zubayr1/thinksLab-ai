import React from 'react'
import { Grid, Image, Button, Dropdown } from 'semantic-ui-react'

import landinginfoimg1 from "../assets/landinginfoimg1.png";
import landinginfoimg2 from "../assets/landinginfoimg2.png";
import landinginfoimg3 from "../assets/landinginfoimg3.jpg";

function LandingInformation() {
  return (
    <div style={{margin:'5%'}}>
        <Grid >
            <Grid.Row only='computer'>
                <Grid.Column width={5}>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg1} size='medium'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                Achieve Career Your Goals 
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                Get instant guidance to build a successful career. Talk as long as 
                                you want and get unbiased support tailored to your needs. 
                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>



                <Grid.Column width={5}>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg2} size='medium'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                Experience a Seamless Conversation 
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                            Not sure how to start your career search? Our career mate will initiate 
                            the conversation to understand your needs and generate responses accordingly.  
                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>



                <Grid.Column width={5}>
                    <Grid centered>
                        <Grid.Row>
                            <Image src={landinginfoimg3} size='medium'/>
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                Discover Intent Detection Technology
                            </p>                            
                            
                        </Grid.Row>

                        <Grid.Row>
                            <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                It's okay not to be precise in your responses. Our chatbot comprehends 
                                your intent and emotions to deliver highly accurate and tailored responses.

                            </p>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>

            </Grid.Row>



            <Grid.Row only='mobile tablet'  >
                <div style={{overflow:'hidden'}}>
                    <Grid>
                        <Grid.Row>
                            <Grid centered>
                                <Grid.Row>
                                    <Image src={landinginfoimg1} size='medium'/>
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                        Achieve Career Your Goals 
                                    </p>                            
                                    
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                        Get instant guidance to build a successful career. Talk as long as 
                                        you want and get unbiased support tailored to your needs. 
                                    </p>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>


                        <Grid.Row>
                            <Grid centered>
                                <Grid.Row>
                                    <Image src={landinginfoimg2} size='medium'/>
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                        Experience a Seamless Conversation 
                                    </p>                            
                                    
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                    Not sure how to start your career search? Our career mate will initiate 
                                    the conversation to understand your needs and generate responses accordingly.  
                                    </p>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>



                        <Grid.Row>
                            <Grid centered>
                                <Grid.Row>
                                    <Image src={landinginfoimg3} size='medium'/>
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1.2rem'}}>
                                        Discover Intent Detection Technology
                                    </p>                            
                                    
                                </Grid.Row>

                                <Grid.Row>
                                    <p style={{fontFamily: 'Montserrat', fontSize:'1rem', paddingLeft:'1%', paddingRight:'1%'}}>
                                        It's okay not to be precise in your responses. Our chatbot comprehends 
                                        your intent and emotions to deliver highly accurate and tailored responses.
 
                                    </p>
                                </Grid.Row>
                            </Grid>

                        </Grid.Row>

                    </Grid>
                </div>
            </Grid.Row>
        </Grid>
    </div>
  )
}

export default LandingInformation