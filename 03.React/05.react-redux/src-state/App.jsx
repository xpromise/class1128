import React, { Component } from 'react';

export default class App extends Component {
  state = {
    value: 1,
    number: 0
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  increment = () => {
    const { value, number } = this.state;
    this.setState({
      number: number + +value
    })
  }

  decrement = () => {
    const { value, number } = this.state;
    this.setState({
      number: number - +value
    })
  }

  incrementIfOdd = () => {
    const { value, number } = this.state;
    if (number % 2 === 0) return;
    this.setState({
      number: number + +value
    })
  }

  incrementAsync = () => {
    setTimeout(() => {
      const { value, number } = this.state;
      this.setState({
        number: number + +value
      })
    }, 1000)
  }


  render() {
    const { value, number } = this.state;

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