import React, { Component } from 'react'  
import { connect } from 'react-redux'  
import '../assets/css/search.css'
import { Row, Alert, Spinner} from 'react-bootstrap'
import '../assets/css/general.css' 
import '../assets/css/product.css' 
import { productActions } from '../_actions/product.actions' 
import Product from './Product'
import LazyLoad from 'react-lazyload' 

class ResultSearchProduct extends Component {

  constructor(props) {
    super(props); 
    this.state = {
      page: 1, 
      per_page: 10, 
    } 
    this.featureProduct = this.featureProduct.bind(this);
    this.loadMoreBottom = this.loadMoreBottom.bind(this);
  } 

  featureProduct = () => {
    const { dispatch, user, query } = this.props;
    const { page, per_page } = this.state; 
    if(user && user.token){ 
      dispatch(productActions.getPerPage(query, page, per_page, user.token));
    }
  }

  loadMoreBottom = () =>{ 
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.setState({
        page:  this.state.page + 1
      })
      this.featureProduct() 
    }
  }

  componentDidMount(){
    this.featureProduct()  
  } 

  render() {   
    const { items, drop, quantity, loading} = this.props;  
    window.onscroll = () =>{
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreBottom()
      }
    } 
    return ( 
      <div className="general">   
          { !loading &&  drop && 
            <Alert variant='success' style={{borderRadius:'0%'}} className="help-block"><b>We found {quantity} items</b></Alert> 
          }
        <Row style={{padding: '0px',margin:0}} key='row-ad' > 
            {items && items.map(item=> 
              item.image_url_product !== "original_image_url" && 
              // item.snap_shot.link_url !== "link_url" && 
              // item.snap_shot.page_profile_uri !== "page_profile_uri" && 
                <div className="product-item" key={item._id['$oid']+'out'}>
                  <LazyLoad key={item.ad_id+'product'}
                            height={500}
                            offset={[-200,200]} 
                            placeholder={
                            <div style={{textAlign:"center"}}>
                              <Spinner as="span" size="sm" animation="border" variant="success"/> 
                            </div>}>
                          <Product data={item}></Product>
                  </LazyLoad>
                </div> 
            )}
        </Row>
          { loading && 
            <div style={{textAlign:"center", margin:'1vw'}}>
              <Spinner as={Row} size="sm" animation="grow" variant="success"/> 
              <Spinner as={Row} size="sm" animation="grow" variant="success"/> 
              <Spinner as={Row} size="sm" animation="grow" variant="success"/> 
            </div>
          }
      </div> 
    )
  }
} 
 
function mapStateToProps(store) { 
  const { items, query, drop, quantity, loading } = store.products; 
  const { user } = store.authentication; 
  return {
    items,
    user,
    query,
    drop,
    quantity,
    loading
  };
}

const connectedResultSearchProduct = connect(mapStateToProps)(ResultSearchProduct);
export { connectedResultSearchProduct as ResultSearchProduct }; 