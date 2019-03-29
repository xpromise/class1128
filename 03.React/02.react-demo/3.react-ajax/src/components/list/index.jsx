import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function successCallback(res) {
  /*
  filter 新数组和原数组的长度不一样，里面的值和原来的值一模一样
  map 新数组和原数组的长度一样，里面的值和原来的值不一样
 */
  // 更新状态
  this.setState({
    isLoading: false,
    success: res.data.items.map((item) => {
      return {
        name: item.login,
        url: item.html_url,
        image: item.avatar_url
      }
    })
  }, () => {
    // 更新完成状态后才调用回调函数
    isFirst = true;
  })
}
function errorCallback(err) {
  /*
  filter 新数组和原数组的长度不一样，里面的值和原来的值一模一样
  map 新数组和原数组的长度一样，里面的值和原来的值不一样
 */
  // 更新状态
  this.setState({
    isLoading: false,
    error: err
  }, () => {
    // 更新完成状态后才调用回调函数
    isFirst = true;
  })
}

// 标识当前请求是第一次
let isFirst = true;

export default class List extends Component{
  static propTypes = {
    searchName: PropTypes.string.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      isFirstView: true,  // 是否初次显示
      isLoading: false,  // 是否加载中
      success: null,    // 成功的数据
      error: null       // 失败的错误
    }
    successCallback = successCallback.bind(this);
    errorCallback = errorCallback.bind(this);
  }
  
  // 保证组件渲染完毕后在发
  static getDerivedStateFromProps(nextProps, prevState) {
    const { searchName } = nextProps;
    // 因为里面更新状态，重新调用getDerivedStateFromProps方法，又会导致多发请求，isFirst来保证点击一次search只发一次请求
    if (searchName && isFirst) {
      axios.get(`https://api.github.com/search/users?q=${searchName}`)
        .then(successCallback)
        .catch(errorCallback)
      // 将状态切换为 loading
      /*this.setState({
        isLoading: true,
        isFirstView: false
      })*/
      isFirst = false;
      // 在请求还未成功之前，切换为loading状态
      return {
        isLoading: true,
        isFirstView: false
      }
    } else {
      // 初始化时渲染
      return null;
    }
  }
  
  render() {
    const { isFirstView, isLoading, success, error } = this.state;
    
    console.log(isFirstView, isLoading, success, error);
    if (isFirstView) {
      return <h2>enter name to search</h2>;
    } else if (isLoading) {
      return <h2>Loading...</h2>;
    } else if (success) {
      return (
        <div className="row">
          {
            success.map((item, index) => {
              return <div className="card" key={index}>
                <a href={item.url} target="_blank">
                  <img src={item.image} style={{width: 100}}/>
                </a>
                <p className="card-text">{item.name}</p>
              </div>
            })
          }
        </div>
      )
    } else {
      // 对象不能直接输出
      return <h2>{error.toString()}</h2>
    }
    
    
  }
}