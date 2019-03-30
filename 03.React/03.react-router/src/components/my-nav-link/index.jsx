import React from 'react';
import { NavLink } from 'react-router-dom';

// 样式-图片等其他模块
import './index.css';

export default function MyNavLink(props) {
  console.log(props);
  return <NavLink className="list-group-item" activeClassName="my-active" {...props}/>
}