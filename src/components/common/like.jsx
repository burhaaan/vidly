import React, { Component } from 'react';

class Like extends Component {
  render() {
    let classIcon = 'fa fa-heart';
    classIcon += this.props.liked ? '' : '-o';
    return (
      <i
        onClick={this.props.onClick}
        className={classIcon}
        aria-hidden="true"
        style={{ cursor: 'pointer' }}
      ></i>
    );
  }
}

export default Like;
