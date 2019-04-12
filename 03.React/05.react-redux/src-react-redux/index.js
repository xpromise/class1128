import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';

// Provider作用： 1. 一旦store发生变化，重新渲染组件  2. 给需要store对象的组件（由connect方法返回的新组件），传入相应的属性和方法
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
