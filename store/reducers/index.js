import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import orders from './orders';
import auth from './auth';

const rootReducer = combineReducers({
  products,
  cart,
  orders,
  auth
});

export default rootReducer;
