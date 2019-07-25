import React from 'react';  
import '../assets/css/general.css'  
import {DashBoard} from '../_components/admin';
import { userActions } from '../_actions'

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
  
        // return customer back to login if not admin
        let user = JSON.parse(localStorage.getItem('user')); 
        if (!user || user.role !== 'admin'){
            this.props.dispatch(userActions.logout());
        } 

        this.state = {
            content: this.buildContent()
        } 
    }
 
    buildContent() {  
        let _content = [];   
        _content.push(<DashBoard key="dash_board"></DashBoard>); 
        return _content;
    }

    render() { 
        return (  
            <div>
               { this.state.content }
            </div>
        )
    }
} 

const connectedAdminPage = (AdminPage);
export { connectedAdminPage as AdminPage }; 