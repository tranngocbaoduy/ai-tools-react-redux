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

    componentDidUpdate(){
        const { drop } = this.props  
        if(drop){
            window.jQuery('.form-search').hide()    
        } 
    }

    buildContent() { 
        let _content = [];  
        _content.push(<Search className="filter-hidden" key="mySearchBar"></Search>);
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
    const { drop } = state.products;
   
    return {
        drop
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage }; 