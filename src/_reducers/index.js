import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { product } from './product.reducer'; 
import { products } from './products.reducer'; 
import { users } from './users.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  alert,
  user,
  users,
  product,
  products
});

export default rootReducer;