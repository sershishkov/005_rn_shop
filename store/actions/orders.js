import { ADD_ORDER, SET_ORDERS } from '../types';
import Order from '../../models/order';

export const fetchOrders = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://rn-shop-e9dd2.firebaseio.com/orders/u1.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];

      for (let key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].items,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders
      });
    } catch (err) {
      //send to custom analytics server
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(
      `https://rn-shop-e9dd2.firebaseio.com/orders/u1.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date
      }
    });
  };
};
