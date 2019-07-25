import React from 'react'; 
import { connect } from 'react-redux'; 
import '../assets/css/general.css'  
import Page from '../_construct/Page'; 
import { ProductInfo } from '../_components'; 
import { userActions } from '../_actions'

class ProductPage extends React.Component {
    constructor(props) {
        super(props); 

     
        // return customer back to login if not login yet
        let user = JSON.parse(localStorage.getItem('user')); 
        if (!user){
            this.props.dispatch(userActions.logout());
        } 

        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = [];  
        _content.push(<ProductInfo key="result"></ProductInfo>); 
        
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

const connectedProductPage = connect(mapStateToProps)(ProductPage);
export { connectedProductPage as ProductPage }; 