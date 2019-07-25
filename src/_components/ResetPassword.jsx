import React from 'react'; 
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {Form,Button,Alert,FormControl,Spinner} from 'react-bootstrap'
import '../assets/css/general.css' 
import '../assets/css/login.css'
import {history, getUrlVars } from '../_helpers'  

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());
        // console.log(this.props)
        // const query = new URLSearchParams(this.props.location.search);
        // const token = query.get('token')

        this.state = { 
            token: getUrlVars()["token"],
            password: '',
            re_password: '',
            submitted: false
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
        const { password, token } = this.state;
        const { dispatch } = this.props;
        if (token && password) { 
            dispatch(userActions.reset_password(password, token));
        }
    } 

    render() {
        const { loggedIn, submitting } = this.props;
        const { token, password, re_password, submitted } = this.state; 
        if (loggedIn || !token ){
            history.push('/')
        }
        return (  
            <div className="general my-container" id='my-container'>  
                <div className="form-container sign-in-container">
                    <Form className='my-form-signinup' onSubmit={this.handleSubmit}>
                        <h1 className='title'>Create New Password</h1>
                        <div className="social-container"> 
                        </div>
                        <span>Please inform new password to reset your password</span> 
                        <FormControl type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                        {submitted && !password &&
                            <Alert variant='danger' className="help-block"> Password is required </Alert>
                        }
                        <FormControl type="password" placeholder="Re-Password" name="re_password" value={re_password} onChange={this.handleChange}/>
                        {submitted && !password &&
                            <Alert variant='danger' className="help-block"> Re Password is required </Alert>
                        }
                        {submitted && re_password !== password &&
                            <Alert variant='danger' className="help-block"> Re password isn't match </Alert>
                        } 
                        <Button className='btn-signinup-page' type="submit" variant="outline-success">Sign Up</Button>
                        {submitting && 
                            <Spinner animation="grow"  variant="primary" />  
                        }
                    </Form>
                </div>
            </div>   
        );
    }
}


function mapStateToProps(store) {
    const { loggedIn } = store.authentication;
    return {
        loggedIn
    };
}

const connectedResetPassword = connect(mapStateToProps)(ResetPassword);
export { connectedResetPassword as ResetPassword }; 