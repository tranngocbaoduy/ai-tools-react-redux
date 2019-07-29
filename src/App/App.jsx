import React, { Component } from 'react'; 
import '../App.css';  
import { Router, Route,Redirect, Switch } from 'react-router-dom'; 
import {ProductPage,PaymentPage, AdminLoginPage, AdminPage, ResetPasswordPage , AccountPage, LogoutPage, LoginPage, HomePage} from '../Pages';
import { PrivateRoute } from '../_components';
import { history } from '../_helpers';
import {connect} from 'react-redux'

class App extends Component {
  render() { 
    return ( 
        <div>
            <Router history={history}>
                <div>
                    <PrivateRoute exact path="/" component={HomePage} />   
                    <Route exact path="/login" component={LoginPage} />  
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/reset_password" component={ResetPasswordPage} /> 
                    <Switch>
                        <Redirect from='/info' to='/auth/info'/>
                        <PrivateRoute path='/auth/info' component={AccountPage}/>
                    </Switch>
                    {/* <PrivateRoute path="/product" component={ProductPage} /> */}
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/admin" component={AdminLoginPage} /> 
                    <PrivateRoute path='/dashboard' component={AdminPage}/> 
                    <PrivateRoute path='/insight/:id' component={ProductPage}/> 
                </div>
            </Router>
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


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
// export default withRouter(App);
