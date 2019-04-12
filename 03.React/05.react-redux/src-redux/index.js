import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import store from './redux/store';

// 一旦状态发生变化，就会触发，从而执行回调函数
// 我们需要在回调函数中重新渲染组件，为了让组件得到最新的store对象
store.subscribe(render);

// 初始化渲染
render();

function render() {
  ReactDOM.render(
    <App store={store}/>
    , document.getElementById('root'));
}