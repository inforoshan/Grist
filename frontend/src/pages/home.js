import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from '../components/navbar'
import AuthService from '../services/auth-service';


class Home extends React.Component {

    constructor(props){
        super(props);

        const user = AuthService.getCurrentUser();
        
        if(!user)
        {
            this.props.history.push("/");
            window.location.reload();
        }
    }
    render()
    {
        
        return (
            <div>
                <Navbar/>
                <div>
                    
                </div>    
            </div>
            
        )
    }
    
}

export default withRouter(Home)
