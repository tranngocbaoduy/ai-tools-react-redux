import React from 'react'; 
import { connect } from 'react-redux';
import { productActions } from '../../_actions';
import { Spinner,Col, Row, Button} from 'react-bootstrap'
import '../../assets/css/general.css'    
import {history} from '../../_helpers'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';  

class Product extends React.Component {
    constructor(props) {
        super(props);  

        this.state = {
            page: 1
        }

        // this.buildContent = this.buildContent.bind(this);   
        this.handleEffect = this.handleEffect.bind(this);
    }
 
    handleEffect(){
        window.jQuery('#dashboard').animate({width:'toggle'},500);
    }
   
    componentWillReceiveProps(){ 
        const { handleGet } = this.props;  
        const { page } = this.state;
        if(handleGet){
            const { dispatch } = this.props;
            let user = JSON.parse(localStorage.getItem('user'));
            if(user){ 
                dispatch(productActions.getAll(page, user.token)); 
            } 
        }
         
    }
     

    render() {  
        const { loggedIn, loadingProduct, items} = this.props;   
        if(!loggedIn){ 
            history.push('/admin')
        }   

        const columns = [{
            dataField: 'image_author',
            text: 'Avatar',
            formatter: imageAuthorFormatter,
          },{
            dataField: 'author',
            text: 'Author',
            filter: textFilter()
          },  {
            dataField: 'date_posted',
            text: 'Date Posted',
            filter: textFilter()
          },{
            dataField: 'title',
            text: 'Title',
            filter: textFilter()
          },{
            dataField: 'image_file',
            text: 'Image', 
            formatter: imageFileFormatter
          },{
            dataField: 'description',
            text: 'Description',
            filter: textFilter(),
            formatter: descriptionFormatter
          },{
            dataField: 'url_page',
            text: 'URL'
          },{
            dataField: 'like',
            text: 'Like'
          },{
            dataField: 'brand',
            text: 'Brand',
            filter: textFilter(),
            formatter: brandFormatter
          }];
        return (
            <div>  
                <Row style={{ width:'100%'}}>
                    <Row style={{ width:'100%'}}>
                        <Col lg={10} md={10} >
                            <h1 className='title-dash-board' style={{fontSize:'35px !important'}}> 
                                <Button variant="outline-light" onClick={this.handleEffect} style={{margin:'5px 15px 10px 0px'}}>
                                    <img width='20px'  alt="back-icon" src="./images/icons/menu.png"/>
                                </Button>Product Train
                                {loadingProduct &&
                                    <span>
                                        <Spinner style={{marginLeft:'20px'}} size="sm" animation="grow" variant="dark" /> 
                                        <Spinner style={{marginLeft:'20px'}} size="sm" animation="grow" variant="dark" /> 
                                        <Spinner style={{marginLeft:'20px'}} size="sm" animation="grow" variant="dark" /> 
                                    </span>
                                }
                                
                            </h1>
                              
                                
                            
                        </Col>
                        <Col lg={2} md={2} ><Button  style={{marginTop:'20px', marginLeft:'50%'}} variant="outline-danger"href="/logout">Logout</Button></Col>
                    </Row> 
                    {items &&
                        <BootstrapTable style={{width:"100%"}} keyField='id' data={ items } columns={columns} pagination={ paginationFactory()}  filter={ filterFactory() } />
                    }
                    
                </Row> 
            </div>
        );
    }
}

function imageFileFormatter(cell, row, rowIndex, formatExtraData) {  
    return ( 
        <img className="product-item" src={cell} alt="" /> 
    );
}

function imageAuthorFormatter(cell, row, rowIndex, formatExtraData) {  
    return ( 
        <img className="product-item" src={cell} alt="" /> 
    );
}


function brandFormatter(cell, row, rowIndex, formatExtraData) {  
    return ( 
        cell.substring(0,50)
    );
}

function descriptionFormatter(cell, row, rowIndex, formatExtraData) {  
    return ( 
        cell.substring(0,100)
    );
}
function mapStateToProps(store) {
    const { loggedIn,error } = store.authentication;  
    const { loadingProduct, items } = store.products 
    return { 
        loadingProduct,
        loggedIn,
        items,
        error,  
    };
}

const connectedProduct = connect(mapStateToProps)(Product);
export { connectedProduct as Product }; 