import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //引入所有 reducer 函數

// createStore接受三個參數：
// reducer函數跟innitial state(會在server side render用到)
// 最後是 applyMiddleware函數
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render( // store 放在 Provider裡面
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//console.log('stripe key is:',process.env.REACT_APP_STRIPE_KEY );
//console.log('Environment is:',process.env.NODE_ENV);
