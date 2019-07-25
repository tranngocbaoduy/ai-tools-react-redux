import React from 'react';  
import '../assets/css/general.css'  

import Page from '../_construct/Page'; 
import {Payment} from '../_components';

class PaymentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.buildContent()
        }
    }
 
    buildContent() { 
        let _content = []; 
        

        _content.push(<Payment key="payment"></Payment>); 
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

const connectedPaymentPage = PaymentPage;
export { connectedPaymentPage as PaymentPage }; 