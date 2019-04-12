import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { increment, decrement } from './redux/action-creators';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  state = {
    value: 1
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  increment = () => {
    const { value } = this.state;
    // 调用action creators生成action对象
    const action = increment(value);
    // 调用dispatch方法传入action对象 -- 自动触发reducers函数调用 -- 生成新状态交给store对象 -- 想办法重新渲染组件
    this.props.store.dispatch(action);
  }

  decrement = () => {
    const { value } = this.state;
    const action = decrement(value);
    this.props.store.dispatch(action);
  }

  incrementIfOdd = () => {
    const { value } = this.state;
    const number = this.props.store.getState();
    if (number % 2 === 0) return;
    // 调用action creators生成action对象
    const action = increment(value);
    // 调用dispatch方法传入action对象 -- 自动触发reducers函数调用 -- 生成新状态交给store对象 -- 想办法重新渲染组件
    this.props.store.dispatch(action);
  }

  incrementAsync = () => {
    setTimeout(() => {
      const { value } = this.state;
      // 调用action creators生成action对象
      const action = increment(value);
      // 调用dispatch方法传入action对象 -- 自动触发reducers函数调用 -- 生成新状态交给store对象 -- 想办法重新渲染组件
      this.props.store.dispatch(action);
    }, 1000)
  }


  render() {
    const { value } = this.state;
    // 读取store对象管理的状态数据
    // 怎么查看管理了哪些状态数据 -- 看reducers函数返回值
    const number = this.props.store.getState();

    return <div>
      <h1>click {number} times</h1>
      <select onChange={this.handleChange} value={value}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.incrementIfOdd}>increment if odd</button>
      <button onClick={this.incrementAsync}>increment async</button>
    </div>;
  }
}