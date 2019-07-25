import React from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from 'react-redux' 
import {userActions} from '../_actions' 
// import { FacebookProvider, Login } from 'react-facebook';

class LoginFB extends React.Component {
    constructor(props) {
        super(props); 

        this.state = {
            userID:'',
            name:'',
            accessToken: '',
            data_access_expiration_time: '',
            expiresIn: '',
            picture:{
                data:{
                    height: 0,
                    is_silhouette: '',
                    url: '',
                    width: 0,
                },
                reauthorize_required_in:'',
                signedRequest: ''
            }, 
        };  

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSDKLoaded = this.handleSDKLoaded.bind(this);
    } 

    handleSubmit() {
        this.setState({ submitted: true });
        let info = this.state;
        const { dispatch } = this.props;
        if (info) {
            dispatch(userActions.login(info, 'facebook'));
        }
    }   

    handleSDKLoaded(res) {
        console.log(res, 123)
    }

    render() { 
        const responseFacebook = (response) => {
            let x; 
            for ( x in response){ 
                this.setState({ [x]: response[x] });
            }
            console.log(response)
            this.handleSubmit() 
        } 
        const {text} = this.props;

        return ( 
            <div style={{margin:0}}>
                {   text ? 
                    <FacebookLogin 
                        appId="566965347166336"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile"
                        callback={responseFacebook}
                        data-logout-link={true}
                        size="small"
                        isSdkLoaded={this.handleSDKLoaded}
                        textButton={text}  
                    />
                :
                    <FacebookLogin
                        appId="566965347166336"
                        autoLoad={false}
                        fields="name,email,picture" 
                        scope="public_profile,email"
                        callback={responseFacebook}
                        redirectUri="https://aitools.herokuapp.com/login"
                        data-logout-link="true" 
                        size="small"
                        textButton=""
                        icon="fa fa-facebook" 
                        isSdkLoaded={true}
                        cssClass="social-facebook" 
                        version="v2.3"
                        returnScopes={true}
                    />  

                //     <FacebookProvider appId="396549384292756">
                //     <Login
                //         scope="email"
                //         onCompleted={responseFacebook}
                //         onError={responseFacebook} 
                //     >
                //         {({ loading, handleClick, error, data }) => (
                //         <span onClick={handleClick}>
                //             Login via Facebook
                //             {loading && (
                //             <span>Loading...</span>
                //             )}
                //         </span>
                //         )}
                //     </Login>
                // </FacebookProvider>
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

const connectedLoginFB = connect(mapStateToProps)(LoginFB);
export { connectedLoginFB as LoginFB }; 