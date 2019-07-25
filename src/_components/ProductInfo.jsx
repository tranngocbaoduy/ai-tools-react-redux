import React from 'react';
import { connect } from 'react-redux'; 
import { productActions } from '../_actions'
import  Product from './Product'
import { Spinner } from 'react-bootstrap'

class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item:this.props.item
        };

        this.loadProduct = this.loadProduct.bind(this);
    }

    componentDidMount(){
        this.loadProduct()
    }

    loadProduct(){ 
        const { dispatch } = this.props; 
        let id_product ='5d2c80f76fe2cf300edb17af';
        let user = JSON.parse(localStorage.getItem('user')); 

        if(user && id_product){ 
          dispatch(productActions.getById(id_product, user.token));
        } 
    }
     
    render() {
        const { item, loadingProduct } = this.props;

        return ( 
            <div> 
                {loadingProduct && 
                    <Spinner as="span" size="sm" animation="grow" variant="danger" style={{float:'right',margin:'3px'}} /> 
                }  
                {item &&
                    <Product key={item.id} data={item}></Product>
                } 
            </div>
        );
    }
}

function mapStateToProps(store) {
    const { item, loadingProduct } = store.product;
    return {
        item,
        loadingProduct
    };
}

const connectedProductInfo = connect(mapStateToProps)(ProductInfo);
export { connectedProductInfo as ProductInfo }; 