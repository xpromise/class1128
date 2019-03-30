import React, {Component} from 'react';

export default class MessageDetail extends Component {
  messages = [
    {id: 1, message: 'message001', content: 'message001 content'},
    {id: 3, message: 'message003', content: 'message003 content'},
    {id: 4, message: 'message004', content: 'message004 content'},
  ]
  
  render () {
    const { id } = this.props.match.params;
    const message = this.messages.find((item) => item.id === +id);
  
    return (
      <ul>
        <li>{message.id}</li>
        <li>{message.message}</li>
        <li>{message.content}</li>
      </ul>
    )
  }
}
