import { userConstants } from '../_constants';

export function user(state = {}, action) {
  switch (action.type) {
    case userConstants.GET_REQUEST:
      return {
        loading: true
      };
    case userConstants.GET_SUCCESS:
      return {
        item: action.user
      };
    case userConstants.GET_FAILURE:
      return { 
        error: action.error
      }; 
    default:
      return state
  }
}