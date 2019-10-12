import { SIGNUP, LOGIN } from '../types';

export const signup = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKTqsObDfxKvY2SJqhhPW6_5alsAMjbZg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: SIGNUP
      });
    } catch (err) {
      throw err;
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKTqsObDfxKvY2SJqhhPW6_5alsAMjbZg',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
          })
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: LOGIN
      });
    } catch (err) {
      throw err;
    }
  };
};
