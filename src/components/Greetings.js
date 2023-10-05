import React from 'react'
import { Grid} from 'semantic-ui-react'

function Greetings() {
  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:'2%', overflow: "hidden"}}>

        <Grid centered>
            <Grid.Row only='computer tablet'>
                <Grid centered>
                    
                    <Grid.Row>
                        <h1 style={{fontSize: '34px'}} class="roboto-font">Chat with our virtual course assistant</h1>
                    </Grid.Row>

                    <Grid.Row>
                        <h3 style={{fontSize: '20px'}} class="roboto-font">Your helpful educational companion!</h3> 
                    </Grid.Row>
                </Grid>  
                
            </Grid.Row>



            <Grid.Row only='mobile'>
                <Grid centered>
                    <Grid.Row>
                        <div style={{marginTop: "4%"}}>
                            <h3 style={{fontSize: '20px'}} class="roboto-font">Chat with our virtual course assistant</h3>
                        </div>                        
                    </Grid.Row>

                    <Grid.Row>
                        <h5 style={{fontSize: '16px'}} class="roboto-font">Your helpful educational companion!</h5> 
                    </Grid.Row>
                </Grid>
                
            </Grid.Row>

            
        </Grid>
        
        
        </div>
  )
}

export default Greetings