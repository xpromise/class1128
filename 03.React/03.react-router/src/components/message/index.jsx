import React, {Component} from 'react';

export default class Message extends Component {
  state = {
    messages: []
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        messages: [
          {id: 1, message: 'message001'},
          {id: 3, message: 'message003'},
          {id: 4, message: 'message004'},
        ]
      })
    }, 1000)
  }
  
  render () {
    const { messages } = this.state;
    return (
      <ul>
        {
          messages.map((item) => <li key={item.id}>{item.message}</li>)
        }
      </ul>
    )
  }
}
