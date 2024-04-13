import React from 'react'
import { Grid, Image} from 'semantic-ui-react'

import logo from "../assets/logo.svg";


function Greetings() {
    

  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'2%', marginBottom:'5%', overflow: "hidden"}}>

        <Grid>
            <Grid.Row only='computer tablet'>
                    
                <Grid.Column width={16}>
                    <Image src={logo} size='tiny' />
                </Grid.Column>    
            </Grid.Row>

            <Grid.Row only='computer tablet'>
                <Grid.Column textAlign='left'>
                    <h3 style={{fontFamily: 'Inter', fontSize:'1.8rem', fontWeight:'bold'}}>Welcome to your career mate – 
                    your virtual guide to educational success!</h3> 
                </Grid.Column>
            </Grid.Row>


            <Grid.Row centered only='mobile'>
                <Grid.Column width={15}>
                    <Grid> 
                        <Grid.Row>
                            <div style={{marginTop: "4%", marginBottom: '0%', marginLeft:'2%'}}>
                                <Image src={logo} size='mini' />
                            </div>    

                            <h5 style={{fontFamily: 'Inter', fontSize:'1.2rem', fontWeight:'bold', marginLeft:'2%', marginRight:'0%'}}>
                                Welcome to your career mate – your virtual guide to educational success!
                            </h5>                     
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
        
        
    </div>
  )
}

export default Greetings