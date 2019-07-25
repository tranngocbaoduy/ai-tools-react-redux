import React from 'react'; 
import { connect } from 'react-redux'; 
import {Col, Spinner, Row, ListGroup, Tab} from 'react-bootstrap'
import '../../assets/css/general.css'   
import '../../assets/css/dashboard.css' 
import { Manager } from './Manager'
import { Product } from './Product'  

class DashBoard extends React.Component {
    constructor(props) {
        super(props);  

        this.state = {
            handleGet:true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleEffect = this.handleEffect.bind(this);
    } 

    handleChange(){ 
        this.setState({ handleGet: !this.state.handleGet });  
        this.handleEffect();
    } 

    handleEffect(){
        window.jQuery('#dashboard').animate({width:'toggle'},500);
    }
  
    render() {    
        const { loading, loadingProduct } = this.props;
        const { handleGet } = this.state;

        return (
            <div className='general'>  
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#accounts" >
                    <div id="dashboard" style={{display:'none',width:'300px',height:'100%',backgroundColor:'white',position:'fixed',padding:0, borderRightWidth: '1px', borderRightColor:'#cfcccc', borderRightStyle:'double',zIndex:'2'}}>
                        <p className='title-dash-board' style={{width:'300px'}}>Dash Board</p>
                        <hr></hr>
                        <ListGroup className='dash-board'>
                            <ListGroup.Item action href="#accounts"  onClick={this.handleEffect} >Manager
                                {loading && <Spinner as="span" size="sm" animation="grow" variant="danger" style={{float:'right',margin:'3px'}} /> }
                            </ListGroup.Item>
                            <ListGroup.Item action href="#products" onClick={this.handleChange} >Product
                                {loadingProduct && <Spinner as="span" size="sm" animation="grow" variant="danger" style={{float:'right',margin:'3px'}} /> }
                            </ListGroup.Item>
                            
                            <ListGroup.Item action href="#follow" onClick={this.handleEffect} >Follow</ListGroup.Item>
                            <ListGroup.Item action href="#stat" onClick={this.handleEffect} >Stat</ListGroup.Item>
                            <ListGroup.Item action href="#setting" onClick={this.handleEffect} >Setting</ListGroup.Item>
                        </ListGroup> 
                    </div>
                    <Row className='common-dash-board' style={{width:'100vw',height:'100vh'}}>
                        <Col lg={12} md={12} xs={12} sm={12} style={{padding:0}}>  
                            <Tab.Content>
                                <Tab.Pane eventKey="#accounts" title="Manager Account"> 
                                    <Manager />
                                </Tab.Pane> 
                                <Tab.Pane eventKey="#products" title="Manager Product" > 
                                    <Product handleGet={handleGet}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="#follow" title="Follow"> 
                                    Follow
                                </Tab.Pane>
                                <Tab.Pane eventKey="#stat" title="Follow"> 
                                    Stat
                                </Tab.Pane>
                                <Tab.Pane eventKey="#setting" title="Follow"> 
                                    Setting
                                </Tab.Pane>
                            </Tab.Content> 
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}
 
function mapStateToProps(store) {
    const { loggedIn,error } = store.authentication; 
    const { alert,location } = store;  
    const { loading } = store.users;
    const { loadingProduct } = store.products;

    return {
        location,
        alert,
        loggedIn,
        error,  
        loading,
        loadingProduct,
    };
}

const connectedDashBoard = connect(mapStateToProps)(DashBoard);
export { connectedDashBoard as DashBoard }; 