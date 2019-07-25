import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return { 
      };
    case userConstants.SEND_RESET_PASSWORD_FAILURE:
      return {
        error: action.error
      };
    case userConstants.SEND_RESET_PASSWORD_REQUEST:
      return {
        loading: true
      };
    case userConstants.SEND_RESET_PASSWORD_SUCCESS:
      return {};
   
    case userConstants.LOGIN_TIMEOUT:
      return {
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}