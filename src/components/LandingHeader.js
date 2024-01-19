import React from 'react';
import { Grid, Image, Dropdown } from 'semantic-ui-react'
import thinklabs_logo from "../assets/landing_logo.svg";

import "@fontsource/montserrat";
import './landingpage.css';

function LandingHeader({ onValueChange }) {

    const options = [
        { key: 1, text: 'Home', value: 1 },
        { key: 2, text: 'Take a Tour', value: 2 },
        { key: 3, text: 'Team', value: 3 },
        { key: 4, text: 'Contact', value: 4 },
        ]


    const handleDropdownChange = (text) => {
        onValueChange(text); // Pass the selected text to the parent component
      };
    

  return (
    <div >

        <Grid verticalAlign="middle" columns={2}>

            <Grid.Column width={16} only='computer' style={{marginTop:'1rem'}}> 
                <Grid columns={2} verticalAlign="middle">
                    <Grid.Column width={3}>
                        <Image src={thinklabs_logo} style={{width:'70%'}}/>
                    </Grid.Column>

                    <Grid.Column width={6} floated='right'>
                        <Grid columns={2} verticalAlign='middle' stackable>

                            <Grid.Column textAlign='right' width={3}>
                                <div className="hover-cursor" >
                                    <p onClick={() => handleDropdownChange('Home')}
                                    style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#000000'}}>
                                        Home
                                    </p>
                                </div>
                                
                            </Grid.Column>

                            <Grid.Column textAlign='right' width={5}>
                                <div className="hover-cursor" >
                                    <p onClick={() => handleDropdownChange('Take a Tour')}
                                    style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#000000'}}>
                                        Take a Tour
                                    </p>
                                </div>                          
                            </Grid.Column>

                            <Grid.Column textAlign='right' width={3}>
                                <div className="hover-cursor" >
                                    <p onClick={() => handleDropdownChange('Team')}
                                    style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#000000'}}>
                                        Team
                                    </p>
                                </div>                          
                            </Grid.Column>

                            <Grid.Column textAlign='right' width={3}>
                                <div className="hover-cursor" >
                                    <p onClick={() => handleDropdownChange('Contact')}
                                    style={{fontFamily: 'Montserrat', fontSize:'1.2rem', color:'#000000'}}>
                                        Contact
                                    </p>
                                </div>                          
                            </Grid.Column>
                                            
                        </Grid>
                    </Grid.Column>

                </Grid>  

            </Grid.Column>



            <Grid.Column width={16} only='tablet' style={{marginTop:'2%', marginBottom: '2%'}}>
                <Grid columns={2} stackable>
                    <Grid.Column width={4}>
                        <Image src={thinklabs_logo} size='small'/>
                    </Grid.Column>

                    <Grid.Column width={2} floated='right'>
                            <Dropdown position='right'
                                icon={{ name: 'caret down', size:'large', style: { color: 'black' } }}
                                floating
                                options={options}
                                trigger={<></>}
                                onChange={(e, { value }) => handleDropdownChange(options[value-1].text)}
                                />                       

                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid>



        <Grid stackable >
            <Grid.Row only='mobile' style={{marginTop:'5%', marginBottom: '5%'}}>
                <Grid.Column width={16} only='mobile'>
                            
                    <Grid columns={2}>
                        <Grid.Column width={6}>
                            <Image src={thinklabs_logo} size='large'/>
                        </Grid.Column>
    
                        <Grid.Column floated='right' width={4}>
                            <Dropdown position='right'
                                icon={{ name: 'caret down', size:'large', style: { color: 'black' } }}
                                floating
                                options={options}
                                trigger={<></>}
                                onChange={(e, { value }) => handleDropdownChange(options[value-1].text)}
                                />  
                            
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        
    </div>
  )
}

export default LandingHeader