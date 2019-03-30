import React, { PureComponent } from 'react';

import Search from './components/search';
import List from './components/list';

export default class App extends PureComponent{
  state = {
    searchName: ''
  }
  
  updateSearchName = (searchName) => {
    this.setState({searchName})
  }
  
  render() {
    console.log('render()');
    const { searchName } = this.state;
    return (
      <div className="container">
        <Search updateSearchName={this.updateSearchName}/>
        <List searchName={searchName}/>
      </div>
    )
  }
}