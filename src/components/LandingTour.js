import React from 'react'
import { Grid } from 'semantic-ui-react'
import "@fontsource/montserrat";

function LandingTour() {
  return (
    <div style={{marginTop: '5%', marginLeft: "5%", marginRight: "5%"}}>

        <Grid centered>
            <Grid.Row only='computer tablet'>
                <p style={{fontFamily: 'Montserrat', fontSize:'50px', color:'#1b4aee'}}>
                    Your personal career companion at your fingertips
                </p>
            </Grid.Row>
            

            <Grid.Row only='mobile'>
                <div style={{marginTop:'3%'}}>
                    <p style={{fontFamily: 'Montserrat', fontSize:'20px', color:'#1b4aee'}}>
                        Your personal career companion at your fingertips
                    </p>
                </div>
                
            </Grid.Row>

            <Grid.Row>
                <iframe title="Tour" src="https://app.storylane.io/demo/zarfcrxbz7jp" style={{width:'100%', height: 'calc(50vw)', borderRadius: '20px'}}></iframe>

            </Grid.Row>
        </Grid>
    </div>
  )
}

export default LandingTour