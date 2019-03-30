import React, { Component } from 'react';
import { Carousel, Button, message } from 'antd';

import './index.css';

export default class App extends Component{
  
  onChange = (current) => {
    console.log(current);
  }
  
  handleClick = (e) => {
    console.log(e.target);
    message.success('点击了按钮~', 1);
  }
  
  render() {
    return (
      <div>
        <Carousel afterChange={this.onChange}>
          <div><h3>1</h3></div>
          <div><h3>2</h3></div>
          <div><h3>3</h3></div>
          <div><h3>4</h3></div>
        </Carousel>
        <Button type="primary" onClick={this.handleClick}>按钮</Button>
      </div>
  
  )
  }
}