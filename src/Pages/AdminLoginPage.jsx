import React from 'react';  
import '../assets/css/general.css'  
import { Login } from '../_components/admin'; 
import { userActions } from '../_actions'
import { history } from '../_helpers'
import { connect } from 'react-redux'


class AdminLoginPage extends React.Component {
    constructor(props) {
        super(props);
 
        //check login yet ? and return page admin if not login yet
        let user = JSON.parse(localStorage.getItem('user'));
        if (!user){ 
            this.props.dispatch(userActions.logout());
        } 
        user && user.role === 'admin'? history.push('/dashboard'): history.push('/admin') 


        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = [];    
        _content.push(<Login key="admin_login"></Login>);  
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


function mapStateToProps(store) {
    const { loggedIn,error } = store.authentication;  

    return { 
        loggedIn,
        error,   
    };
}

const connectedAdminLoginPage = connect(mapStateToProps)(AdminLoginPage);
export { connectedAdminLoginPage as AdminLoginPage }; 