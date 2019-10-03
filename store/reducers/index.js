import { combineReducers } from 'redux';

import products from './products';
import cart from './cart';
import orders from './orders';

const rootReducer = combineReducers({
  products,
  cart,
  orders
});

export default rootReducer;
