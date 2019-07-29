import React, { Component } from 'react'  
import { connect } from 'react-redux'  
import '../assets/css/search.css'
import { Row, Col, Spinner} from 'react-bootstrap'
import '../assets/css/general.css' 
import '../assets/css/product.css' 
import { productActions } from '../_actions/product.actions' 
import Product from './Product'
import LazyLoad from 'react-lazyload'

class ProductDetail extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      page: 1, 
    } 
    this.featureProduct = this.featureProduct.bind(this);
  
  } 

  featureProduct(){
    const { dispatch } = this.props;
    const { page } = this.state;
    let user = JSON.parse(localStorage.getItem('user')); 
    if(user){ 
      dispatch(productActions.getAll(page, user.token));
    }
  }

  componentDidMount(){
    this.featureProduct()
  } 

  render() {  
    // const { content } = this.state;
    const { items } = this.props;  
    return (
      <div className="general">  
        <Row style={{padding: '25px'}} key='row-ad'>
            {items && items.map(item=> (
              <Col lg={3} className="product" sm={4} height="80vh" key={item.ad_id+'out'}>
                <LazyLoad key={item.ad_id}
                          height={500}
                          offset={[-200,200]} 
                          placeholder={
                          <div>
                            <Spinner as="span" size="sm" animation="grow" variant="danger"/>
                            <Spinner as="span" size="sm" animation="grow" variant="danger"/>
                            <Spinner as="span" size="sm" animation="grow" variant="danger"/>
                          </div>}>
                        <Product data={item}></Product>
                </LazyLoad>
              </Col>
            ))}
        </Row>
      </div> 
    )
  }
} 
 
function mapStateToProps(store) { 
  const { items } = store.products; 
  return {
    items
  };
}

const connectedProductDetail = connect(mapStateToProps)(ProductDetail);
export { connectedProductDetail as ProductDetail }; 