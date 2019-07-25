import React from 'react';
import {connect} from 'react-redux' 
import {userActions} from '../_actions' 
import { FormControl,Container, Row, Col, FormGroup, Form} from 'react-bootstrap'
import {LoginFB} from './Login.facebook'
import {LoginGoogle} from './Login.google' 
import {PaypalButton} from './Payment.paypal'

class Payment extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            email:'',
            country:'',
            name:'',
            phone: ''
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleSubmit() {
        this.setState({ submitted: true });
        let info = this.state;
        const { dispatch } = this.props;
        if (info) {
            dispatch(userActions.login(info, 'google'));
        }
    }   

    handleChange(e) {
        const { name, value } = e.target; 
        this.setState({ [name]: value }); 
    }
    
    render() {  
        const {loggedIn, user} = this.props;

        const subject = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin:'20px'
        }
        
        const title = {fontSize:'20px',textDecoration:'bold'}

        return ( 
            <div> 
                <Row style={subject}> 
                    <h1><b>PAYMENT METHOD</b></h1> 
                </Row>
                <Container>
                    <Form method="post" onSubmit={this.handleSubmit}>
                        <Row style={{padding:'30px', margin:'0 100px 100px 100px',backgroundColor:'#f1f1ff'}}>
                            <Col lg={7} md={7} sm={7} xs={12} >
                                <h4>1. Login</h4>
                                { loggedIn ?
                                    <p style={title}>You have logined via {user.type} with name is: {user.username}</p>
                                :   
                                    <div>
                                        <p style={title}>You must login and enter your infomation</p>
                                        <div className="social-container"> 
                                            <Row style={{display:'flex', alignItems:'center'}}>
                                                <LoginFB text="Login with Facebook"></LoginFB>
                                                <LoginGoogle text="LOGIN WITH GOOGLE"></LoginGoogle>
                                            </Row> 
                                        </div>
                                    </div>
                                } 
                                {user ? 
                                    <div>
                                        <FormGroup>
                                            <Form.Label>Full Name <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <Form.Control type="text" name="name" value={user.username} onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Your country <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="text" name="country" value={user.country} onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup >
                                            <Form.Label>Email address <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="email" name="email" value={user.email} onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Phone number <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="text" name="phone" value={user.phone} onChange={this.handleChange}/>
                                        </FormGroup> 
                                    </div>
                                :
                                    <div>
                                        <FormGroup>
                                            <Form.Label>Full Name <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <Form.Control type="text" name="name" onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Your country <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="text" name="country" onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup >
                                            <Form.Label>Email address <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="email" name="email" onChange={this.handleChange}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Form.Label>Phone number <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                            <FormControl type="text" name="phone" onChange={this.handleChange}/>
                                        </FormGroup> 
                                    </div>
                                }
                                
                            </Col>
                            <Col lg={5} md={5} sm={5} xs={12} className="payment-content">
                                <h4>2. Confirm your order and accept</h4>
                                <p style={title}>Second, Complete your order</p>
                                    <FormGroup className="name-info-user"> 
                                        <Form.Label>Postal Code <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                        <FormControl type="text" name="code"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Name Card <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                        <FormControl type="text" id="card-name" placeholder="Enter card name" name="card-name"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Form.Label>Number Card <b style={{color:'red', fontSize:'15px'}}>(*)</b></Form.Label>
                                        <FormControl type="text" id="card-number" placeholder="Enter card number" name="card-number"/>
                                    </FormGroup>
                                    <PaypalButton></PaypalButton>
                            </Col>
                        </Row>
                    </Form>
                </Container> 
            </div>
        )
    }
}
 
function mapStateToProps(store) {
    const { loggedIn, user, submitting } = store.authentication;
    const { alert } = store;  
    return { 
        alert,
        loggedIn,
        user,
        submitting
    };
}

const connectedPayment = connect(mapStateToProps)(Payment);
export { connectedPayment as Payment }; 