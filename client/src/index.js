import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

//action(s)
function signIn() {
  return {
    type: 'SIGN_IN'
  }
}

/* function signOut() {
  return {
    type: 'SIGN_OUT'
  }
} */

//reducer
function signInOut(state = false, action) {
  switch (action.type) {
    case 'SIGN_IN':
      return !state;
      break;
    default:
      return state;
      break;
  }
}

//store
const store = createStore(signInOut);

//display store in console
//store.subscribe(() => console.log(store.getState()));

//dispatch
store.dispatch(signIn())


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

