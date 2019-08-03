import { productConstants } from '../_constants';
const initialState = { 
  query:'',
  type: '',
  drop: false,
  quantity: 0,
  items: [] 
}

export function products(state = initialState, action) {
  switch (action.type) {
    case productConstants.SEARCH_REQUEST:
      if (state.query !== action.query || !state.items ||state.items.length === 0){
        state.items = []
      }
      return {
        ...state,
        drop: true,
        query: action.query,
        loading: true
      };
    case productConstants.SEARCH_SUCCESS:
      return {
        ...state,
        loading:false,
        quantity: action.quantity,
        query: action.query,
        items: action.products
      };
    case productConstants.SEARCH_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loadingProduct: true
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.products
      };
    case productConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case productConstants.GETPER_REQUEST: 
      if (state.query !== action.query || !state.items || state.items.length === 0){
        state.items = []
      }
      return {
        ...state, 
        query: action.query,
        loadingProduct: true
      };
    case productConstants.GETPER_SUCCESS: 
      return { 
        ...state,
        query: action.query,
        items: state.items.length === 0?action.products:state.items.concat(action.products) 
      };
    case productConstants.GETPER_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    // case productConstants.DELETE_REQUEST:
    //   // add 'deleting:true' property to user being deleted
    //   return {
    //     ...state,
    //     items: state.items.map(product =>
    //       product.id === action.id
    //         ? { ...product, deleting: true }
    //         : product
    //     )
    //   };
    // case userConstants.DELETE_SUCCESS:
    //   // remove deleted user from state
    //   return {
    //     items: state.items.filter(user => user.id !== action.id)
    //   };
    // case userConstants.DELETE_FAILURE:
    //   // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
    //   return {
    //     ...state,
    //     items: state.items.map(user => {
    //       if (user.id === action.id) {
    //         // make copy of user without 'deleting:true' property
    //         const { deleting, ...userCopy } = user;
    //         // return copy of user with 'deleteError:[error]' property
    //         return { ...userCopy, deleteError: action.error };
    //       }

    //       return user;
    //     })
    //   };
    default:
      return state
  }
}