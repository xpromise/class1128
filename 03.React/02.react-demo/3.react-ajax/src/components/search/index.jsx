import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component{
  static propTypes = {
    updateSearchName: PropTypes.func.isRequired
  }
  
  state = {
    searchName: ''
  }
  
  search = () => {
    // 读取输入框的值
    const { searchName } = this.state;
    // 更新
    this.props.updateSearchName(searchName);
  }
  
  change = (e) => {
    this.setState({
      searchName: e.target.value
    })
  }
  
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input type="text" placeholder="enter the name you search" onChange={this.change}/>
          <button onClick={this.search}>Search</button>
        </div>
      </section>
    )
  }
}