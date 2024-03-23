import React, {useState} from 'react'
import { Grid, Image, Icon} from 'semantic-ui-react'

import career_mate from "../../assets/career_mate.svg";

import "../head_css.css";



function AdminHeader({visible, onVisibleChange }) {


    const [arrow, setArrow] = useState("sidebar");

    

      const handlearrowclick = ()=>
      {
        if(visible===true)
        {
            visible=false;
            onVisibleChange(visible);
            setArrow("bars");
        }
        else
        {
            visible=true;
            onVisibleChange(visible);
            setArrow("sidebar");
        }
      }


  return (
    <div style={{ backgroundColor:'#ffffff'}}>
        <div style={{marginLeft: "3%", marginBottom:'1%', paddingTop:'1%'}}>

            <Grid >
                <Grid.Row only='computer'>
                    
                    <Grid.Column verticalAlign='middle' width={3}>
                        <Image src={career_mate} size='small' />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row only='tablet'>

                    <Grid.Column verticalAlign='middle' width={3}>
                        <Grid>
                            <Grid.Column width={2} verticalAlign='middle'>
                                <div onClick={handlearrowclick} style={{cursor:'pointer'}}>
                                    <Icon name={arrow} />
                                </div>
                            </Grid.Column>

                            <Grid.Column width={12}>
                                <Image src={career_mate} size='small' />
                            </Grid.Column>
                        </Grid>
                        
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row only='mobile'>

                    <Grid.Column verticalAlign='middle' width={8}>
                        <Grid>
                            <Grid.Column width={2} verticalAlign='middle'>
                                <div onClick={handlearrowclick} style={{cursor:'pointer'}}>
                                    <Icon name={arrow} />
                                </div>
                            </Grid.Column>

                            <Grid.Column width={12}>
                                <Image src={career_mate} size='small' />
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>

                </Grid.Row>
            </Grid>

        </div>
    </div>
  )
}

export default AdminHeader