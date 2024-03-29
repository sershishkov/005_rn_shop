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
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = 'Something went wrong';

        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }
        throw new Error(message);
      }

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: SIGNUP,
        token: resData.idToken,
        userId: resData.localId
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
        const errorResData = await response.json();
        const errorId = errorResData.error.message;

        let message = 'Something went wrong';

        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid';
        }
        throw new Error(message);
      }

      const resData = await response.json();

      console.log(resData);

      dispatch({
        type: LOGIN,
        token: resData.idToken,
        userId: resData.localId
      });
    } catch (err) {
      throw err;
    }
  };
};
