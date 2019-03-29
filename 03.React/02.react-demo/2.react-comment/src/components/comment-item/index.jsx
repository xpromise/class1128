import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CommentItem extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired
  }
  
  render() {
    const { comment : { username, content } } = this.props;
    // const { username, content } = comment;
    return (
      <li className="list-group-item">
        <div className="handle">
          <a href="javascript:;">删除</a>
        </div>
        <p className="user"><span >{username}</span><span>说:</span></p>
        <p className="centence">{content}</p>
      </li>
    )
  }
}