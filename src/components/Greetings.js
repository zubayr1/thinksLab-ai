import React from 'react'
import { Grid, Button} from 'semantic-ui-react'

function Greetings() {

    const handledownload =() =>
    {
        const storedPromptListA = JSON.parse(localStorage.getItem('promptList') || '[]');

        // Convert the data to a string
        const dataAsText = JSON.stringify(storedPromptListA, null, 2); // Using JSON.stringify to format the JSON nicely

        // Create a Blob containing the data
        const blob = new Blob([dataAsText], { type: 'text/plain' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element for downloading
        const a = document.createElement('a');
        a.href = url;
        a.download = 'conversation.txt'; 
        a.click();
    }

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

                    <Grid.Row>
                        <Button onClick={handledownload}>Download</Button>
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

                    <Grid.Row>
                        <Button onClick={handledownload}>Download</Button>
                    </Grid.Row>
                </Grid>
                
            </Grid.Row>

            
        </Grid>
        
        
        </div>
  )
}

export default Greetings