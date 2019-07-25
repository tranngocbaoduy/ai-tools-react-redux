import { productConstants } from '../_constants';

export function product(state = {}, action) {
  switch (action.type) { 
    case productConstants.GET_REQUEST:
      return {
        loadingProduct: true
      };
    case productConstants.GET_SUCCESS:
      return {
        item: action.product
      };
    case productConstants.GET_FAILURE:
      return { 
        error: action.error
      }; 
    default:
      return state
  }
}