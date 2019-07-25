import React from 'react'; 
import { connect } from 'react-redux';
// import { userActions } from '../_actions';
import {Form,Button,Alert,FormControl,Image} from 'react-bootstrap'
import '../assets/css/general.css' 
import '../assets/css/login.css' 


class InfoUser extends React.Component {
    constructor(props) {
        super(props); 
        
        this.state = {
            username:'',
            submittedUpdate: false,
            submitting: false
        };

        this.handleChange = this.handleChange.bind(this);
    }
 
 
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    } 

    render() {
        const { user } = this.props;
        const { submittedUpdate, submitting } = this.state;
        
        return ( 
            <div className="general my-container" id='my-container'>  
                <div className="form-container sign-up-container">
                    <Form className='my-form-signinup'>
                        <h1 className='title'>Infomation Account</h1>
                        
                        <span>or use your email for registration</span>
                        <FormControl type="text" placeholder="Name" name="username" value={user.username} onChange={this.handleChange}/>
                        {submittedUpdate &&  
                            <Alert variant='danger' className="help-block"> Username is required </Alert>
                        }
                        <FormControl type="email" placeholder="Email" name="email" value={user.email} disabled/> 
                        {alert.message &&
                            <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                        }
                        <Button className='btn-signinup-page' type="submit" disabled variant="outline-success">Sign Up</Button>
                        {submitting &&
                            <Image width="500px" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </Form>
                </div> 
                <div className="form-container sign-in-container">
                <Form className='my-form-signinup'>
                        <h1 className='title'>Infomation Account</h1>
                        
                        <span>or use your email for registration</span>
                        <FormControl type="text" placeholder="Name" name="username" value={user.username} onChange={this.handleChange}/>
                        {submittedUpdate &&  
                            <Alert variant='danger' className="help-block"> Username is required </Alert>
                        }
                        <FormControl type="email" placeholder="Email" name="email" value={user.email} disabled/> 
                        {alert.message &&
                            <Alert className={`alert ${alert.type}`}>{alert.message}</Alert>
                        }
                        <Button className='btn-signinup-page' type="submit" disabled variant="outline-success">Sign Up</Button>
                        {submitting &&
                            <Image width="500px" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </Form>
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
        );
    }
}
 
function mapStateToProps(store) {
    const { user } = store.authentication; 
    return {
        user
    };
}

const connectedInfo = connect(mapStateToProps)(InfoUser);
export { connectedInfo as InfoUser }; 