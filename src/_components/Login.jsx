import React from 'react'; 
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {Form,Row,Button,Spinner,Alert,FormControl,Image} from 'react-bootstrap'
import '../assets/css/general.css' 
import '../assets/css/login.css'
// import {history } from '../_helpers'
import {LoginFB, LoginGoogle} from '../_components'
import { FormGroup } from '@material-ui/core';


class Login extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            email:'',
            username: '',
            password: '',
            submittedLogin: false,
            submittedRegister: false,
            submittedForgetPassword: false,
            changeResetPassword: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleForgetPassword = this.handleForgetPassword.bind(this);
        this.changeResetPassword = this.changeResetPassword.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this); 
    }

    componentDidMount(){
       
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn'); 
        const signUpButtonMobile = document.getElementById('signUpMobile');
        const signInButtonMobile = document.getElementById('signInMobile'); 
        
        const container = document.getElementById('my-container');

        signUpButton.addEventListener('click', () => { 
            container.classList.add('right-panel-active');
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        });

        signUpButtonMobile.addEventListener('click', () => { 
            container.classList.add('right-panel-active');
        });

        signInButtonMobile.addEventListener('click', () => {
            container.classList.remove('right-panel-active');
        }); 
    } 
 
    handleChange(e) {
        const { name, value } = e.target; 
        this.setState({ [name]: value }); 
    }

    changeResetPassword(e){
        e.preventDefault();
        this.setState({ changeResetPassword: !this.state.changeResetPassword });
    } 
    
    handleForgetPassword(e){
        e.preventDefault();
        this.setState({ submittedForgetPassword: true, email: '' });
        const { email } = this.state;
        const { dispatch } = this.props;
        if (email) {
            dispatch(userActions.send_reset_password(email));
        }
    }

    handleSubmitLogin(e) {
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

    handleSubmitRegister(e) {
        e.preventDefault();

        this.setState({ submittedRegister: true });
        const { username, email, password } = this.state;
        const { dispatch } = this.props;
        if (username && password && email) {
            dispatch(userActions.register(username, email, password, 'customer'));
        }
    } 


    // setTimeoutLogin(){ 
    //     // time out is calculate by minutes
    //     const _timeout = 1;

    //     const { dispatch } = this.props;
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             if(localStorage.getItem('user')){
    //                 alert('Token will be exppired soon');
    //                 setTimeout(() => {
    //                     dispatch(userActions.logout());  
    //                     alert('Time out has expired. Please login again')   
    //                     history.push("/login")
    //                     return;
    //                 }, _timeout-.5 * 10000);
    //             } 
    //         }, _timeout * 10000)
    //     })
    // }
    componentWillReceiveProps(){
        const {registerSuccess} = this.props;
        if(registerSuccess){
            this.setState({ 
                email: '',
                password:'',
                username:'',  
                submittedRegister: false  
            }); 
        }
        const { loggingIn } = this.props; 
        if(loggingIn){
            this.setState({  
                email: '',
                password:''
            }); 
        }
    } 

    render() { 
        const { loggingIn, alert, error, registering, loading, registerSuccess } = this.props;
        const { email, username, password, submittedLogin, submittedRegister, submittedForgetPassword, changeResetPassword } = this.state; 

        return (
            <div>  
            <Row className='overlay-container-mobile'>
                <Button className="ghost btn-signinup-page-mobile" id="signInMobile" variant="outline-success">Sign In</Button>
                <Button className="ghost btn-signinup-page-mobile" id="signUpMobile" variant="outline-success">Sign Up</Button>
            </Row> 
            <div className="general my-container" id='my-container'>  
                <div className="form-container sign-up-container"> 
                    <Row className='my-form-signinup' >
                        <h1 className='title'>Create Account</h1>  
                        <Row className="social-container"> 
                            <LoginFB className="social"></LoginFB>
                            <LoginGoogle className="social"></LoginGoogle>
                        </Row> 
                        <span>or use your email for registration</span>
                        <Form style={{width:'100%'}} onSubmit={this.handleSubmitRegister}>
                            <FormControl type="text" placeholder="Name" name="username" value={username} onChange={this.handleChange}/>
                            {submittedRegister && !username &&
                                <Alert variant='danger' className="help-block"> Username is required </Alert>
                            }
                            <FormControl type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange}/>
                            {submittedRegister && !email &&
                                <Alert variant='danger' className="help-block"> Email is required </Alert>
                            }
                            <FormControl type="password" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                            {submittedRegister && !password &&
                                <Alert variant='danger' className="help-block"> Password is required </Alert>
                            }
                            {submittedRegister && alert.message &&
                                <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                            }
                            {registerSuccess && alert.message &&
                                <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                            }
                            <Button className='btn-signinup-page' type="submit" variant="outline-success">Sign Up</Button>
                            {registering &&
                                <Spinner animation="grow" variant="primary" /> 
                            }
                        </Form>
                    </Row>
                </div>
                <div className="form-container sign-in-container"> 
                        { !changeResetPassword ?
                            <Row className='my-form-signinup'>
                                <h1 className='title'>Sign in</h1> 
                                    <Row className="social-container"> 
                                        <LoginFB className="social"></LoginFB>
                                        <LoginGoogle className="social"></LoginGoogle>
                                    </Row> 
                                <span>or use your account</span>
                                <Form style={{width:'100%'}}onSubmit={this.handleSubmitLogin}>
                                    <FormControl type="email" placeholder="Email" value={email} name="email" onChange={this.handleChange}/>
                                    {submittedLogin && !email &&
                                        <Alert variant='danger' className="help-block"> Email is required </Alert>
                                    } 
                                    <FormControl type="password" placeholder="Password" value={password} name="password" onChange={this.handleChange}/>
                                    {submittedLogin && !password &&
                                        <Alert variant='danger' className="help-block"> Password is required </Alert>
                                    } 
                                    {submittedLogin && (!email || !password) && alert.message &&
                                        <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                                    }
                                    {/* {!email && !password && alert.message && 
                                        <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                                    } */}
                                    <FormGroup><a href="#reset_password" onClick={this.changeResetPassword}>Forgot your password?</a></FormGroup>
                                    <Button className='btn-signinup-page' type="submit" variant="outline-success">Sign In</Button>
                                    {loggingIn &&
                                        <Spinner animation="grow" variant="primary" /> 
                                    } 
                                </Form>
                            </Row>
                            :   
                            <Form className='my-form-signinup' onSubmit={this.handleForgetPassword}>
                                <h1 className='title'>Reset Password</h1> 
                                <span className="social-container">Please enter your email follow form below</span>    
                                <FormControl type="email" placeholder="Email" id="email-reset" value={email} name="email" onChange={this.handleChange}/>
                                {submittedForgetPassword && error && !email &&
                                    <Alert variant='danger' className="help-block"> {error} </Alert>
                                } 
                                {submittedForgetPassword && alert.message &&
                                    <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                                }
                                {loading &&
                                    <Image mt="20px" width="50px" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                                <a href="#reset_password" onClick={this.changeResetPassword}>Continue login?</a>
                                <Button type='submit' className='btn-signinup-page' variant="success"  >Send Password To Email</Button>
                            </Form>
                        }  
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className='content-signinup'>To keep connected with us please login with your personal info</p>
                            <Button className="ghost btn-signinup-page" id="signIn" variant="outline-success">Sign In</Button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className='content-signinup'>Enter your personal details and start journey with us</p>
                            <Button className="ghost btn-signinup-page" id="signUp" variant="outline-success">Sign Up</Button>
                        </div>
                    </div>
                </div>
            </div>  
           
    </div>
        );
    }
}
 
function mapStateToProps(store) {
    const { loggingIn,loggedIn,error,loading } = store.authentication;
    const { registering, registerSuccess } = store.registration;
    const { alert } = store;  
     
    return {
        loggingIn,
        alert,
        loggedIn,
        error,
        registering,
        loading,
        registerSuccess
    };
}

const connectedLogin = connect(mapStateToProps)(Login);
export { connectedLogin as Login }; 