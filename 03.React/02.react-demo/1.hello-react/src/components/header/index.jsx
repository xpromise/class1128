import React, { Component } from 'react';

// 引入图片资源
import img from './1.jpg';
// 引入样式资源
import './index.css';

export default class Header extends Component {
  render() {
    return <header>
      <img className="logo" src={img} alt="img"/>
    </header>
  }
}