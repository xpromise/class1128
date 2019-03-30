// 通过npm下载的模块
import React, { Component } from 'react';
import { Link, NavLink, Route, Redirect, Switch } from 'react-router-dom';
// 自定义的js模块
import About from './components/about';
import Home from './components/home';
import MyNavLink from './components/my-nav-link';


export default class App extends Component{
  
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header"><h2>React Router Demo</h2></div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-2">
            <div className="list-group">
              {/*
                Link： 只修改url的地址，不会发送请求
                NavLink：只修改url的地址，不会发送请求，并且多了一个class:active
              */}
              <MyNavLink to="/about">About</MyNavLink>
              <MyNavLink to="/home">Home</MyNavLink>
              {/*<a className="list-group-item" href="javascript:">About</a>
              <a className="list-group-item" href="javascript:">Home</a>*/}
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/*
                  展示组件内容
                  Route: 一旦url变为path对应的值，就加载component中的组件进行显示
                  Redirect: 什么路径都匹配，一旦匹配上就跳转到指定网址
                  Switch: 切换显示（针对内部组件 - 子组件） --> 从上到下匹配，一旦有一个匹配上，其他就不看了
                  
                  通过Route加载的组件就是路由组件，路由组件默认有三个属性：history、location、match
                */}
                <Switch>
                  <Route path="/about" component={About}/>
                  <Route path="/home" component={Home}/>
                  <Redirect to="/about"/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}