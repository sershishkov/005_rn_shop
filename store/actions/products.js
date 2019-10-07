import {
  CREATE_PRODUCT,
  SET_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from '../types';

import Product from '../../models/product';

export const fetchProducts = () => {
  try {
    return async dispatch => {
      const response = await fetch(
        'https://rn-shop-e9dd2.firebaseio.com/products.json',
        {
          // method: 'GET',
          //Если GET то можно не указывать метод
        }
      );
      // console.log(response);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      // console.log(resData);
      const loadedProducts = [];

      for (let key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      // console.log(loadedProducts);

      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts
      });
    };
  } catch (err) {
    //send to custom analytics server
    throw err;
  }
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
  console.log('id', id);
  console.log('title', title);
  console.log('description', description);
  console.log('imageUrl', imageUrl);

  return async dispatch => {
    await fetch(`https://rn-shop-e9dd2.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application.json'
      },
      body: JSON.stringify({
        title: 'Red Shirt',
        description: 'A red t-shirt, perfect for days with non-red weather.',
        imageUrl:
          'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg'
      })
    });

    dispatch({
      type: UPDATE_PRODUCT,
      productData: {
        pid: id,
        title,
        description,
        imageUrl
      }
    });
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    await fetch(
      `https://rn-shop-e9dd2.firebaseio.com/products/${productId}.json`,
      {
        method: 'DELETE'
      }
    );

    dispatch({
      type: DELETE_PRODUCT,
      pid: productId
    });
  };
};
