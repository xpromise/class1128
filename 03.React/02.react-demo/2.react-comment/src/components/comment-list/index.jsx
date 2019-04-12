import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CommentItem from '../comment-item';

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  render() {
    const { comments } = this.props;
    const isDisplay = comments.length ? 'none' : 'block';
    
    return (
      <div className="col-md-8">
        <h3 className="reply">评论回复：</h3>
        <h2 style={{display: isDisplay}}>暂无评论，点击左侧添加评论！！！</h2>
        <ul className="list-group">
          {
            comments.map((item) => <CommentItem comment={item} key={item.id}/>)
          }
        </ul>
      </div>
    )
  }
}

/*************** redux相关代码 *********************/

export default connect(
  (state) => ({comments: state})
)(CommentList)