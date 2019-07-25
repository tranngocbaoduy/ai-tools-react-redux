import React from 'react'; 
import { connect } from 'react-redux'; 
import '../assets/css/general.css'  

import Page from '../_construct/Page'; 
import { InfoUser} from '../_components'; 

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = []; 
        
        _content.push(<InfoUser key="info"></InfoUser>);   
        
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

function mapStateToProps(store) {
    const { loggedIn, user } = store.authentication; 
    return {
        loggedIn,
        user
    };
}

const connectedAccountPage = connect(mapStateToProps)(AccountPage);
export { connectedAccountPage as AccountPage }; 