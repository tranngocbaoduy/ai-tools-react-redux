import React from 'react'; 
import { connect } from 'react-redux'; 
import '../assets/css/general.css'  

import Page from '../_construct/Page'; 
import {ResetPassword} from '../_components';

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = []; 
        

        _content.push(<ResetPassword key="login"></ResetPassword>); 
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
    
    return {
    
    };
}

const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage }; 