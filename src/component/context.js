import React, { Component } from 'react';
import { connect } from './my-redux';
class Context extends Component {

  render() {
    return (
      <div style={{ color: this.props.themeColor }}>
        {this.props.content}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
    content: state.content
  }
}
Context = connect(mapStateToProps, Context)

export default Context;