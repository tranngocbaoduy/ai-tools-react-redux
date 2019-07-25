import React from 'react'; 
import { connect } from 'react-redux'; 
import '../assets/css/general.css'  
import { userActions } from '../_actions'
import Page from '../_construct/Page'; 
import {Login} from '../_components'; 

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
 
        if (!localStorage.getItem('user')){
            this.props.dispatch(userActions.logout());
        }   

        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = [];   _content.push(<Login key="login"></Login>); 
        return _content;
    }

    render() {
        return ( 
            <div>
                <Page content = { this.state.content } ></Page> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication; 
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 