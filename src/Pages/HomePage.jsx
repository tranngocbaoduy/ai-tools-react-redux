import React, { Component } from 'react';
import Page from '../_construct/Page'; 
import {ResultSearchProduct, Filter,Search} from '../_components';  
import { connect } from 'react-redux';


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: this.buildContent()
        }
    }
    buildContent() { 
        let _content = [];  
        _content.push(<Search key="mySearchBar"></Search>);
        _content.push(<Filter key='search' ></Filter>); 
        _content.push(<ResultSearchProduct  key='results'></ResultSearchProduct>); 
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 