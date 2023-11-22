import React from 'react'

import { Grid, Image} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';

import logo from "../assets/thinklabsai_logo.png";

function Privacy() {

  const navigate = useNavigate();

  const navigatetohome = () =>
  {
    navigate('/');
  }


  return (
    <div>
        <div >
            <div style={{backgroundColor:'#1e90ff', overflow: 'hidden'}}>

                <div style={{marginLeft: '3%'}}>
                    <Grid verticalAlign="middle">
                        <Grid.Column width={5}>
                            <Grid verticalAlign='middle'>
                                <Grid.Column width={3} >
                                    <Image src={logo} size='tiny' style={{ width: '100%', minWidth: '30px', maxWidth: '80px' }}/>

                                </Grid.Column>

                                <Grid.Column width={1} only='computer tablet' floated='left'>
                                    <p style={{color: 'white', fontSize: '32px'}}>ThinkLabsAI</p>
                                </Grid.Column>

                                <Grid.Column width={1} only='mobile'>
                                    <p style={{color: 'white', fontSize: '20px'}}>ThinkLabsAI</p>
                                </Grid.Column>
                            </Grid>

                        </Grid.Column>

                        

                        <Grid.Column width={3} floated='right'>
                            <p onClick={navigatetohome} style={{color: 'white', cursor: 'pointer'}}>Home</p>
                        </Grid.Column>
                    </Grid>
                </div>

            </div>

            <div style={{marginTop: '3%', marginLeft: '5%', marginRight:'5%'}}>
                <Grid>
                    <Grid.Row>
                        <h1>Privacy Policy</h1>                    
                    </Grid.Row>

                    <Grid.Row>
                        <h2>1. Information Collection:</h2>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>We collect information from users in the following ways:</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>User Profile: We collect limited user data, including a login ID, to provide personalized services and improve user experience.</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>Chat Interactions: Conversations between users and our GPT-powered chatbot are encrypted and securely stored for quality assurance, continuous improvement, and user support.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>


                    <Grid.Row>
                        <h2>2. Use of Information:</h2>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>We use the collected information for the following purposes:</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>Service Enhancement: We use chat interactions to improve the accuracy and effectiveness of our chatbot's responses, enhancing user experience.</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>Personalization: User data helps us tailor responses to specific needs, such as providing career guidance, university search assistance, and visa and immigration information.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Row>


                    <Grid.Row>
                        <h2>3. Data Protection:</h2>
                    </Grid.Row>


                    <Grid.Row>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>Encryption: Conversations between users and the chatbot are encrypted to protect user privacy.</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                            <Grid.Row>
                                <Grid.Column width={16}>
                                <p>Limited Access: Only authorized personnel have access to user data, and it is strictly used for improving our services.</p>
                                </Grid.Column>
                            </Grid.Row>
                            
                        </Grid>
                    </Grid.Row>

                   

                    <Grid.Row>
                        <h2>4. Email Communication:</h2>
                    </Grid.Row>

                    <Grid.Row>
                        <p>
                        Mailing List: Users have the option to subscribe to our mailing list for updates and relevant information. We do not use user emails for marketing purposes without explicit consent.</p>
                    </Grid.Row>


                    <Grid.Row>
                        <h2>5. Third Parties:</h2>
                    </Grid.Row>

                    <Grid.Row>
                        <p>
                        OpenAI API: We utilize the OpenAI API to power our chatbot's responses. OpenAI's privacy and terms of service also apply to interactions within our chatbot.</p>
                    </Grid.Row>

                </Grid>

            </div>

            
        </div>
    </div>
  )
}

export default Privacy