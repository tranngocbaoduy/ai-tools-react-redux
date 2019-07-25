import React from 'react'; 
import { connect } from 'react-redux'; 
import '../assets/css/general.css'  

import {userActions} from '../_actions' 
import { history } from '../_helpers'

class LogoutPage extends React.Component {
    logOut(){
        const { dispatch } = this.props;  
        dispatch(userActions.logout());   
        userActions.logout();
        history.push('/login')
    }
    componentWillMount(){
        this.logOut()
    }
    render() {
        // const {loggedIn} = this.props; 
        return ( 
            <div>
                
            </div>
        )
    }
}

function mapStateToProps(store) {
    const { loggedIn } = store.authentication; 
    return {
        loggedIn
    };
}

const connectedLogoutPage = connect(mapStateToProps)(LogoutPage);
export { connectedLogoutPage as LogoutPage }; 