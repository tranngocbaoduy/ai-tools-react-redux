import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history, isExistToken} from '../_helpers'; 

export const userActions = {
    login, 
    logout,
    register,
    getAll,
    getByEmail,
    send_reset_password,
    reset_password,
    delete: _delete
};

function login(info, type) {
    return dispatch => {
        dispatch(request({ info }));
        userService.login(info, type)
            .then(
                user => { 
                    
                    let pathname = history.location.pathname === '/login' ? '/':history.location.pathname 
                    if( pathname === '/admin' && user.role === 'admin'){
                        pathname = '/dashboard'
                    }else if(pathname === '/admin'){
                        pathname = '/login' 
                        logout();
                        dispatch(alertActions.error('This page for developer. Please login in login page'));
                    } else {
                        dispatch(success(user)); 
                        dispatch(alertActions.success('Login successful'));
                    }
                    history.push(pathname);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
} 

function logout() {   
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(username, email, password, role) {
    return dispatch => {
        dispatch(request({username}));

        userService.register(username, email, password, role)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function send_reset_password(email){
    return dispatch => {
        dispatch(request()); 
        userService.send_reset_password(email)
            .then(
                users => {
                    dispatch(success())
                    dispatch(alertActions.success('We sent email to you. Please check email to change your password'));
                }, 
                error => dispatch(failure(error.toString()))
            ); 
    };

    function request() { return { type: userConstants.SEND_RESET_PASSWORD_REQUEST } }
    function success() { return { type: userConstants.SEND_RESET_PASSWORD_SUCCESS } }
    function failure(error) { return { type: userConstants.SEND_RESET_PASSWORD_FAILURE, error } }
}

function reset_password(password,token){
    return dispatch => {
        dispatch(request()); 
        userService.reset_password(password,token)
            .then(
                users => dispatch(success()),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
    function success() { return { type: userConstants.RESET_PASSWORD_SUCCESS} }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function getAll(token) {
    return dispatch => {
        dispatch(request()); 
        if(isExistToken()){
            userService.getAll(token)
                .then(
                    users => dispatch(success(users)),
                    error => dispatch(failure(error.toString()))
                ); 
        }
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getByEmail(email, token) {
    return dispatch => {
        dispatch(request()); 
        if(isExistToken()){
            userService.getByEmail(email, token)
            .then(
                user => dispatch(success(user)), 
                error => dispatch(failure(error.toString())) 
            ); 
        } 
    };

    function request() { return { type: userConstants.GET_REQUEST } }
    function success(user) { return { type: userConstants.GET_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}