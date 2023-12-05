import React from 'react';

import { Grid, Image } from 'semantic-ui-react'

import microsoft_support from "../assets/microsoft_support.jpg";
import santander from "../assets/santander-clear.png";
import hackbridge from "../assets/Hackbridge.io_logo.png";

function LandingPartners() {
  return (
    <div style={{marginTop:'5%'}}>
        <Grid centered>
                <Grid.Row>
                    <p style={{fontFamily: 'Montserrat, sans-serif', fontSize: '18px'}}>Backed by</p>
                </Grid.Row>

                <Grid.Row centered>
                    <Grid style={{marginLeft: '2%'}}>
                        <Grid.Column width={5}>
                            <Image src={microsoft_support} size='medium'/>
                            
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <Image src={santander} size='medium'/>
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <Image src={hackbridge} size='medium'/>
                        </Grid.Column>
                    </Grid>                    
                </Grid.Row>
            </Grid>
    </div>
  )
}

export default LandingPartners