import React, { Component } from 'react'  
import {connect} from 'react-redux'
import {Navbar} from 'react-bootstrap'
import '../assets/css/filter.css';
import {Image, Form ,InputGroup,FormControl} from 'react-bootstrap'
import {productActions} from '../_actions/product.actions' 

class Filter extends Component{ 
    
    constructor(props) {
        super(props);  
        this.state = {
          query: '',
          submittedSearch: false
        }  
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
    }
    
    // getScrollbarWidth() { 
    //     window.addEventListener('scroll',(e) => {
    //         // console.log(e.pageYOffset, e.dir);
    //         if(e.dir === "up" && e.pageYOffset > 649){
    //             window.jQuery('.show-extend').show(300);
    //             window.jQuery('#filter-extend').removeClass('filter-my-nav-center');
    //             window.jQuery('#filter-extend').addClass('filter-my-nav-around');
    //         }else{
    //             window.jQuery('.show-extend').hide(300);
    //             window.jQuery('#filter-extend').removeClass('filter-my-nav-around');
    //             window.jQuery('#filter-extend').addClass('filter-my-nav-center');
    //         }
    //     });
    // }


    // async loadProductFromServer(){   
    //     this.props.dispatch(keySearch(window.jQuery("#search-key-1").val()));  
    //     const res = await axios.post('http://127.0.0.1:5000/search',{query:this.state.query});
    //     this.props.dispatch(loadProduct(res.data));  
    // }

    componentDidMount(){ 
        window.jQuery('.show-extend').hide();
        // this.loadProductFromServer();
    }

    handleSubmitSearch(e) {
        e.preventDefault(); 
        this.setState({ submittedSearch: true });
        const { query } = this.state;
        const { dispatch } = this.props;
        if (query) {
            dispatch(productActions.search(query));
        }
    }

    handleOnKeyUp(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render(){ 
        const {query} = this.state;
        return(
            <div uk-sticky='animation: uk-animation-slide-top' className="fliter-header">
                <Navbar className='my-nav filter-my-nav-center' id="filter-extend" expand="lg"> 
                    <div className="uk-inline">
                        <button className="btn-dropdown-feature uk-button uk-button-default" type="button">Featured</button>
                        <div className='filter-dropdown' uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href='/#'><i className="fas fa-flag"></i>    Featured</a></li>
                                <li><a href='/#'><i className="fas fa-thumbs-up"></i>   Most Appreciated</a></li>
                                <li><a href='/#'><i className="fas fa-eye"></i>     Most Viewed</a></li>
                                <li><a href='/#'><i className="fas fa-comments"></i>    Most Discussed</a></li>
                                <li><a href='/#'><i className="fas fa-clock"></i>   Most Recent</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="btn-dropdown-feature uk-button uk-button-default" type="button">Time</button>
                        <div className='filter-dropdown' uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href='/#'>All Time</a></li>
                                <li><a href='/#'>Today</a></li>
                                <li><a href='/#'>This Week</a></li>
                                <li><a href='/#'>This Month</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="btn-dropdown-feature uk-button uk-button-default" type="button">Likes</button>
                        <div className='filter-dropdown' uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href='/#'>50+</a></li>
                                <li><a href='/#'>100+</a></li>
                                <li><a href='/#'>200+</a></li>
                                <li><a href='/#'>300+</a></li>
                                <li><a href='/#'>400+</a></li>
                                <li><a href='/#'>500+</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="btn-dropdown-feature uk-button uk-button-default" type="button">Comments</button>
                        <div className='filter-dropdown' uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href='/#'>50+</a></li>
                                <li><a href='/#'>100+</a></li>
                                <li><a href='/#'>200+</a></li>
                                <li><a href='/#'>300+</a></li>
                                <li><a href='/#'>400+</a></li>
                                <li><a href='/#'>500+</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="uk-inline">
                        <button className="btn-dropdown-feature uk-button uk-button-default" type="button">Shared</button>
                        <div className='filter-dropdown' uk-dropdown="mode: click">
                            <ul className="uk-nav uk-dropdown-nav">
                                <li><a href='/#'>50+</a></li>
                                <li><a href='/#'>100+</a></li>
                                <li><a href='/#'>200+</a></li>
                                <li><a href='/#'>300+</a></li>
                                <li><a href='/#'>400+</a></li>
                                <li><a href='/#'>500+</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className='uk-inline filter-search-auth'>
                        <Form className="my-input-group filter-form-input-search" onSubmit={this.handleSubmitSearch}>
                            <InputGroup className='filter-input-group'>
                                <Image className="search-icon" src="./images/search.png"/>
                                <FormControl type="text" name="query" value={query} onChange={this.handleOnKeyUp} className="filter-input-search" placeholder="Seach for all photos ...." /> 
                            </InputGroup>
                        </Form>

                
                    </div>
                     
                </Navbar>
            </div>
        )
    }
}


function mapStateToProps(store) {
    const { query } = store.products; 
    return {
      query:query
    };
  }
  
  const connectedFilter = connect(mapStateToProps)(Filter);
  export { connectedFilter as Filter }; 