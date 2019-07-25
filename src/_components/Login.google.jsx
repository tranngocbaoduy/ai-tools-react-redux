import React from 'react';
import GoogleLogin from 'react-google-login';
import {connect} from 'react-redux' 
import {userActions} from '../_actions' 

class LoginGoogle extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            email:'',
            googleId:'',
            name:'',
            accessToken: '',
            imageUrl:'',
        }; 

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
    
    render() { 
        const responseGoogle = (response) => {
            if(response){
                this.setState({
                    accessToken: response.accessToken,
                    googleId: response.profileObj.googleId,
                    email: response.profileObj.email,
                    name: response.profileObj.name,
                    imageUrl: response.profileObj.imageUrl, 
                })
                this.handleSubmit()
            } 
        }

        const {text} = this.props;
        // const {clientSecret} = 'npzh9dynez3S-NAwqWFg3VJf';
        return ( 
            <div style={{margin:'0 3px 0 3px'}}>
                {text ?  
                    <GoogleLogin
                        clientId="23620974401-s2en5qa07b2h6211v45leav6pbiq69a3.apps.googleusercontent.com"
                        render={renderProps => (
                            <button style={{color:'white', backgroundColor:'red', fontSize:'16px' ,fontWeight:'700',fontFamily:'Hevertica, sans-serif', width:'230px', height:'47px'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>{text}</button>
                        )}
                        autoLoad={false}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                :
                    <GoogleLogin
                      clientId="23620974401-s2en5qa07b2h6211v45leav6pbiq69a3.apps.googleusercontent.com"
                      render={renderProps => (
                      <button className="social-google" onClick={renderProps.onClick} disabled={renderProps.disabled}><i className='fa fa-google' style={{color:'white'}} /></button>
                      )}
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                }
          </div>
        )
    }
}
 
function mapStateToProps(store) {
    const { loggingIn,loggedIn } = store.authentication;
    const { alert } = store;  
    return {
        loggingIn,
        alert,
        loggedIn
    };
}

const connectedLoginGoogle = connect(mapStateToProps)(LoginGoogle);
export { connectedLoginGoogle as LoginGoogle }; 