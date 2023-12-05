import React from 'react'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'

import logo from "../assets/logo.png";

import "./head_css.css";

import {auth} from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

function Header() {

  const navigate = useNavigate();

  const handle_signout = () =>
  {
    localStorage.removeItem('oddMessagesStatus');

    signOut(auth).then(() => {
        // Sign-out successful.
        // localStorage.setItem('tokens', 0);

        const updatedPromptList = [];
        localStorage.setItem('promptList', JSON.stringify(updatedPromptList));
            navigate("/login");
            
        }).catch((_) => {
        // An error happened.
        });
  }


  return (
    <div style={{marginLeft: "5%", marginRight: "5%"}}>
        <Grid verticalAlign="middle">
            <Grid.Column width={3} only='computer'>
                
                <div class="horizontal-container">
                    <div class="item">
                        <Image src={logo} size='tiny' style={{ width: '100%', minWidth: '30px', maxWidth: '80px' }}/>
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>
                    
                </div>                     

            </Grid.Column>
            

            <Grid.Column width={5} only='tablet'>
                
                <div class="horizontal-container">
                    <div class="item">
                        <Image src={logo} size='tiny' style={{ width: '100%', minWidth: '50px', maxWidth: '80px' }}/>
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>
                    
                </div>                     

            </Grid.Column>

            
            <Grid.Column floated='right' width={4} only='computer'>
                <Grid>
                    <Grid.Column floated='left' width={8} verticalAlign='middle'>
                        <div class="horizontal-container">
                            <div class="item">
                                <p>
                                    <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                </p>
                            </div>
                        </div>
                        
                    </Grid.Column>

                    <Grid.Column floated='right' width={8}>
                        <div class="horizontal-container">
                            <div class="item">
                                <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", borderRadius: 10}}>Sign Out</Button>
                            </div>
                        </div> 
                        
                    </Grid.Column>

                </Grid>
                               
            </Grid.Column>


            <Grid.Column floated='right' width={4} only='tablet'>
                <Grid>
                    <Grid.Column floated='left' width={8} verticalAlign='middle'>
                        <div class="horizontal-container">
                            <div class="item">
                                <p>
                                    <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                </p>
                            </div>
                        </div>
                        
                    </Grid.Column>

                    <Grid.Column floated='right' width={8}>
                        <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", fontsize:"10px", borderRadius: 4}}>
                            <Icon name='sign out' />
                        </Button>                        
                    </Grid.Column>

                </Grid>
                               
            </Grid.Column>



        </Grid>


        <Grid verticalAlign="middle">
            <Grid.Column width={7} only='mobile'>
                <div class="horizontal-container">
                    <div class="item" style={{ width: '100%', minWidth: '30px', maxWidth: '60px' }}>
                        <Image src={logo} size='mid' />
                    </div>
                    <div class="item">
                        <h3>ThinkLabsAI</h3>
                    </div>
                </div>                     
                
            </Grid.Column>

            <Grid.Column floated='right' width={6} only='mobile'>

                <Grid>
                    <Grid.Column floated='left' verticalAlign='middle'>
                        <div class="horizontal-container">
                            <div class="item">
                                <p>
                                    <a href="https://forms.office.com/e/KYM1m3DuCD">Feedback</a>
                                </p>
                            </div>
                        </div>

                    </Grid.Column>

                    <Grid.Column floated='right' width={8}>
                        <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", fontsize:"10px", borderRadius: 4}}>
                            <Icon name='sign out' />
                        </Button>                        
                    </Grid.Column>

                </Grid>

                
                                
            </Grid.Column>
        </Grid>
    </div>
  )
}

export default Header