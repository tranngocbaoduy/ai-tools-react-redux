import React from 'react'; 
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {Form,Button, Alert, ButtonToolbar, Spinner, Row} from 'react-bootstrap'
import '../../assets/css/general.css'    

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'', 
            password: '',
            submittedLogin: false,  
        };

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e) {
        const { name, value } = e.target; 
        this.setState({ [name]: value });  
    }
 
    handleSubmit(e) {
        e.preventDefault(); 
        this.setState({ submittedLogin: true });
        const { email, password } = this.state;
        const info = {
            email, password
        }
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(userActions.login(info, 'none'));
        }
    }
    
    componentWillReceiveProps(){
        const { loggingIn } = this.props; 
        if(loggingIn){
            this.setState({  
                password:'',
                submittedLogin: false
            }); 
        }
    }

    render() {  
        const { loggingIn, alert } = this.props;
        const { email, password, submittedLogin } = this.state;

        const styleLogin = { 
            width:'100vw',
            height:'100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
        const styleForm = {
            width: '30vw'
        }  
        return (
            <div>  
                <Row style={styleLogin}>
                   
                    <Form style={styleForm} method="post" onSubmit={this.handleSubmit}>
                        <h1><b>Admin Page</b></h1>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label><b>Email address</b></Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={email} onChange={this.handleChange} />
                            {submittedLogin && !email &&
                                <Alert variant='danger' className="help-block"> Email is required </Alert>
                            } 
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label><b>Password</b></Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                            {submittedLogin && !password &&
                                <Alert variant='danger' className="help-block"> Password is required </Alert>
                            }
                        </Form.Group>
                        {!loggingIn && alert.message && !password && 
                            <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                        }
                        <ButtonToolbar>
                            <Button type="submit" variant="outline-success">
                                {loggingIn &&
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        style={{marginRight:'1vw'}}
                                    />
                                }
                            Login</Button>
                        </ButtonToolbar> 
                    </Form> 
                </Row> 
            </div>
        );
    }
}
 
function mapStateToProps(store) {
    const { loggingIn,loggedIn,error } = store.authentication; 
    const { alert } = store;  
     
    return {
        loggingIn,
        alert,
        loggedIn,
        error,  
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 