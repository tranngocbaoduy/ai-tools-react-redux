import React, { Component } from 'react'  
import {connect} from 'react-redux' 
import '../assets/css/filter.css';
import {Image, Row, FormGroup, Button, Col, Card, Form ,InputGroup,FormControl} from 'react-bootstrap'
import {productActions} from '../_actions/product.actions'  

class Filter extends Component{ 
    
    constructor(props) {
        super(props);  
        this.state = {
          query: this.props.query,
          page: 1, 
          per_page: 10,
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

    handleSubmitSearch = (e) => {  
        e.preventDefault()
        this.setState({ submittedSearch: true }); 
        const { dispatch, user } = this.props;
        const { page, per_page, query  } = this.state; 
        if(user && user.token){ 
            dispatch(productActions.search(query, page, per_page, user.token));
        }
    }

    handleOnKeyUp = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }); 
    }

    render(){ 
        const { query } = this.state; 
        return(  
            <Row border="primary"  uk-sticky='show-on-up: true; animation: uk-animation-slide-top' className="fliter-header" >    
                <Form method="get" onSubmit={this.handleSubmitSearch} className="filter-form" >  
                    <Form.Row>
                        <Form.Group as={Col}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image className="icon" src="./images/icons/link.svg"/>
                                </InputGroup.Prepend>
                                <Form.Control type="text" />
                                <Form.Control.Feedback type="invalid">
                                    
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image  className="icon" src="./images/icons/identification.svg"/>
                                </InputGroup.Prepend>
                                <Form.Control type="text" />
                                <Form.Control.Feedback type="invalid">
                                    
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image className="icon" src="./images/icons/enter.svg"/>
                                </InputGroup.Prepend>
                                <Form.Control type="text" />
                                <Form.Control.Feedback type="invalid">
                                    
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image  className="icon" src="./images/icons/more.svg"/>
                                </InputGroup.Prepend>
                                <Form.Control type="text" />
                                <Form.Control.Feedback type="invalid">
                                    
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Image  className="icon" src="./images/icons/more.svg"/>
                                </InputGroup.Prepend>
                                <Form.Control type="text" />
                                <Form.Control.Feedback type="invalid">
                                   
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row> 
                    <Form.Row>  
                        <FormGroup as={Col} >
                            <InputGroup> 
                                <InputGroup.Prepend>
                                    <Image className="search-icon" src="./images/search.png"/>
                                </InputGroup.Prepend>
                                <FormControl type="text" name="query" value={query}  onChange={this.handleOnKeyUp} className="filter-input-search" placeholder="Seach for all photos ...." /> 
                            </InputGroup>
                        </FormGroup> 
                    </Form.Row>  
                    <Button style={{display:'none'}} type="submit">Submit form</Button>
                </Form>  
            </Row>   
            
        )
    }
}


function mapStateToProps(store) {
    const { query } = store.products; 
    const { user } = store.authentication; 
    return {
      query,
      user,
    };
  }
  
  const connectedFilter = connect(mapStateToProps)(Filter);
  export { connectedFilter as Filter }; 