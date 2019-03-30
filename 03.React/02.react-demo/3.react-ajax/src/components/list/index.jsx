import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

let isSearching = false;  // 代表正在搜索中

export default class List extends Component{
  static propTypes = {
    searchName: PropTypes.string.isRequired
  }
  
  // 初始化状态
  state = {
    isFirstView: true,  // 是否初次显示
    isLoading: false,  // 是否加载中
    success: null,    // 成功的数据
    error: null,       // 失败的错误
  }
  
  /*static getDerivedStateFromProps(nextProps, prevState) {
    // nextProps.searchName 帮助我区别是否是第一次请求，如果是，值就为空
    // isSearching 代表正在搜索中, 此时就不会重新更新状态
    if (nextProps.searchName && !isSearching) {
      // 在请求还未成功之前，切换为loading状态
      isSearching = true;
      return {
        isLoading: true,
        isFirstView: false
      }
    } else {
      // 初始化时渲染
      return null;
    }
  }
  // 为了让渲染优先  不能陷入死循环，一定要有退出条件
  componentDidUpdate(prevProps, prevState) {
    const { searchName } = this.props;
    // prevProps.searchName 上一次的属性值
    // searchName 当前最新的属性值
    // 如果不相等，才说明用户需要请求新的数据
    if (prevProps.searchName !== searchName) {
      axios.get(`https://api.github.com/search/users?q=${searchName}`)
        .then((res) => {
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
            // 会在渲染完成后重新调用
            isSearching = false;
          })
        })
        .catch((err) => {
          // 更新状态
          this.setState({
            isLoading: false,
            error: err
          })
        }, () => {
          // 组件渲染完毕后才调用，不能再重新更新状态，所以定义成变量
          isSearching = false;
        })
    }
  }*/
  
  // 静态方法没有this
  static getDerivedStateFromProps(nextProps, prevState) {
    // 第一次渲染不能切换loading
    // 如果第一次更新状态为成功的状态时，不能切换loading --> isSearching
    if (nextProps.searchName && !isSearching) {
      isSearching = true;
      return {isFirstView: false, isLoading: true};
    } else {
      return null;
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    // 最新的props
    const { searchName } = this.props;
    
    // 判断上一次的searchName和当前新的searchName是否相等
    if (searchName !== prevProps.searchName) {
      // 发送ajax请求
      axios.get(`https://api.github.com/search/users?q=${searchName}`)
        .then((res) => {
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
            // 会在渲染完成后重新调用，用来获取更新后的状态值
            // 保证下一次用户search，能够切换为loading状态
            isSearching = false;
          })
        })
        .catch((err) => {
          // 更新状态
          this.setState({
            isLoading: false,
            error: err
          })
        }, () => {
          // 组件渲染完毕后才调用，不能再重新更新状态，所以定义成变量
          isSearching = false;
        })
    }
    
  }
  
  render() {
    const { isFirstView, isLoading, success, error } = this.state;
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