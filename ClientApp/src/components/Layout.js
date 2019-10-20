import React, { Component } from 'react';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="body">
          {this.props.children}
      </div>
    );
  }
}
