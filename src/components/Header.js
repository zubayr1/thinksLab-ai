import React from 'react'
import { Grid, Image, Button, Icon } from 'semantic-ui-react'

import logo from "../assets/logo.png";

import "./head_css.css";

import {auth} from '../firebase';
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

function Header() {

  const navigate = useNavigate();

  const handle_signout = () =>
  {
    signOut(auth).then(() => {
        // Sign-out successful.
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
                        <Image src={logo} size='tiny' />
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>
                    
                </div>                     

            </Grid.Column>
            

            <Grid.Column width={4} only='tablet'>
                
                <div class="horizontal-container">
                    <div class="item">
                        <Image src={logo} size='tiny' />
                    </div>
                    <div class="item">
                        <h2>ThinkLabsAI</h2>
                    </div>
                    
                </div>                     


                
            </Grid.Column>

            <Grid.Column floated='right' width={2} only='computer tablet'>
                <div class="horizontal-container">
                    <div class="item">
                        <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", borderRadius: 10}}>Sign Out</Button>
                    </div>
                </div>
                
            </Grid.Column>
        </Grid>


        <Grid verticalAlign="middle">
            <Grid.Column width={7} only='mobile'>
                <div class="horizontal-container">
                    <div class="item">
                        <Image src={logo} size='mid' />
                    </div>
                    <div class="item">
                        <h3>ThinkLabsAI</h3>
                    </div>
                </div>                     
                
            </Grid.Column>

            <Grid.Column floated='right' width={3} only='mobile'>

                <Button onClick={handle_signout} style={{backgroundColor: 'blue', color:"white", fontsize:"10px", borderRadius: 4}}>
                    <Icon name='sign out' />
                </Button>
                                
            </Grid.Column>
        </Grid>
    </div>
  )
}

export default Header