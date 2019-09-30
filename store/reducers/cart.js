import { ADD_TO_CART } from '../types';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = action.price;
      const propdTitle = action.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // already have item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          propdTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          prodPrice,
          propdTitle,
          prodPrice
        );
      }

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: updatedOrNewCartItem
        },
        totalAmount: state.totalAmount + prodPrice
      };
    default:
      return state;
  }
};
