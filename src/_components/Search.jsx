import React, { Component } from 'react' 
import {connect} from 'react-redux' 
import {Image} from 'react-bootstrap'
import '../assets/css/search.css'
import {Form,Row,InputGroup,FormControl,FormGroup} from 'react-bootstrap'
import '../assets/css/general.css' 
import {productActions} from '../_actions/product.actions' 

class Search extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      query: '',
      submittedSearch: false
    } 
    this.setBackground = this.setBackground.bind(this); 
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this); 
  } 


  setBackground(){
    const backgroundSearch = document.getElementById('background-search'); 
    let listBackground = ['aviv-ben-or-1494731-unsplash','brennan-burling-1473464-unsplash','cloudy-weather-natural-image','jordan-arnold-1513926-unsplash','sergio-souza-1386770-unsplash'];
    let nameBackground = listBackground[Math.floor(Math.random() * 5)]; 
    backgroundSearch.style.background = "url(../images/" + nameBackground+".jpg) no-repeat center center "; 
    backgroundSearch.style.backgroundSize = 'cover';
    backgroundSearch.style.height = '80vh'; 
    backgroundSearch.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';  
  }
   
  componentDidMount(){
    this.setBackground();
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

  render() {
    const {query} = this.state;

    return (
      <div className="general">  
            <Row className='form-search background-search' id='background-search'>
              <Form className="input-search" onSubmit={this.handleSubmitSearch}>
                <FormGroup className="from-group-search"> 
                  <Form.Label className="label-search-bar">Photos for everyone</Form.Label>  
                  <InputGroup>
                    <Image className="search-icon" src="./images/search.png"/>
                    <FormControl type="text" className="content-input-search" name="query" value={query} onChange={this.handleOnKeyUp} placeholder="Seach for all photos ...." /> 
                  </InputGroup>
                </FormGroup>
              </Form>
            </Row>
      </div> 
    )
  }
}
  

function mapStateToProps(store) {
  const { query } = store.products;
  // console.log(state.authentication) 
  return {
    query:query
  };
}

const connectedSearch = connect(mapStateToProps)(Search);
export { connectedSearch as Search }; 