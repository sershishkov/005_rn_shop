import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../types';

export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    pid: productId
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    const response = await fetch(
      'https://rn-shop-e9dd2.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application.json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price
      }
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productData: {
      pid: id,
      title,
      description,
      imageUrl
    }
  };
};
