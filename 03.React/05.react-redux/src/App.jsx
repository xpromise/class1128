import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { increment, decrement } from './redux/action-creators';

class App extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
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
    this.props.increment(value);
  }

  decrement = () => {
    const { value } = this.state;
    this.props.decrement(value);
  }

  incrementIfOdd = () => {
    const { value } = this.state;
    const { number, increment } = this.props;
    if (number % 2 === 0) return;
    increment(value);
  }

  incrementAsync = () => {
    setTimeout(() => {
      const { value } = this.state;
      this.props.increment(value);
    }, 1000)
  }


  render() {
    const { value } = this.state;
    const { number } = this.props;

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

/************* redux相关代码 ****************/
/*
// 遍历store对象中的state数据，以props的方式传入组件中
// 将store对象数据传入到组件内，组件就可以通过this.props.xxx直接读取使用
const mapStateToProps = (state) => {
  // state就是store对象保存的状态数据
  // 返回的对象就会以标签属性的方式，展开在App组件上
  return {number: state};
}
// 遍历操作状态数据的方法，以props的方式传入组件中
// 组件内就直接通过this.props.xxx的方法，更新状态了
const mapDispatchToProps = (dispatch) => {
  return {
    increment(data) {
      // 调用action creators生成action对象
      const action = increment(data);
      // 调用dispatch方法传入action对象 -- 自动触发reducers函数调用 -- 生成新状态交给store对象 -- 想办法重新渲染组件
      dispatch(action);
    },
    decrement(data) {
      dispatch(decrement(data));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
*/

// 简写方式
export default connect(
  (state) => ({number: state}),
  { increment, decrement }
)(App);

/*
  引入react-redux，这个库将组件分为两大类：
    UI组件：只负责用户界面的展示，不包含redux内容
    容器组件：只负责操作redux，不包含任何用户界面
 */