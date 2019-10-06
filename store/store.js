import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
  // composeWithDevTools()
);

export default store;
